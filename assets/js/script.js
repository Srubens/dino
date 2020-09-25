(function(){
    
    'use script'

    const dino = document.querySelector('[data-js="dino"]');
    const background = document.querySelector('[data-js="background"]')
    //VARIAVEL PARA ELE NÃO DAR BUG DOS PULOS 
    let isJump = false
    let position = 0
    document.addEventListener('keyup', handleKeyUp)

    //QUANDO O USUARIO CLICAR NA BARRA DE ESPAÇO
    function handleKeyUp (event){
        if(event.keyCode === 32){
            if (!isJump){
                jump()
            }
        }
    }

    //FAZ COM Q O DINO PULE 
    function jump(){

        isJump = true
        let upInterval = setInterval(() =>{
            if(position >= 150){
                //PARA O INTERVALO DA SUBIDA
                clearInterval(upInterval)
                let downInterval = setInterval(() =>{
                    if(position <= 0){
                        //PARA O INTERVALO DA DECIDA
                        clearInterval(downInterval)
                        isJump = false
                    }else{
                        position -= 20
                        dino.style.bottom = position + 'px'
                    }
                }, 22)//CASO MUDE O TEMPO ALTERAR AQUI TB
            }else{
                position += 20
                dino.style.bottom = position + 'px'
            }
        }, 22)//CASO MUDE O TEMPO ALTERAR AQUI TB

    }

    //CRIAÇÃO DO CACTO
    function createCactus(){
        const cactus = document.createElement('div')
        let cactusPosition = 1000
        let randomTime = Math.random() * 5000

        cactus.classList.add('cactus')
        cactus.style.left = 1000 + 'px'
        background.appendChild(cactus)
 
        let leftInterval = setInterval(() =>{
            //PARA O CACTO NÃO FICAR CONSUMINDO MEMORIA
            if(cactusPosition < -60){
                clearInterval(leftInterval)
                background.removeChild(cactus)
            //CASO ELE BATA NO CACTO FIM DE JOGO
            }else if(cactusPosition > 0 && cactusPosition < 60 && position < 60){
                clearInterval(leftInterval)
                document.body.innerHTML = `<h1 class="game-over">Fim de Jogo</h1>`
                clearInterval(randomTime)
            }else{
                cactusPosition -= 10
                cactus.style.left = cactusPosition + 'px'
            }
        }, 20)

        setTimeout(createCactus, randomTime)

    }

    createCactus()

})()