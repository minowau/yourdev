// Game configuration
const gameconfig = {
    type: Phaser.AUTO,
    parent: 'game-container',
    width: GAME_WIDTH,
    height: GAME_HEIGHT,
    scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    backgroundColor: '#2d2d2d',
    scene: [
        Booting,
        MainMenuScene,
        ClassroomScene
    ],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    },
    pixelArt: true,
    render: {
        antialias: false,
        pixelArt: true,
        roundPixels: true
    }
};