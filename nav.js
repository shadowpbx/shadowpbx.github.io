// HexDef Global Navigation & Drawer Architecture
// Curated by Tanvir Hussain // Systems & Security

(function() {
    'use strict';

    // 1. Theme Management (Early execution to prevent flash)
    function getPreferredTheme() {
        if (window.location.search.includes('theme=dark')) return 'dark';
        if (window.location.search.includes('theme=light')) return 'light';
        var savedTheme = localStorage.getItem('hexdef_theme');
        if (savedTheme === 'dark' || savedTheme === 'light') {
            return savedTheme;
        }
        return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('hexdef_theme', theme);
        updateThemeButtons(theme);
    }

    function toggleTheme() {
        var current = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
        var next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
    }

    function updateThemeButtons(theme) {
        var btns = document.querySelectorAll('.theme-toggle-btn, #theme-toggle-btn, #drawer-theme-toggle');
        btns.forEach(function(btn) {
            if (btn.id === 'drawer-theme-toggle') {
                var label = btn.querySelector('.theme-label');
                if (label) {
                    label.textContent = theme === 'dark' ? '☀️ Switch to Light' : '🌙 Switch to Dark';
                }
            } else {
                btn.textContent = theme === 'dark' ? '[ ☀️ ]' : '[ 🌙 ]';
                btn.title = theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode';
            }
        });
    }

    // Run theme initialization immediately
    var initialTheme = getPreferredTheme();
    document.documentElement.setAttribute('data-theme', initialTheme);

    // 2. Localhost URL rewrite for HexLean
    function handleLocalhost() {
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            document.querySelectorAll('a[href="https://hexlean.com"]').forEach(function(el) {
                el.href = 'http://localhost:8080';
            });
        }
    }

    // 3. Mobile Left Drawer Manager
    function ensureDrawer() {
        var drawer = document.getElementById('hexdef-drawer');
        var backdrop = document.getElementById('drawer-backdrop');

        if (!drawer) {
            drawer = document.createElement('aside');
            drawer.id = 'hexdef-drawer';
            drawer.className = 'hexdef-drawer';
            drawer.setAttribute('aria-label', 'Mobile Navigation Drawer');
            drawer.innerHTML = `
                <div class="drawer-header">
                    <a href="/" class="drawer-brand">
                        <span class="drawer-brand-icon">🛡️</span>
                        <div class="drawer-brand-info">
                            <span class="drawer-brand-text">HexDef</span>
                            <span class="drawer-brand-sub">Systems & Security</span>
                        </div>
                    </a>
                    <button id="drawer-close-btn" class="drawer-close-btn" aria-label="Close navigation">[ ✕ ]</button>
                </div>
                <div class="drawer-terminal-bar">
                    <span class="drawer-prompt">user@hexdef:~$ tree --nav</span>
                </div>
                <div class="drawer-body">
                    <div class="drawer-group">
                        <span class="drawer-group-label">// MAIN PORTALS</span>
                        <a href="/" class="drawer-link"><span class="drawer-icon">🏠</span> Home</a>
                        
                        <!-- Cybersecurity Accordion -->
                        <div class="drawer-accordion">
                            <button class="drawer-accordion-btn" type="button">
                                <span class="drawer-btn-title"><span class="drawer-icon">🛡️</span> Cybersecurity</span>
                                <span class="accordion-chevron">▾</span>
                            </button>
                            <div class="drawer-accordion-content">
                                <a href="/cybersecurity/">Overview Dashboard</a>
                                <a href="/cybersecurity/cybersecurity_audio/">Audio Tutorials</a>
                                <a href="/cybersecurity/cybersecurity_tools/">Tools &amp; Scripts</a>
                                <a href="/cybersecurity/cybersecurity_certifications/">Certifications</a>
                                <a href="/cybersecurity/cybersecurity_curriculum/">Curriculum</a>
                                <a href="/cybersecurity/cybersecurity_study_modules/">Study Modules</a>
                            </div>
                        </div>

                        <!-- Engineering Accordion -->
                        <div class="drawer-accordion">
                            <button class="drawer-accordion-btn" type="button">
                                <span class="drawer-btn-title"><span class="drawer-icon">⚙️</span> Engineering</span>
                                <span class="accordion-chevron">▾</span>
                            </button>
                            <div class="drawer-accordion-content">
                                <a href="/engineering/">Overview Dashboard</a>
                                <a href="https://hexlean.com" target="_blank" rel="noopener" class="drawer-hexlean-link">⚡ HexLean Platform ↗</a>
                                <a href="/engineering/engineering_audio/">Audio Tutorials</a>
                                <a href="/engineering/engineering_cs/">Computer Science</a>
                                <a href="/engineering/engineering_articles/">Articles &amp; Guides</a>
                                <a href="/engineering/engineering_tools/">Tools &amp; Utilities</a>
                            </div>
                        </div>

                        <!-- Academics Accordion -->
                        <div class="drawer-accordion">
                            <button class="drawer-accordion-btn" type="button">
                                <span class="drawer-btn-title"><span class="drawer-icon">🎓</span> Academics</span>
                                <span class="accordion-chevron">▾</span>
                            </button>
                            <div class="drawer-accordion-content">
                                <a href="/academics/">Overview</a>
                                <a href="/academics/academics_audio/">Audio Tutorials</a>
                                <a href="/academics/academics_curriculum/">Academic Curriculum</a>
                            </div>
                        </div>

                        <a href="/resume/" class="drawer-link"><span class="drawer-icon">📄</span> Resume</a>
                    </div>

                    <!-- Featured HexLean Banner Card -->
                    <div class="drawer-featured-card">
                        <div class="drawer-featured-tag">INTERACTIVE EDUCATION</div>
                        <div class="drawer-featured-title">⚡ HexLean Platform ↗</div>
                        <p class="drawer-featured-desc">In-depth zero-bloat programming textbooks with interactive in-browser sandboxes.</p>
                        <a href="https://hexlean.com" target="_blank" rel="noopener" class="drawer-featured-btn">Launch HexLean ↗</a>
                    </div>

                    <div class="drawer-group">
                        <span class="drawer-group-label">// ACTIONS &amp; PROFILE</span>
                        <a href="https://github.com/shadowpbx" target="_blank" rel="noopener" class="drawer-link">
                            <span class="drawer-icon">🐙</span> GitHub @shadowpbx ↗
                        </a>
                        <button id="drawer-theme-toggle" class="drawer-theme-btn" type="button">
                            <span class="drawer-icon">◐</span>
                            <span class="theme-label">Switch Theme</span>
                        </button>
                    </div>
                </div>
                <div class="drawer-footer">
                    &copy; 2026 // TANVIR HUSSAIN // SYSTEMS & SECURITY
                </div>
            `;
            document.body.appendChild(drawer);
        }

        if (!backdrop) {
            backdrop = document.createElement('div');
            backdrop.id = 'drawer-backdrop';
            backdrop.className = 'drawer-backdrop';
            document.body.appendChild(backdrop);
        }

        // Event listeners
        var closeBtn = drawer.querySelector('#drawer-close-btn');
        if (closeBtn) closeBtn.onclick = closeDrawer;
        backdrop.onclick = closeDrawer;

        var drawerThemeBtn = drawer.querySelector('#drawer-theme-toggle');
        if (drawerThemeBtn) drawerThemeBtn.onclick = toggleTheme;

        // Accordion listeners
        drawer.querySelectorAll('.drawer-accordion-btn').forEach(function(btn) {
            btn.onclick = function() {
                var accordion = btn.closest('.drawer-accordion');
                var isOpen = accordion.classList.contains('open');
                accordion.classList.toggle('open', !isOpen);
            };
        });

        // Update button state in drawer
        var currentTheme = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
        updateThemeButtons(currentTheme);
        handleLocalhost();
    }

    function openDrawer() {
        ensureDrawer();
        var drawer = document.getElementById('hexdef-drawer');
        var backdrop = document.getElementById('drawer-backdrop');
        if (drawer) drawer.classList.add('open');
        if (backdrop) backdrop.classList.add('open');
        document.documentElement.classList.add('drawer-open');
    }

    function closeDrawer() {
        var drawer = document.getElementById('hexdef-drawer');
        var backdrop = document.getElementById('drawer-backdrop');
        if (drawer) drawer.classList.remove('open');
        if (backdrop) backdrop.classList.remove('open');
        document.documentElement.classList.remove('drawer-open');
    }

    // Attach listeners on DOMContentLoaded
    function onReady() {
        handleLocalhost();
        ensureDrawer();

        // Bind all potential toggle buttons (new topbar button or legacy mobile menu button)
        var toggleBtns = document.querySelectorAll('#hexdef-menu-btn, #mobile-menu-btn, .mobile-drawer-toggle');
        toggleBtns.forEach(function(btn) {
            btn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                openDrawer();
            };
        });

        var themeBtns = document.querySelectorAll('#theme-toggle-btn, .theme-toggle-btn');
        themeBtns.forEach(function(btn) {
            btn.onclick = function(e) {
                e.preventDefault();
                toggleTheme();
            };
        });

        // Close on Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeDrawer();
            }
        });

        if (window.location.search.includes('drawer=open') || window.location.hash === '#drawer') {
            openDrawer();
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', onReady);
    } else {
        onReady();
    }

    // Expose API
    window.HexDefNav = {
        openDrawer: openDrawer,
        closeDrawer: closeDrawer,
        toggleTheme: toggleTheme,
        applyTheme: applyTheme
    };
})();
