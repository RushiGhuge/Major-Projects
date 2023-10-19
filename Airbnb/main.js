const searchBar = document.querySelector(".search-bar");
const guests = document.getElementById("guests");

const searchBtn = document.getElementById("searchBtn");
const locationInput = document.getElementById("locationInput");
const checkInInput = document.getElementById("checkInInput");
const checkoutInput = document.getElementById("checkoutInput");
const guestsInput = document.getElementById("guestsInput");

window.addEventListener("scroll", () => {
  if (scrollY >= 45) {
    searchBar.style.maxWidth = "500px";
    guests.style.display = "none";
  } else {
    searchBar.style.maxWidth = "650px";
    guests.style.display = "block";
  }
});


// this is for search...
function search() {
  if (locationInput.value == "") {
    alert("Fill the Correct Data!");
  } else {
    const dataObj = {
      location: locationInput.value,
      checkInDate: checkInInput.value,
      checkOutDate: checkoutInput.value,
      guestsCount: guestsInput.value,
    };

    window.localStorage.setItem("searchData", JSON.stringify(dataObj));
    window.location.href = "./Search/search.html";
  }
}

searchBtn.addEventListener("click", search);
