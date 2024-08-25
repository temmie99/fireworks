// put fireworks temmiepark$ livereload index.html in terminal
const canvas = document.getElementById("canvas")
const canvasContext = canvas.getContext("2d")

let gravity = -0.1
let fireworks = []
let subFireworks = []

class Firework {
    constructor(x, y, radius, velocityX, velocityY, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.velocityX = velocityX
        this.velocityY = velocityY
        this.color = color
        this.opacity = 1
    }

    update() {
        this.velocityY -= gravity
        this.x += this.velocityX
        this.y += this.velocityY
        this.opacity -= 0.02
        if(this.opacity < 0)
            this.opacity = 0
    }

    draw() {
        canvasContext.save()
        canvasContext.globalAlpha = this.opacity
        canvasContext.beginPath()
        canvasContext.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false)
        canvasContext.fillStyle = this.color
        canvasContext.fill()
        canvasContext.closePath()
        canvasContext.restore()
    }
}

let animate = () => {
    requestAnimationFrame(animate)
    update()
    draw()
}

let colors = ["LavenderBlush", "LightSkyBlue", "LemonChiffon"]
let initializeCount = 0
let maxInitialize = 2

let initDelay = 2000
let fireworkRadius = 5
let particleCount = 30
let speedMultiplier = 5

// helper function for update
let createSubFireworks = (x, y, count, color, speedMultiplier) => {
    let created = 0
    let radians = (Math.PI * 2) / count

    while(created < count) {
        let firework = new Firework(x, y, fireworkRadius * Math.random(),
                        Math.cos(radians * created) * speedMultiplier,
                        Math.sin(radians * created) * speedMultiplier,
                        color)
        subFireworks.push(firework)
        created++
    }
}


let update = () => {
    canvasContext.fillStyle = "rgba(10,0,0,0.1)" // tail effect
    canvasContext.fillRect(0, 0, canvas.width, canvas.height)
    if(initializeCount < maxInitialize) {
        let firework = new Firework(Math.random() * canvas.width,
                                    canvas.height + Math.random() * 30,
                                    fireworkRadius,
                                    3 * (Math.random() - 0.5),
                                    -12, colors[Math.floor(Math.random() * colors.length)])
        fireworks.push(firework)
        setTimeout(()=> {
            initializeCount --
        }, initDelay * Math.random())
        initializeCount ++
    }
    fireworks.forEach((firework, i) => {
        if(firework.opacity <= 0.1)
        {
            fireworks.splice(i, 1)
            setTimeout(()=> {
                createSubFireworks(firework.x + firework.velocityX, firework.y - 50, particleCount, firework.color, speedMultiplier)
            }, 1000)
        } else {
            firework.update()
        }
    })
    subFireworks.forEach((firework, i) => {
        if(firework.opacity <= 0)
        {
            subFireworks.splice(i, 1)
        } else {
            firework.update()
        }
    })
}

let draw = () => {
    fireworks.forEach(firework => {
        firework.draw()
    })
    subFireworks.forEach(firework => {
        firework.draw()
    })
}

animate()