const song = document.querySelector('.song');
const play = document.querySelector('.play');
const replay = document.querySelector('.replay');
const outline = document.querySelector('.moving-outline circle');
const video = document.querySelector('.vid-container video');

// Sounds
const sounds = document.querySelectorAll('.sound-picker button');

// Time Display
const timeDisplay = document.querySelector('.time-display');

// SVGPathElement.getTotalLength()はpathの総延長を返す
const outlineLength = outline.getTotalLength();

//Duration
const timeSelect = document.querySelectorAll('.time-select button');
let fakeDuration = 600;

outline.style.strokeDashoffset = outlineLength; //破線の始まりの位置を指定
outline.style.strokeDasharray = outlineLength; //破線の間隔を指定 値が大きいほど、間隔が広い
timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;

//Pick different sounds
sounds.forEach(sound => {
    sound.addEventListener('click', function() {
        song.src = this.dataset.sound; // to support IE10 or older, have to use getAttribute()
        video.src = this.dataset.video; // ex. this.getAttribute('data-video')
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
    // HTMLMediaElement.currentTimeは再生時間を秒単位で示す
    let currentTime = song.currentTime;
    song.currentTime = 0;
    console.log('ciao')
}

//Select sound
timeSelect.forEach(option =>{
    option.addEventListener('click',function() {
        fakeDuration = Number(this.dataset.time)

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

song.ontimeupdate = () => {
    let currentTime = song.currentTime;
    let elapsed = fakeDuration - currentTime; //elapsed = 経過した
    let seconds = Math.floor(elapsed % 60);
    let minutes = Math.floor(elapsed / 60);

    // Animate the text
    timeDisplay.textContent = `${minutes}:${seconds}`;
    // Animate the circle
    let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
    outline.style.strokeDashoffset = progress;

    if(currentTime >= fakeDuration){
        song.pause();
        song.currentTime = 0;
        play.src = './svg/play.svg';
        video.pause();
    }
}