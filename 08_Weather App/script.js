document.addEventListener("DOMContentLoaded", () => {
    const locationElement = document.getElementById("location");
    const temperatureElement = document.getElementById("temperature");
    const descriptionElement = document.getElementById("description");
    const humidityElement = document.getElementById("humidity");

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async position => {
            const { latitude, longitude } = position.coords;
            const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
            const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                locationElement.textContent = data.name;
                temperatureElement.textContent = data.main.temp;
                descriptionElement.textContent = data.weather[0].description;
                humidityElement.textContent = data.main.humidity;
            } catch (error) {
                console.error("Error fetching weather data:", error);
            }
        });
    } else {
        console.error("Geolocation is not supported by this browser.");
    }
});
