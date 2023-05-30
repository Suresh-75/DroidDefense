
const canvas = document.getElementById("canvas");
const gameStartIntro = document.querySelector(".gameStartIntro")
const number3 = document.querySelector(".number3")
const number2 = document.querySelector(".number2")
const number1 = document.querySelector(".number1")
const levelOverModal = document.querySelector(".levelOverModal")
const scoreModal = document.querySelector(".scoreModal")
const overLine = document.querySelector(".overLine")
let c = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

setTimeout(() => {
    gameStartIntro.classList.add("notShow");
    number3.classList.add("show")
}, 1000)
setTimeout(() => {
    number3.classList.remove("show");
    number2.classList.add("show")
}, 1500)
setTimeout(() => {
    number2.classList.remove("show");
    number1.classList.add("show")
}, 2000)
setTimeout(() => {
    number1.classList.remove("show");
}, 2500)

let frame = 0;
let score = 0;
let spawnEnemy = null;
const playerMain = new Image();
playerMain.src = "soldierSprite/FireWizard/idle.png"
const backgroundImg = new Image();
backgroundImg.src = "PNG/2/forestBridge.png"
const scoreBoard = document.querySelector(".scoreValue");
let gameOver = false;
let levelUp = false;
let enemyTypes = []
const enemy1 = new Image();
enemy1.src = "enemies/spritesheet.png"
enemyTypes.push(enemy1);
class Player {
    constructor(position, velocity, area) {
        this.position = position;
        this.velocity = velocity;
        this.area = area;
        this.player = playerMain;
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0
        this.maxFrame = 6;
        this.spriteWidth = 128;
        this.spriteHeight = 128;
        this.health = 100;
    }
    draw() {
        c.drawImage(this.player, this.frameX * (this.spriteWidth), 30, this.spriteWidth, this.spriteHeight, this.position.x, this.position.y, this.area.width, this.area.height)
        c.fillStyle = "black"
        c.fillRect(this.position.x + 47, this.position.y + 22.5, 105, 15);
        c.fillStyle = "red"
        c.fillRect(this.position.x + 50, this.position.y + 25, 100, 10);
        c.fillStyle = "green"
        c.fillRect(this.position.x + 50, this.position.y + 25, this.health, 10);
        c.beginPath()
        // c.arc(this.position.x, this.position.y, 10, 0, Math.PI * 2, false)
        c.ellipse(this.position.x + 90, this.position.y + 190, 25, 2, 0, Math.PI * 2, false)
        c.fillStyle = "black";
        c.fill();
    }
    updateScore() {
        scoreBoard.innerText = `${score}`
    }
    update() {
        this.updateScore();
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
        if (frame % 10 === 0 && gameOver === false) {
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                this.frameX = this.minFrame;
            }
        }
        if (gameOver === true) {
            this.frameX = 3;
            this.maxFrame = 3;
            playerMain.src = "soldierSprite/FireWizard/dead.png"
        }
    }
}
const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    w: {
        pressed: false
    },
    s: {
        pressed: false
    },
    v: {
        pressed: false
    },
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    ArrowUp: {
        pressed: false
    },
    ArrowDown: {
        pressed: false
    }
}
let ProjectileCharge1 = new Image()
ProjectileCharge1.src = "soldierSprite/FireWizard/Charge.png"
let Projectiles = [];
class Projectile {
    constructor(position, velocity, radius) {
        this.position = position;
        this.velocity = velocity;
        this.radius = radius;
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0
        this.maxFrame = 8;
        this.spriteWidth = 64;
        this.spriteHeight = 64;
        this.ProjectileCharge = ProjectileCharge1;
    }
    draw() {
        // c.beginPath()
        // c.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2, false)
        // c.fillStyle = "black";
        // c.fill();
        c.drawImage(this.ProjectileCharge, this.frameX * (this.spriteWidth) - 5, 30, this.spriteWidth, this.spriteHeight, this.position.x, this.position.y, this.radius, this.radius)
    }
    update() {
        if (frame % 10 === 0) {
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                this.frameX = this.minFrame;
            }
        }
        this.draw();
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}
let enemies = [];
class Enemy {
    constructor(position, velocity, area) {
        this.position = position;
        this.velocity = velocity;
        this.area = area
        this.enemy = enemyTypes[0];
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0
        this.maxFrame = 7;
        this.spriteWidth = 160;
        this.spriteHeight = 160;
        this.health = 100;
    }
    draw() {
        // c.fillStyle = "green";
        // c.fillRect(this.position.x, this.position.y, this.area.width, this.area.height)
        c.drawImage(this.enemy, 0, this.frameX * (this.spriteWidth), this.spriteWidth, this.spriteHeight, this.position.x, this.position.y, this.area.width, this.area.height)
        c.fillStyle = "red"
        c.fillRect(this.position.x + 75, this.position.y + 35, 100, 10)
        c.fillStyle = "green"
        c.fillRect(this.position.x + 75, this.position.y + 35, this.health, 10)
        c.beginPath()
        // c.arc(this.position.x, this.position.y, 10, 0, Math.PI * 2, false)
        c.ellipse(this.position.x + 125, this.position.y + 197, 30, 2, 0, Math.PI * 2, false)
        c.fillStyle = "black";
        c.fill();
    }
    update() {
        this.draw();
        if (frame % 25 === 0) {
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                this.frameX = this.minFrame;
            }
        }
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}
function randomYposition() {
    let yPos = (Math.random() * canvas.height)
    while (yPos < 100 || yPos > 400) {
        yPos = (Math.random() * canvas.height);
    } if (100 < yPos < 400) {
        return yPos;
    }
}
function spawnEnemies() {
    setTimeout(() => {
        spawnEnemy = setInterval(() => {
            let area = { width: 250, height: 250 }
            let yPos = randomYposition();
            let position = { x: canvas.width, y: yPos }
            // const angle = Math.atan2(yPos - player1.position.y, xPos - player1.position.x)
            // const velocity = {
            //     x: 12 * (Math.cos(angle)),
            //     y: 12 * (Math.sin(angle))
            // }
            let velocity = { x: -0.75, y: 0 }
            enemies.push(new Enemy(position, velocity, area))
        }, 2500)
    }, 1500)

}
let carBase = new Image()
carBase.src = "jeep_1/idle.png"
class Base {
    constructor(position, area, velocity) {
        this.position = position;
        this.velocity = velocity;
        this.area = area
        this.car = carBase;
        this.frameX = 0;
        this.frameY = 0;
        this.minFrame = 0;
        this.maxFrame = 3;
        this.spriteWidth = 192;
        this.spriteHeight = 192;
        this.health = 100;
    }
    draw() {
        c.drawImage(this.car, this.frameX * (this.spriteWidth), 0, this.spriteWidth, this.spriteHeight, this.position.x, this.position.y, this.area.width, this.area.height)
        c.beginPath()
        c.ellipse(this.position.x + 125, this.position.y + 350, 100, 5, 0, Math.PI * 2, false);
        c.fillStyle = "black";
        c.fill();
        c.fillRect(this.position.x + 52, this.position.y + 189, 155, 15)
        c.fillStyle = "red";
        c.fillRect(this.position.x + 55, this.position.y + 190, 150, 10)
        c.fillStyle = "green";
        c.fillRect(this.position.x + 55, this.position.y + 190, (this.health) * 150 / 100, 10)
    }
    update() {
        this.draw();
        if (frame % 12 === 0) {
            if (this.frameX < this.maxFrame) {
                this.frameX++;
            } else {
                this.frameX = this.minFrame;
            }
        }
        this.position.x += this.velocity.x;
        this.position.y += this.velocity.y;
    }
}
const base = new Base(
    { x: 10, y: 0 },
    { width: 250, height: 350 },
    { x: 0, y: 0 }
)
const player1 = new Player({ x: 50, y: 350 }, { x: 0, y: 0 }, { width: 250, height: 250 })
// let porjectile1 = new Projectile({ x: player1.position.x + (player1.area.width) / 2, y: player1.position.y + (player1.area.height) / 2 }, { x: 0, y: 0 })


