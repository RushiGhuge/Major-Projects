const apiKey = 'AIzaSyBJ_jhWVh5pvnuNwtx739sncUqu1rAPkNk';
const baseUrl = `https://www.googleapis.com/youtube/v3`;
const searchString = document.getElementById('searchString');
const searchBtn = document.getElementById('searchBtn');
let data = JSON.parse(localStorage.getItem('video'));
let videoID = data.id.videoId;

let iframe = document.getElementsByTagName('iframe')[0]
iframe.src = `https://www.youtube.com/embed/${videoID}?start=0`;

searchBtn.addEventListener('click', () => {
    let searchStr = searchString.value.trim()
    if (searchStr === ' ') {
        return;
    }
    let searchLocalData = {
        searchStr
    }
    localStorage.setItem('searchItem', JSON.stringify(searchLocalData));
    location.href = 'index.html'

})

async function getLikeViewCount() {
    const apiUrl = `https://www.googleapis.com/youtube/v3/videos?id=${videoID}&part=snippet,statistics&key=${apiKey}`;
    let getUrl = await fetch(apiUrl, { method: 'GET' })
    let result = await getUrl.json();
    likeViewAppend(result.items);
    getRelatedVideos(result.items[0].snippet.channelTitle.trim())

}

async function getCommentsOfVideo() {
    const apiUrl = `https://www.googleapis.com/youtube/v3/commentThreads?part=snippet&videoId=${videoID}&key=${apiKey}`;
    let getUrl = await fetch(apiUrl, { method: 'GET' })
    let result = await getUrl.json();
    appendCommentBox(result.items);
}

