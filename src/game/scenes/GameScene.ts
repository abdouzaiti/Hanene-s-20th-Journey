import Phaser from 'phaser';
import confetti from 'canvas-confetti';
import { EventBus } from '../../lib/eventBus';
import { playSound } from '../../lib/sounds';

export default class GameScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private abdou!: Phaser.GameObjects.Image;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
  private wasd!: any;
  private cakes!: Phaser.Physics.Arcade.Group;
  private ground!: Phaser.Physics.Arcade.StaticGroup;
  private clouds!: Phaser.GameObjects.Group;
  private age = 0;
  private isEnding = false;

  constructor() {
    super('GameScene');
  }

  create() {
    this.age = 0;
    this.isEnding = false;

    // Create World
    this.physics.world.setBounds(0, 0, 4000, window.innerHeight);

    // Background Parallax Clouds
    this.clouds = this.add.group();
    for (let i = 0; i < 20; i++) {
      const x = Phaser.Math.Between(0, 4000);
      const y = Phaser.Math.Between(50, 300);
      const cloud = this.add.image(x, y, 'cloud');
      cloud.setScrollFactor(Phaser.Math.FloatBetween(0.2, 0.6));
      this.clouds.add(cloud);
    }

    // Ground
    this.ground = this.physics.add.staticGroup();
    for (let i = 0; i < 40; i++) {
      this.ground.create(i * 100 + 50, window.innerHeight - 20, 'ground').setScale(1).refreshBody();
    }
    // Add some elevated platforms
    for(let i=1; i<20; i++) {
        if(i % 2 === 0) continue;
        const x = i * 200;
        const y = window.innerHeight - 80 - Phaser.Math.Between(0, 50);
        this.ground.create(x, y, 'ground');
        this.ground.create(x + 100, y, 'ground');
    }

    // Player
    this.player = this.physics.add.sprite(100, window.innerHeight - 100, 'standing');
    
    // Abdou
    this.abdou = this.add.image(3800, window.innerHeight - 80, 'abdou');
    this.abdou.setScale(0.13);
    
    // Scale down the NPC
    this.player.setScale(0.15); // Adjust this value to make it smaller or larger as needed
    this.player.setCollideWorldBounds(true);
    this.player.setBounce(0.1);
    this.physics.add.collider(this.player, this.ground);

    // Cakes
    this.cakes = this.physics.add.group();
    
    // Spread exactly 20 cakes
    for (let i = 0; i < 20; i++) {
      const x = 300 + (i * 180);
      const y = window.innerHeight - 180 - Phaser.Math.Between(0, 40);
      const cake = this.cakes.create(x, y, 'cake');
      cake.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
      
      // Add floating animation
      this.tweens.add({
        targets: cake,
        y: cake.y - 15,
        duration: 1500,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }

    this.physics.add.collider(this.cakes, this.ground);
    this.physics.add.overlap(this.player, this.cakes, this.collectCake as any, undefined, this);

    // Controls
    if (this.input.keyboard) {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.wasd = this.input.keyboard.addKeys({
            up: Phaser.Input.Keyboard.KeyCodes.W,
            down: Phaser.Input.Keyboard.KeyCodes.S,
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D
        });
    }

    // Mobile Touch Controls
    this.input.addPointer(2); // Allow multi-touch


    // Camera
    this.cameras.main.setBounds(0, 0, 4000, window.innerHeight);
    this.cameras.main.setZoom(0.7);
    this.cameras.main.startFollow(this.player, true, 0.05, 0.05);

    this.scale.on('resize', (gameSize: Phaser.Structs.Size) => {
        this.cameras.main.setSize(gameSize.width, gameSize.height);
        this.physics.world.setBounds(0, 0, 4000, gameSize.height);
    });
  }

  update() {
    if (this.isEnding) return;
    
    let left = this.cursors?.left.isDown || this.wasd?.left.isDown;
    let right = this.cursors?.right.isDown || this.wasd?.right.isDown;
    let up = this.cursors?.up.isDown || this.wasd?.up.isDown || this.cursors?.space.isDown;

    // Handle Touch
    const pointer1 = this.input.pointer1;
    const pointer2 = this.input.pointer2;
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    const checkPointer = (pointer: Phaser.Input.Pointer) => {
        if (pointer.isDown && pointer.y > height * 0.6) {
            if (pointer.x < width * 0.25) left = true;
            else if (pointer.x > width * 0.25 && pointer.x < width * 0.5) right = true;
            else if (pointer.x > width * 0.7) up = true;
        }
    };

    checkPointer(pointer1);
    checkPointer(pointer2);

    if (this.player.body?.touching.down) {
      if (left) {
        this.player.setVelocityX(-200);
        this.player.setTexture('running');
        this.player.setFlipX(true);
      } else if (right) {
        this.player.setVelocityX(200);
        this.player.setTexture('running');
        this.player.setFlipX(false);
      } else {
        this.player.setVelocityX(0);
        this.player.setTexture('standing');
      }
    } else {
      if (left) {
        this.player.setVelocityX(-200);
        this.player.setFlipX(true);
      } else if (right) {
        this.player.setVelocityX(200);
        this.player.setFlipX(false);
      } else {
        this.player.setVelocityX(0);
      }
    }

    if (up && this.player.body?.touching.down) {
      this.player.setVelocityY(-500);
      this.player.setTexture('jumping');
      
      // Jump dust
      this.createParticles(this.player.x, this.player.y + 16, 0xffffff);
      playSound('jump');
    }
  }

  private collectCake(player: Phaser.Physics.Arcade.Sprite, cake: Phaser.Physics.Arcade.Sprite) {
    this.tweens.killTweensOf(cake);
    cake.disableBody(true, true);
    this.age += 1;
    
    // Sparkles
    this.createParticles(cake.x, cake.y, 0xff1493);
    playSound('collect');

    // Notify React
    EventBus.emit('age-updated', this.age);

    if (this.age % 5 === 0 && this.age < 20) {
      this.triggerMilestoneEffect();
    }

    if (this.age >= 20) {
      this.triggerEnding();
    }
  }

  private createParticles(x: number, y: number, color: number) {
    const particles = this.add.particles(x, y, 'cake', {
      speed: { min: -100, max: 100 },
      angle: { min: 0, max: 360 },
      scale: { start: 0.5, end: 0 },
      tint: color,
      lifespan: 600,
      quantity: 10,
      blendMode: 'ADD'
    });
    
    this.time.delayedCall(600, () => {
      particles.destroy();
    });
  }

  private triggerMilestoneEffect() {
    this.cameras.main.shake(200, 0.005);
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#ffc0cb', '#ff69b4', '#ff1493']
    });
  }

  private triggerEnding() {
    this.isEnding = true;
    this.player.setVelocityX(0);
    this.player.setTexture('running');

    // Walk to Abdou
    this.tweens.add({
      targets: this.player,
      x: this.abdou.x - 60,
      duration: 1500,
      onComplete: () => {
        this.player.setTexture('standing');
        this.player.setFlipX(false);
        this.abdou.setTexture('happyabdou');
        
        // After 1s, show finish1
        setTimeout(() => {
          this.abdou.setTexture('finish1');
          this.player.setVisible(false);
          
          // Wait 2s, then turn to finish2
          setTimeout(() => {
            this.abdou.setTexture('finish2');
            
            // Wait 1s, then turn back to finish1
            setTimeout(() => {
              this.abdou.setTexture('finish1');
              
              // Wait 1s, then turn back to finish2
              setTimeout(() => {
                this.abdou.setTexture('finish2');
                
                // Camera Zoom & Pan to Abdou
                this.cameras.main.pan(this.abdou.x + 50, this.abdou.y, 1000);
                this.cameras.main.zoomTo(3, 1000); // Zoom in significantly
                
                // Wait 3s then win
                setTimeout(() => {
                    this.finishGame();
                }, 3000);
              }, 1000); // 1s delay
            }, 1000); // 1s delay
          }, 2000); // 2s delay
        }, 1000); // 1s delay
      }
    });

    playSound('win');
  }

  private finishGame() {
    // Massive Confetti
    const endConfetti = setInterval(() => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: ['#ffc0cb', '#ff69b4', '#ff1493']
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: ['#ffc0cb', '#ff69b4', '#ff1493']
      });
    }, 250);

    setTimeout(() => clearInterval(endConfetti), 3000);

    // Wait then notify React to switch route
    setTimeout(() => {
      EventBus.emit('game-win');
    }, 3500);
  }
}
