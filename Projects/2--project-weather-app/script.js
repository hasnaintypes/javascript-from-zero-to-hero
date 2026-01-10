// Weather App Main Script

// WeatherAPI and WeatherIcons are loaded via <script> tags in index.html
// (weather-api.js and weather-icons.js define globals `WeatherAPI` and `WeatherIcons`).

class WeatherApp {
  constructor() {
    this.weatherAPI = new WeatherAPI();
    this.currentUnits = "metric"; // 'metric' or 'imperial'
    this.currentLocation = null;
    this.favorites = this.loadFavorites();
    this.searchTimeout = null;

    this.initializeElements();
    this.initializeMap();
    this.attachEventListeners();
    this.checkAPIConfiguration();
    this.loadInitialWeather();
  }

  initializeElements() {
    // Search elements
    this.searchInput = document.getElementById("searchInput");
    this.searchBtn = document.getElementById("searchBtn");
    this.locationBtn = document.getElementById("locationBtn");
    this.searchSuggestions = document.getElementById("searchSuggestions");

    // Control elements
    this.unitToggle = document.getElementById("unitToggle");
    this.refreshBtn = document.getElementById("refreshBtn");

    // Display elements
    this.loadingState = document.getElementById("loadingState");
    this.errorState = document.getElementById("errorState");
    this.weatherContent = document.getElementById("weatherContent");
    this.errorMessage = document.getElementById("errorMessage");
    this.retryBtn = document.getElementById("retryBtn");

    // Current weather elements
    this.currentWeatherIcon = document.getElementById("currentWeatherIcon");
    this.currentTemp = document.getElementById("currentTemp");
    this.currentDescription = document.getElementById("currentDescription");
    this.currentLocationElement = document.getElementById("currentLocation");
    this.feelsLike = document.getElementById("feelsLike");
    this.humidity = document.getElementById("humidity");
    this.windSpeed = document.getElementById("windSpeed");
    this.pressure = document.getElementById("pressure");
    this.visibility = document.getElementById("visibility");
    this.uvIndex = document.getElementById("uvIndex");

    // Forecast elements
    this.hourlyForecast = document.getElementById("hourlyForecast");
    this.dailyForecast = document.getElementById("dailyForecast");

    // Favorites elements
    this.addFavoriteBtn = document.getElementById("addFavoriteBtn");
    this.favoritesList = document.getElementById("favoritesList");

    // Modal elements
    this.alertModal = document.getElementById("alertModal");
    this.alertTitle = document.getElementById("alertTitle");
    this.alertContent = document.getElementById("alertContent");
    this.alertOkBtn = document.getElementById("alertOkBtn");

    // Map element
    this.weatherMapElement = document.getElementById("weatherMap");
  }

