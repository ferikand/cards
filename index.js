let deckId;
let computerScore = 0;
let myScore = 0;
const cardContainer = document.querySelector("#cards");
const newDeckBtn = document.querySelector("#shuffle-btn");
const drawCardBtn = document.querySelector("#draw-btn");
const whoWin = document.querySelector("#whoWin");
const remainingCards = document.querySelector("#remaining-cards");
const computerScoreEl = document.querySelector("#computer-score");
const myScoreEl = document.querySelector("#my-score");

function displayRemainingCards(data) {
  remainingCards.innerText = `Remaining cards: ${data.remaining}`;
}

function clearCard() {
  for (let child of cardContainer.children) {
    child.innerHTML = "";
  }
  whoWin.innerHTML = "Game Of War";
}

function newDeck() {
  computerScoreEl.textContent = "0";
  myScoreEl.textContent = "0";
  drawCardBtn.disabled = false;
  clearCard();
  fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/")
    .then((res) => res.json())
    .then((data) => {
      deckId = data.deck_id;
      displayRemainingCards(data);
    });
}
newDeck();

function determineCardWinner(data) {
  const valueOptions = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "JACK",
    "QUEEN",
    "KING",
    "ACE",
  ];

  if (
    valueOptions.indexOf(data.cards[0].value) >
    valueOptions.indexOf(data.cards[1].value)
  ) {
    whoWin.innerText = "Card 1 Won!";
    computerScore += 1;
    computerScoreEl.textContent = computerScore;
  } else if (
    valueOptions.indexOf(data.cards[0].value) <
    valueOptions.indexOf(data.cards[1].value)
  ) {
    whoWin.innerText = "Card 2 Won!";
    myScore += 1;
    myScoreEl.textContent = myScore;
  } else {
    whoWin.innerText = "It's a tie!";
  }

  if (!data.remaining) {
    if (computerScore > myScore) {
      whoWin.innerText = "Computer is the WINNER";
    } else if (computerScore < myScore) {
      whoWin.innerText = "I am the WINNER";
    } else {
      whoWin.innerText = "IT'S A TIE GAME!";
    }
    drawCardBtn.disabled = true;
  }
}

function drawCard() {
  fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw/?count=2`)
    .then((res) => res.json())
    .then((data) => {
      // console.log(data.remaining);
      data.cards.forEach((card, i) => {
        // console.log(card.value);
        cardContainer.children[i].innerHTML = `
      <img src="${card.image}" class='card' alt="card" />
      `;
      });

      displayRemainingCards(data);
      determineCardWinner(data);
    });
}

newDeckBtn.addEventListener("click", newDeck);
drawCardBtn.addEventListener("click", drawCard);
