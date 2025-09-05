// Weather Icons Mapping

const WeatherIcons = {
  // OpenWeatherMap icon codes to emoji mapping
  iconMap: {
    // Clear sky
    "01d": "☀️", // clear sky day
    "01n": "🌙", // clear sky night

    // Few clouds
    "02d": "🌤️", // few clouds day
    "02n": "☁️", // few clouds night

    // Scattered clouds
    "03d": "☁️", // scattered clouds day
    "03n": "☁️", // scattered clouds night

    // Broken clouds
    "04d": "☁️", // broken clouds day
    "04n": "☁️", // broken clouds night

    // Shower rain
    "09d": "🌦️", // shower rain day
    "09n": "🌧️", // shower rain night

    // Rain
    "10d": "🌦️", // rain day
    "10n": "🌧️", // rain night

    // Thunderstorm
    "11d": "⛈️", // thunderstorm day
    "11n": "⛈️", // thunderstorm night

    // Snow
    "13d": "🌨️", // snow day
    "13n": "❄️", // snow night

    // Mist
    "50d": "🌫️", // mist day
    "50n": "🌫️", // mist night
  },

  // Weather condition codes to emoji mapping
  conditionMap: {
    // Thunderstorm
    200: "⛈️",
    201: "⛈️",
    202: "⛈️",
    210: "🌩️",
    211: "🌩️",
    212: "🌩️",
    221: "🌩️",
    230: "⛈️",
    231: "⛈️",
    232: "⛈️",

    // Drizzle
    300: "🌦️",
    301: "🌦️",
    302: "🌦️",
    310: "🌦️",
    311: "🌦️",
    312: "🌦️",
    313: "🌦️",
    314: "🌦️",
    321: "🌦️",

    // Rain
    500: "🌦️",
    501: "🌧️",
    502: "🌧️",
    503: "🌧️",
    504: "🌧️",
    511: "🌨️",
    520: "🌦️",
    521: "🌧️",
    522: "🌧️",
    531: "🌧️",

    // Snow
    600: "🌨️",
    601: "❄️",
    602: "❄️",
    611: "🌨️",
    612: "🌨️",
    613: "🌨️",
    615: "🌨️",
    616: "🌨️",
    620: "🌨️",
    621: "❄️",
    622: "❄️",

    // Atmosphere
    701: "🌫️",
    711: "🌫️",
    721: "🌫️",
    731: "🌪️",
    741: "🌫️",
    751: "🌪️",
    761: "🌫️",
    762: "🌋",
    771: "💨",
    781: "🌪️",

    // Clear
    800: "☀️",

    // Clouds
    801: "🌤️",
    802: "⛅",
    803: "☁️",
    804: "☁️",
  },

  // Get icon by OpenWeatherMap icon code
  getIconByCode(iconCode) {
    return this.iconMap[iconCode] || "🌤️"
  },

  // Get icon by weather condition ID
  getIconByCondition(conditionId, isDay = true) {
    const baseIcon = this.conditionMap[conditionId]

    if (!baseIcon) {
      return isDay ? "☀️" : "🌙"
    }

    // Adjust for day/night for certain conditions
    if (conditionId === 800) {
      // Clear sky
      return isDay ? "☀️" : "🌙"
    }

    if (conditionId >= 801 && conditionId <= 802) {
      // Few/scattered clouds
      return isDay ? "🌤️" : "☁️"
    }

    return baseIcon
  },

  // Get weather background gradient based on condition
  getBackgroundGradient(conditionId, isDay = true) {
    // Clear sky
    if (conditionId === 800) {
      return isDay
        ? "linear-gradient(135deg, #87CEEB 0%, #98D8E8 100%)"
        : "linear-gradient(135deg, #2C3E50 0%, #34495E 100%)"
    }

    // Clouds
    if (conditionId >= 801 && conditionId <= 804) {
      return isDay
        ? "linear-gradient(135deg, #BDC3C7 0%, #95A5A6 100%)"
        : "linear-gradient(135deg, #34495E 0%, #2C3E50 100%)"
    }

    // Rain
    if ((conditionId >= 300 && conditionId <= 321) || (conditionId >= 500 && conditionId <= 531)) {
      return "linear-gradient(135deg, #4A90E2 0%, #357ABD 100%)"
    }

    // Thunderstorm
    if (conditionId >= 200 && conditionId <= 232) {
      return "linear-gradient(135deg, #2C3E50 0%, #34495E 100%)"
    }

    // Snow
    if (conditionId >= 600 && conditionId <= 622) {
      return "linear-gradient(135deg, #E8E8E8 0%, #D5D5D5 100%)"
    }

    // Atmosphere (fog, mist, etc.)
    if (conditionId >= 701 && conditionId <= 781) {
      return "linear-gradient(135deg, #95A5A6 0%, #7F8C8D 100%)"
    }

    // Default
    return isDay
      ? "linear-gradient(135deg, #87CEEB 0%, #98D8E8 100%)"
      : "linear-gradient(135deg, #2C3E50 0%, #34495E 100%)"
  },

  // Get UV Index color and description
  getUVInfo(uvIndex) {
    if (uvIndex <= 2) {
      return { color: "#4CAF50", level: "Low", description: "No protection needed" }
    } else if (uvIndex <= 5) {
      return { color: "#FFEB3B", level: "Moderate", description: "Some protection required" }
    } else if (uvIndex <= 7) {
      return { color: "#FF9800", level: "High", description: "Protection essential" }
    } else if (uvIndex <= 10) {
      return { color: "#F44336", level: "Very High", description: "Extra protection needed" }
    } else {
      return { color: "#9C27B0", level: "Extreme", description: "Stay indoors if possible" }
    }
  },

  // Get wind direction arrow
  getWindDirection(degrees) {
    const directions = ["↑", "↗", "→", "↘", "↓", "↙", "←", "↖"]
    const index = Math.round(degrees / 45) % 8
    return directions[index]
  },

  // Get wind speed description
  getWindDescription(speedKmh) {
    if (speedKmh < 1) return "Calm"
    if (speedKmh < 6) return "Light air"
    if (speedKmh < 12) return "Light breeze"
    if (speedKmh < 20) return "Gentle breeze"
    if (speedKmh < 29) return "Moderate breeze"
    if (speedKmh < 39) return "Fresh breeze"
    if (speedKmh < 50) return "Strong breeze"
    if (speedKmh < 62) return "Near gale"
    if (speedKmh < 75) return "Gale"
    if (speedKmh < 89) return "Strong gale"
    if (speedKmh < 103) return "Storm"
    if (speedKmh < 118) return "Violent storm"
    return "Hurricane"
  },

  // Get air quality index info
  getAQIInfo(aqi) {
    const levels = [
      { max: 50, level: "Good", color: "#4CAF50", description: "Air quality is satisfactory" },
      { max: 100, level: "Moderate", color: "#FFEB3B", description: "Air quality is acceptable" },
      {
        max: 150,
        level: "Unhealthy for Sensitive Groups",
        color: "#FF9800",
        description: "Sensitive people may experience problems",
      },
      { max: 200, level: "Unhealthy", color: "#F44336", description: "Everyone may experience problems" },
      { max: 300, level: "Very Unhealthy", color: "#9C27B0", description: "Health alert for everyone" },
      { max: Number.POSITIVE_INFINITY, level: "Hazardous", color: "#795548", description: "Emergency conditions" },
    ]

    const info = levels.find((level) => aqi <= level.max)
    return info || levels[levels.length - 1]
  },

  // Get moon phase emoji
  getMoonPhase(phase) {
    // Phase is typically 0-1, where 0 and 1 are new moon, 0.5 is full moon
    if (phase < 0.125) return "🌑" // New moon
    if (phase < 0.25) return "🌒" // Waxing crescent
    if (phase < 0.375) return "🌓" // First quarter
    if (phase < 0.5) return "🌔" // Waxing gibbous
    if (phase < 0.625) return "🌕" // Full moon
    if (phase < 0.75) return "🌖" // Waning gibbous
    if (phase < 0.875) return "🌗" // Last quarter
    return "🌘" // Waning crescent
  },

  // Get precipitation type icon
  getPrecipitationIcon(type, intensity = "moderate") {
    const icons = {
      rain: {
        light: "🌦️",
        moderate: "🌧️",
        heavy: "⛈️",
      },
      snow: {
        light: "🌨️",
        moderate: "❄️",
        heavy: "🌨️",
      },
      sleet: {
        light: "🌨️",
        moderate: "🌨️",
        heavy: "🌨️",
      },
      hail: "🧊",
    }

    if (type === "hail") return icons.hail

    return icons[type]?.[intensity] || "🌧️"
  },

  // Get seasonal emoji based on month and hemisphere
  getSeasonalEmoji(month, isNorthernHemisphere = true) {
    const seasons = isNorthernHemisphere
      ? {
          spring: [3, 4, 5], // Mar, Apr, May
          summer: [6, 7, 8], // Jun, Jul, Aug
          autumn: [9, 10, 11], // Sep, Oct, Nov
          winter: [12, 1, 2], // Dec, Jan, Feb
        }
      : {
          spring: [9, 10, 11], // Sep, Oct, Nov
          summer: [12, 1, 2], // Dec, Jan, Feb
          autumn: [3, 4, 5], // Mar, Apr, May
          winter: [6, 7, 8], // Jun, Jul, Aug
        }

    if (seasons.spring.includes(month)) return "🌸"
    if (seasons.summer.includes(month)) return "☀️"
    if (seasons.autumn.includes(month)) return "🍂"
    if (seasons.winter.includes(month)) return "❄️"

    return "🌤️"
  },
}

// Export for use in other files
if (typeof module !== "undefined" && module.exports) {
  module.exports = WeatherIcons
}
