document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');
    
    mobileMenuBtn.addEventListener('click', function() {
        nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
        this.classList.toggle('active');
    });

    // Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (window.innerWidth <= 768) {
                    nav.style.display = 'none';
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
    });

    // Header Scroll Effect
    let lastScroll = 0;
    const header = document.querySelector('.header');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll <= 0) {
            header.classList.remove('scroll-up');
            return;
        }
        
        if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
            // Scroll Down
            header.classList.remove('scroll-up');
            header.classList.add('scroll-down');
        } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
            // Scroll Up
            header.classList.remove('scroll-down');
            header.classList.add('scroll-up');
        }
        lastScroll = currentScroll;
    });

    // Newsletter Form Submission
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = this.querySelector('input[type="email"]').value;
            // Here you would typically send this to your backend
            alert('Thank you for subscribing! We\'ll keep you updated.');
            this.reset();
        });
    }

    // Intersection Observer for Animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe all feature sections and cards
    document.querySelectorAll('.feature-section, .feature-card').forEach(el => {
        observer.observe(el);
    });

    // Simple Carousel for Testimonials
    const testimonials = [
        {
            text: "Stacks Data has revolutionized how we manage our environmental data. The platform is intuitive and the support is outstanding.",
            author: "Sarah Johnson",
            company: "Green Tech Solutions"
        },
        {
            text: "The supplier management tools have streamlined our operations significantly. We've seen a 40% reduction in data collection time.",
            author: "Michael Chen",
            company: "Global Manufacturing Inc."
        },
        {
            text: "The unified dashboard is a game-changer. Having all our data in one place has improved our decision-making process.",
            author: "Emma Rodriguez",
            company: "Sustainable Ventures"
        }
    ];

    const testimonialContainer = document.querySelector('.testimonials-carousel');
    let currentTestimonial = 0;

    function createTestimonialElement(testimonial) {
        return `
            <div class="testimonial">
                <p class="testimonial-text">"${testimonial.text}"</p>
                <div class="testimonial-author">
                    <p class="author-name">${testimonial.author}</p>
                    <p class="author-company">${testimonial.company}</p>
                </div>
            </div>
        `;
    }

    function updateTestimonial() {
        if (testimonialContainer) {
            testimonialContainer.innerHTML = createTestimonialElement(testimonials[currentTestimonial]);
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        }
    }

    // Initialize testimonials and rotate them every 5 seconds
    updateTestimonial();
    setInterval(updateTestimonial, 5000);
});