async function getRelatedVideos(relatedTitle) {
    console.log("hi");
    let url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&q=${relatedTitle}&part=snippet&maxResults=50`
    const response = await fetch(url, { method: 'GET' });
    const result = await response.json();
    console.log("hi");
    relatadeVideos(result.items)
}

getLikeViewCount();
getCommentsOfVideo();



const leftContainer = document.getElementById('container-left');

function likeViewAppend(obj) {
    let snippet = obj[0].snippet;
    let statistics = obj[0].statistics;
    const videoCardDetails = document.createElement('div');
    videoCardDetails.className = 'video-card-details';
    videoCardDetails.innerHTML = `
    <p id="video-title">${snippet.localized.title}</p>
    <div class="Channel-details-container">
        <div class="left-channel-details">
          <img id='profileImgC' src="https://yt3.ggpht.com/VuJTYnqK4hF5H0UdAcv-nWpHtxD_rhNl8a6Nip6CbU0VUu8uAI2jYkHGNcJHHAy8PEORJI1XmQ=s48-c-k-c0x00ffffff-no-rj" alt="">
          <div id="channelShow">
            <p>${snippet.channelTitle}</p>
            <p id='subCount'>1.05M subscribers</p>
          </div>
          <button id="subscriber">Subscribe</button>
        </div>

        <div class="right-channel-details">
          <div class='likeDeslike'>
          <div class="like"><span id='likeIcon' class="material-symbols-outlined">thumb_up </span><p id='like'>${statistics.likeCount}</p></div>
          <div class="deslike x"> <span class="material-symbols-outlined">thumb_down</span> </div>
           </div>
          <div class="share x"><span class="material-symbols-outlined">forward</span>Share</div>
          <div class="download x"><span class="material-symbols-outlined">download</span>download</div>
        </div>
    </div>

    <div id="description-container">
          <div id="descreption">
            <p id="views ">${statistics.viewCount} views</p>
            <p id="descreption-details">${snippet.description}</p>
          </div>
        
          <p id='showMORE'>Show More</p>
          <p id='showLESS'>Show Less</p>

        </div>

    `
    leftContainer.appendChild(videoCardDetails)

    const showMore = document.getElementById('showMORE');
    const showLess = document.getElementById('showLESS');
    const showMax = document.getElementById('description-container');

    showMore.addEventListener('click', () => {
        showMax.style.height = 'auto';
        showMore.style.display = 'none'
        showLess.style.display = 'block'
    })
    showLess.addEventListener('click', () => {
        showMax.style.height = '160px';
        showMore.style.display = 'block'
        showLess.style.display = 'none'
    })
}
function relatadeVideos(arr) {
    console.log(arr);
    let containerRight = document.getElementById('container-right');
    arr.forEach(arr => {
        let thumbnel = arr.snippet.thumbnails.high.url;
        let channelName = arr.snippet.channelTitle;
        let title = arr.snippet.title;
        let snippet = arr.snippet;
        // console.log(arr);
        let id = arr.id;
        let relatedBox = document.createElement('div');
        relatedBox.className = 'related-box';
        relatedBox.innerHTML = `
       <div class="video-item">
            <img src="${thumbnel}" alt="">
          </div>
          <div class="detail-video-item">
            <div class="video-title">${title}</div>
            <div class="channel-name">${channelName}</div>
          </div>
       `
        containerRight.appendChild(relatedBox)

        let localData = {
            snippet, id,
        }
        relatedBox.addEventListener('click', () => {
            localStorage.setItem('video', JSON.stringify(localData));
            location.href = 'videoDetails.html'
        })

    })





}

let commentContainer = document.createElement('div');
const commentArrow = document.createElement('div');

function appendCommentBox(array) {
    commentArrow.innerHTML = `<p>Comment</p><span id='commentArrowIcon' class="material-symbols-outlined">expand_more</span>`
    commentArrow.id = 'commentArrow';
    commentContainer.appendChild(commentArrow)
    let profileImg = array[0].snippet.topLevelComment.snippet.authorProfileImageUrl
    let profile = document.getElementById('profileImgC');
    profile.src = profileImg;

    commentContainer.id = 'comment-container';
    array.forEach(arr => {
        let authorDisplayName = arr.snippet.topLevelComment.snippet.authorDisplayName;
        let comment = arr.snippet.topLevelComment.snippet.textOriginal;
        let likeCount = arr.snippet.topLevelComment.snippet.likeCount
        let commentBox = document.createElement('div');

        commentBox.className = 'comment-box';

        commentBox.innerHTML = `
        <p class="c-user-name">@${authorDisplayName}</p>
        <p>${comment}</p>
            <div class="like-dlike">
              <span class="material-symbols-outlined">thumb_up</span>
              <span>${likeCount}</span>
              <span class="material-symbols-outlined">thumb_down</span>
              <span>Reply</span>
            </div>
            <div class="reply">
              <span class="material-symbols-outlined">expand_more</span>
              <span>Reply</span>
            </div>
        `
        commentContainer.appendChild(commentBox)
    })
    leftContainer.appendChild(commentContainer)

    //this is comment drop down sections-->
    commentContainer.style.height = '160px'
    commentArrow.addEventListener('click', () => {
        if (commentContainer.style.height == '160px') {
            commentContainer.style.height = 'auto'
        }
        else {
            commentContainer.style.height = '160px'
        }
    })
    const mediaQuery = window.matchMedia('(min-width: 768px)')
    // Check if the media query is true
    if (mediaQuery.matches) {
        commentArrow.click();
    }
}

function removeElements(item) {
    if (item === null) {
        return;
    }
    item.remove();
}

// side nav bar when cliked
const barIcon = document.getElementById('barIcon');
const SideBar = document.getElementById('left-container-side-bar');
const innerBar = document.getElementById('innerBar');


barIcon.addEventListener('click', () => {
    SideBar.style.transform = "translate(0px)"
    document.getElementById('Innerbody').style.opacity = '0.5';
})
innerBar.addEventListener('click', () => {
    SideBar.style.transform = "translate(-300px)"
    document.getElementById('Innerbody').style.opacity = '1';
})


//loding bar ----> hide after 2s;
let lodingBar = document.getElementById('lodingBar');
setTimeout(() => {
    lodingBar.style.display = 'none'
}, 1000)