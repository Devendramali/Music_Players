const music = new Audio("vande.mp3");

const songs = [
  {
    id: "1",
    songname: `On my Way
        <br>
        <div class="subtitle">Alan walker</div>`,
    poster: "1.jpg",
  },
  {
    id: "2",
    songname: `Alan Walker-Fada 
        <br>
        <div class="subtitle">Alan walker</div>`,
    poster: "2.jpg",
  },
  {
    id: "3",
    songname: `Cartoon - On & on
        <br>
        <div class="subtitle">Deniel Levi</div>`,
    poster: "3.jpg",
  },
  {
    id: "4",
    songname: `Warriyo - Mortals
        <br>
        <div class="subtitle">Mortals</div>`,
    poster: "4.jpg",
  },
  {
    id: "5",
    songname: `Ertugrul Gazi
        <br>
        <div class="subtitle">Ertugrul</div>`,
    poster: "5.jpg",
  },
  {
    id: "6",
    songname: `Electronic music
        <br>
        <div class="subtitle">Electro</div>`,
    poster: "6.jpg",
  },
  {
    id: "7",
    songname: `Agar Tum Sath Ho
        <br>
        <div class="subtitle">Tamasha</div>`,
    poster: "7.jpg",
  },
  {
    id: "8",
    songname: `Suna Hai
        <br>
        <div class="subtitle">Neha KaKker</div>`,
    poster: "8.jpg",
  },
  {
    id: "9",
    songname: `Dilbar
        <br>
        <div class="subtitle">Satyameva Jayate</div>`,
    poster: "9.jpg",
  },
  {
    id: "10",
    songname: `Duniya
        <br>
        <div class="subtitle">Luka Chuppi</div>`,
    poster: "10.jpg",
  },
  {
    id: "11",
    songname: `Lagdi Lahor Di
        <br>
        <div class="subtitle">Street Dancer 3D</div>`,
    poster: "11.jpg",
  },
  {
    id: "12",
    songname: `Putt Jatt Da
    <br>
    <div class="subtitle">Putt Jatt Da</div>`,
    poster: "12.jpg",
  },
  {
    id: "13",
    songname: `Baarishein
        <br>
        <div class="subtitle">Atif Aslam</div>`,
    poster: "13.jpg",
  },
  {
    id: "14",
    songname: `Vaaste
        <br>
        <div class="subtitle">Dhvani Bhanushali</div>`,
    poster: "14.jpg",
  },
  {
    id: "15",
    songname: `Lut Gaye
        <br>
        <div class="subtitle">Jubin Nautiyal</div>`,
    poster: "15.jpg",
  },
  {
    id: "16",
    songname: `Humraah
        <br>
        <div class="subtitle">Arjit Sing</div>`,
    poster: "16.jpg",
  },
  {
    id: "17",
    songname: `Humnava mere
        <br>
        <div class="subtitle">Jubin Nautiyal</div>`,
    poster: "17.jpg",
  },
  {
    id: "18",
    songname: `Filhal
        <br>
        <div class="subtitle">Jubin Nautiyal</div>`,
    poster: "18.jpg",
  },
];
Array.from(document.getElementsByClassName("song_item")).forEach(
  (element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].poster;
    element.getElementsByTagName("h5")[0].innerHTML = songs[i].songname;
  }
);

let masterPlay = document.getElementById("masterPlay");

let wave = document.getElementsByClassName("wave")[0];
masterPlay.addEventListener("click", () => {
  if (music.paused || music.currentTime <= 0) {
    music.play();
    masterPlay.classList.remove("bi-play-fill");
    masterPlay.classList.add("bi-pause-fill");
    wave.classList.add("active2");
  } else {
    music.pause();
    masterPlay.classList.add("bi-play-fill");
    masterPlay.classList.remove("bi-pause-fill");
    wave.classList.remove("active2");
  }
});

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("playlistPlay")).forEach(
    (element) => {
      element.classList.add("bi-play-circle-fill");
      element.classList.remove("bi-pause-circle-fill");
    }
  );
};
const makeAllBackgrounds = () => {
  Array.from(document.getElementsByClassName("songItem")).forEach((element) => {
    element.style.background = "rbg(105,105,170,0)";
  });
};

let index = 0;

let poster_master_play = document.getElementById("poster_master_play");
let title = document.getElementById("title");

Array.from(document.getElementsByClassName("playlistPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      index = e.target.id;
      makeAllPlays();
      e.target.classList.remove("bi-play-circle-fill");
      e.target.classList.add("bi-pause-circle-fill");
      music.src = `${index}.mp3`;
      poster_master_play.src = `${index}.jpg`;
      music.play();

      let song_title = songs.filter((ele) => {
        return ele.id == index;
      });
      song_title.forEach((ele) => {
        let { songname } = ele;
        title.innerHTML = songname;
      });
      masterPlay.classList.remove("bi-play-fill");
      masterPlay.classList.add("bi-pause-fill");
      wave.classList.add("active2");
      music.addEventListener("ended", () => {
        masterPlay.classList.add("bi-play-fill");
        masterPlay.classList.remove("bi-pause-fill");
        wave.classList.remove("active2");
      });
      makeAllBackgrounds();
      Array.from(document.getElementsByClassName("songItem"))[
        `${index - 1}`
      ].style.background = "rbg(105,105,170,0)";
    });
  }
);

