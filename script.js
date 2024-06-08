document.getElementById('search-btn').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    getWeather(city);
});

async function getWeather(city) {
    const weatherApiKey = 'd6d4fe448ef502f3ee113807cd626a06'; 
    const unsplashApiKey = 'LknVkOQ7C81fuIS2ASO4SLsHTX9WBVMku7ZmXbDrOPw'; 
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${weatherApiKey}&units=metric`;

    try {
        const weatherResponse = await fetch(weatherUrl);
        if (!weatherResponse.ok) {
            throw new Error('City not found');
        }
        const weatherData = await weatherResponse.json();
        displayWeather(weatherData);

        const unsplashUrl = `https://api.unsplash.com/search/photos?query=${city}&client_id=${unsplashApiKey}&orientation=landscape&per_page=1`;
        const unsplashResponse = await fetch(unsplashUrl);
        const unsplashData = await unsplashResponse.json();
        if (unsplashData.results.length > 0) {
            const imageUrl = unsplashData.results[0].urls.full;
            document.querySelector('.background').style.backgroundImage = `url(${imageUrl})`;
        } else {
            // Fallback image if no image is found for the city
            document.querySelector('.background').style.backgroundImage = `url('https://unsplash.com/photos/brown-house-near-body-of-water-zAjdgNXsMeg')`;
        }
    } catch (error) {
        alert(error.message);
    }
}

function displayWeather(data) {
    const cityName = data.name;
    const temperature = data.main.temp;
    const description = data.weather[0].description;
    const humidity = data.main.humidity;
    const iconCode = data.weather[0].icon;

    const iconUrl = `http://openweathermap.org/img/wn/${iconCode}@2x.png`;

    document.getElementById('city-name').textContent = `${cityName}`;
    document.getElementById('temperature').textContent = `Temperature: ${temperature} °C`;
    document.getElementById('description').textContent = `Description: ${description}`;
    document.getElementById('humidity').textContent = `Humidity: ${humidity}%`;

    const weatherIcon = document.getElementById('weather-icon');
    weatherIcon.className = 'fas';
    weatherIcon.style.backgroundImage = `url(${iconUrl})`;
    weatherIcon.style.backgroundSize = 'cover';
    weatherIcon.style.display = 'inline-block';
    weatherIcon.style.width = '100px';
    weatherIcon.style.height = '100px';
}

