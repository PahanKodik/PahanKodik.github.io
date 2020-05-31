var bg;
var hero;
var heroShadow;
var heroAttacking = false;
var slime;
var bat;
var enemySpeed = 1;
var score = 0;
var scoreText;
var isGameOver = false;
var isSlime = true;
var killEnemy = false;
var enemyAttack = false;
class Main2 extends Phaser.Scene {
    constructor() {
        super("main2");
    }
    
                
            heroIdle(){
                hero.play('hero_idle');
                heroAttacking = false;
            }
            heroAttack(tap){
                if (heroAttacking) {
                    return;
                }
                
                heroAttacking = true;
                hero.flipX = tap.downX > bg.x;
                hero.play('hero_attack', true); 
                setTimeout(this.heroIdle, 350);
            } 
    
    create(){
                this.anims.create({ 
                    key: 'hero_idle',    
                    frames: this.anims.generateFrameNames('atlas', { 
                        prefix: 'hero/hero_idle_', 
                        end: 5
                    }), 
                    repeat: -1 
                });
                this.anims.create({ 
                    key: 'hero_attack',  
                    frames: this.anims.generateFrameNames('atlas', { 
                        prefix: 'hero/hero_attack_',
                        end: 5
                    }), 
                    repeat: -1
                });
                this.anims.create({ 
                    key: 'slime_attack', 
                    frames: this.anims.generateFrameNames('atlas', { 
                        prefix: 'slime/slime_attack_', 
                        end: 5
                    }), 
                    repeat: -1 
                });
                this.anims.create({ 
                    key: 'bat_attack', 
                    frames: this.anims.generateFrameNames('atlas', { 
                        prefix: 'bat/bat_attack_', 
                        end: 7
                    }), 
                    repeat: -1 
                });
                 this.anims.create({ 
                    key: 'slime_idle', 
                    frames: this.anims.generateFrameNames('atlas', { 
                        prefix: 'slime/slime_idle_', 
                        end: 5
                    }), 
                    repeat: -1 
                });
                this.anims.create({ 
                    key: 'bat_idle', 
                    frames: this.anims.generateFrameNames('atlas', { 
                        prefix: 'bat/bat_idle_', 
                        end: 6
                    }), 
                    repeat: -1 
                });
                this.anims.create({ 
                    key: 'poof', 
                    frames: this.anims.generateFrameNames('atlas', { 
                        prefix: 'vfx/poof_', 
                        end: 5
                    }), 
                    repeat: -1 
                });
                
                
                bg = this.add.sprite(0, 0, 'atlas', 'bg_level_1');
                bg.x = bg.width / 2;
                bg.y = bg.height / 2;
                
                hero = this.add.sprite(0, 0, 'hero');
                hero.x = bg.width / 2;
                hero.y = bg.height / 2 + hero.height;
                
                heroShadow = this.add.sprite(0, 0, 'atlas', 'hero_shadow');
                heroShadow.x = bg.width / 2;
                heroShadow.y = hero.y + hero.height + heroShadow.height / 2;
                
                slime = this.add.sprite(0, hero.y + 10, 'slime');
                slime.play('slime_idle');
                
                scoreText = this.add.text(20, 15, 'score: ' + score);
                
                this.heroIdle();
                this.input.on("pointerdown", this.heroAttack, this);
            }
            update(){
                if (isSlime) {
                    if (slime.flipX) {
                      slime.x -= enemySpeed;
                    } else {
                        slime.x += enemySpeed;
                    }
                    if (Math.abs(hero.x - slime.x) < 100) {
                        if (!enemyAttack) {
                            enemyAttack = true;
                            slime.play('slime_attack');
                        }
                    }
                } else {    
                    if (bat.flipX) {
                      bat.x -= enemySpeed;
                    } else {
                        bat.x += enemySpeed;
                    }
                    if (Math.abs(hero.x - bat.x) < 100) {
                        bat.y += enemySpeed;
                        if (!enemyAttack) {
                            enemyAttack = true;
                            bat.play('bat_attack');
                        }
                    }
                }

                
                
                if (killEnemy) {
                        if (isSlime) slime.destroy();
                        else bat.destroy();
                        
                        if (Math.random() > 0.5) {
                            isSlime = true;
                            slime = this.add.sprite(0, hero.y + 10, 'slime');
                            slime.flipX = Math.random() > 0.5;
                            if (slime.flipX) {
                                slime.x = bg.x * 2;
                            } else {
                                slime.x = 0;
                            }
                            slime.play('slime_idle');
                        } else {
                            isSlime = false;
                            bat = this.add.sprite(0, hero.y - 100, 'bat');
                            bat.flipX = Math.random() > 0.5;
                            if (bat.flipX) {
                                bat.x = bg.x * 2;
                            } else {
                                bat.x = 0;
                            }
                            bat.play('bat_idle');
                        }
                    killEnemy = false;
                    enemyAttack = false;
                }
                
                if (isSlime) {
                    if (heroAttacking && Math.abs(hero.x - slime.x) < 100 && hero.flipX == slime.flipX) {
                        score += 1;
                        scoreText.setText('score: ' + score);
                        enemySpeed = score  / 5 + 0.5;
                        slime.play('poof', true);
                        killEnemy = true;
                    }
                } else if (heroAttacking && Math.abs(hero.x - bat.x) < 100 && hero.flipX == bat.flipX) {
                        score += 1;
                        scoreText.setText('score: ' + score);
                        enemySpeed = score  / 5 + 0.5;
                        bat.play('poof', true);
                        killEnemy = true;
                }
                
                if (isSlime) {
                    if (Math.abs(hero.x - slime.x) < 20) {
                        isGameOver = true;
                        hero.play('poof', true);  
                        this.scene.start("game over"); 
                    }
                } else {
                    if (Math.abs(hero.x - bat.x) < 20) {
                        isGameOver = true;
                        hero.play('poof', true);  
                        this.scene.start("game over"); 
                    }
                }
                
            }

}