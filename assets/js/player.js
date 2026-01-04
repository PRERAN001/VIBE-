document.addEventListener('DOMContentLoaded', () => {
    const audioPlayer = document.getElementById('audio-player');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const progressBar = document.getElementById('progress-bar');
    const currentTimeSpan = document.getElementById('current-time');
    const durationSpan = document.getElementById('duration');
    const currentSongImage = document.getElementById('current-song-image');
    const currentSongTitle = document.getElementById('current-song-title');
    const currentSongArtist = document.getElementById('current-song-artist');
    const songCards = document.querySelectorAll('.song-card');
    const searchInput = document.querySelector('.search-bar input');
    const categoryButtons = document.querySelectorAll('.category-btn');

    let currentSongIndex = 0;
    let songs = [];

    // Populate songs array from song cards
    songCards.forEach((card, index) => {
        songs.push({
            title: card.querySelector('.song-title').textContent,
            artist: card.querySelector('.song-details span:last-child').textContent,
            image: card.querySelector('.song-image img').src,
            audio: card.dataset.audio,
            element: card
        });
    });

    function loadSong(index) {
        const song = songs[index];
        audioPlayer.src = song.audio;
        currentSongImage.src = song.image;
        currentSongTitle.textContent = song.title;
        currentSongArtist.textContent = song.artist;
        audioPlayer.load();
        audioPlayer.play();
        playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        currentSongIndex = index;

        // Remove active class from all song cards
        songCards.forEach(card => card.classList.remove('active'));
        // Add active class to the currently playing song card
        song.element.classList.add('active');
    }

    function playPauseSong() {
        if (audioPlayer.paused) {
            audioPlayer.play();
            playPauseBtn.innerHTML = '<i class="fa-solid fa-pause"></i>';
        } else {
            audioPlayer.pause();
            playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
        }
    }

    function nextSong() {
        currentSongIndex = (currentSongIndex + 1) % songs.length;
        loadSong(currentSongIndex);
    }

    function prevSong() {
        currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
        loadSong(currentSongIndex);
    }

    // Event Listeners
    playPauseBtn.addEventListener('click', playPauseSong);
    nextBtn.addEventListener('click', nextSong);
    prevBtn.addEventListener('click', prevSong);

    audioPlayer.addEventListener('timeupdate', () => {
        const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        progressBar.value = progress;

        let minutes = Math.floor(audioPlayer.currentTime / 60);
        let seconds = Math.floor(audioPlayer.currentTime % 60);
        currentTimeSpan.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    });

    audioPlayer.addEventListener('loadedmetadata', () => {
        let minutes = Math.floor(audioPlayer.duration / 60);
        let seconds = Math.floor(audioPlayer.duration % 60);
        durationSpan.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    });

    progressBar.addEventListener('input', () => {
        const seekTime = (progressBar.value / 100) * audioPlayer.duration;
        audioPlayer.currentTime = seekTime;
    });

    audioPlayer.addEventListener('ended', () => {
        nextSong();
    });

    songCards.forEach((card, index) => {
        card.addEventListener('click', () => {
            loadSong(index);
        });
    });

    // Search functionality
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        songCards.forEach(card => {
            const title = card.querySelector('.song-title').textContent.toLowerCase();
            const artist = card.querySelector('.song-details span:last-child').textContent.toLowerCase();
            if (title.includes(searchTerm) || artist.includes(searchTerm)) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    });

    // Initial song load
    if (songs.length > 0) {
        loadSong(0);
        audioPlayer.pause(); // Start paused
        playPauseBtn.innerHTML = '<i class="fa-solid fa-play"></i>';
    }

    // Category filtering functionality
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to the clicked button
            button.classList.add('active');

            const selectedCategory = button.id; // "today", "trending", or "new"

            songCards.forEach(card => {
                const cardCategory = card.dataset.category;
                if (selectedCategory === 'today' || cardCategory === selectedCategory) {
                    card.style.display = 'flex'; // Show if matches or if "Today's Top Picks" is selected
                } else {
                    card.style.display = 'none'; // Hide otherwise
                }
            });
        });
    });

    // Initialize with "Today's Top Picks" active
    document.getElementById('today').click();
}); 