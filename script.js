console.log("Welcome to spotify")
// Initialize variable
let songIndex = 0;
let audioElement = new Audio("");
let masterPlay = document.getElementById("masterPlay")
let myProgressBar = document.getElementById("myProgressBar")
let gif = document.getElementById("gif")
let masterSongName = document.getElementById("masterSongName")
let songItem = Array.from(document.getElementsByClassName("songItem"))
let songItemPlay = document.getElementsByClassName("songItemPlay")
let songs = [
    { songname: "Meri Zindagi hai TU", filepath: "Songs/1.mp3", coverPath: "Cover/1.jpg" },
    { songname: "Galliyan ", filepath: "Songs/2.mp3", coverPath: "Cover/2.jpg" },
    { songname: "Galliyan Returns", filepath: "Songs/3.mp3", coverPath: "Cover/3.jpg" },
    { songname: "Chal Ghar Chalen", filepath: "Songs/4.mp3", coverPath: "Cover/4.jpg" },
    { songname: "Dil Hi Toh Hai", filepath: "Songs/5.mp3", coverPath: "Cover/5.jpg" },
    { songname: "Sooraj Dooba Hain", filepath: "Songs/6.mp3", coverPath: "Cover/6.jpg" },
    { songname: "Woh Din", filepath: "Songs/7.mp3", coverPath: "Cover/7.jpg" },
    { songname: "Rahogi Meri", filepath: "Songs/8.mp3", coverPath: "Cover/8.jpg" }
]
songItem.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songname;
})
// audioElement.play()
//Handle play /pause click
masterPlay.addEventListener("click", () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        masterPlay.classList.remove("fa-circle-play")
        masterPlay.classList.add("fa-circle-pause")
        audioElement.play()
        gif.style.opacity = 1
    }
    else {
        masterPlay.classList.remove("fa-circle-pause")
        masterPlay.classList.add("fa-circle-play")
        audioElement.pause()
        gif.style.opacity = 0



    }
})
//listen to Event
audioElement.addEventListener('timeupdate', () => {
    //Update seek Bar
    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    myProgressBar.value = progress
})
myProgressBar.addEventListener("change", () => {
    audioElement.currentTime = (myProgressBar.value * audioElement.duration) / 100;
})
const makeAllPlays = () => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
        element.classList.remove("fa-circle-pause");

        element.classList.add("fa-circle-play");

    })

}
Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) => {
    element.addEventListener("click", (e) => {
        // console.log(e.target)
        // console.log(makeAllPlays())
        makeAllPlays();

        let songIndex = parseInt(e.target.id)
        masterSongName.innerText = songs[songIndex].songname;
        if (audioElement.paused || audioElement.currentTime <= 0) {
            e.target.classList.remove("fa-circle-play");
            e.target.classList.add("fa-circle-pause");
            // audioElement.src = "Songs/3.mp3";
            audioElement.src = `Songs/${songIndex + 1}.mp3`;
            audioElement.currentTime = 0;

            audioElement.play();
            gif.style.opacity = 1;
            masterPlay.classList.remove("fa-circle-play");
            masterPlay.classList.add("fa-circle-pause");
        }
        else {
            e.target.classList.remove("fa-circle-pause");
            e.target.classList.add("fa-circle-play");
            // audioElement.src = "Songs/3.mp3";
            // audioElement.src = `Songs/${songIndex + 1}.mp3`;
            audioElement.currentTime = 0;

            audioElement.pause();
            gif.style.opacity = 0;
            masterPlay.classList.remove("fa-circle-pause");
            masterPlay.classList.add("fa-circle-play");
        }
    })
})
document.getElementById("next").addEventListener('click', () => {
    if (songIndex >= 9) {

        songIndex = 0;
    }
    else {
        songIndex += 1;
    }
    audioElement.src = `Songs/${songIndex + 1}.mp3`;
    audioElement.currentTime = 0;
    masterSongName.innerText = songs[songIndex].songname;
    audioElement.play();
    gif.style.opacity = 1
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
})
document.getElementById("previous").addEventListener('click', () => {
    if (songIndex <= 0) {

        songIndex = 0;
    }
    else {
        songIndex -= 1;
    }
    audioElement.src = `Songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songname;
    audioElement.currentTime = 0;
    audioElement.play();
    gif.style.opacity = 1

    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
})