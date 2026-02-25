/* ===== SIDEBAR STATE MANAGEMENT ===== */
const SidebarManager = {
    activeDropdown: null,
    
    closeAllDropdowns() {
        document.querySelectorAll('.dropdown.active').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
        this.activeDropdown = null;
    },
    
    closeAllDropdownsInSidebar() {
        document.querySelectorAll('.sidebar .dropdown.active').forEach(dropdown => {
            dropdown.classList.remove('active');
        });
    },
    
    closeSidebar() {
        const sidebar = document.querySelector('.sidebar');
        const hamburger = document.querySelector('.hamburger');
        const overlay = document.querySelector('.overlay');
        
        if (sidebar) {
            sidebar.classList.remove('open', 'show-sidebar');
        }
        if (hamburger) {
            hamburger.classList.remove('open');
        }
        if (overlay) {
            overlay.classList.remove('show');
        }
    },
    
    openSidebar() {
        const sidebar = document.querySelector('.sidebar');
        const hamburger = document.querySelector('.hamburger');
        const overlay = document.querySelector('.overlay');
        
        if (sidebar) {
            sidebar.classList.add('open', 'show-sidebar');
        }
        if (hamburger) {
            hamburger.classList.add('open');
        }
        if (overlay) {
            overlay.classList.add('show');
        }
    }
};

/* Global toggleSidebar function for HTML onclick handlers */
function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    if (sidebar?.classList.contains('open')) {
        SidebarManager.closeSidebar();
    } else {
        SidebarManager.openSidebar();
    }
}

/* ===== IMPROVED DROPDOWN HANDLING ===== */
document.addEventListener('DOMContentLoaded', function() {
    // Better dropdown functionality for sidebar
    document.querySelectorAll('.sidebar .dropdown').forEach(dropdown => {
        const link = dropdown.querySelector('a');
        
        dropdown.addEventListener('click', function(e) {
            const isDropdownContent = e.target.closest('.dropdown-content');
            
            if (isDropdownContent) {
                // Allow links inside dropdown to work normally
                SidebarManager.closeSidebar();
                return;
            }
            
            e.preventDefault();
            e.stopPropagation();
            
            const isActive = this.classList.contains('active');
            SidebarManager.closeAllDropdownsInSidebar();
            
            if (!isActive) {
                this.classList.add('active');
                SidebarManager.activeDropdown = this;
            }
        });
    });
    
    // Close dropdowns when clicking outside
    document.addEventListener('click', function(e) {
        if (!e.target.closest('.sidebar .dropdown')) {
            SidebarManager.closeAllDropdownsInSidebar();
        }
    });
    
    // Auto-close sidebar when clicking on a link in the sidebar
    document.querySelectorAll('.sidebar a[href]').forEach(link => {
        link.addEventListener('click', function() {
            // Don't close if it's a dropdown toggle
            if (!this.closest('.dropdown > a')) {
                setTimeout(() => SidebarManager.closeSidebar(), 300);
            }
        });
    });
});

/* ===== HAMBURGER NAV TOGGLE (insert on right of header) ===== */
(function(){
    const header = document.querySelector('.mla-header');
    const headerTitle = header?.querySelector('.header-title') || header || document.body;
    const hamburger = document.createElement('button');
    hamburger.className = 'hamburger';
    hamburger.setAttribute('aria-label','Toggle navigation');
    hamburger.innerHTML = '<span class="bar"></span><span class="bar"></span><span class="bar"></span>';

    // Append hamburger on the right side
    headerTitle.appendChild(hamburger);
    hamburger.classList.add('right');
    header.classList.add('has-right-hamburger');

    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);

    // Click handler for hamburger button
    hamburger.addEventListener('click', function(e) {
        e.stopPropagation();
        const sidebar = document.querySelector('.sidebar');
        if (sidebar?.classList.contains('open')) {
            SidebarManager.closeSidebar();
        } else {
            SidebarManager.openSidebar();
        }
    });

    // Click handler for overlay to close sidebar
    overlay.addEventListener('click', function() {
        SidebarManager.closeSidebar();
    });

    // Close sidebar on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            SidebarManager.closeSidebar();
        }
    });

    // Better mobile responsiveness
    let resizeTimeout;
    window.addEventListener('resize', function(){
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            if (window.innerWidth > 900) {
                SidebarManager.closeSidebar();
            }
        }, 250);
    });
})();
