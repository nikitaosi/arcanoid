/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */

export class MainScene extends Phaser.Scene {
  private phaserSprite: Phaser.GameObjects.Sprite;

  constructor() {
    super({
      key: "MainScene"
    });
  }

  private group: Phaser.GameObjects.Group;

  preload(): void {
    this.load.spritesheet('tile', 'assets/sprites/tiles.png', { frameWidth: 60, frameHeight: 20 });
  }

  create(): void {
    // @ts-ignore
    this.group = this.physics.add.staticGroup({
      key: 'tile',
      frame: ['1','2','3','4','5','6','7'],
      frameQuantity: 1,
      repeat: 11,
      randomFrame: true,
      gridAlign: {
        x: 70,
        y: 100,
        width: 12,
        height: 10,
        cellWidth: 60,
        cellHeight: 20
      }
    });
  }
}
