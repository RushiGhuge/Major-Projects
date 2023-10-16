const searchBar = document.querySelector(".search-bar");
const guests = document.getElementById('guests');

window.addEventListener("scroll", () => {
  if (scrollY >= 45) {
    searchBar.style.maxWidth = "500px";
    guests.style.display = 'none'
  } else {
    searchBar.style.maxWidth = "650px";
    guests.style.display = 'block'
  }
});
