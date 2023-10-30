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
  }
  database.videos.forEach(createPlaylist);
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
function createPlaylist(arr) {
  const article = createNewElement("article", "class", "card m-2 p-2", playList);
  const media = createNewElement("div", "class", "media", article);
  const mediaLeft = createNewElement("div", "class", "media-left", media);
  const img = createNewElement("p", "class", "image is-64x64", mediaLeft);
  const imgSrc = createNewElement("img", "src", `https://img.youtube.com/vi/${arr.videoId}/0.jpg`, img);
  const mediaContent = createNewElement("div", "class", "media-content", media);
  const content = createNewElement("div", "class", "content", mediaContent);
  const videoHref = createNewElement("a", "href", `https://youtu.be/${arr.videoId}`, content);
  videoHref.innerHTML = `<strong>${arr.artist}</strong> - ${arr.title}`;
  const mediaRight = createNewElement("div", "class", "media-right", media);
  const durationSpan = createNewElement("span", "class", "has-text-grey-light", mediaRight);
  durationSpan.innerHTML = durationFormat(arr.duration);
}

/**
 * 3.1 create element, set attributes, append to dom
 * @param {*} elementName 
 * @param {*} attriName 
 * @param {*} attriValue 
 * @param {*} appendTo 
 * @returns 
 */
function createNewElement(elementName, attriName, attriValue, appendTo) {
  const name = document.createElement(elementName);
  name.setAttribute(attriName, attriValue);
  appendTo.appendChild(name);
  return name;
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
