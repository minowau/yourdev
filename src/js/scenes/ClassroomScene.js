class ClassroomScene extends Phaser.Scene {
    constructor() {
        super({
            key: SCENES.CLASSROOM
        });
        this.player = null;
        this.cursors = null;
        this.wasd = null;
    }

    create() {
        // Create the classroom environment
        this.createClassroom();
        
        // Create the player
        this.createPlayer();
        
        // Set up controls
        this.setupControls();
        
        // Create UI
        this.createUI();
        
        // Add instructions
        this.showInstructions();
    }
    
    createClassroom() {
        // Create floor
        const graphics = this.add.graphics();
        graphics.fillStyle(COLORS.FLOOR);
        graphics.fillRect(0, 0, this.cameras.main.width, this.cameras.main.height);
        
        // Create walls
        graphics.fillStyle(COLORS.WALL);
        graphics.fillRect(0, 0, this.cameras.main.width, 20); // Top wall
        graphics.fillRect(0, this.cameras.main.height - 20, this.cameras.main.width, 20); // Bottom wall
        graphics.fillRect(0, 0, 20, this.cameras.main.height); // Left wall
        graphics.fillRect(this.cameras.main.width - 20, 0, 20, this.cameras.main.height); // Right wall
        
        // Create blackboard at the front
        graphics.fillStyle(COLORS.BOARD);
        graphics.fillRect(this.cameras.main.centerX - 150, 40, 300, 80);
        
        // Add blackboard text
        this.add.text(
            this.cameras.main.centerX,
            80,
            'Welcome to the Classroom!',
            {
                fontSize: '18px',
                fontFamily: 'Arial',
                color: '#ffffff'
            }
        ).setOrigin(0.5);
        
        // Create desks
        this.createDesks();
        
        // Create physics walls
        this.createPhysicsWalls();
    }
    
    createDesks() {
        const graphics = this.add.graphics();
        graphics.fillStyle(COLORS.DESK);
        
        // Create a 3x4 grid of desks
        const deskWidth = 60;
        const deskHeight = 40;
        const spacing = 20;
        const startX = this.cameras.main.centerX - (3 * deskWidth + 2 * spacing) / 2;
        const startY = 200;
        
        this.desks = this.physics.add.staticGroup();
        
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 3; col++) {
                const x = startX + col * (deskWidth + spacing);
                const y = startY + row * (deskHeight + spacing);
                
                // Draw desk
                graphics.fillRect(x, y, deskWidth, deskHeight);
                
                // Create physics body for collision
                const desk = this.add.rectangle(x + deskWidth/2, y + deskHeight/2, deskWidth, deskHeight);
                desk.setVisible(false);
                this.physics.add.existing(desk, true);
                this.desks.add(desk);
            }
        }
    }
    
    createPhysicsWalls() {
        this.walls = this.physics.add.staticGroup();
        
        // Top wall
        const topWall = this.add.rectangle(this.cameras.main.centerX, 10, this.cameras.main.width, 20);
        topWall.setVisible(false);
        this.physics.add.existing(topWall, true);
        this.walls.add(topWall);
        
        // Bottom wall
        const bottomWall = this.add.rectangle(this.cameras.main.centerX, this.cameras.main.height - 10, this.cameras.main.width, 20);
        bottomWall.setVisible(false);
        this.physics.add.existing(bottomWall, true);
        this.walls.add(bottomWall);
        
        // Left wall
        const leftWall = this.add.rectangle(10, this.cameras.main.centerY, 20, this.cameras.main.height);
        leftWall.setVisible(false);
        this.physics.add.existing(leftWall, true);
        this.walls.add(leftWall);
        
        // Right wall
        const rightWall = this.add.rectangle(this.cameras.main.width - 10, this.cameras.main.centerY, 20, this.cameras.main.height);
        rightWall.setVisible(false);
        this.physics.add.existing(rightWall, true);
        this.walls.add(rightWall);
        
        // Blackboard collision
        const blackboard = this.add.rectangle(this.cameras.main.centerX, 80, 300, 80);
        blackboard.setVisible(false);
        this.physics.add.existing(blackboard, true);
        this.walls.add(blackboard);
    }
    
    createPlayer() {
        // Create a simple colored rectangle as the player
        this.player = this.add.rectangle(
            this.cameras.main.centerX, 
            this.cameras.main.height - 100, 
            PLAYER_SIZE, 
            PLAYER_SIZE, 
            COLORS.PLAYER
        );
        
        // Add physics to the player
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);
        
        // Set up collisions
        this.physics.add.collider(this.player, this.walls);
        this.physics.add.collider(this.player, this.desks);
    }
    
    setupControls() {
        // Create cursor keys
        this.cursors = this.input.keyboard.createCursorKeys();
        
        // Create WASD keys
        this.wasd = this.input.keyboard.addKeys('W,S,A,D');
        
        // Add escape key to return to menu
        this.input.keyboard.on('keydown-ESC', () => {
            this.scene.start(SCENES.MAIN_MENU);
        });
    }
    
    createUI() {
        // Create a UI panel at the top
        const uiPanel = this.add.rectangle(
            this.cameras.main.centerX,
            15,
            this.cameras.main.width - 40,
            30,
            0x000000,
            0.7
        );
        uiPanel.setDepth(100);
        
        // Add back button
        const backButton = this.add.text(
            30,
            15,
            '← Back to Menu',
            {
                fontSize: '14px',
                fontFamily: 'Arial',
                color: '#ffffff'
            }
        );
        backButton.setOrigin(0, 0.5);
        backButton.setDepth(101);
        backButton.setInteractive({ useHandCursor: true });
        backButton.on('pointerdown', () => {
            this.scene.start(SCENES.MAIN_MENU);
        });
        
        // Add player position display
        this.positionText = this.add.text(
            this.cameras.main.width - 30,
            15,
            'Position: (0, 0)',
            {
                fontSize: '12px',
                fontFamily: 'Arial',
                color: '#ffffff'
            }
        );
        this.positionText.setOrigin(1, 0.5);
        this.positionText.setDepth(101);
    }
    
    showInstructions() {
        // Show movement instructions
        const instructions = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.height - 60,
            'Use ARROW KEYS or WASD to move • ESC to return to menu',
            {
                fontSize: '14px',
                fontFamily: 'Arial',
                color: '#000000',
                backgroundColor: '#ffffff',
                padding: { x: 10, y: 5 }
            }
        );
        instructions.setOrigin(0.5);
        instructions.setDepth(100);
        
        // Make instructions fade out after 5 seconds
        this.tweens.add({
            targets: instructions,
            alpha: 0,
            duration: 1000,
            delay: 4000,
            onComplete: () => instructions.destroy()
        });
    }
    
    update() {
        if (!this.player) return;
        
        // Reset velocity
        this.player.body.setVelocity(0);
        
        // Handle movement
        if (this.cursors.left.isDown || this.wasd.A.isDown) {
            this.player.body.setVelocityX(-PLAYER_SPEED);
        }
        else if (this.cursors.right.isDown || this.wasd.D.isDown) {
            this.player.body.setVelocityX(PLAYER_SPEED);
        }
        
        if (this.cursors.up.isDown || this.wasd.W.isDown) {
            this.player.body.setVelocityY(-PLAYER_SPEED);
        }
        else if (this.cursors.down.isDown || this.wasd.S.isDown) {
            this.player.body.setVelocityY(PLAYER_SPEED);
        }
        
        // Update position display
        if (this.positionText) {
            this.positionText.setText(
                `Position: (${Math.round(this.player.x)}, ${Math.round(this.player.y)})`
            );
        }
    }
}