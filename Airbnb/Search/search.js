// get the data from user serches anad put that into the api to fget the server request;
const searchData = JSON.parse(localStorage.getItem("searchData"));
console.log(searchData);

const hotelContainer = document.getElementById("hotelContainer");

// appendHotels();

async function fetchSearchData() {
  const url = `https://airbnb13.p.rapidapi.com/search-location?location=${searchData.location}&checkin=${searchData.checkInDate}&checkout=${searchData.checkOutDate}&adults=${searchData.guestsCount}&children=0&infants=0&pets=0&page=1&currency=IN`;
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "856a334aa5mshd1a198ec96e31c0p132bf9jsn9a9c66ad13a5",
      "X-RapidAPI-Host": "airbnb13.p.rapidapi.com",
    },
  };

  try {
    const response = await fetch(url, options);
    const result = await response.json();
    console.log(result.results);
    appendHotels(result.results);
  } catch (error) {
    console.error(error);
  }
}

fetchSearchData()

function appendHotels(result) {

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

    hotelBox.addEventListener('click',() => {
      localStorage.setItem("detailsOfHotel", JSON.stringify(hotel));
      window.location.href = "../Listing/listing.html";
    })
  });
}



function getDetailes(){

}















// fetchSearchData()

// results: [
//     {
//       id: "685327524110717071",
//       url: "https://www.airbnb.com/rooms/685327524110717071",
//       deeplink:
//         "https://www.airbnb.com/rooms/685327524110717071?check_in=2023-10-21&check_out=2023-10-23&adults=1&children=0&infants=0&pets=0",
//       position: 1,
//       name: "Cozy By The Breeze III - 1 BHK Off Carter Road",
//       bathrooms: 2,
//       bedrooms: 1,
//       beds: 1,
//       city: "Mumbai",
//       images: [
//         "https://a0.muscache.com/im/pictures/637a6647-0ae1-49b6-bf46-06f3bdc640f8.jpg?im_w=720",
//         "https://a0.muscache.com/im/pictures/10e76916-e2b9-4f3c-8c3f-c2ccdec60468.jpg?im_w=720",
//         "https://a0.muscache.com/im/pictures/miso/Hosting-685327524110717071/original/7ea983e8-e767-447e-bb6b-c40eb476a191.jpeg?im_w=720",
//         "https://a0.muscache.com/im/pictures/6ff6dcfe-7cb6-4b67-bb0e-17752499af55.jpg?im_w=720",
//         "https://a0.muscache.com/im/pictures/4811892e-c374-436a-9e65-ef5c7435dca2.jpg?im_w=720",
//         "https://a0.muscache.com/im/pictures/127e92b5-0b18-4d6c-9eb0-0691178462f6.jpg?im_w=720",
//         "https://a0.muscache.com/im/pictures/miso/Hosting-685327524110717071/original/d347164b-8b42-426a-ad41-7d3ca6bbf599.jpeg?im_w=720",
//         "https://a0.muscache.com/im/pictures/miso/Hosting-685327524110717071/original/4a028f0a-2185-4a5a-aafd-c1a247c525e4.jpeg?im_w=720",
//         "https://a0.muscache.com/im/pictures/miso/Hosting-685327524110717071/original/3c93fcfc-fb79-4e0b-b85d-b4ac60697265.jpeg?im_w=720",
//         "https://a0.muscache.com/im/pictures/miso/Hosting-685327524110717071/original/b880a86c-d9ff-4ff2-bedf-5360066c22d9.jpeg?im_w=720",
//         "https://a0.muscache.com/im/pictures/4f8955f7-10fc-4911-9a15-60daecf27069.jpg?im_w=720",
//         "https://a0.muscache.com/im/pictures/miso/Hosting-685327524110717071/original/89b390f6-ddbd-4679-8e81-9d275076db69.jpeg?im_w=720",
//         "https://a0.muscache.com/im/pictures/miso/Hosting-685327524110717071/original/ebdbad54-b9f6-4cb7-bd92-9fbd7857b7e1.jpeg?im_w=720",
//         "https://a0.muscache.com/im/pictures/505178b4-4ff3-43c5-864c-64f62fba25ba.jpg?im_w=720",
//         "https://a0.muscache.com/im/pictures/5cc07d1e-d316-4b82-ba82-14e760f6611d.jpg?im_w=720",
//         "https://a0.muscache.com/im/pictures/060e800d-9788-4e3a-a77c-f0443d8249e1.jpg?im_w=720",
//       ],
//       hostThumbnail:
//         "https://a0.muscache.com/im/pictures/user/a2d5a049-0afa-43b2-b9af-e274682fd332.jpg?aki_policy=profile_x_medium",
//       isSuperhost: true,
//       rareFind: true,
//       lat: 19.065565338764802,
//       lng: 72.8242 3,73782209,
//       persons:
//       reviewsCount: 36,
//       rating: 4.97,
//       type: "Entire serviced apartment",
//       userId: 315524152,
//       address: "Mumbai, Maharashtra, India",
//       amenityIds: [
//         1, 4, 5, 8, 137, 139, 77, 21, 23, 89, 91, 93, 94, 671, 96, 33, 674, 100,
//         103, 167, 40, 104, 107, 44, 46, 47, 51, 308, 54, 57,
//       ],
//       previewAmenities: [
//         "Air conditioning",
//         "Wifi",
//         "Kitchen",
//         "Self check-in",
//       ],
//       cancelPolicy: "CANCEL_MODERATE",
//       price: {
//         rate: 71,
//         currency: "USD",
//         total: 141,
//         priceItems: [
//           { title: "$51 x 2 nights", amount: 101 },
//           { title: "Cleaning fee", amount: 9 },
//           { title: "Airbnb service fee", amount: 18 },
//           { title: "Taxes", amount: 13 },
//         ],
//       },
//     },
// ]
