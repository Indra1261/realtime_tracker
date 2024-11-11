const socket = io("realtimetracker-production.up.railway.app"); 


if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            console.log("Location: ", latitude, longitude); 

            socket.emit("send-location", { latitude, longitude });
        },
        (error) => {
            console.log("Error fetching geolocation: ", error);
        },
        {
            enableHighAccuracy: true,
            timeout: 5000,
            maximumAge: 0,
        }
    );
}

const map = L.map("map").setView([0, 0], 16); 

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "Indra's map"
}).addTo(map);

const markers = {};
let isFirstUpdate = true; 

socket.on("receive-location", (data) => {
    const { id, latitude, longitude } = data;
    console.log(id);

    if (isFirstUpdate) {
        map.setView([latitude, longitude], 16); 
        isFirstUpdate = false; 
    }

    if (markers[id]) {
        markers[id].setLatLng([latitude, longitude]);
    } else {
        markers[id] = L.marker([latitude, longitude]).addTo(map);
    }
});

socket.on("user-disconnected", (id) => {
    if (markers[id]) {
        map.removeLayer(markers[id]);
        delete markers[id];
    }
});
