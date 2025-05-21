class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENES.MAIN_MENU
        });
    }

    create() {
        // Background
        this.createBackground();
        
        // Title
        this.createTitle();
        
        // Menu options
        this.createMenuOptions();
        
        // Version info
        this.add.text(
            10, 
            this.cameras.main.height - 20, 
            'Version 0.1 - Offline Classroom', 
            { 
                fontSize: '12px', 
                fontFamily: 'Arial', 
                color: '#ffffff' 
            }
        );
        
        // Add animation to buttons
        this.animateButtons();
    }
    
    createBackground() {
        // Add a background color with a slight pattern
        const graphics = this.add.graphics();
        graphics.fillGradientStyle(0x3b76d9, 0x3b76d9, 0x6e8eff, 0x6e8eff, 1);
        graphics.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);
        
        // Add some decorative elements
        for (let i = 0; i < 20; i++) {
            const x = Phaser.Math.Between(0, this.cameras.main.width);
            const y = Phaser.Math.Between(0, this.cameras.main.height);
            const size = Phaser.Math.Between(2, 5);
            
            graphics.fillStyle(0xffffff, 0.3);
            graphics.fillCircle(x, y, size);
        }
    }
    
    createTitle() {
        // Game title
        const title = this.add.text(
            this.cameras.main.centerX, 
            this.cameras.main.height * 0.2, 
            'OFFLINE 2D CLASSROOM', 
            { 
                fontSize: '40px', 
                fontFamily: 'Arial', 
                color: '#ffffff',
                fontWeight: 'bold',
                stroke: '#000000',
                strokeThickness: 6
            }
        );
        title.setOrigin(0.5);
        
        // Subtitle
        const subtitle = this.add.text(
            this.cameras.main.centerX, 
            title.y + 50, 
            'Learn Anywhere, Anytime', 
            { 
                fontSize: '20px', 
                fontFamily: 'Arial', 
                color: '#ffffff',
                stroke: '#000000',
                strokeThickness: 3
            }
        );
        subtitle.setOrigin(0.5);
    }
    
    createMenuOptions() {
        const buttonData = [
            { text: 'Start Learning', action: () => this.startGame() },
            { text: 'Options', action: () => this.openOptions() },
            { text: 'Help', action: () => this.openHelp() },
            { text: 'About', action: () => this.openAbout() }
        ];
        
        this.menuButtons = [];
        const buttonStartY = this.cameras.main.height * 0.4;
        const buttonSpacing = 60;
        
        buttonData.forEach((button, index) => {
            // Create button background
            const buttonBg = this.add.rectangle(
                this.cameras.main.centerX,
                buttonStartY + index * buttonSpacing,
                200,
                40,
                UI_BACKGROUND_COLOR,
                UI_BACKGROUND_ALPHA
            );
            buttonBg.setStrokeStyle(2, 0xffffff, 0.8);
            
            // Create button text
            const buttonText = this.add.text(
                buttonBg.x,
                buttonBg.y,
                button.text,
                {
                    fontSize: '18px',
                    fontFamily: 'Arial',
                    color: UI_TEXT_COLOR
                }
            );
            buttonText.setOrigin(0.5);
            
            // Make button interactive
            buttonBg.setInteractive({ useHandCursor: true })
                .on('pointerover', () => {
                    buttonBg.setFillStyle(0x4285f4, 1);
                    buttonText.setScale(1.1);
                })
                .on('pointerout', () => {
                    buttonBg.setFillStyle(UI_BACKGROUND_COLOR, UI_BACKGROUND_ALPHA);
                    buttonText.setScale(1);
                })
                .on('pointerdown', () => {
                    buttonBg.setFillStyle(0x3b76d9, 1);
                })
                .on('pointerup', () => {
                    buttonBg.setFillStyle(0x4285f4, 1);
                    button.action();
                });
                
            this.menuButtons.push({ bg: buttonBg, text: buttonText });
        });
    }
    
    animateButtons() {
        // Animate buttons to slide in from the side
        this.menuButtons.forEach((button, index) => {
            button.bg.x = -200; // Start off screen
            button.text.x = -200;
            
            this.tweens.add({
                targets: [button.bg, button.text],
                x: this.cameras.main.centerX,
                duration: 500,
                ease: 'Back.easeOut',
                delay: 200 + index * 100
            });
        });
    }
    
    startGame() {
        console.log('Starting game...');
        // Transition to the classroom scene
        this.scene.start(SCENES.CLASSROOM);
    }
    
    openOptions() {
        console.log('Opening options...');
        this.showNotImplementedMessage('Options');
    }
    
    openHelp() {
        console.log('Opening help...');
        this.showNotImplementedMessage('Help');
    }
    
    openAbout() {
        console.log('Opening about...');
        this.showNotImplementedMessage('About');
    }
    
    showNotImplementedMessage(feature) {
        // Display a message indicating the feature isn't implemented
        const message = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY + 150,
            `${feature} coming soon!`,
            {
                fontSize: '18px',
                fontFamily: 'Arial',
                color: '#ffffff',
                backgroundColor: '#000000',
                padding: { x: 10, y: 5 }
            }
        );
        message.setOrigin(0.5);
        
        // Make it fade out after a few seconds
        this.tweens.add({
            targets: message,
            alpha: 0,
            duration: 2000,
            delay: 1500,
            onComplete: () => message.destroy()
        });
    }
}