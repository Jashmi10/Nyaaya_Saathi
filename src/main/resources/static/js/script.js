
Js:// DOM Elements
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navbar = document.querySelector('.navbar');
const loading = document.createElement('div');
loading.className = 'loading';
loading.innerHTML = '<div class="spinner"></div>';
document.body.appendChild(loading);

// Loading Animation
window.addEventListener('load', () => {
    setTimeout(() => {
        loading.classList.add('hidden');
        setTimeout(() => {
            loading.remove();
        }, 500);
    }, 1000);
});

// Mobile Navigation Toggle
const navOverlay = document.getElementById('nav-overlay');

if (navToggle && navOverlay) {
    navToggle.addEventListener('click', () => {
        navOverlay.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on links
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navOverlay.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
}

// Navigation visibility control
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const navLogo = document.querySelector('.nav-logo');
    const navCta = document.querySelector('.nav-cta');

    <button id="loginBtn">Login</button>

    <script>
        document.getElementById("loginBtn").addEventListener("click", function() {
            window.open("/login", "_blank"); // Opens login page in a new tab
        });
    </script>


    if (window.scrollY > 100) {
        // Hide logo and CTA button when scrolled past hero section
        if (navLogo) navLogo.style.display = 'none';
        if (navCta) navCta.style.display = 'none';
        // Make navbar transparent
        navbar.style.background = 'transparent';
        navbar.style.borderBottom = 'none';
    } else {
        // Show logo and CTA button on home page
        if (navLogo) navLogo.style.display = 'block';
        if (navCta) navCta.style.display = 'flex';
        // Restore navbar background
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.borderBottom = '1px solid var(--accent-5)';
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Add scroll animation to elements
document.querySelectorAll('.feature-card, .issue-card, .lawyer-card, .impact-content').forEach(el => {
    el.classList.add('scroll-animate');
    observer.observe(el);
});



// Enhanced Carousel functionality
const carouselContainer = document.querySelector('.carousel-container');
const carouselCards = document.querySelectorAll('.carousel-card');
const prevBtn = document.querySelector('.prev-btn');
const nextBtn = document.querySelector('.next-btn');
let currentIndex = 1; // Start with middle card
let autoSlideInterval;

if (carouselContainer && carouselCards.length > 0 && prevBtn && nextBtn) {
    const cards = Array.from(carouselCards);

    function getCardStyles(index) {
        const position = (index - currentIndex + cards.length) % cards.length;
        const normalizedPosition = position > 1 ? position - cards.length : position;

        return {
            rotation: normalizedPosition * 5,
            zIndex: normalizedPosition === 0 ? 10 : 0,
            xPosition: normalizedPosition * (window.innerWidth < 768 ? 100 : window.innerWidth < 1024 ? 140 : 180),
            scale: index === currentIndex ? 1 : 0.9,
            opacity: index === currentIndex ? 1 : 0.8
        };
    }

    function updateCarousel() {
        cards.forEach((card, index) => {
            const { rotation, zIndex, xPosition, scale, opacity } = getCardStyles(index);

            card.style.transform = `translateX(${xPosition}px) rotate(${rotation}deg) scale(${scale})`;
            card.style.zIndex = zIndex;
            card.style.opacity = opacity;
            card.setAttribute('aria-hidden', index !== currentIndex);
        });
    }

    function goToPrevious() {
        currentIndex = currentIndex === 0 ? cards.length - 1 : currentIndex - 1;
        updateCarousel();
    }

    function goToNext() {
        currentIndex = currentIndex === cards.length - 1 ? 0 : currentIndex + 1;
        updateCarousel();
    }

    function startAutoSlide() {
        autoSlideInterval = setInterval(goToNext, 4000);
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Event listeners
    nextBtn.addEventListener('click', () => {
        goToNext();
        stopAutoSlide();
        startAutoSlide();
    });

    prevBtn.addEventListener('click', () => {
        goToPrevious();
        stopAutoSlide();
        startAutoSlide();
    });

    // Pause auto-slide on hover
    carouselContainer.addEventListener('mouseenter', stopAutoSlide);
    carouselContainer.addEventListener('mouseleave', startAutoSlide);

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToPrevious();
            stopAutoSlide();
            startAutoSlide();
        } else if (e.key === 'ArrowRight') {
            goToNext();
            stopAutoSlide();
            startAutoSlide();
        }
    });

    // Touch/swipe support
    let startX = 0;
    let endX = 0;

    carouselContainer.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
    });

    carouselContainer.addEventListener('touchend', (e) => {
        endX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const threshold = 50;
        const diff = startX - endX;

        if (Math.abs(diff) > threshold) {
            if (diff > 0) {
                goToNext();
            } else {
                goToPrevious();
            }
            stopAutoSlide();
            startAutoSlide();
        }
    }

    // Initialize carousel
    updateCarousel();
    startAutoSlide();

    // Handle window resize
    window.addEventListener('resize', () => {
        updateCarousel();
    });
}

