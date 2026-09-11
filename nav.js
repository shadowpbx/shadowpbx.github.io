// HexDef Global Navigation & Drawer Architecture
// Curated by Tanvir Hussain // Systems & Security

(function() {
    'use strict';

    // 1. Safe LocalStorage Helpers
    function getStoredTheme() {
        try {
            return localStorage.getItem('hexdef_theme');
        } catch (e) {
            return null;
        }
    }

    function setStoredTheme(theme) {
        try {
            localStorage.setItem('hexdef_theme', theme);
        } catch (e) {}
    }

    // 2. Theme Management
    function getPreferredTheme() {
        var stored = getStoredTheme();
        if (stored === 'dark' || stored === 'light') {
            return stored;
        }
        if (window.location.search.includes('theme=dark')) return 'dark';
        if (window.location.search.includes('theme=light')) return 'light';
        return (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light';
    }

    function applyTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        setStoredTheme(theme);
        updateThemeButtons(theme);
    }

    function toggleTheme() {
        var current = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
        var next = (current === 'dark') ? 'light' : 'dark';
        applyTheme(next);
    }

    function updateThemeButtons(theme) {
        var isDark = (theme === 'dark');

        // 1. Settings Popover Theme Option Buttons
        var popoverThemeBtns = document.querySelectorAll('.theme-opt-btn');
        popoverThemeBtns.forEach(function(btn) {
            var btnTheme = btn.getAttribute('data-set-theme');
            if (btnTheme === theme) {
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
            } else {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            }
        });

        // 2. Drawer Theme Toggle
        var drawerToggle = document.getElementById('drawer-theme-toggle');
        if (drawerToggle) {
            var icon = drawerToggle.querySelector('.drawer-theme-icon');
            var pill = drawerToggle.querySelector('.theme-status-pill');
            if (icon) icon.textContent = isDark ? '☀️' : '🌙';
            if (pill) {
                pill.textContent = isDark ? 'ON' : 'OFF';
                if (isDark) {
                    pill.classList.add('active');
                } else {
                    pill.classList.remove('active');
                }
            }
        }

        // 3. Fallback / Legacy Topbar Theme Toggle Buttons
        var btns = document.querySelectorAll('.theme-toggle-btn, #theme-toggle-btn');
        btns.forEach(function(btn) {
            btn.textContent = isDark ? '[ ☀️ ]' : '[ 🌙 ]';
            btn.title = isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode';
        });
    }

    // Run theme initialization immediately to eliminate flash
    var initialTheme = getPreferredTheme();
    document.documentElement.setAttribute('data-theme', initialTheme);

    // 3. Localhost URL rewrite for HexLean
    function handleLocalhost() {
        if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
            document.querySelectorAll('a[href="https://hexlean.com"]').forEach(function(el) {
                el.href = 'http://localhost:8080';
            });
        }
    }

    var BRAND_SVG_HTML = '<svg class="topbar-brand-svg" width="22" height="22" viewBox="0 0 128 128" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"><path d="M63 12 L20 28 L20 70 C20 95 44 112 63 118 Z" fill="#0d9488"/><path d="M65 12 L108 28 L108 70 C108 95 84 112 65 118 Z" fill="#10b981"/><path d="M63 12 L20 28 L63 42 Z" fill="#042f2e" fill-opacity="0.35"/><path d="M65 12 L108 28 L65 42 Z" fill="#34d399" fill-opacity="0.35"/><line x1="64" y1="12" x2="64" y2="118" stroke="#34d399" stroke-width="1.2" stroke-linecap="round"/></svg>';

    // 4. Mobile Left Drawer Manager
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
                    <a href="/" class="drawer-brand" title="HexDef Home">
                        <span class="drawer-brand-icon" aria-label="HexDef Shield Logo">${BRAND_SVG_HTML}</span>
                        <div class="drawer-brand-info">
                            <span class="drawer-brand-text">HexDef</span>
                            <span class="drawer-brand-sub">Systems & Security</span>
                        </div>
                    </a>
                    <button id="drawer-close-btn" class="drawer-close-btn" aria-label="Close navigation">[ ✕ ]</button>
                </div>
                <div class="drawer-body">
                    <div class="drawer-group">
                        <span class="drawer-group-label">// MAIN PORTALS</span>
                        
                        <!-- Cybersecurity Accordion -->
                        <div class="drawer-accordion">
                            <button class="drawer-accordion-btn" type="button">
                                <span class="drawer-btn-title"><span class="drawer-icon" style="display:inline-flex;align-items:center;justify-content:center;"><svg width="15" height="15" viewBox="0 0 128 128" aria-hidden="true"><path fill="#B0BEC5" d="M16.77,19.75c-1,0-1.7,0.8-1.7,1.8v0.1c-1.5,25.91,3.03,59.27,24.01,83.52c12.1,14.7,23.91,18.53,24.51,18.73c0,0,0.28,0.09,0.54,0.09s0.57-0.1,0.57-0.1c0.5-0.2,12.48-4.02,24.49-18.72c19.91-24.21,24.01-58.82,24.01-83.52v-0.1c0-1-0.8-1.8-1.7-1.8c-0.3,0-29.11-1-46.01-15.3l0,0c-0.7-0.6-1.7-0.6-2.4,0C45.98,18.65,17.07,19.65,16.77,19.75z"/><path fill="#84B0C1" d="M111.49,19.75c-0.3,0-29.11-1-46.01-15.3C65.08,4.1,64.65,4,64.24,4c-0.03,0-0.07,0-0.11,0v120c0.27-0.01,0.62-0.11,0.62-0.12c0.6-0.25,12.44-4,24.44-18.7c19.91-24.21,24.01-58.82,24.01-83.52v-0.1C113.2,20.55,112.4,19.75,111.49,19.75z"/><path fill="#2F7889" d="M26.33,28.31c-0.82,0-1.02,1.02-1.02,1.74v0.1c0,19.72,3.06,47.4,19,66.71c9.6,11.75,19,14.81,19.41,14.91l0.41,0.1l0.41-0.1c0.41-0.1,9.81-3.17,19.41-14.91c15.94-19.31,19-46.89,19-66.71v-0.1c0-0.82-0.41-1.43-1.23-1.43h0.1c-0.2,0-23.19-0.82-36.67-12.16l0,0c-1.19-0.98-1.94-0.2-1.94-0.2C49.63,27.6,26.64,28.31,26.33,28.31L26.33,28.31z"/><path fill="#C9E3E6" d="M29.18,30.07c-0.76,0-0.94,0.96-0.94,1.64v0.1c0,18.57,2.83,44.65,17.57,62.84c8.88,11.07,17.57,13.95,17.95,14.05l0.38,0.1l0.38-0.1c0.38-0.1,9.07-2.98,17.95-14.05c14.73-18.19,17.57-44.17,17.57-62.84v-0.1c0-0.77-0.38-1.35-1.13-1.35h0.09c-0.19,0-21.44-0.77-33.91-11.45l0,0c-0.94-0.95-1.79-0.19-1.79-0.19C50.72,29.4,29.47,30.07,29.18,30.07L29.18,30.07z"/><path fill="#B0BEC5" d="M98.89,30.36h0.09c-0.19,0-21.44-0.77-33.91-11.45c-0.34-0.34-0.66-0.46-0.94-0.47v90.35l0.38-0.1c0.38-0.1,9.07-2.98,17.95-14.05c14.73-18.19,17.57-44.17,17.57-62.84v-0.1C100.02,30.94,99.65,30.36,98.89,30.36z"/></svg></span> Cybersecurity</span>
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

                    <div class="drawer-group">
                        <span class="drawer-group-label">// ACTIONS &amp; PREFERENCES</span>
                        <a href="https://github.com/shadowpbx" target="_blank" rel="noopener" class="drawer-link">
                            <span class="drawer-icon">🐙</span> GitHub @shadowpbx ↗
                        </a>
                        <button id="drawer-theme-toggle" class="drawer-theme-btn" type="button" aria-label="Toggle dark mode">
                            <span class="drawer-theme-btn-left">
                                <span class="drawer-theme-icon">🌙</span>
                                <span class="theme-label">Dark Theme</span>
                            </span>
                            <span class="theme-status-pill">OFF</span>
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
        if (drawerThemeBtn) {
            drawerThemeBtn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleTheme();
            };
        }

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

    // 5. Settings Popover Manager
    function ensureSettings() {
        var popover = document.getElementById('settings-popover');
        if (!popover) {
            popover = document.createElement('div');
            popover.id = 'settings-popover';
            popover.className = 'settings-popover';
            popover.setAttribute('role', 'dialog');
            popover.setAttribute('aria-label', 'System Preferences');
            popover.innerHTML = `
                <div class="popover-header">
                    <span class="popover-title">// PREFERENCES</span>
                    <button id="popover-close-btn" class="popover-close-btn" aria-label="Close Settings">✕</button>
                </div>
                <div class="popover-group">
                    <div class="popover-label">Theme Mode</div>
                    <div class="theme-options">
                        <button class="theme-opt-btn" data-set-theme="light" type="button">☀️ Light</button>
                        <button class="theme-opt-btn" data-set-theme="dark" type="button">🌙 Dark</button>
                    </div>
                </div>
                <div class="popover-footer">
                    HexDef Systems &amp; Architecture
                </div>
            `;
            document.body.appendChild(popover);
        }

        // Wire popover close button
        var closeBtn = popover.querySelector('#popover-close-btn');
        if (closeBtn) {
            closeBtn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleSettings(false);
            };
        }

        // Wire theme option buttons inside popover
        popover.querySelectorAll('.theme-opt-btn').forEach(function(opt) {
            opt.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                var targetTheme = opt.getAttribute('data-set-theme');
                if (targetTheme) {
                    applyTheme(targetTheme);
                }
            };
        });

        // Prevent clicks inside popover from closing itself
        popover.onclick = function(e) {
            e.stopPropagation();
        };

        var currentTheme = document.documentElement.getAttribute('data-theme') || getPreferredTheme();
        updateThemeButtons(currentTheme);
    }

    function toggleSettings(open) {
        ensureSettings();
        var popover = document.getElementById('settings-popover');
        var btn = document.getElementById('settings-btn');
        if (!popover) return;
        var willOpen = (typeof open === 'boolean') ? open : !popover.classList.contains('open');
        if (willOpen) {
            closeDrawer();
        }
        popover.classList.toggle('open', willOpen);
        if (btn) {
            btn.classList.toggle('active', willOpen);
            btn.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
        }
    }

    function openDrawer() {
        toggleSettings(false);
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

    // 6. Dynamic Active Link Highlighting
    function highlightActiveNavLink() {
        var path = (window.location.pathname || '/').toLowerCase();
        var links = document.querySelectorAll('.topbar-nav .nav-link');
        links.forEach(function(link) {
            var href = (link.getAttribute('href') || '').toLowerCase();
            if (!href) return;
            if (href !== '/' && path.startsWith(href)) {
                link.classList.add('active');
            } else if (href === '/' && (path === '/' || path === '/index.html')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    }

    // 7. HexLean Topbar Persistent Pill Manager
    function ensureHexLeanTopbar() {
        var topbarRight = document.querySelector('.topbar-right');
        if (topbarRight && !topbarRight.querySelector('.topbar-hexlean-pill')) {
            var pill = document.createElement('a');
            pill.href = 'https://hexlean.com';
            pill.className = 'topbar-hexlean-pill';
            pill.target = '_blank';
            pill.rel = 'noopener';
            pill.title = 'HexLean — Interactive Technical Education by Tanvir Hussain';
            pill.innerHTML = `
                <svg class="hexlean-bolt-icon" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
                </svg>
                <span class="hexlean-pill-label">HexLean</span>
                <svg class="hexlean-ext-arrow" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                    <line x1="7" y1="17" x2="17" y2="7"></line>
                    <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
            `;
            var settingsBtn = topbarRight.querySelector('#settings-btn, .topbar-settings-btn');
            if (settingsBtn) {
                topbarRight.insertBefore(pill, settingsBtn);
            } else {
                topbarRight.appendChild(pill);
            }
        }

        // Clean redundant HexLean links from topbar-nav (desktop) and dropdowns
        document.querySelectorAll('.topbar-nav .nav-link-hexlean').forEach(function(el) {
            el.remove();
        });
        document.querySelectorAll('.dropdown-menu .hexlean-dropdown-link').forEach(function(el) {
            el.remove();
        });
    }

    // 8. Brand Vector SVG Manager (ensures 100% uniform rendering across iOS and Desktop)
    function ensureBrandSvg() {
        document.querySelectorAll('.topbar-brand-icon, .drawer-brand-icon').forEach(function(el) {
            el.innerHTML = BRAND_SVG_HTML;
            el.setAttribute('aria-label', 'HexDef Shield Logo');
        });
    }

    // 9. Favicon Manager (Forces Chrome to invalidate stale cached favicons)
    function ensureFavicon() {
        var existingIcons = document.querySelectorAll('link[rel*="icon"]');
        if (existingIcons.length === 0) {
            var link = document.createElement('link');
            link.rel = 'icon';
            link.type = 'image/svg+xml';
            link.href = '/assets/shield.svg?v=2';
            document.head.appendChild(link);
            
            var pngLink = document.createElement('link');
            pngLink.rel = 'icon';
            pngLink.type = 'image/png';
            pngLink.sizes = '32x32';
            pngLink.href = '/assets/favicon-32x32.png?v=2';
            document.head.appendChild(pngLink);
        } else {
            existingIcons.forEach(function(el) {
                if (el.href && !el.href.includes('?v=')) {
                    el.href = el.href + '?v=2';
                }
            });
        }
    }

    // Attach listeners on DOMContentLoaded
    function onReady() {
        ensureBrandSvg();
        ensureFavicon();
        ensureHexLeanTopbar();
        handleLocalhost();
        ensureDrawer();
        ensureSettings();
        highlightActiveNavLink();

        // Bind all potential toggle buttons (new topbar button or legacy mobile menu button)
        var toggleBtns = document.querySelectorAll('#hexdef-menu-btn, #mobile-menu-btn, .mobile-drawer-toggle');
        toggleBtns.forEach(function(btn) {
            btn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                openDrawer();
            };
        });

        // Bind Settings Button(s)
        var settingsBtns = document.querySelectorAll('#settings-btn, .topbar-settings-btn');
        settingsBtns.forEach(function(btn) {
            btn.onclick = function(e) {
                e.preventDefault();
                e.stopPropagation();
                toggleSettings();
            };
        });

        // Close Popover when clicking or tapping outside
        function handleOutsideSettingsClick(e) {
            var popover = document.getElementById('settings-popover');
            var settingsBtn = document.getElementById('settings-btn');
            if (popover && popover.classList.contains('open')) {
                if (!popover.contains(e.target) && (!settingsBtn || !settingsBtn.contains(e.target))) {
                    toggleSettings(false);
                }
            }
        }
        document.addEventListener('click', handleOutsideSettingsClick);
        document.addEventListener('touchend', handleOutsideSettingsClick, { passive: true });

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
                toggleSettings(false);
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
        applyTheme: applyTheme,
        toggleSettings: toggleSettings
    };
})();
