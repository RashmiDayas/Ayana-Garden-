<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ayana Garden | Admin Panel</title>
    
    <!-- Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Montserrat:wght@300;400;500;600&family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <!-- Tailwind CSS -->
    <script src="https://cdn.tailwindcss.com"></script>
    
    <!-- Tailwind Configuration -->
    <script>
      tailwind.config = {
        theme: {
          extend: {
            colors: {
              navy: '#0a192f',
              gold: '#d4af37',
              softWhite: '#f6f6f6',
              whatsapp: '#25D366',
              adminBg: '#f3f4f6',
              sidebar: '#0f172a',
            },
            fontFamily: {
              westiva: ['Playfair Display', 'serif'], 
              heading: ['Playfair Display', 'serif'],
              body: ['Montserrat', 'sans-serif'],
              extra: ['Poppins', 'sans-serif'],
            },
            animation: {
                'fade-in': 'fadeIn 0.5s ease-out forwards',
                'slide-up': 'slideUp 0.5s ease-out forwards',
            },
            keyframes: {
                fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
                slideUp: { '0%': { opacity: '0', transform: 'translateY(20px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } }
            }
          }
        }
      }
    </script>

    <!-- FontAwesome for Icons (Simpler than raw SVGs for this version) -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">

    <!-- Custom CSS -->
    <link rel="stylesheet" href="admin.css">
</head>
<body class="bg-gray-100 font-body text-gray-900">

    <!-- MAIN WEBSITE PREVIEW (Visible by default) -->
    <div id="public-site" class="min-h-screen">
        <nav class="fixed top-0 w-full flex justify-between items-center px-[5%] py-4 z-[1000] bg-navy text-white shadow-lg">
            <div class="font-westiva text-xl font-bold" id="preview-site-name">Ayana Garden Bungalow</div>
            <button onclick="showLoginModal()" class="text-xs border border-white/30 px-4 py-1 rounded hover:bg-white hover:text-navy transition">Admin Login</button>
        </nav>
        
        <main class="pt-20">
            <section class="relative h-64 w-full flex items-center justify-center text-center text-white bg-navy">
                <img id="preview-hero-bg" src="https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?q=80&w=2070&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover opacity-40" alt="Hero" />
                <div class="relative z-10">
                    <h1 id="preview-hero-title" class="text-3xl font-bold whitespace-pre-line">Loading...</h1>
                </div>
            </section>
            <div class="p-10 text-center text-gray-500">
                <p>This is the live website preview.</p>
            </div>
        </main>
    </div>

    <!-- LOGIN MODAL -->
    <div id="login-modal" class="fixed inset-0 z-[7000] hidden items-center justify-center p-4 bg-navy/80 backdrop-blur-sm animate-fade-in">
        <div class="bg-white p-10 rounded-2xl w-full max-w-sm relative z-10 shadow-2xl">
            <h3 class="font-heading text-3xl text-navy mb-6 text-center font-bold">Admin Access</h3>
            <form id="login-form" class="space-y-6">
                <input id="login-password" type="password" placeholder="Enter Password (admin123)" class="w-full bg-gray-100 p-4 rounded-xl text-center focus:outline-none focus:ring-2 focus:ring-gold" />
                <div class="flex gap-4">
                    <button type="button" onclick="hideLoginModal()" class="flex-1 py-3 text-sm font-bold text-gray-500 hover:text-navy">Cancel</button>
                    <button type="submit" class="flex-1 bg-gold text-navy py-3 rounded-xl font-bold uppercase text-sm shadow-lg hover:bg-navy hover:text-white transition-all">Login</button>
                </div>
            </form>
        </div>
    </div>

    <!-- ADMIN PANEL OVERLAY (Hidden until login) -->
    <div id="admin-panel" class="fixed inset-0 z-[6000] hidden bg-gray-50 font-body animate-fade-in text-gray-800">
        <aside class="w-[260px] bg-sidebar text-white flex flex-col shrink-0 shadow-2xl z-20">
            <div class="p-6 border-b border-white/10">
                <h2 class="font-westiva text-xl font-bold text-gold">Admin Panel</h2>
                <p class="text-[10px] text-gray-400 font-extra uppercase tracking-widest mt-1">Ayana Garden CMS</p>
            </div>
            <nav class="flex-1 mt-4 overflow-y-auto no-scrollbar py-4" id="sidebar-nav">
                <!-- Navigation items generated by JS -->
            </nav>
            <div class="p-4 border-t border-white/10">
                <button onclick="logout()" class="w-full py-2 text-xs text-gray-400 hover:text-white transition-colors text-left px-6">Logout / Exit</button>
            </div>
        </aside>

        <div class="flex-1 flex flex-col overflow-hidden relative">
            <header class="h-16 bg-white border-b px-8 flex items-center justify-between shrink-0 shadow-sm z-10">
                <div class="text-[10px] font-extra font-bold uppercase tracking-widest text-gray-400">
                    Editing: <span id="current-tab-label" class="text-navy">General</span>
                </div>
                <div class="flex gap-3">
                    <button onclick="toggleAdminView()" class="text-xs font-bold text-gray-500 hover:text-red-500 px-4 py-2">Cancel</button>
                    <button onclick="saveContent()" class="bg-navy text-white text-xs font-bold uppercase px-6 py-2.5 rounded shadow-sm hover:bg-gold hover:text-navy transition-all flex items-center gap-2">
                        <i class="fa-solid fa-save"></i> Save Changes
                    </button>
                </div>
            </header>

            <main class="flex-1 overflow-y-auto p-8 md:p-12 no-scrollbar">
                <div id="tab-content" class="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-sm border border-gray-200">
                    <!-- Dynamic Content Loads Here -->
                </div>
            </main>
        </div>
    </div>

    <!-- JS Logic -->
    <script src="admin.js"></script>
</body>
</html>