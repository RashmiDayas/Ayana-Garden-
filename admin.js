// --- 1. IMPORTS & SETUP ---
// Destructure React hooks from global window object
const { useState, useEffect, useRef } = React;

// --- 2. FIREBASE CONFIGURATION ---
// Initialize Firebase with your Config
const firebaseConfig = {
  apiKey: "AIzaSyDnSd1E8JLbAMuxMu_InPO-yQ4KzzEcoiI",
  authDomain: "ayanagardendb-354d4.firebaseapp.com",
  projectId: "ayanagardendb-354d4",
  storageBucket: "ayanagardendb-354d4.appspot.com",
  messagingSenderId: "476687614036",
  appId: "1:476687614036:web:b9427760e8f2d2de476dc1",
  measurementId: "G-XLMFFWMSW6"
};


// Initialize App and Firestore
// Note: We use 'firebase' global variable because of the compat script in HTML
const app = firebase.initializeApp(firebaseConfig);
const db=firebase.firestore();
     const auth=firebase.auth();
    const storage=firebase.storage(); // THIS WAS MISSING IN YOUR CODE

// --- 3. ICONS COMPONENTS ---
const Icons = {
    BookOpen: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>,
    Binoculars: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12h20"/><path d="M10 12v8"/><path d="M14 12v8"/><path d="M6 12a6 6 0 0 1 12 0"/></svg>,
    Wind: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.7 7.7a2.5 2.5 0 1 1 1.8 4.3H2"/><path d="M9.6 4.6A2 2 0 1 1 11 8H2"/><path d="M12.6 19.4A2 2 0 1 0 14 16H2"/></svg>,
    Wifi: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>,
    Coffee: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 8h1a4 4 0 1 1 0 8h-1"/><path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4Z"/><line x1="6" y1="1" x2="6" y2="4"/><line x1="10" y1="1" x2="10" y2="4"/><line x1="14" y1="1" x2="14" y2="4"/></svg>,
    Mountain: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>,
    MapPin: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
    Train: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m14 2-3.3 9h6.7l-3.3-9Z"/><path d="M2 11h20"/><path d="M12 2v20"/><path d="m5 20 3-9h8l3 9"/></svg>,
    Footprints: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 11 3.8 11 8c0 2.85-1.27 4.52-2 5.5V20a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-4Z"/><path d="M20 20v-4c0-1.1-.9-2-2-2h-2.5c-1.1 0-2 .9-2 2V20"/><path d="M14 12v-2.38C14 7.5 12.97 6.5 13 4c.03-2.72 1.49-6 4.5-6 1.87 0 3.5 1.8 3.5 6 0 2.85-1.27 4.52-2 5.5V16a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-4Z"/></svg>,
    Map: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>,
    Camera: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3"/></svg>,
    Star: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    X: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 18 18"/></svg>,
    ChevronLeft: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>,
    ChevronRight: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>,
    Quote: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"/></svg>,
    Settings: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.09a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.39a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"/><circle cx="12" cy="12" r="3"/></svg>,
    LayoutGrid: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="7" height="9" x="3" y="3" rx="1"/><rect width="7" height="5" x="14" y="3" rx="1"/><rect width="7" height="9" x="14" y="12" rx="1"/><rect width="7" height="5" x="3" y="16" rx="1"/></svg>,
    MapPinAdmin: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>,
    MountainAdmin: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="m8 3 4 8 5-5 5 15H2L8 3z"/></svg>,
    Images: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>,
    MessageSquare: () => <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>,
    Save: () => <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>,
    Lock: () => <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect width="18" height="11" x="3" y="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>,
    Trash2: () => <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>,
    Plus: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
};

const getIcon = (name) => {
    const IconComp = Icons[name] || Icons.Star;
    return <div className="w-full h-full flex items-center justify-center"><IconComp /></div>;
};

