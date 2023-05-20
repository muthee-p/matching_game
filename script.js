const images = [
  'images/2_of_clubs.png',
  'images/ace_of_spades.png',
  'images/3_of_diamonds.png',
  'images/4_of_hearts.png',
  'images/5_of_clubs.png',
  'images/6_of_spades.png',
  'images/7_of_diamonds.png',
  'images/9_of_hearts.png',
  'images/10_of_clubs.png',
  'images/king_of_spades.png',
  'images/queen_of_diamonds.png',
  'images/jack_of_hearts.png',
  
];

let cards = [];
let card1 = null;
let card2 = null;
let clickCount = 0;
let matchCount = 0;
let startTime = null;
let timerInterval = null;

function createImageElement(src, index) {
  const img = document.createElement('img');
  img.src = src;
  img.className = 'hide';
  img.onclick = function () {
    clicked(this, index);
  };
  return img;
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function createGrid() {
  const gridContainer = document.getElementById('gridContainer');
  shuffleArray(images);

  // Take only the first 8 items from the shuffled array
  const selectedImages = images.slice(0, 8);

  // Duplicate each image in the selected array
  const duplicateImages = selectedImages.concat(selectedImages);

  shuffleArray(duplicateImages);

  // Create a 4x4 grid layout
  const grid = document.createElement('div');
  grid.className = 'grid';

  for (let i = 0; i < 16; i++) {
    const card = createImageElement(duplicateImages[i], i);
    grid.appendChild(card);
  }

  gridContainer.appendChild(grid);
}



function clicked(card, index) {
  if (card1 == null) {
    card.classList.add('show');
    card1 = {
      element: card,
      index: index
    };
  } else if (card2 == null) {
    card.classList.add('show');
    card2 = {
      element: card,
      index: index
    };

    clickCount++;
    document.getElementById('clickCount').textContent = clickCount;

    if (clickCount === 1) {
      startTime = new Date();
      timerInterval = setInterval(updateTimer, 1000);
    }
    setTimeout(checkMatch, 1000);
  }
}

function checkMatch() {
  if (card1.element.src == card2.element.src) {
    card1 = null;
    card2 = null;
     matchCount++;

      if (matchCount === 8) {
      clearInterval(timerInterval);
      const endTime = new Date();
      const gameTime = Math.floor((endTime - startTime) / 1000);
      setTimeout(function () {
        showPopup(gameTime, clickCount);
      }, 500);
    }
  } else {
    card1.element.classList.remove('show');
    card2.element.classList.remove('show');

    card1 = null;
    card2 = null;
  }
}

function updateTimer() {
  const currentTime = new Date();
  const gameTime = Math.floor((currentTime - startTime) / 1000);
  document.getElementById('timer').textContent = gameTime;
}

function showPopup(gameTime, clickCount) {
  const popup = document.createElement('div');
  popup.className = 'popup';

  const message = document.createElement('p');
  message.textContent = `Congratulations! You completed the game in ${gameTime} seconds with ${clickCount} moves.`;
  popup.appendChild(message);

  const playAgainButton = document.createElement('button');
  playAgainButton.textContent = 'Play Again';
  playAgainButton.onclick = resetGame;
  popup.appendChild(playAgainButton);

  document.body.appendChild(popup);
}


function resetGame() {
  card1 = null;
  card2 = null;
  clickCount = 0;
  matchCount = 0;
  startTime = null;
  clearInterval(timerInterval);

  const gridContainer = document.getElementById('gridContainer');
  gridContainer.innerHTML = '';

  const popup = document.querySelector('.popup');
  if (popup) {
    popup.remove();
  }

  createGrid();
  document.getElementById('clickCount').textContent = clickCount;
  document.getElementById('timer').textContent = '0';
}

// Initialize the game
createGrid();
