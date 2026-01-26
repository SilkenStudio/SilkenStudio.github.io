const track = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

let currentIndex = 0;

function getItemsPerView() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1200) return 2;
    return 3;
}

function updateCarousel() {
    const itemsPerView = getItemsPerView();
    const items = document.querySelectorAll('.carousel-item');
    const itemWidth = items[0].offsetWidth;
    const gap = 32; // 2rem en pixels
    const offset = -(currentIndex * (itemWidth + gap));
    track.style.transform = `translateX(${offset}px)`;
    
    // Disable buttons at edges
    const maxIndex = Math.max(0, items.length - itemsPerView);
    prevBtn.disabled = currentIndex === 0;
    nextBtn.disabled = currentIndex >= maxIndex;
    
    prevBtn.style.opacity = currentIndex === 0 ? '0.3' : '1';
    nextBtn.style.opacity = currentIndex >= maxIndex ? '0.3' : '1';
}

prevBtn.addEventListener('click', () => {
    if (currentIndex > 0) {
        currentIndex--;
        updateCarousel();
    }
});

nextBtn.addEventListener('click', () => {
    const items = document.querySelectorAll('.carousel-item');
    const itemsPerView = getItemsPerView();
    const maxIndex = Math.max(0, items.length - itemsPerView);
    
    if (currentIndex < maxIndex) {
        currentIndex++;
        updateCarousel();
    }
});

// Update on window resize
window.addEventListener('resize', () => {
    const items = document.querySelectorAll('.carousel-item');
    const itemsPerView = getItemsPerView();
    const maxIndex = Math.max(0, items.length - itemsPerView);
    
    if (currentIndex > maxIndex) {
        currentIndex = maxIndex;
    }
    updateCarousel();
});

// Initial setup
updateCarousel();