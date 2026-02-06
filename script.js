const navbar = document.getElementById('navbar');
const heroSection = document.getElementById('hero');

window.addEventListener('scroll', () => {
    const heroHeight = heroSection.offsetHeight;
    const triggerPoint = heroHeight - 80;

    if (window.scrollY > triggerPoint) {
        navbar.classList.add('bg-[#0a192f]', 'shadow-lg');
        navbar.classList.remove('bg-transparent', 'py-4');
        navbar.classList.add('py-2'); 
    } else {
        navbar.classList.add('bg-transparent', 'py-4');
        navbar.classList.remove('bg-[#0a192f ]', 'shadow-lg', 'py-2');
    }
});


        const menuBtn = document.getElementById('mobile-menu-btn');
        const mobileMenu = document.getElementById('mobile-menu');
        const mobileLinks = document.querySelectorAll('.mobile-link');

        let isMenuOpen = false;

        menuBtn.addEventListener('click', () => {
            isMenuOpen = !isMenuOpen;
            if (isMenuOpen) {
                mobileMenu.classList.remove('translate-x-full');
                menuBtn.innerHTML = '<i data-lucide="x"></i>'; 
            } else {
                mobileMenu.classList.add('translate-x-full');
                menuBtn.innerHTML = '<i data-lucide="menu"></i>'; 
            }
            lucide.createIcons(); 
        });

        
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                isMenuOpen = false;
                mobileMenu.classList.add('translate-x-full');
                menuBtn.innerHTML = '<i data-lucide="menu"></i>';
                lucide.createIcons();
            });

        });

        const video = document.getElementById('heroVideo');
  const btn = document.getElementById('audioToggle');
  const iconMute = document.getElementById('iconMute');
  const iconSound = document.getElementById('iconSound');

  btn.addEventListener('click', () => {
    if (video.muted) {
      video.muted = false;
      iconMute.classList.add('hidden');
      iconSound.classList.remove('hidden');
    } else {
      video.muted = true;
      iconSound.classList.add('hidden');
      iconMute.classList.remove('hidden');
    }
  });
    
const track = document.getElementById('sliderTrack');
const slides = document.querySelectorAll('.slide');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');
const dotsContainer = document.getElementById('dotsContainer');
const dots = dotsContainer.querySelectorAll('button');
    
let currentIndex = 0;
const totalSlides = slides.length;
let autoPlayInterval;

function updateSlider(index) {
    const amountToMove = -index * 100;
    track.style.transform = `translateX(${amountToMove}%)`;
    
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

function nextSlide() {
    if (currentIndex < totalSlides - 1) updateSlider(currentIndex + 1);
    else updateSlider(0); 
}

function prevSlide() {
    if (currentIndex > 0) updateSlider(currentIndex - 1);
    else updateSlider(totalSlides - 1);
}

nextBtn.addEventListener('click', () => { nextSlide(); resetAutoPlay(); });
prevBtn.addEventListener('click', () => { prevSlide(); resetAutoPlay(); });

dots.forEach((dot, index) => {
    dot.addEventListener('click', () => { updateSlider(index); resetAutoPlay(); });
});

function startAutoPlay() { autoPlayInterval = setInterval(nextSlide, 3500); }
function stopAutoPlay() { clearInterval(autoPlayInterval); }
function resetAutoPlay() { stopAutoPlay(); startAutoPlay(); }

startAutoPlay();

const sliderSection = document.getElementById('reviews');
sliderSection.addEventListener('mouseenter', stopAutoPlay);
sliderSection.addEventListener('mouseleave', startAutoPlay);


// --- BOOKING MODAL LOGIC ---
const modal = document.getElementById('bookingModal');
const closeBtn = document.getElementById('closeModal');
const bookingForm = document.getElementById('bookingForm');

// NEW: Function to open modal (used by Navbar, Hero, and Float buttons)
function openBookingModal() {
    modal.classList.remove('hidden');
}

// NEW: Function to select a specific room and open modal (used by Room buttons)
function selectRoom(roomName) {
    const roomSelect = document.querySelector('select[name="room_type"]');
    if (roomSelect) {
        roomSelect.value = roomName;
    }
    openBookingModal();
}

// Attach listener to all buttons with class 'open-modal-btn' (Navbar & Hero)
const openBtns = document.querySelectorAll('.open-modal-btn');
openBtns.forEach(btn => {
    btn.addEventListener('click', openBookingModal);
});

// Close Modal Logic
if(closeBtn) {
    closeBtn.addEventListener('click', () => {
        modal.classList.add('hidden');
    });
}

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.add('hidden');
    }
});


// Handle Form Submission (WhatsApp + Database)
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

    // 2. SAVE TO DATABASE
    try {
        const response = await fetch('/book', {
            method: 'POST',
            body: formData
        });
        const result = await response.json();
        
        if (result.success) {
            console.log("Booking saved.");
            alert("Success! Booking Saved.");
        } else {
            console.error("Database Error:", result.message);
            alert("Error saving to DB: " + result.message);
        }
    } catch (error) {
        console.error("Network Error:", error);
        alert("Network Error: Could not connect to Flask server.");
        return; 
    }

    // 3. OPEN WHATSAPP
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

    // 4. CLEANUP
    modal.classList.add('hidden');
    bookingForm.reset();
});

// Initialize Icons
lucide.createIcons();