// DOM Content Loaded Event
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all interactive elements
    initNavigation();

    initScrollEffects();
    initAnimations();
});

// Navigation functionality
function initNavigation() {
    const navbar = document.querySelector('.navbar');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const hamburger = document.getElementById('hamburger');
    
    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Toggle mobile menu
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navMenu.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });
    
    // Close mobile menu when resizing to desktop view
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        }
    });
    
    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Wish form functionality
function initWishForm() {
    const wishInput = document.getElementById('wish-input');
    const submitBtn = document.getElementById('submit-wish');
    const wishesDisplay = document.querySelector('.wishes-display');
    
    if (submitBtn && wishInput) {
        submitBtn.addEventListener('click', addWish);
        wishInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addWish();
            }
        });
    }
    
    function addWish() {
        const wishText = wishInput.value.trim();
        
        if (wishText) {
            // Create wish element
            const wishItem = document.createElement('div');
            wishItem.className = 'wish-item';
            
            const timestamp = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
            
            wishItem.innerHTML = `
                <p>${wishText}</p>
                <span class="timestamp">Just now</span>
            `;
            
            // Add to the top of the wishes display
            wishesDisplay.insertBefore(wishItem, wishesDisplay.firstChild);
            
            // Clear input
            wishInput.value = '';
            
            // Add animation
            wishItem.style.opacity = '0';
            wishItem.style.transform = 'translateX(-20px)';
            
            setTimeout(() => {
                wishItem.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                wishItem.style.opacity = '1';
                wishItem.style.transform = 'translateX(0)';
            }, 10);
        }
    }
}

// Scroll effects
function initScrollEffects() {
    // Intersection Observer for animations on scroll
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animated');
                
                // Specific animations based on element type
                if (entry.target.classList.contains('memory-card')) {
                    animateMemoryCard(entry.target);
                }
            }
        });
    }, observerOptions);
    
    // Observe all sections and cards
    document.querySelectorAll('.section, .memory-card').forEach(el => {
        observer.observe(el);
    });
}

// Specific animation for memory cards
function animateMemoryCard(card) {
    // Simple animation for memory cards when they come into view
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
    }, 100);
}

// General animations
function initAnimations() {
    // Animate the title on load
    const title = document.getElementById('title');
    if (title) {
        title.style.opacity = '0';
        title.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            title.style.transition = 'opacity 1s ease, transform 1s ease';
            title.style.opacity = '1';
            title.style.transform = 'translateY(0)';
        }, 300);
    }
    
    // Add click effect to balloons
    const balloons = document.querySelectorAll('.balloon');
    balloons.forEach(balloon => {
        balloon.addEventListener('click', function() {
            this.style.animation = 'none';
            setTimeout(() => {
                this.style.animation = null;
            }, 10);
            
            // Add a little bounce effect
            this.style.transform = 'scale(1.2)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    });
    
    // Add interactive effect to photo placeholders
    const photoPlaceholders = document.querySelectorAll('.photo-placeholder, .memory-placeholder');
    photoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.03)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        placeholder.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    });
    
    // Add effect to submit button
    const submitBtn = document.getElementById('submit-wish');
    if (submitBtn) {
        submitBtn.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.95)';
        });
        
        submitBtn.addEventListener('mouseup', function() {
            this.style.transform = '';
        });
        
        submitBtn.addEventListener('mouseleave', function() {
            this.style.transform = '';
        });
    }
}

// Performance optimization for mobile devices
function optimizeForMobile() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Reduce animation complexity on mobile
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach(el => {
            // Instead of hiding, reduce animation complexity
            el.style.animation = 'none';
        });
        
        // Reduce particle animations on mobile
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            particle.style.animationPlayState = 'paused';
        });
        
        // Reduce balloon animation complexity on mobile
        const balloons = document.querySelectorAll('.balloon');
        balloons.forEach(balloon => {
            balloon.style.animationDuration = '8s'; // Slower animation
        });
    } else {
        // Resume animations on desktop
        const particles = document.querySelectorAll('.particle');
        particles.forEach(particle => {
            particle.style.animationPlayState = 'running';
        });
        
        const floatingElements = document.querySelectorAll('.floating-element');
        floatingElements.forEach(el => {
            el.style.animation = '';
        });
        
        const balloons = document.querySelectorAll('.balloon');
        balloons.forEach(balloon => {
            balloon.style.animationDuration = '6s';
        });
    }
}

// Run optimization on load and resize
window.addEventListener('load', optimizeForMobile);
window.addEventListener('resize', optimizeForMobile);

