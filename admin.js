// --- 1. STATE MANAGEMENT ---
let appData = {
    general: { websiteName: "Ayana Garden", phone: "", email: "", logoUrl: "" },
    hero: { title: "", subtitle: "", bgImageUrl: "", buttonText: "" },
    rooms: { list: [] },
    vibe: { title: "", description: "", highlights: [] },
    experiences: [],
    gallery: [],
    reviews: []
};

// Default Fallback Data
const INITIAL_DATA = {
    general: {
        websiteName: "Ayana Garden Bungalow",
        phone: "+94 71 707 5724",
        email: "bookings@ayanagardenella.com",
        whatsappLink: "https://wa.me/94717075724",
        address: "Kithalella, Ella, Sri Lanka",
        tagline: "Designed for Slow Travel",
        logoUrl: "https://images.unsplash.com/photo-1623490771831-7e3f20f01a0e?q=80&w=300&auto=format&fit=crop"
    },
    hero: {
        title: "Slow Down.\nYou Are in Kithalella.",
        subtitle: "A private sanctuary for families, birdwatchers, and hikers on the Pekoe Trail.",
        bgImageUrl: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop",
        bgVideoUrl: "",
        buttonText: "Check Availability & Book Direct",
        secondaryText: "Best Rates Guaranteed on WhatsApp"
    },
    vibe: {
        title: "The Art of Doing Nothing",
        description: "Ella Town is for the crowd. Kithalella is for the soul.",
        highlights: []
    },
    rooms: { list: [
        { title: "The Emerald Suite", priceLabel: "Family Suite", desc: "Vibrant, nature-immersive.", imageUrl: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070" }
    ]},
    experiences: [],
    gallery: [],
    reviews: []
};

let activeTab = 'general';

// --- 2. ICONS CONFIGURATION ---
const ICONS = {
    'Settings': 'fa-cog',
    'LayoutGrid': 'fa-table-cells',
    'MapPinAdmin': 'fa-map-pin',
    'MountainAdmin': 'fa-mountain',
    'Images': 'fa-images',
    'MessageSquare': 'fa-message',
    'Trash2': 'fa-trash-can',
    'Plus': 'fa-plus',
    'Save': 'fa-save',
    'Star': 'fa-star',
    'BookOpen': 'fa-book-open',
    'Binoculars': 'fa-binoculars', // Fallback if icon missing
    'Wind': 'fa-wind',
    'Wifi': 'fa-wifi',
    'Coffee': 'fa-mug-hot'
};

const getMenuItems = () => [
    { id: 'general', label: 'General / Footer', icon: 'fa-cog' },
    { id: 'hero', label: 'Hero Section', icon: 'fa-table-cells' },
    { id: 'vibe', label: 'Vibe & About', icon: 'fa-book-open' },
    { id: 'rooms', label: 'Rooms', icon: 'fa-map-pin' },
    { id: 'experiences', label: 'Experiences', icon: 'fa-mountain' },
    { id: 'gallery', label: 'Gallery', icon: 'fa-images' },
    { id: 'reviews', label: 'Reviews', icon: 'fa-message' },
    { id: 'bookings', label: 'Bookings', icon: 'fa-users' }
];

// --- 3. INITIALIZATION ---
document.addEventListener('DOMContentLoaded', async () => {
    await loadContent();
    renderSidebar();
    renderTab('general'); // Default tab
    updatePreview();
});

// --- 4. API FUNCTIONS ---
async function apiCall(action, data = {}) {
    try {
        const response = await fetch(`api.php?action=${action}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        return await response.json();
    } catch (error) {
        console.error("API Error:", error);
        alert("Connection error. Check console.");
        return null;
    }
}

async function loadContent() {
    const res = await apiCall('get_content');
    if (res && Object.keys(res).length > 0) {
        appData = res;
    } else {
        appData = JSON.parse(JSON.stringify(INITIAL_DATA));
    }
}

async function saveContent() {
    const btn = document.querySelector('button[onclick="saveContent()"]');
    const originalText = btn.innerHTML;
    btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Saving...';
    
    const res = await apiCall('save_content', { data: appData });
    
    if (res && res.status === 'success') {
        alert('Content Saved Successfully!');
        updatePreview();
    } else {
        alert('Error saving content.');
    }
    
    btn.innerHTML = originalText;
}

// --- 5. UI RENDERING ---

function updatePreview() {
    document.getElementById('preview-site-name').innerText = appData.general.websiteName;
    document.getElementById('preview-hero-title').innerText = appData.hero.title;
    document.getElementById('preview-hero-bg').src = appData.hero.bgImageUrl;
}

function renderSidebar() {
    const nav = document.getElementById('sidebar-nav');
    nav.innerHTML = getMenuItems().map(item => `
        <button 
            onclick="switchTab('${item.id}')"
            class="w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all border-l-4 ${activeTab === item.id ? 'bg-white/5 border-gold text-white' : 'border-transparent hover:bg-white/5 text-gray-400'}"
        >
            <i class="fa-solid ${item.icon} w-5"></i> ${item.label}
        </button>
    `).join('');
}

function switchTab(tabId) {
    activeTab = tabId;
    renderSidebar();
    renderTab(tabId);
    document.getElementById('current-tab-label').innerText = tabId.charAt(0).toUpperCase() + tabId.slice(1);
}

function renderTab(tabId) {
    const container = document.getElementById('tab-content');
    
    // Render Login Check
    if(tabId === 'bookings') {
        renderBookingsTab(container);
        return;
    }

    let html = `<h3 class="font-heading text-2xl text-navy mb-6 border-b pb-4 capitalize">${tabId} Settings</h3>`;
    
    // Helper for Inputs
    const createInput = (label, path, type='text', isTextarea=false) => {
        const val = getNestedValue(appData, path);
        const inputTag = isTextarea 
            ? `<textarea class="admin-input h-24" onchange="updateData('${path}', this.value)">${val}</textarea>`
            : `<input type="${type}" class="admin-input" value="${val || ''}" onchange="updateData('${path}', this.value)" />`;
        
        return `
        <div class="${type === 'file' ? 'col-span-2' : ''} mb-4">
            <label class="admin-label">${label}</label>
            ${type === 'file' 
                ? `<input type="file" accept="image/*" class="admin-input" onchange="handleFileUpload(this, '${path}')" />
                   ${val ? `<img src="${val}" class="mt-2 h-20 w-auto object-cover rounded border" />` : ''}`
                : inputTag
            }
        </div>`;
    };

    if (tabId === 'general') {
        html += `
        <div class="grid grid-cols-2 gap-6">
            ${createInput('Website Name', 'general.websiteName')}
            ${createInput('Phone', 'general.phone')}
            ${createInput('Email', 'general.email')}
            ${createInput('Address', 'general.address', 'text', true)}
            <div class="col-span-2">${createInput('Logo Image', 'general.logoUrl', 'file')}</div>
        </div>`;
    } 
    else if (tabId === 'hero') {
        html += `
        <div class="space-y-4">
            ${createInput('Title (Use \\n for break)', 'hero.title', 'text', true)}
            ${createInput('Subtitle', 'hero.subtitle', 'text', true)}
            <div class="grid grid-cols-2 gap-4">
                ${createInput('Button Text', 'hero.buttonText')}
                ${createInput('Secondary Text', 'hero.secondaryText')}
            </div>
            ${createInput('Background Image', 'hero.bgImageUrl', 'file')}
        </div>`;
    }
    else if (tabId === 'rooms') {
        html += `<div id="rooms-list"></div>
        <button onclick="addRoom()" class="w-full py-3 border-2 border-dashed border-gray-300 rounded hover:border-navy text-gray-500 font-bold uppercase text-sm flex items-center justify-center gap-2 mt-4">
            <i class="fa-solid fa-plus"></i> Add Room
        </button>`;
        setTimeout(renderRoomsList, 0); // Render list after DOM update
    }
    else if (tabId === 'gallery') {
        html += `<div id="gallery-list" class="grid grid-cols-2 gap-4"></div>
        <button onclick="addGalleryItem()" class="w-full py-3 border-2 border-dashed border-gray-300 rounded hover:border-navy text-gray-500 font-bold uppercase text-sm flex items-center justify-center gap-2 mt-4">
            <i class="fa-solid fa-plus"></i> Add Image
        </button>`;
        setTimeout(renderGalleryList, 0);
    }
    // ... (You can extend logic for 'vibe', 'experiences', 'reviews' following the pattern of 'rooms')

    container.innerHTML = html;
}

// --- 6. DYNAMIC LIST LOGIC (ROOMS & GALLERY) ---

function renderRoomsList() {
    const list = document.getElementById('rooms-list');
    if(!list) return;
    
    list.innerHTML = appData.rooms.list.map((room, idx) => `
        <div class="p-6 bg-gray-50 rounded-lg border border-gray-200 relative mb-4">
            <button onclick="deleteRoom(${idx})" class="absolute top-4 right-4 text-red-400 hover:text-red-600"><i class="fa-solid fa-trash-can"></i></button>
            <div class="grid grid-cols-2 gap-4 mb-4">
                <div>
                    <label class="admin-label">Room Title</label>
                    <input class="admin-input" value="${room.title}" onchange="updateRoom(${idx}, 'title', this.value)" />
                </div>
                <div>
                    <label class="admin-label">Price Label</label>
                    <input class="admin-input" value="${room.priceLabel}" onchange="updateRoom(${idx}, 'priceLabel', this.value)" />
                </div>
            </div>
            <div class="mb-4">
                <label class="admin-label">Description</label>
                <textarea class="admin-input h-20" onchange="updateRoom(${idx}, 'desc', this.value)">${room.desc}</textarea>
            </div>
            <div>
                <label class="admin-label">Room Image</label>
                <input type="file" accept="image/*" class="admin-input" onchange="handleRoomUpload(this, ${idx})" />
                ${room.imageUrl ? `<img src="${room.imageUrl}" class="mt-2 h-40 w-full object-cover rounded border" />` : ''}
            </div>
        </div>
    `).join('');
}

function addRoom() {
    appData.rooms.list.push({ title: "New Room", priceLabel: "On Request", desc: "Description...", imageUrl: "" });
    renderRoomsList();
}

function updateRoom(idx, field, value) {
    appData.rooms.list[idx][field] = value;
}

function deleteRoom(idx) {
    if(confirm('Delete this room?')) {
        appData.rooms.list.splice(idx, 1);
        renderRoomsList();
    }
}

function handleRoomUpload(input, idx) {
    handleFileUpload(input, null, (base64) => {
        appData.rooms.list[idx].imageUrl = base64;
        renderRoomsList();
    });
}

function renderGalleryList() {
    const list = document.getElementById('gallery-list');
    if(!list) return;
    
    list.innerHTML = appData.gallery.map((img, idx) => `
        <div class="relative group border rounded overflow-hidden">
            <button onclick="deleteGalleryItem(${idx})" class="absolute top-2 right-2 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10"><i class="fa-solid fa-trash-can"></i></button>
            <img src="${img.url}" class="w-full h-32 object-cover" />
            <div class="p-2">
                <input class="admin-input text-xs py-1" value="${img.title}" onchange="updateGalleryItem(${idx}, 'title', this.value)" placeholder="Caption" />
                <input type="file" class="text-[10px] mt-2" accept="image/*" onchange="handleGalleryUpload(this, ${idx})" />
            </div>
        </div>
    `).join('');
}

function addGalleryItem() {
    appData.gallery.push({ url: "", title: "" });
    renderGalleryList();
}

function updateGalleryItem(idx, field, value) {
    appData.gallery[idx][field] = value;
}

function deleteGalleryItem(idx) {
    appData.gallery.splice(idx, 1);
    renderGalleryList();
}

function handleGalleryUpload(input, idx) {
    handleFileUpload(input, null, (base64) => {
        appData.gallery[idx].url = base64;
        renderGalleryList();
    });
}

// --- 7. BOOKINGS TAB ---
async function renderBookingsTab(container) {
    container.innerHTML = '<h3 class="font-heading text-3xl text-navy mb-6 border-b pb-4">Booking Details</h3><p class="text-gray-500">Loading...</p>';
    
    const res = await fetch('api.php?action=get_bookings');
    const bookings = await res.json();
    
    if(!Array.isArray(bookings)) {
        container.innerHTML = '<p class="text-red-500">Error loading bookings.</p>';
        return;
    }

    if (bookings.length === 0) {
        container.innerHTML = '<p class="text-gray-500 italic text-center py-10">No bookings found.</p>';
        return;
    }

    let html = `
    <div class="overflow-x-auto rounded-lg border border-gray-200">
        <table class="w-full text-left text-sm bg-white">
            <thead class="bg-gray-100 text-gray-600 font-extra uppercase tracking-widest text-xs">
                <tr>
                    <th class="p-4 border-b">Date</th>
                    <th class="p-4 border-b">Name</th>
                    <th class="p-4 border-b">Phone</th>
                    <th class="p-4 border-b">Room</th>
                    <th class="p-4 border-b">Check In</th>
                    <th class="p-4 border-b">Guests</th>
                    <th class="p-4 border-b">Status</th>
                    <th class="p-4 border-b text-right">Action</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-100">
    `;

    bookings.forEach(b => {
        const date = new Date(b.created_at).toLocaleDateString();
        html += `
            <tr class="hover:bg-gray-50 transition-colors">
                <td class="p-4 text-gray-500 whitespace-nowrap">${date}</td>
                <td class="p-4 font-bold text-navy">${b.name}</td>
                <td class="p-4 text-gray-600">${b.phone}</td>
                <td class="p-4"><span class="bg-navy/10 text-navy px-2 py-1 rounded text-xs font-bold border border-navy/20">${b.room}</span></td>
                <td class="p-4 text-gray-600">${b.checkIn}</td>
                <td class="p-4 text-gray-600">${b.guests}</td>
                <td class="p-4"><span class="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-bold uppercase">${b.status}</span></td>
                <td class="p-4 text-right">
                    <button onclick="deleteBooking(${b.id})" class="text-red-400 hover:text-red-600 p-2 rounded hover:bg-red-50"><i class="fa-solid fa-trash-can"></i></button>
                </td>
            </tr>
        `;
    });

    html += `</tbody></table></div>`;
    container.innerHTML = html;
}

async function deleteBooking(id) {
    if(confirm('Delete this booking?')) {
        await apiCall('delete_booking', { id });
        renderBookingsTab(document.getElementById('tab-content'));
    }
}

// --- 8. UTILITIES ---

function getNestedValue(obj, path) {
    return path.split('.').reduce((o, i) => o ? o[i] : null, obj);
}

function updateData(path, value) {
    const keys = path.split('.');
    let current = appData;
    for (let i = 0; i < keys.length - 1; i++) {
        current = current[keys[i]];
    }
    current[keys[keys.length - 1]] = value;
}

function handleFileUpload(input, path, callback) {
    const file = input.files[0];
    if (!file) return;
    
    if (file.size > 2500000) {
        alert("File too large. Please use an image under 2.5MB.");
        return;
    }
    
    const reader = new FileReader();
    reader.onloadend = () => {
        if(path) {
            updateData(path, reader.result);
        }
        if(callback) {
            callback(reader.result);
        }
    };
    reader.readAsDataURL(file);
}

// --- 9. LOGIN / AUTH ---
const loginModal = document.getElementById('login-modal');
const adminPanel = document.getElementById('admin-panel');
const publicSite = document.getElementById('public-site');

function showLoginModal() {
    loginModal.classList.remove('hidden');
    loginModal.classList.add('flex');
}

function hideLoginModal() {
    loginModal.classList.add('hidden');
    loginModal.classList.remove('flex');
}

document.getElementById('login-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const pwd = document.getElementById('login-password').value;
    const res = await apiCall('login', { password: pwd });
    
    if (res.status === 'success') {
        hideLoginModal();
        toggleAdminView();
    } else {
        alert(res.message || 'Login failed');
    }
});

async function toggleAdminView() {
    const isHidden = adminPanel.classList.contains('hidden');
    
    if (isHidden) {
        // Check session
        const authCheck = await fetch('api.php?action=check_auth').then(r => r.json());
        if (!authCheck.logged_in) {
            showLoginModal();
            return;
        }
        
        adminPanel.classList.remove('hidden');
        publicSite.classList.add('blur-sm', 'pointer-events-none');
        renderTab(activeTab);
    } else {
        adminPanel.classList.add('hidden');
        publicSite.classList.remove('blur-sm', 'pointer-events-none');
    }
}

async function logout() {
    await apiCall('logout');
    location.reload();
}