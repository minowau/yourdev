// cursor.js - Complete Futuristic Cursor Implementation
// Add this to your existing .js file or use as a separate cursor.js file

// Your existing code goes here...
// (Place your current JavaScript code above this section)

// Futuristic Cursor Class
class FuturisticCursor {
    constructor() {
        this.cursor = null;
        this.cursorGlow = null;
        this.trails = [];
        this.maxTrails = 15;
        this.mouseX = 0;
        this.mouseY = 0;
        this.cursorX = 0;
        this.cursorY = 0;
        
        this.init();
    }

    init() {
        // Add CSS styles if not already present
        this.addStyles();
        
        // Create cursor elements
        this.createCursor();
        this.createTrails();
        
        // Add event listeners
        document.addEventListener('mousemove', (e) => this.onMouseMove(e));
        document.addEventListener('mouseenter', () => this.showCursor());
        document.addEventListener('mouseleave', () => this.hideCursor());
        document.addEventListener('click', (e) => this.createSparkles(e.clientX, e.clientY));
        
        // Start animation loop
        this.animate();
    }

    addStyles() {
        // Check if styles already exist
        if (document.getElementById('futuristic-cursor-styles')) return;
        
        const style = document.createElement('style');
        style.id = 'futuristic-cursor-styles';
        style.textContent = `
            *, *::before, *::after {
                cursor: none !important;
            }
            
            body, html {
                cursor: none !important;
            }
            
            a, button, input, select, textarea, [role="button"], [onclick] {
                cursor: none !important;
            }
            
            .cursor {
                position: fixed;
                width: 20px;
                height: 20px;
                background: radial-gradient(circle, #00f5ff 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9999;
                mix-blend-mode: screen;
                transform: translate(-50%, -50%);
                transition: transform 0.1s ease;
            }

            .cursor-trail {
                position: fixed;
                width: 6px;
                height: 6px;
                background: #00f5ff;
                border-radius: 50%;
                pointer-events: none;
                z-index: 9998;
                transform: translate(-50%, -50%);
                opacity: 0.8;
            }

            .cursor-glow {
                position: fixed;
                width: 40px;
                height: 40px;
                background: radial-gradient(circle, #00f5ff22 0%, transparent 70%);
                border-radius: 50%;
                pointer-events: none;
                z-index: 9997;
                transform: translate(-50%, -50%);
                transition: all 0.1s ease;
            }
        `;
        document.head.appendChild(style);
    }

    createCursor() {
        // Main cursor
        this.cursor = document.createElement('div');
        this.cursor.className = 'cursor';
        document.body.appendChild(this.cursor);

        // Cursor glow
        this.cursorGlow = document.createElement('div');
        this.cursorGlow.className = 'cursor-glow';
        document.body.appendChild(this.cursorGlow);
    }

    createTrails() {
        for (let i = 0; i < this.maxTrails; i++) {
            const trail = document.createElement('div');
            trail.className = 'cursor-trail';
            trail.style.opacity = (this.maxTrails - i) / this.maxTrails * 0.8;
            trail.style.transform = 'translate(-50%, -50%) scale(' + (1 - i * 0.05) + ')';
            document.body.appendChild(trail);
            
            this.trails.push({
                element: trail,
                x: 0,
                y: 0,
                delay: i * 2
            });
        }
    }

    onMouseMove(e) {
        this.mouseX = e.clientX;
        this.mouseY = e.clientY;
    }

    showCursor() {
        if (this.cursor) this.cursor.style.opacity = '1';
        if (this.cursorGlow) this.cursorGlow.style.opacity = '1';
        this.trails.forEach(trail => {
            trail.element.style.opacity = trail.element.style.opacity || '0.8';
        });
    }

    hideCursor() {
        if (this.cursor) this.cursor.style.opacity = '0';
        if (this.cursorGlow) this.cursorGlow.style.opacity = '0';
        this.trails.forEach(trail => {
            trail.element.style.opacity = '0';
        });
    }

