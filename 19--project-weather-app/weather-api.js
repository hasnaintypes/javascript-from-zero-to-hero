// Weather API Service

class WeatherAPI {
  constructor() {
    // Replace with your actual OpenWeatherMap API key
    this.apiKey = "YOUR_API_KEY_HERE"
    this.baseUrl = "https://api.openweathermap.org/data/2.5"
    this.geocodingUrl = "https://api.openweathermap.org/geo/1.0"

    // Cache settings
    this.cache = new Map()
    this.cacheTimeout = 10 * 60 * 1000 // 10 minutes

    // Rate limiting
    this.lastRequestTime = 0
    this.minRequestInterval = 1000 // 1 second between requests
  }

  // Check if API key is configured
  isConfigured() {
    return this.apiKey && this.apiKey !== "YOUR_API_KEY_HERE"
  }

  // Rate limiting helper
  async waitForRateLimit() {
    const now = Date.now()
    const timeSinceLastRequest = now - this.lastRequestTime

    if (timeSinceLastRequest < this.minRequestInterval) {
      const waitTime = this.minRequestInterval - timeSinceLastRequest
      await new Promise((resolve) => setTimeout(resolve, waitTime))
    }

    this.lastRequestTime = Date.now()
  }

  // Generic API request method
  async makeRequest(url, cacheKey = null) {
    // Check cache first
    if (cacheKey && this.cache.has(cacheKey)) {
      const cached = this.cache.get(cacheKey)
      if (Date.now() - cached.timestamp < this.cacheTimeout) {
        return cached.data
      }
    }

    // Check API key
    if (!this.isConfigured()) {
      throw new Error("API key not configured. Please add your OpenWeatherMap API key.")
    }

    // Rate limiting
    await this.waitForRateLimit()

    try {
      const response = await fetch(url)

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error("Invalid API key. Please check your OpenWeatherMap API key.")
        } else if (response.status === 404) {
          throw new Error("Location not found. Please check the city name.")
        } else if (response.status === 429) {
          throw new Error("API rate limit exceeded. Please try again later.")
        } else {
          throw new Error(`API request failed: ${response.status} ${response.statusText}`)
        }
      }

      const data = await response.json()

      // Cache the result
      if (cacheKey) {
        this.cache.set(cacheKey, {
          data,
          timestamp: Date.now(),
        })
      }