// Throttle scroll events for performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Optimized scroll event handler
const optimizedScrollHandler = throttle(function() {
    if (window.scrollY > 50) {
        document.querySelector('.navbar').classList.add('scrolled');
    } else {
        document.querySelector('.navbar').classList.remove('scrolled');
    }
    
    // Parallax effect with throttling
    const scrollPosition = window.pageYOffset;
    const heroElements = document.querySelectorAll('.floating-element');
    
    heroElements.forEach((element, index) => {
        const speed = (index + 1) * 0.5;
        element.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
}, 16); // ~60fps

window.addEventListener('scroll', optimizedScrollHandler);

// Optimized animation frame for smoother animations
function optimizedAnimations() {
    // Use requestAnimationFrame for smoother animations
    let animationFrame;
    
    function updateAnimations() {
        // Update any dynamic animations here
        animationFrame = requestAnimationFrame(updateAnimations);
    }
    
    updateAnimations();
    
    // Clean up on page unload
    window.addEventListener('beforeunload', () => {
        cancelAnimationFrame(animationFrame);
    });
}

// Initialize optimized animations
optimizedAnimations();

// Additional utility functions

// Prevent context menu on images/elements to enhance user experience
document.addEventListener('contextmenu', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
    }
});

// Add parallax effect to hero section
window.addEventListener('scroll', function() {
    const scrollPosition = window.pageYOffset;
    const heroElements = document.querySelectorAll('.floating-element');
    
    heroElements.forEach((element, index) => {
        const speed = (index + 1) * 0.5;
        element.style.transform = `translateY(${scrollPosition * speed}px)`;
    });
});

// Initialize video player enhancements
function initVideoPlayer() {
    const video = document.getElementById('birthday-video');
    const playPauseBtn = document.getElementById('play-pause-btn');
    const seekBar = document.getElementById('seek-bar');
    const volumeBtn = document.getElementById('volume-btn');
    const volumeBar = document.getElementById('volume-bar');
    
    if (video) {
        // Play/Pause functionality
        if (playPauseBtn) {
            playPauseBtn.addEventListener('click', function() {
                if (video.paused) {
                    video.play();
                    playPauseBtn.textContent = '❚❚'; // Pause symbol
                } else {
                    video.pause();
                    playPauseBtn.textContent = '▶'; // Play symbol
                }
            });
        }
        
        // Update play/pause button when video is played/paused
        video.addEventListener('play', function() {
            if (playPauseBtn) playPauseBtn.textContent = '❚❚';
            video.parentElement.classList.add('playing');
        });
        
        video.addEventListener('pause', function() {
            if (playPauseBtn) playPauseBtn.textContent = '▶';
            video.parentElement.classList.remove('playing');
        });
        
        // Seek bar functionality
        if (seekBar) {
            video.addEventListener('timeupdate', function() {
                seekBar.value = (video.currentTime / video.duration) * 100 || 0;
            });
            
            seekBar.addEventListener('change', function() {
                const time = (seekBar.value / 100) * video.duration;
                video.currentTime = time;
            });
        }
        
        // Volume controls
        if (volumeBtn && volumeBar) {
            volumeBar.addEventListener('input', function() {
                video.volume = volumeBar.value;
                updateVolumeIcon();
            });
            
            volumeBtn.addEventListener('click', function() {
                video.muted = !video.muted;
                updateVolumeIcon();
            });
            
            // Update volume icon based on state
            function updateVolumeIcon() {
                if (video.muted || video.volume === 0) {
                    volumeBtn.textContent = '🔇';
                } else if (video.volume > 0.5) {
                    volumeBtn.textContent = '🔊';
                } else {
                    volumeBtn.textContent = '🔉';
                }
            }
            
            // Initialize volume icon
            updateVolumeIcon();
        }
        
        // Add keyboard controls
        document.addEventListener('keydown', function(e) {
            // Only respond when video is focused or spacebar is pressed anywhere
            if (e.code === 'Space' || video === document.activeElement) {
                if (e.code === 'Space') {
                    e.preventDefault(); // Prevent space from scrolling page
                    if (video.paused) {
                        video.play();
                        if (playPauseBtn) playPauseBtn.textContent = '❚❚';
                    } else {
                        video.pause();
                        if (playPauseBtn) playPauseBtn.textContent = '▶';
                    }
                }
                
                // Mute/unmute with 'm' key
                if (e.key === 'm') {
                    video.muted = !video.muted;
                    if (volumeBtn) {
                        updateVolumeIcon();
                    }
                }
            }
        });
    }
}

// Initialize video player when DOM is loaded
document.addEventListener('DOMContentLoaded', initVideoPlayer);

