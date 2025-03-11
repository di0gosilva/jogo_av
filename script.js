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

const raquete = new Raquete(canvas.width/2 - 45, canvas.height - 20, 80, 10)
const bola = new Bola(canvas.width/2 - 13, canvas.height - 50, 10)
const blocos = []
const linhas = 6
const colunas = 5
const blocoWidth = 65
const blocoHeight = 20
let pontuacao = 0
let gameOver = false
let gameComplete = false

for(let i = 0; i < linhas; i++){
    for(let j = 0; j < colunas; j++){
        blocos.push(new Bloco(j * (blocoWidth + 10) + 17, i * (blocoHeight + 10) + 40, blocoWidth, blocoHeight))
    }
}

function interacaoBolaERaquete(){
    if(bola.posy + bola.raio * 2 >= raquete.posy && 
        bola.posx + bola.raio * 2 >= raquete.posx && 
        bola.posx <= raquete.posx + raquete.width){
            bola.velocidadey = -bola.velocidadey
        }
}

function interacaoBolaEBlocos(){
    for(let i = 0; i < blocos.length; i++) {
        const bloco = blocos[i]
        if(bola.posy <= bloco.posy + bloco.height && 
            bola.posy + bola.raio * 2 >= bloco.posy && 
            bola.posx + bola.raio * 2 >= bloco.posx && 
            bola.posx <= bloco.posx + bloco.width){
                bola.velocidadey = -bola.velocidadey
                blocos.splice(i, 1)
                pontuacao += 1
                break
            }
    }
}

function contadorPontuacao(){
    context.fillStyle = 'white'
    context.font = '20px Tahoma'
    context.fillText(`Pontos: ${pontuacao}`, 15, 25)
}

function houveColisao(){
    context.fillStyle = 'white'
    context.fillRect((canvas.width/2)-100, (canvas.height/2)-50, 200, 100)
    context.fillStyle = "black"
    context.font = "25px Arial"
    context.fillText("Game Over", (canvas.width/2)-65, (canvas.height/2)+8)
    gameOver = true
}

function gameCompleted(){
    context.fillStyle = 'white'
    context.fillRect((canvas.width/2)-100, (canvas.height/2)-50, 200, 100)
    context.fillStyle = "black"
    context.font = "25px Arial"
    context.fillText("Você venceu.", (canvas.width/2)-72, (canvas.height/2)-3)
    context.fillText("Parábens!", (canvas.width/2)-70, (canvas.height/2)+23)
    gameComplete = true
}

document.addEventListener("click", (e) => {
    if (gameOver || gameComplete) {
        location.reload()
    } 
})

document.addEventListener("keydown", (e) => {
    if (gameOver || gameComplete) {
        if(e.code === "Space" || e.key === "Escape") {
            location.reload()
        }
    }
})

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
    interacaoBolaEBlocos()
    contadorPontuacao()

    if(bola.posy + bola.raio > canvas.height) {
        houveColisao()
    }

    if(blocos.length === 0) {
        gameCompleted()
        bola.posx = -500
        bola.posy = -500
    }

    requestAnimationFrame(loop)
}

loop()