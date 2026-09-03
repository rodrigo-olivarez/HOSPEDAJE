const currentYear = new Date().getFullYear();
document.getElementById("currentYear").textContent = currentYear;

const modifiedText = `Last Modification: ${document.lastModified}`;
document.getElementById("lastModified").textContent = modifiedText;

const navButton = document.querySelector('#ham-btn');
const navBar = document.querySelector('#nav-bar');


navButton.addEventListener('click', () => {
    navButton.classList.toggle('show');
    navBar.classList.toggle('show');
});

const url = `https://api.openweathermap.org/data/2.5/weather?lat=17.88&lon=-94.96&units=metric&appid=809c3138e1fbb327b7630a40a71f90e6`
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=17.88&lon=-94.96&units=metric&appid=809c3138e1fbb327b7630a40a71f90e6`
async function getWeather() {
    const response = await fetch(url)
    const data = await response.json();

    document.getElementById('weather-data').innerHTML = `
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="${data.weather[0].description}">
            <p><strong>${Math.round(data.main.temp)}°C</strong></p>
            <p>${data.weather[0].description}</p>
            <p>High: ${Math.round(data.main.temp_max)}°C</p>
            <p>Low: ${Math.round(data.main.temp_min)}°C</p>
            <p>Humidity: ${data.main.humidity}%</p>
        `;
    
    const forecastResponse = await fetch(forecastUrl);
    const forecastData = await forecastResponse.json();

    const dailyForecast = forecastData.list.filter(item => item.dt_txt.includes(`12:00:00`)).slice(0, 3);

    const forecastHTML = dailyForecast.map(day => {
        const date = new Date(day.dt_txt);
        const dayName = date.toLocaleDateString(`en-US`, {
            weekday:`long`});
        return `<p>${dayName}: <strong>${Math.round(day.main.temp)}°C</strong></p>`
    }).join(``);

    document.getElementById('forecast-data').innerHTML = forecastHTML;
}

getWeather();

async function loadSpotlights() {
    const response = await fetch(`data/members.json`);
    const members = await response.json();
    const eligible = members.filter(member => member.membership >= 2);

    eligible.sort(() => Math.random() - 0.5);

    const spotlights = eligible.slice(0, 3);
    const container = document.getElementById(`spotlights-cont`)
    container.innerHTML = ``;

    spotlights.forEach(member => {
        const card = document.createElement(`div`);
        card.classList.add(`spotlight-card`);
        card.innerHTML = `
                <img src="images/${member.image}" alt="${member.name}">
                <div>
                    <h3>${member.name}</h3>
                    <p>${member.address}</p>
                    <p>${member.phone}</p>
                    <a href="${member.website}" target="_blank">${member.website}</a>
                    <p>${member.membership === 3 ? '🥇 Gold Member' : '🥈 Silver Member'}</p>
                </div>
            `;
        container.appendChild(card);
    })
}

loadSpotlights();