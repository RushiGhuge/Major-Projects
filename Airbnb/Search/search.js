// get the data from user serches anad put that into the api to fget the server request;
const searchData = JSON.parse(localStorage.getItem("searchData"));
console.log(searchData);
// document.getElementsByTagName('title').innerHTML = `${searchData.name} | Airbnb`
const hotelContainer = document.getElementById("hotelContainer");
const locationNav = document.getElementById("location");
const checkIn = document.getElementById("checkIn");
const checkOuut = document.getElementById("checkOuut");
const guestCount = document.getElementById("guestCount");

locationNav.value = searchData.location;
checkIn.value = searchData.checkInDate;
checkOuut.value = searchData.checkOutDate;
guestCount.value = searchData.guestsCount;

// appendHotels();

// fetch the server requast
async function fetchSearchData(searchData) {

  document.querySelector(".loading-container").style.display = "block";
  const url = `https://airbnb13.p.rapidapi.com/search-location?location=${searchData.location}&checkin=${searchData.checkInDate}&checkout=${searchData.checkOutDate}&adults=${searchData.guestsCount}&children=0&infants=0&pets=0&page=1&currency=IN`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "441a1d97b9msh5675a616d4712eap153470jsn64146b7fc0ea",
      "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result.results);
    appendHotels(result.results);
    return result.results;
  } catch (error) {
    console.error(error);
  }
}

let coordinates = [];
let mainData = fetchSearchData(searchData);

// add the hotes details in container
function appendHotels(result) {
  hotelContainer.innerHTML = "";
  result.forEach((hotel) => {
    let hotelBox = document.createElement("div");
    hotelBox.className = "hotel-item";
    hotelBox.innerHTML = `<div class="hotel-img">
          <img src="${hotel.images[1]}" alt="">
      </div>
      
      <div class="hotel-info">
          <sub>${hotel.type}</sub>
          <h3>${hotel.name}</h3>
          <sub>4-6 guests · Entire Home · 5 beds · 3 bath</sub>
          <sub>Wifi · Kitchen · Free Parking</sub>
      
          <div class="rating-container">
              <p class="rating"><i class="fa-solid fa-star"></i> ${hotel.rating} (${hotel.reviewsCount} reviews)</p>
              <p class="pricePernight">
                  $${hotel.price.rate} <sub>/night</sub>
              </p>
          </div>
      </div>`;
    hotelContainer.appendChild(hotelBox);

    hotelBox.addEventListener("click", () => {
      localStorage.setItem("detailsOfHotel", JSON.stringify(hotel));
      // window.location.href = "../Listing/listing.html";
      const newWindow = window.open("../Listing/listing.html", "_blank");
    });
  });
  document.querySelector(".loading-container").style.display = "none";
}

// search function
const searchBtn = document
  .getElementById("searchBtnNav")
  .addEventListener("click", () => {
    console.log("hi");
    if (locationNav == "") {
      alert("Fill the Correct Data!");
    } else {
      searchData.location = locationNav.value;
      searchData.checkInDate = checkIn.value;
      searchData.checkOutDate = checkOuut.value;
      searchData.guestsCount = guestCount.value;
      console.log(searchData);

      mainData = fetchSearchData(searchData);
      initMap()
    }
  });

// map function
async function initMap() {
  let map;

  // get the all lat and lng obj and add the marker in map
  mainData.then((data) => {
    let coordinatesArr = data.map((ele) => {
      return {
        lat: ele.lat,
        lng: ele.lng,
        name: ele.name,
        rate: ele.price.priceItems[0].amount,
        img: ele.images[0],
      };
    });
    coordinates = [...coordinatesArr];

    console.log(coordinates);
    addMarkers();
    function addMarkers() {
      for (var i = 0; i < coordinates.length; i++) {
        addMarker(
          coordinates[i],
          coordinates[i].name,
          coordinates[i].rate,
          coordinates[i].img
        );
      }
    }

    function addMarker(position, title, rate, img) {
      // var strokeWidth = 0;
      // var cornerRadius = 200;
      // var width = 50; // Adjust the width as needed

      var marker = new google.maps.Marker({
        position: position,
        map: map,
        title: title,
        icon: {
          path: "M -30 -10 L 30 -10 L 30 10 L -30 10 Z", // Rectangular path
          // path:'M -10 -10 L 10 -10 Q 10 -5 5 0 L 5 0 Q 0 5 -5 0 L -5 0 Q -10 -5 -10 -10 Z',

          scale: 1,
          fillColor: "white", // Gradient blue color
          fillOpacity: 1,
          strokeColor: "black",
          strokeWeight: 1,
        },
        title: "Custom Marker",
        label: {
          text: `₹${rate}`, // Text to be displayed on the marker
          color: "black",
          fontSize: "16px",
          fontWeight: "600",
        },
      });

      // Create an InfoWindow
      let contentString = `
            <div class="mapMarkerCards">
                <img src="${img}" alt="Image">
                <b>${title}</b>
            </div>
            `;
      var infoWindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 200,
        padding: 0,
      });

      // Add click event listener to show the InfoWindow
      marker.addListener("click", function () {
        infoWindow.open(map, marker);
      });
      map.setCenter(coordinates[1]);
      // marker.setIcon("https://cdn-icons-png.flaticon.com/128/9922/9922103.png");
    }
  });

  let position = { lat: 20.022382672790155, lng: 76.8030744415391 };

  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    zoom: 10,
    center: position,
    mapId: "f9508e6f111977cf",
  });
}
