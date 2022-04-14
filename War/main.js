document.querySelector('#player1Draw').addEventListener('click', getCard1)
document.querySelector('#player2Draw').addEventListener('click', getCard2)
document.querySelector('#fightButton').addEventListener('click', fight)

let deckId = ''
// fetching the deck on page load
fetch('https://www.deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
.then(res => res.json()) // parse response as JSON
.then(data => {
  console.log(data)
  deckId = data.deck_id
})
.catch(err => {
    console.log(`error ${err}`)
});

let player1Val = 0
let player2Val = 0
let play1Score = 0;
let play2Score = 0;

function getCard1(){
   const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`

   fetch(url)
       .then(res => res.json()) // parse response as JSON
       .then(data => {
         console.log(data)
         document.querySelector('#player1Card').src = data.cards[0].image
         player1Val = convertFace(data.cards[0].value);
       })
       .catch(err => {
           console.log(`error ${err}`)
       });
 }

 function getCard2(){
    const url = `https://www.deckofcardsapi.com/api/deck/${deckId}/draw/?count=1`
 
    fetch(url)
        .then(res => res.json()) // parse response as JSON
        .then(data => {
          console.log(data)
          document.querySelector('#player2Card').src = data.cards[0].image
          player2Val = convertFace(data.cards[0].value);
        })
        .catch(err => {
            console.log(`error ${err}`)
        });
  }

function fight() {
    if(player1Val > player2Val) {
        document.querySelector("#endResult").innerText = "Player 1 Wins!"
        player1Score += 2
    }
    else if(player1Val < player2Val) {
        document.querySelector("#endResult").innerText = "Player 2 Wins!"
        player2Score += 2
    }
    else {
        document.querySelector('#endResult').innerText = "WAR!!!"
    }
}

function convertFace(val) {
    if(val === "ACE") {
        return 14
    }
    else if(val === "KING") {
        return 13
    }
    else if(val === "QUEEN") {
        return 12
    }
    else if(val === "JACK") {
        return 11
    }
    else {
        return Number(val)
    }
}