document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.getElementById('mobile-menu');
    const navMenu = document.getElementById('nav-menu');
    
    // Mobile menu toggle
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
    
    // Close menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!menuToggle.contains(event.target) && !navMenu.contains(event.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            
            // Reset the menu icon
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Typed.js initialization
    const typed = new Typed('.multiple-text', {
        strings: ['Amit Kumar', 'a Web Developer', 'a Programmer'],
        typeSpeed: 100,
        backSpeed: 100,
        backDelay: 1000,
        loop: true
    });
    
    // Back to top button
    const toTopBtn = document.getElementById('toTopBtn');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            toTopBtn.classList.add('show');
        } else {
            toTopBtn.classList.remove('show');
        }
    });
    
    toTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
        
        // Add animation class
        this.classList.add('clicked');
        
        // Remove animation class after animation completes
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 400);
    });
    

    // Projects scroll buttons
    const projectsContainer = document.getElementById("projectsContainer");
    const scrollLeftBtn = document.getElementById("scrollLeft");
    const scrollRightBtn = document.getElementById("scrollRight");

    scrollLeftBtn.addEventListener("click", () => {
        projectsContainer.scrollBy({ left: -320, behavior: "smooth" });
    });

    scrollRightBtn.addEventListener("click", () => {
        projectsContainer.scrollBy({ left: 320, behavior: "smooth" });
    });



    // Read more buttons functionality
    const readMoreButtons = document.querySelectorAll('.read-more');
    
    readMoreButtons.forEach(button => {
        button.addEventListener('click', function() {
            const details = this.nextElementSibling;
            details.classList.toggle('active');
            
            if (details.classList.contains('active')) {
                this.textContent = 'Read Less';
            } else {
                this.textContent = 'Read More';
            }
        });
    });
    
    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    const status = document.getElementById('status');
    
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Basic form validation
        const name = document.getElementById('name').value;
        const mobile = document.getElementById('mobile').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        
        if (!name || !mobile || !email || !message) {
            showStatus('Please fill in all fields.', 'error');
            return;
        }
        
        // Mobile number validation
        const mobilePattern = /^[0-9]{10}$/;
        if (!mobilePattern.test(mobile)) {
            showStatus('Please enter a valid 10-digit mobile number.', 'error');
            return;
        }
        
        // Email validation
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            showStatus('Please enter a valid email address.', 'error');
            return;
        }
        
        // Initialize EmailJS with your public key
        emailjs.init("zW1CiA7KX9nW6YNcD"); 
        
        // Send email using EmailJS
        emailjs.sendForm("service_iuzpbi3", "template_3r2y3s8", this)
            .then(function(response) {
                console.log('SUCCESS!', response.status, response.text);
                showStatus('Message sent successfully! I\'ll get back to you soon.', 'success');
                contactForm.reset();
            }, function(error) {
                console.log('FAILED...', error);
                showStatus('Sorry, there was an error sending your message. Please try again later.', 'error');
            });
    });
    
    function showStatus(text, type) {
        status.textContent = text;
        status.className = type;
        status.style.display = 'block';
        
        // Hide status after 5 seconds
        setTimeout(() => {
            status.style.display = 'none';
        }, 5000);
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const spans = menuToggle.querySelectorAll('span');
                    spans[0].style.transform = 'none';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'none';
                }
                
                // Scroll to the target element
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for header height
                    behavior: 'smooth'
                });
            }
        });
    });
});