function animate() {
    window.requestAnimationFrame(animate);
    c.clearRect(0, 0, canvas.width, canvas.height)
    c.fillStyle = "grey"
    c.fillRect(0, 0, canvas.width, canvas.height)
    c.drawImage(backgroundImg, 0, 0, canvas.width, canvas.height)
    player1.update();
    base.update();
    Projectiles.forEach((Projectile) => {
        Projectile.update();
        enemies.forEach((Enemy) => {
            //  let distance = Math.abs(Math.hypot(Projectile.position.x - Enemy.position.x, Projectile.position.y - Enemy.position.y))
            //  if (distance < Projectile.radius + Enemy.area.width) {
            //      score += 10;
            //      enemies.splice(enemies.indexOf(Enemy), 1)
            //      Projectiles.splice(Projectiles.indexOf(Projectile), 1);
            //  }
            if (collisionChecker(Projectile.position, Enemy.position)) {
                // enemy1.src = "enemies/GolemDeath.png"
                Enemy.health -= 20;
                // enemies[enemies.indexOf(Enemy)].enemy.src = "enemies/GolemHit.png";
                // setTimeout(() => {
                //     enemies[enemies.indexOf(Enemy)].enemy.src = "enemies/spritesheet.png";
                // }, 1000)
                setTimeout(() => {
                    player1.player.src = "soldierSprite/FireWizard/idle.png"
                }, 1000)
                Projectiles.splice(Projectiles.indexOf(Projectile), 1);
                if (Enemy.health <= 0) {
                    score += 10;
                    enemies.splice(enemies.indexOf(Enemy), 1)
                }
            }
        })
    })
    enemies.forEach((Enemy) => {
        if (playerCollisionChecker(player1.position, Enemy.position)) {
            player1.health -= 25;
            // player1.player.src = "soldierSprite/Soldier_1/hurt.png"
            // setTimeout(() => {
            //     player1.player.src = "soldierSprite/Soldier_1/idle.png"
            // }, 1500)
            enemies.splice(enemies.indexOf(Enemy), 1)
            if (player1.health <= 0) {
                gameOver = true;
                enemies.forEach((Enemy) => {
                    Enemy.maxFrame = 1;
                })
                clearInterval(spawnEnemy);
                spawnEnemy = null;
                player1.player.src = "soldierSprite/FireWizard/dead.png"
                enemies.forEach((Enemy) => {
                    Enemy.velocity.x = 0;
                    enemies[enemies.indexOf(Enemy)].enemy.src = "enemies/GolemIdle.png";
                    // Enemy.src = "soldierSprite/Soldier_1/GolemIdle.png"
                })
            }
        }
        if (baseCollisionChecker(base.position, Enemy.position)) {
            base.health -= 10;
            enemies.splice(enemies.indexOf(Enemy), 1);
            if (base.health <= 0) {
                gameOver = true;
                clearInterval(spawnEnemy);
                spawnEnemy = null;
                base.maxFrame = 8;
                base.car.src = "Jeep_1/Destroyed.png"
                enemies.forEach((Enemy) => {
                    Enemy.velocity.x = 0;
                    enemies[enemies.indexOf(Enemy)].enemy.src = "enemies/GolemIdle.png";
                    // Enemy.src = "soldierSprite/Soldier_1/GolemIdle.png"
                })
            }
        }
        Enemy.update();
        if (Enemy.position.x < 30) {
            enemies.splice(enemies.indexOf(Enemy), 1)
        }
    })
    player1.velocity.x = 0;
    player1.velocity.y = 0;
    base.velocity.x = 0;
    base.velocity.y = 0;
    if (gameOver === false) {
        if (keys.a.pressed && (player1.position.x > 0)) {
            playerMain.src = "soldierSprite/Soldier_1/RunRev.png"
            player1.velocity.x = -1.5
        }
        if (keys.d.pressed && (player1.position.x + player1.area.width < canvas.width)) {
            playerMain.src = "soldierSprite/FireWizard/run.png"
            player1.velocity.x = 1.5
        }
        if (keys.w.pressed && (player1.position.y > 0)) {
            playerMain.src = "soldierSprite/FireWizard/run.png"
            player1.velocity.y = -1.5
        }
        if (keys.s.pressed && (player1.position.y + player1.area.height < canvas.height)) {
            playerMain.src = "soldierSprite/FireWizard/run.png"
            player1.velocity.y = 1.5
        }
        if (keys.ArrowLeft.pressed && (base.position.x > 0)) {
            carBase.src = "Jeep_1/Ride_back.png"
            base.velocity.x = -2
        }
        if (keys.ArrowRight.pressed && (base.position.x + base.area.width < canvas.width)) {
            carBase.src = "Jeep_1/Ride.png"
            base.velocity.x = 2
        }
        if (keys.ArrowUp.pressed && (base.position.y > 0)) {
            carBase.src = "Jeep_1/Ride.png"
            base.velocity.y = -2
        }
        if (keys.ArrowDown.pressed && (base.position.y + base.area.height < canvas.height)) {
            carBase.src = "Jeep_1/Ride.png"
            base.velocity.y = 2
        }
    }
    frame++;
    levelOverChecker()
}
animate()
spawnEnemies()
function baseCollisionChecker(base, Enemy) {
    if (!(
        base.x > Enemy.x + 150 ||
        base.x + 192 < Enemy.x ||
        base.y > Enemy.y - 50 ||
        base.y + 192 < Enemy.y)
    ) {
        return true;
    }
}
function playerCollisionChecker(player1, Enemy) {
    if (!(
        player1.x > Enemy.x + 10 ||
        player1.x + 25 < Enemy.x ||
        player1.y > Enemy.y + 300 ||
        player1.y + 25 < Enemy.y)
    ) {
        return true;
    }
}
function collisionChecker(bullet, enemy1) {
    if (!(
        bullet.x > enemy1.x + 150 ||
        bullet.x + 5 < enemy1.x ||
        bullet.y > enemy1.y + 150 ||
        bullet.y + 5 < enemy1.y)
    ) {
        return true;
    }
}
window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "a":
            keys.a.pressed = true;
            break;
        case "d":
            keys.d.pressed = true;
            break;
        case "w":
            keys.w.pressed = true;
            break;
        case "s":
            keys.s.pressed = true;
            break;
    }
})