// Add confetti effect for special occasions
function addConfettiEffect() {
    // Create confetti effect at random positions
    const colors = ['#ff6b6b', '#ffd166', '#06d6a0', '#118ab2', '#073b4c'];
    const confettiContainer = document.querySelector('.hero-section');
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.position = 'absolute';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.borderRadius = '50%';
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-20px';
        confetti.style.opacity = '0.8';
        confetti.style.zIndex = '1';
        
        // Animation
        confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 0.8 },
            { transform: `translateY(${window.innerHeight + 20}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: 3000 + Math.random() * 3000,
            easing: 'cubic-bezier(0,0,0.2,1)'
        });
        
        confettiContainer.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 6000);
    }
}

// Enhanced animations for elements when they appear
function initEnhancedAnimations() {
    // Add rainbow text effect to the birthday title
    const title = document.getElementById('title');
    if (title) {
        title.classList.add('rainbow-text');
        title.classList.add('glow');
    }
    
    // Add heartbeat animation to balloons periodically
    setInterval(() => {
        const randomBalloon = document.querySelector(`.balloon-${Math.floor(Math.random() * 5) + 1}`);
        if (randomBalloon) {
            randomBalloon.classList.add('heartbeat');
            setTimeout(() => {
                randomBalloon.classList.remove('heartbeat');
            }, 1500);
        }
    }, 3000);
    
    // Add animations to memory cards when they become visible
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add a delay for staggered animations
                setTimeout(() => {
                    entry.target.classList.add('hover-grow', 'appear');
                }, Math.random() * 500);
            }
        });
    }, { threshold: 0.1 });
    
    // Observe all memory cards
    document.querySelectorAll('.memory-card').forEach(card => {
        observer.observe(card);
    });
    
    // Add subtle animations to photo placeholders
    document.querySelectorAll('.photo-placeholder').forEach((placeholder, index) => {
        placeholder.classList.add('fade-in-element');
        setTimeout(() => {
            if (placeholder) {
                placeholder.classList.add('appear');
            }
        }, 300 + index * 100);
    });
    
    // Add interactive animations to clickable elements
    document.querySelectorAll('button, .photo-placeholder, .memory-card').forEach(el => {
        el.addEventListener('mouseenter', function() {
            this.classList.add('hover-grow');
        });
        
        el.addEventListener('mouseleave', function() {
            this.classList.remove('hover-grow');
        });
    });
    
    // Trigger confetti effect on specific user interactions
    document.addEventListener('click', function() {
        // 10% chance to trigger confetti on any click
        if (Math.random() < 0.1) {
            addConfettiEffect();
        }
    });
    
    // Trigger confetti on spacebar press
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space') {
            addConfettiEffect();
        }
    });
}

// Initialize enhanced animations
document.addEventListener('DOMContentLoaded', initEnhancedAnimations);

// Trigger confetti effect randomly
setInterval(() => {
    if (Math.random() > 0.7) { // 30% chance every interval
        addConfettiEffect();
    }
}, 5000);

// Opening overlay functionality
document.addEventListener('DOMContentLoaded', function() {
    initOpeningOverlay();
});

function initOpeningOverlay() {
    const openingOverlay = document.getElementById('openingOverlay');
    const openCardBtn = document.getElementById('openCardBtn');
    
    // Add click event to the open card button
    if (openCardBtn) {
        openCardBtn.addEventListener('click', function(event) {
            // Add ripple effect to button
            createRippleEffect(this, event);
            
            // Add animation class to button
            this.classList.add('activated');
            
            // Wait for button animation before hiding overlay
            setTimeout(() => {
                // Add fade out animation to overlay
                openingOverlay.classList.add('hidden');
                
                // Enable scrolling on body after the transition
                setTimeout(() => {
                    document.body.style.overflow = 'visible';
                    document.body.classList.add('overlay-hidden');
                }, 1200); // Match the CSS transition duration
            }, 300);
        });
    }
    
    // Auto-hide for testing purposes after a few seconds if needed
    // Remove this in production
    // setTimeout(() => {
    //     if (!openingOverlay.classList.contains('hidden')) {
    //         openingOverlay.classList.add('hidden');
    //         document.body.style.overflow = 'visible';
    //     }
    // }, 10000);
}

// Create ripple effect for button click
function createRippleEffect(element, event) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    // Add ripple to button
    element.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Prevent scrolling when overlay is visible
document.addEventListener('DOMContentLoaded', function() {
    const openingOverlay = document.getElementById('openingOverlay');
    if (openingOverlay && !openingOverlay.classList.contains('hidden')) {
        document.body.style.overflow = 'hidden';
    }
});

// Add initial class to body to hide overflow
document.addEventListener('DOMContentLoaded', function() {
    document.body.style.overflow = 'hidden';
});

// Initialize music player and mute functionality
document.addEventListener('DOMContentLoaded', function() {
    initMusicPlayer();
});

function initMusicPlayer() {
    const musicPlayer = document.getElementById('birthdayMusic');
    const muteBtn = document.getElementById('muteBtn');
    let isMuted = false;
    
    // Play music automatically when page loads (with user interaction requirement handled)
    setTimeout(() => {
        // Try to play music - this might fail due to browser autoplay policies
        const playPromise = musicPlayer.play();
        
        if (playPromise !== undefined) {
            playPromise
                .then(() => {
                    // Music is playing
                    console.log('Music started playing automatically');
                })
                .catch(error => {
                    // Autoplay failed, music will start when user interacts
                    console.log('Autoplay blocked by browser, music will start after user interaction');
                });
        }
    }, 500); // Small delay to ensure everything is loaded
    
    // Mute/unmute functionality
    if (muteBtn) {
        muteBtn.addEventListener('click', function() {
            isMuted = !isMuted;
            
            if (isMuted) {
                musicPlayer.muted = true;
                this.classList.add('muted');
                document.querySelector('.mute-icon').textContent = '🔇';
            } else {
                musicPlayer.muted = false;
                this.classList.remove('muted');
                document.querySelector('.mute-icon').textContent = '🔊';
            }
        });
        
        // Initialize button state based on initial volume
        if (musicPlayer.muted) {
            muteBtn.classList.add('muted');
            document.querySelector('.mute-icon').textContent = '🔇';
        }
    }
    
    // Also play music when user clicks anywhere (to handle autoplay restrictions)
    document.addEventListener('click', function enableMusic() {
        if (musicPlayer.paused) {
            musicPlayer.play().then(() => {
                console.log('Music started playing after user interaction');
            }).catch(e => {
                console.log('Could not start music:', e);
            });
        }
        
        // Remove this event listener after first interaction to avoid conflicts
        document.removeEventListener('click', enableMusic);
    }, { once: true });
}

// Enhanced fireworks effect after transition
function initFireworksAfterTransition() {
    const openingOverlay = document.getElementById('openingOverlay');
    
    // Listen for when the overlay is hidden
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                if (openingOverlay.classList.contains('hidden')) {
                    // Wait for transition to complete before showing fireworks
                    setTimeout(() => {
                        createFireworksEffect();
                        
                        // Also trigger confetti occasionally
                        addConfettiEffect();
                    }, 300);
                }
            }
        });
    });
    
    observer.observe(openingOverlay, {
        attributes: true,
        attributeFilter: ['class']
    });
}

// Create a more sophisticated fireworks effect
function createFireworksEffect() {
    const container = document.body;
    const colors = ['#ff6b6b', '#ffd166', '#06d6a0', '#118ab2', '#073b4c', '#ff9a9e', '#fad0c4'];
    
    // Create multiple fireworks at different positions
    for (let i = 0; i < 15; i++) {
        setTimeout(() => {
            const firework = document.createElement('div');
            firework.className = 'firework';
            
            // Random position
            const posX = Math.random() * window.innerWidth;
            const posY = Math.random() * window.innerHeight * 0.6; // Limit to upper part of screen
            
            // Random color
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            firework.style.left = `${posX}px`;
            firework.style.top = `${posY}px`;
            firework.style.position = 'fixed';
            firework.style.width = '5px';
            firework.style.height = '5px';
            firework.style.borderRadius = '50%';
            firework.style.backgroundColor = color;
            firework.style.zIndex = '9998';
            firework.style.pointerEvents = 'none';
            
            container.appendChild(firework);
            
            // Animate the firework
            const animation = firework.animate([
                { 
                    transform: 'scale(1)', 
                    opacity: 1,
                    boxShadow: `0 0 10px 2px ${color}`
                },
                { 
                    transform: 'scale(30)', 
                    opacity: 0,
                    boxShadow: `0 0 30px 10px ${color}`
                }
            ], {
                duration: 1500,
                easing: 'cubic-bezier(0, 0.2, 0.8, 1)'
            });
            
            // Remove element after animation
            animation.onfinish = () => {
                firework.remove();
            };
        }, i * 200); // Stagger the fireworks
    }
}

// Initialize fireworks after transition
document.addEventListener('DOMContentLoaded', function() {
    initFireworksAfterTransition();
});