let currentstart = document.getElementById("currentstart");
let currentend = document.getElementById("currentend");
let seek = document.getElementById("seek");
let bar2 = document.getElementById("bar2");
let dot = document.getElementsByClassName("dot")[0];

music.addEventListener("timeupdate", () => {
  let music_curr = music.currentTime;
  let music_dur = music.duration;

  let min = Math.floor(music_dur / 60);
  let sec = Math.floor(music_dur % 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  currentend.innerText = `${min}:${sec}`;

  let min1 = Math.floor(music_curr / 60);
  let sec1 = Math.floor(music_curr % 60);
  if (sec1 < 10) {
    sec1 = `0${sec1}`;
  }
  currentstart.innerText = `${min1}:${sec1}`;
  let progressbar = parseInt((music.currentTime / music.duration) * 100);
  seek.value = progressbar;
  let seekbar = seek.value;
  bar2.style.width = `${seekbar}%`;
  dot.style.left = `${seekbar}%`;
});

seek.addEventListener("change", () => {
  music.currentTime = (seek.value * music.duration) / 100;
});

music.addEventListener("ended", () => {
  masterPlay.classList.add("bi-play-fill");
  masterPlay.classList.remove("bi-pause-fill");
  wave.classList.remove("active2");
});

let vol_icon = document.getElementById("vol_icon");
let vol = document.getElementById("vol");
let vol_dot = document.getElementById("vol_dot");
let vol_bar = document.getElementsByClassName("vol_bar")[0];

vol.addEventListener("change", () => {
  if (vol.value == 0) {
    vol_icon.classList.remove("bi-volume-down-fill");
    vol_icon.classList.add("bi-volume-mute-fill");
    vol_icon.classList.remove("bi-volume-up-fill");
  }
  if (vol.value > 0) {
    vol_icon.classList.add("bi-volume-down-fill");
    vol_icon.classList.remove("bi-volume-mute-fill");
    vol_icon.classList.remove("bi-volume-up-fill");
  }
  if (vol.value > 50) {
    vol_icon.classList.remove("bi-volume-down-fill");
    vol_icon.classList.remove("bi-volume-mute-fill");
    vol_icon.classList.add("bi-volume-up-fill");
  }

  let vol_a = vol.value;
  vol_bar.style.width = `${vol_a}%`;
  vol_dot.style.left = `${vol_a}%`;
  music.volume = vol_a / 100;
});

let back = document.getElementById("back");
let next = document.getElementById("next");

back.addEventListener("click", () => {
  index -= 1;
  if (index < 1) {
    index = Array.from(document.getElementsByClassName("song_item")).length;
  }
  music.src = `${index}.mp3`;
  poster_master_play.src = `${index}.jpg`;
  music.play();

  let song_title = songs.filter((ele) => {
    return ele.id == index;
  });
  song_title.forEach((ele) => {
    let { songname } = ele;
    title.innerHTML = songname;
  });
  makeAllPlays();
  document.getElementById(`${index}`).classList.remove("bi-play-fill");
  document.getElementById(`${index}`).classList.add("bi-pause-fill");
  makeAllBackgrounds();
  Array.from(document.getElementsByClassName("songItem"))[
    `${index - 1}`
  ].style.background = "rbg(105,105,170,0)";
});

next.addEventListener("click", () => {
  index -= 0;
  index += 1;
  if (index > Array.from(document.getElementsByClassName("song_item")).length) {
    index = 1;
  }
  music.src = `${index}.mp3`;
  poster_master_play.src = `${index}.jpg`;
  music.play();

  let song_title = songs.filter((ele) => {
    return ele.id == index;
  });
  song_title.forEach((ele) => {
    let { songname } = ele;
    title.innerHTML = songname;
  });
  makeAllPlays();
  document.getElementById(`${index}`).classList.remove("bi-play-fill");
  document.getElementById(`${index}`).classList.add("bi-pause-fill");
  makeAllBackgrounds();
  Array.from(document.getElementsByClassName("songItem"))[
    `${index - 1}`
  ].style.background = "rbg(105,105,170,0)";
});

let left_scroll = document.getElementById("left_scroll");
let right_scroll = document.getElementById("right_scroll");
let pop_song = document.getElementsByClassName("pop_song")[0];

left_scroll.addEventListener("click", () => {
  pop_song.scrollLeft -= 330;
});
right_scroll.addEventListener("click", () => {
  pop_song.scrollLeft += 330;
});

let left_scrolls = document.getElementById("left_scrolls");
let right_scrolls = document.getElementById("right_scrolls");
let item = document.getElementsByClassName("item")[0];

left_scrolls.addEventListener("click", () => {
  item.scrollLeft -= 330;
});
right_scrolls.addEventListener("click", () => {
  item.scrollLeft += 330;
});
