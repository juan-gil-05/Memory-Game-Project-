
// Tableu avec les images des cartes
const cards = [
    'https://picsum.photos/id/237/100/100',
    'https://picsum.photos/id/238/100/100',
    'https://picsum.photos/id/239/100/100',
    'https://picsum.photos/id/240/100/100',
    'https://picsum.photos/id/241/100/100',
    'https://picsum.photos/id/242/100/100',
    'https://picsum.photos/id/243/100/100',
    'https://picsum.photos/id/244/100/100'
];
// On appele l'element game-board
const gameBoard = document.getElementById('game-board');
// Tableu de cartes cilquées
let selectedCards = []


// Fonction pour créer les cartes avec les images 
function createCard(CardUrl) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = CardUrl;

    const cardContent = document.createElement('img');
    cardContent.classList.add('card-content');
    cardContent.src = `${CardUrl}`;
    card.appendChild(cardContent);

    // On met un listener pour retourner la carte cliquée 
    card.addEventListener('click', onCardClick)
    return card;
}

// Fonction pour dupliquer les images du tableu cards
function duplicateArray(arraySimple) {
    let arrayDouble = []
    arrayDouble.push(...arraySimple)
    arrayDouble.push(...arraySimple)
    return arrayDouble
}

// Fonction pour mettre les cards en ordre aleatoire 
function shuffleArray(arrayToShuffle) {
    const arrayShuffled = arrayToShuffle.sort(() => 0.5 - Math.random())
    return arrayShuffled
}

//melanger les cartes
let allCards = duplicateArray(cards)
allCards = shuffleArray(allCards)

// Affichage des cartes à l'utilisateur 
allCards.forEach(card => {
    const cardHtml = createCard(card)
    gameBoard.appendChild(cardHtml)
})

// Fonction pour retourner une carte
function onCardClick(e) {
    const card = e.target.parentElement
    card.classList.add('flip')
    // Fonction pour identifier si on a trouve une paire ou pas
    selectedCards.push(card)
    if (selectedCards.length == 2){
        // On met du temps pour que l'utilisateur puisse voir la deuxième carte
        setTimeout(() => {
            if (selectedCards[0].dataset.value == selectedCards[1].dataset.value){
                //On a trouvé une paire 
                selectedCards[0].classList.add('matched')
                selectedCards[1].classList.add('matched')
                selectedCards[0].removeEventListener('click', onCardClick)
                selectedCards[1].removeEventListener('click', onCardClick)
                // methode pour savoir si l'utilisateur a gangé avec un delai
                setTimeout(() => {
                    const allCardsNotMatched = document.querySelectorAll('.card:not(.matched)')
                    if(allCardsNotMatched.length == 0) alert ('Bravo vous avez gagné')
                },1000)
            }
            else{
                //On s'est trompé
                selectedCards[0].classList.remove('flip')
                selectedCards[1].classList.remove('flip')
                
            }
            selectedCards = []
        }, 1000)
    }
}

