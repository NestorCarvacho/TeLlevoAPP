fetch("https://api.libreapi.cl/weather/stations?code=330020")
  .then(function (response) {
    console.log(response)
    return response.json();
  })
  .then(function (indicadorClima) {
    console.log(indicadorClima)
    document.getElementById("clima-actual").innerHTML = 'Temperatura actual es ' + indicadorClima.data.temperature + '°C';
    document.getElementById("humedad-actual").innerHTML = ' || Humedad actual es ' + indicadorClima.data.humidity + '%';
  })
  .catch(function (error) {
    console.log("Requestfailed", error);
  });