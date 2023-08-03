const searchString = document.getElementById('searchString');
const searchBtn = document.getElementById('searchBtn');
//this is youtube v3 base url
const apiKey = 'AIzaSyBqS3_eoVwSb0y5JgkWETj6gGWyVOo28hQ';
const baseUrl = `https://www.googleapis.com/youtube/v3`;
const rightContainer = document.getElementById('right-container');

let VideoDetailsSearchItem = JSON.parse(localStorage.getItem('searchItem'))



if(VideoDetailsSearchItem != null){
  getSearchResults(VideoDetailsSearchItem.searchStr);
  console.log(VideoDetailsSearchItem);
  localStorage.removeItem('searchItem');
}
else{
  console.log("home");
  getHomeVideos();
}


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

async function getHomeVideos(reletedStr) {
  // let url = `${baseUrl}/search?key=${apiKey}&q=${searchString}&part=snippet&maxResults=10`
  // let url = 'https://www.googleapis.com/youtube/v3/search?key=AIzaSyCQ7IdKd1FP19xlomz_tKb6Urrp01Jy0i4&q=java'
  let url = `${baseUrl}/search?key=${apiKey}&q=FrontEndDeveloper&part=snippet&maxResults=50`
  // console.log(url);
  const response = await fetch(url, { method: 'GET' });
  const result = await response.json();
  // console.log(result);
  homeContainer(result.items)
}
//get more info about profile img and view counts -->

function appendVideoInContainer(list) {
  removeElements(document.getElementById('video-container'));
  removeElements(document.getElementById('home-video-container'));

  const videoCon = document.createElement('div');
  videoCon.id = 'video-container';

  list.forEach(videoCard => {
    let id = videoCard.id;
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

      let localData = {
        snippet,id,
      }
    vCard.addEventListener('click',()=>{
      localStorage.setItem('video',JSON.stringify(localData));
      location.href = 'videoDetails.html'
    })
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
    let id = item.id;
    homeCard.className = 'home-card';
    homeCard.innerHTML = `
      <div class="thumb-img">
      <img src="${snippet.thumbnails.high.url}" alt="">
      </div>

     <div class="cardDetails">
         <div class="profile-image">
            <img src="https://yt3.ggpht.com/ytc/AOPolaT7K31tPA6en4iHqcVIJz5Dj6avNMmsSebv5vc72zKKhI7nApcEFbjw7pyOTSjF=s48-c-k-c0x00ffffff-no-rj" alt="">
        </div>
        <div>
          <p class="htitle">${snippet.title}</p>
          <p class="channelTitel">${snippet.channelTitle}</p>
        </div>
     </div>`
     homeContainer.appendChild(homeCard);

    //  homeCard.addEventListener('click',()=>{
    //   console.log("click");
    //  })
    let localData = {
      snippet,id,
    }
    homeCard.addEventListener('click',()=>{
      localStorage.setItem('video',JSON.stringify(localData));
      location.href = 'videoDetails.html'
    })
     

  })
  rightContainer.appendChild(homeContainer);

}

document.getElementById('home').addEventListener('click',()=>{
  getHomeVideos();
})

// side bar hide and unhide------------------->
//by clicking the top left bar
//get the top left bar first
