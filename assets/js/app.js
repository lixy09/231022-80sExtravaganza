// set variables to collect data
const database = quirkyVideoDatabaseObject;
const addButton = document.querySelector("#add-button");
const airTime = document.querySelector("#airtime");
const playList = document.querySelector("#playlist");

window.addEventListener('load', init);
/**
 * 1. Window load event handler. 
 * Initializes the app when the page is fully loaded.
 */
function init() {
  // sort database.videos
  database.videos.sort(sortByTitle);
  // create element of playlist and add to the div#"playlist"
  let totalDuration = 0;
  for (let i = 0; i < database.videos.length; i++) {
    totalDuration += database.videos[i].duration;
    createPlaylist(database.videos, i);
  }
  airTime.innerHTML = durationFormat(totalDuration);
  addButton.addEventListener('click', addVideo);
};

/**
 * 2. add video to the playlist by click button
 * clear old playlist, add new video object and rewrite playlist
 * KHA8quTeRoc
 */
function addVideo() {
  const newVideo = getInput();
  // check if the inputs suit conditions
  if (newVideo.videoId.length == 11 && newVideo.artist.length >= 3 && newVideo.title.length >= 3 && !isNaN(newVideo.duration)) {
    database.videos.push(newVideo);
    playList.innerHTML = '';
    init();
    clearInput();
  }
}

/**
 * 3. create element of playlist and add to the div#"playlist"
 * @param {*} arr an array
 * @param {*} i an index
 */
function createPlaylist(arr, i) {
  const media = createMedia();
  const mediaLeft = createMediaLeft(arr, i);
  const mediaContent = createMediaContent(arr, i);
  const mediaRight = createMediaRight(arr, i);
  media.appendChild(mediaLeft);
  media.appendChild(mediaContent);
  media.appendChild(mediaRight);
}

/**
 * 3.1 create media element
 * @returns 
 */
function createMedia() {
  // <article class="card m-2 p-2">: media
  const playlistArticle = document.createElement("article");
  playlistArticle.className = "card m-2 p-2";
  playList.appendChild(playlistArticle);
  // <div class="media">: left, content, right
  const media = document.createElement("div");
  media.className = "media";
  playlistArticle.appendChild(media);
  return media;
}

/**
 * 3.2 create img element
 * @param {*} arr 
 * @param {*} i 
 * @returns 
 */
function createMediaLeft(arr, i) {
  // <div class="media-left">
  const mediaLeft = document.createElement("div");
  mediaLeft.className = "media-left";
  // <p class="image is-64x64">
  const img = document.createElement("p");
  img.className = "image is-64x64";
  mediaLeft.appendChild(img);
  // <img src="https://img.youtube.com/vi/LQiOA7euaYA/0.jpg">
  const imgSrc = document.createElement("img");
  imgSrc.setAttribute("src", `https://img.youtube.com/vi/${arr[i].videoId}/0.jpg`);
  img.appendChild(imgSrc);
  return mediaLeft;
}

/**
 * 3.3 create title element
 * @param {*} arr 
 * @param {*} i 
 * @returns 
 */
function createMediaContent(arr, i) {
  // <div class="media-content"> 
  const mediaContent = document.createElement("div");
  mediaContent.className = "media-content";
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
  return mediaContent;
}

/**
 * 3.4 create duration element
 * @param {*} arr 
 * @param {*} i 
 * @returns 
 */
function createMediaRight(arr, i) {
  // <div class="media-right">
  const mediaRight = document.createElement("div");
  mediaRight.className = "media-right";
  // <span class="has-text-grey-light">
  const durationSpan = document.createElement("span");
  durationSpan.className = "has-text-grey-light";
  durationSpan.innerHTML = durationFormat(arr[i].duration);
  mediaRight.appendChild(durationSpan);
  return mediaRight;
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
    return `${hour}:${addZero(minuteNew)}:${addZero(second)}`;
  } else {
    return `${minute}:${addZero(second)}`;
  }
}
/**
 * 4.1 add zero ahead a time less than 10
 */
function addZero(time) {
  return time = time.toString().padStart(2, '0');
}

/**
 * 5. sort the object by title
 * @param {*} arrA 
 * @param {*} arrB 
 * @returns 
 */
function sortByTitle(arrA, arrB) {
  const titleA = arrA.title.toUpperCase();
  const titleB = arrB.title.toUpperCase();
  if (titleA > titleB) {
    return 1;
  } else if (titleA < titleB) {
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

/**
 * 7. get user's input for the new video
 * @returns a new video object
 */
function getInput() {
  return {
    videoId: document.querySelector("#video-id").value,
    duration: document.querySelector("#duration").value,
    artist: document.querySelector("#artist").value,
    title: document.querySelector("#title").value
  };
}
