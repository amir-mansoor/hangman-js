"use strict";

const randomWords = [
  "python",
  "c",
  "c++",
  "javascript",
  "java",
  "ruby",
  "golang"
]

let answer = ""
let maxWrongs = 6
let guessed = []
let wordStatus = null
let mistakes = 0

function generateWord() {
  answer = randomWords[Math.floor(Math.random() * randomWords.length)]
  console.log(answer)
}

function handleWord(choosenLetter) {
  guessed.indexOf(choosenLetter) === -1 ? guessed.push(choosenLetter) : null
  if(answer.indexOf(choosenLetter) >= 0) {
      guessedWord()
      checkGameWon()
  } else {
    mistakes++
    upadteMistakes()
    checkGameLost()
    updateHangmanImage()
  }
}

function checkGameWon() {
  if(wordStatus === answer) {
    document.querySelector('.hidden').style.display = "block"
    document.querySelector('.hidden').innerHTML = "You won the game"
  }
}

function checkGameLost() {
  if(mistakes === maxWrongs) {
    document.getElementById("dashes").innerHTML = `The word is ${answer}`
    document.querySelector('.hidden').style.display = "block"
  }
}

function guessedWord() {
  wordStatus = answer.split('').map(text => (guessed.indexOf(text) >= 0 ? text : " _ ")).join("")
  document.getElementById("dashes").innerHTML = wordStatus
}

function updateHangmanImage() {
  let img = document.querySelector("img")
  img.src = `./images/${mistakes}.jpg`
}

function generateButtons() {
  let buttons = "abcdefghijklmnopqrstuvwhyz".split('').map(text =>
    `<button class="button" id=${text} onclick=handleWord("`+ text +`")>${text}</button>`
  ).join("")

  document.getElementById("keyboard").innerHTML = buttons
}

function upadteMistakes() {
  document.getElementById("mistakes").innerHTML = mistakes
}

document.getElementById("wrong").innerHTML = maxWrongs

function reset() {
  guessed = []
  mistakes = 0
  let img = document.querySelector("img")
  img.src = `./images/${mistakes}.jpg`
  document.querySelector('.hidden').style.display = "none"
  generateWord()
  generateButtons()
  guessedWord()
  upadteMistakes()
}

generateButtons()
generateWord()
guessedWord()
