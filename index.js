const cnv = document.getElementById('canvas')
const ctx = cnv.getContext('2d')
cnv.height = window.innerHeight
cnv.width = window.innerWidth


const keys = new Array()
window.addEventListener('keydown', (event)=>{
    keys[event.code] = true
}, false)
window.addEventListener('keyup', (event)=>{
    keys[event.code] = false
}, false)

class Player{
    constructor(x, y, color){
        this.x = x || cnv.width / 2,
        this.y = y || cnv.height - 20,
        this.color = 'red' || color,
        this.isJumped = false,
        this.yAcceleration

    }

    render(){
        ctx.fillStyle = `${this.color}`
        ctx.strokeStyle = 'white'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.arc(this.x, this.y, 20, 0, 2 * Math.PI)
        ctx.closePath()
        ctx.stroke()
        ctx.fill()
    }
    
    update(dt){
        if(keys['KeyA']){
            this.x -= dt * 250
        }

        if(keys['KeyD']){
            this.x += dt * 250
        }

        if(keys['Space']){
            this.isJumped = true
        }
    }
}

const MY_PLAYER = new Player()

function drawBackground(){
    ctx.fillStyle = 'black'
    ctx.fillRect(0,0,cnv.width, cnv.height)
}

function render(){
    drawBackground()
    MY_PLAYER.render()

}

function update(dt){
    MY_PLAYER.update(dt)
}

let last = Date.now()
function play(){
    let now = Date.now()
render()
    let dt = (now - last) / 1000
update(dt)
requestAnimationFrame(play)
last = now
}

play()