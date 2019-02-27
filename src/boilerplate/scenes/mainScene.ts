/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */
import BaseSound = Phaser.Sound.BaseSound;
export class MainScene extends Phaser.Scene {

  public  gameBegin :boolean;
  private playerSprite:  Phaser.Physics.Arcade.Sprite;
  private ballSprite: Phaser.Physics.Arcade.Sprite;
  private group: Phaser.GameObjects.Group;
  private speed: integer;
  private total: integer;

  private ballStartPos:Phaser.Geom.Point;
  private playerStartPos:Phaser.Geom.Point;
  private sprite: Phaser.Physics.Arcade.Sprite;

  constructor() {
    super({
      key: "MainScene"
    });
  }

  preload(): void {

    this.load.spritesheet('tile', 'src/boilerplate/assets/tiles.png', { frameWidth: 60, frameHeight: 20 });
    this.load.image('player', './src/boilerplate/assets/player.png');
    this.load.image('ball', './src/boilerplate/assets/ball.png');
    this.load.audio('bulp','./src/boilerplate/assets/bulp.wav');
  }

  create(): void {
    // @ts-ignore
    this.group = this.physics.add.staticGroup({
      key: 'tile',
      frame: ['1'],//,'2','3','4','5','6','7'
      frameQuantity: 1,
      repeat: 1,
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
    this.bricks = this.group.getChildren().length;
    this.speed = 10;
    this.total = 0;

    this.ballStartPos = new Phaser.Geom.Point(400,550-20);
    this.playerStartPos = new Phaser.Geom.Point(400,550);

    this.physics.world.setBoundsCollision(true,true,true,false);
    this.playerSprite = this.physics.add.sprite(this.playerStartPos.x, this.playerStartPos.y, "player").setImmovable();
    this.ballSprite =this.physics.add.sprite(   this.ballStartPos.x, this.ballStartPos.y, "ball").setCollideWorldBounds(true).setBounce(1);

    this.physics.add.collider(this.ballSprite,this.playerSprite,this.hitPlayer,null,this);
    this.physics.add.collider(this.ballSprite, this.group.getChildren(), this.hitPlatform,null,this);


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
      this.ballSprite.setVelocity(-75, -300);
    },this );

  }


    hitPlayer(ball,player) : void {

        var diff = 0;
        if(ball.x>player.x)
        {

            diff = ball.x - player.x;
            ball.setVelocityX(diff*10);//*speed);

        }
        else if(ball.x<player.x)
        {

            diff = player.x-ball.x;
            ball.setVelocityX(diff*-10);//*speed);

        }
        else
        {
            ball.setVelocityX(Math.random()*8);//*speed
        }
    }

  hitPlatform(ball,brick) : void {
      brick.destroy();
      this.total++;
      if (this.total % 3 == 0) {
          this.speed +=5;
      }
  };

  update(time: number, delta: number): void {
    if(this.ballSprite.y>600 || this.bricks == this.total)
    {
        this.restart();

    }
  }

  private restart()
  {
    this.ballSprite.setVelocity(0 ,0);
    this.gameBegin = false;
    this.playerSprite.setPosition(this.playerStartPos.x, this.playerStartPos.y);
    this.ballSprite.setPosition(this.ballStartPos.x, this.ballStartPos.y);
    this.group.getChildren().forEach((element) => {
        element.body.enable = true;
        element.body.visible = true;
    });
  }

}