window.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowLeft":
            keys.ArrowLeft.pressed = true;
            break;
        case "ArrowRight":
            keys.ArrowRight.pressed = true;
            break;
        case "ArrowUp":
            keys.ArrowUp.pressed = true;
            break;
        case "ArrowDown":
            keys.ArrowDown.pressed = true;
            break;
    }
})

window.addEventListener("keyup", (e) => {
    switch (e.key) {
        case "a":
            keys.a.pressed = false;
            playerMain.src = "soldierSprite/FireWizard/idle.png"
            break;
        case "d":
            keys.d.pressed = false;
            playerMain.src = "soldierSprite/FireWizard/idle.png"
            break;
        case "w":
            keys.w.pressed = false;
            playerMain.src = "soldierSprite/FireWizard/idle.png"
            break;
        case "s":
            keys.s.pressed = false;
            playerMain.src = "soldierSprite/FireWizard/idle.png"
            break;
        case "b":
            keys.v.pressed = false;
            playerMain.src = "soldierSprite/FireWizard/idle.png"
            break;
        case "ArrowLeft":
            keys.ArrowLeft.pressed = false;
            carBase.src = "jeep_1/idle.png"
            break;
        case "ArrowRight":
            keys.ArrowRight.pressed = false;
            carBase.src = "jeep_1/idle.png"
            break;
        case "ArrowUp":
            keys.ArrowUp.pressed = false;
            carBase.src = "jeep_1/idle.png"
            break;
        case "ArrowDown":
            keys.ArrowDown.pressed = false;
            carBase.src = "jeep_1/idle.png"
            break;
    }
})
let maxWidth = window.innerWidth;
let maxHeight = window.innerHeight;

