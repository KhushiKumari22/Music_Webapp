const songList = [
  {
    name: "Lover",
    img: "./img/lover.png",
    src: "./mp3/lover.mp3",
  },
  {
    name: "Tera yaar hoon mai",
    img: "./img/tera_yaar.jpg",
    src: "./mp3/tera_yaar.mp3",
  },
  {
    name: "Sapna jahan",
    img: "./img/sapna_jahan.jpg",
    src: "./mp3/sapna_jahan.mp3",
  },
  {
    name: "Tera fitoor",
    img: "./img/tera_fitoor.jpg",
    src: "./mp3/tera_fitoor.mp3",
  },
  {
    name: "Saathiyaan",
    img: "./img/saathiyaan.jpg",
    src: "./mp3/saathiyaan.mp3",
  },
  {
    name: "Jogi",
    img: "./img/jogi.webp",
    src: "./mp3/jogi.mp3",
  },
  {
    name: "Do Anjane Ajnabi",
    img: "./img/do_anjane.jpeg",
    src: "./mp3/do_anjane.mp3",
  },
  {
    name: "Mere yara",
    img: "./img/mere_yara.jpg",
    src: "./mp3/mere_yara.mp3",
  },
  {
    name: "Tere Hawaale",
    img: "./img/tere_hawale.jpg",
    src: "./mp3/tere_hawale.mp3",
  },
  {
    name: "Aaoge Jab Tum",
    img: "./img/aaoge_jab_tum.jpg",
    src: "./mp3/aaoge_jab_tum.mp3",
  },
];
let songIndex = 0;
const audio = document.getElementById("audio");
const audioSrc = document.getElementById("audio-src");
const songName = document.getElementById("song-name");
const songImg = document.getElementById("song-img");
const musicPlayerWrapper = document.getElementById("music-player-wrapper");
const musicPlayer = document.getElementById("music-player");
const musicPlayerContent = document.getElementById("music-player-content");

let isPlayListOpen = false;

function init() {
  const song = songList[songIndex];
  audioSrc.src = song.src;
  songName.innerHTML = song.name;
  songImg.src = song.img;
}
init();

function addSidebar() {
  const div = document.createElement("div");
  div.id = "music-playlist";
  div.className = "music-playlist";
  const ul = document.createElement("ul");
  ul.id = "ul";

  songList.map((song, index) => {
    const li = document.createElement("li");
    li.innerHTML = song.name;
    li.id = "li-" + index;
    li.className = "song-li";
    li.dataset.index = index;
    li.innerHTML = song.name;
    ul.append(li);
    li.addEventListener("click", playSong);
  });
  div.appendChild(ul);
  musicPlayerContent.appendChild(div);
  activeSong();
}

function playSong(e) {
  let pauseAudio = false;
  const playPauseIcon = document.getElementById("play-pause-icon");
  if (e.currentTarget.className == "song-li") {
    songIndex = e.target.dataset.index;
  } else if (e.currentTarget.id == "previous-song") {
    songIndex--;
    if (songIndex < 0) songIndex = songList.length - 1;
  } else if (e.currentTarget.id == "next-song") {
    songIndex++;
    if (songIndex == songList.length) songIndex = 0;
  } else if ((e.currentTarget.id = "play-pause-song")) {
    if (audio.paused) {
      playPauseIcon.classList.toggle("fa-play");
      playPauseIcon.classList.toggle("fa-pause");
      audio.play();
    } else if (!audio.paused) {
      pauseAudio = true;
      audio.pause();
      playPauseIcon.classList.toggle("fa-play");
      playPauseIcon.classList.toggle("fa-pause");
    }
  } else {
    songIndex = e.target.dataset.index;
  }
  const song = songList[songIndex];
  songName.innerHTML = song.name;
  audioSrc.src = song.src;
  songImg.src = song.img;
  if (!pauseAudio) {
    playPauseIcon.className = "fa-solid fa-2xl fa-pause";
    audio.load();
    audio.play();
  }
  activeSong();
}
function activeSong() {
  songList.map((song, index) => {
    const songListItem = document.getElementById("li-" + index);
    if (index == songIndex) {
      if (songListItem != null) {
        const existingMusicIcon = document.getElementById(
          "li-" + index + "-music-icon"
        );
        if (existingMusicIcon == null) {
          let musicIcon = document.createElement("i");
          musicIcon.className = "music-icon fa-solid fa-music fa-beat-fade";
          musicIcon.id = "li-" + index + "-music-icon";
          songListItem.appendChild(musicIcon);
          songListItem.classList.add("active");
          songListItem.scrollIntoView();
        }
      }
    } else {
      const musicIcon = document.getElementById("li-" + index + "-music-icon");
      if (musicIcon != null) musicIcon.remove();
      if (songListItem != null) songListItem.classList.remove("active");
    }
  });
}

function showPlaylist() {
  if (!isPlayListOpen) {
    isPlayListOpen = true;
    addSidebar();
    musicPlayerWrapper.classList.toggle("show-playlist");
  } else {
    const musicPlaylist = document.getElementById("music-playlist");
    musicPlaylist.classList.toggle("hide");
    musicPlayerWrapper.classList.toggle("show-playlist");
  }
}

function onPlayPause(e) {
  console.log("djfhjh");
  const playPauseIcon = document.getElementById("play-pause-icon");
  if (audio.paused) {
    playPauseIcon.className = "fa-solid fa-2xl fa-play";
  } else if (!audio.paused) {
    playPauseIcon.className = "fa-solid fa-2xl fa-pause";
  }
}
