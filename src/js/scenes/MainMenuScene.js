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
            'Version 1 - Offline Classroom', 
            { 
                fontSize: '12px', 
                fontFamily: 'Arial', 
                color: '#ffffff' 
            }
        );
        
        // Add animation to buttons
        this.animateButtons();
        
        // Start wall animations
        this.animateWalls();
    }
    
    createBackground() {
        // Modern gradient background
        const graphics = this.add.graphics();
        graphics.fillGradientStyle(0x1a1a2e, 0x16213e, 0x0f3460, 0x533483, 1);
        graphics.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);
        
        // Create 3D modern walls
        this.create3DWalls();
        
        // Add modern lighting effects
        this.createModernLighting();
        
        // Add floating geometric particles
        this.createGeometricParticles();
    }
    
    create3DWalls() {
        this.wallElements = [];
        
        // Left wall panels
        this.createMoving3DPanel(20, 100, 60, 200, 0x2c3e50, 0x34495e, 'vertical');
        this.createMoving3DPanel(20, 320, 60, 180, 0x2c3e50, 0x34495e, 'vertical');
        
        // Right wall panels
        this.createMoving3DPanel(this.cameras.main.width - 80, 80, 60, 220, 0x2c3e50, 0x34495e, 'vertical');
        this.createMoving3DPanel(this.cameras.main.width - 80, 340, 60, 160, 0x2c3e50, 0x34495e, 'vertical');
        
        // Top wall panels
        this.createMoving3DPanel(150, 20, 180, 60, 0x34495e, 0x3498db, 'horizontal');
        this.createMoving3DPanel(380, 20, 200, 60, 0x34495e, 0x3498db, 'horizontal');
        this.createMoving3DPanel(620, 20, 150, 60, 0x34495e, 0x3498db, 'horizontal');
        
        // Bottom wall panels
        this.createMoving3DPanel(120, this.cameras.main.height - 80, 200, 60, 0x34495e, 0x3498db, 'horizontal');
        this.createMoving3DPanel(360, this.cameras.main.height - 80, 180, 60, 0x34495e, 0x3498db, 'horizontal');
        this.createMoving3DPanel(580, this.cameras.main.height - 80, 160, 60, 0x34495e, 0x3498db, 'horizontal');
        
        // Central architectural elements
        this.createCentralArchitecture();
    }
    
    createMoving3DPanel(x, y, width, height, baseColor, lightColor, direction) {
        const panel = this.add.container(x, y);
        
        // Base panel
        const base = this.add.rectangle(0, 0, width, height, baseColor);
        
        // 3D depth effect - right side
        const rightSide = this.add.polygon(0, 0, [
            width/2, -height/2,
            width/2 + 10, -height/2 - 8,
            width/2 + 10, height/2 - 8,
            width/2, height/2
        ], 0x1a252f);
        
        // 3D depth effect - top side
        const topSide = this.add.polygon(0, 0, [
            -width/2, -height/2,
            -width/2 + 10, -height/2 - 8,
            width/2 + 10, -height/2 - 8,
            width/2, -height/2
        ], lightColor);
        
        // Modern accent lines
        const accentLine1 = this.add.rectangle(-width/4, 0, 2, height * 0.8, 0x3498db);
        const accentLine2 = this.add.rectangle(width/4, 0, 2, height * 0.8, 0x2ecc71);
        
        // LED strip effect
        const ledStrip = this.add.rectangle(0, height/2 - 2, width * 0.9, 4, 0x00ff88, 0.6);
        
        panel.add([base, rightSide, topSide, accentLine1, accentLine2, ledStrip]);
        
        // Store for animation
        this.wallElements.push({
            container: panel,
            baseX: x,
            baseY: y,
            direction: direction,
            ledStrip: ledStrip
        });
        
        // LED pulsing effect
        this.tweens.add({
            targets: ledStrip,
            alpha: { from: 0.3, to: 0.9 },
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }
    
    createCentralArchitecture() {
        // Modern central pillar structures
        const centerX = this.cameras.main.centerX;
        const centerY = this.cameras.main.centerY;
        
        // Left pillar
        this.createModernPillar(centerX - 250, centerY, 40, 300);
        
        // Right pillar  
        this.createModernPillar(centerX + 250, centerY, 40, 300);
        
        // Architectural beam across top
        this.createArchitecturalBeam(centerX, 150, 400, 20);
    }
    
    createModernPillar(x, y, width, height) {
        const pillar = this.add.container(x, y);
        
        // Main pillar body
        const body = this.add.rectangle(0, 0, width, height, 0x2c3e50);
        
        // 3D effect
        const rightFace = this.add.polygon(0, 0, [
            width/2, -height/2,
            width/2 + 8, -height/2 - 6,
            width/2 + 8, height/2 - 6,
            width/2, height/2
        ], 0x1a252f);
        
        const topFace = this.add.polygon(0, 0, [
            -width/2, -height/2,
            -width/2 + 8, -height/2 - 6,
            width/2 + 8, -height/2 - 6,
            width/2, -height/2
        ], 0x34495e);
        
        // Modern details
        const verticalAccent = this.add.rectangle(0, 0, 4, height * 0.9, 0x3498db);
        const topCap = this.add.rectangle(0, -height/2 - 5, width + 10, 10, 0x2ecc71);
        const bottomCap = this.add.rectangle(0, height/2 + 5, width + 10, 10, 0x2ecc71);
        
        pillar.add([body, rightFace, topFace, verticalAccent, topCap, bottomCap]);
        
        this.wallElements.push({
            container: pillar,
            baseX: x,
            baseY: y,
            direction: 'float'
        });
    }
    
    createArchitecturalBeam(x, y, width, height) {
        const beam = this.add.container(x, y);
        
        // Main beam
        const body = this.add.rectangle(0, 0, width, height, 0x34495e);
        
        // 3D depth
        const bottomFace = this.add.polygon(0, 0, [
            -width/2, height/2,
            -width/2 + 6, height/2 + 4,
            width/2 + 6, height/2 + 4,
            width/2, height/2
        ], 0x2c3e50);
        
        const rightFace = this.add.polygon(0, 0, [
            width/2, -height/2,
            width/2 + 6, -height/2 + 4,
            width/2 + 6, height/2 + 4,
            width/2, height/2
        ], 0x1a252f);
        
        // Modern accent
        const centerLine = this.add.rectangle(0, 0, width * 0.95, 2, 0x3498db);
        
        beam.add([body, bottomFace, rightFace, centerLine]);
        
        this.wallElements.push({
            container: beam,
            baseX: x,
            baseY: y,
            direction: 'horizontal'
        });
    }
    
    createModernLighting() {
        // Add modern ambient lighting effects
        const lightSources = [
            { x: 100, y: 100, color: 0x3498db },
            { x: this.cameras.main.width - 100, y: 100, color: 0x2ecc71 },
            { x: this.cameras.main.centerX, y: this.cameras.main.height - 100, color: 0xe74c3c }
        ];
        
        lightSources.forEach(light => {
            const lightGlow = this.add.circle(light.x, light.y, 80, light.color, 0.1);
            lightGlow.setBlendMode(Phaser.BlendModes.ADD);
            
            this.tweens.add({
                targets: lightGlow,
                alpha: { from: 0.05, to: 0.15 },
                scale: { from: 0.8, to: 1.2 },
                duration: 3000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        });
    }
    
    createGeometricParticles() {
        for (let i = 0; i < 12; i++) {
            const x = Phaser.Math.Between(150, this.cameras.main.width - 150);
            const y = Phaser.Math.Between(150, this.cameras.main.height - 150);
            
            // Create different geometric shapes
            const shapes = ['circle', 'triangle', 'square', 'diamond'];
            const shape = Phaser.Utils.Array.GetRandom(shapes);
            const color = Phaser.Utils.Array.GetRandom([0x3498db, 0x2ecc71, 0xe74c3c, 0xf39c12]);
            
            let particle;
            if (shape === 'circle') {
                particle = this.add.circle(x, y, 3, color, 0.6);
            } else if (shape === 'triangle') {
                particle = this.add.triangle(x, y, 0, -6, -5, 4, 5, 4, color, 0.6);
            } else if (shape === 'square') {
                particle = this.add.rectangle(x, y, 6, 6, color, 0.6);
            } else {
                particle = this.add.polygon(x, y, [0, -4, 4, 0, 0, 4, -4, 0], color, 0.6);
            }
            
            // Floating animation
            this.tweens.add({
                targets: particle,
                y: y - 40,
                x: x + Phaser.Math.Between(-20, 20),
                rotation: Math.PI * 2,
                alpha: 0,
                duration: Phaser.Math.Between(5000, 8000),
                delay: Phaser.Math.Between(0, 3000),
                repeat: -1,
                onRepeat: () => {
                    particle.y = this.cameras.main.height + 20;
                    particle.x = Phaser.Math.Between(150, this.cameras.main.width - 150);
                    particle.alpha = 0.6;
                }
            });
        }
    }
    
    animateWalls() {
        this.wallElements.forEach((element, index) => {
            const delay = index * 200;
            
            if (element.direction === 'vertical') {
                // Vertical sliding motion
                this.tweens.add({
                    targets: element.container,
                    y: element.baseY + 15,
                    duration: 2000,
                    delay: delay,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'
                });
            } else if (element.direction === 'horizontal') {
                // Horizontal sliding motion
                this.tweens.add({
                    targets: element.container,
                    x: element.baseX + 20,
                    duration: 2500,
                    delay: delay,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'
                });
            } else if (element.direction === 'float') {
                // Floating motion for pillars
                this.tweens.add({
                    targets: element.container,
                    y: element.baseY - 10,
                    x: element.baseX + 5,
                    duration: 3000,
                    delay: delay,
                    yoyo: true,
                    repeat: -1,
                    ease: 'Sine.easeInOut'
                });
            }
        });
    }
    
    createTitle() {
        // Modern title
        const title = this.add.text(
            this.cameras.main.centerX, 
            200, 
            'OffSiksha', 
            { 
                fontSize: '52px', 
                fontFamily: 'Arial', 
                color: '#ffffff',
                fontWeight: '300', // Light modern font weight
                stroke: '#3498db',
                strokeThickness: 2
            }
        );
        title.setOrigin(0.5);
        
        // Modern glow effect
        const titleGlow = this.add.text(
            this.cameras.main.centerX, 
            200, 
            'OffSiksha', 
            { 
                fontSize: '52px', 
                fontFamily: 'Arial', 
                color: '#3498db',
                fontWeight: '300'
            }
        );
        titleGlow.setOrigin(0.5);
        titleGlow.setAlpha(0.3);
        titleGlow.setBlendMode(Phaser.BlendModes.ADD);
        titleGlow.setDepth(-1);
        
        // Modern subtitle
        const subtitle = this.add.text(
            this.cameras.main.centerX, 
            245, 
            '• Learn Anywhere • Modern Education •', 
            { 
                fontSize: '16px', 
                fontFamily: 'Arial', 
                color: '#bdc3c7',
                fontWeight: '300'
            }
        );
        subtitle.setOrigin(0.5);
        
        // Subtle pulsing
        this.tweens.add({
            targets: [titleGlow],
            alpha: { from: 0.2, to: 0.5 },
            duration: 2500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }
    
    createMenuOptions() {
        const buttonData = [
            { text: '▶ Start Learning', action: () => this.startGame() },
            { text: '⚙ Settings', action: () => this.openOptions() },  
            { text: '? Help', action: () => this.openHelp() },
            { text: 'ⓘ About', action: () => this.openAbout() }
        ];
        
        this.menuButtons = [];
        const buttonStartY = 320;
        const buttonSpacing = 65;
        
        buttonData.forEach((button, index) => {
            const buttonY = buttonStartY + index * buttonSpacing;
            
            // Modern glass-style button
            const buttonBg = this.add.rectangle(
                this.cameras.main.centerX,
                buttonY,
                280,
                45,
                0x2c3e50,
                0.8
            );
            
            // Modern border with glow
            const buttonBorder = this.add.rectangle(
                buttonBg.x,
                buttonBg.y,
                buttonBg.width + 2,
                buttonBg.height + 2,
                0x3498db,
                0.6
            );
            buttonBorder.setDepth(-1);
            
            // Inner highlight
            const buttonHighlight = this.add.rectangle(
                buttonBg.x,
                buttonBg.y - buttonBg.height/2 + 2,
                buttonBg.width - 4,
                2,
                0xffffff,
                0.3
            );
            
            // Modern button text
            const buttonText = this.add.text(
                buttonBg.x,
                buttonBg.y,
                button.text,
                {
                    fontSize: '16px',
                    fontFamily: 'Arial',
                    color: '#ffffff',
                    fontWeight: '300'
                }
            );
            buttonText.setOrigin(0.5);
            
            // Modern hover effects
            buttonBg.setInteractive({ useHandCursor: true })
                .on('pointerover', () => {
                    buttonBg.setFillStyle(0x34495e, 0.9);
                    buttonBorder.setFillStyle(0x2ecc71, 0.8);
                    buttonText.setScale(1.05);
                    buttonText.setColor('#2ecc71');
                })
                .on('pointerout', () => {
                    buttonBg.setFillStyle(0x2c3e50, 0.8);
                    buttonBorder.setFillStyle(0x3498db, 0.6);
                    buttonText.setScale(1);
                    buttonText.setColor('#ffffff');
                })
                .on('pointerdown', () => {
                    buttonBg.setFillStyle(0x1a252f, 0.9);
                    buttonBg.setScale(0.98);
                    buttonText.setScale(0.98);
                })
                .on('pointerup', () => {
                    buttonBg.setFillStyle(0x34495e, 0.9);
                    buttonBg.setScale(1);
                    buttonText.setScale(1.05);
                    button.action();
                });
                
            this.menuButtons.push({ 
                bg: buttonBg, 
                text: buttonText, 
                border: buttonBorder,
                highlight: buttonHighlight
            });
        });
    }
    
    animateButtons() {
        this.menuButtons.forEach((button, index) => {
            // Modern slide-in animation
            button.bg.x = this.cameras.main.width + 150;
            button.text.x = this.cameras.main.width + 150;
            button.border.x = this.cameras.main.width + 150;
            button.highlight.x = this.cameras.main.width + 150;
            
            this.tweens.add({
                targets: [button.bg, button.text, button.border, button.highlight],
                x: this.cameras.main.centerX,
                duration: 800,
                ease: 'Back.easeOut',
                delay: 600 + index * 150
            });
        });
    }
    
    startGame() {
        console.log('Starting game...');
        this.scene.start(SCENES.CLASSROOM);
    }
    
    openOptions() {
        console.log('Opening options...');
        this.showNotImplementedMessage('Settings');
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
        const messageBg = this.add.rectangle(
            this.cameras.main.centerX,
            this.cameras.main.centerY + 150,
            250,
            60,
            0x2c3e50,
            0.95
        );
        
        const messageBorder = this.add.rectangle(
            messageBg.x,
            messageBg.y,
            messageBg.width + 2,
            messageBg.height + 2,
            0x3498db,
            0.8
        );
        messageBorder.setDepth(-1);
        
        const message = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY + 150,
            `${feature} coming soon!\n⚡ In Development ⚡`,
            {
                fontSize: '14px',
                fontFamily: 'Arial',
                color: '#ffffff',
                align: 'center',
                fontWeight: '300'
            }
        );
        message.setOrigin(0.5);
        
        this.tweens.add({
            targets: [message, messageBg, messageBorder],
            alpha: 0,
            duration: 2500,
            delay: 2000,
            onComplete: () => {
                message.destroy();
                messageBg.destroy();
                messageBorder.destroy();
            }
        });
    }
}