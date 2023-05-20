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
  cards = selectedImages.concat(selectedImages);

  shuffleArray(cards);

  cards.forEach(function (image, index) {
    gridContainer.appendChild(createImageElement(image, index));
  });
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

    setTimeout(checkMatch, 1000);
  }
}

function checkMatch() {
  if (card1.element.src == card2.element.src) {
    card1 = null;
    card2 = null;
  } else {
    card1.element.classList.remove('show');
    card2.element.classList.remove('show');

    card1 = null;
    card2 = null;
  }
}

function resetGame() {
  card1 = null;
  card2 = null;
  const gridContainer = document.getElementById('gridContainer');
  gridContainer.innerHTML = '';
  createGrid();
}

// Initialize the game
createGrid();
