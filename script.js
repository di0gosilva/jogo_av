const canvas = document.getElementById("jogoCanva")
const context = canvas.getContext("2d")

class Entidade {
    constructor(posx, posy, width, height){
        this.posx = posx
        this.posy = posy
        this.width = width
        this.height= height
    }

    desenhar = function(context, cor){
        context.fillStyle = cor
        context.fillRect(
            this.posx, 
            this.posy, 
            this.width, 
            this.height
        )
    }

    mover = function(){
        // aqui é só um molde para as classes filhas implementarem a lógica
    }
}

class Raquete extends Entidade {
    constructor(posx, posy, width, height){
        super(posx, posy, width, height)
        this.velocidade = 3
    }

    desenhar = function(context, cor){
        context.fillStyle = cor
        context.fillRect(
            this.posx, 
            this.posy, 
            this.width, 
            this.height
        )
    }

    mover = function(direcao){
        this.posx += direcao * this.velocidade
        if(this.posx < 0){ this.posx = 0 }
        if(this.posx + this.width > canvas.width){ 
            this.posx = canvas.width - this.width
        }
    }
}

class Bola extends Entidade {
    constructor(posx, posy, raio){
        super(posx, posy, raio * 2)
        this.raio = raio
        this.velocidadex = 3
        this.velocidadey = -3
    }

    desenhar = function(context, cor){
        context.fillStyle = cor
        context.beginPath()
        context.arc(this.posx + this.raio, this.posy + this.raio, this.raio, 0, 2 * Math.PI)
        context.fill()
    }

    mover = function() {
        this.posx += this.velocidadex
        this.posy += this.velocidadey
    }
}

const raquete = new Raquete(canvas.width/2 - 40, canvas.height - 30, 75, 10)
const bola = new Bola(canvas.width/2 - 13, canvas.height - 50, 10)

document.addEventListener("keydown", (e) => {
    if(e.key === "ArrowRight"){
        raquete.mover(3)
    }else if(e.key === "ArrowLeft"){
        raquete.mover(-3)
    }
})

function loop() {
    context.clearRect(0, 0, canvas.width, canvas.height)
    raquete.desenhar(context, "yellow")
    bola.desenhar(context, "white")
    bola.mover()
    requestAnimationFrame(loop)
}

loop()