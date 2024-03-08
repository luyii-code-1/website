const playlist = document.querySelector('.playlist');
const audio = document.querySelector('audio');
const playPauseBtn = document.querySelector('.play-pause');
const prevBtn = document.querySelector('.prev');
const nextBtn = document.querySelector('.next');

const tracks = [];

// Load tracks from the /music directory
fetch('/music')
  .then(response => response.json())
  .then(data => {
    data.forEach(item => {
      if (item.type === 'file' && item.name.endsWith('.mp3')) {
        tracks.push(item.name);
        const trackItem = document.createElement('li');
        trackItem.textContent = item.name.replace('.mp3', '');
        playlist.appendChild(trackItem);
      }
    });
  });

let currentTrackIndex = 0;

function playTrack() {
  const track = tracks[currentTrackIndex];
  const trackUrl = `/music/${track}`;
  audio.src = trackUrl;
  audio.play();
}

function togglePlayPause() {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function playNextTrack() {
  currentTrackIndex++;
  if (currentTrackIndex >= tracks.length) {
    currentTrackIndex = 0;
  }
  playTrack();
}

function playPrevTrack() {
  currentTrackIndex--;
  if (currentTrackIndex < 0) {
    currentTrackIndex = tracks.length - 1;
  }
  playTrack();
}

playPauseBtn.addEventListener('click', togglePlayPause);
nextBtn.addEventListener('click', playNextTrack);
prevBtn.addEventListener('click', playPrevTrack);

audio.addEventListener('ended', playNextTrack);
