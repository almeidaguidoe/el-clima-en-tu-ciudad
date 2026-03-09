const API_KEY = 'adaa5bd42ca8986f4224b38959eb691c';

const fetchData = position => {
    const {latitude, longitude} = position.coords;
    fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${API_KEY}`)
        .then(response => response.json())
        .then(data => setWeatherData(data))

}

const setWeatherData = data => {
    console.log(data);
    const weatherData = {
        location: data.name,
        description: traducirClima(data.weather[0].main),
        humidity: `${data.main.humidity}%`,
        viento: `${Math.round(data.wind.speed*3.6)} km/h`,
        temperature: `${data.main.temp} Cº`,
        date: getDate()
    }

    Object.keys(weatherData).forEach(key => {
        document.getElementById(key).textContent = weatherData[key];
    });

    setearImagenClima(weatherData.description);

    mostrarContainer();
}

function traducirClima(clima) {
    let resultado;
    switch(clima) {
        case 'Clear':
            resultado = 'Despejado';
            break;
        case 'Clouds':
            resultado = 'Nublado';
            break;
        case 'Thunderstorm':
            resultado = 'Tormenta';
            break;
        case 'Drizzle':
            resultado = 'Llovizna';
            break;
        case 'Rain':
            resultado = 'Lluvia';
            break;
        case 'Snow':
            resultado = 'Nieve';
            break;
        default:
            resultado = clima;
    }
    console.log(resultado);
    return resultado;
}

function setearImagenClima(descripcion) {
    const imagenClima = document.querySelector('.img_clima-actual');
    imagenClima.src = `./img/${descripcion}.png`;
}

const mostrarContainer = () => {
    let container = document.getElementById('container');
    let loader = document.querySelector('.loader');

    loader.style.display = 'none';
    container.style.display = 'flex';
}

const getDate = () => {
    let date = new Date();
    return `${('0' + date.getDate()).slice(-2)}/${( '0' + (date.getMonth() + 1 )).slice(-2)}/${date.getFullYear()}`;
}

const onLoad = () => {
    navigator.geolocation.getCurrentPosition(fetchData);
}