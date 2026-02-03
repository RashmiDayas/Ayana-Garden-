document.addEventListener('DOMContentLoaded', () => {
    
            // --- NAVBAR SCROLL EFFECT ---
         const navbar = document.getElementById('navbar');

         window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            // Add the class defined in CSS to change color on scroll
            navbar.classList.add('nav-scrolled');
        } else {
            // Remove it to go back to original
            navbar.classList.remove('nav-scrolled');
        }
    });

    
    // --- REVIEWS SLIDER LOGIC ---
    const track = document.getElementById('sliderTrack');
    const slides = document.querySelectorAll('.slide');
    const nextBtn = document.getElementById('nextBtn');
    const prevBtn = document.getElementById('prevBtn');
    const dotsContainer = document.getElementById('dotsContainer');
    const dots = dotsContainer.querySelectorAll('button');
    
    let currentIndex = 0;
    const totalSlides = slides.length;
    let autoPlayInterval;
    let isDragging = false;
    let startPos = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    let animationID;

    // Update Slider Position
    function updateSlider(index) {
        const amountToMove = -index * 100;
        track.style.transform = `translateX(${amountToMove}%)`;
        
        // Update Dots
        dots.forEach((dot, i) => {
            if (i === index) {
                dot.classList.remove('w-2', 'bg-gray-300');
                dot.classList.add('w-10', 'bg-gold');
            } else {
                dot.classList.remove('w-10', 'bg-gold');
                dot.classList.add('w-2', 'bg-gray-300');
            }
        });
        
        currentIndex = index;
    }

    // Next Slide
    function nextSlide() {
        if (currentIndex < totalSlides - 1) {
            updateSlider(currentIndex + 1);
        } else {
            updateSlider(0); // Loop back to start
        }
    }

    // Previous Slide
    function prevSlide() {
        if (currentIndex > 0) {
            updateSlider(currentIndex - 1);
        } else {
            updateSlider(totalSlides - 1); // Loop to end
        }
    }

    // Event Listeners for Buttons
    nextBtn.addEventListener('click', () => {
        nextSlide();
        resetAutoPlay();
    });

    prevBtn.addEventListener('click', () => {
        prevSlide();
        resetAutoPlay();
    });

    // Click on Dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateSlider(index);
            resetAutoPlay();
        });
    });

    // Auto Play
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 3500);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Start Auto Play on Load
    startAutoPlay();

    // Pause on Hover
    const sliderSection = document.getElementById('reviews');
    sliderSection.addEventListener('mouseenter', stopAutoPlay);
    sliderSection.addEventListener('mouseleave', startAutoPlay);

    // Touch/Drag Support (Simplified)
    const sliderContainer = document.getElementById('sliderContainer');

    sliderContainer.addEventListener('touchstart', touchStart);
    sliderContainer.addEventListener('touchend', touchEnd);
    sliderContainer.addEventListener('touchmove', touchMove);

    // Mouse events for desktop drag
    sliderContainer.addEventListener('mousedown', touchStart);
    sliderContainer.addEventListener('mouseup', touchEnd);
    sliderContainer.addEventListener('mouseleave', () => {
        if(isDragging) touchEnd();
    });
    sliderContainer.addEventListener('mousemove', touchMove);

    function touchStart(index) {
        return function(event) {
            isDragging = true;
            startPos = getPositionX(event);
            animationID = requestAnimationFrame(animation);
            sliderContainer.style.cursor = 'grabbing';
            stopAutoPlay();
        }
    }

    function touchMove(event) {
        if (isDragging) {
            const currentPosition = getPositionX(event);
            const diff = currentPosition - startPos;
            // Optional: Visual feedback while dragging could be added here
        }
    }

    function touchEnd() {
        isDragging = false;
        cancelAnimationFrame(animationID);
        sliderContainer.style.cursor = 'grab';
        
        const movedBy = currentTranslate - prevTranslate;

        // Swipe threshold
        if (movedBy < -50 && currentIndex < totalSlides - 1) currentIndex += 1;
        if (movedBy > 50 && currentIndex > 0) currentIndex -= 1;

        updateSlider(currentIndex);
        startAutoPlay();
    }

    function getPositionX(event) {
        return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
    }

    function animation() {
        setSliderPosition();
        if (isDragging) requestAnimationFrame(animation);
    }

    function setSliderPosition() {
        // This allows for "rubber band" effect if we wanted to implement strictly visual dragging
        // For this implementation, we snap on release to keep it simple and robust
    }
});

    // --- BOOKING MODAL LOGIC ---
    const modal = document.getElementById('bookingModal');
    const openBtn = document.getElementById('openBooking');
    const closeBtn = document.getElementById('closeModal');
    const bookingForm = document.getElementById('bookingForm');

    // Open Modal
    if(openBtn) {
        openBtn.addEventListener('click', () => {
            modal.classList.remove('hidden');
        });
    }

    // Close Modal
    if(closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.classList.add('hidden');
        });
    }

    // Close when clicking outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.add('hidden');
        }
    });


           // Handle Form Submission (Hybrid: WhatsApp + Database)
          bookingForm.addEventListener('submit', async (e) => {
           e.preventDefault();

          const formData = new FormData(bookingForm);

          // 1. GET DATA FOR WHATSAPP
          const name = formData.get('name');
          const room = formData.get('room_type');
          const checkIn = formData.get('check_in');
          const checkOut = formData.get('check_out');
          const guests = formData.get('guests');
          const phone = formData.get('phone');
           const email = formData.get('email');
          const message = formData.get('message');

            // 2. OPEN WHATSAPP IMMEDIATELY (Priority #1)
          const whatsappText = `Hi Ayana Garden, I have a new booking request:%0A%0A` +
            `*Name:* ${name}%0A` +
            `*Room:* ${room}%0A` +
            `*Check In:* ${checkIn}%0A` +
            `*Check Out:* ${checkOut}%0A` +
            `*Guests:* ${guests}%0A` +
            `*Phone:* ${phone}%0A` +
            `*Email:* ${email}%0A%0A` +
            `*Message:* ${message}`;

          window.open(`https://wa.me/94786105117?text=${whatsappText}`, '_blank');

         // 3. SAVE TO DATABASE IN BACKGROUND (Priority #2)
        try {
            const response = await fetch('/book', {
             method: 'POST',
             body: formData
        });

        const result = await response.json();

         if (result.success) {
            console.log("Booking saved to admin panel.");
        } 
        else {
         console.error("Database Error:", result.message);
        }
        } catch (error) {
         console.error("Network Error:", error);
        }

        // 4. CLEANUP
       modal.classList.add('hidden');
       bookingForm.reset();
       });