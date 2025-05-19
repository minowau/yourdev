class BootScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENES.BOOT
        });
    }

    preload() {
        // Load minimal assets needed for the loading screen
        this.load.image('logo', 'assets/images/ui/logo.png');
        this.load.image('button', 'assets/images/ui/button.png');
        
        // Update loading progress
        this.load.on('progress', (value) => {
            document.getElementById('loading-progress').textContent = Math.round(value * 100) + '%';
        });
        
        this.load.on('complete', () => {
            // Loading complete
            this.setupLogoAnimation();
        });
    }

    create() {
        // Set up any animations or game settings
        this.setupLogoAnimation();
        
        // Hide the HTML loading screen once we're in Phaser
        document.getElementById('loading-screen').classList.add('hidden');
        
        // Go to the main menu
        this.scene.start(SCENES.MAIN_MENU);
    }
    
    setupLogoAnimation() {
        // If we have assets loaded, create a simple animation
        if (this.textures.exists('logo')) {
            const logo = this.add.image(this.cameras.main.centerX, this.cameras.main.centerY - 50, 'logo');
            logo.setScale(0.5);
            
            this.tweens.add({
                targets: logo,
                y: logo.y - 20,
                duration: 1000,
                ease: 'Sine.easeInOut',
                yoyo: true,
                repeat: -1
            });
            
            const text = this.add.text(
                this.cameras.main.centerX, 
                this.cameras.main.centerY + 100, 
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
        }
    }
}