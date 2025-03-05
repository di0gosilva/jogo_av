const canvas = document.getElementById("jogoCanva")
const context = canvas.getContext("2d")

class Entidade {
    constructor(posx, posy, width, height){
        this.posx = posx
        this.posy = posy
        this.width = width
        this.height= height
    }

    desenhar = function(context, cor) {
        context.fillStyle = cor
        context.fillRect(
            this.posx, 
            this.posy, 
            this.width, 
            this.height
        )
    }
}

function loop () {
    context.clearRect(0, 0, canvas.width, canvas.height)
    requestAnimationFrame(loop)
}

loop()
