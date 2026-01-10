# Project: Weather Application

## Project Overview
Build a responsive weather application that fetches real-time weather data from OpenWeatherMap and displays current conditions, forecasts, and weather maps.

## Features
- ✅ Current weather display
- ✅ 5-day weather forecast
- ✅ Location-based weather (geolocation)
- ✅ Search by city name
- ✅ Weather icons and animations
- ✅ Temperature unit conversion (°C/°F)
- ✅ Favorite locations
- ✅ Weather alerts and notifications
- ✅ Responsive design
- ✅ Offline support with a minimal service worker
- ✅ Weather Map (Leaflet + OpenWeather overlays)

## Technical Notes
- Vanilla JavaScript (no frameworks)
- OpenWeatherMap API integration (requires API key)
- Leaflet for map rendering and OpenStreetMap tiles as base layer
- OpenWeather tile overlays for Temperature/Precipitation/Wind/Clouds (requires API key)
- Geolocation API
- Local storage for favorites and settings
- Minimal Service Worker at `scripts/sw.js` for offline caching

## API Setup (local/dev)
1. Sign up at https://openweathermap.org/api and get an API key.
2. For local development, set the key in one of two ways (do NOT commit your key):
	 - Create a file `config.local.js` in the same folder as `index.html` with the line:
		 ```js
		 window.__OWM_API_KEY = 'YOUR_API_KEY_HERE';
		 ```
	 - Or store it in localStorage in the browser console:
		 ```js
		 localStorage.setItem('OWM_API_KEY', 'YOUR_API_KEY_HERE');
		 ```
3. Reload the page (hard refresh recommended) so the app picks up the key.

## File Structure
```
Projects/2--project-weather-app/
├── index.html                # Main HTML file (loads scripts/* and config.local.js)
├── style.css                 # Styles and responsive layout
├── script.js                 # Main application logic + Leaflet map wiring
├── manifest.json             # PWA manifest (minimal)
├── README.md                 # This file
├── config.local.js.example   # Example local config (DO NOT COMMIT your real key)
└── scripts/
		├── weather-api.js        # API wrapper (reads key from window.__OWM_API_KEY or localStorage)
		├── weather-icons.js      # Icon & background helpers
		└── sw.js                 # Minimal service worker for offline support
```

## Weather Map Feature
The app integrates a live map powered by Leaflet and OpenStreetMap for the base tiles. Additionally, when you provide a valid OpenWeatherMap API key the app enables overlay tile layers for:

- Temperature (tile layer `temp_new`)
- Precipitation (`precipitation_new`)
- Wind (`wind_new`)
- Clouds (`clouds_new`)

These overlays are fetched from OpenWeather's tile API using URLs like:
```
https://tile.openweathermap.org/map/{layer}/{z}/{x}/{y}.png?appid=YOUR_API_KEY
```

If overlays are not visible, open DevTools → Console; the app logs sample tile URLs and fetch results to help diagnose 401/404/CORS or network issues.

## Service Worker
The service worker is registered from `scripts/sw.js` (relative path) to avoid scope issues when serving under a subpath. If you change file locations, update the registration path in `script.js` accordingly.

## Running Locally
1. Place your API key as described in "API Setup (local/dev)".
2. Open `index.html` in a browser or serve the folder with a small static server (recommended) to avoid file:// issues.
3. Hard-refresh (Ctrl+F5) after adding `config.local.js` or changing the service worker.

## Troubleshooting
- If the map loads but overlays don't appear: verify your API key and check console logs for tile fetch status (401 = invalid key).
- If the service worker causes outdated assets to appear, unregister it from DevTools → Application → Service Workers, then reload.

## Learning Objectives
- Work with external APIs
- Handle asynchronous operations
- Implement geolocation
- Create responsive layouts
- Manage application state
- Handle errors gracefully
- Implement caching strategies

## License & Notes
This project is for learning and demo purposes. Keep API keys private and avoid committing `config.local.js` to source control.
```