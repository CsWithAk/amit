document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animate the three lines to form an X when menu is open
        const spans = menuToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
            
    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('#nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            // Reset the menu icon
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });


      /*============Multiple text===============*/
  
    // Typed.js Animation
    if (document.querySelector('.multiple-text')) {
        new Typed(".multiple-text", {
            strings: ["Amit Kumar", "Web Developer", "Frontend Developer"],
            typeSpeed: 400,
            backSpeed: 300,
            backDelay: 1000,
            loop: true
        });
    }

    // Team member info toggle
    document.querySelectorAll('.member-info-btn').forEach(button => {
        button.addEventListener('click', function() {
            const details = this.nextElementSibling;
            details.classList.toggle('active');
            
            // Change button text based on state
            if (details.classList.contains('active')) {
                this.textContent = 'Hide Info';
            } else {
                const name = this.textContent.replace('Hide Info', '').replace('About', '').trim();
                this.textContent = 'About ' + name;
            }
        });
    });

    // Team slider functionality
    const slider = document.getElementById('teamSlider');
    const dotsContainer = document.getElementById('teamDots');
    const members = document.querySelectorAll('.team-member');
    let currentIndex = 0;
    let slideInterval;
            
    // Create dots
    members.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('team-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            goToSlide(index);
        });
        dotsContainer.appendChild(dot);
    });
    
    // Update slider position
    function updateSlider() {
        const offset = -currentIndex * 100;
        slider.style.transform = `translateX(${offset}%)`;
        
        // Update dots
        document.querySelectorAll('.team-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }
    
    // Go to specific slide
    function goToSlide(index) {
        currentIndex = index;
        if (currentIndex >= members.length) currentIndex = 0;
        if (currentIndex < 0) currentIndex = members.length - 1;
        updateSlider();
        resetInterval();
    }
            
    // Auto slide every 3 seconds
    function startInterval() {
        slideInterval = setInterval(() => {
            goToSlide(currentIndex + 1);
        }, 3000);
    }
    
    // Reset interval when user interacts
    function resetInterval() {
        clearInterval(slideInterval);
        startInterval();
    }
    
    // Initialize
    updateSlider();
    startInterval();
    
    // Pause on hover
    slider.addEventListener('mouseenter', () => {
        clearInterval(slideInterval);
    });
    
    slider.addEventListener('mouseleave', () => {
        startInterval();
    });

    //Resume
    document.getElementById('resume-btn').addEventListener('click', () => {
        window.open('https://drive.google.com/file/d/176xCwQRp1VAzqn5MS0V723uf2XqCrHUa/view?usp=drivesdk', '_blank');
    });



    /*========to-Top-btn=========*/
    const toTopBtn = document.getElementById("toTopBtn");

    // Show/hide button based on scroll
    window.addEventListener("scroll", () => {
        if (window.scrollY > 300) {
            toTopBtn.classList.add("show");
        } else {
            toTopBtn.classList.remove("show");
        }
    });

    // On click: animate and scroll to top
    toTopBtn.addEventListener("click", () => {
        toTopBtn.classList.add("clicked");
        window.scrollTo({ top: 0, behavior: "smooth" });

        // Remove bounce class after animation
        setTimeout(() => {
            toTopBtn.classList.remove("clicked");
        }, 400);
    });


});