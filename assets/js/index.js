// Audio player functionality
let currentAudio = null;
let currentSong = null;

function play2(audioSrc, songTitle, artistName, imageSrc) {
    const audio = document.getElementById('audio');
    const source = document.getElementById('src');
    
    // Update player bar
    const playerBar = document.querySelector('.player-bar');
    const nowPlaying = playerBar.querySelector('.now-playing');
    const trackInfo = nowPlaying.querySelector('.track-info');
    
    // Update image
    nowPlaying.querySelector('img').src = imageSrc;
    
    // Update text
    trackInfo.querySelector('.track-title').textContent = songTitle;
    trackInfo.querySelector('.track-artist').textContent = artistName;
    
    if (currentAudio === audioSrc) {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }
    } else {
        source.src = audioSrc;
        audio.load();
        audio.play();
        currentAudio = audioSrc;
        currentSong = {
            title: songTitle,
            artist: artistName,
            image: imageSrc,
            src: audioSrc
        };
    }
}

// Navigation functions
function dis() {
    window.location.href = 'index.html';
}

function artist() {
    window.location.href = 'artist.html';
}

function album() {
    window.location.href = 'album.html';
}

function stations() {
    window.location.href = 'radio.html';
}

function download() {
    window.location.href = 'download.html';
}

function purchased() {
    window.location.href = 'purchased.html';
}

function fav() {
    // Implement favorites functionality
    console.log('Favorites clicked');
}

// Category button functionality
document.addEventListener('DOMContentLoaded', () => {
    const categoryButtons = document.querySelectorAll('.category-btn');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Filter songs based on category
            const category = button.id;
            const songCards = document.querySelectorAll('.song-card');
            
            songCards.forEach(card => {
                const songCategory = card.getAttribute('data-category');
                if (category === 'today' || songCategory === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});

// Search functionality
const searchInput = document.querySelector('.search-container input');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const songCards = document.querySelectorAll('.song-card');
    
    songCards.forEach(card => {
        const title = card.querySelector('.song-title').textContent.toLowerCase();
        const artist = card.querySelector('.artist-name').textContent.toLowerCase();
        
        if (title.includes(searchTerm) || artist.includes(searchTerm)) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
});

// Add event listeners for song cards
document.addEventListener('DOMContentLoaded', () => {
    const songCards = document.querySelectorAll('.song-card');
    
    songCards.forEach(card => {
        card.addEventListener('click', () => {
            const songTitle = card.querySelector('.song-title').textContent;
            const artistName = card.querySelector('.artist-name').textContent;
            const imageSrc = card.querySelector('.song-image img').src;
            const audioSrc = card.getAttribute('data-audio');
            
            play2(audioSrc, songTitle, artistName, imageSrc);
        });
    });
}); 