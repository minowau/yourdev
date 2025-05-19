// Initialize the game when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Create the Phaser game instance with our config
    const game = new Phaser.Game(gameConfig);
    
    // Handle resize events
    window.addEventListener('resize', () => {
        if (game.isBooted) {
            game.scale.resize(window.innerWidth, window.innerHeight);
            // Update any active scenes that need to respond to resize
            game.scene.scenes.forEach(scene => {
                if (scene.cameras && scene.cameras.main) {
                    scene.cameras.main.setSize(window.innerWidth, window.innerHeight);
                }
            });
        }
    });
    
    // Make game instance globally accessible for debugging
    window.game = game;
    
    // Add offline/online event handlers
    window.addEventListener('online', () => {
        console.log('Application is online');
        // You could add online functionality here later
    });
    
    window.addEventListener('offline', () => {
        console.log('Application is offline');
        // Will continue working in offline mode
    });
});