let slides = document.querySelectorAll(".slide")
let counter = 0;

slides.forEach((slide, ind) => {
    slide.style.left = `${ind * 100}%`
})

function goNext() {
    if (counter == 3) counter = -1;
    counter++;
    slideImg();
}
function goPrev() {
    if (counter == 0) counter = 4;
    counter--;
    slideImg();
}
function slideImg() {
    slides.forEach(slids => {
        slids.style.transform = `translateX(-${counter * 100}%)`
    })
}
// setInterval(()=>{
//     goNext()
// },3000)

const productUrl = 'https://dummyjson.com/products'
async function fetchInfo() {
    let result = await fetch(productUrl);
    let info = await result.json();
    console.log(info);
    home(info.products)
}

async function search(searchStr) {
    let getApi = await fetch(`https://dummyjson.com/products/search?q=${searchStr}`)
    let searchResult = await getApi.json();
    localStorage.setItem("searchResult", JSON.stringify(searchResult.products));
    window.location = "./searchPage/search.html"
}

document.getElementById('searchClick').addEventListener('click', () => {
    let searchText = document.getElementById('searching')
    search(searchText.value)
})

fetchInfo();
function home(obj) {
    let galleryContainer = document.getElementsByClassName('gallery-container')[0]
    obj.forEach(arr => {
        let gitem = document.createElement('div');
        let img = document.createElement('img');
        gitem.className = 'gitem'
        img.src = arr.thumbnail;
        gitem.appendChild(img)
        galleryContainer.appendChild(gitem)
    })
}