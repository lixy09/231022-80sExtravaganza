// set variables to collect data
const database = quirkyVideoDatabaseObject;
const addButton = document.querySelector("#add-button");
const airTime = document.querySelector("#airtime");

window.addEventListener('load', init);
/**
 * 1. Window load event handler. 
 * Initializes the app when the page is fully loaded.
 */
function init() {
  // sort database.videos
  database.videos.sort(sortByTitle);
  // create element of playlist and add to the div#"playlist"
  for (let i = 0; i < database.videos.length; i++) {
    createPlaylist(database.videos, i);
  }
  // add total airtime to the span#"airtime"
  airTime.innerHTML = durationFormat(totalDuration);
  // add event listener to the ADD button
  addButton.addEventListener('click', addVideo);
};

/**
 * 2. add video to the playlist by click button
 * KHA8quTeRoc
 */
function addVideo() {
  document.querySelector("#playlist").innerHTML = '';
  const newVideo = {};
  newVideo.videoId = document.querySelector("#video-id").value;
  newVideo.duration = document.querySelector("#duration").value;
  newVideo.artist = document.querySelector("#artist").value;
  newVideo.title = document.querySelector("#title").value;
  // check if the inputs suit conditions
  if (newVideo.videoId.length == 11 && newVideo.artist.length >= 3 && newVideo.title.length >= 3 && !isNaN(newVideo.duration)) {
    // update the total duration
    totalDuration += newVideo.duration;
    airTime.innerHTML = durationFormat(totalDuration);
    // push new video into database
    database.videos.push(newVideo);
    database.videos.sort(sortByTitle);
    // insert the new video to the playlist
    const newIndex = database.videos.map(i => i.videoId).indexOf(newVideo.videoId);
    for (let i = 0; i < database.videos.length; i++) {
      createPlaylist(database.videos, i);
    }
    clearInput();
  }
}


/**
 * 3. create element of playlist and add to the div#"playlist"
 * @param {*} arr an array
 * @param {*} i an index
 */
function createPlaylist(arr, i) {
  // <article class="card m-2 p-2">: media
  const playlistArticle = document.createElement("article");
  playlistArticle.className = "card m-2 p-2";
  document.querySelector("#playlist").appendChild(playlistArticle);
  // <div class="media">: left, content, right
  const media = document.createElement("div");
  media.className = "media";
  playlistArticle.appendChild(media);
  // <div class="media-left">
  const mediaLeft = document.createElement("div");
  mediaLeft.className = "media-left";
  media.appendChild(mediaLeft);
  // <p class="image is-64x64">
  const img = document.createElement("p");
  img.className = "image is-64x64";
  mediaLeft.appendChild(img);
  // <img src="https://img.youtube.com/vi/LQiOA7euaYA/0.jpg">
  const imgSrc = document.createElement("img");
  imgSrc.setAttribute("src", `https://img.youtube.com/vi/${arr[i].videoId}/0.jpg`);
  img.appendChild(imgSrc);
  // <div class="media-content"> 
  const mediaContent = document.createElement("div");
  mediaContent.className = "media-content";
  media.appendChild(mediaContent);
  // <div class="content">
  const content = document.createElement("div");
  content.className = "content";
  mediaContent.appendChild(content);
  // <a href="https://youtu.be/LQiOA7euaYA">
  const videoHref = document.createElement("a");
  videoHref.setAttribute("href", `https://youtu.be/${arr[i].videoId}`);
  // <strong>Talking Heads</strong> - Road to Nowhere
  videoHref.innerHTML = `<strong>${arr[i].artist}</strong> - ${arr[i].title}`;
  content.appendChild(videoHref);
  // <div class="media-right">
  const mediaRight = document.createElement("div");
  mediaRight.className = "media-right";
  media.appendChild(mediaRight);
  // <span class="has-text-grey-light">
  const durationSpan = document.createElement("span");
  durationSpan.className = "has-text-grey-light";
  durationSpan.innerHTML = durationFormat(arr[i].duration);
  mediaRight.appendChild(durationSpan);
}

// calculate total duration
let totalDuration = 0;
for (let i = 0; i < database.videos.length; i++) {
  totalDuration += database.videos[i].duration;
}

/**
 * 4. transfer duration into human readable format
 * @param {*} duration a time
 * @returns a string
 */
function durationFormat(duration) {
  const second = duration % 60;
  const minute = (duration - second) / 60;
  if (minute >= 60) {
    const minuteNew = minute % 60;
    const hour = (minute - minuteNew) / 60;
    if (minuteNew < 10) {
      if (second < 10) {
        return `${hour}:0${minuteNew}:0${second}`;
      } else {
        return `${hour}:0${minuteNew}:${second}`;
      }
    } else {
      if (second < 10) {
        return `${hour}:${minuteNew}:0${second}`;
      } else {
        return `${hour}:${minuteNew}:${second}`;
      }
    }
  } else {
    if (second < 10) {
      return `${minute}:0${second}`;
    } else {
      return `${minute}:${second}`;
    }
  }
}

/**
 * 5. Sort playlist by title
 * @param {*} arrA 
 * @param {*} arrB 
 * @returns 
 */
function sortByTitle(arrA, arrB) {
  if (arrA.title > arrB.title) {
    return 1;
  } else if (arrA.title < arrB.title) {
    return -1;
  } else {
    return 0;
  }
}

/**
 * 6. clear input box after adding new video into database
 */
function clearInput() {
  document.querySelector("#video-id").value = '';
  document.querySelector("#artist").value = '';
  document.querySelector("#title").value = '';
  document.querySelector("#duration").value = '';
}
