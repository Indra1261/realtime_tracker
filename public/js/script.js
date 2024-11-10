const socket = io("https://realtime-tracker-beta.vercel.app/"); 
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

// Optionally, add a marker on the map if you want to display the user's location
// socket.on("location-update", (location) => {
//     const { latitude, longitude } = location;
//     L.marker([latitude, longitude]).addTo(map)
//         .bindPopup("User's Location")
//         .openPopup();
// });
const markers={};

socket.on("receive-location", (data) => {

    const { id,latitude, longitude } = data;
    console.log(id);
    
    map.setView([latitude,longitude],16);
    if(markers[id])
    {
        markers[id].setLatLng([latitude,longitude]);
    } else
    {
        markers[id]=L.marker([latitude,longitude]).addTo(map);
    }
    // markers[id]=L.marker([latitude,longitude]).addTo(map);
    
});

socket.on("user-disconnected",(id)=>{
    if(markers[id])
    {
        map.removeLayer(markers[id]);
        delete markers[id];
    }
});

console.log(markers);

