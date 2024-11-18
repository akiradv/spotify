document.addEventListener('DOMContentLoaded', () => {
    const musicList = [
        { title: "Nights", artist: "Soltryx", src: "musics/Nights.wav" },
        { title: "Purple Rain", artist: "Soltryx", src: "musics/Purple Rain.wav" },
        { title: "Way Back", artist: "Soltryx", src: "musics/Way Back.wav" },
        { title: "Into It", artist: "Chase Atlantic", src: "musics/Into It.wav" },
        { title: "WHAT U CALL THAT", artist: "Chase Atlantic", src: "musics/WHAT U CALL THAT.wav" },
        { title: "YOU TOO.", artist: "Chase Altantic", src: "musics/YOU TOO.wav" },
        { title: "LUST", artist: "Chase Atlantic", src: "musics/LUST.wav" },
        { title: "GREENGREENGREEN", artist: "Chase Atlantic", src: "musics/GREENGREENGREEN.wav" },
        { title: "Dancer in the Dark", artist: "Chase Altantic", src: "musics/Dancer in the Dark.wav" },
        { title: "Consume feat. Goon Des Garcons", artist: "Chase Atlantic", src: "musics/Consume feat. Goon Des Garcons.wav" },
        { title: "SWIM", artist: "Chase Atlantic", src: "musics/SWIM.wav" },
        { title: "Angeline", artist: "Chase Atlantic", src: "musics/I'm Not Okay.wav" },
        { title: "Ozone", artist: "Chase Atlantic", src: "musics/Ozone.wav" },
        { title: "Triggered", artist: "Chase Atlantic", src: "musics/Triggered.wav" },
        { title: "Keep It Up", artist: "Chase Atlantic", src: "musics/Keep It Up.wav" },
        { title: "Okay", artist: "Chase Atlantic", src: "musics/Okay.wav" },
        { title: "", artist: "Chase Atlantic", src: "musics/I'm Not Okay.wav" },
        { title: "", artist: "Chase Atlantic", src: "musics/I'm Not Okay.wav" },
        { title: "", artist: "Chase Atlantic", src: "musics/I'm Not Okay.wav" },
        { title: "", artist: "Chase Atlantic", src: "musics/I'm Not Okay.wav" },
        { title: "", artist: "Chase Atlantic", src: "musics/I'm Not Okay.wav" },
        { title: "", artist: "Chase Atlantic", src: "musics/I'm Not Okay.wav" },
        { title: "", artist: "Chase Atlantic", src: "musics/I'm Not Okay.wav" },
        { title: "", artist: "Chase Atlantic", src: "musics/I'm Not Okay.wav" },

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
    let isMusicSelected = false;

    function loadTrack(index) {
        const music = musicList[index];
        audioPlayer.src = music.src;
        currentTrackElement.textContent = `Tocando: ${music.title} - ${music.artist}`;
        playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
        audioPlayer.play();
    }

    musicList.forEach((music, index) => {
        const li = document.createElement('li');
        li.textContent = `${music.title} - ${music.artist}`;
        li.addEventListener('click', () => {
            console.log(`Música selecionada: ${music.title}`);
            currentTrackIndex = index;
            loadTrack(currentTrackIndex);
            isMusicSelected = true;
        });
        musicListElement.appendChild(li);
    });

    playPauseButton.addEventListener('click', () => {
        if (!isMusicSelected) {
            alert('Por favor, selecione uma música antes de dar play.');
        } else {
            if (audioPlayer.paused) {
                audioPlayer.play();
                playPauseButton.innerHTML = '<i class="fas fa-pause"></i>';
            } else {
                audioPlayer.pause();
                playPauseButton.innerHTML = '<i class="fas fa-play"></i>';
            }
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
