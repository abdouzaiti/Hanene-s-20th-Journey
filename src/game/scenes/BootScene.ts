import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    // Generate placeholder assets since we don't have real files
    if (!this.textures.exists('character')) this.generateCharacterTexture();
    if (!this.textures.exists('cake')) this.generateCakeTexture();
    if (!this.textures.exists('cloud')) this.generateCloudTexture();
    if (!this.textures.exists('ground')) this.generateGroundTexture();
  }

  create() {
    // Create animations from the generated texture
    if (!this.anims.exists('idle')) {
      this.anims.create({
        key: 'idle',
        frames: this.anims.generateFrameNumbers('character', { start: 0, end: 0 }),
        frameRate: 1,
        repeat: -1
      });
    }

    if (!this.anims.exists('run')) {
      this.anims.create({
        key: 'run',
        frames: this.anims.generateFrameNumbers('character', { start: 1, end: 2 }),
        frameRate: 8,
        repeat: -1
      });
    }

    if (!this.anims.exists('jump')) {
      this.anims.create({
        key: 'jump',
        frames: this.anims.generateFrameNumbers('character', { start: 3, end: 3 }),
        frameRate: 1,
        repeat: 0
      });
    }

    this.scene.start('GameScene');
  }

  generateCharacterTexture() {
    // We create a dummy spritesheet (4 frames: idle, run1, run2, jump)
    const graphics = this.add.graphics();
    graphics.fillStyle(0xff69b4, 1); // pink-ish character
    
    // Frame 0: Idle
    graphics.fillCircle(16, 16, 16); 
    // Frame 1: Run 1
    graphics.fillCircle(48, 16, 16);
    // Frame 2: Run 2
    graphics.fillCircle(80, 14, 16);
    // Frame 3: Jump
    graphics.fillCircle(112, 10, 16);
    
    if (this.textures.exists('character_base')) {
      this.textures.remove('character_base');
    }
    graphics.generateTexture('character_base', 128, 32);
    graphics.destroy();

    // Re-register as spritesheet
    const tex = this.textures.get('character_base');
    const img = tex.getSourceImage() as HTMLCanvasElement;
    if (this.textures.exists('character')) {
      this.textures.remove('character');
    }
    this.textures.addSpriteSheet('character', img, { frameWidth: 32, frameHeight: 32 });
  }

  generateCakeTexture() {
    const graphics = this.add.graphics();
    graphics.fillStyle(0xffffff, 1);
    graphics.fillRect(4, 16, 24, 16); // base
    graphics.fillStyle(0xff1493, 1);
    graphics.fillRect(4, 10, 24, 6); // frosting
    graphics.fillStyle(0xffff00, 1);
    graphics.fillRect(14, 2, 4, 8); // candle
    if (this.textures.exists('cake')) this.textures.remove('cake');
    graphics.generateTexture('cake', 32, 32);
    graphics.destroy();
  }

  generateCloudTexture() {
    const graphics = this.add.graphics();
    graphics.fillStyle(0xffffff, 0.8);
    graphics.fillCircle(20, 30, 20);
    graphics.fillCircle(50, 20, 25);
    graphics.fillCircle(80, 30, 20);
    if (this.textures.exists('cloud')) this.textures.remove('cloud');
    graphics.generateTexture('cloud', 100, 60);
    graphics.destroy();
  }

  generateGroundTexture() {
    const graphics = this.add.graphics();
    graphics.fillStyle(0x7cfc00, 1); // lawn green
    graphics.fillRect(0, 0, 100, 40);
    graphics.fillStyle(0x8b4513, 1); // saddle brown
    graphics.fillRect(0, 10, 100, 30);
    if (this.textures.exists('ground')) this.textures.remove('ground');
    graphics.generateTexture('ground', 100, 40);
    graphics.destroy();
  }
}
