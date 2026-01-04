// View toggle functionality
document.addEventListener('DOMContentLoaded', () => {
    const viewButtons = document.querySelectorAll('.view-btn');
    const artistsGrid = document.querySelector('.artists-grid');
    
    viewButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            viewButtons.forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            button.classList.add('active');
            
            // Toggle between grid and list view
            if (button.querySelector('.fa-list')) {
                artistsGrid.classList.add('list-view');
            } else {
                artistsGrid.classList.remove('list-view');
            }
        });
    });
});

// Artist card hover effects
const artistCards = document.querySelectorAll('.artist-card');
artistCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const playBtn = card.querySelector('.play-btn');
        playBtn.style.transform = 'scale(1)';
    });
    
    card.addEventListener('mouseleave', () => {
        const playBtn = card.querySelector('.play-btn');
        playBtn.style.transform = 'scale(0.8)';
    });
});

// Search functionality
const searchInput = document.querySelector('.search-container input');
searchInput.addEventListener('input', (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const artistCards = document.querySelectorAll('.artist-card');
    
    artistCards.forEach(card => {
        const artistName = card.querySelector('h3').textContent.toLowerCase();
        const artistGenre = card.querySelector('p').textContent.toLowerCase();
        
        if (artistName.includes(searchTerm) || artistGenre.includes(searchTerm)) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Play button functionality
const playButtons = document.querySelectorAll('.play-btn');
playButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent card click event
        const card = button.closest('.artist-card');
        const artistName = card.querySelector('h3').textContent;
        
        // Update player bar with artist info
        const playerBar = document.querySelector('.player-bar');
        const nowPlaying = playerBar.querySelector('.now-playing');
        const trackInfo = nowPlaying.querySelector('.track-info');
        
        // Update image
        const artistImage = card.querySelector('.artist-image img').src;
        nowPlaying.querySelector('img').src = artistImage;
        
        // Update text
        trackInfo.querySelector('.track-title').textContent = artistName;
        trackInfo.querySelector('.track-artist').textContent = 'Top Tracks';
        
        // Play music (you would need to implement actual music playback)
        console.log(`Playing top tracks for ${artistName}`);
    });
});
