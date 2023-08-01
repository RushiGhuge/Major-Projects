const searchString = document.getElementById('searchString');
const searchBtn = document.getElementById('searchBtn');
//this is youtube v3 base url
const apiKey = 'AIzaSyCQ7IdKd1FP19xlomz_tKb6Urrp01Jy0i4';
const baseUrl = `https://www.googleapis.com/youtube/v3`;
const rightContainer = document.getElementById('right-container');
getHomeVideos();

searchBtn.addEventListener('click', () => {
  let searchStr = searchString.value.trim()
  if (searchStr === ' ') {
    return;
  }
  getSearchResults(searchStr);
})

async function getSearchResults(searchString) {
  // let url = `${baseUrl}/search?key=${apiKey}&q=${searchString}&part=snippet&maxResults=10`
  // let url = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCQ7IdKd1FP19xlomz_tKb6Urrp01Jy0i4&q=java'
  let url = `${baseUrl}/search?key=${apiKey}&q=${searchString}&part=snippet&maxResults=50`
  console.log(url);
  const response = await fetch(url, { method: 'GET' });
  const result = await response.json();
  console.log(result);
  appendVideoInContainer(result.items)
}

async function getHomeVideos() {
  // let url = `${baseUrl}/search?key=${apiKey}&q=${searchString}&part=snippet&maxResults=10`
  // let url = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCQ7IdKd1FP19xlomz_tKb6Urrp01Jy0i4&q=java'
  let url = `${baseUrl}/search?key=${apiKey}&q=stockmarket&part=snippet&maxResults=50`
  // console.log(url);
  const response = await fetch(url, { method: 'GET' });
  const result = await response.json();
  // console.log(result);
  homeContainer(result.items)
}


function appendVideoInContainer(list) {
  removeElements(document.getElementById('video-container'));
  removeElements(document.getElementById('home-video-container'));

  const videoCon = document.createElement('div');
  videoCon.id = 'video-container';

  list.forEach(videoCard => {
    let snippet = videoCard.snippet;
    let vCard = document.createElement('div');
    vCard.className = 'video-card';
    vCard.innerHTML = `
                    <div class="thumb-img">
                        <img src="${snippet.thumbnails.high.url}" alt="">
                    </div>
                    <div class="video-details">
                        <p class="title">${snippet.title}</p>
                        <p class="channelTitel">${snippet.channelTitle}</p>
                        <p class="video-description">${snippet.description}</p>
                    </div>
      `
    videoCon.appendChild(vCard);
    rightContainer.appendChild(videoCon);
  })
}

function removeElements(item) {
  if (item === null) {
    return;
  }
  item.remove();
}

function homeContainer(list) {
  removeElements(document.getElementById('video-container'));
  removeElements(document.getElementById('home-video-container'));

  const homeContainer = document.createElement('div');
  homeContainer.id = "home-video-container";
  list.forEach(item => {
    const homeCard = document.createElement('div');
    let snippet = item.snippet;
    homeCard.className = 'home-card';
    homeCard.innerHTML = `
      <div class="thumb-img">
      <img src="${snippet.thumbnails.high.url}" alt="">
      </div>

     <div class="cardDetails">
        <p class="htitle">${snippet.title}</p>
        <p class="channelTitel">${snippet.channelTitle}</p>
     </div>`
     homeContainer.appendChild(homeCard);
  })
  rightContainer.appendChild(homeContainer);
}

document.getElementById('home').addEventListener('click',()=>{
  getHomeVideos();
})