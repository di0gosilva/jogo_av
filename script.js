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
        this.velocidade = 5
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
        if(this.posx < 0 || this.posx + this.width > canvas.width){
            this.velocidadex = -this.velocidadex
        }
        if(this.posy < 0){
            this.velocidadey = -this.velocidadey
        }
    }
}

class Bloco extends Entidade {
    constructor(posx, posy, width, height){
        super(posx, posy, width, height)
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
}

const raquete = new Raquete(canvas.width/2 - 40, canvas.height - 20, 75, 10)
const bola = new Bola(canvas.width/2 - 13, canvas.height - 50, 10)
const blocos = []
const linhas = 6
const colunas = 5
const blocoWidth = 65
const blocoHeight = 20

for(let i = 0; i < linhas; i++){
    for(let j = 0; j < colunas; j++){
        blocos.push(new Bloco(j * (blocoWidth + 10) + 17, i * (blocoHeight + 10) + 10, blocoWidth, blocoHeight))
    }
}

function interacaoBolaERaquete(){
    if(bola.posy + bola.raio * 2 >= raquete.posy && 
        bola.posx + bola.raio * 2 >= raquete.posx && 
        bola.posx <= raquete.posx + raquete.width){
            bola.velocidadey = -bola.velocidadey
        }
}

document.addEventListener("keydown", (e) => {
    if(e.key === "ArrowRight"){
        raquete.mover(3)
    }else if(e.key === "ArrowLeft"){
        raquete.mover(-3)
    }
})

function loop() {
    context.clearRect(0, 0, canvas.width, canvas.height)

    for(const bloco of blocos){
        bloco.desenhar(context, "orange")
    }

    raquete.desenhar(context, "orange")
    bola.desenhar(context, "white")
    bola.mover()    
    interacaoBolaERaquete()
    requestAnimationFrame(loop)
}

loop()