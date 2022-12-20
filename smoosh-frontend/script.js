var previousCard = document.getElementById('previous');
var nextCard = document.getElementById('next');
var previousCard = document.getElementById('previous');
var cards = [
  ['main-window', '#FCE4EC'],
  ['second-window', '#F1F8E9'],
  ['third-window', '#E3F2FD']
];

nextCard.addEventListener('click', function() {
  console.log('test')
  setNextCard()
})

previousCard.addEventListener('click', function() {
  setPreviousCard();
})

function setNextCard() {
  var elm = cards.shift();
  cards.push(elm);
  console.log(cards);
  updateCard('forward');
}

function setPreviousCard() {
  var elm = cards.pop();
  cards.unshift(elm);
  updateCard();
}

function updateCard(direction) {
  for (var i = 0; i <= cards.length; i++) {
    if (i === 0) {
      document.getElementById(cards[i][0]).classList.remove('animated-back');

      if (direction === 'forward') {
        document.getElementById(cards[i][0]).classList.add('focus');

      } else {
        document.getElementById(cards[i][0]).classList.add('animated-focus');

      }
      document.getElementById(cards[i][0]).classList.remove('back');
      document.getElementById(cards[i][0]).classList.remove('middle');

      document.getElementById('container').style.background = cards[i][1];
    } else if (i === 1) {
      document.getElementById(cards[i][0]).classList.add('middle');
      document.getElementById(cards[i][0]).classList.remove('focus');
      document.getElementById(cards[i][0]).classList.remove('back');
      document.getElementById(cards[i][0]).classList.remove('animated-back');
      document.getElementById(cards[i][0]).classList.remove('animated-focus');

    } else if (i === 2) {
      document.getElementById(cards[i][0]).classList.remove('animated-focus');

      if (direction === 'forward') {
        document.getElementById(cards[i][0]).classList.add('animated-back');
      } else {
        document.getElementById(cards[i][0]).classList.add('back');

      }
      document.getElementById(cards[i][0]).classList.remove('focus');
      document.getElementById(cards[i][0]).classList.remove('middle');

    }
  }
  console.log(cards)
}