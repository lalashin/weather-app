const apiKey ="0d7831c22f79d7464ced7b0431d91be7";
const apiUrl ="https://api.openweathermap.org/data/2.5/weather?units=metric";

const cardBbColor = document.querySelector(".card");
console.log(cardBbColor)
const searchBox =document.querySelector(".search input");
const searchBtn =document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

const temperature = document.querySelector(".today-temp");
const place = document.querySelector(".my-local");
const description = document.querySelector(".today-description");
const weatherImg = document.querySelector(".today-weather-icon");
const todayError = document.querySelector(".today-error")

const success = (position) => {

    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    console.log(latitude,longitude)

   getWeather(latitude,longitude);
}

const fail = () => {
    alert("좌표를 받아올 수 없습니다.")
}

window.addEventListener('load', function(){
    navigator.geolocation.getCurrentPosition(success, fail);
});

async function getWeather(lat,lon) {
    const response = await fetch(apiUrl + `&lat=${lat}&lon=${lon}` + `&appid=${apiKey}`);
  
 
     if(response.status == 400) {
         document.querySelector(".today-error").style.display = "block";
         document.querySelector(".today-area").style.display = "none"
     }else{
         var data = await response.json();
         console.log(data)
         console.log(data.name)
 
         temperature.innerHTML = Math.round(data.main.temp) + "°C";
         place.innerHTML= data.name;
         description.innerHTML = data.weather[0].description;
         //openweathermap API에서 지원하는 아이콘 사용
         //data.weather[0].icon = "09d"
         const icon = data.weather[0].icon;
         const iconURL = `http://openweathermap.org/img/wn/${icon}@2x.png`;
 
         weatherImg.setAttribute('src', iconURL);

         //data.weather[0].main ="Snow"
         if(data.weather[0].main == "Clouds"){
            cardBbColor.classList.add("bgClouds");
         }else if(data.weather[0].main == "Clear"){
            cardBbColor.classList.add("bgClear");
         }else if(data.weather[0].main == "Rain"){
            cardBbColor.classList.add("bgRain");
        }else if(data.weather[0].main == "Drizzle"){
            cardBbColor.classList.add("bgDrizzle");
        }else if(data.weather[0].main == "Mist"){
            cardBbColor.classList.add("bgMist");
        }else if(data.weather[0].main == "Snow"){
            cardBbColor.classList.add("bgSnow");
        }
 
 
         document.querySelector(".today-error").style.display = "none";
         document.querySelector(".today-area").style.display = "block"
     }
 }



async function checkWeather(city) {
    const response = await fetch(`${apiUrl}&q=` + city + `&appid=${apiKey}`);

    if(response.status == 404){
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none"
    }else{
        var data = await response.json();

        console.log(data);
        document.querySelector(".city").innerHTML = data.name;
        document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
        document.querySelector(".wind").innerHTML = data.wind.speed+ "km/h";
    
        if(data.weather[0].main == "Clouds"){
            weatherIcon.src = "images/clouds.png";           
        }else if(data.weather[0].main == "Clear"){
            weatherIcon.src = "images/clear.png"
        }else if(data.weather[0].main == "Rain"){
            weatherIcon.src = "images/rain.png"
        }else if(data.weather[0].main == "Drizzle"){
            weatherIcon.src = "images/Drizzle.png"
        }else if(data.weather[0].main == "Mist"){
            weatherIcon.src = "images/Mist.png"
        }else if(data.weather[0].main == "snow"){
            weatherIcon.src = "images/snow.png"
        }
        
        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block"
        
    }

   
}

searchBtn.addEventListener("click",()=>{
    checkWeather(searchBox.value) ;
})

