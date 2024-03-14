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
const gameBoard = document.querySelector('.game-board');
// Tableu de cartes cilquées
let selectedCards = []
//variables dont on a besoin pour chronomètre
let sp, btn_start, btn_stop, t, h, mn, s, ms
//function pour initialiser les variables quand la page se récharche
window.onload = function(){
    sp = document.getElementsByTagName("span")
    btn_start = document.querySelector('.start')
    btn_stop = document.querySelector('.stop')
    t
    h=0, mn=0, s=0, ms=0
}

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

// Afficher les cartes à l'utilisateur 
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
                    if(allCardsNotMatched.length == 0) {
                        alert ('Bravo vous avez gagné en: '+h+"h:"+mn+"min:"+s+"seg:"+ms+"ms")
                        stop()
                    }
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

//--------------------------------------------------------------------------------------------------------------

//Le chronomètre
//metre en place le compteur
function update_chrono(){
    ms+=1
    if(ms == 10){
        ms = 1
        s+=1
    }
    if(s == 60){
        s = 0
        mn+=1
    }
    if(mn == 60){
        mn = 0
        h+=1
    }   
    //insertion des valeurs dans les span, 
    //dont span[0] c'es le première span et ainsi de suite
    sp[0].innerHTML = h + "h"
    sp[1].innerHTML = mn + "mn"
    sp[2].innerHTML = s + "s"
    sp[3].innerHTML = ms + "ms"
}
//Mettre en place la fonction du buton_start
function start(){
    //cette ligne de code execute la fonction update_chrono
    //Tous les 100 ms
    t = setInterval(update_chrono, 100)
    btn_start.disabled = true
    //on enléve la class empty-board pour voir le game-board 
    gameBoard.classList.remove('empty-board')
}
//stopper le chronomètre 
function stop(){
    clearInterval(t) //supression de l'intervale que nous avions crée
    btn_start.disabled = false
}
//initialisér les valeurs du compteur
function reset(){
    clearInterval(t)
    btn_start.disabled = false
    h=0, mn=0, s=0, ms=0
    //recharge de la page (donc du jeu)
    location.reload()
    //insérer ces nouvelles valeurs dans les span
    sp[0].innerHTML = h + "h"
    sp[1].innerHTML = mn + "mn"
    sp[2].innerHTML = s + "s"
    sp[3].innerHTML = ms + "ms"
}

