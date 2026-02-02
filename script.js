document.addEventListener('DOMContentLoaded', () => {
    const carousel = document.querySelector('.carousel-3d');
    const items = document.querySelectorAll('.carousel-item');
    const pill = document.getElementById('service-pill');
    const desc = document.getElementById('service-desc');

    if (!carousel || items.length === 0) return;

    let currentIndex = 0;
    const totalItems = items.length;
    const rotateAngle = 360 / totalItems;

    // Function to update carousel
    function updateCarousel() {
        // Rotate the container
        const angle = currentIndex * -120; // 3 items = 120deg apart
        carousel.style.transform = `rotateY(${angle}deg)`;

        // Update active class for items
        items.forEach((item, index) => {
            // Calculate effective index to determine which is front
            // We want the current index to be "active"
            // The logic for 3D rotation focus is a bit tricky, simpler to just rely on data attributes of the "current" one
            item.classList.remove('active');
            if (index === currentIndex % totalItems) {
                item.classList.add('active');

                // Update text
                pill.textContent = item.getAttribute('data-text');
                // text fade effect
                desc.style.opacity = 0;
                setTimeout(() => {
                    desc.textContent = item.getAttribute('data-desc');
                    desc.style.opacity = 1;
                }, 300);
            }
        });
    }

    // Initialize
    updateCarousel();

    // Auto scroll
    setInterval(() => {
        currentIndex++;
        updateCarousel();
    }, 4000); // Change every 4 seconds


    // Mobile Menu Toggle (Inline)
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navContainer = document.querySelector('.floating-nav');

    if (mobileBtn && navContainer) {
        mobileBtn.addEventListener('click', () => {
            navContainer.classList.toggle('active');

            // Optional: Toggle button text/icon
            if (navContainer.classList.contains('active')) {
                mobileBtn.innerHTML = '&#10005;'; // X icon
                mobileBtn.style.fontSize = '2rem'; // Larger icon
                mobileBtn.style.fontFamily = 'sans-serif'; // Clean font for X
            } else {
                mobileBtn.innerHTML = 'MENU +';
                mobileBtn.style.fontSize = '0.7rem'; // Reset font size
                mobileBtn.style.fontFamily = "'Press Start 2P', cursive"; // Reset font
            }
        });

        // Close when a link is clicked
        const navLinks = document.querySelectorAll('.nav-links a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navContainer.classList.remove('active');
                mobileBtn.textContent = 'MENU +';
            });
        });
    }


});
