import Phaser from 'phaser';

export default class BootScene extends Phaser.Scene {
  constructor() {
    super('BootScene');
  }

  preload() {
    this.load.image('standing', '/standing.png');
    this.load.image('running', '/running.png');
    this.load.image('jumping', '/jumping.png');
    // Generate placeholder assets since we don't have real files
    if (!this.textures.exists('cake')) this.generateCakeTexture();
    if (!this.textures.exists('cloud')) this.generateCloudTexture();
    if (!this.textures.exists('ground')) this.generateGroundTexture();
  }

  create() {
    this.scene.start('GameScene');
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
