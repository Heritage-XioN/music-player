let audioControlsCard = document.querySelector('.audio-controls-card')
let currentTimer = document.querySelector('.current-timer')
let durationTimer = document.querySelector('.duration-timer')
let playPause = document.querySelector('.play-icon-container')
let prevBtn = document.getElementById('prev')
let nextBtn = document.getElementById('next')
let repeatIcon = document.querySelector('.repeat')
let shuffleIcon = document.querySelector('.shuffle')
let silentIcon = document.querySelector('.silent')
let artist = document.querySelector('.artist-name')
let track = document.querySelector('.track-name')
let progressCont = document.querySelector('.progress-container')

let islooping = false;
let isShuffleOn = false;
let isSilent = false;
let playPauseIcon = "play"
let index = 0;

let playlist = [
  {
    name:"LAGOS TO KAMPALA",
    artist: "Runtown Ft Wizkid",
    file_path:"LAGOS_TO_KAMPALA_-FT._WIZKID___JustNaijaBase.com.mp3"
  },
  {
    name:"COLORS",
    artist: "Jason Derulo",
    file_path:"Jason-Derulo-Colors-via-Naijafinix.com_.mp3"
  },
  {
    name:"Come Closer",
    artist:"Wizkid Ft Drake",
    file_path:"Wizkid_Ft_Drake_-_Come_Closer.mp3"
  },
  {
    name:"Bleach Opening 5",
    artist:"Rolling Star",
    file_path:"yt1s.com_Bleach_Opening_5_FULL_Rolling_Star.mp3"
  },
  {
    name:"Flashlight",
    artist:"Jessie",
    file_path:"yt1s.com_Jessie_Flashlight_from_Pitch_Perfect_2_Official_Video.mp3"
  }
  ]

let audio = document.createElement('audio')
//audio.setAttribute('controls','true')
audio.setAttribute('src',`assets/audio/${playlist[index].file_path}`)
track.textContent = playlist[index].name
artist.textContent = playlist[index].artist
audioControlsCard.appendChild(audio)
audio.addEventListener('ended', (e) => {
  if(islooping === false){
    if(index == playlist.length){
      index = 0;
      audio.src = `./assets/audio/${playlist[index].file_path}`
      track.textContent = playlist[index].name
      artist.textContent = playlist[index].artist
      audio.play();
  }else{
    index = index + 1;
    audio.src = `./assets/audio/${playlist[index].file_path}`
    audio.play();
    track.textContent = playlist[index].name
    artist.textContent = playlist[index].artist
    }
  }
})

function formatTime(duration){
  const minutes = Math.floor(duration / 60)
  const seconds = Math.floor(duration % 60)
  let result = `${minutes}:${seconds.toString().padStart(2,'0')}`
  return result
}

let progressBar = document.createElement('input')
progressBar.setAttribute('type','range')
progressBar.setAttribute('min','0')
progressBar.setAttribute('max','100')
progressBar.setAttribute('value','0')
progressCont.appendChild(progressBar)
audio.addEventListener('timeupdate', (e) => {
  progressBar.setAttribute('value','0')
  let progress = (audio.currentTime / audio.duration) * 100;
  progressBar.setAttribute('value',`${progress}`)
})
progressBar.addEventListener('input', (e) => {
  let progress = progressBar.value / 100;
  audio.currentTime = progress * audio.duration;
})

audio.onloadedmetadata = () => {
  setInterval(() => {
    let currentTime = formatTime(audio.currentTime)
    let durationTime = formatTime(audio.duration)
    if(durationTime == "NaN:NaN"){
      durationTime = "0:00";
    }
    currentTimer.textContent = `${currentTime}`
    durationTimer.textContent = `${durationTime}`
  }, 100)
}

let play_pause = document.createElement('i')
play_pause.setAttribute('class',`fa-solid fa-circle-${playPauseIcon} white`)
playPause.appendChild(play_pause)

playPause.addEventListener('click', (e) => {
  if(audio.paused){
    playPauseIcon = "pause"
    play_pause.setAttribute('class',`fa-solid fa-circle-${playPauseIcon} white`)
    audio.play()
  }else{
    playPauseIcon = "play"
    play_pause.setAttribute('class',`fa-solid fa-circle-${playPauseIcon} white`)
   audio.pause();
  }
})

prevBtn.addEventListener('click', (e) => {
  index = index - 1;
  audio.src = `./assets/audio/${playlist[index].file_path}`
  track.textContent = playlist[index].name
  artist.textContent = playlist[index].artist
  audio.play();
})

nextBtn.addEventListener('click', (e) => {
  if(index <= playlist.length -1){
    index = index + 1;
    audio.src = `./assets/audio/${playlist[index].file_path}`
    track.textContent = playlist[index].name
    artist.textContent = playlist[index].artist
    audio.play();
  }else{
    alert('End of playlist')
  }
})

let rp = document.createElement('i')
rp.setAttribute('class',`fa-solid fa-repeat white`)
repeatIcon.appendChild(rp)
repeatIcon.addEventListener('click', (e) => {
  islooping = !islooping
  if(islooping){
    repeatIcon.setAttribute('class',`repeat white-circle`)
    audio.loop = islooping;
  }else{
    repeatIcon.setAttribute('class',`repeat`)
  }
})

let sh = document.createElement('i')
sh.setAttribute('class',`fa-solid fa-shuffle white`)
shuffleIcon.appendChild(sh)
shuffleIcon.addEventListener('click', (e) => {
  isShuffleOn = !isShuffleOn
  if(isShuffleOn){
    for(let i = playlist.length-1;i > 0;i--){
      let j = Math.floor(Math.random() * (i + 1))
      [playlist[i],playlist[j] = playlist[j],playlist[i]]
    }
    index = 0;
    audio.src = `./assets/audio/${playlist[index].file_path}`
    shuffleIcon.setAttribute('class',`shuffle white-circle`)
  }else{
    shuffleIcon.setAttribute('class',`shuffle`)
  }
})


let sl = document.createElement('i')
sl.setAttribute('class',`fa-solid fa-volume-xmark white`)
silentIcon.appendChild(sl)
silentIcon.addEventListener('click', (e) => {
  isSilent = !isSilent
  if(isSilent){
    silentIcon.setAttribute('class',`silent white-circle`)
  }else{
    silentIcon.setAttribute('class',`shuffle`)
  }
})
