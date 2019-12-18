const rock = document.querySelector('.rock')
const paper = document.querySelector('.paper')
const scissors = document.querySelector('.scissors')
const reset = document.querySelector('#reset')

let compScore = 0;
let playerScore = 0;

const result = document.querySelector('.result')

const compCard = document.querySelector('#computer')
const playerCard = document.querySelector('#player1')

compCard.textContent = `computer: ${compScore}`
playerCard.textContent = `player1: ${playerScore}`

rock.addEventListener('click', function(e){
    let gameArr = ['rock', 'paper', 'scissors']
    let compChoice = gameArr[Math.floor(Math.random() * gameArr.length)]
    if (compChoice === 'paper'){
        compScore++
        result.textContent = `Computer chose ${compChoice}. You lose! paper beats rock`
        compCard.textContent = `computer: ${compScore}`
        playerCard.textContent = `player1: ${playerScore}`       
    }else if (compChoice === 'scissors'){
        playerScore++
        result.textContent = `Computer chose ${compChoice}. You win! rock beat scissors`
        compCard.textContent = `computer: ${compScore}`
        playerCard.textContent = `player1: ${playerScore}`
    }else{
            result.textContent = `It's a tie. Computer chose ${compChoice} too!`
            compCard.textContent = `computer: ${compScore}`
            playerCard.textContent = `player1: ${playerScore}`
    }
    if (playerScore === 5 || compScore === 5){
        rock.disabled = true
        paper.disabled = true
        scissors.disabled = true
        if (playerScore > compScore){
            result.textContent = 'Game Over! You won!!'
        }else{
            result.textContent = 'Game Over! You lost!!'
        }
    }
})    
paper.addEventListener('click', function(e){
    let gameArr = ['rock', 'paper', 'scissors']
    let compChoice = gameArr[Math.floor(Math.random() * gameArr.length)]
    if (compChoice === 'rock'){
        playerScore++
        result.textContent = `Computer chose ${compChoice}. You win! paper beats rock`
        compCard.textContent = `computer: ${compScore}`
        playerCard.textContent = `player1: ${playerScore}`  
    }else if (compChoice === 'scissors'){
        compScore++
        result.textContent = `Computer chose ${compChoice}. You lose! scissors beat paper`
        compCard.textContent = `computer: ${compScore}`
        playerCard.textContent = `player1: ${playerScore}`
    }else{
        result.textContent = `It's a tie. Computer chose ${compChoice} too!`
        compCard.textContent = `computer: ${compScore}`
        playerCard.textContent = `player1: ${playerScore}`
    
    }
    if (playerScore === 5 || compScore === 5){
        rock.disabled = true
        paper.disabled = true
        scissors.disabled = true
        if (playerScore > compScore){
            result.textContent = 'Game Over! You won!!'
        }else{
            result.textContent = 'Game Over! You lost!!'
        }
    }
})
scissors.addEventListener('click', function(e){
    let gameArr = ['rock', 'paper', 'scissors']
    let compChoice = gameArr[Math.floor(Math.random() * gameArr.length)]
    if (compChoice === 'paper'){
        playerScore++
        result.textContent = `Computer chose ${compChoice}. You win! scissors beat paper`
        compCard.textContent = `computer: ${compScore}`
        playerCard.textContent = `player1: ${playerScore}`
    }else if (compChoice === 'rock'){
        compScore++
        result.textContent = `Computer chose ${compChoice}. You lose! rock beat scissors`
        compCard.textContent = `computer: ${compScore}`
        playerCard.textContent = `player1: ${playerScore}`
    }else{
        result.textContent = `It's a tie. Computer chose ${compChoice} too!`
        compCard.textContent = `computer: ${compScore}`
        playerCard.textContent = `player1: ${playerScore}`
    }
    if (playerScore === 5 || compScore === 5){
        rock.disabled = true
        paper.disabled = true
        scissors.disabled = true
        if (playerScore > compScore){
            result.textContent = 'Game Over! You won!!'
        }else{
            result.textContent = 'Game Over! You lost!!'
        }
    }
})
reset.addEventListener('click', function(e){
    rock.disabled = false
    paper.disabled = false
    scissors.disabled = false
    result.textContent = ''
    compCard.textContent = 'computer: 0'
    playerCard.textContent = 'player1: 0'
    compScore = 0;
    playerScore = 0;
})