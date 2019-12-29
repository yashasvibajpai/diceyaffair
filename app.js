/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer,gameOn;

initialize();


document.querySelector('.btn-roll').addEventListener('click',function(){ // without (), referred as callback function

//rolling Dice
  // A random no.
if(gameOn){
  var dice = Math.floor(Math.random()*6)+1;

  //display
  var diceDOM = document.querySelector('.dice');
  diceDOM.style.display = 'block';
  diceDOM.src = 'dice-' + dice + '.png';
  //Update round's score when rolled number is not none
  if (dice !== 1){ // no type conversion bec. of ===
    roundScore+=dice;
    document.querySelector('#current-'+ activePlayer).textContent=roundScore;
    //Add the score
  }
  else
   {
     nextPlayer();
   }
 }
});



document.querySelector('.btn-hold').addEventListener('click',function(){
if(gameOn){
  //Add current score to total score until
  scores[activePlayer] += roundScore;


  // Update UI
  document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

  //Check if someone won?
  if(scores[activePlayer]>=100){
    document.querySelector('#name-' + activePlayer).textContent = "Winner!!!";
    document.querySelector('.dice').style.display = 'none';
    document.querySelector('.player-'+ activePlayer + '-panel').classList.add('winner');
    document.querySelector('.player-'+ activePlayer + '-panel').classList.remove('active');
    gameOn=false;
  }
  else {
    //nextPlayer
    nextPlayer();
  }
}
});


function nextPlayer(){
  activePlayer ===0 ? activePlayer =1 : activePlayer =0;
  roundScore=0;//Go to other player

  //changing in UI
  document.getElementById('current-0').textContent = '0';
  document.getElementById('current-1').textContent = '0';

  document.querySelector('.player-0-panel').classList.toggle('active');
  document.querySelector('.player-1-panel').classList.toggle('active');

  document.querySelector('.dice').style.display='none';

  //document.querySelector('.player-0-panel').classList.remove('active');
  //document.querySelector('.player-1-panel').classList.add('active');


}



// document.querySelector('.btn-roll').addEventListener('click'.function btn(){
//
// }); //, referred as anonymous function

document.querySelector('.btn-new').addEventListener('click', initialize);




function initialize(){


// 0 for 1st player 1 for 2nd player in scores array
scores = [0,0];
roundScore = 0;
activePlayer = 0;
gameOn=true;

//DOM Manipulation

//querySelector finds the first occurence, DOM Manipulation
// document.querySelector('#cu rrent-'+activePlayer).textContent = dice; // typecasting automatic
// document.querySelector('#current-'+activePlayer).innerHTML = '<em>' + dice + '</em>'; // everytime html in js, enclose in ' ' as a string

// var x = document.querySelector('#score-1').textContent;
document.querySelector('.dice').style.display = 'none'; // .style.<css property> =<css-value>

//EVENT HANDLING

//faster method than query querySelector
document.getElementById('score-0').textContent = '0';
document.getElementById('score-1').textContent = '0';
document.getElementById('current-0').textContent = '0';
document.getElementById('current-1').textContent = '0';
document.getElementById('name-0').textContent = 'Player 1';
document.getElementById('name-1').textContent = 'Player 2';
//removing winner even if it is not there
document.querySelector('.player-0-panel').classList.remove('winner');
document.querySelector('.player-1-panel').classList.remove('winner');
document.querySelector('.player-0-panel').classList.remove('active');
document.querySelector('.player-1-panel').classList.remove('active');
document.querySelector('.player-0-panel').classList.add('active');
//reset all back for a new game
}
