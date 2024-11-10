const socket = io("realtimetracker-production.up.railway.app"); 
console.log("hey");

if (navigator.geolocation) {
    navigator.geolocation.watchPosition(
        (position) => {
            const { latitude, longitude } = position.coords;
            console.log("Location: ", latitude, longitude); // Log to check if the geolocation works

            // Emit the location to the server
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

// Create the map instance
const map = L.map("map").setView([0, 0], 16); // Assign map to a variable

// Add OpenStreetMap tile layer
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "indra's map"
}).addTo(map);

const markers = {};
let isFirstUpdate = true; // Flag to control initial centering

socket.on("receive-location", (data) => {
    const { id, latitude, longitude } = data;
    console.log(id);

    // On the first location update, center the map; afterward, only update the marker's position
    if (isFirstUpdate) {
        map.setView([latitude, longitude], 16); // Initial centering and zoom
        isFirstUpdate = false; // Set the flag to prevent further auto-centering
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