  // Map initialization (Leaflet)
  initializeMap() {
    if (typeof L === "undefined") return; // Leaflet not loaded
    if (!this.weatherMapElement) return;

    try {
      this.map = L.map(this.weatherMapElement, { zoomControl: true }).setView(
        [51.5074, -0.1278],
        6
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      }).addTo(this.map);

      this.mapMarker = L.marker([51.5074, -0.1278]).addTo(this.map);

      // Ensure map rendering is correct when container becomes visible
      let resizeTimeout = null;
      window.addEventListener("resize", () => {
        if (resizeTimeout) clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
          try {
            if (this.map) this.map.invalidateSize();
          } catch (e) {}
        }, 200);
      });

      // Prepare OpenWeather overlay layers (requires API key set via config.local.js or localStorage)
      const apiKey =
        (typeof window !== "undefined" && window.__OWM_API_KEY) ||
        (typeof window !== "undefined" && localStorage.getItem("OWM_API_KEY"));

      this.overlayTileLayer = null;
      this.overlayLayers = {};

      const layerMap = {
        temp: "temp_new",
        precipitation: "precipitation_new",
        wind: "wind_new",
        clouds: "clouds_new",
      };

      this.mapLayerButtons = document.querySelectorAll(".map-layer-btn");

      if (apiKey) {
        Object.keys(layerMap).forEach((key) => {
          const layerName = layerMap[key];
          this.overlayLayers[key] = L.tileLayer(
            `https://tile.openweathermap.org/map/${layerName}/{z}/{x}/{y}.png?appid=${apiKey}`,
            { opacity: 0.6, attribution: "&copy; OpenWeatherMap" }
          );
        });

        // Debug: log overlay URLs and test a sample tile fetch to verify responses
        const center = this.map.getCenter();
        const sampleZ = 6;
        const lon = center.lng;
        const lat = center.lat;
        const latLonToTile = (latDeg, lonDeg, zoom) => {
          const latRad = (latDeg * Math.PI) / 180;
          const n = Math.pow(2, zoom);
          const xTile = Math.floor(((lonDeg + 180) / 360) * n);
          const yTile = Math.floor(
            ((1 - Math.log(Math.tan(latRad) + 1 / Math.cos(latRad)) / Math.PI) /
              2) *
              n
          );
          return { x: xTile, y: yTile };
        };

        const sampleTile = latLonToTile(lat, lon, sampleZ);

        Object.keys(this.overlayLayers).forEach((key) => {
          const url = `https://tile.openweathermap.org/map/${layerMap[key]}/${sampleZ}/${sampleTile.x}/${sampleTile.y}.png?appid=${apiKey}`;
          console.log("Overlay", key, "sample URL:", url);

          // Try fetching one tile to check status (reports CORS/401/404)
          fetch(url)
            .then((res) => {
              console.log(
                `Tile fetch for ${key}:`,
                res.status,
                res.headers.get("content-type")
              );
              if (!res.ok) {
                console.warn(`Tile fetch failed for ${key}:`, res.statusText);
              }
            })
            .catch((err) => console.warn(`Tile fetch error for ${key}:`, err));
        });

        // Attach handlers to buttons
        this.mapLayerButtons.forEach((btn) => {
          btn.addEventListener("click", (e) => {
            const key = btn.dataset.layer;
            this.mapLayerButtons.forEach((b) => b.classList.remove("active"));
            btn.classList.add("active");
            this.setMapOverlay(key);
          });
        });

        // Activate default overlay (temperature) if available
        const defaultBtn = document.querySelector(
          '.map-layer-btn[data-layer="temp"]'
        );
        if (defaultBtn) {
          defaultBtn.classList.add("active");
          this.setMapOverlay("temp");
        }
      } else {
        // No API key: disable overlay buttons and show tooltip
        this.mapLayerButtons.forEach((btn) => {
          btn.disabled = true;
          btn.classList.add("disabled");
          btn.title =
            "Set your OpenWeather API key in config.local.js or localStorage to enable overlays";
        });
      }
    } catch (e) {
      console.warn("Map initialization failed:", e.message);
    }
  }

  updateMap(lat, lon, label = "") {
    if (!this.map) return;
    try {
      this.map.setView([lat, lon], 10);
      if (!this.mapMarker) {
        this.mapMarker = L.marker([lat, lon]).addTo(this.map);
      } else {
        this.mapMarker.setLatLng([lat, lon]);
      }
      if (label) this.mapMarker.bindPopup(label);
      // After moving the view, ensure the map size is recalculated so tiles fill the container
      try {
        this.map.invalidateSize();
      } catch (e) {}
    } catch (e) {
      console.warn("Map update failed:", e.message);
    }
  }

  setMapOverlay(key) {
    if (!this.map) return;
    // Remove existing overlay
    if (this.overlayTileLayer) {
      try {
        this.map.removeLayer(this.overlayTileLayer);
      } catch (e) {}
      this.overlayTileLayer = null;
    }

    const layer = this.overlayLayers && this.overlayLayers[key];
    if (layer) {
      this.overlayTileLayer = layer.addTo(this.map);
    }
  }

  attachEventListeners() {
    // Search functionality
    this.searchInput.addEventListener("input", (e) =>
      this.handleSearchInput(e)
    );
    this.searchInput.addEventListener("keydown", (e) =>
      this.handleSearchKeydown(e)
    );
    this.searchBtn.addEventListener("click", () => this.handleSearch());
    this.locationBtn.addEventListener("click", () => this.getCurrentLocation());

    // Controls
    this.unitToggle.addEventListener("click", () => this.toggleUnits());
    this.refreshBtn.addEventListener("click", () => this.refreshWeather());
    this.retryBtn.addEventListener("click", () => this.loadInitialWeather());

    // Favorites
    this.addFavoriteBtn.addEventListener("click", () => this.addToFavorites());
    this.favoritesList.addEventListener("click", (e) =>
      this.handleFavoriteClick(e)
    );

    // Modal
    this.alertOkBtn.addEventListener("click", () => this.closeAlert());
    this.alertModal.addEventListener("click", (e) => {
      if (e.target === this.alertModal) this.closeAlert();
    });

    // Keyboard shortcuts
    document.addEventListener("keydown", (e) =>
      this.handleKeyboardShortcuts(e)
    );

    // Click outside to close suggestions
    document.addEventListener("click", (e) => {
      if (
        !this.searchInput.contains(e.target) &&
        !this.searchSuggestions.contains(e.target)
      ) {
        this.hideSuggestions();
      }
    });
  }

  // API Configuration Check
  checkAPIConfiguration() {
    if (!this.weatherAPI.isConfigured()) {
      this.showError(
        "API key not configured. Please add your OpenWeatherMap API key to weather-api.js"
      );
      return false;
    }
    return true;
  }

  // Initial weather loading
  async loadInitialWeather() {
    if (!this.checkAPIConfiguration()) return;

    this.showLoading();

    // Try to get user's location first
    if (navigator.geolocation) {
      try {
        const position = await this.getCurrentPosition();
        await this.loadWeatherByCoords(
          position.coords.latitude,
          position.coords.longitude
        );
      } catch (error) {
        console.warn("Geolocation failed:", error.message);
        // Fallback to default city
        await this.loadWeatherByCity("London");
      }
    } else {
      // Fallback to default city
      await this.loadWeatherByCity("London");
    }
  }

  // Geolocation helper
  getCurrentPosition() {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject, {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000, // 5 minutes
      });
    });
  }

  // Load weather by coordinates
  async loadWeatherByCoords(lat, lon) {
    try {
      this.showLoading();
      const weatherData = await this.weatherAPI.getCompleteWeatherData(
        lat,
        lon
      );
      this.currentLocation = { lat, lon };
      this.displayWeatherData(weatherData);
      this.hideError();
    } catch (error) {
      this.showError(error.message);
    }
  }

  // Load weather by city name
  async loadWeatherByCity(cityName) {
    try {
      this.showLoading();

      // First get coordinates for the city
      const locations = await this.weatherAPI.getCoordinates(cityName);
      if (!locations || locations.length === 0) {
        throw new Error(
          "City not found. Please check the spelling and try again."
        );
      }

      const location = locations[0];
      await this.loadWeatherByCoords(location.lat, location.lon);
    } catch (error) {
      this.showError(error.message);
    }
  }

  // Display weather data
  displayWeatherData(data) {
    if (!data.current) {
      this.showError("Weather data not available");
      return;
    }

    this.displayCurrentWeather(data.current, data.uv, data.airPollution);

    if (data.forecast) {
      this.displayHourlyForecast(data.forecast);
      this.displayDailyForecast(data.forecast);
    }

    this.updateFavoritesDisplay();
    // Update map with coordinates if available
    if (data.coordinates && data.coordinates.lat && data.coordinates.lon) {
      const label = data.location ? data.location.fullName || "" : "";
      this.updateMap(data.coordinates.lat, data.coordinates.lon, label);
    }
    this.showWeatherContent();
  }

  // Display current weather
  displayCurrentWeather(current, uv, airPollution) {
    const formatted = this.weatherAPI.formatWeatherData(
      current,
      this.currentUnits
    );

    // Update main weather display
    this.currentWeatherIcon.textContent = WeatherIcons.getIconByCode(
      current.weather[0].icon
    );
    this.currentTemp.textContent = formatted.temperature;
    this.currentDescription.textContent = formatted.description;
    this.currentLocationElement.textContent = formatted.location;

    // Update weather details
    this.feelsLike.textContent = formatted.feelsLike;
    this.humidity.textContent = formatted.humidity;
    this.windSpeed.textContent =
      formatted.windSpeed +
      " " +
      WeatherIcons.getWindDirection(current.wind.deg);
    this.pressure.textContent = formatted.pressure;
    this.visibility.textContent = formatted.visibility;

    // UV Index
    if (uv && uv.value !== undefined) {
      const uvInfo = WeatherIcons.getUVInfo(uv.value);
      this.uvIndex.textContent = `${Math.round(uv.value)} (${uvInfo.level})`;
      this.uvIndex.style.color = uvInfo.color;
    } else {
      this.uvIndex.textContent = "N/A";
    }

    // Update background based on weather condition
    this.updateWeatherBackground(current.weather[0].id, this.isDay(current));
  }

  // Display hourly forecast
  displayHourlyForecast(forecast) {
    const hourlyItems = forecast.list.slice(0, 8); // Next 24 hours (8 x 3-hour intervals)

    this.hourlyForecast.innerHTML = hourlyItems
      .map((item) => {
        const time = new Date(item.dt * 1000);
        const temp = Math.round(item.main.temp);
        const icon = WeatherIcons.getIconByCode(item.weather[0].icon);
        const tempUnit = this.currentUnits === "metric" ? "°C" : "°F";

        return `
                <div class="hourly-item">
                    <div class="hourly-time">${time.getHours()}:00</div>
                    <div class="hourly-icon">${icon}</div>
                    <div class="hourly-temp">${temp}${tempUnit}</div>
                    <div class="hourly-desc">${
                      item.weather[0].description
                    }</div>
                </div>
            `;
      })
      .join("");
  }

  // Display daily forecast
  displayDailyForecast(forecast) {
    // Group forecast by day
    const dailyData = this.groupForecastByDay(forecast.list);

    this.dailyForecast.innerHTML = dailyData
      .slice(0, 5)
      .map((day) => {
        const date = new Date(day.date);
        const dayName = date.toLocaleDateString("en-US", { weekday: "long" });
        const icon = WeatherIcons.getIconByCode(day.icon);
        const tempUnit = this.currentUnits === "metric" ? "°C" : "°F";

        return `
                <div class="daily-item">
                    <div class="daily-date">${dayName}</div>
                    <div class="daily-icon">${icon}</div>
                    <div class="daily-temps">
                        <span class="daily-high">${Math.round(
                          day.maxTemp
                        )}${tempUnit}</span>
                        <span class="daily-low">${Math.round(
                          day.minTemp
                        )}${tempUnit}</span>
                    </div>
                    <div class="daily-desc">${day.description}</div>
                </div>
            `;
      })
      .join("");
  }

  // Group forecast data by day
  groupForecastByDay(forecastList) {
    const days = {};

    forecastList.forEach((item) => {
      const date = new Date(item.dt * 1000);
      const dateKey = date.toDateString();

      if (!days[dateKey]) {
        days[dateKey] = {
          date: dateKey,
          maxTemp: item.main.temp_max,
          minTemp: item.main.temp_min,
          icon: item.weather[0].icon,
          description: item.weather[0].description,
          items: [],
        };
      }

      days[dateKey].maxTemp = Math.max(
        days[dateKey].maxTemp,
        item.main.temp_max
      );
      days[dateKey].minTemp = Math.min(
        days[dateKey].minTemp,
        item.main.temp_min
      );
      days[dateKey].items.push(item);
    });

    return Object.values(days);
  }

  // Search functionality
  handleSearchInput(e) {
    const query = e.target.value.trim();

    // Clear previous timeout
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }

    if (query.length < 2) {
      this.hideSuggestions();
      return;
    }

    // Debounce search
    this.searchTimeout = setTimeout(async () => {
      try {
        const suggestions = await this.weatherAPI.searchCities(query);
        this.displaySuggestions(suggestions);
      } catch (error) {
        console.warn("Search failed:", error.message);
        this.hideSuggestions();
      }
    }, 300);
  }

  handleSearchKeydown(e) {
    if (e.key === "Enter") {
      e.preventDefault();
      this.handleSearch();
    } else if (e.key === "Escape") {
      this.hideSuggestions();
    }
  }

  async handleSearch() {
    const query = this.searchInput.value.trim();
    if (!query) return;

    this.hideSuggestions();
    await this.loadWeatherByCity(query);
    this.searchInput.value = "";
  }

  displaySuggestions(suggestions) {
    if (!suggestions || suggestions.length === 0) {
      this.hideSuggestions();
      return;
    }

    this.searchSuggestions.innerHTML = suggestions
      .map(
        (suggestion) => `
            <div class="suggestion-item" data-lat="${suggestion.lat}" data-lon="${suggestion.lon}">
                ${suggestion.fullName}
            </div>
        `
      )
      .join("");

    this.searchSuggestions.style.display = "block";
    this.searchSuggestions.setAttribute("aria-hidden", "false");

    // Add click listeners to suggestions
    this.searchSuggestions
      .querySelectorAll(".suggestion-item")
      .forEach((item) => {
        item.addEventListener("click", () => {
          const lat = Number.parseFloat(item.dataset.lat);
          const lon = Number.parseFloat(item.dataset.lon);
          this.loadWeatherByCoords(lat, lon);
          this.hideSuggestions();
          this.searchInput.value = "";
        });
      });
  }

  hideSuggestions() {
    this.searchSuggestions.style.display = "none";
    this.searchSuggestions.setAttribute("aria-hidden", "true");
  }

  // Location functionality
  async getCurrentLocation() {
    if (!navigator.geolocation) {
      this.showError("Geolocation is not supported by this browser");
      return;
    }

    try {
      this.locationBtn.textContent = "📍 Getting location...";
      this.locationBtn.disabled = true;

      const position = await this.getCurrentPosition();
      await this.loadWeatherByCoords(
        position.coords.latitude,
        position.coords.longitude
      );
    } catch (error) {
      let errorMessage = "Unable to get your location. ";

      switch (error.code) {
        case error.PERMISSION_DENIED:
          errorMessage += "Please allow location access and try again.";
          break;
        case error.POSITION_UNAVAILABLE:
          errorMessage += "Location information is unavailable.";
          break;
        case error.TIMEOUT:
          errorMessage += "Location request timed out.";
          break;
        default:
          errorMessage += error.message;
          break;
      }

      this.showError(errorMessage);
    } finally {
      this.locationBtn.textContent = "📍 Use My Location";
      this.locationBtn.disabled = false;
    }
  }

  // Unit conversion
  toggleUnits() {
    this.currentUnits = this.currentUnits === "metric" ? "imperial" : "metric";
    this.unitToggle.textContent = this.currentUnits === "metric" ? "°C" : "°F";

    // Reload weather data with new units
    if (this.currentLocation) {
      this.loadWeatherByCoords(
        this.currentLocation.lat,
        this.currentLocation.lon
      );
    }
  }

  // Refresh weather
  async refreshWeather() {
    if (!this.currentLocation) return;

    this.refreshBtn.classList.add("loading");
    this.weatherAPI.clearCache(); // Clear cache to force fresh data

    try {
      await this.loadWeatherByCoords(
        this.currentLocation.lat,
        this.currentLocation.lon
      );
      this.showNotification("Weather data refreshed", "success");
    } catch (error) {
      this.showError(error.message);
    } finally {
      this.refreshBtn.classList.remove("loading");
    }
  }

  // Favorites functionality
  loadFavorites() {
    try {
      const saved = localStorage.getItem("weatherApp_favorites");
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.warn("Failed to load favorites:", error);
      return [];
    }
  }

  saveFavorites() {
    try {
      localStorage.setItem(
        "weatherApp_favorites",
        JSON.stringify(this.favorites)
      );
    } catch (error) {
      console.warn("Failed to save favorites:", error);
    }
  }

  async addToFavorites() {
    if (!this.currentLocation) {
      this.showNotification("No location to add to favorites", "error");
      return;
    }

    try {
      // Get current weather to save with favorite
      const weatherData = await this.weatherAPI.getCurrentWeatherByCoords(
        this.currentLocation.lat,
        this.currentLocation.lon
      );

      const locationInfo = await this.weatherAPI.getCityName(
        this.currentLocation.lat,
        this.currentLocation.lon
      );

      const favorite = {
        id: Date.now(),
        lat: this.currentLocation.lat,
        lon: this.currentLocation.lon,
        name: locationInfo ? locationInfo.fullName : "Unknown Location",
        temp: Math.round(weatherData.main.temp),
        description: weatherData.weather[0].description,
        icon: weatherData.weather[0].icon,
        addedAt: new Date().toISOString(),
      };

      // Check if already in favorites
      const exists = this.favorites.some(
        (fav) =>
          Math.abs(fav.lat - favorite.lat) < 0.01 &&
          Math.abs(fav.lon - favorite.lon) < 0.01
      );

      if (exists) {
        this.showNotification("Location already in favorites", "warning");
        return;
      }

      this.favorites.push(favorite);
      this.saveFavorites();
      this.updateFavoritesDisplay();
      this.showNotification("Added to favorites", "success");
    } catch (error) {
      this.showNotification("Failed to add to favorites", "error");
    }
  }

  removeFavorite(id) {
    this.favorites = this.favorites.filter((fav) => fav.id !== id);
    this.saveFavorites();
    this.updateFavoritesDisplay();
    this.showNotification("Removed from favorites", "success");
  }

  updateFavoritesDisplay() {
    if (this.favorites.length === 0) {
      this.favoritesList.innerHTML =
        '<p style="text-align: center; color: var(--text-muted); padding: 2rem;">No favorite locations yet</p>';
      return;
    }

    this.favoritesList.innerHTML = this.favorites
      .map((favorite) => {
        const tempUnit = this.currentUnits === "metric" ? "°C" : "°F";
        const temp =
          this.currentUnits === "metric"
            ? favorite.temp
            : Math.round(
                this.weatherAPI.convertTemperature(
                  favorite.temp,
                  "celsius",
                  "fahrenheit"
                )
              );

        return `
                <div class="favorite-item" data-lat="${favorite.lat}" data-lon="${favorite.lon}">
                    <div class="favorite-location">${favorite.name}</div>
                    <div class="favorite-temp">${temp}${tempUnit}</div>
                    <div class="favorite-desc">${favorite.description}</div>
                    <button class="favorite-remove" data-id="${favorite.id}" aria-label="Remove from favorites">✕</button>
                </div>
            `;
      })
      .join("");
  }

  handleFavoriteClick(e) {
    if (e.target.classList.contains("favorite-remove")) {
      e.stopPropagation();
      const id = Number.parseInt(e.target.dataset.id);
      this.removeFavorite(id);
    } else {
      const item = e.target.closest(".favorite-item");
      if (item) {
        const lat = Number.parseFloat(item.dataset.lat);
        const lon = Number.parseFloat(item.dataset.lon);
        this.loadWeatherByCoords(lat, lon);
      }
    }
  }

  // Utility methods
  isDay(weatherData) {
    const now = Date.now() / 1000;
    return now >= weatherData.sys.sunrise && now <= weatherData.sys.sunset;
  }

  updateWeatherBackground(conditionId, isDay) {
    const gradient = WeatherIcons.getBackgroundGradient(conditionId, isDay);
    const el = document.querySelector(".current-weather");
    if (el) {
      // Set a CSS variable that the ::before pseudo-element uses
      el.style.setProperty("--sunny-bg", gradient);
    }
  }

  // UI state management
  showLoading() {
    this.loadingState.style.display = "block";
    this.errorState.style.display = "none";
    this.weatherContent.style.display = "none";
  }

  showError(message) {
    this.errorMessage.textContent = message;
    this.loadingState.style.display = "none";
    this.errorState.style.display = "block";
    this.weatherContent.style.display = "none";
  }

  hideError() {
    this.errorState.style.display = "none";
  }

  showWeatherContent() {
    this.loadingState.style.display = "none";
    this.errorState.style.display = "none";
    this.weatherContent.style.display = "block";
    // Leaflet needs a size invalidation when its container changes from hidden -> visible
    setTimeout(() => {
      try {
        if (this.map) this.map.invalidateSize();
      } catch (e) {}
    }, 200);
  }

  showAlert(title, content) {
    this.alertTitle.textContent = title;
    this.alertContent.innerHTML = content;
    this.alertModal.classList.add("active");
    this.alertModal.setAttribute("aria-hidden", "false");
  }

  closeAlert() {
    this.alertModal.classList.remove("active");
    this.alertModal.setAttribute("aria-hidden", "true");
  }

  showNotification(message, type = "info") {
    // Create notification element
    const notification = document.createElement("div");
    notification.className = `notification notification-${type}`;
    notification.textContent = message;

    // Style the notification
    Object.assign(notification.style, {
      position: "fixed",
      top: "20px",
      right: "20px",
      padding: "12px 20px",
      borderRadius: "8px",
      color: "white",
      fontWeight: "600",
      zIndex: "10000",
      transform: "translateX(100%)",
      transition: "transform 0.3s ease",
      maxWidth: "300px",
      wordWrap: "break-word",
    });

    // Set background color based on type
    const colors = {
      success: "#10b981",
      error: "#ef4444",
      warning: "#f59e0b",
      info: "#3b82f6",
    };
    notification.style.backgroundColor = colors[type] || colors.info;

    // Add to DOM
    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
      notification.style.transform = "translateX(0)";
    }, 10);

    // Remove after delay
    setTimeout(() => {
      notification.style.transform = "translateX(100%)";
      setTimeout(() => {
        if (notification.parentNode) {
          notification.parentNode.removeChild(notification);
        }
      }, 300);
    }, 3000);
  }

  // Keyboard shortcuts
  handleKeyboardShortcuts(e) {
    // Ctrl/Cmd + R to refresh
    if ((e.ctrlKey || e.metaKey) && e.key === "r") {
      e.preventDefault();
      this.refreshWeather();
    }

    // Ctrl/Cmd + L to get location
    if ((e.ctrlKey || e.metaKey) && e.key === "l") {
      e.preventDefault();
      this.getCurrentLocation();
    }

    // Ctrl/Cmd + F to focus search
    if ((e.ctrlKey || e.metaKey) && e.key === "f") {
      e.preventDefault();
      this.searchInput.focus();
    }

    // U to toggle units
    if (
      e.key === "u" &&
      !e.ctrlKey &&
      !e.metaKey &&
      document.activeElement !== this.searchInput
    ) {
      this.toggleUnits();
    }

    // Escape to close modals
    if (e.key === "Escape") {
      this.closeAlert();
      this.hideSuggestions();
    }
  }
}

// Initialize the app when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  new WeatherApp();
});

// Service Worker registration for PWA
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("scripts/sw.js")
      .then((registration) => {
        console.log("SW registered: ", registration);
      })
      .catch((registrationError) => {
        console.log("SW registration failed: ", registrationError);
      });
  });
}
