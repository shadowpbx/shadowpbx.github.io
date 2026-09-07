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

    // Attach listeners on DOMContentLoaded
    function onReady() {
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
