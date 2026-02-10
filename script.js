
const firebaseConfig = {
  apiKey: "AIzaSyDnSd1E8JLbAMuxMu_InPO-yQ4KzzEcoiI",
  authDomain: "ayanagardendb-354d4.firebaseapp.com",
  projectId: "ayanagardendb-354d4",
  storageBucket: "ayanagardendb-354d4.appspot.com",
  messagingSenderId: "476687614036",
  appId: "1:476687614036:web:b9427760e8f2d2de476dc1",
  measurementId: "G-XLMFFWMSW6"
};

firebase.initializeApp(firebaseConfig);
    const db = firebase.firestore();

    /// Initialize Lucide Icons
        lucide.createIcons();


        // Footer Logo Click - Scroll to Hero
        const footerLogo = document.getElementById('footerLogo');
        if (footerLogo) {
            footerLogo.addEventListener('click', () => {
                const heroSection = document.getElementById('hero');
                if (heroSection) {
                    heroSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        // Mobile Hamburger Menu Toggle
        const hamburger = document.getElementById('hamburger');
        const mobileMenu = document.getElementById('mobileMenu');
        
        if (hamburger && mobileMenu) {
            hamburger.addEventListener('click', () => {
                mobileMenu.classList.toggle('hidden');
            });
            
            // Close menu when a link is clicked
            const mobileLinks = mobileMenu.querySelectorAll('a');
            mobileLinks.forEach(link => {
                link.addEventListener('click', () => {
                    mobileMenu.classList.add('hidden');
                });
            });
        }

        // 1. Navbar Scroll Effect
        const navbar = document.getElementById('navbar');
        const heroHeight = window.innerHeight; // Full screen height
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > heroHeight) {
                navbar.classList.add('bg-navy', 'shadow-lg', 'py-3');
                navbar.classList.remove('bg-gradient-to-b', 'from-black/60', 'to-transparent', 'py-5');
            } else {
                navbar.classList.remove('bg-navy', 'shadow-lg', 'py-3');
                navbar.classList.add('bg-gradient-to-b', 'from-black/60', 'to-transparent', 'py-5');
            }
        });

        // --- 1. HERO AUDIO TOGGLE LOGIC (FIXED VERSION) ---
       document.addEventListener('DOMContentLoaded', function() {
    
    
    const heroVideo = document.getElementById('heroVideo');
    const audioToggle = document.getElementById('audioToggle');
    
    
    if (!heroVideo || !audioToggle) {
        console.error("Hero Video or Audio Button not found!");
        return;
    }

    // Icon eka update karanna function eka
    function updateAudioIcon(isMuted) {
        // Meka balanna: Button eke `innerHTML` eka reset karala thma `i` tag eka danne.
        // Ekin `lucide.createIcons()` eka hariyata wadagath wenna.
        const iconName = isMuted ? 'volume-x' : 'volume-2';
        
        // Icon change karanna
        audioToggle.innerHTML = `<i data-lucide="${iconName}" class="w-6 h-6"></i>`;
        
        // Color change karanna (Visual Feedback)
        if (isMuted) {
            audioToggle.classList.add('bg-white/10'); // Dim color (Muted)
            audioToggle.classList.remove('bg-gold', 'text-white'); // Remove highlight
        } else {
            audioToggle.classList.remove('bg-white/10'); // Remove dim
            audioToggle.classList.add('bg-gold', 'text-white'); // Highlight (Playing)
        }

        // Lucide library eken icon eka draw karanna
        lucide.createIcons();
    }

    // --- INITIAL STATE (Page eka load wena thibba) ---
    heroVideo.muted = true; // Video eka Mute karanna (Browser policy)
    updateAudioIcon(true);  // Icon eka "Volume-X" (Mute) wenna one

    // --- CLICK EVENT (Button eka click karama) ---
    audioToggle.addEventListener('click', function() {
        // Toggle Mute
        heroVideo.muted = !heroVideo.muted;
        
        // Icon eka update karanna
        updateAudioIcon(heroVideo.muted);

        // Unmute karoth Audio play karanna try karanna
        if (!heroVideo.muted) {
            heroVideo.play().catch(e => console.log("Autoplay blocked by browser:", e));
        }
    });
});

        

        // 2. Review Carousel Data & Logic
        const reviewsData = [
            { name: "Sarah Jenkins", date: "2 months ago", rating: 5, text: "Absolutely magical! The view of Ella Rock is breathtaking. The best place to disconnect.", img: "https://randomuser.me/api/portraits/women/1.jpg" },
            { name: "David Miller", date: "1 month ago", rating: 5, text: "Hospitality was unmatched. Waking up to the sounds of nature was the highlight of our Sri Lanka trip.", img: "https://randomuser.me/api/portraits/men/2.jpg" },
            { name: "Priya Sharma", date: "3 weeks ago", rating: 5, text: "A hidden gem! The coffee, the books, the mist... everything was perfect.", img: "https://randomuser.me/api/portraits/women/3.jpg" },
            { name: "Tom Hiddleston", date: "4 months ago", rating: 5, text: "Peaceful and serene. Close enough to town but far enough to feel lost in nature.", img: "https://randomuser.me/api/portraits/men/4.jpg" },
            { name: "Emma Watson", date: "1 week ago", rating: 5, text: "Loved the eco-friendly vibe. The breakfast was delicious and the staff were so helpful.", img: "https://randomuser.me/api/portraits/women/5.jpg" },
            { name: "Michael Chang", date: "2 weeks ago", rating: 5, text: "The perfect escape from the city. The wifi was surprisingly fast too, great for digital nomads.", img: "https://randomuser.me/api/portraits/men/6.jpg" },
        ];

        const track = document.getElementById('reviewTrack');
        const indicatorsContainer = document.getElementById('reviewIndicators');
        let currentIndex = 0;
        let autoSlideInterval;

        // Render Reviews
        reviewsData.forEach(review => {
            const slide = document.createElement('div');
            slide.className = 'w-full shrink-0 px-4 md:px-12';
            slide.innerHTML = `
                <div class="bg-softWhite p-8 md:p-12 rounded-3xl shadow-xl border border-gray-100 relative h-full">
                    <i data-lucide="quote" class="absolute top-8 right-8 text-gold/20 w-16 h-16"></i>
                    <div class="flex items-center gap-5 mb-8">
                        <div class="relative">
                            <div class="absolute inset-0 bg-gold rounded-full blur opacity-30"></div>
                            <img src="${review.img}" class="w-16 h-16 rounded-full border-2 border-gold object-cover relative z-10">
                        </div>
                        <div>
                            <h4 class="font-heading text-xl font-bold text-navy">${review.name}</h4>
                            <p class="text-xs text-gray-400 font-extra uppercase tracking-widest">${review.date}</p>
                        </div>
                    </div>
                    <div class="flex gap-1 mb-6 text-gold">
                        ${'<i data-lucide="star" class="w-5 h-5 fill-current drop-shadow-sm"></i>'.repeat(review.rating)}
                    </div>
                    <p class="font-body text-gray-600 leading-relaxed italic text-lg">"${review.text}"</p>
                </div>
            `;
            track.appendChild(slide);
        });

        // Create Indicators
        reviewsData.forEach((_, idx) => {
            const dot = document.createElement('button');
            dot.className = `h-2 rounded-full transition-all duration-500 ease-out ${idx === 0 ? 'w-10 bg-gold' : 'w-2 bg-gray-300 hover:bg-gray-400'}`;
            dot.ariaLabel = `Go to review ${idx + 1}`;
            dot.onclick = () => goToSlide(idx);
            indicatorsContainer.appendChild(dot);
        });

        lucide.createIcons(); // Re-init icons for newly added elements

        // Carousel Functions
        function updateCarousel() {
            track.style.transform = `translateX(-${currentIndex * 100}%)`;
            // Update dots
            Array.from(indicatorsContainer.children).forEach((dot, idx) => {
                dot.className = `h-2 rounded-full transition-all duration-500 ease-out ${idx === currentIndex ? 'w-10 bg-gold' : 'w-2 bg-gray-300 hover:bg-gray-400'}`;
            });
        }

        function moveSlide(direction) {
            currentIndex = (currentIndex + direction + reviewsData.length) % reviewsData.length;
            updateCarousel();
            resetAutoSlide();
        }

        function goToSlide(index) {
            currentIndex = index;
            updateCarousel();
            resetAutoSlide();
        }

        function startAutoSlide() {
            autoSlideInterval = setInterval(() => moveSlide(1), 4000);
        }

        function resetAutoSlide() {
            clearInterval(autoSlideInterval);
            startAutoSlide();
        }

        startAutoSlide();

        // Pause on hover
        const container = document.getElementById('reviewCarouselContainer');
        container.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
        container.addEventListener('mouseleave', startAutoSlide);


        // 3. Modal Logic
        const modal = document.getElementById('bookingModal');
        const modalTitle = document.getElementById('modalTitle');
        const modalDesc = document.getElementById('modalDesc');
        const modalImage = document.getElementById('modalImage');
        const modalPrice = document.getElementById('modalPrice');
        const formRoomTitle = document.getElementById('formRoomTitle');
        const formRoomId = document.getElementById('formRoomId');
        const galleryThumbnails = document.getElementById('galleryThumbnails');

        // Room ID mapping (matches the database IDs from Flask backend)
        const roomIdMap = {
            'emerald': 1,
            'azure': 2
        };

        function openModal(roomId) {
            const data = document.getElementById(`data-${roomId}`);
            if(!data) return;

            modalTitle.textContent = data.querySelector('.data-title').textContent;
            modalDesc.textContent = data.querySelector('.data-desc').textContent;
            modalImage.src = data.querySelector('.data-img').textContent;
            modalPrice.textContent = data.querySelector('.data-price').textContent;
            formRoomTitle.value = data.querySelector('.data-title').textContent;
            formRoomId.value = roomIdMap[roomId] || 1;  // Set room ID for backend

            // Load gallery images
            const galleryData = data.querySelector('.data-gallery');
            if (galleryData) {
                try {
                    const images = JSON.parse(galleryData.textContent);
                    galleryThumbnails.innerHTML = '';
                    
                    images.forEach((imgUrl, index) => {
                        const thumb = document.createElement('img');
                        thumb.src = imgUrl;
                        thumb.alt = `Room image ${index + 1}`;
                        thumb.className = 'w-full h-20 object-cover rounded-lg cursor-pointer border-2 border-transparent hover:border-gold transition-all';
                        thumb.onclick = () => {
                            modalImage.src = imgUrl;
                            // Highlight selected thumbnail
                            document.querySelectorAll('#galleryThumbnails img').forEach(t => {
                                t.classList.remove('border-gold', 'border-2');
                                t.classList.add('border-transparent');
                            });
                            thumb.classList.add('border-gold', 'border-2');
                        };
                        galleryThumbnails.appendChild(thumb);
                    });
                } catch (e) {
                    console.log('Gallery error:', e);
                }
            }

            modal.classList.remove('hidden');
        }

        function closeModal() {
            modal.classList.add('hidden');
        }

       // --- REAL-TIME WEBSITE CONTENT UPDATE (ADMIN SYNC) ---
// Admin Panel eken data save karoth me function eka wadagath wenna.
// Firebase 'content' collection eka listen karanna.

db.collection('content').doc('main').onSnapshot((doc) => {
    if (doc.exists) {
        const data = doc.data();
        console.log("Admin Panel updated content. Refreshing Website...", data);

        // 1. LocalStorage eka save karanna
        localStorage.setItem('ayana_site_content', JSON.stringify(data));

      

    }
});

// --- WEBSITE UI UPDATE FUNCTION ---
function updateWebsiteUI(data) {
    
    // 1. General Info Update
    if(data.general) {
        document.title = data.general.websiteName || "Ayana Garden";
        const siteNameEl = document.getElementById('siteName');
        if(siteNameEl) siteName.innerText = data.general.websiteName || "Ayana Garden";
        
        const footerNameEl = document.getElementById('footerSiteName');
        if(footerNameEl) footerNameEl.innerText = data.general.websiteName;

        if(data.general.logoUrl) {
            const navLogo = document.getElementById('navLogo');
            if(navLogo) navLogo.src = data.general.logoUrl;
            const footerLogoImg = document.getElementById('footerLogoImg');
            if(footerLogoImg) footerLogoImg.src = data.general.logoUrl;
        }
        if(data.general.phone) {
            const phoneEl = document.getElementById('footerPhone');
            if(phoneEl) phoneEl.innerText = data.general.phone;
        }
        if(data.general.email) {
            const emailEl = document.getElementById('footerEmail');
            if(emailEl) emailEl.innerText = data.general.email;
        }
        if(data.general.address) {
            const addrEl = document.getElementById('footerAddress');
            if(addrEl) addrEl.innerText = data.general.address;
        }
    }

    // 2. Hero Section Update
    if(data.hero) {
        if(data.hero.title) {
            const hTitle = document.getElementById('heroTitle');
            if(hTitle) hTitle.innerHTML = data.hero.title.replace(/\n/g, '<br />');
        }
        if(data.hero.subtitle) {
            const hSub = document.getElementById('heroSubtitle');
            if(hSub) hSub.innerText = data.hero.subtitle;
        }
        if(data.hero.bgImageUrl) {
             const hero = document.getElementById('hero');
             const video = document.getElementById('heroVideo');
             if(video) video.style.display = 'none'; // Image ekak nam video eka hide karanna
             
             let bgImg = document.getElementById('heroBgImage');
             if(!bgImg) {
                 bgImg = document.createElement('div');
                 bgImg.id = 'heroBgImage';
                 bgImg.className = 'absolute inset-0 z-0 bg-cover bg-center';
                 hero.prepend(bgImg);
             }
             bgImg.style.backgroundImage = `url(${data.hero.bgImageUrl})`;
        }
    }

    // 3. Vibe Section Update
    if(data.vibe) {
        if(data.vibe.title) {
            const vTitle = document.getElementById('vibeTitle');
            if(vTitle) vTitle.innerText = data.vibe.title;
        }
        if(data.vibe.description) {
            const vDesc = document.getElementById('vibeDesc');
            if(vDesc) vDesc.innerText = data.vibe.description;
        }
    }

    // 4. Rooms Section Update
    if(data.rooms && data.rooms.list) {
        const room1 = data.rooms.list[0];
        const room2 = data.rooms.list[1];
        
        // Room 1
        if(room1) {
            const r1Title = document.getElementById('room1Title');
            if(r1Title) r1Title.innerText = room1.title;
            const r1Desc = document.getElementById('room1Desc');
            if(r1Desc) r1Desc.innerText = room1.desc;
            const r1Img = document.getElementById('room1Img');
            if(r1Img) r1Img.src = room1.imageUrl || '/images/room1.jpg';
            
            const dataEm = document.getElementById('data-emerald');
            if(dataEm) {
                dataEm.querySelector('.data-title').textContent = room1.title;
                dataEm.querySelector('.data-desc').textContent = room1.desc;
                dataEm.querySelector('.data-img').textContent = room1.imageUrl;
            }
        }
        // Room 2
        if(room2) {
            const r2Title = document.getElementById('room2Title');
            if(r2Title) r2Title.innerText = room2.title;
            const r2Desc = document.getElementById('room2Desc');
            if(r2Desc) r2Desc.innerText = room2.desc;
            const r2Img = document.getElementById('room2Img');
            if(r2Img) r2Img.src = room2.imageUrl || '/images/room2.jpg';
            
            const dataAz = document.getElementById('data-azure');
            if(dataAz) {
                dataAz.querySelector('.data-title').textContent = room2.title;
                dataAz.querySelector('.data-desc').textContent = room2.desc;
                dataAz.querySelector('.data-img').textContent = room2.imageUrl;
            }
        }
    }

}

                // --- UPDATED: Form Submission to Firebase ---
        document.getElementById('bookingForm').addEventListener('submit', async function(e) {
            e.preventDefault();
            const submitBtn = document.getElementById('submitBtn');
            const formMessage = document.getElementById('formMessage');
            const formData = new FormData(this);

            // Prepare the booking data
            const bookingData = {
                room_id: parseInt(formRoomId.value),
                room: formRoomTitle.value, // Room Name
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone'),
                check_in: formData.get('check_in'),
                check_out: formData.get('check_out'),
                number_of_guests: parseInt(formData.get('number_of_guests')),
                special_requests: formData.get('special_requests'),
                status: 'Pending', // Default status
                createdAt: firebase.firestore.FieldValue.serverTimestamp() // Server time
            };

            try {
                submitBtn.disabled = true;
                submitBtn.textContent = 'Booking...';
                
                // Submit to FIREBASE (Not Flask)
                await db.collection('bookings').add(bookingData);

                // Success: show message and close modal
                formMessage.textContent = '✅ Booking Confirmed! Check your email. You will also receive a confirmation via WhatsApp.';
                formMessage.style.color = '#10b981';
                formMessage.style.display = 'block';
                
                // Send WhatsApp message as well
                const message = `Hi Ayana Garden, I'd like to book the ${bookingData.room}.\n\nName: ${bookingData.name}\nPhone: ${bookingData.phone}\nEmail: ${bookingData.email}\nCheck-in: ${bookingData.check_in}\nCheck-out: ${bookingData.check_out}\nGuests: ${bookingData.number_of_guests}\nRequests: ${bookingData.special_requests}`;
                window.open(`https://wa.me/94717075724?text=${encodeURIComponent(message)}`, '_blank');
                
                // Reset form and close modal after 2 seconds
                setTimeout(() => {
                    this.reset();
                    closeModal();
                    formMessage.style.display = 'none';
                }, 2000);

            } catch (error) {
                // Error handling
                console.error('Booking error:', error);
                formMessage.textContent = `❌ Error: Could not save booking. Please check internet connection.`;
                formMessage.style.color = '#ef4444';
                formMessage.style.display = 'block';
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = 'Confirm Booking';
            }
        });
    

    