      return data
    } catch (error) {
      if (error.name === "TypeError" && error.message.includes("fetch")) {
        throw new Error("Network error. Please check your internet connection.")
      }
      throw error
    }
  }

  // Get current weather by coordinates
  async getCurrentWeatherByCoords(lat, lon) {
    const url = `${this.baseUrl}/weather?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
    const cacheKey = `current_${lat}_${lon}`
    return this.makeRequest(url, cacheKey)
  }

  // Get current weather by city name
  async getCurrentWeatherByCity(cityName) {
    const url = `${this.baseUrl}/weather?q=${encodeURIComponent(cityName)}&appid=${this.apiKey}&units=metric`
    const cacheKey = `current_city_${cityName.toLowerCase()}`
    return this.makeRequest(url, cacheKey)
  }

  // Get 5-day forecast by coordinates
  async getForecastByCoords(lat, lon) {
    const url = `${this.baseUrl}/forecast?lat=${lat}&lon=${lon}&appid=${this.apiKey}&units=metric`
    const cacheKey = `forecast_${lat}_${lon}`
    return this.makeRequest(url, cacheKey)
  }

  // Get 5-day forecast by city name
  async getForecastByCity(cityName) {
    const url = `${this.baseUrl}/forecast?q=${encodeURIComponent(cityName)}&appid=${this.apiKey}&units=metric`
    const cacheKey = `forecast_city_${cityName.toLowerCase()}`
    return this.makeRequest(url, cacheKey)
  }

  // Get UV Index (requires One Call API - may need subscription)
  async getUVIndex(lat, lon) {
    try {
      const url = `${this.baseUrl}/uvi?lat=${lat}&lon=${lon}&appid=${this.apiKey}`
      const cacheKey = `uv_${lat}_${lon}`
      return this.makeRequest(url, cacheKey)
    } catch (error) {
      console.warn("UV Index not available:", error.message)
      return { value: 0 } // Return default value
    }
  }

  // Get air pollution data
  async getAirPollution(lat, lon) {
    try {
      const url = `${this.baseUrl}/air_pollution?lat=${lat}&lon=${lon}&appid=${this.apiKey}`
      const cacheKey = `air_${lat}_${lon}`
      return this.makeRequest(url, cacheKey)
    } catch (error) {
      console.warn("Air pollution data not available:", error.message)
      return null
    }
  }

  // Geocoding - get coordinates from city name
  async getCoordinates(cityName) {
    const url = `${this.geocodingUrl}/direct?q=${encodeURIComponent(cityName)}&limit=5&appid=${this.apiKey}`
    const cacheKey = `geocode_${cityName.toLowerCase()}`
    return this.makeRequest(url, cacheKey)
  }

  // Reverse geocoding - get city name from coordinates
  async getCityName(lat, lon) {
    const url = `${this.geocodingUrl}/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${this.apiKey}`
    const cacheKey = `reverse_${lat}_${lon}`
    const results = await this.makeRequest(url, cacheKey)

    if (results && results.length > 0) {
      const location = results[0]
      return {
        name: location.name,
        country: location.country,
        state: location.state,
        fullName: `${location.name}${location.state ? ", " + location.state : ""}, ${location.country}`,
      }
    }

    return null
  }

  // Search cities for autocomplete
  async searchCities(query) {
    if (query.length < 2) return []

    try {
      const results = await this.getCoordinates(query)
      return results.map((location) => ({
        name: location.name,
        country: location.country,
        state: location.state,
        lat: location.lat,
        lon: location.lon,
        fullName: `${location.name}${location.state ? ", " + location.state : ""}, ${location.country}`,
      }))
    } catch (error) {
      console.warn("City search failed:", error.message)
      return []
    }
  }

  // Get comprehensive weather data for a location
  async getCompleteWeatherData(lat, lon) {
    try {
      const [currentWeather, forecast, uvData, airPollution, locationInfo] = await Promise.allSettled([
        this.getCurrentWeatherByCoords(lat, lon),
        this.getForecastByCoords(lat, lon),
        this.getUVIndex(lat, lon),
        this.getAirPollution(lat, lon),
        this.getCityName(lat, lon),
      ])

      const result = {
        current: currentWeather.status === "fulfilled" ? currentWeather.value : null,
        forecast: forecast.status === "fulfilled" ? forecast.value : null,
        uv: uvData.status === "fulfilled" ? uvData.value : null,
        airPollution: airPollution.status === "fulfilled" ? airPollution.value : null,
        location: locationInfo.status === "fulfilled" ? locationInfo.value : null,
        coordinates: { lat, lon },
      }

      // If current weather failed, throw error
      if (!result.current) {
        throw new Error("Failed to fetch current weather data")
      }

      return result
    } catch (error) {
      throw new Error(`Failed to fetch weather data: ${error.message}`)
    }
  }

  // Get weather alerts (if available in your API plan)
  async getWeatherAlerts(lat, lon) {
    try {
      // Note: Weather alerts are typically part of the One Call API
      // which may require a subscription for new users
      const url = `${this.baseUrl}/onecall?lat=${lat}&lon=${lon}&appid=${this.apiKey}&exclude=minutely`
      const cacheKey = `alerts_${lat}_${lon}`
      const data = await this.makeRequest(url, cacheKey)

      return data.alerts || []
    } catch (error) {
      console.warn("Weather alerts not available:", error.message)
      return []
    }
  }

  // Utility methods

  // Convert temperature units
  convertTemperature(temp, fromUnit, toUnit) {
    if (fromUnit === toUnit) return temp

    if (fromUnit === "celsius" && toUnit === "fahrenheit") {
      return (temp * 9) / 5 + 32
    } else if (fromUnit === "fahrenheit" && toUnit === "celsius") {
      return ((temp - 32) * 5) / 9
    } else if (fromUnit === "kelvin" && toUnit === "celsius") {
      return temp - 273.15
    } else if (fromUnit === "celsius" && toUnit === "kelvin") {
      return temp + 273.15
    }

    return temp
  }

  // Convert wind speed units
  convertWindSpeed(speed, fromUnit, toUnit) {
    const conversions = {
      ms_to_kmh: (speed) => speed * 3.6,
      ms_to_mph: (speed) => speed * 2.237,
      kmh_to_ms: (speed) => speed / 3.6,
      kmh_to_mph: (speed) => speed * 0.621,
      mph_to_ms: (speed) => speed / 2.237,
      mph_to_kmh: (speed) => speed / 0.621,
    }

    const conversionKey = `${fromUnit}_to_${toUnit}`
    const converter = conversions[conversionKey]

    return converter ? converter(speed) : speed
  }

  // Format weather data for display
  formatWeatherData(data, units = "metric") {
    if (!data) return null

    const tempUnit = units === "metric" ? "°C" : "°F"
    const speedUnit = units === "metric" ? "km/h" : "mph"

    return {
      temperature: Math.round(data.main.temp) + tempUnit,
      feelsLike: Math.round(data.main.feels_like) + tempUnit,
      humidity: data.main.humidity + "%",
      pressure: data.main.pressure + " hPa",
      windSpeed:
        Math.round(this.convertWindSpeed(data.wind.speed, "ms", units === "metric" ? "kmh" : "mph")) + " " + speedUnit,
      windDirection: data.wind.deg,
      visibility: data.visibility ? Math.round(data.visibility / 1000) + " km" : "N/A",
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      conditionId: data.weather[0].id,
      location: data.name + (data.sys.country ? ", " + data.sys.country : ""),
      sunrise: new Date(data.sys.sunrise * 1000),
      sunset: new Date(data.sys.sunset * 1000),
      timestamp: new Date(data.dt * 1000),
    }
  }

  // Clear cache
  clearCache() {
    this.cache.clear()
  }

  // Get cache statistics
  getCacheStats() {
    const now = Date.now()
    let validEntries = 0
    let expiredEntries = 0

    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp < this.cacheTimeout) {
        validEntries++
      } else {
        expiredEntries++
      }
    }

    return {
      total: this.cache.size,
      valid: validEntries,
      expired: expiredEntries,
    }
  }

  // Clean expired cache entries
  cleanCache() {
    const now = Date.now()
    const expiredKeys = []

    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp >= this.cacheTimeout) {
        expiredKeys.push(key)
      }
    }

    expiredKeys.forEach((key) => this.cache.delete(key))

    return expiredKeys.length
  }
}

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = WeatherAPI
}
