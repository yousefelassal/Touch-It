class mainScene{
    preload(){
        //load assets

        //load player
        this.load.image('player', 'assets/player.png');

        //load coin
        this.load.image('coin', 'assets/coin.png');
    }
    
    create(){
        //initialization

        //display player
        this.player = this.physics.add.sprite(100,100, 'player');

        //display coin
        this.coin = this.physics.add.sprite(300,300, 'coin');

        //display score
        this.score = 0;
        let style = {font: '20px Arial', fill: '#fff'};
        this.scoreText = this.add.text(20,20, 'score: ' + this.score, style);

        //movement
        this.arrow = this.input.keyboard.createCursorKeys();

    }

    update(){
        //game logic
        
        //handling collision
        if(this.physics.overlap(this.player, this.coin)){
            this.hit();
        }


        //handle horizontal movements
        if(this.arrow.right.isDown){
            this.player.x += 3;
        } else if(this.arrow.left.isDown){
            this.player.x -= 3;
        }
        
        //handle vertical movements
        if(this.arrow.down.isDown){
            this.player.y += 3;
        } else if(this.arrow.up.isDown){
            this.player.y -=3;
        }

    }

    hit(){
        //randomly assign position of coin
        this.coin.x = Phaser.Math.Between(100, 600);
        this.coin.y = Phaser.Math.Between(100, 300);

        //inc score by 10
        this.score += 10;

        //display new score
        this.scoreText.setText('score: ' + this.score);

        this.tweens.add({
            targets: this.player,
            duration: 200,
            scaleX: 1.2,
            scaleY: 1.2,
            yoyo: true, //go back to original scale
        })
    }
}

new Phaser.Game({
    width: 700,
    height: 400,
    backgroundColor: '#3498db', //blue
    scene: mainScene,
    physics: {default: 'arcade'}, //physics engine
    parent: 'game', //inside <div id = "game">
})