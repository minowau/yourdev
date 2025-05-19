# yourdev
offline-classroom-game/
├── src/
│   ├── assets/
│   │   ├── images/
│   │   │   ├── tiles/
│   │   │   ├── characters/
│   │   │   └── ui/
│   │   ├── audio/
│   │   └── maps/
│   ├── js/
│   │   ├── config/
│   │   │   ├── game-config.js
│   │   │   └── constants.js
│   │   ├── scenes/
│   │   │   ├── BootScene.js
│   │   │   ├── PreloadScene.js
│   │   │   ├── MainMenuScene.js
│   │   │   ├── SchoolMapScene.js
│   │   │   ├── ClassroomScene.js
│   │   │   ├── LibraryScene.js
│   │   │   └── PauseScene.js
│   │   ├── entities/
│   │   │   ├── Player.js
│   │   │   └── NPC.js
│   │   ├── objects/
│   │   │   ├── InteractiveItem.js
│   │   │   ├── ResourceObject.js
│   │   │   └── Door.js
│   │   ├── ui/
│   │   │   ├── ChatInterface.js
│   │   │   ├── ResourceViewer.js
│   │   │   ├── QuizSystem.js
│   │   │   └── Inventory.js
│   │   ├── data/
│   │   │   ├── DataManager.js
│   │   │   ├── StorageManager.js
│   │   │   └── SyncManager.js
│   │   └── utils/
│   │       ├── CollisionHandler.js
│   │       ├── InputHandler.js
│   │       └── AnimationLoader.js
│   ├── content/
│   │   ├── resources/
│   │   │   ├── videos/
│   │   │   ├── documents/
│   │   │   └── quizzes/
│   │   └── course-data/
│   │       ├── lesson1.json
│   │       ├── lesson2.json
│   │       └── course-structure.json
│   ├── index.html
│   ├── main.js
│   └── styles.css
├── public/
│   ├── favicon.ico
│   └── manifest.json
├── dist/            # Production build
├── node_modules/    # Dependencies
├── .gitignore
├── package.json
├── webpack.config.js
├── vite.config.js   # If using Vite
├── LICENSE
└── README.md