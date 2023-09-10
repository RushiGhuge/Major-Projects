// ****** Shree Ganesha ****** //

/*
this is a wheather application js code
make a function that can do some work 
function list

1) --> Fetch the data from server when user search for any city;
2) --> Get Current Location;
3) --> clear and the newly search city data in DOM;

thats it
*/

// fetch data from server;
async function fetchData(cityName) {
  // this is end point of weather information
  loaderAnimationStart();
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=5eae25aa1751da0dbad4a7960ec7f00d`;
  let data = await fetch(url);
  let responce = await data.json();

  if (responce.cod == 404) {
    //city not fount----> // do some work
    console.log("city not founds");
    loaderAnimationStop();
    cityNotFount();
  } else {
    // this is emd point of population data
    const populationUrl = `https://api.openweathermap.org/data/2.5/air_pollution?lat=${responce.coord.lat}&lon=${responce.coord.lon}&appid=5eae25aa1751da0dbad4a7960ec7f00d`;
    let populationData = await fetch(populationUrl);
    let responcePopulationData = await populationData.json();

    let nextdata = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${responce.coord.lat}&lon=${responce.coord.lon}&cnt=8&appid=5eae25aa1751da0dbad4a7960ec7f00d`
    );

    let nextDataRes = await nextdata.json();
    loaderAnimationStop();
    appendData(responce, responcePopulationData, nextDataRes);
  }
}
fetchData("Risod"); // by default display

async function fetchData3Hours() {}

//get the location live... cordinates and call to tue successCallback with lat and lon
function getLiveLocation() {
  // get cordinates
  if ("geolocation" in navigator) {
    // Geolocation is available
    navigator.geolocation.getCurrentPosition(
      function (position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        console.log("Latitude: " + latitude);
        console.log("Longitude: " + longitude);
        successCallback(latitude, longitude);
      },

      function (error) {
        // Handle any errors that occur while getting the location
        switch (error.code) {
          case error.PERMISSION_DENIED:
            console.error("User denied the request for Geolocation.");
            alert("user denied");
            break;
          case error.POSITION_UNAVAILABLE:
            console.error("Location information is unavailable.");
            alert("user denied");
            break;
          case error.TIMEOUT:
            console.error("The request to get user location timed out.");
            alert("user denied");
            break;
          case error.UNKNOWN_ERROR:
            console.error("An unknown error occurred.");
            alert("user denied");
            break;
        }
      }
    );
  } else {
    // Geolocation is not available in this browser
    console.error("Geolocation is not available in your browser.");
  }
}

async function successCallback(lat, lon) {
  let url = `https://us1.locationiq.com/v1/reverse?key=pk.d7c2cfa8f69195f2d1c1f80eff1dece7&lat=${lat}&lon=${lon}&format=json`;
  let data = await fetch(url);
  let res = await data.json();
  if (res.address.city == undefined) {
    alert(res.address.city);
  } else {
    alert(res.address.city);
    fetchData(res.address.city);
  }
}

//search
document.addEventListener("keyup", (event) => {
  if (event.key === "Enter") {
    let searchIn = document.querySelector(".search > input");
    let searchINVal = searchIn.value;
    searchIn.value = "";
    blur();
    searchIn.foc;
    if (searchINVal.length >= 1) {
      fetchData(searchINVal);
    }
  }
});
document.querySelector(".search > i").addEventListener("click", search);
// this is search function that take the input value and search

