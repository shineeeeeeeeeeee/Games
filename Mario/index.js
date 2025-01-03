
const canvas = document.querySelector('canvas')

const c = canvas.getContext('2d')

canvas.width = window.innerWidth
canvas.height = innerHeight

const gravity = 1.5

//player class
class Player {

    constructor(){
        // default position of player
        this.position = {
            x: 100,
            y: 100
        }
        // defining velocity
        this.velocity = {
            x: 0,
            y: 0
        }

        this.width = 30
        this.height = 30

    }
    
    draw(){
        c.fillStyle = 'red'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }

    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        
        // to land on ground after falling
        if (this.position.y + this.height + this.velocity.y <= canvas.height)
            this.velocity.y += gravity
        else this.velocity.y = 0
    }
}

class Platform{
    constructor({ x, y }){
        this.position = {
            x: x,
            y: y
        }
        this.width = 200
        this.height = 20

    }

    draw(){
        c.fillStyle = 'blue'
        c.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}

const player = new Player()
//const platform = new Platform()
const platforms = [new Platform({
    x: 200, y: 100
}), new Platform({ x: 500, y: 200 })]

// left and right key both set default to false
const keys = {
    right: {
        pressed: false
    },
    left: {
        pressed: false
    }
}

let scrollOffset = 0

// to call gravity
function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height)
    player.update()
    platforms.forEach(platform => {
        platform.draw()

    })
    

    // if right pressed then forward if left then backward else stop
    if (keys.right.pressed && player.position.x < 400){
        player.velocity.x = 5

    } else if (keys.left.pressed && player.position.x > 100){
        player.velocity.x = -5
    }else {
        player.velocity.x = 0

        // platform movement

        if (keys.right.pressed){
            scrollOffset += 5
            platforms.forEach(platform => {
                platform.position.x -= 5
        
            })
        
        } else if (keys.left.pressed){
            scrollOffset -= 5

            platforms.forEach(platform => {
                platform.position.x += 5
        
            })
            
        }
    }

    console.log(scrollOffset)


    // platform

    platforms.forEach(platform => {
        if (player.position.y + player.height <= platform.position.y && player.position.y + player.height + player.velocity.y >= platform.position.y && player.position.x + player.width >= platform.position.x && player.position.x <= platform.position.x + platform.width){
            player.velocity.y = 0
        }

    })
    
    if (scrollOffset > 2000){
        console.log('you win!')
    }
}

animate()

// movements using keys
window.addEventListener('keydown', ({ keyCode }) => {
   // console.log(keyCode); // Will log the keyCode of the pressed key

    switch (keyCode){
        case 65: console.log('left') // A
        keys.left.pressed = true
        break

        case 83: console.log('down') // S
        
        break

        case 68: console.log('right') // D
        //player.velocity.x = 1

        keys.right.pressed = true
        break

        case 87: console.log('up') // W
        player.velocity.y -= 20
        break
    }


   // console.log(keys.right.pressed)
});
// to stop after lifting key
window.addEventListener('keyup', ({ keyCode }) => {
    // console.log(keyCode); // Will log the keyCode of the pressed key
 
     switch (keyCode){
         case 65: console.log('left') // A
         keys.left.pressed = false
         break
 
         case 83: console.log('down') // S
         break
 
         case 68: console.log('right') // D
         //player.velocity.x = 0
         keys.right.pressed = false
         break
 
         case 87: console.log('up') // W
         player.velocity.y -= 20
         break
     }

    // console.log(keys.right.pressed)
 });
