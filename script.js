let clima = {
  apiKey: "3b802fe54c18285dcbe3aa3e6aed3923", 
  fetchWeather: function (ciudad) {
    fetch(
      "http://api.openweathermap.org/data/2.5/weather?q=" + 
        ciudad +
        "&units=metric&lang=sp&appid=" +
        this.apiKey
    )
      .then((response) => {
        if (!response.ok) {
          alert("Ciudad no encontrada.");
          throw new Error("Ciudad no encontrada.");
        }
        return response.json();
      })
      .then((data) => this.displayWeather(data));    
},
displayWeather: function (data) {
  const { name } = data;
  const { icon, description } = data.weather[0];
  const { temp, humidity } = data.main;
  const { speed } = data.wind;
  document.querySelector(".ciudad").innerText = "Clima en " + name;
  document.querySelector(".icono").src =
    "https://openweathermap.org/img/wn/" + icon + ".png";
  document.querySelector(".descripcion").innerText = description;
  document.querySelector(".temperatura").innerText = temp + "°C";
  document.querySelector(".humedad").innerText =
    "Humedad: " + humidity + "%";
  document.querySelector(".viento").innerText =
    "Viento: " + speed + " km/h";
  document.querySelector(".cargando").classList.remove("clima");
  document.body.style.backgroundImage =
      "url('https://source.unsplash.com/1600x900/?" + name + "')";      
  },
  busqueda: function () {
    this.fetchWeather(document.querySelector(".buscador").value);
  },
}

document.querySelector(".busqueda button").addEventListener("click", function () {
  clima.busqueda();
});
    
document
  .querySelector(".buscador")
  .addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
      clima.busqueda();
    }
  });
    
clima.fetchWeather("Mexico");