function search() {
  let searchIn = document.querySelector(".search > input");
  let searchINVal = searchIn.value;
  searchIn.value = "";
  searchIn.blur();
  if (searchINVal.length >= 1) {
    fetchData(searchINVal);
  }
}
// append the data to the DOM;
function appendData(wheatherinfo, populationInfo, nextData) {
  console.log(populationInfo);
  // get the wheather temprature-->
  let tempr = Math.floor(wheatherinfo.main.temp - 273.15); // convert into celcius
  let feelLike = Math.floor(wheatherinfo.main.feels_like - 273.15);

  let containerBoxs = `<div class="container-left">
  <div class="main-wheather-box">
      <span class="bold">Now</span>
      <div class="temp">
          <h1 id="tempNum">${tempr}°<sup>c</sub></h1>
          <img id="weatherImg" src="./Photos/icons8-sun (1).svg" alt="">
      </div>
      <p id="wheatherCondition">${wheatherinfo.weather[0].description}</p>
      <div class="line-gray"></div>
      <p id="date"><i class="fa-regular fa-calendar-days"></i> ${getCurrentDate()}</p>
      <p id="curLocation"><i class="fa-solid fa-location-dot"></i> ${
        wheatherinfo.name
      }</p>
  </div>
</div>
    <div class="container-right">
      <div class="highlight-today-container">
          <p>Today Highlights</p>
          <div class="today-highlight-boxs">

              <div class="today-box">
                  <div class="row">
                      <p>Air Quality Index</p>
                      <span class="airQuality" id="Good">Very Poor</span>
                  </div>
                  <div class="airData">
                      <i class="fa-solid fa-wind"></i>
                      <div class="air-item">
                          <span>PM25</span>
                          <h1>${populationInfo.list[0].components.co}</h1>
                      </div>
                      <div class="air-item">
                          <span>SO2</span>
                          <h1>${populationInfo.list[0].components.so2}</h1>
                      </div>
                      <div class="air-item">
                          <span>NO2</span>
                          <h1>${populationInfo.list[0].components.no2}</h1>
                      </div>
                      <div class="air-item">
                          <span>O3</span>
                          <h1>${populationInfo.list[0].components.o3}</h1>
                      </div>
                  </div>
              </div>

              <div class="today-box">
                  <div class="row">
                      <p>Sunrise & Sunset</p>
                  </div>

                  <div class="sunrise-set">
                      <div class="sunrise">
                          <i class="fa-regular fa-sun"></i>
                          <div class="col-time">
                              <p>Sunrise</p>
                              <h1>${convertUnixTimestampToTimeAMPM(
                                wheatherinfo.sys.sunrise
                              )}</h1>
                          </div>
                      </div>
                      <div class="sunset">
                          <i class="fa-regular fa-moon"></i>
                          <div class="col-time">
                              <p>Sunset</p>
                              <h1>${convertUnixTimestampToTimeAMPM(
                                wheatherinfo.sys.sunset
                              )}</h1>
                          </div>
                      </div>
                  </div>

              </div>

              <div class="today-box temp-detail-box">
                  <div class="mini-box">
                      <p>Humidity</p>
                      <div class="mini-box-row">
                          <i class="fa-solid fa-droplet"></i>
                          <h1>${wheatherinfo.main.humidity}%</h1>
                      </div>
                  </div>

                  <div class="mini-box">
                      <p>Pressur</p>
                      <div class="mini-box-row">
                          <i class="fa-solid fa-water"></i>
                          <h1>${wheatherinfo.main.pressure}hPa</h1>
                      </div>
                  </div>
              </div>

              <div class="today-box temp-detail-box">
                  <div class="mini-box">
                      <p>Visibility</p>
                      <div class="mini-box-row">
                          <i class="fa-regular fa-eye"></i>
                          <h1>2.5km</h1>
                      </div>
                  </div>

                  <div class="mini-box">
                      <p>Feels Like</p>
                      <div class="mini-box-row">
                          <i class="fa-solid fa-temperature-low"></i>
                          <h1>${feelLike}°c</h1>
                      </div>
                  </div>
              </div>
          </div>

      
    </div>

        <p class="todayAt">Today At</p>

        <div class="next-temp-container">  </div>

</div>`;

  let container = document.getElementsByClassName("container")[0];
  container.innerHTML = containerBoxs;
  console.log(wheatherinfo);

  // change the wheather img with the condition
  let wetherCondition = wheatherinfo.weather[0].main;
  let weatherImg = document.getElementById("weatherImg");
  // console.log(wetherCondition);

  //weather img...
  if (wetherCondition == "Haze") {
    weatherImg.src = "./Photos/haze.png";
  } else if (wetherCondition == "Clouds") {
    weatherImg.src = "./Photos/icons8-cloud-with-lightning-96.png";
  } else if (wetherCondition == "Clear") {
    weatherImg.src = "./Photos/icons8-sun (1).svg";
  } else if (wetherCondition == "Rain") {
    weatherImg.src = "./Photos/icons8-rain-96.png";
  }

  //  air quality...
  let airQuality = document.getElementsByClassName("airQuality")[0];
  let airQI = populationInfo.list[0].main.aqi;
  if (airQI === 1) {
    airQuality.id = "Good";
    airQuality.innerHTML = "Good";
  } else if (airQI === 2) {
    airQuality.id = "Fair";
    airQuality.innerHTML = "Fair";
  } else if (airQI === 3) {
    airQuality.id = "Moderate";
    airQuality.innerHTML = "Moderate";
  } else if (airQI === 4) {
    airQuality.id = "Poor";
    airQuality.innerHTML = "Poor";
  } else if (airQI === 5) {
    airQuality.id = "VeryPoor";
    airQuality.innerHTML = "Very Poor";
  }

  // next days and hours data and temprature...
  let nextDay = nextData.list;
  for (let i = 0; i < nextDay.length; i++) {
    let wetherConditionNext = nextDay[i].weather[0].main;
    // console.log(wetherConditionNext);
    let nextWeatherImg = "./Photos/icons8-sun (1).svg";

    if (wetherConditionNext == "Haze") {
      nextWeatherImg = "./Photos/haze.png";
    } else if (wetherConditionNext == "Clouds") {
      nextWeatherImg = "./Photos/icons8-cloud-with-lightning-96.png";
    } else if (wetherConditionNext == "Clear") {
      nextWeatherImg = "./Photos/icons8-sun (1).svg";
    } else if (wetherConditionNext == "Rain") {
      nextWeatherImg = "./Photos/icons8-rain-96.png";
    }

    let nextTempItem = document.createElement("div");
    nextTempItem.innerHTML = `
        <p>${convertUnixTimestampToTime(nextData.list[i].dt)}</p>
        <img src="${nextWeatherImg}" alt="">
        <h2>${Math.floor(nextData.list[i].main.temp - 273.15)}°</h3>
    `;
    nextTempItem.className = "next-temp-item";
    let a = document.getElementsByClassName("next-temp-container")[0];
    a.appendChild(nextTempItem);
  }
}
// Get current data;
function getCurrentDate() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentDate = new Date();
  const dayOfWeek = daysOfWeek[currentDate.getDay()];
  const dayOfMonth = currentDate.getDate();
  const month = months[currentDate.getMonth()];
  return `${dayOfWeek}, ${dayOfMonth} ${month}`;
}
// convert unix date formate info human readble format
function convertUnixTimestampToTimeAMPM(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000); // Convert Unix timestamp to milliseconds

  const options = {
    hour: "numeric",
    minute: "numeric",
    hour12: true, // Include AM or PM
  };

  return date.toLocaleTimeString("en-US", options);
}

function convertUnixTimestampToTime(unixTimestamp) {
  const date = new Date(unixTimestamp * 1000); // Convert Unix timestamp to milliseconds

  const options = {
    hour: "numeric",
    hour12: true, // Include AM or PM
  };

  return date.toLocaleTimeString("en-US", options);
}

//make a fucntion when the city is not found;
function cityNotFount() {
  let container = document.getElementsByClassName("container")[0];
  container.innerHTML = `
  <div id='notFountCity'>
     <img src="./Photos/—Pngtree—404 construction worker repair vector_5460036.png" alt="">
     <h1>City Not Found</h1>
     <span>Check The Spelling...</span>
  </div>
  
  `;
}

//animation loader function...
function loaderAnimationStart() {
  document.getElementById("loading-animation-container").style.display = "flex";
}
function loaderAnimationStop() {
  document.getElementById("loading-animation-container").style.display = "none";
}
