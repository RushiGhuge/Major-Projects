// get the data from user serches anad put that into the api to fget the server request;
const searchData = JSON.parse(localStorage.getItem("searchData"));
const notFoundImg = document.getElementById("notFoundImg");

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
  const url = `https://airbnb13.p.rapidapi.com/search-location?location=${searchData.location}&checkin=${searchData.checkInDate}&checkout=${searchData.checkOutDate}&adults=${searchData.guestsCount}&children=0&infants=0&pets=0&page=1&currency=INR`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "a23fd33d01mshe8e0e6ddde1b884p159bccjsnff391d5477d4",
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
let filterData = []; //  creats a filter data for a filtering...

let mainData = fetchSearchData(searchData);

mainData.then((data) => {
  filterData = data;
});

// add the hotes details in container
function appendHotels(result) {
  // base case
  if (result.length == 0) {
    console.log(0);
    hotelContainer.innerHTML = `<div id="notFoundImg">
                                    <img src="../img/9264885.jpg" alt="">
                                </div>`;
    // notFoundImg.style.display = "flex";
    return;
  }
  // notFoundImg.style.display = 'none' // if length not 0

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
          <sub>${hotel.persons} guests · ${hotel.type} · ${hotel.beds} beds · ${
      hotel.bedrooms
    } bedrooms</sub>
          <sub>${hotel.previewAmenities.join(" . ")}</sub>
      
          <div class="rating-container">
              <p class="rating"><i class="fa-solid fa-star"></i> ${
                hotel.rating
              } (${hotel.reviewsCount} reviews)</p>
              <p class="pricePernight">
                ₹${hotel.price.rate} <span>/night</span>
              </p>
          </div>
      </div>`;

    // Add a directions button
    const directionsButton = document.createElement("button");
    directionsButton.innerText = "Get Directions";
    directionsButton.addEventListener("click", function () {
      openDirections(hotel.lat, hotel.lng);
    });
    hotelBox.appendChild(directionsButton);

    hotelContainer.appendChild(hotelBox);

    // hotelBox.addEventListener("click", () => {
    //   localStorage.setItem("detailsOfHotel", JSON.stringify(hotel));
    //   // window.location.href = "../Listing/listing.html";
    //   const newWindow = window.open("../Listing/listing.html", "_blank");
    // });
  });

  // return listingCard;

  document.querySelector(".loading-container").style.display = "none";
}

// search function
const searchBtn = document
  .getElementById("searchBtnNav")
  .addEventListener("click", () => {
    if (locationNav == "") {
      alert("Fill the Correct Data!");
    } else {
      searchData.location = locationNav.value;
      searchData.checkInDate = checkIn.value;
      searchData.checkOutDate = checkOuut.value;
      searchData.guestsCount = guestCount.value;
      console.log(searchData);

      mainData = fetchSearchData(searchData);
      initMap();
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

//openDirections function
function openDirections(lat, lng) {
  // console.log(lat,lng);
    const url = `https://www.google.com/maps/dir//${lat},${lng}`;
    window.open(url, "_blank");
}

// filter section --------------***********************************************************************-----------------

let optionPriceF = document.getElementById("price-filter");
let optionTypeF = document.getElementById("type-filter");

// sort by price function...
function filterByPrice(price) {
  const priceObj = JSON.parse(price.value); // str to obj

  mainData.then((data) => {
    const priceFilterArr = data.filter((ele) => {
      if (optionTypeF.value == "All Types") {
        return ele.price.rate <= priceObj.max && ele.price.rate >= priceObj.min;
      }
      return (
        ele.type == optionTypeF.value &&
        ele.price.rate <= priceObj.max &&
        ele.price.rate >= priceObj.min
      );
    });
    // console.log(priceFilterArr);
    appendHotels(priceFilterArr);
  });
}

// sort by type function...
function sortByType(type) {
  const priceObj = JSON.parse(optionPriceF.value); // str to obj

  if (type.value == "All Types") {
    const typeFilterArr = filterData.filter((ele) => {
      return ele.price.rate <= priceObj.max && ele.price.rate >= priceObj.min;
    });
    appendHotels(typeFilterArr);
    return;
  }
  const typeFilterArr = filterData.filter((ele) => {
    return (
      ele.type == type.value &&
      ele.price.rate <= priceObj.max &&
      ele.price.rate >= priceObj.min
    );
  });
  appendHotels(typeFilterArr);
}

// mainData.then(() => {
//   console.log("hi");
//   for (let i = 0; i < mainData.length; i++) {
//     console.log(mainData[i].type);
//   }
// });

// Attach event listeners to checkboxes

const checkboxes = document.querySelectorAll('input[type="checkbox"]');
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    const selectedAmenities = Array.from(checkboxes)
      .filter((checkbox) => checkbox.checked)
      .map((checkbox) => checkbox.id.replace("Checkbox", ""));
    // filter by the properties...
    filterPropertiesByAmenities(selectedAmenities);
  });
});

function filterPropertiesByAmenities(selectedAmenities) {
  const filteredProperties = filterData.filter((property) => {
    const meetsCriteria = selectedAmenities.every((amenity) =>
      property.previewAmenities.includes(amenity)
    );
    return meetsCriteria;
  });
  appendHotels(filteredProperties);
  console.log(filteredProperties); // Add this line for debugging
}

checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", function (e) {
    e.target.parentNode.classList.toggle("checked", e.target.checked);
    console.log();
  });
});

// make some function that sort the data by the price and ratings

function sortByPrice(priceSort) {
  if (priceSort.value == "high-low") {
    // desending order...
    let ans = filterData.sort((b, a) => a.price.rate - b.price.rate);
    appendHotels(ans);
  } else if (priceSort.value == "low-high") {
    //assending order...
    let ans = filterData.sort((a, b) => a.price.rate - b.price.rate);
    appendHotels(ans);
  }
}

function sortByRatings(ratingSort) {
  if (ratingSort.value == "high-low") {
    // desending order...
    let ans = filterData.sort((b, a) => a.rating - b.rating);
    appendHotels(ans);
  } else if (ratingSort.value == "low-high") {
    //assending order...
    let ans = filterData.sort((a, b) => a.rating - b.rating);
    appendHotels(ans);
  }
}

function sortByReviews(reviewSort) {
  if (reviewSort.value == "high-low") {
    // desending order...
    let ans = filterData.sort((b, a) => a.reviewsCount - b.reviewsCount);
    appendHotels(ans);
  } else if (reviewSort.value == "low-high") {
    //assending order...
    let ans = filterData.sort((a, b) => a.reviewsCount - b.reviewsCount);
    appendHotels(ans);
  }
}
