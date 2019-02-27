/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */

export class MainScene extends Phaser.Scene {

  public  gameBegin :boolean;
  private phaserSprite: Phaser.GameObjects.Sprite;
  private playerSprite:  Phaser.Physics.Arcade.Sprite;
  private ballSprite:  Phaser.Physics.Arcade.Sprite;
  private group: Phaser.GameObjects.Group;

  constructor() {
    super({
      key: "MainScene"
    });
  }


  preload(): void {

    this.load.spritesheet('tile', 'src/boilerplate/assets/tiles.png', { frameWidth: 60, frameHeight: 20 });
    this.load.image("player", "./src/boilerplate/assets/player.png");
    this.load.image("ball", "./src/boilerplate/assets/ball.png");

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

    //this.load.image("logo", "./src/boilerplate/assets/player.png");
    this.physics.world.setBoundsCollision(true,true,true,false);
    this.playerSprite = this.physics.add.sprite(400, 550, "player").setImmovable();
    this.ballSprite =this.physics.add.sprite(400, 550-20, "ball").setCollideWorldBounds(true).setBounce(1);

    this.physics.add.collider(this.ballSprite,this.playerSprite,this.hitPlayer,null,this);



    this.input.on('pointermove', function (pointer) {

      //this.add.image(pointer.x, pointer.y, 'balls', Phaser.Math.Between(0, 5));
      this.playerSprite.setX(pointer.x);

      if(!  this.gameBegin)
      {
        this.playerSprite.setX(pointer.x);
        this.ballSprite.setX(pointer.x);
      }
      else
      {
        this.playerSprite.setX(pointer.x);
      }


    }, this);

    this.input.keyboard.on('keydown_SPACE', function (event) {

      console.log('GAME BEGIN');
      // block.setVelocity(Phaser.Math.Between(200, 400), Phaser.Math.Between(200, 400));
      this.gameBegin = true;
      this.ballSprite.setVelocity(-75,-300);
    },this );

  }



  hitPlayer(ball,player) : void {



  }



}
