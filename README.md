# Real-Time Location Tracker

This project is a real-time location tracking application using **Socket.IO** and **Leaflet.js**. It allows multiple users to share their live location on an interactive map. Each connected user is represented by a unique marker, and the map updates their positions in real-time as they move. This application is deployed on **Railway** 

![image](https://github.com/user-attachments/assets/bc890a95-6a20-425d-a60d-9480a91cf52f)


## Features

- Real-time location sharing with automatic geolocation updates.
- Interactive map using [Leaflet.js](https://leafletjs.com/) with **OpenStreetMap** as the tile provider.
- Each connected user has a unique marker on the map.
- Automatic handling of disconnected users by removing their markers from the map.
- Initial centering of the map on the user’s location, with the flexibility to pan and zoom freely without automatic re-centering.

## Demo

You can access the live demo [here](YOUR_DEPLOYMENT_URL).

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript, Leaflet.js
- **Backend**: Node.js, Express, Socket.IO
- **Deployment**: Railway (backend)
## Troubleshooting
Map re-centers on each update: Check the isFirstUpdate flag in script.js to ensure the map only centers on the user's location when they first connect.
WebSocket connection errors: Ensure that your backend URL is accessible from your frontend, especially for CORS settings on Railway.
License
This project is licensed under the MIT License. See the LICENSE file for details.

## Acknowledgments
Socket.IO for real-time WebSocket connections.
Leaflet.js for the interactive map interface.
OpenStreetMap for map tiles.
