class Booting extends Phaser.Scene {
    constructor() {
        super({
            key: SCENES.BOOT
        });
    }

preload() {
    // Skip asset loading for now and go straight to create
    // Remove the problematic image loading
    
    // Update loading progress to 100%
    const progressElement = document.getElementById('loading-progress');
    if (progressElement) {
        progressElement.textContent = '100%';
    }
    
    // Immediately trigger the complete event
    this.load.emit('complete');
}

    create() {
        // Set up any animations or game settings
        this.setupLogoAnimation();
        
        // Hide the HTML loading screen once we're in Phaser
        const loadingScreen = document.getElementById('loading-screen');
        if (loadingScreen) {
            loadingScreen.classList.add('hidden');
        }
        
        // Wait a moment then go to the main menu
        this.time.delayedCall(1000, () => {
            this.scene.start(SCENES.MAIN_MENU);
        });
    }
    
    setupLogoAnimation() {
        // Create a simple logo using graphics since we don't have image assets
        const graphics = this.add.graphics();
        graphics.fillStyle(0x4285f4);
        graphics.fillRect(this.cameras.main.centerX - 50, this.cameras.main.centerY - 100, 100, 50);
        
        const text = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.centerY - 50, 
            'Offline 2D Classroom', 
            { 
                fontSize: '32px', 
                fontFamily: 'Arial', 
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 4
            }
        );
        text.setOrigin(0.5);
        
        // Simple fade-in animation
        graphics.setAlpha(0);
        text.setAlpha(0);
        
        this.tweens.add({
            targets: [graphics, text],
            alpha: 1,
            duration: 1000,
            ease: 'Power2'
        });
    }
}