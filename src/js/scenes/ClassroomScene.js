class ClassroomScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENES.CLASSROOM
        });
        this.player = null;
        this.cursors = null;
        this.wasd = null;
        this.doors = null;
        this.currentRoom = 'central_hub';
        this.tutorialShown = false;
        this.roomTexts = {};
        this.interactionPrompts = {};
        this.mapWidth = 1600;
        this.mapHeight = 1200;
        
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
        // Set world bounds to larger map size
        this.physics.world.setBounds(0, 0, this.mapWidth, this.mapHeight);
        
        // Create animated starfield background
        this.createStarfield();
        
        // Show tutorial on first visit
        if (!this.tutorialShown) {
            this.showTutorial();
            this.tutorialShown = true;
        }
        
        // Create the redesigned campus environment
        this.createCampus();
        
        // Create the player
        this.createPlayer();
        
        // Set up camera to follow player
        this.setupCamera();
        
        // Set up controls
        this.setupControls();
        
        // Create UI
        this.createUI();
        
        // Create interaction system
        this.setupInteractions();
    }
    
    createStarfield() {
        // Create animated starfield background across the larger map
        const graphics = this.add.graphics();
        graphics.fillStyle(this.SPACE_COLORS.BACKGROUND);
        graphics.fillRect(0, 0, this.mapWidth, this.mapHeight);
        
        // Add animated stars across the larger area
        for (let i = 0; i < 200; i++) {
            const star = this.add.circle(
                Phaser.Math.Between(0, this.mapWidth),
                Phaser.Math.Between(0, this.mapHeight),
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
        for (let i = 0; i < 40; i++) {
            const glowStar = this.add.circle(
                Phaser.Math.Between(0, this.mapWidth),
                Phaser.Math.Between(0, this.mapHeight),
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
    
    setupCamera() {
        // Set camera to follow player smoothly
        this.cameras.main.startFollow(this.player, true, 0.05, 0.05);
        this.cameras.main.setBounds(0, 0, this.mapWidth, this.mapHeight);
        this.cameras.main.setZoom(1);
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
        tutorialBg.setScrollFactor(0);
        
        // Tutorial content panel
        const tutorialPanel = this.add.rectangle(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            600,
            450,
            this.SPACE_COLORS.UI_PANEL
        );
        tutorialPanel.setDepth(1001);
        tutorialPanel.setStrokeStyle(3, this.SPACE_COLORS.BUTTON_PRIMARY);
        tutorialPanel.setScrollFactor(0);
        
        // Add glowing effect to panel
        const glowPanel = this.add.rectangle(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            610,
            460,
            this.SPACE_COLORS.BUTTON_PRIMARY,
            0.3
        );
        glowPanel.setDepth(1000);
        glowPanel.setScrollFactor(0);
        
        // Tutorial title with glow effect
        const title = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 180,
            '🚀 Welcome to OFFSIKSHA Space Campus! 🌌',
            {
                fontSize: '24px',
                fontFamily: 'Arial',
                color: this.SPACE_COLORS.TEXT_PRIMARY,
                fontStyle: 'bold'
            }
        ).setOrigin(0.5).setDepth(1002).setScrollFactor(0);
        
        // Tutorial instructions
        const instructions = [
            '🎮 Navigation Controls:',
            '   • Use ARROW KEYS or WASD to navigate the space station',
            '   • Camera follows your space explorer smoothly',
            '   • Approach green airlocks to see interaction prompts',
            '',
            '🏫 Space Station Hub Layout:',
            '   • Central Hub - Main meeting and coordination area',
            '   • AI/ML Lab - Advanced artificial intelligence research',
            '   • Network Center - Quantum communication & collaboration',
            '   • Digital Library - Galactic knowledge database',
            '   • Computer Lab - Programming classroom with modern setup',
            '',
            '👥 Multiplayer Features:',
            '   • Wide corridors for multiple explorers',
            '   • Open areas for group interactions',
            '   • Modern classroom layouts for collaboration',
            '',
            '💡 Space Explorer Tips:',
            '   • Green airlocks lead to specialized modules',
            '   • Press E to enter modules when prompted',
            '   • ESC returns to mission control',
            '   • Explore the larger map area!'
        ];
        
        this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 50,
            instructions.join('\n'),
            {
                fontSize: '13px',
                fontFamily: 'Arial',
                color: this.SPACE_COLORS.TEXT_SECONDARY,
                align: 'left',
                lineSpacing: 4
            }
        ).setOrigin(0.5).setDepth(1002).setScrollFactor(0);
        
        // Start button with hover effects
        const startButton = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY + 170,
            '🚀 Begin Space Mission →',
            {
                fontSize: '18px',
                fontFamily: 'Arial',
                color: this.SPACE_COLORS.TEXT_PRIMARY,
                backgroundColor: this.SPACE_COLORS.BUTTON_PRIMARY,
                padding: { x: 20, y: 10 }
            }
        );
        startButton.setOrigin(0.5).setDepth(1002).setScrollFactor(0);
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
            title.destroy();
            startButton.destroy();
        });
    }
    
    createCampus() {
        // Create larger space station background
        const graphics = this.add.graphics();
        graphics.fillStyle(this.SPACE_COLORS.BACKGROUND);
        graphics.fillRect(0, 0, this.mapWidth, this.mapHeight);
        
        // Create redesigned space station structure with central hub
        this.createSpaceStationStructure(graphics);
        
        // Create specialized modules around the hub
        this.createCentralHub(graphics);
        this.createAIMLLab(graphics);
        this.createNetworkingCenter(graphics);
        this.createLibrary(graphics);
        this.createComputerLab(graphics);
        
        // Create connecting corridors
        this.createCorridors(graphics);
        
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
        // Main station floor with metallic appearance
        graphics.fillStyle(this.SPACE_COLORS.FLOOR);
        graphics.fillRect(100, 100, this.mapWidth - 200, this.mapHeight - 200);
        
        // Add station lighting effects - horizontal strips
        graphics.fillStyle(this.SPACE_COLORS.ACCENT_CYAN, 0.3);
        for (let y = 150; y < this.mapHeight - 150; y += 100) {
            graphics.fillRect(120, y, this.mapWidth - 240, 8);
        }
        
        // Add station lighting effects - vertical strips
        for (let x = 200; x < this.mapWidth - 200; x += 150) {
            graphics.fillRect(x, 120, 8, this.mapHeight - 240);
        }
        
        // Outer hull
        graphics.fillStyle(this.SPACE_COLORS.WALL);
        graphics.fillRect(0, 0, this.mapWidth, 50);
        graphics.fillRect(0, this.mapHeight - 50, this.mapWidth, 50);
        graphics.fillRect(0, 0, 50, this.mapHeight);
        graphics.fillRect(this.mapWidth - 50, 0, 50, this.mapHeight);
    }
    
    createCentralHub(graphics) {
        // Large central hub for meetings and coordination
        const hubX = this.mapWidth / 2 - 150;
        const hubY = this.mapHeight / 2 - 100;
        
        graphics.fillStyle(this.SPACE_COLORS.CORRIDOR);
        graphics.fillEllipse(hubX + 150, hubY + 100, 300, 200);
        
        // Hub floor with special pattern
        graphics.fillStyle(this.SPACE_COLORS.FLOOR);
        graphics.fillEllipse(hubX + 150, hubY + 100, 280, 180);
        
        // Central holographic display
        graphics.fillStyle(this.SPACE_COLORS.ACCENT_CYAN, 0.8);
        graphics.fillEllipse(hubX + 150, hubY + 100, 80, 80);
        
        // Meeting areas around the hub
        const meetingAreas = [
            { x: hubX + 50, y: hubY + 50 },
            { x: hubX + 250, y: hubY + 50 },
            { x: hubX + 50, y: hubY + 150 },
            { x: hubX + 250, y: hubY + 150 }
        ];
        
        meetingAreas.forEach(area => {
            graphics.fillStyle(this.SPACE_COLORS.PLATFORM_GREEN);
            graphics.fillRect(area.x, area.y, 40, 20);
        });
    }
    
    createCorridors(graphics) {
        // Wide corridors connecting all areas
        graphics.fillStyle(this.SPACE_COLORS.CORRIDOR);
        
        // Main horizontal corridors
        graphics.fillRect(100, 200, this.mapWidth - 200, 80); // Upper corridor
        graphics.fillRect(100, this.mapHeight - 280, this.mapWidth - 200, 80); // Lower corridor
        
        // Main vertical corridors
        graphics.fillRect(200, 100, 80, this.mapHeight - 200); // Left corridor
        graphics.fillRect(this.mapWidth - 280, 100, 80, this.mapHeight - 200); // Right corridor
        
        // Cross corridors
        graphics.fillRect(100, this.mapHeight/2 - 40, this.mapWidth - 200, 80); // Middle horizontal
        graphics.fillRect(this.mapWidth/2 - 40, 100, 80, this.mapHeight - 200); // Middle vertical
        
        // Add corridor lighting
        graphics.fillStyle(this.SPACE_COLORS.ACCENT_CYAN, 0.4);
        // Horizontal corridor lights
        graphics.fillRect(110, 210, this.mapWidth - 220, 6);
        graphics.fillRect(110, 264, this.mapWidth - 220, 6);
        graphics.fillRect(110, this.mapHeight - 270, this.mapWidth - 220, 6);
        graphics.fillRect(110, this.mapHeight - 216, this.mapWidth - 220, 6);
        graphics.fillRect(110, this.mapHeight/2 - 30, this.mapWidth - 220, 6);
        graphics.fillRect(110, this.mapHeight/2 + 24, this.mapWidth - 220, 6);
        
        // Vertical corridor lights
        graphics.fillRect(210, 110, 6, this.mapHeight - 220);
        graphics.fillRect(264, 110, 6, this.mapHeight - 220);
        graphics.fillRect(this.mapWidth - 270, 110, 6, this.mapHeight - 220);
        graphics.fillRect(this.mapWidth - 216, 110, 6, this.mapHeight - 220);
        graphics.fillRect(this.mapWidth/2 - 30, 110, 6, this.mapHeight - 220);
        graphics.fillRect(this.mapWidth/2 + 24, 110, 6, this.mapHeight - 220);
    }
    
    createAIMLLab(graphics) {
        // AI/ML Lab in upper left with modern classroom layout
        const labX = 300;
        const labY = 300;
        
        graphics.fillStyle(this.SPACE_COLORS.FLOOR);
        graphics.fillRect(labX, labY, 200, 150);
        
        // Modern classroom setup - workstation pods
        graphics.fillStyle(this.SPACE_COLORS.ACCENT_PURPLE);
        const workstations = [
            { x: labX + 20, y: labY + 20 },
            { x: labX + 80, y: labY + 20 },
            { x: labX + 140, y: labY + 20 },
            { x: labX + 20, y: labY + 70 },
            { x: labX + 80, y: labY + 70 },
            { x: labX + 140, y: labY + 70 }
        ];
        
        workstations.forEach(ws => {
            graphics.fillRect(ws.x, ws.y, 35, 25);
        });
        
        // Interactive whiteboard/display
        graphics.fillStyle(this.SPACE_COLORS.ACCENT_CYAN, 0.8);
        graphics.fillRect(labX + 20, labY + 110, 160, 30);
        
        // Add glowing effects
        graphics.fillStyle(this.SPACE_COLORS.BUTTON_PRIMARY, 0.3);
        workstations.forEach(ws => {
            graphics.fillRect(ws.x - 2, ws.y - 2, 39, 29);
        });
    }
    
    createNetworkingCenter(graphics) {
        // Networking Center in upper right - open collaboration space
        const netX = this.mapWidth - 500;
        const netY = 300;
        
        graphics.fillStyle(this.SPACE_COLORS.FLOOR);
        graphics.fillRect(netX, netY, 200, 150);
        
        // Collaborative seating arrangement
        graphics.fillStyle(this.SPACE_COLORS.DECORATION_ORANGE);
        // Round table setup for networking
        graphics.fillEllipse(netX + 100, netY + 75, 60, 60);
        
        // Surrounding chairs/workspaces
        const chairs = [
            { x: netX + 70, y: netY + 30 },
            { x: netX + 130, y: netY + 30 },
            { x: netX + 160, y: netY + 75 },
            { x: netX + 130, y: netY + 120 },
            { x: netX + 70, y: netY + 120 },
            { x: netX + 40, y: netY + 75 }
        ];
        
        chairs.forEach(chair => {
            graphics.fillEllipse(chair.x, chair.y, 20, 20);
        });
        
        // Network visualization displays
        graphics.fillStyle(this.SPACE_COLORS.ACCENT_CYAN, 0.6);
        graphics.fillRect(netX + 20, netY + 20, 40, 30);
        graphics.fillRect(netX + 140, netY + 20, 40, 30);
    }
    
    createLibrary(graphics) {
        // Digital Library in lower left
        const libX = 300;
        const libY = this.mapHeight - 450;
        
        graphics.fillStyle(this.SPACE_COLORS.FLOOR);
        graphics.fillRect(libX, libY, 200, 150);
        
        // Modern library layout with reading pods
        graphics.fillStyle(this.SPACE_COLORS.ACCENT_PURPLE, 0.8);
        
        // Individual study pods
        const studyPods = [
            { x: libX + 20, y: libY + 20 },
            { x: libX + 70, y: libY + 20 },
            { x: libX + 120, y: libY + 20 },
            { x: libX + 20, y: libY + 60 },
            { x: libX + 120, y: libY + 60 }
        ];
        
        studyPods.forEach(pod => {
            graphics.fillEllipse(pod.x + 15, pod.y + 15, 30, 30);
        });
        
        // Central resource hub
        graphics.fillStyle(this.SPACE_COLORS.ACCENT_CYAN);
        graphics.fillRect(libX + 60, libY + 100, 80, 40);
        
        // Digital resource terminals
        graphics.fillStyle(this.SPACE_COLORS.BUTTON_PRIMARY, 0.6);
        graphics.fillRect(libX + 150, libY + 30, 25, 20);
        graphics.fillRect(libX + 150, libY + 70, 25, 20);
        graphics.fillRect(libX + 150, libY + 110, 25, 20);
    }
    
    createComputerLab(graphics) {
        // Computer Lab in lower right with modern classroom setup
        const compX = this.mapWidth - 500;
        const compY = this.mapHeight - 450;
        
        graphics.fillStyle(this.SPACE_COLORS.FLOOR);
        graphics.fillRect(compX, compY, 200, 150);
        
        // Modern computer classroom - U-shaped arrangement
        graphics.fillStyle(this.SPACE_COLORS.DECORATION_PINK);
        
        // Left row
        for (let i = 0; i < 4; i++) {
            graphics.fillRect(compX + 20, compY + 20 + i * 30, 30, 20);
        }
        
        // Right row
        for (let i = 0; i < 4; i++) {
            graphics.fillRect(compX + 150, compY + 20 + i * 30, 30, 20);
        }
        
        // Back row
        for (let i = 0; i < 3; i++) {
            graphics.fillRect(compX + 60 + i * 30, compY + 20, 20, 30);
        }
        
        // Instructor station
        graphics.fillStyle(this.SPACE_COLORS.ACCENT_PURPLE);
        graphics.fillRect(compX + 80, compY + 110, 40, 30);
        
        // Add holographic displays
        graphics.fillStyle(this.SPACE_COLORS.ACCENT_CYAN, 0.5);
        // Display above each workstation
        for (let i = 0; i < 4; i++) {
            graphics.fillRect(compX + 18, compY + 18 + i * 30, 34, 24);
            graphics.fillRect(compX + 148, compY + 18 + i * 30, 34, 24);
        }
    }
    
    createAirlocks() {
        this.doors = this.physics.add.staticGroup();
        
        // Airlock positions connecting to corridors
        const airlockData = [
            { x: 280, y: 375, width: 20, height: 30, room: 'ai_ml', label: 'AI/ML Lab' },
            { x: this.mapWidth - 280, y: 375, width: 20, height: 30, room: 'networking', label: 'Network Center' },
            { x: 280, y: this.mapHeight - 375, width: 20, height: 30, room: 'library', label: 'Digital Library' },
            { x: this.mapWidth - 280, y: this.mapHeight - 375, width: 20, height: 30, room: 'computer_lab', label: 'Computer Lab' }
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
                airlock.width + 60, 
                airlock.height + 60
            );
            airlockBody.setVisible(false);
            this.physics.add.existing(airlockBody, true);
            airlockBody.roomType = airlock.room;
            airlockBody.roomLabel = airlock.label;
            this.doors.add(airlockBody);
        });
    }
    
    createPhysicsWalls() {
        this.walls = this.physics.add.staticGroup();
        
        const wallData = [
            // Outer walls
            { x: this.mapWidth/2, y: 25, width: this.mapWidth, height: 50 },
            { x: this.mapWidth/2, y: this.mapHeight - 25, width: this.mapWidth, height: 50 },
            { x: 25, y: this.mapHeight/2, width: 50, height: this.mapHeight },
            { x: this.mapWidth - 25, y: this.mapHeight/2, width: 50, height: this.mapHeight },
            
            // AI/ML Lab walls
            { x: 300, y: 290, width: 200, height: 20 },
            { x: 290, y: 375, width: 20, height: 150 },
            { x: 510, y: 375, width: 20, height: 150 },
            { x: 400, y: 460, width: 200, height: 20 },
            
            // Networking Center walls
            { x: this.mapWidth - 400, y: 290, width: 200, height: 20 },
            { x: this.mapWidth - 510, y: 375, width: 20, height: 150 },
            { x: this.mapWidth - 290, y: 375, width: 20, height: 150 },
            { x: this.mapWidth - 400, y: 460, width: 200, height: 20 },
            
            // Library walls
            { x: 300, y: this.mapHeight - 460, width: 200, height: 20 },
            { x: 290, y: this.mapHeight - 375, width: 20, height: 130 },
            { x: 510, y: this.mapHeight - 375, width: 20, height: 130 },
            { x: 400, y: this.mapHeight - 290, width: 200, height: 20 },
            
            // Computer Lab walls
            { x: this.mapWidth - 400, y: this.mapHeight - 460, width: 200, height: 20 },
            { x: this.mapWidth - 510, y: this.mapHeight - 375, width: 20, height: 130 },
            { x: this.mapWidth - 290, y: this.mapHeight - 375, width: 20, height: 130 },
            { x: this.mapWidth - 400, y: this.mapHeight - 290, width: 200, height: 20 }
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
            central_hub: this.add.text(this.mapWidth/2, this.mapHeight/2 - 50, '🌌 CENTRAL HUB', {
                fontSize: '18px', fontFamily: 'Arial', color: this.SPACE_COLORS.TEXT_PRIMARY, fontStyle: 'bold'
            }).setOrigin(0.5),
            
            ai_ml: this.add.text(400, 320, '🤖 AI/ML LAB', {
                fontSize: '14px', fontFamily: 'Arial', color: this.SPACE_COLORS.TEXT_PRIMARY, fontStyle: 'bold'
            }).setOrigin(0.5),
            
            networking: this.add.text(this.mapWidth - 400, 320, '🌐 NETWORK CENTER', {
                fontSize: '14px', fontFamily: 'Arial', color: this.SPACE_COLORS.TEXT_PRIMARY, fontStyle: 'bold'
            }).setOrigin(0.5),
            
            library: this.add.text(400, this.mapHeight - 375, '📚 DIGITAL LIBRARY', {
                fontSize: '14px', fontFamily: 'Arial', color: this.SPACE_COLORS.TEXT_PRIMARY, fontStyle: 'bold'
            }).setOrigin(0.5),
            
            computer_lab: this.add.text(this.mapWidth - 400, this.mapHeight - 375, '💻 COMPUTER LAB', {
                fontSize: '14px', fontFamily: 'Arial', color: this.SPACE_COLORS.TEXT_PRIMARY, fontStyle: 'bold'
            }).setOrigin(0.5)
        };
        
        // Add glowing effect to labels
        Object.values(this.roomTexts).forEach(text => {
            text.setStroke(this.SPACE_COLORS.BUTTON_PRIMARY, 2);
            text.setShadow(0, 0, this.SPACE_COLORS.BUTTON_PRIMARY, 3);
        });
        
        // Space station title
       
        const title = this.add.text(
            this.mapWidth/2,
            80,
            '🚀 OFFSIKSHA SPACE STATION 🌌',
            {
                fontSize: '28px',
                fontFamily: 'Arial',
                color: this.SPACE_COLORS.TEXT_PRIMARY,
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);
        
        title.setStroke(this.SPACE_COLORS.ACCENT_CYAN, 3);
        title.setShadow(0, 0, this.SPACE_COLORS.ACCENT_CYAN, 5);
        
        // Add pulsing animation to title
        this.tweens.add({
            targets: title,
            scaleX: { from: 1, to: 1.05 },
            scaleY: { from: 1, to: 1.05 },
            duration: 2000,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
    }
    
    addSpaceDecorations() {
        // Add various space-themed decorations throughout the station
        
        // Holographic terminals in corridors
        const terminalPositions = [
            { x: 150, y: 240 }, { x: 350, y: 240 }, { x: 550, y: 240 },
            { x: this.mapWidth - 150, y: 240 }, { x: this.mapWidth - 350, y: 240 },
            { x: 150, y: this.mapHeight - 240 }, { x: 350, y: this.mapHeight - 240 },
            { x: this.mapWidth - 150, y: this.mapHeight - 240 }
        ];
        
        terminalPositions.forEach(pos => {
            // Terminal base
            const terminal = this.add.rectangle(pos.x, pos.y, 20, 30, this.SPACE_COLORS.UI_PANEL);
            
            // Holographic display
            const display = this.add.rectangle(pos.x, pos.y - 15, 18, 12, this.SPACE_COLORS.ACCENT_CYAN, 0.7);
            
            // Add flickering animation
            this.tweens.add({
                targets: display,
                alpha: { from: 0.7, to: 0.3 },
                duration: Phaser.Math.Between(800, 1500),
                yoyo: true,
                repeat: -1,
                ease: 'Power2'
            });
        });
        
        // Energy conduits along walls
        const conduitData = [
            // Horizontal conduits
            { x: this.mapWidth/2, y: 100, width: this.mapWidth - 200, height: 8 },
            { x: this.mapWidth/2, y: this.mapHeight - 100, width: this.mapWidth - 200, height: 8 },
            // Vertical conduits
            { x: 100, y: this.mapHeight/2, width: 8, height: this.mapHeight - 200 },
            { x: this.mapWidth - 100, y: this.mapHeight/2, width: 8, height: this.mapHeight - 200 }
        ];
        
        conduitData.forEach(conduit => {
            const pipe = this.add.rectangle(conduit.x, conduit.y, conduit.width, conduit.height, this.SPACE_COLORS.ACCENT_PURPLE, 0.6);
            
            // Add energy flow animation
            this.tweens.add({
                targets: pipe,
                alpha: { from: 0.6, to: 1 },
                duration: 1000,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        });
        
        // Add floating data crystals in central hub
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const radius = 120;
            const crystalX = this.mapWidth/2 + Math.cos(angle) * radius;
            const crystalY = this.mapHeight/2 + Math.sin(angle) * radius;
            
            const crystal = this.add.polygon(crystalX, crystalY, [
                [0, -8], [8, -4], [8, 4], [0, 8], [-8, 4], [-8, -4]
            ], this.SPACE_COLORS.DECORATION_PINK, 0.8);
            
            // Floating animation
            this.tweens.add({
                targets: crystal,
                y: crystalY - 10,
                duration: 2000 + i * 200,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
            
            // Rotation animation
            this.tweens.add({
                targets: crystal,
                rotation: Math.PI * 2,
                duration: 4000 + i * 300,
                repeat: -1,
                ease: 'Linear'
            });
        }
    }
    
    createPlayer() {
        // Create space explorer player with modern design
        this.player = this.add.circle(this.mapWidth/2, this.mapHeight/2 + 80, 12, this.SPACE_COLORS.PLAYER);
        
        // Add player glow effect
        const playerGlow = this.add.circle(this.mapWidth/2, this.mapHeight/2 + 80, 18, this.SPACE_COLORS.PLAYER, 0.3);
        
        // Add subtle pulsing animation to player
        this.tweens.add({
            targets: [this.player, playerGlow],
            scaleX: { from: 1, to: 1.1 },
            scaleY: { from: 1, to: 1.1 },
            duration: 1500,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
        });
        
        // Enable physics for the player
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);
        this.player.body.setDrag(300, 300);
        
        // Player-wall collision
        this.physics.add.collider(this.player, this.walls);
    }
    
    setupControls() {
        // Set up keyboard controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys('W,S,A,D');
        
        // ESC key to return to main menu
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.start(SCENES.MAIN_MENU);
        });
        
        // E key for interactions
        this.eKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
    }
    
    createUI() {
        // Create fixed UI elements
        const uiContainer = this.add.container(0, 0);
        uiContainer.setScrollFactor(0);
        uiContainer.setDepth(100);
        
        // Mini-map background
        const miniMapBg = this.add.rectangle(120, 80, 200, 150, this.SPACE_COLORS.UI_PANEL, 0.8);
        miniMapBg.setStrokeStyle(2, this.SPACE_COLORS.BUTTON_PRIMARY);
        uiContainer.add(miniMapBg);
        
        // Mini-map title
        const miniMapTitle = this.add.text(120, 20, '📡 Station Map', {
            fontSize: '14px',
            fontFamily: 'Arial',
            color: this.SPACE_COLORS.TEXT_PRIMARY,
            fontStyle: 'bold'
        }).setOrigin(0.5);
        uiContainer.add(miniMapTitle);
        
        // Control instructions
        const controls = this.add.text(
            this.cameras.main.width - 20,
            20,
            '🎮 Controls:\nArrow Keys / WASD - Move\nE - Interact with Airlocks\nESC - Return to Menu',
            {
                fontSize: '12px',
                fontFamily: 'Arial',
                color: this.SPACE_COLORS.TEXT_SECONDARY,
                align: 'right',
                backgroundColor: this.SPACE_COLORS.UI_PANEL,
                padding: { x: 10, y: 8 }
            }
        ).setOrigin(1, 0);
        uiContainer.add(controls);
        
        // Current location indicator
        this.locationText = this.add.text(
            this.cameras.main.width/2,
            this.cameras.main.height - 40,
            '📍 Current Location: Central Hub',
            {
                fontSize: '16px',
                fontFamily: 'Arial',
                color: this.SPACE_COLORS.TEXT_PRIMARY,
                fontStyle: 'bold',
                backgroundColor: this.SPACE_COLORS.UI_PANEL,
                padding: { x: 15, y: 8 }
            }
        ).setOrigin(0.5);
        this.locationText.setStroke(this.SPACE_COLORS.BUTTON_PRIMARY, 2);
        uiContainer.add(this.locationText);
    }
    
    setupInteractions() {
        // Set up overlap detection with airlocks
        this.physics.add.overlap(this.player, this.doors, (player, door) => {
            this.showInteractionPrompt(door);
        });
        
        // Handle interaction input
        this.eKey.on('down', () => {
            this.handleInteraction();
        });
    }
    
    showInteractionPrompt(door) {
        const promptKey = door.roomType;
        
        // Remove existing prompt if different door
        if (this.currentInteractionDoor && this.currentInteractionDoor !== door) {
            this.hideInteractionPrompt();
        }
        
        this.currentInteractionDoor = door;
        
        // Create or update interaction prompt
        if (!this.interactionPrompts[promptKey]) {
            const promptText = this.add.text(
                door.x,
                door.y - 40,
                `🚪 Press E to enter ${door.roomLabel}`,
                {
                    fontSize: '14px',
                    fontFamily: 'Arial',
                    color: this.SPACE_COLORS.TEXT_PRIMARY,
                    backgroundColor: this.SPACE_COLORS.UI_PANEL,
                    padding: { x: 8, y: 4 }
                }
            ).setOrigin(0.5);
            
            promptText.setStroke(this.SPACE_COLORS.BUTTON_PRIMARY, 2);
            promptText.setDepth(50);
            
            // Add pulsing animation
            this.tweens.add({
                targets: promptText,
                scaleX: { from: 1, to: 1.1 },
                scaleY: { from: 1, to: 1.1 },
                duration: 800,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
            
            this.interactionPrompts[promptKey] = promptText;
        }
        
        this.interactionPrompts[promptKey].setVisible(true);
    }
    
    hideInteractionPrompt() {
        Object.values(this.interactionPrompts).forEach(prompt => {
            prompt.setVisible(false);
        });
        this.currentInteractionDoor = null;
    }
    
    handleInteraction() {
        if (this.currentInteractionDoor) {
            const roomType = this.currentInteractionDoor.roomType;
            
            // Show entering animation
            this.showEnteringAnimation(roomType);
            
            // Transition to specific room scene
            this.time.delayedCall(1000, () => {
                this.scene.start(this.getRoomScene(roomType));
            });
        }
    }
    
    showEnteringAnimation(roomType) {
        // Create entering effect
        const overlay = this.add.rectangle(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            this.cameras.main.width,
            this.cameras.main.height,
            this.SPACE_COLORS.DOOR,
            0
        );
        overlay.setScrollFactor(0);
        overlay.setDepth(200);
        
        // Animate overlay
        this.tweens.add({
            targets: overlay,
            alpha: 0.8,
            duration: 500,
            ease: 'Power2.easeIn'
        });
        
        // Show entering text
        const enteringText = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            `🚀 Entering ${this.currentInteractionDoor.roomLabel}...`,
            {
                fontSize: '24px',
                fontFamily: 'Arial',
                color: this.SPACE_COLORS.TEXT_PRIMARY,
                fontStyle: 'bold'
            }
        ).setOrigin(0.5);
        enteringText.setScrollFactor(0);
        enteringText.setDepth(201);
        
        // Animate text
        this.tweens.add({
            targets: enteringText,
            scaleX: { from: 0, to: 1 },
            scaleY: { from: 0, to: 1 },
            duration: 500,
            ease: 'Back.easeOut'
        });
    }
    
    getRoomScene(roomType) {
        const sceneMap = {
            'ai_ml': SCENES.AI_ML_LAB,
            'networking': SCENES.NETWORKING,
            'library': SCENES.LIBRARY,
            'computer_lab': SCENES.COMPUTER_LAB
        };
        
        return sceneMap[roomType] || SCENES.MAIN_MENU;
    }
    
    update() {
        if (!this.player) return;
        
        // Handle player movement
        this.handlePlayerMovement();
        
        // Update location text based on player position
        this.updateLocationText();
        
        // Check if player is away from doors to hide prompts
        this.checkInteractionDistance();
    }
    
    handlePlayerMovement() {
        const speed = 200;
        let velocityX = 0;
        let velocityY = 0;
        
        // Horizontal movement
        if (this.cursors.left.isDown || this.wasd.A.isDown) {
            velocityX = -speed;
        } else if (this.cursors.right.isDown || this.wasd.D.isDown) {
            velocityX = speed;
        }
        
        // Vertical movement
        if (this.cursors.up.isDown || this.wasd.W.isDown) {
            velocityY = -speed;
        } else if (this.cursors.down.isDown || this.wasd.S.isDown) {
            velocityY = speed;
        }
        
        // Apply movement
        this.player.body.setVelocity(velocityX, velocityY);
    }
    
    updateLocationText() {
        const playerX = this.player.x;
        const playerY = this.player.y;
        
        let currentLocation = 'Central Hub';
        
        // Check if player is in specific areas
        if (playerX > 300 && playerX < 500 && playerY > 300 && playerY < 450) {
            currentLocation = 'AI/ML Laboratory';
        } else if (playerX > this.mapWidth - 500 && playerX < this.mapWidth - 300 && playerY > 300 && playerY < 450) {
            currentLocation = 'Network Center';
        } else if (playerX > 300 && playerX < 500 && playerY > this.mapHeight - 450 && playerY < this.mapHeight - 300) {
            currentLocation = 'Digital Library';
        } else if (playerX > this.mapWidth - 500 && playerX < this.mapWidth - 300 && playerY > this.mapHeight - 450 && playerY < this.mapHeight - 300) {
            currentLocation = 'Computer Laboratory';
        } else if (playerX > 180 && playerX < this.mapWidth - 180 && 
                  (playerY > 200 && playerY < 280 || playerY > this.mapHeight - 280 && playerY < this.mapHeight - 200 ||
                   playerY > this.mapHeight/2 - 40 && playerY < this.mapHeight/2 + 40)) {
            currentLocation = 'Main Corridor';
        } else if (playerY > 180 && playerY < this.mapHeight - 180 && 
                  (playerX > 200 && playerX < 280 || playerX > this.mapWidth - 280 && playerX < this.mapWidth - 200 ||
                   playerX > this.mapWidth/2 - 40 && playerX < this.mapWidth/2 + 40)) {
            currentLocation = 'Main Corridor';
        }
        
        if (this.locationText) {
            this.locationText.setText(`📍 Current Location: ${currentLocation}`);
        }
    }
    
    checkInteractionDistance() {
        if (this.currentInteractionDoor) {
            const distance = Phaser.Math.Distance.Between(
                this.player.x, this.player.y,
                this.currentInteractionDoor.x, this.currentInteractionDoor.y
            );
            
            if (distance > 80) {
                this.hideInteractionPrompt();
            }
        }
    }
}