// Button click animations
document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('click', function(e) {
        // Create ripple effect
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');

        this.appendChild(ripple);

        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple effect CSS
const rippleCSS = `
.ripple {
    position: absolute;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: scale(0);
    animation: ripple-animation 0.6s linear;
    pointer-events: none;
}

@keyframes ripple-animation {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Feature cards hover effects
document.querySelectorAll('.feature-card, .issue-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-8px)';
        card.style.boxShadow = '0 15px 35px rgba(0, 0, 0, 0.1)';
    });

    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0)';
        card.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
    });
});

// Lawyer cards interaction
document.querySelectorAll('.lawyer-card').forEach(card => {
    card.addEventListener('click', () => {
        const phone = card.querySelector('.lawyer-phone');
        if (phone) {
            // Copy phone number to clipboard
            navigator.clipboard.writeText(phone.textContent).then(() => {
                // Show feedback
                const originalText = phone.textContent;
                phone.textContent = 'Copied!';
                phone.style.color = '#10b981';

                setTimeout(() => {
                    phone.textContent = originalText;
                    phone.style.color = '';
                }, 2000);
            });
        }
    });

    card.style.cursor = 'pointer';
});

// Quick links smooth scroll
document.querySelectorAll('.quick-link').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        // For now, just scroll to top since we don't have specific sections for these
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

// Apply Now button functionality
const applyNowBtn = document.querySelector('.lawyers-header .btn-primary');
if (applyNowBtn) {
    applyNowBtn.addEventListener('click', () => {
        // Show a modal or redirect to application form
        alert('Application form would open here. This is a demo.');
    });
}

// Share Your Story button functionality
const shareStoryBtn = document.querySelector('.impact-cta');
if (shareStoryBtn) {
    shareStoryBtn.addEventListener('click', () => {
        // Show a modal or redirect to story submission form
        alert('Story submission form would open here. This is a demo.');
    });
}

// Learn More button functionality
const learnMoreBtn = document.querySelector('.nav-cta');
if (learnMoreBtn) {
    learnMoreBtn.addEventListener('click', () => {
        // Scroll to analyze section
        const analyzeSection = document.getElementById('analyze');
        if (analyzeSection) {
            const offsetTop = analyzeSection.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
}

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }

    type();
}

// Initialize typing animation when page loads
window.addEventListener('load', () => {
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
            typeWriter(heroTitle, originalText, 50);
        }, 1000);
    }
});

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScrollHandler = throttle(() => {
    // Navbar scroll effect
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 6px -1px rgb(0 0 0 / 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = 'none';
    }
}, 16);

window.addEventListener('scroll', throttledScrollHandler);

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        if (navMenu) {
            navMenu.classList.remove('active');
        }
        if (navToggle) {
            navToggle.classList.remove('active');
        }
    }
});

// Add focus management for accessibility
document.querySelectorAll('a, button, input, textarea').forEach(element => {
    element.addEventListener('focus', () => {
        element.style.outline = '2px solid #ff6b9d';
        element.style.outlineOffset = '2px';
    });

    element.addEventListener('blur', () => {
        element.style.outline = 'none';
    });
});

// Initialize all animations and effects
document.addEventListener('DOMContentLoaded', () => {
    // Add entrance animations to elements
    const animatedElements = document.querySelectorAll('.hero-content > *, .features-grid > *, .issues-grid > *, .lawyers-grid > *');
    animatedElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.8s ease';

        setTimeout(() => {
            el.style.opacity = '1';
            el.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Add hover effect to interactive elements
document.querySelectorAll('a, button, .feature-card, .issue-card, .lawyer-card').forEach(element => {
    element.addEventListener('mouseenter', () => {
        element.style.transition = 'all 0.3s ease';
    });
});

async function searchLawyers() {
    const location = document.getElementById("locationInput").value.trim();
    const resultsDiv = document.getElementById("results");
    resultsDiv.innerHTML = "<p>Searching...</p>";

    if (!location) {
        resultsDiv.innerHTML = "<p>Please enter a location.</p>";
        return;
    }

    try {
        const response = await fetch(`/api/lawyers/search?location=${encodeURIComponent(location)}`);
        const data = await response.json();

        if (data.length === 0) {
            resultsDiv.innerHTML = "<p>No lawyers found in this area.</p>";
            return;
        }

        let output = "";
        data.forEach((lawyer, index) => {
            output += `
                <div class="lawyer-card">
                    <div class="lawyer-number">${index + 1}</div>
                    <div class="lawyer-info">
                        <h3 class="lawyer-name">${lawyer.advocateName}</h3>
                        <p class="lawyer-location">Location: ${lawyer.advocateAddress}</p>
                        <p class="lawyer-dob">DOB: ${lawyer.dateOfBirth}</p>
                        <p class="lawyer-enroll">Enrolled: ${lawyer.dateOfEnrollment}</p>
                    </div>
                </div>
            `;
        });

        resultsDiv.innerHTML = output;
    } catch (error) {
        console.error(error);
        resultsDiv.innerHTML = "<p>Error fetching lawyers.</p>";
    }
}


// Lazy loading for images
const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            if (img.dataset.src) {
                img.src = img.dataset.src;
                img.classList.remove('lazy');
            }
            imageObserver.unobserve(img);
        }
    });
});

document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
});

// Add loading class to images
document.querySelectorAll('img').forEach(img => {
    if (!img.dataset.src) {
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';

        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
    }
});


console.log('⚖️ Nyaaya Saathi Website Loaded Successfully!');

