class ClassroomScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENES.CLASSROOM
        });
        this.player = null;
        this.cursors = null;
        this.wasd = null;
        this.doors = null;
        this.currentRoom = 'main_corridor';
        this.tutorialShown = false;
        this.roomTexts = {};
        this.interactionPrompts = {};
        
        // Space theme color palette to match the provided image
        this.SPACE_COLORS = {
            BACKGROUND: 0x1a1f3a,        // Dark blue space background
            CORRIDOR: 0x252a4a,          // Slightly lighter corridor background
            FLOOR: 0x2d3354,             // Floor color
            WALL: 0x3c4567,              // Wall color (lighter than floor)
            DOOR: 0x4ade80,              // Bright green doors
            PLAYER: 0x60a5fa,            // Blue player
            TEXT_PRIMARY: '#ffffff',      // White text
            TEXT_SECONDARY: '#94a3b8',    // Gray text
            UI_PANEL: 0x334155,          // Dark panel background
            BUTTON_PRIMARY: 0x4ade80,    // Green buttons
            BUTTON_SECONDARY: 0xf59e0b,  // Orange buttons
            BUTTON_DANGER: 0xef4444,     // Red buttons
            ACCENT_PURPLE: 0x8b5cf6,     // Purple accents
            ACCENT_CYAN: 0x06b6d4,       // Cyan accents
            PLATFORM_GREEN: 0x22c55e,    // Platform green
            DECORATION_ORANGE: 0xf97316,  // Orange decorations
            DECORATION_PINK: 0xec4899     // Pink decorations
        };
    }

    create() {
        // Create animated starfield background
        this.createStarfield();
        
        // Show tutorial on first visit
        if (!this.tutorialShown) {
            this.showTutorial();
            this.tutorialShown = true;
        }
        
        // Create the campus environment
        this.createCampus();
        
        // Create the player
        this.createPlayer();
        
        // Set up controls
        this.setupControls();
        
        // Create UI
        this.createUI();
        
        // Create interaction system
        this.setupInteractions();
    }
    
    createStarfield() {
        // Create animated starfield background
        const graphics = this.add.graphics();
        graphics.fillStyle(this.SPACE_COLORS.BACKGROUND);
        graphics.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);
        
        // Add animated stars
        for (let i = 0; i < 100; i++) {
            const star = this.add.circle(
                Phaser.Math.Between(0, this.cameras.main.width),
                Phaser.Math.Between(0, this.cameras.main.height),
                Phaser.Math.Between(1, 3),
                0xffffff,
                Phaser.Math.FloatBetween(0.3, 0.8)
            );
            
            // Add twinkling animation
            this.tweens.add({
                targets: star,
                alpha: { from: 0.3, to: 1 },
                duration: Phaser.Math.Between(1000, 3000),
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        }
        
        // Add some larger glowing stars
        for (let i = 0; i < 20; i++) {
            const glowStar = this.add.circle(
                Phaser.Math.Between(0, this.cameras.main.width),
                Phaser.Math.Between(0, this.cameras.main.height),
                4,
                this.SPACE_COLORS.ACCENT_CYAN,
                0.6
            );
            
            this.tweens.add({
                targets: glowStar,
                scaleX: { from: 1, to: 1.5 },
                scaleY: { from: 1, to: 1.5 },
                alpha: { from: 0.6, to: 0.2 },
                duration: 2000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        }
    }
    
    showTutorial() {
        // Create tutorial overlay with space theme
        const tutorialBg = this.add.rectangle(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            this.cameras.main.width,
            this.cameras.main.height,
            0x000000,
            0.9
        );
        tutorialBg.setDepth(1000);
        
        // Tutorial content panel
        const tutorialPanel = this.add.rectangle(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            600,
            400,
            this.SPACE_COLORS.UI_PANEL
        );
        tutorialPanel.setDepth(1001);
        tutorialPanel.setStrokeStyle(3, this.SPACE_COLORS.BUTTON_PRIMARY);
        
        // Add glowing effect to panel
        const glowPanel = this.add.rectangle(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            610,
            410,
            this.SPACE_COLORS.BUTTON_PRIMARY,
            0.3
        );
        glowPanel.setDepth(1000);
        
        // Tutorial title with glow effect
        const title = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 150,
            '🚀 Welcome to OFFSIKSHA Space Campus! 🌌',
            {
                fontSize: '24px',
                fontFamily: 'Arial',
                color: this.SPACE_COLORS.TEXT_PRIMARY,
                fontStyle: 'bold'
            }
        ).setOrigin(0.5).setDepth(1002);
        
        // Tutorial instructions
        const instructions = [
            '🎮 Navigation Controls:',
            '   • Use ARROW KEYS or WASD to navigate the space station',
            '   • Approach green airlocks to see interaction prompts',
            '',
            '🏫 Space Station Modules:',
            '   • AI/ML Lab - Advanced artificial intelligence research',
            '   • Network Center - Quantum communication systems',
            '   • Digital Library - Galactic knowledge database',
            '   • Computer Lab - Programming in zero gravity',
            '',
            '💡 Space Explorer Tips:',
            '   • Green airlocks lead to specialized modules',
            '   • Press E to enter modules when prompted',
            '   • ESC returns to mission control'
        ];
        
        this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 50,
            instructions.join('\n'),
            {
                fontSize: '14px',
                fontFamily: 'Arial',
                color: this.SPACE_COLORS.TEXT_SECONDARY,
                align: 'left',
                lineSpacing: 5
            }
        ).setOrigin(0.5).setDepth(1002);
        
        // Start button with hover effects
        const startButton = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY + 140,
            '🚀 Begin Space Mission →',
            {
                fontSize: '18px',
                fontFamily: 'Arial',
                color: this.SPACE_COLORS.TEXT_PRIMARY,
                backgroundColor: this.SPACE_COLORS.BUTTON_PRIMARY,
                padding: { x: 20, y: 10 }
            }
        );
        startButton.setOrigin(0.5).setDepth(1002);
        startButton.setInteractive({ useHandCursor: true });
        
        // Add hover effects
        startButton.on('pointerover', () => {
            startButton.setScale(1.1);
            startButton.setStyle({ backgroundColor: this.SPACE_COLORS.ACCENT_CYAN });
        });
        
        startButton.on('pointerout', () => {
            startButton.setScale(1);
            startButton.setStyle({ backgroundColor: this.SPACE_COLORS.BUTTON_PRIMARY });
        });
        
        startButton.on('pointerdown', () => {
            tutorialBg.destroy();
            tutorialPanel.destroy();
            glowPanel.destroy();
            startButton.destroy();
        });
    }
    
    createCampus() {
        // Create space station background
        const graphics = this.add.graphics();
        graphics.fillStyle(this.SPACE_COLORS.CORRIDOR);
        graphics.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);
        
        // Create space station structure
        this.createSpaceStationStructure(graphics);
        
        // Create specialized modules
        this.createAIMLLab(graphics);
        this.createNetworkingCenter(graphics);
        this.createLibrary(graphics);
        this.createComputerLab(graphics);
        
        // Create airlocks and interaction zones
        this.createAirlocks();
        
        // Create physics walls
        this.createPhysicsWalls();
        
        // Add module labels and decorations
        this.addModuleLabels();
        
        // Add space station decorations
        this.addSpaceDecorations();
    }
    
    createSpaceStationStructure(graphics) {
        // Main corridor floors with metallic appearance
        graphics.fillStyle(this.SPACE_COLORS.FLOOR);
        graphics.fillRect(50, 150, this.cameras.main.width - 100, 100); // Horizontal corridor
        graphics.fillRect(200, 50, 100, this.cameras.main.height - 100); // Vertical corridor left
        graphics.fillRect(900, 50, 100, this.cameras.main.height - 100); // Vertical corridor right
        
        // Add corridor lighting effects
        graphics.fillStyle(this.SPACE_COLORS.ACCENT_CYAN, 0.3);
        graphics.fillRect(60, 160, this.cameras.main.width - 120, 10); // Top light strip
        graphics.fillRect(60, 230, this.cameras.main.width - 120, 10); // Bottom light strip
        graphics.fillRect(210, 60, 10, this.cameras.main.height - 120); // Left corridor light
        graphics.fillRect(280, 60, 10, this.cameras.main.height - 120); // Left corridor light
        graphics.fillRect(910, 60, 10, this.cameras.main.height - 120); // Right corridor light
        graphics.fillRect(980, 60, 10, this.cameras.main.height - 120); // Right corridor light
        
        // Space station walls with metallic look
        graphics.fillStyle(this.SPACE_COLORS.WALL);
        // Horizontal corridor walls
        graphics.fillRect(50, 140, this.cameras.main.width - 100, 10);
        graphics.fillRect(50, 250, this.cameras.main.width - 100, 10);
        
        // Vertical corridor walls
        graphics.fillRect(190, 50, 10, this.cameras.main.height - 100);
        graphics.fillRect(300, 50, 10, this.cameras.main.height - 100);
        graphics.fillRect(890, 50, 10, this.cameras.main.height - 100);
        graphics.fillRect(1000, 50, 10, this.cameras.main.height - 100);
        
        // Outer hull
        graphics.fillStyle(this.SPACE_COLORS.WALL);
        graphics.fillRect(0, 0, this.cameras.main.width, 20);
        graphics.fillRect(0, this.cameras.main.height - 20, this.cameras.main.width, 20);
        graphics.fillRect(0, 0, 20, this.cameras.main.height);
        graphics.fillRect(this.cameras.main.width - 20, 0, 20, this.cameras.main.height);
    }
    
    createAIMLLab(graphics) {
        // AI/ML Lab with futuristic design
        graphics.fillStyle(this.SPACE_COLORS.FLOOR);
        graphics.fillRect(50, 50, 140, 90);
        
        // Lab walls
        graphics.fillStyle(this.SPACE_COLORS.WALL);
        graphics.fillRect(50, 50, 140, 10);
        graphics.fillRect(50, 50, 10, 90);
        graphics.fillRect(180, 50, 10, 40);
        graphics.fillRect(180, 130, 10, 10);
        
        // High-tech AI equipment with glowing effects
        graphics.fillStyle(this.SPACE_COLORS.ACCENT_PURPLE);
        graphics.fillRect(60, 60, 20, 15); // Quantum processor
        graphics.fillRect(90, 60, 20, 15); // Neural network unit
        graphics.fillRect(120, 60, 20, 15); // AI workstation
        
        // Holographic display
        graphics.fillStyle(this.SPACE_COLORS.ACCENT_CYAN, 0.7);
        graphics.fillRect(70, 110, 80, 20);
        
        // Add glowing accents
        graphics.fillStyle(this.SPACE_COLORS.BUTTON_PRIMARY, 0.5);
        graphics.fillRect(58, 58, 24, 19);
        graphics.fillRect(88, 58, 24, 19);
        graphics.fillRect(118, 58, 24, 19);
    }
    
    createNetworkingCenter(graphics) {
        // Networking Center with cyberpunk aesthetic
        graphics.fillStyle(this.SPACE_COLORS.FLOOR);
        graphics.fillRect(1010, 50, 140, 90);
        
        // Center walls
        graphics.fillStyle(this.SPACE_COLORS.WALL);
        graphics.fillRect(1010, 50, 140, 10);
        graphics.fillRect(1140, 50, 10, 90);
        graphics.fillRect(1000, 50, 10, 40);
        graphics.fillRect(1000, 130, 10, 10);
        
        // Advanced networking equipment
        graphics.fillStyle(this.SPACE_COLORS.DECORATION_ORANGE);
        graphics.fillRect(1020, 60, 25, 10); // Quantum router
        graphics.fillRect(1055, 60, 25, 10); // Hypernet switch
        graphics.fillRect(1090, 60, 25, 10); // Data server
        graphics.fillRect(1125, 60, 15, 25); // Network tower
        
        // Network visualization display
        graphics.fillStyle(this.SPACE_COLORS.BUTTON_SECONDARY, 0.8);
        graphics.fillRect(1030, 110, 80, 20);
        
        // Add glowing network indicators
        graphics.fillStyle(this.SPACE_COLORS.ACCENT_CYAN, 0.6);
        graphics.fillRect(1018, 58, 29, 14);
        graphics.fillRect(1053, 58, 29, 14);
        graphics.fillRect(1088, 58, 29, 14);
    }
    
    createLibrary(graphics) {
        // Digital Library with holographic storage
        graphics.fillStyle(this.SPACE_COLORS.FLOOR);
        graphics.fillRect(50, 260, 140, 90);
        
        // Library walls
        graphics.fillStyle(this.SPACE_COLORS.WALL);
        graphics.fillRect(50, 260, 10, 90);
        graphics.fillRect(50, 340, 140, 10);
        graphics.fillRect(180, 260, 10, 40);
        graphics.fillRect(180, 340, 10, 10);
        
        // Holographic data storage units
        graphics.fillStyle(this.SPACE_COLORS.ACCENT_PURPLE, 0.8);
        graphics.fillRect(60, 270, 15, 60);
        graphics.fillRect(85, 270, 15, 60);
        graphics.fillRect(110, 270, 15, 60);
        graphics.fillRect(135, 270, 15, 60);
        
        // Interactive learning pod
        graphics.fillStyle(this.SPACE_COLORS.ACCENT_CYAN);
        graphics.fillRect(155, 285, 25, 30);
        
        // Add data stream effects
        graphics.fillStyle(this.SPACE_COLORS.BUTTON_PRIMARY, 0.4);
        for (let i = 0; i < 4; i++) {
            graphics.fillRect(58 + i * 25, 268, 19, 64);
        }
    }
    
    createComputerLab(graphics) {
        // Computer Lab with futuristic workstations
        graphics.fillStyle(this.SPACE_COLORS.FLOOR);
        graphics.fillRect(1010, 260, 140, 90);
        
        // Lab walls
        graphics.fillStyle(this.SPACE_COLORS.WALL);
        graphics.fillRect(1140, 260, 10, 90);
        graphics.fillRect(1010, 340, 140, 10);
        graphics.fillRect(1000, 260, 10, 40);
        graphics.fillRect(1000, 340, 10, 10);
        
        // Advanced computer workstations
        graphics.fillStyle(this.SPACE_COLORS.DECORATION_PINK);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 2; j++) {
                graphics.fillRect(1020 + i * 35, 270 + j * 35, 25, 20);
            }
        }
        
        // Central server cluster
        graphics.fillStyle(this.SPACE_COLORS.ACCENT_PURPLE);
        graphics.fillRect(1120, 270, 20, 60);
        
        // Add holographic displays
        graphics.fillStyle(this.SPACE_COLORS.ACCENT_CYAN, 0.5);
        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 2; j++) {
                graphics.fillRect(1018 + i * 35, 268 + j * 35, 29, 24);
            }
        }
    }
    
    createAirlocks() {
        this.doors = this.physics.add.staticGroup();
        
        // Airlock positions with glowing green design
        const airlockData = [
            { x: 190, y: 95, width: 20, height: 40, room: 'ai_ml', label: 'AI/ML Lab' },
            { x: 990, y: 95, width: 20, height: 40, room: 'networking', label: 'Network Center' },
            { x: 190, y: 300, width: 20, height: 40, room: 'library', label: 'Digital Library' },
            { x: 990, y: 300, width: 20, height: 40, room: 'computer_lab', label: 'Computer Lab' }
        ];
        
        airlockData.forEach(airlock => {
            // Create glowing airlock effect
            const airlockGlow = this.add.rectangle(
                airlock.x + airlock.width/2, 
                airlock.y + airlock.height/2, 
                airlock.width + 10, 
                airlock.height + 10, 
                this.SPACE_COLORS.DOOR,
                0.3
            );
            
            // Create main airlock door
            const airlockVisual = this.add.rectangle(
                airlock.x + airlock.width/2, 
                airlock.y + airlock.height/2, 
                airlock.width, 
                airlock.height, 
                this.SPACE_COLORS.DOOR
            );
            
            // Add pulsing animation to airlocks
            this.tweens.add({
                targets: [airlockGlow, airlockVisual],
                alpha: { from: 1, to: 0.6 },
                duration: 1500,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
            
            // Create interaction zone
            const airlockBody = this.add.rectangle(
                airlock.x + airlock.width/2, 
                airlock.y + airlock.height/2, 
                airlock.width + 40, 
                airlock.height + 40
            );
            airlockBody.setVisible(false);
            this.physics.add.existing(airlockBody, true);
            airlockBody.roomType = airlock.room;
            airlockBody.roomLabel = airlock.label;
            this.doors.add(airlockBody);
        });
    }
    
    addSpaceDecorations() {
        // Add floating platforms and space debris
        const decorations = [
            { x: 400, y: 120, color: this.SPACE_COLORS.PLATFORM_GREEN },
            { x: 700, y: 120, color: this.SPACE_COLORS.PLATFORM_GREEN },
            { x: 400, y: 320, color: this.SPACE_COLORS.PLATFORM_GREEN },
            { x: 700, y: 320, color: this.SPACE_COLORS.PLATFORM_GREEN }
        ];
        
        decorations.forEach(deco => {
            const platform = this.add.rectangle(deco.x, deco.y, 80, 15, deco.color);
            
            // Add floating animation
            this.tweens.add({
                targets: platform,
                y: deco.y + 5,
                duration: 2000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        });
        
        // Add energy crystals
        for (let i = 0; i < 10; i++) {
            const crystal = this.add.polygon(
                Phaser.Math.Between(100, this.cameras.main.width - 100),
                Phaser.Math.Between(100, this.cameras.main.height - 100),
                6, 8, this.SPACE_COLORS.DECORATION_PINK, 0.6
            );
            
            this.tweens.add({
                targets: crystal,
                angle: 360,
                duration: 4000,
                repeat: -1,
                ease: 'Linear'
            });
        }
    }
    
    createPhysicsWalls() {
        this.walls = this.physics.add.staticGroup();
        
        // Create collision bodies for all walls (same structure as before)
        const wallData = [
            // Outer walls
            { x: this.cameras.main.centerX, y: 10, width: this.cameras.main.width, height: 20 },
            { x: this.cameras.main.centerX, y: this.cameras.main.height - 10, width: this.cameras.main.width, height: 20 },
            { x: 10, y: this.cameras.main.centerY, width: 20, height: this.cameras.main.height },
            { x: this.cameras.main.width - 10, y: this.cameras.main.centerY, width: 20, height: this.cameras.main.height },
            
            // Corridor walls
            { x: this.cameras.main.centerX, y: 145, width: this.cameras.main.width - 100, height: 10 },
            { x: this.cameras.main.centerX, y: 255, width: this.cameras.main.width - 100, height: 10 },
            { x: 195, y: this.cameras.main.centerY, width: 10, height: this.cameras.main.height - 100 },
            { x: 305, y: this.cameras.main.centerY, width: 10, height: this.cameras.main.height - 100 },
            { x: 895, y: this.cameras.main.centerY, width: 10, height: this.cameras.main.height - 100 },
            { x: 1005, y: this.cameras.main.centerY, width: 10, height: this.cameras.main.height - 100 },
            
            // Room walls (excluding door areas)
            // AI/ML room
            { x: 120, y: 55, width: 140, height: 10 },
            { x: 55, y: 95, width: 10, height: 90 },
            { x: 185, y: 70, width: 10, height: 40 },
            { x: 185, y: 135, width: 10, height: 10 },
            
            // Networking room
            { x: 1080, y: 55, width: 140, height: 10 },
            { x: 1145, y: 95, width: 10, height: 90 },
            { x: 1005, y: 70, width: 10, height: 40 },
            { x: 1005, y: 135, width: 10, height: 10 },
            
            // Library
            { x: 55, y: 305, width: 10, height: 90 },
            { x: 120, y: 345, width: 140, height: 10 },
            { x: 185, y: 280, width: 10, height: 40 },
            { x: 185, y: 345, width: 10, height: 10 },
            
            // Computer Lab
            { x: 1145, y: 305, width: 10, height: 90 },
            { x: 1080, y: 345, width: 140, height: 10 },
            { x: 1005, y: 280, width: 10, height: 40 },
            { x: 1005, y: 345, width: 10, height: 10 }
        ];
        
        wallData.forEach(wall => {
            const wallBody = this.add.rectangle(wall.x, wall.y, wall.width, wall.height);
            wallBody.setVisible(false);
            this.physics.add.existing(wallBody, true);
            this.walls.add(wallBody);
        });
    }
    
    addModuleLabels() {
        // Module labels with futuristic styling
        this.roomTexts = {
            ai_ml: this.add.text(120, 75, '🤖 AI/ML LAB', {
                fontSize: '12px', fontFamily: 'Arial', color: this.SPACE_COLORS.TEXT_PRIMARY, fontStyle: 'bold'
            }).setOrigin(0.5),
            
            networking: this.add.text(1080, 75, '🌐 NETWORK CENTER', {
                fontSize: '12px', fontFamily: 'Arial', color: this.SPACE_COLORS.TEXT_PRIMARY, fontStyle: 'bold'
            }).setOrigin(0.5),
            
            library: this.add.text(120, 285, '📚 DIGITAL LIBRARY', {
                fontSize: '12px', fontFamily: 'Arial', color: this.SPACE_COLORS.TEXT_PRIMARY, fontStyle: 'bold'
            }).setOrigin(0.5),
            
            computer_lab: this.add.text(1080, 285, '💻 COMPUTER LAB', {
                fontSize: '12px', fontFamily: 'Arial', color: this.SPACE_COLORS.TEXT_PRIMARY, fontStyle: 'bold'
            }).setOrigin(0.5)
        };
        
        // Add glowing effect to labels
        Object.values(this.roomTexts).forEach(text => {
            text.setStroke(this.SPACE_COLORS.BUTTON_PRIMARY, 2);
            text.setShadow(0, 0, this.SPACE_COLORS.BUTTON_PRIMARY, 3);
        });
        
        // Space station title
        const title = this.add.text(
            this.cameras.main.centerX,
            30,
            '🚀 OFFSIKSHA SPACE STATION 🌌',
            {
                fontSize: '24px',
                fontFamily: 'Arial',
                color: this.SPACE_COLORS.TEXT_PRIMARY,
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);
        
        title.setStroke(this.SPACE_COLORS.ACCENT_CYAN, 3);
        title.setShadow(0, 0, this.SPACE_COLORS.ACCENT_CYAN, 5);
    }
    
    createPlayer() {
        // Create space explorer player with glowing effect
        this.player = this.add.rectangle(
            this.cameras.main.centerX, 
            200, 
            PLAYER_SIZE, 
            PLAYER_SIZE, 
            this.SPACE_COLORS.PLAYER
        );
        
        // Add glowing effect to player
        const playerGlow = this.add.rectangle(
            this.cameras.main.centerX, 
            200, 
            PLAYER_SIZE + 10, 
            PLAYER_SIZE + 10, 
            this.SPACE_COLORS.PLAYER,
            0.3
        );
        
        // Add physics to the player
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);
        
        // Make glow follow player
        this.playerGlow = playerGlow;
        
        // Set up collisions
        
    }
    
    setupControls() {
        // Create cursor keys
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Create WASD keys
        this.wasd = this.input.keyboard.addKeys('W,S,A,D');
        
        // Create interaction key (E)
        this.interactKey = this.input.keyboard.addKey('E');
        
        // Add escape key to return to menu
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.start(SCENES.MAIN_MENU);
        });
    }
    
    setupInteractions() {
        // Set up overlap detection with airlocks
        this.physics.add.overlap(this.player, this.doors, (player, door) => {
            this.showInteractionPrompt(door);
        });
    }
    
    showInteractionPrompt(door) {
        const promptKey = door.roomType;
        
        if (!this.interactionPrompts[promptKey]) {
            this.interactionPrompts[promptKey] = this.add.text(
                door.x,
                door.y - 30,
                `Press E to enter ${door.roomLabel}`,
                {
                    fontSize: '14px',
                    fontFamily: 'Arial',
                    color: this.SPACE_COLORS.TEXT_PRIMARY,
                    backgroundColor: this.SPACE_COLORS.UI_PANEL,
                    padding: { x: 8, y: 4 }
                }
            ).setOrigin(0.5).setDepth(100);
            
            // Add glowing effect to prompt
            this.interactionPrompts[promptKey].setStroke(this.SPACE_COLORS.BUTTON_PRIMARY, 1);
            
            // Add pulsing animation
            this.tweens.add({
                targets: this.interactionPrompts[promptKey],
                alpha: { from: 1, to: 0.7 },
                duration: 800,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        }
        
        // Check for interaction
        if (Phaser.Input.Keyboard.JustDown(this.interactKey)) {
            this.enterRoom(door.roomType);
        }
    }
    
    hideInteractionPrompt(roomType) {
        if (this.interactionPrompts[roomType]) {
            this.interactionPrompts[roomType].destroy();
            delete this.interactionPrompts[roomType];
        }
    }
    
    enterRoom(roomType) {
        // Hide all interaction prompts
        Object.keys(this.interactionPrompts).forEach(key => {
            this.hideInteractionPrompt(key);
        });
        
        // Navigate to specific room scene based on room type
        switch(roomType) {
            case 'ai_ml':
                this.scene.start(SCENES.AI_ML_LAB);
                break;
            case 'networking':
                this.scene.start(SCENES.NETWORKING_CENTER);
                break;
            case 'library':
                this.scene.start(SCENES.LIBRARY);
                break;
            case 'computer_lab':
                this.scene.start(SCENES.COMPUTER_LAB);
                break;
            default:
                console.log(`Unknown room type: ${roomType}`);
        }
    }
    
    createUI() {
        // Create status panel
        const statusPanel = this.add.rectangle(
            this.cameras.main.width - 150,
            30,
            280,
            60,
            this.SPACE_COLORS.UI_PANEL,
            0.9
        );
        statusPanel.setDepth(50);
        
        // Add status text
        this.statusText = this.add.text(
            this.cameras.main.width - 150,
            20,
            '🚀 Space Explorer Status',
            {
                fontSize: '14px',
                fontFamily: 'Arial',
                color: this.SPACE_COLORS.TEXT_PRIMARY,
                fontStyle: 'bold'
            }
        ).setOrigin(0.5).setDepth(51);
        
        this.locationText = this.add.text(
            this.cameras.main.width - 150,
            40,
            '📍 Main Corridor',
            {
                fontSize: '12px',
                fontFamily: 'Arial',
                color: this.SPACE_COLORS.TEXT_SECONDARY
            }
        ).setOrigin(0.5).setDepth(51);
        
        // Create control hints
        const controlsPanel = this.add.rectangle(
            150,
            this.cameras.main.height - 40,
            280,
            60,
            this.SPACE_COLORS.UI_PANEL,
            0.9
        );
        controlsPanel.setDepth(50);
        
        this.add.text(
            150,
            this.cameras.main.height - 50,
            '🎮 Controls: WASD/Arrow Keys to move',
            {
                fontSize: '12px',
                fontFamily: 'Arial',
                color: this.SPACE_COLORS.TEXT_SECONDARY
            }
        ).setOrigin(0.5).setDepth(51);
        
        this.add.text(
            150,
            this.cameras.main.height - 30,
            '⌨️ E to interact • ESC to return to menu',
            {
                fontSize: '12px',
                fontFamily: 'Arial',
                color: this.SPACE_COLORS.TEXT_SECONDARY
            }
        ).setOrigin(0.5).setDepth(51);
    }
    
    update() {
        // Handle player movement
        this.handlePlayerMovement();
        
        // Update player glow position
        if (this.playerGlow) {
            this.playerGlow.x = this.player.x;
            this.playerGlow.y = this.player.y;
        }
        
        // Check if player is near any doors
        let nearDoor = false;
        this.doors.children.entries.forEach(door => {
            const distance = Phaser.Math.Distance.Between(
                this.player.x, this.player.y,
                door.x, door.y
            );
            
            if (distance < 50) {
                nearDoor = true;
                this.showInteractionPrompt(door);
            } else {
                this.hideInteractionPrompt(door.roomType);
            }
        });
    }
    
    addSpaceDecorations() {
        // Add floating platforms and space debris
        const decorations = [
            { x: 400, y: 120, color: this.SPACE_COLORS.PLATFORM_GREEN },
            { x: 700, y: 120, color: this.SPACE_COLORS.PLATFORM_GREEN },
            { x: 400, y: 320, color: this.SPACE_COLORS.PLATFORM_GREEN },
            { x: 700, y: 320, color: this.SPACE_COLORS.PLATFORM_GREEN }
        ];
        
        decorations.forEach(deco => {
            const platform = this.add.rectangle(deco.x, deco.y, 80, 15, deco.color);
            
            // Add floating animation
            this.tweens.add({
                targets: platform,
                y: deco.y + 5,
                duration: 2000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        });
        
        // Add energy crystals (using circles instead of polygons to avoid parameter issues)
        for (let i = 0; i < 10; i++) {
            const crystal = this.add.circle(
                Phaser.Math.Between(100, this.cameras.main.width - 100),
                Phaser.Math.Between(100, this.cameras.main.height - 100),
                6,
                this.SPACE_COLORS.DECORATION_PINK,
                0.6
            );
            
            // Add pulsing effect
            this.tweens.add({
                targets: crystal,
                scaleX: { from: 1, to: 1.3 },
                scaleY: { from: 1, to: 1.3 },
                alpha: { from: 0.6, to: 0.3 },
                duration: 2000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        }
    }

    handlePlayerMovement() {
        const speed = 160;
        
        // Reset velocity
        this.player.body.setVelocity(0);
        
        // Horizontal movement
        if (this.cursors.left.isDown || this.wasd.A.isDown) {
            this.player.body.setVelocityX(-speed);
        } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
            this.player.body.setVelocityX(speed);
        }
        
        // Vertical movement
        if (this.cursors.up.isDown || this.wasd.W.isDown) {
            this.player.body.setVelocityY(-speed);
        } else if (this.cursors.down.isDown || this.wasd.S.isDown) {
            this.player.body.setVelocityY(speed);
        }
        
        // Normalize diagonal movement
        if (this.player.body.velocity.x !== 0 && this.player.body.velocity.y !== 0) {
            this.player.body.velocity.x *= 0.7;
            this.player.body.velocity.y *= 0.7;
        }
    }
}