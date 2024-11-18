document.addEventListener('DOMContentLoaded', () => {
    const musicList = [
        { title: "Música 1", artist: "Artista 1", src: "musics/Nights.wav" },
        { title: "Música 2", artist: "Artista 2", src: "musics/Purple Rain.wav" },
        { title: "Música 3", artist: "Artista 3", src: "musics/Way Back.wav" }
    ];

    let currentTrackIndex = 0;

    const musicListElement = document.getElementById('music-list');
    const audioPlayer = document.getElementById('audio-player');
    const playPauseButton = document.getElementById('play-pause');
    const currentTrackElement = document.getElementById('current-track');
    const volumeControl = document.getElementById('volume-control');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeElement = document.getElementById('current-time');
    const durationElement = document.getElementById('duration');

    function loadTrack(index) {
        const music = musicList[index];
        const musicName = music.src.split('/').pop().replace(/\.[^/.]+$/, "");
        audioPlayer.src = music.src;
        currentTrackElement.textContent = `Tocando: ${musicName}`;
        playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        audioPlayer.play();
    }

    musicList.forEach((music, index) => {
        const li = document.createElement('li');
        const musicName = music.src.split('/').pop().replace(/\.[^/.]+$/, "");
        li.textContent = musicName;
        li.addEventListener('click', () => {
            currentTrackIndex = index;
            loadTrack(currentTrackIndex);
        });
        musicListElement.appendChild(li);
    });

    playPauseButton.addEventListener('click', () => {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audioPlayer.pause();
            playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    volumeControl.addEventListener('input', (e) => {
        audioPlayer.volume = e.target.value;
    });

    audioPlayer.addEventListener('timeupdate', () => {
        const currentTime = audioPlayer.currentTime;
        const duration = audioPlayer.duration;
        progressBar.max = duration;
        progressBar.value = currentTime;
        currentTimeElement.textContent = formatTime(currentTime);
        durationElement.textContent = formatTime(duration);
    });

    progressBar.addEventListener('input', (e) => {
        audioPlayer.currentTime = e.target.value;
    });

    audioPlayer.addEventListener('ended', () => {
        currentTrackIndex = (currentTrackIndex + 1) % musicList.length;
        loadTrack(currentTrackIndex);
    });

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    }
}); 