let cityButton=document.getElementById("city-btn");
let text=document.getElementById("city-input");
let icon=document.querySelector(".weather-icon");
let temperature=document.querySelector(".temp");
let cityName=document.querySelector(".city-name");
let humidity=document.querySelector(".humidity");
let windSpeed=document.querySelector(".windy");
let details=document.querySelector(".weather");
const APIKey="a63e6e7ea0f877e3a08dbd20889add0b";



cityButton.addEventListener("click",async function(event){
    const city=text.value.trim();
    if(!city) return;

    try {
        let weatherData= await fetchData(city);
        displayData(weatherData);
    } catch (error) {
        console.log("error");
    }
})

async function fetchData(city){
    const APIUrl=`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`;
    try {
        const response=await fetch(APIUrl);
        console.log(response);
        if (!response.ok) {
          throw new Error(`Response status: ${response.status}`);
        }
        const data=await response.json();
        return data;
    } catch (error) {
        console.log("error");
    }
}

function displayData(weatherData){
    console.log(weatherData);
    const {name,main,wind,weather}=weatherData;
    cityName.textContent=name;
    temperature.textContent=Math.round(main.temp_max)+"°C";
    windSpeed.textContent=wind.speed +" "+ "km/h";
    humidity.textContent=main.humidity+" "+"%";

    if(weather[0].main== "Clouds"){
        icon.src="cloudy.jpg";
    }
    else if(weather[0].main=="Clear"){
        icon.src="sunny.png";
    }
    else if(weather[0].main=="Rain"){
        icon.src="rainy.png";
    }
    else if(weather[0].main=="Drizzle"){
        icon.src="rainy.png";
    }
    else if(weather[0].main=="Mist"){
        icon.src="cloud.png";
    }


    details.classList.remove("hidden");
}