// --- 4. INITIAL CONTENT DATA ---
// This is the default data if the database is empty
const INITIAL_CONTENT = {
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
        description: "Ella Town is for the crowd. Kithalella is for the soul. Located at an elevation of 1,041 meters, Ayana Garden is a transition zone where the mist meets the mountains.",
        highlights: [
            { title: "Read", desc: "Curated reading nooks & mini-library.", icon: "BookOpen" },
            { title: "Watch", desc: "Home to 34 endemic bird species.", icon: "Binoculars" },
            { title: "Breathe", desc: "Pure mountain air, away from traffic.", icon: "Wind" }
        ]
    },
    rooms: {
        sectionTitle: "Accommodation",
        mainTitle: "Space to Breathe",
        list: [
            { title: "The Emerald Suite", priceLabel: "Family Suite", desc: "A vibrant, nature-immersive space featuring accents of deep forest green and crimson red.", imageUrl: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop" },
            { title: "The Azure Suite", priceLabel: "Family Suite", desc: "An elegant retreat designed with calming royal blues and warm chestnut earth tones.", imageUrl: "https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=2000&auto=format&fit=crop" }
        ]
    },
    experiences: [
        { title: "A Birdwatcher’s Secret", subtitle: "On-Site USP", desc: "Kithalella is an ornithological bridge between the wet zone and the highlands.", iconType: "Binoculars" },
        { title: "The Pekoe Trail - Stage 16", subtitle: "Hiking", desc: "We are located directly on the route. Hiking from Demodara to Ella?", iconType: "Footprints" },
        { title: "The Railway Hike", subtitle: "Walking", desc: "Just 500m to the quiet Kithalella Railway Station. Walk along the tracks.", iconType: "Train" },
        { title: "Secret Waterfalls", subtitle: "Exploration", desc: "Avoid the tourist traps. Ask our host for the hand-drawn map.", iconType: "Map" }
    ],
    gallery: [
        { url: "https://images.unsplash.com/photo-1552728089-57bdde30ebd1?q=80&w=1974&auto=format&fit=crop", title: "Bird Watching" },
        { url: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop", title: "Morning Coffee" },
        { url: "https://images.unsplash.com/photo-1567393528677-d6a97da16552?q=80&w=1974&auto=format&fit=crop", title: "Iconic Trains" },
        { url: "https://images.unsplash.com/photo-1539635278303-d4002c07eae3?q=80&w=2070&auto=format&fit=crop", title: "Friendship" },
        { url: "https://images.unsplash.com/photo-1528183429752-a97d0bf99b5a?q=80&w=2070&auto=format&fit=crop", title: "Lush Greenery" },
        { url: "https://images.unsplash.com/photo-1517330357046-3ab5a5dd42a1?q=80&w=1974&auto=format&fit=crop", title: "Cozy Evenings" }
    ],
    reviews: [
        { name: "Sarah Jenkins", text: "Absolutely magical! The view of Ella Rock is breathtaking.", rating: 5, date: "2 months ago", img: "https://randomuser.me/api/portraits/women/1.jpg" },
        { name: "David Miller", text: "Hospitality was unmatched. Waking up to the sounds of nature was the highlight.", rating: 5, date: "1 month ago", img: "https://randomuser.me/api/portraits/men/2.jpg" },
        { name: "Priya Sharma", text: "A hidden gem! The coffee, the books, the mist... everything was perfect.", rating: 5, date: "3 weeks ago", img: "https://randomuser.me/api/portraits/women/3.jpg" }
    ]
};

// --- 5. ADMIN COMPONENTS ---

const IconSelector = ({ value, onChange }) => {
    const iconKeys = Object.keys(Icons).filter(k => k !== 'Star'); 
    return (
        <div className="grid grid-cols-6 gap-2 bg-gray-100 p-2 rounded border border-gray-300">
            {iconKeys.map(key => (
                <button 
                    key={key} 
                    onClick={() => onChange(key)}
                    className={`p-2 rounded flex items-center justify-center hover:bg-gold hover:text-navy transition-all ${value === key ? 'bg-navy text-white' : 'text-gray-500'}`}
                    title={key}
                >
                    <div className="w-5 h-5">{getIcon(key)}</div>
                </button>
            ))}
        </div>
    );
};

const AdminPanel = ({ content, onSave, onExit }) => {
    const [activeTab, setActiveTab] = useState('general');
    const [tempData, setTempData] = useState(JSON.parse(JSON.stringify(content)));
    const [isSaving, setIsSaving] = useState(false);
    const [bookings, setBookings] = useState([]);
    const [loadingBookings, setLoadingBookings] = useState(true);
   const [user,setUser]=React.useState(null);

React.useEffect(()=>{
auth.onAuthStateChanged(setUser);
},[]);

    const updateField = (path, value) => {
        const updated = JSON.parse(JSON.stringify(tempData));
        const keys = path.split('.');
        let current = updated;
        for (let i = 0; i < keys.length - 1; i++) {
            current = current[keys[i]];
        }
        current[keys[keys.length - 1]] = value;
        setTempData(updated);
    };

    // Handle file upload (Convert to Base64 for Firestore)
    const handleFileChange = (e, path) => {
        const file = e.target.files[0];
        if (!file) return;
        
        // Limit size to 1.5MB to fit in Firestore
        if (file.size > 1500000) { 
            alert("File too large. Please use an image under 1.5MB.");
            return;
        }
        
        const reader = new FileReader();
        reader.onloadend = () => {
            updateField(path, reader.result);
        };
        reader.readAsDataURL(file);
    };

    const handleSave = () => {
        setIsSaving(true);
        setTimeout(() => {
            onSave(tempData);
            setIsSaving(false);
        }, 800);
    };

    useEffect(() => {
        // 'bookings' collection eka listen karanna
        const unsubscribe = db.collection('bookings')
            .orderBy('createdAt') // New bookings top eka enawa
            .onSnapshot((snapshot) => {
                const bookingsList = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));
                setBookings(bookingsList);
                setLoadingBookings(false);
            }, (error) => {
                console.error("Error fetching bookings: ", error);
                setLoadingBookings(false);
            });

        // Cleanup listener (Admin panel eka close karoth stop wenna)
        return () => unsubscribe();
    }, []); // Empty array means run only once on mount

    // --- ADD THIS DELETE FUNCTION ---
    const deleteBooking = (id) => {
        if(window.confirm("Delete this booking?")) {
            db.collection('bookings').doc(id).delete()
            .then(() => {
                alert("Booking deleted from Database");
            })
            .catch((error) => {
                console.error("Error deleting booking: ", error);
            });
        }
    };

    const menuItems = [
        { id: 'general', label: 'General / Footer', icon: <Icons.Settings /> },
        { id: 'hero', label: 'Hero Section', icon: <Icons.LayoutGrid /> },
        { id: 'vibe', label: 'Vibe & About', icon: <Icons.BookOpen /> },
        { id: 'rooms', label: 'Rooms', icon: <Icons.MapPinAdmin /> },
        { id: 'experiences', label: 'Experiences', icon: <Icons.MountainAdmin /> },
        { id: 'gallery', label: 'Gallery', icon: <Icons.Images /> },
        { id: 'reviews', label: 'Reviews', icon: <Icons.MessageSquare /> },
        { id: 'bookings', label: 'booking details', icon: <Icons.Trash2 /> }
    ];

    return (
        <div className="fixed inset-0 z-[6000] flex bg-gray-50 font-body animate-fade-in text-gray-800">
            <aside className="w-[260px] bg-sidebar text-white flex flex-col shrink-0 shadow-2xl z-20">
                <div className="p-6 border-b border-white/10">
                    <h2 className="font-westiva text-xl font-bold text-gold">Admin Panel</h2>
                    <p className="text-[10px] text-gray-400 font-extra uppercase tracking-widest mt-1">Ayana Garden CMS</p>
                </div>
                <nav className="flex-1 mt-4 overflow-y-auto no-scrollbar py-4">
                    {menuItems.map(item => (
                        <button 
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={`w-full flex items-center gap-3 px-6 py-3 text-sm font-medium transition-all border-l-4 ${activeTab === item.id ? 'bg-white/5 border-gold text-white' : 'border-transparent hover:bg-white/5 text-gray-400'}`}
                        >
                            {item.icon} {item.label}
                        </button>
                    ))}
                </nav>
                <div className="p-4 border-t border-white/10">
                    <button onClick={onExit} className="w-full py-2 text-xs text-gray-400 hover:text-white transition-colors text-left px-6">Exit to Website</button>
                </div>
            </aside>

            <div className="flex-1 flex flex-col overflow-hidden relative">
                <header className="h-16 bg-white border-b px-8 flex items-center justify-between shrink-0 shadow-sm z-10">
                    <div className="text-[10px] font-extra font-bold uppercase tracking-widest text-gray-400">
                        Editing: <span className="text-navy">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</span>
                    </div>
                    <div className="flex gap-3">
                        <button onClick={onExit} className="text-xs font-bold text-gray-500 hover:text-red-500 px-4 py-2">Cancel</button>
                        <button 
                            onClick={handleSave} 
                            className="bg-navy text-white text-xs font-bold uppercase px-6 py-2.5 rounded shadow-sm hover:bg-gold hover:text-navy transition-all flex items-center gap-2"
                        >
                            <Icons.Save /> {isSaving ? 'Saving...' : 'Save Changes'}
                        </button>
                    </div>
                </header>

                <main className="flex-1 overflow-y-auto p-8 md:p-12 no-scrollbar">
                    <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                        
                        {activeTab === 'general' && (
                            <div className="space-y-6 animate-fade-in">
                                <h3 className="font-heading text-2xl text-navy mb-6 border-b pb-4">General Settings</h3>
                                <div className="grid grid-cols-2 gap-6">
                                    <div className="col-span-2">
                                        <label className="admin-label">Website Name</label>
                                        <input className="admin-input" value={tempData.general.websiteName} onChange={e => updateField('general.websiteName', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="admin-label">Phone Number</label>
                                        <input className="admin-input" value={tempData.general.phone} onChange={e => updateField('general.phone', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="admin-label">Email Address</label>
                                        <input className="admin-input" value={tempData.general.email} onChange={e => updateField('general.email', e.target.value)} />
                                    </div>
                                    <div className="col-span-2">
                                        <label className="admin-label">Address</label>
                                        <input className="admin-input" value={tempData.general.address} onChange={e => updateField('general.address', e.target.value)} />
                                    </div>
                                    <div>
                                        <label className="admin-label">Logo Image</label>
                                        <input type="file" accept="image/*" className="admin-input" onChange={e => handleFileChange(e, 'general.logoUrl')} />
                                        {tempData.general.logoUrl && <img src={tempData.general.logoUrl} className="mt-4 h-16 w-16 rounded-full object-cover border shadow-sm" />}
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'hero' && (
                            <div className="space-y-6 animate-fade-in">
                                <h3 className="font-heading text-2xl text-navy mb-6 border-b pb-4">Hero Section</h3>
                                <div>
                                    <label className="admin-label">Main Title (Use \n for new line)</label>
                                    <textarea className="admin-input h-24" value={tempData.hero.title} onChange={e => updateField('hero.title', e.target.value)} />
                                </div>
                                <div>
                                    <label className="admin-label">Subtitle</label>
                                    <textarea className="admin-input h-20" value={tempData.hero.subtitle} onChange={e => updateField('hero.subtitle', e.target.value)} />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="admin-label">Background Image</label>
                                        <input type="file" accept="image/*" className="admin-input" onChange={e => handleFileChange(e, 'hero.bgImageUrl')} />
                                        {tempData.hero.bgImageUrl && <img src={tempData.hero.bgImageUrl} className="mt-4 w-full h-40 object-cover rounded border" />}
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="admin-label">Button Text</label>
                                            <input className="admin-input" value={tempData.hero.buttonText} onChange={e => updateField('hero.buttonText', e.target.value)} />
                                        </div>
                                        <div>
                                            <label className="admin-label">Secondary Text</label>
                                            <input className="admin-input" value={tempData.hero.secondaryText} onChange={e => updateField('hero.secondaryText', e.target.value)} />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {activeTab === 'rooms' && (
                            <div className="space-y-8 animate-fade-in">
                                <div className="flex justify-between items-center border-b pb-4 mb-6">
                                    <h3 className="font-heading text-2xl text-navy">Rooms Management</h3>
                                </div>
                                {tempData.rooms.list.map((room, idx) => (
                                    <div key={idx} className="p-6 bg-gray-50 rounded-lg border border-gray-200 relative group">
                                        <button onClick={() => {
                                            const newList = tempData.rooms.list.filter((_, i) => i !== idx);
                                            updateField('rooms.list', newList);
                                        }} className="absolute top-4 right-4 text-red-400 hover:text-red-600 transition-colors"><Icons.Trash2 /></button>
                                        
                                        <div className="grid grid-cols-2 gap-4 mb-4">
                                            <div>
                                                <label className="admin-label">Room Title</label>
                                                <input className="admin-input" value={room.title} onChange={e => {
                                                    const newList = [...tempData.rooms.list];
                                                    newList[idx].title = e.target.value;
                                                    updateField('rooms.list', newList);
                                                }} />
                                            </div>
                                            <div>
                                                <label className="admin-label">Price Label</label>
                                                <input className="admin-input" value={room.priceLabel} onChange={e => {
                                                    const newList = [...tempData.rooms.list];
                                                    newList[idx].priceLabel = e.target.value;
                                                    updateField('rooms.list', newList);
                                                }} />
                                            </div>
                                        </div>
                                        <div className="mb-4">
                                            <label className="admin-label">Description</label>
                                            <textarea className="admin-input h-20" value={room.desc} onChange={e => {
                                                const newList = [...tempData.rooms.list];
                                                newList[idx].desc = e.target.value;
                                                updateField('rooms.list', newList);
                                            }} />
                                        </div>
                                        <div>
                                            <label className="admin-label">Room Image</label>
                                            <input type="file" accept="image/*" className="admin-input" onChange={e => handleFileChange(e, `rooms.list.${idx}.imageUrl`)} />
                                            {room.imageUrl && <img src={room.imageUrl} className="mt-4 h-40 w-full object-cover rounded border" />}
                                        </div>
                                    </div>
                                ))}
                                <button onClick={() => {
                                    const newList = [...tempData.rooms.list, { title: "New Room", priceLabel: "On Request", desc: "Description here...", imageUrl: "" }];
                                    updateField('rooms.list', newList);
                                }} className="w-full py-3 border-2 border-dashed border-gray-300 rounded hover:border-navy text-gray-500 font-bold uppercase text-sm flex items-center justify-center gap-2 transition-all"><Icons.Plus /> Add Room</button>
                            </div>
                        )}
                        
                        {activeTab === 'gallery' && (
                            <div className="space-y-6 animate-fade-in">
                                <h3 className="font-heading text-2xl text-navy mb-6 border-b pb-4">Gallery</h3>
                                <div className="grid grid-cols-2 gap-4">
                                    {tempData.gallery.map((img, idx) => (
                                        <div key={idx} className="relative group border rounded overflow-hidden">
                                             <button onClick={() => {
                                                const newList = tempData.gallery.filter((_, i) => i !== idx);
                                                updateField('gallery', newList);
                                            }} className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded opacity-0 group-hover:opacity-100 transition-opacity z-10"><Icons.Trash2 /></button>
                                            <img src={img.url} className="w-full h-32 object-cover" />
                                            <div className="p-2">
                                                <input className="admin-input text-xs py-1" value={img.title} onChange={e => {
                                                    const newList = [...tempData.gallery];
                                                    newList[idx].title = e.target.value;
                                                    updateField('gallery', newList);
                                                }} />
                                                <input type="file" className="text-[10px] mt-2" accept="image/*" onChange={e => handleFileChange(e, `gallery.${idx}.url`)} />
                                            </div>
                                        </div>
                                    ))}
                                    <button onClick={() => updateField('gallery', [...tempData.gallery, {url: "", title: ""}])} className="h-32 border-2 border-dashed flex items-center justify-center text-gray-400 hover:text-gold hover:border-gold"><Icons.Plus /></button>
                                </div>
                            </div>
                        )}
                        
                        {activeTab === 'vibe' && (
                                    <div className="space-y-6 animate-fade-in">
                                        <h3 className="font-heading text-2xl text-navy mb-6 border-b pb-4">Vibe Section</h3>
                                        <div><label className="admin-label">Title</label><input className="admin-input" value={tempData.vibe.title} onChange={e => updateField('vibe.title', e.target.value)} /></div>
                                        <div><label className="admin-label">Description</label><textarea className="admin-input h-24" value={tempData.vibe.description} onChange={e => updateField('vibe.description', e.target.value)} /></div>
                                        <div className="space-y-4"><label className="admin-label">Highlights</label>{tempData.vibe.highlights.map((hl, idx) => (<div key={idx} className="p-4 border rounded bg-gray-50 relative"><button onClick={() => { const list = [...tempData.vibe.highlights]; list.splice(idx, 1); updateField('vibe.highlights', list); }} className="absolute top-2 right-2 text-red-500"><Icons.Trash2 /></button><div className="grid grid-cols-2 gap-2 mb-2"><input className="admin-input" placeholder="Title" value={hl.title} onChange={e => { const list = [...tempData.vibe.highlights]; list[idx].title = e.target.value; updateField('vibe.highlights', list); }} /><div><label className="text-[10px] uppercase font-bold text-gray-400 mb-1 block">Icon</label><IconSelector value={hl.icon} onChange={(val) => { const list = [...tempData.vibe.highlights]; list[idx].icon = val; updateField('vibe.highlights', list); }} /></div></div><textarea className="admin-input text-sm h-16" placeholder="Description" value={hl.desc} onChange={e => { const list = [...tempData.vibe.highlights]; list[idx].desc = e.target.value; updateField('vibe.highlights', list); }} /></div>))}<button onClick={() => updateField('vibe.highlights', [...tempData.vibe.highlights, { title: "New", icon: "Star", desc: "Desc" }])} className="w-full py-2 border-dashed border text-gold hover:bg-gold hover:text-navy rounded font-bold text-xs"><Icons.Plus /> Add Highlight</button></div>
                                    </div>
                                )}

                          {activeTab === 'experiences' && (
                                    <div className="space-y-6 animate-fade-in">
                                        <h3 className="font-heading text-2xl text-navy mb-6 border-b pb-4">Experiences</h3>
                                        {tempData.experiences.map((exp, idx) => (<div key={idx} className="p-4 border rounded bg-gray-50 relative flex gap-4"><button onClick={() => { const list = [...tempData.experiences]; list.splice(idx, 1); updateField('experiences', list); }} className="shrink-0 text-red-500"><Icons.Trash2 /></button><div className="flex-1 space-y-2"><div className="grid grid-cols-2 gap-2"><input className="admin-input text-sm" value={exp.title} onChange={e => { const list = [...tempData.experiences]; list[idx].title = e.target.value; updateField('experiences', list); }} placeholder="Title" /><input className="admin-input text-sm" value={exp.subtitle} onChange={e => { const list = [...tempData.experiences]; list[idx].subtitle = e.target.value; updateField('experiences', list); }} placeholder="Subtitle" /></div><textarea className="admin-input text-sm h-20" value={exp.desc} onChange={e => { const list = [...tempData.experiences]; list[idx].desc = e.target.value; updateField('experiences', list); }} placeholder="Description" /><div className="flex items-center gap-2"><span className="text-xs font-bold text-gray-500">ICON:</span><IconSelector value={exp.iconType} onChange={(val) => { const list = [...tempData.experiences]; list[idx].iconType = val; updateField('experiences', list); }} /></div></div></div>))}<button onClick={() => updateField('experiences', [...tempData.experiences, { title: "New", subtitle: "Cat", desc: "...", iconType: "Star" }])} className="w-full py-2 border-dashed border text-gold rounded font-bold text-xs"><Icons.Plus /> Add Experience</button>
                                    </div>
                                )}
                         {activeTab === 'reviews' && (
                                    <div className="space-y-6 animate-fade-in">
                                        <h3 className="font-heading text-2xl text-navy mb-6 border-b pb-4">Reviews</h3>
                                        {tempData.reviews.map((rev, idx) => (<div key={idx} className="p-4 border rounded bg-gray-50 relative"><button onClick={() => { const list = [...tempData.reviews]; list.splice(idx, 1); updateField('reviews', list); }} className="absolute top-2 right-2 text-red-500"><Icons.Trash2 /></button><div className="grid grid-cols-2 gap-2 mb-2"><input className="admin-input text-sm" value={rev.name} onChange={e => { const list = [...tempData.reviews]; list[idx].name = e.target.value; updateField('reviews', list); }} placeholder="Name" /><input className="admin-input text-sm" value={rev.date} onChange={e => { const list = [...tempData.reviews]; list[idx].date = e.target.value; updateField('reviews', list); }} placeholder="Date" /></div><textarea className="admin-input text-sm h-20 mb-2" value={rev.text} onChange={e => { const list = [...tempData.reviews]; list[idx].text = e.target.value; updateField('reviews', list); }} placeholder="Review Text" /><div><label className="text-[10px] font-bold text-gray-500">Rating (1-5):</label><select className="admin-input text-sm" value={rev.rating} onChange={e => { const list = [...tempData.reviews]; list[idx].rating = parseInt(e.target.value); updateField('reviews', list); }}>{[1,2,3,4,5].map(n => <option key={n} value={n}>{n} Stars</option>)}</select></div></div>))}<button onClick={() => updateField('reviews', [...tempData.reviews, { name: "Guest", text: "Great place!", rating: 5, date: "Just now", img: "https://randomuser.me/api/portraits/lego/1.jpg" }])} className="w-full py-2 border-dashed border text-gold rounded font-bold text-xs"><Icons.Plus /> Add Review</button>
                                    </div>
                                )}

                        {activeTab === 'bookings' && (
                            <div className="animate-fade-in">
                                <h3 className="font-heading text-3xl text-navy mb-6 border-b pb-4">Booking Details</h3>
                                
                                {loadingBookings ? (
                                    <p className="text-gray-500 text-center py-10">Loading bookings from Database...</p>
                                ) : bookings.length === 0 ? (
                                    <p className="text-gray-500 italic text-center py-10">No bookings found in Database.</p>
                                ) : (
                                    <div className="overflow-x-auto rounded-lg border border-gray-200">
                                        <table className="w-full text-left text-sm bg-white">
                                            <thead className="bg-gray-100 text-gray-600 font-extra uppercase tracking-widest text-xs">
                                                <tr>
                                                    <th className="p-4 border-b">Date</th>
                                                    <th className="p-4 border-b">Customer Name</th>
                                                    <th className="p-4 border-b">Phone</th>
                                                    <th className="p-4 border-b">Room</th>
                                                    <th className="p-4 border-b">Check In</th>
                                                    <th className="p-4 border-b">Guests</th>
                                                    <th className="p-4 border-b text-right">Status</th>
                                                    <th className="p-4 border-b text-right">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-gray-100">
                                                {bookings.map((b) => (
                                                    <tr key={b.id} className="hover:bg-gray-50 transition-colors">
                                                        <td className="p-4 text-gray-500 whitespace-nowrap">
                                                            {b.createdAt ? new Date(b.createdAt.seconds * 1000).toLocaleDateString() : 'N/A'}
                                                        </td>
                                                        <td className="p-4 font-bold text-navy">{b.name}</td>
                                                        <td className="p-4 text-gray-600">{b.phone}</td>
                                                        <td className="p-4">
                                                            <span className="bg-navy/10 text-navy px-2 py-1 rounded text-xs font-bold border border-navy/20">
                                                                {b.room}
                                                            </span>
                                                      </td>
                                                        <td className="p-4 text-gray-600">{b.checkIn}</td>
                                                        <td className="p-4 text-gray-600">{b.guests}</td>
                                                        <td className="p-4 text-right">
                                                            <span className="bg-amber-100 text-amber-800 px-2 py-1 rounded text-xs font-bold uppercase">
                                                                {b.status || 'Pending'}
                                                            </span>
                                                        </td>
                                                        <td className="p-4 text-right">
                                                            <button 
                                                                onClick={() => deleteBooking(b.id)} 
                                                                className="text-red-400 hover:text-red-600 p-2 rounded hover:bg-red-50 transition-all"
                                                                title="Delete Booking"
                                                            >
                                                                <Icons.Trash2 />
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </div>
    );
};

// --- 6. MAIN APP COMPONENT ---
const App = () => {
  const [siteContent, setSiteContent] = useState(INITIAL_CONTENT);
  const [scrolled, setScrolled] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loginVisible, setLoginVisible] = useState(false);

  // Load data from Firebase on startup
  useEffect(() => {
    const loadFromFirebase = async () => {
        try {
            const doc = await db.collection("content").doc("main").get();
            if (doc.exists) {
                setSiteContent(doc.data());
                console.log("Data loaded from Firebase");
            } else {
                console.log("No data in Firebase, using default");
            }
        } catch (error) {
            console.error("Error loading from Firebase:", error);
        }
    };
    loadFromFirebase();
  }, []);

  // Scroll listener
  useEffect(() => {
      const handleScroll = () => setScrolled(window.scrollY > 50);
      window.addEventListener('scroll', handleScroll);
      return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = (e) => {
      e.preventDefault();
      const password = e.target.password.value;
      if (password === "admin123") { 
          setIsAdmin(true); 
          setLoginVisible(false); 
      } else {
          alert("Incorrect Password! Try: admin123");
      }
  };

  const handleSaveContent = async (newData) => {
    try {
        setIsAdmin(false);
        // Save to Firestore
        await db.collection("content").doc("main").set(newData);
        alert("Database Updated Successfully!");
        setSiteContent(newData);
        window.scrollTo(0,0);
    } catch (error) {
        console.error("Error saving:", error);
        alert("Error saving data.");
        setIsAdmin(true); // Stay in admin if save fails
    }
  };

  // A simple Preview Header (Just for the Admin Panel)
  const Header = ({ content }) => (
      <nav className="fixed top-0 w-full flex justify-between items-center px-[5%] py-4 z-[1000] bg-navy text-white shadow-lg">
        <div className="font-westiva text-xl font-bold">{content.general.websiteName}</div>
        <div className="text-xs text-gray-400">Preview Mode</div>
      </nav>
  );

  const Hero = ({ content }) => (
      <section className="relative h-64 w-full flex items-center justify-center text-center text-white bg-navy">
         <img src={content.hero.bgImageUrl} className="absolute inset-0 w-full h-full object-cover opacity-40" alt="Hero" />
         <div className="relative z-10">
            <h1 className="text-3xl font-bold">{content.hero.title}</h1>
         </div>
      </section>
  );

  return (
    <div className="min-h-screen font-body text-gray-900 bg-softWhite">
      <Header content={siteContent} />
      <main className="pt-20">
        <Hero content={siteContent} />
        <div className="p-10 text-center text-gray-500">
            <h3 className="text-xl mb-4">Admin Dashboard</h3>
            <p>Use the "Admin Login" button below to edit the website content.</p>
            <button onClick={() => setLoginVisible(true)} className="mt-4 bg-gold text-navy px-6 py-2 rounded-full font-bold uppercase text-sm">Admin Login</button>
        </div>
      </main>
      
      {/* Login Modal */}
      {loginVisible && (
          <div className="fixed inset-0 z-[7000] flex items-center justify-center p-4 bg-navy/80 backdrop-blur-sm animate-fade-in">
              <div className="bg-white p-10 rounded-2xl w-full max-w-sm relative z-10 shadow-2xl">
                  <h3 className="font-heading text-3xl text-navy mb-6 text-center font-bold">Admin Access</h3>
                  <form onSubmit={handleLogin} className="space-y-6">
                      <input name="password" type="password" placeholder="Enter Password" className="w-full bg-gray-100 p-4 rounded-xl text-center focus:outline-none focus:ring-2 focus:ring-gold" />
                      <div className="flex gap-4">
                          <button type="button" onClick={() => setLoginVisible(false)} className="flex-1 py-3 text-sm font-bold text-gray-500 hover:text-navy">Cancel</button>
                          <button className="flex-1 bg-gold text-navy py-3 rounded-xl font-bold uppercase text-sm shadow-lg hover:bg-navy hover:text-white transition-all">Login</button>
                      </div>
                  </form>
              </div>
          </div>
      )}

      {/* Admin Panel Overlay */}
      {isAdmin && <AdminPanel content={siteContent} onSave={handleSaveContent} onExit={() => setIsAdmin(false)} />}
    </div>
  );
};

// Render the App
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);