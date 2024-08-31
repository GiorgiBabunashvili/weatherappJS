const result = document.getElementById("result");
const cityRef = document.getElementById("city");
const searchBtn = document.getElementById("search-btn");

// FETCH weather details from api
const getWeather = () => {
  let cityValue = cityRef.value;

  if (cityValue.length === 0) {
    result.innerHTML = `<h3 class='msg'>Please enter a city name<h3/>`;
  } else {
    cityRef.value = "";

    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityValue}&appid=${key}&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        result.innerHTML = `
                 <h2>${data.name}</h2>
                 <h4 class='weather'>${data.weather[0].main}</h4>
                 <h4 class='desc'>${data.weather[0].description}</h4>
                 <img src='https://openweathermap.org/img/w/${
                   data.weather[0].icon
                 }.png'>
                 <h1>${Math.ceil(data.main.temp)} &#176;</h1>
                 <div class='temp-container'>
                   <div>
                      <h4 class='title'>Min</h4>
                      <h4 class='temp'>${Math.ceil(data.main.temp_min)}</h4>
                   </div>
                   <div>
                      <h4 class='title'>Max</h4>
                      <h4 class='temp'>${Math.ceil(data.main.temp_max)}</h4>
                   </div>
                 </div>
            `;
      })
      .catch(() => {
        result.innerHTML = `<h3 class='msg'>City not found</h3>`;
      });
  }
};

searchBtn.addEventListener("click", getWeather);
window.addEventListener("load", getWeather);