//mouse shooting

let lastTimeStamp1 = 0;
let currentTimeStamp1 = 0;
canvas.addEventListener("click", (e) => {
    currentTimeStamp = e.timeStamp;
    if (gameOver === false) {
        if ((currentTimeStamp - lastTimeStamp) >= 175) {
            playerMain.src = "soldierSprite/FireWizard/flame_jet.png"
            let xPos = e.clientX - 100;
            let yPos = e.clientY - 50;
            const angle = Math.atan2(yPos - player1.position.y - 50, xPos - player1.position.x + 30)
            const velocity = {
                x: 10 * (Math.cos(angle)),
                y: 10 * (Math.sin(angle))
            }
            let radius = 150;
            Projectiles.push(new Projectile({ x: player1.position.x + (player1.area.width) / 2 + 50, y: player1.position.y + (player1.area.height) / 2 - 40 }, { x: velocity.x, y: velocity.y }, radius))
        }
    }
    lastTimeStamp = currentTimeStamp;
    setTimeout(() => {
        playerMain.src = "soldierSprite/FireWizard/idle.png";
    }, 750)
})
//mouse shooting


let lastTimeStamp = 0;
let currentTimeStamp = 0;
window.addEventListener("keydown", (e) => {
    if (gameOver === false) {
        if (e.key === "b") {
            currentTimeStamp = e.timeStamp;
            if ((currentTimeStamp - lastTimeStamp) >= 100) {
                keys.v.pressed = true;
                playerMain.src = "soldierSprite/FireWizard/flame_jet.png"
                // let xPos = e.clientX - 100;
                // let yPos = e.clientY - 50;
                // const angle = Math.atan2(yPos - player1.position.y - (player1.area.width) / 2 - 30, xPos - player1.position.x - (player1.area.height) / 2 - 15)
                // const velocity = {
                //     x: 40 * (Math.cos(angle)),
                //     y: 40 * (Math.sin(angle))
                // }
                let radius = 5;
                Projectiles.push(new Projectile({ x: player1.position.x + (player1.area.width) / 2 + 50, y: player1.position.y + (player1.area.height) / 2 - 40 }, { x: 20, y: 0 }, radius))

            }
        }
    }
    lastTimeStamp = currentTimeStamp;
})
function levelOverChecker() {
    if (score >= 200) {
        levelUp = true;
        levelOverModal.showModal();
        setTimeout(() => {
            clearInterval(spawnEnemy);
            spawnEnemy = null;
            enemies.forEach((Enemy) => {
                Enemy.velocity.x = 0;
                Enemy.maxFrame = 1;
                enemies[enemies.indexOf(Enemy)].enemy.src = "enemies/GolemIdle.png";
            })
            scoreModal.innerText = `${score}`
        }, 100)
        setTimeout(() => {
            overLine.classList.add("overLineScale")
        }, 1000)
    }
}
