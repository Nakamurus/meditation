const song = document.querySelector('.song');
const play = document.querySelector('.play');
const outline = document.querySelector('.moving-outline circle');
const video = document.querySelector('.vid-container video');

// Sounds
const sounds = document.querySelectorAll('.sound-picker button');

// Time Display
const timeDisplay = document.querySelector('.time-display');
const outlineLength = outline.getTotalLength();

//Duration
const timeSelect = document.querySelectorAll('.time-select button');
let fakeDuration = 600;

outline.style.strokeDashArray = outlineLength;
outline.style.strokeDashAoffset = outlineLength;
timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}: ${Math.floor(fakeDuration % 60)}`;

//Pick different sounds
sounds.forEach(sound => {
    sound.addEventListener('click', () => {
        song.src = this.getAttribute('data-sound');
        video.src = this.getAttribute('data-video');
        checkPlaying(song);
    })
})

// Play Sound
play.addEventListener('click', () => {
    checkPlaying(song);
});

replay.addEventListener('click', ()=> {
    restartSong(song);
});

const restartSong = song => {
    let currentTime = song.currentTime;
    song.currentTime = 0;
    console.log('ciao')
}

//Select sound
timeSelect.forEach(option =>{
    option.addEventListener('click',() => {
        fakeDuration = this.getAttribute('data-time');
        timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}: ${Math.floor(fakeDuration % 60)}`
    })
})

//Create a function specific to stop and play the sounds
const checkPlaying = song => {
    if(song.paused) {
        song.play();
        video.play();
        play.src = './svg/pause.svg'
    }else {
        song.pause();
        video.pause();
        play.src = './svg/play.svg'
    }
}

// we can animated the circle
song.ontimeUpdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime;
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    // Animate the circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashAoffset = progress;
    // Animate the text
    timeDisplay.textContent = `${minutes}:${seconds}`;

    if(currentTime >= fakeDuration){
        song.pause();
        song.currentTime = 0;
        play.src = './svg/play.svg';
        video.pause();
    }
}