const imgs = [
  [
    "../images/Gallery-img/page-1/3.81d31272cf06a82224dc.jpg",
    "../images/Gallery-img/page-1/5.43800ff3e4f7b599bbcb.jpg",
    "../images/Gallery-img/page-1/6.eef10a7ff35a6f1a5063.jpg",
    "../images/Gallery-img/page-1/7.b7f8c7fad842b4e445a1.jpg",
    "../images/Gallery-img/page-1/8.ff6e34e83f069c0e6f84.jpg",
    "../images/Gallery-img/page-1/9.43fc17ff384f9b603bf5.jpg",
    "../images/Gallery-img/page-1/download (1).jpeg",
    "../images/Gallery-img/page-1/download (2).jpeg",
    "../images/Gallery-img/page-1/download.jpeg",
  ],
  [
    "../images/Gallery-img/page-2/10.325119cc9ca98fb849d6.jpg",
    "../images/Gallery-img/page-2/9.43fc17ff384f9b603bf5 (1).jpg",
    "../images/Gallery-img/page-2/download (1).jpeg",
    "../images/Gallery-img/page-2/download.jpeg",
  ],
];
let now = 0;

const galleryContainer =document.getElementsByClassName("gallery-container")[0];
const pageNum = document.getElementById("pageNum");

// there are a two function prev and next
// its used for get the next page in gallery ot prev page.
// if you want to add more img in gallery section you can go to the img array and add the img url in different page as well.

function prev() {
  if (now == 0) {
    console.log(0);
    return;
  } else {
    now--;
    pageNum.innerHTML = `Page ${now+1}`
    console.log(now);
    let currentPage = imgs[now];
    console.log(currentPage);
    galleryContainer.innerHTML = "";

    imgs[now].forEach((img) => {
      let photo = document.createElement("img");
      photo.src = img;
      galleryContainer.appendChild(photo);
    });
  }
}

function next() {
  if (now == imgs.length - 1) {
    console.log("last");
    return;
  } else {
    now++;
    pageNum.innerHTML = `Page ${now+1}`
    console.log(now);
    let currentPage = imgs[now];
    console.log(currentPage);
    galleryContainer.innerHTML = "";

    imgs[now].forEach((img) => {
      let photo = document.createElement("img");
      photo.src = img;
      galleryContainer.appendChild(photo);
    });
  }
}
