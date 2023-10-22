const mainHotelDetailPage = document.getElementById("mainHotelDetailPage");

let detailsData = JSON.parse(localStorage.getItem("detailsOfHotel"));
console.log(detailsData);

function detailPageAppend(data) {
  let taxStr = "NA";
  let tax = 0;
  if (data.price.priceItems[2] != undefined) {
    taxStr = data.price.priceItems[2].title;
    tax = data.price.priceItems[2].amount;
  }

  const hotelDetailPage = ` <div class="hotel-name">
<h3 class="heading">${data.name}</h3>
</div>

<div class="hotel-short-info">
<div class="left-hotel-short-info">
    <div class="rating"><i class="fa-solid fa-star"></i> ${data.rating}</div>
    <div><i class="fa-solid fa-stopwatch"></i> superhost</div>
    <p>borderx</p>
    <p>france</p>
</div>

<div class="right-hotel-short-info">
    <div> <i class="fa-solid fa-share-from-square"></i> Share</div>
    <div><i class="fa-solid fa-heart"></i> Save</div>
</div>
</div>

<div class="hotel-imgs-container">
<img class="wide" src="${data.images[0]}" alt="">
<img src="${data.images[1]}" alt="">
<img src="${data.images[2]}" alt="">
<img src="${data.images[3]}" alt="">
<img src="${data.images[4]}" alt="">
</div>

<div class="hotel-details-container">
<div class="hotel-details-page">
    <div class="details-page-name">
        <div class="details-page-name-row">
            <h1 class="heading">${data.type}</h1>
            <div>
                2 guests .
                ${data.bedrooms} bedrooms .
                ${data.beds} beds .
                ${data.bathrooms} bathrooms
            </div>
        </div>
        <div class="details-page-name-col">
            <img src="${data.hostThumbnail}" alt="">
        </div>
    </div>
    
    <div class="details-cols">
        <div class="row-details">
            <div>
                <i class="fa-solid fa-home"></i>
            </div>
            <div>
                <h3>Entire home</h3>
                <span>You’ll have the apartment to yourself</span>
            </div>
        </div>

        <div class="row-details">
            <div>
                <i class="fa-solid fa-bolt-lightning"></i>
            </div>
            <div>
                <h3>Enhanced Clean</h3>
                <span>This Host committed to Airbnb’s 5-step enhanced cleaning process. Show more</span>
            </div>
        </div>

        <div class="row-details">
            <div>
                <i class="fa-solid fa-door-open"></i>
            </div>
            <div>
                <h3>Self check-in</h3>
                <span>Check yourself in with the keypad.</span>
            </div>
        </div>

        <div class="row-details">
            <div>
                <i class="fa-solid fa-calendar-days"></i>
            </div>
            <div>
                <h3>Free cancellation before Feb 14
                    Subtitle</h3>
            </div>
        </div>

    </div>

    <div class="text-details">
        Come and stay in this superb duplex T2, in the heart of the historic center of Bordeaux.
        Spacious and bright, in a real Bordeaux building in exposed stone, you will enjoy all the charms of
        the city
        thanks to its ideal location. Close to many shops, bars and restaurants, you can access the
        apartment by
        tram A and C and bus routes 27 and 44.
        ...
    </div>

    <div class="sleep-img">
        <h1 class="heading">Where you’ll sleep</h1>
        <img src="${data.images[0]}" alt="">
        <p>Bedroom</p>
        <p>1 queen bed</p>
    </div>

    <div class="place-offers">
        <h1 class="heading">What this place offers</h1>
        <div class="items-offers">

            <div><i class="fa-brands fa-pagelines"></i>
                <span> Garden view</span>
            </div>

            <div>
                <i class="fa-solid fa-wifi"></i>
                <span>Wifi</span>
            </div>

            <div>
                <i class="fa-solid fa-toilet"></i>
                <span>Free washer - in building
                    Subtitle</span>
            </div>

            <div>
                <i class="fa-solid fa-fan"></i>
                <span>Central air conditioning</span>
            </div>

            <div>
                <i class="fa-solid fa-wind"></i>
                <span>Refrigerator</span>
            </div>

            <div>
                <i class="fa-solid fa-kitchen-set"></i>
                <span>Kitchen</span>
            </div>

            <div>
                <i class="fa-solid fa-dog"></i>
                <span>Pets allowed</span>
            </div>

            <div>
                <i class="fa-solid fa-spray-can-sparkles"></i>
                <span>Dryer</span>
            </div>
            <div>
                <i class="fa-solid fa-video"></i>
                <span>Security cameras on property</span>
            </div>
            <div>
                <i class="fa-solid fa-bicycle"></i>
                <span>Bicycles</span>
            </div>
        </div>
    </div>

</div>

<div class="hotel-price">
    <div class="hotel-price-box">
        <div class="price-row">
            <p>₹${data.price.rate}/night</p>
            <div>
               ${data.rating} . ${data.reviewsCount} Reviews
            </div>
        </div>

        <div class="checkInOutContainer">
            <div class="row-cheakHotelInOut">
                <input id='checkInDate' type="date">
                <input id = 'checkOutDate' type="date">
            </div>

            <input id='guestCount' type="number" placeholder="Guests">

        </div>

        <button id="reserve">Reserve</button>
        <p>You won’t be charged yet</p>

        <div class="price-chart">
            <div>
                <span>${data.price.priceItems[0].title}</span>
                <span>₹${data.price.priceItems[0].amount}</span>
            </div>

      

            <div>
                <span>${data.price.priceItems[1].title || "NA"}</span>
                <span>₹${data.price.priceItems[1].amount || 0}</span>
            </div>

            <div>
                <span>${taxStr}</span>
                <span>₹${tax}</span>
            </div>
        </div>

        <div id="totalPrice">
            <span>Total</span>
            <span>₹${data.price.rate}</span>
        </div>

    </div>
</div>
</div>

`;

  mainHotelDetailPage.innerHTML = hotelDetailPage;
  document.querySelector('.loading-container').style.display = 'none'
}
detailPageAppend(detailsData);
// document.getElementById('checkInDate').value = detailsData.chec
// document.getElementById('checkOutDate').value =
// document.getElementById('guestCount').value =



async function initMap() {
  let map;
  let position = { lat: detailsData.lat, lng: detailsData.lng };
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    zoom: 10,
    center: position,
    mapId: "f9508e6f111977cf",
  });
  map.setCenter(position);

  var marker = new google.maps.Marker({
    position: position,
    map: map,
  });
}
