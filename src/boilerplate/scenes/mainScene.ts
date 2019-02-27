/**
 * @author       Digitsensitive <digit.sensitivee@gmail.com>
 * @copyright    2018 - 2019 digitsensitive
 * @license      Digitsensitive
 */
import BaseSound = Phaser.Sound.BaseSound;
import Vector2 = Phaser.Math.Vector2;

export class MainScene extends Phaser.Scene {

  public  gameBegin :boolean;
  private playerSprite:  Phaser.Physics.Arcade.Sprite;
  private ballSprite: Phaser.Physics.Arcade.Sprite;
  private group: Phaser.GameObjects.Group;
  private speed: integer;
  private total: integer;
  private bricks: integer;
  private hit: BaseSound;


  private scoreText : Phaser.GameObjects.Text;






  private ballStartPos:Phaser.Geom.Point;
  private playerStartPos:Phaser.Geom.Point;
  private sprite: Phaser.Physics.Arcade.Sprite;
    private bestScoreText: Phaser.GameObjects.Text;
    private best: integer;

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
    this.bricks = this.group.getChildren().length;
    this.speed = 10;
    this.total = 0;
    this.hit = this.sound.add('bulp');
    console.log(this.group);
    this.best = 0 ;

    this.ballStartPos = new Phaser.Geom.Point(400,550-20);
    this.playerStartPos = new Phaser.Geom.Point(400,550);

    this.scoreText = this.add.text(25, 25, 'score :'+this.total);
    this.bestScoreText = this.add.text(150, 25, 'best :'+this.best);


    //this.load.image("logo", "./src/boilerplate/assets/player.png");
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
            ball.setVelocityX(diff*this.speed);//*speed);

        }
        else if(ball.x<player.x)
        {

            diff = player.x-ball.x;
            ball.setVelocityX(diff*-this.speed);//*this.speed);

        }
        else
        {
            ball.setVelocityX(Math.random()*this.speed);//*speed
        }
    }

  hitPlatform(ball,brick) : void {
      brick.disableBody(true, true);
      this.hit.play();
      this.total++;
      this.scoreText.setText( 'score :'+this.total);
      if (this.total % 3  == 0) {
          this.speed +=5;
          console.log(this.ballSprite.body.velocity.multiply(new Phaser.Math.Vector2(1.05,1.05)));

          //console.log(this.speed)

      };

      //ball.setVelocityX(100);

      //var x = this.ballSprite.body.velocity.x;
      //var y = this.ballSprite.body.velocity.y;


      console.log(this.total);
      console.log(this.speed);

  };

  update(time: number, delta: number): void {
    if(this.ballSprite.y>600 || this.bricks == this.total)
    {
        this.restart();

    }
  }

  private restart()
  {

    if(this.best<this.total)
    {
        this.best = this.total;
        this.bestScoreText.setText( 'best :'+this.best);
    }

    this.total = 0;
    this.scoreText.setText( 'score :'+this.total);

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