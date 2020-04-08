var key = '328a80a9b3cba97fe2f0cdd342ea5b83';
var iconLink = 'http://openweathermap.org/img/w/';
var changeTemp = document.querySelector('.temprature-selection');
var FC = document.querySelector('.degree-fc');
var celsius , Farenheit;

window.addEventListener('DOMContentLoaded',()=>{
    var location = document.querySelector('.location');
    var desc = document.querySelector('.temprature-description');
    var temp = document.querySelector('.degree');
    var icon = document.querySelector('.icon');

    navigator.geolocation.getCurrentPosition(position =>{
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;
        let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}`;
        fetch(url)
        .then(response =>{
            if(response.status !=200){
                console.log('Looks like there is an Error: ', response.statusText);
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            celsius = Math.floor(data.main.temp -273.15);
            Farenheit = Math.floor((data.main.temp - 273.15) * 9/5 + 32);
            location.textContent = data.name;
            desc.textContent = data.weather[0].description;
            temp.textContent = Farenheit;
            icon.src = iconLink + data.weather[0].icon +'.png';
        })

        changeTemp.addEventListener('click',()=>{
            if(FC.textContent == "F"){
                FC.textContent = "C"
                temp.textContent = celsius;
            }else{
                FC.textContent = "F";
                temp.textContent = Farenheit;
            }
        })
    });
})