    animate() {
        // Smooth cursor movement
        this.cursorX += (this.mouseX - this.cursorX) * 0.2;
        this.cursorY += (this.mouseY - this.cursorY) * 0.2;

        // Update main cursor position
        if (this.cursor) {
            this.cursor.style.left = this.cursorX + 'px';
            this.cursor.style.top = this.cursorY + 'px';
        }

        // Update glow position (slightly delayed)
        if (this.cursorGlow) {
            const glowX = this.cursorX + (this.mouseX - this.cursorX) * 0.1;
            const glowY = this.cursorY + (this.mouseY - this.cursorY) * 0.1;
            this.cursorGlow.style.left = glowX + 'px';
            this.cursorGlow.style.top = glowY + 'px';
        }

        // Update trail positions
        this.trails.forEach((trail, index) => {
            const delay = (index + 1) * 0.05;
            trail.x += (this.cursorX - trail.x) * (0.2 - delay);
            trail.y += (this.cursorY - trail.y) * (0.2 - delay);
            
            trail.element.style.left = trail.x + 'px';
            trail.element.style.top = trail.y + 'px';
        });

        // Check for hover effects
        this.checkHoverEffects();

        requestAnimationFrame(() => this.animate());
    }

    checkHoverEffects() {
        const hoveredElement = document.elementFromPoint(this.mouseX, this.mouseY);
        
        if (hoveredElement && (
            hoveredElement.tagName === 'A' || 
            hoveredElement.tagName === 'BUTTON' || 
            hoveredElement.classList.contains('clickable') ||
            hoveredElement.style.cursor === 'pointer' ||
            getComputedStyle(hoveredElement).cursor === 'pointer'
        )) {
            
            // Scale up cursor on hover
            if (this.cursor) {
                this.cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                this.cursor.style.background = 'radial-gradient(circle, #ff00ff 0%, transparent 70%)';
            }
            if (this.cursorGlow) {
                this.cursorGlow.style.transform = 'translate(-50%, -50%) scale(1.2)';
                this.cursorGlow.style.background = 'radial-gradient(circle, #ff00ff22 0%, transparent 70%)';
            }
            
            // Change trail color
            this.trails.forEach(trail => {
                trail.element.style.background = '#ff00ff';
            });
        } else {
            // Reset cursor
            if (this.cursor) {
                this.cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                this.cursor.style.background = 'radial-gradient(circle, #00f5ff 0%, transparent 70%)';
            }
            if (this.cursorGlow) {
                this.cursorGlow.style.transform = 'translate(-50%, -50%) scale(1)';
                this.cursorGlow.style.background = 'radial-gradient(circle, #00f5ff22 0%, transparent 70%)';
            }
            
            // Reset trail color
            this.trails.forEach(trail => {
                trail.element.style.background = '#00f5ff';
            });
        }
    }

    createSparkles(x, y) {
        for (let i = 0; i < 6; i++) {
            const sparkle = document.createElement('div');
            sparkle.style.position = 'fixed';
            sparkle.style.left = x + 'px';
            sparkle.style.top = y + 'px';
            sparkle.style.width = '4px';
            sparkle.style.height = '4px';
            sparkle.style.background = '#00f5ff';
            sparkle.style.borderRadius = '50%';
            sparkle.style.pointerEvents = 'none';
            sparkle.style.zIndex = '10000';
            sparkle.style.boxShadow = '0 0 10px #00f5ff';
            
            const angle = (i * 60) * Math.PI / 180;
            const distance = 30 + Math.random() * 20;
            const finalX = x + Math.cos(angle) * distance;
            const finalY = y + Math.sin(angle) * distance;
            
            document.body.appendChild(sparkle);
            
            sparkle.animate([
                { 
                    transform: 'translate(-50%, -50%) scale(1)', 
                    opacity: 1,
                    left: x + 'px',
                    top: y + 'px'
                },
                { 
                    transform: 'translate(-50%, -50%) scale(0)', 
                    opacity: 0,
                    left: finalX + 'px',
                    top: finalY + 'px'
                }
            ], {
                duration: 600,
                easing: 'ease-out'
            }).onfinish = () => sparkle.remove();
        }
    }

    // Method to destroy cursor (useful for cleanup)
    destroy() {
        if (this.cursor) this.cursor.remove();
        if (this.cursorGlow) this.cursorGlow.remove();
        this.trails.forEach(trail => trail.element.remove());
        
        // Remove styles
        const styleElement = document.getElementById('futuristic-cursor-styles');
        if (styleElement) styleElement.remove();
        
        // Restore default cursor
        document.body.style.cursor = 'auto';
    }
}

// Initialize when page loads
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCursor);
} else {
    initCursor();
}

function initCursor() {
    // Create global reference for potential cleanup
    window.futuristicCursor = new FuturisticCursor();
}

// Optional: Export for module use (uncomment if using ES6 modules)
// export { FuturisticCursor };