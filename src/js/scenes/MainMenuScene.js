class MainMenuScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENES.MAIN_MENU
        });
    }

    create() {
        // Initialize gamification system
        this.initializeGameSystem();
        
        // Background with pixel aesthetic
        this.createPixelatedBackground();
        
        // Animated pixel clouds
        this.createPixelClouds();
        
        // Title with gamified elements
        this.createGameTitle();
        
        // Achievement system display
        this.createAchievementSystem();
        
        // Gamified menu options
        this.createGameMenu();
        
        // Player stats and progress
        this.createPlayerStats();
        
        // Version info with pixel styling
        this.createVersionInfo();
        
        // Start animations
        this.startPixelAnimations();
        
        // Add educational particles
        this.createEducationalParticles();
    }
    
    
    initializeGameSystem() {
        // Mock player data - in real app, load from storage
        this.playerData = {
            level: 12,
            xp: 2450,
            xpToNext: 3000,
            coins: 847,
            streak: 7,
            achievements: 15,
            totalAchievements: 50,
            subjects: {
                math: { level: 8, progress: 65 },
                science: { level: 6, progress: 30 },
                english: { level: 10, progress: 80 },
                history: { level: 4, progress: 15 }
            }
        };
    }
    
    createPixelatedBackground() {
        // Pixel-perfect gradient background
        const bg = this.add.graphics();
        
        // Create layered pixel background
        for (let y = 0; y < this.cameras.main.height; y += 4) {
            const alpha = 1 - (y / this.cameras.main.height) * 0.3;
            const colorTop = Phaser.Display.Color.Interpolate.ColorWithColor(
                { r: 26, g: 26, b: 46 },
                { r: 15, g: 50, b: 96 },
                100,
                y / this.cameras.main.height * 100
            );
            
            bg.fillStyle(Phaser.Display.Color.GetColor(colorTop.r, colorTop.g, colorTop.b), alpha);
            bg.fillRect(0, y, this.cameras.main.width, 4);
        }
        
        // Add pixel grid overlay
        this.createPixelGrid();
        
        // Create animated pixel buildings
        this.createPixelCityscape();
        
        // Add floating pixel platforms
        this.createFloatingPlatforms();
    }
    
    createPixelGrid() {
        const grid = this.add.graphics();
        grid.lineStyle(1, 0x3498db, 0.1);
        
        // Vertical lines
        for (let x = 0; x < this.cameras.main.width; x += 32) {
            grid.moveTo(x, 0);
            grid.lineTo(x, this.cameras.main.height);
        }
        
        // Horizontal lines
        for (let y = 0; y < this.cameras.main.height; y += 32) {
            grid.moveTo(0, y);
            grid.lineTo(this.cameras.main.width, y);
        }
        
        grid.strokePath();
    }
    
    createPixelCityscape() {
        this.buildings = [];
        const buildingData = [
            { x: 50, width: 64, height: 120, color: 0x2c3e50 },
            { x: 120, width: 48, height: 96, color: 0x34495e },
            { x: 180, width: 32, height: 80, color: 0x2c3e50 },
            { x: this.cameras.main.width - 150, width: 80, height: 140, color: 0x34495e },
            { x: this.cameras.main.width - 60, width: 56, height: 100, color: 0x2c3e50 }
        ];
        
        buildingData.forEach((building, index) => {
            const container = this.add.container(building.x, this.cameras.main.height - building.height/2 - 20);
            
            // Main building body
            const body = this.add.rectangle(0, 0, building.width, building.height, building.color);
            
            // Pixel windows
            this.createPixelWindows(container, building.width, building.height);
            
            // Building antenna/details
            const antenna = this.add.rectangle(0, -building.height/2 - 10, 4, 20, 0xe74c3c);
            const antennaLight = this.add.circle(0, -building.height/2 - 20, 3, 0xff0000);
            
            container.add([body, antenna, antennaLight]);
            this.buildings.push({ container, light: antennaLight });
            
            // Animate antenna lights
            this.tweens.add({
                targets: antennaLight,
                alpha: { from: 0.3, to: 1 },
                duration: 1000 + index * 300,
                yoyo: true,
                repeat: -1
            });
        });
    }
    
    createPixelWindows(container, buildingWidth, buildingHeight) {
        const windowSize = 8;
        const windowSpacing = 12;
        const rows = Math.floor(buildingHeight / windowSpacing) - 2;
        const cols = Math.floor(buildingWidth / windowSpacing) - 1;
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                if (Math.random() > 0.3) { // Not all windows are lit
                    const x = -buildingWidth/2 + (col + 1) * windowSpacing;
                    const y = -buildingHeight/2 + (row + 2) * windowSpacing;
                    
                    const windowColor = Math.random() > 0.5 ? 0xf39c12 : 0x3498db;
                    const window = this.add.rectangle(x, y, windowSize, windowSize, windowColor, 0.8);
                    container.add(window);
                    
                    // Random window flickering
                    if (Math.random() > 0.7) {
                        this.tweens.add({
                            targets: window,
                            alpha: { from: 0.3, to: 0.9 },
                            duration: Phaser.Math.Between(2000, 4000),
                            yoyo: true,
                            repeat: -1
                        });
                    }
                }
            }
        }
    }
    
    createFloatingPlatforms() {
        this.platforms = [];
        const platformData = [
            { x: 200, y: 150, width: 96, height: 16 },
            { x: 400, y: 200, width: 80, height: 16 },
            { x: 600, y: 120, width: 64, height: 16 },
            { x: 300, y: 350, width: 112, height: 16 }
        ];
        
        platformData.forEach((platform, index) => {
            const container = this.add.container(platform.x, platform.y);
            
            // Platform base
            const base = this.add.rectangle(0, 0, platform.width, platform.height, 0x2ecc71);
            
            // Pixel decoration
            const decoration = this.add.rectangle(0, -platform.height/2 - 2, platform.width - 8, 4, 0x27ae60);
            
            // Floating crystals on platform
            const crystal = this.add.polygon(0, -platform.height - 8, [0, -8, 6, 0, 0, 8, -6, 0], 0x9b59b6);
            
            container.add([base, decoration, crystal]);
            this.platforms.push(container);
            
            // Floating animation
            this.tweens.add({
                targets: container,
                y: platform.y - 15,
                duration: 2000 + index * 500,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
            
            // Crystal glow
            this.tweens.add({
                targets: crystal,
                alpha: { from: 0.6, to: 1 },
                scale: { from: 0.8, to: 1.2 },
                duration: 1500,
                yoyo: true,
                repeat: -1
            });
        });
    }
    
    createPixelClouds() {
        for (let i = 0; i < 8; i++) {
            const cloud = this.createPixelCloud(
                Phaser.Math.Between(0, this.cameras.main.width),
                Phaser.Math.Between(50, 150),
                Phaser.Math.Between(32, 64)
            );
            
            // Drifting animation
            this.tweens.add({
                targets: cloud,
                x: cloud.x + Phaser.Math.Between(100, 200),
                duration: Phaser.Math.Between(15000, 25000),
                repeat: -1,
                onRepeat: () => {
                    cloud.x = -100;
                }
            });
        }
    }
    
    createPixelCloud(x, y, size) {
        const cloud = this.add.container(x, y);
        const cloudColor = 0xecf0f1;
        const alpha = 0.6;
        
        // Create pixel cloud shape
        const pixels = [
            { x: 0, y: 0, size: size * 0.8 },
            { x: size * 0.3, y: -size * 0.2, size: size * 0.6 },
            { x: -size * 0.3, y: -size * 0.1, size: size * 0.5 },
            { x: size * 0.5, y: size * 0.1, size: size * 0.4 },
            { x: -size * 0.4, y: size * 0.2, size: size * 0.3 }
        ];
        
        pixels.forEach(pixel => {
            const rect = this.add.rectangle(pixel.x, pixel.y, pixel.size, pixel.size/2, cloudColor, alpha);
            cloud.add(rect);
        });
        
        return cloud;
    }
    
    createGameTitle() {
        // Main title with pixel font effect
        const title = this.add.text(
            this.cameras.main.centerX, 
            180, 
            'OFFSIKSHA', 
            { 
                fontSize: '48px', 
                fontFamily: 'monospace',
                color: '#ffffff',
                stroke: '#3498db',
                strokeThickness: 3
            }
        );
        title.setOrigin(0.5);
        
        // Pixel subtitle with game elements
        const subtitle = this.add.text(
            this.cameras.main.centerX, 
            220, 
            '★ LEARN • PLAY • ACHIEVE ★', 
            { 
                fontSize: '14px', 
                fontFamily: 'monospace', 
                color: '#f39c12'
            }
        );
        subtitle.setOrigin(0.5);
        
        // Add level indicator to title
        const levelBadge = this.add.container(this.cameras.main.centerX + 200, 180);
        const badge = this.add.rectangle(0, 0, 60, 24, 0xe74c3c);
        const levelText = this.add.text(0, 0, `LVL ${this.playerData.level}`, {
            fontSize: '12px',
            fontFamily: 'monospace',
            color: '#ffffff'
        });
        levelText.setOrigin(0.5);
        levelBadge.add([badge, levelText]);
        
        // Pulsing animations
        this.tweens.add({
            targets: title,
            scale: { from: 1, to: 1.05 },
            duration: 2000,
            yoyo: true,
            repeat: -1
        });
    }
    
    createAchievementSystem() {
        // Achievement banner
        const achievementBanner = this.add.container(this.cameras.main.width - 150, 80);
        
        const bannerBg = this.add.rectangle(0, 0, 140, 60, 0x8e44ad, 0.9);
        const bannerTitle = this.add.text(0, -15, 'ACHIEVEMENTS', {
            fontSize: '10px',
            fontFamily: 'monospace',
            color: '#ffffff'
        });
        bannerTitle.setOrigin(0.5);
        
        const achievementCount = this.add.text(0, 0, `${this.playerData.achievements}/${this.playerData.totalAchievements}`, {
            fontSize: '16px',
            fontFamily: 'monospace',
            color: '#f1c40f'
        });
        achievementCount.setOrigin(0.5);
        
        const progressBar = this.add.rectangle(0, 15, 100, 8, 0x34495e);
        const progressFill = this.add.rectangle(
            -50 + (this.playerData.achievements / this.playerData.totalAchievements * 100) / 2, 
            15, 
            this.playerData.achievements / this.playerData.totalAchievements * 100, 
            8, 
            0x2ecc71
        );
        
        achievementBanner.add([bannerBg, bannerTitle, achievementCount, progressBar, progressFill]);
        
        // Recent achievements popup
        this.showRecentAchievement();
    }
    
    showRecentAchievement() {
        const achievements = [
            "🎯 First Steps Taken!",
            "📚 Bookworm - Read 10 lessons",
            "⚡ Speed Learner - 5 day streak!",
            "🏆 Math Master - Level 5 reached"
        ];
        
        setTimeout(() => {
            const popup = this.add.container(this.cameras.main.centerX, 100);
            
            const bg = this.add.rectangle(0, 0, 280, 50, 0xf39c12, 0.95);
            const text = this.add.text(0, -5, "🏆 ACHIEVEMENT UNLOCKED!", {
                fontSize: '12px',
                fontFamily: 'monospace',
                color: '#ffffff'
            });
            text.setOrigin(0.5);
            
            const achievementText = this.add.text(0, 10, Phaser.Utils.Array.GetRandom(achievements), {
                fontSize: '10px',
                fontFamily: 'monospace',
                color: '#ffffff'
            });
            achievementText.setOrigin(0.5);
            
            popup.add([bg, text, achievementText]);
            popup.setAlpha(0);
            
            // Slide in animation
            this.tweens.add({
                targets: popup,
                alpha: 1,
                y: 120,
                duration: 500,
                ease: 'Back.easeOut'
            });
            
            // Auto hide
            this.time.delayedCall(3000, () => {
                this.tweens.add({
                    targets: popup,
                    alpha: 0,
                    y: 80,
                    duration: 300,
                    onComplete: () => popup.destroy()
                });
            });
        }, 2000);
    }
    
    createPlayerStats() {
        // Player stats panel
        const statsPanel = this.add.container(80, 80);
        
        const panelBg = this.add.rectangle(0, 0, 120, 100, 0x2c3e50, 0.9);
        
        // XP Bar
        const xpLabel = this.add.text(-50, -35, 'XP', {
            fontSize: '10px',
            fontFamily: 'monospace',
            color: '#3498db'
        });
        
        const xpBar = this.add.rectangle(-10, -35, 80, 8, 0x34495e);
        const xpFill = this.add.rectangle(
            -50 + ((this.playerData.xp / this.playerData.xpToNext) * 80) / 2,
            -35,
            (this.playerData.xp / this.playerData.xpToNext) * 80,
            8,
            0x3498db
        );
        
        // Coins
        const coinsText = this.add.text(0, -15, `💰 ${this.playerData.coins}`, {
            fontSize: '12px',
            fontFamily: 'monospace',
            color: '#f1c40f'
        });
        coinsText.setOrigin(0.5);
        
        // Streak
        const streakText = this.add.text(0, 0, `🔥 ${this.playerData.streak} Day Streak`, {
            fontSize: '10px',
            fontFamily: 'monospace',
            color: '#e74c3c'
        });
        streakText.setOrigin(0.5);
        
        // Level
        const levelText = this.add.text(0, 20, `LEVEL ${this.playerData.level}`, {
            fontSize: '14px',
            fontFamily: 'monospace',
            color: '#2ecc71'
        });
        levelText.setOrigin(0.5);
        
        statsPanel.add([panelBg, xpLabel, xpBar, xpFill, coinsText, streakText, levelText]);
    }
    
    createGameMenu() {
        const buttonData = [
            { 
                text: '🎮 START ADVENTURE', 
                icon: '▶',
                color: 0x2ecc71,
                action: () => this.startGame(),
                unlock: true
            },
            { 
                text: '📊 PROGRESS HUB', 
                icon: '📈',
                color: 0x3498db,
                action: () => this.openProgress(),
                unlock: true
            },
            { 
                text: '🏪 SKILL SHOP', 
                icon: '🛒',
                color: 0xf39c12,
                action: () => this.openShop(),
                unlock: this.playerData.level >= 5
            },
            { 
                text: '⚙️ SETTINGS', 
                icon: '⚙',
                color: 0x95a5a6,
                action: () => this.openOptions(),
                unlock: true
            }
        ];
        
        this.menuButtons = [];
        const startY = 300;
        const spacing = 55;
        
        buttonData.forEach((button, index) => {
            const buttonY = startY + index * spacing;
            const container = this.add.container(this.cameras.main.centerX, buttonY);
            
            // Button background with pixel styling
            const bg = this.add.rectangle(0, 0, 300, 40, button.unlock ? button.color : 0x7f8c8d, 0.8);
            
            // Pixel border effect
            const border = this.add.rectangle(0, 0, 304, 44, 0xffffff, 0);
            border.setStrokeStyle(2, button.unlock ? button.color : 0x95a5a6, 1);
            
            // Button text
            const text = this.add.text(0, 0, button.unlock ? button.text : '🔒 LOCKED', {
                fontSize: '14px',
                fontFamily: 'monospace',
                color: button.unlock ? '#ffffff' : '#bdc3c7'
            });
            text.setOrigin(0.5);
            
            // Unlock requirement text
            if (!button.unlock) {
                const requirement = this.add.text(0, 12, `Reach Level 5`, {
                    fontSize: '8px',
                    fontFamily: 'monospace',
                    color: '#95a5a6'
                });
                requirement.setOrigin(0.5);
                container.add(requirement);
            }
            
            container.add([border, bg, text]);
            
            if (button.unlock) {
                // Interactive effects
                bg.setInteractive({ useHandCursor: true })
                    .on('pointerover', () => {
                        bg.setFillStyle(Phaser.Display.Color.Interpolate.ColorWithColor(
                            Phaser.Display.Color.IntegerToColor(button.color),
                            { r: 255, g: 255, b: 255 },
                            100, 20
                        ).color, 0.9);
                        text.setScale(1.05);
                        container.setDepth(10);
                    })
                    .on('pointerout', () => {
                        bg.setFillStyle(button.color, 0.8);
                        text.setScale(1);
                        container.setDepth(0);
                    })
                    .on('pointerdown', () => {
                        container.setScale(0.95);
                    })
                    .on('pointerup', () => {
                        container.setScale(1);
                        button.action();
                    });
            }
            
            this.menuButtons.push(container);
        });
        
        // Animate buttons in
        this.menuButtons.forEach((button, index) => {
            button.x = this.cameras.main.width + 200;
            this.tweens.add({
                targets: button,
                x: this.cameras.main.centerX,
                duration: 600,
                delay: 800 + index * 150,
                ease: 'Back.easeOut'
            });
        });
    }
    
    createEducationalParticles() {
        const educationIcons = ['📚', '🔬', '🧮', '🌍', '💡', '🎨', '🎵', '⚡'];
        
        for (let i = 0; i < 15; i++) {
            const icon = Phaser.Utils.Array.GetRandom(educationIcons);
            const x = Phaser.Math.Between(100, this.cameras.main.width - 100);
            const y = this.cameras.main.height + 50;
            
            const particle = this.add.text(x, y, icon, {
                fontSize: '20px'
            });
            
            // Floating upward animation
            this.tweens.add({
                targets: particle,
                y: -50,
                x: x + Phaser.Math.Between(-50, 50),
                alpha: { from: 0.8, to: 0 },
                scale: { from: 0.5, to: 1.2 },
                rotation: Phaser.Math.Between(-0.5, 0.5),
                duration: Phaser.Math.Between(8000, 12000),
                delay: Phaser.Math.Between(0, 5000),
                onComplete: () => {
                    particle.destroy();
                }
            });
        }
        
        // Continuously spawn new particles
        this.time.addEvent({
            delay: 2000,
            callback: () => {
                if (this.scene.isActive()) {
                    const icon = Phaser.Utils.Array.GetRandom(educationIcons);
                    const x = Phaser.Math.Between(100, this.cameras.main.width - 100);
                    const particle = this.add.text(x, this.cameras.main.height + 50, icon, {
                        fontSize: '16px'
                    });
                    
                    this.tweens.add({
                        targets: particle,
                        y: -50,
                        alpha: { from: 0.6, to: 0 },
                        duration: 10000,
                        onComplete: () => particle.destroy()
                    });
                }
            },
            loop: true
        });
    }
startPixelAnimations() {
        // Animate buildings gently
        this.buildings.forEach((building, index) => {
            this.tweens.add({
                targets: building.container,
                y: building.container.y - 5,
                duration: 3000 + index * 500,
                yoyo: true,
                repeat: -1,
                ease: 'Sine.easeInOut'
            });
        });
    }
    
    createVersionInfo() {
        const versionContainer = this.add.container(15, this.cameras.main.height - 15);
        
        const versionBg = this.add.rectangle(0, 0, 200, 20, 0x2c3e50, 0.8);
        const versionText = this.add.text(0, 0, 'v2.0 - Gamified Learning Platform', {
            fontSize: '10px',
            fontFamily: 'monospace',
            color: '#bdc3c7'
        });
        versionText.setOrigin(0.5);
        
        versionContainer.add([versionBg, versionText]);
    }
    
    // Menu Actions
    startGame() {
        console.log('🎮 Starting learning adventure...');
        
        // Show transition effect
        const transition = this.add.rectangle(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            this.cameras.main.width,
            this.cameras.main.height,
            0x000000,
            0
        );
        
        this.tweens.add({
            targets: transition,
            alpha: 1,
            duration: 500,
            onComplete: () => {
                this.scene.start(SCENES.CLASSROOM);
            }
        });
    }
    
    openProgress() {
        console.log('📊 Opening progress hub...');
        this.showGameFeature('Progress Hub', 'Track your learning journey!\n📈 View stats & achievements\n🎯 Set learning goals');
    }
    
    openShop() {
        console.log('🏪 Opening skill shop...');
        this.showGameFeature('Skill Shop', 'Upgrade your learning!\n💎 Unlock new features\n🎁 Redeem rewards');
    }
    
    openOptions() {
        console.log('⚙️ Opening settings...');
        this.showGameFeature('Settings', 'Customize your experience!\n🔊 Audio settings\n🎨 Theme options');
    }
    
    showGameFeature(title, description) {
        const popup = this.add.container(this.cameras.main.centerX, this.cameras.main.centerY);
        
        // Popup background
        const bg = this.add.rectangle(0, 0, 300, 200, 0x2c3e50, 0.95);
        const border = this.add.rectangle(0, 0, 304, 204, 0x3498db, 0);
        border.setStrokeStyle(3, 0x3498db, 1);
        
        // Title
        const titleText = this.add.text(0, -60, title, {
            fontSize: '18px',
            fontFamily: 'monospace',
            color: '#3498db'
        });
        titleText.setOrigin(0.5);
        
        // Description
        const descText = this.add.text(0, -10, description, {
            fontSize: '12px',
            fontFamily: 'monospace',
            color: '#ffffff',
            align: 'center'
        });
        descText.setOrigin(0.5);
        
        // Coming soon badge
        const badge = this.add.rectangle(0, 40, 150, 30, 0xf39c12);
        const badgeText = this.add.text(0, 40, '🚧 COMING SOON! 🚧', {
            fontSize: '12px',
            fontFamily: 'monospace',
            color: '#ffffff'
        });
        badgeText.setOrigin(0.5);
        
        // Close button
        const closeBtn = this.add.rectangle(120, -80, 40, 25, 0xe74c3c);
        const closeText = this.add.text(120, -80, 'X', {
            fontSize: '14px',
            fontFamily: 'monospace',
            color: '#ffffff'
        });
        closeText.setOrigin(0.5);
        
        closeBtn.setInteractive({ useHandCursor: true })
            .on('pointerup', () => {
                this.tweens.add({
                    targets: popup,
                    alpha: 0,
                    scale: 0.8,
                    duration: 200,
                    onComplete: () => popup.destroy()
                });
            });
        
        popup.add([bg, border, titleText, descText, badge, badgeText, closeBtn, closeText]);
        popup.setAlpha(0);
        popup.setScale(0.8);
        
        // Popup animation
        this.tweens.add({
            targets: popup,
            alpha: 1,
            scale: 1,
            duration: 300,
            ease: 'Back.easeOut'
        });
        
        // Auto-close after 4 seconds
        this.time.delayedCall(4000, () => {
            if (popup.active) {
                this.tweens.add({
                    targets: popup,
                    alpha: 0,
                    scale: 0.8,
                    duration: 200,
                    onComplete: () => popup.destroy()
                });
            }
        });
    }
}