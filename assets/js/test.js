const database = {
    videos: [
        { videoId: 'UMPC8QJF6sI', duration: 224, artist: 'Visage', title: 'Fade to Grey' },
        { videoId: 'aGSKrC7dGcY', duration: 280, artist: 'Depeche Mode', title: 'Enjoy the Silence' },
        { videoId: 'RZ2oXzrnti4', duration: 223, artist: 'The Specials', title: 'Ghost Town' },
        { videoId: 'xJeWySiuq1I', duration: 297, artist: 'Ultravox', title: 'Vienna' },
        { videoId: 'ijxk-fgcg7c', duration: 634, artist: 'The Cure', title: 'Lullaby' }
    ]
}
let totalDuration = 0;
// create element of playlist and add to the div#"playlist"
for (let i = 0; i < database.videos.length; i++) {
  totalDuration += database.videos[i].duration;
  console.log(totalDuration + " & " + database.videos[i].duration);
}
