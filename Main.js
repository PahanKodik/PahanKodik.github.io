var bg;
var hero;
var heroShadow;
var heroAttacking = false;
var slime;
var enemySpeed = 1;
var score = 0;
var scoreText;
var isGameOver = false;
var enemyAttack = false;
class Main extends Phaser.Scene {
    constructor() {
        super("main");
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
                
                
                bg = this.add.sprite(0, 0, 'atlas', 'bg_level_0');
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
                
                scoreText = this.add.text(20, 15, 'score: 0');
                
                this.heroIdle();
                this.input.on("pointerdown", this.heroAttack, this);
            }
            update(){
                if (score == 5) {
                    this.scene.start('main2');
                }
                
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
                
                if (slime.anims.getCurrentKey() == 'poof') {
                    enemyAttack = false;
                    slime.destroy();
                    slime = this.add.sprite(0, hero.y + 10, 'slime');
                    slime.flipX = Math.random() > 0.5;
                    if (slime.flipX) {
                        slime.x = bg.x * 2;
                    } else {
                        slime.x = 0;
                    }
                    slime.play('slime_idle');
                }
                
                if (heroAttacking && Math.abs(hero.x - slime.x) < 100 && hero.flipX == slime.flipX) {
                    score += 1;
                    scoreText.setText('score: ' + score);
                    enemySpeed = score  / 5 + 0.5;
                    slime.play('poof', true);
                }
                
                
                if (Math.abs(hero.x - slime.x) < 20) {
                    isGameOver = true;
                    hero.play('poof', true);  
                    this.scene.start("game over"); 
                }
                
            }

}