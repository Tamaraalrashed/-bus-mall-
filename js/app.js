'use strict';

let productsArray = ['bag','banana', 'bathroom', 'boots', 'breakfast', 'bubblegum',
  'chair','cthulhu', 'dog-duck' , 'dragon', 'pen','pet-sweep','scissors',
  'shark', 'sweep', 'tauntaun', 'unicorn', 'usb','water-can','wine-glass'];


let productsArrayExtension = ['bag.jpg','banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg',
  'chair.jpg','cthulhu.jpg', 'dog-duck.jpg' , 'dragon.jpg', 'pen.jpg','pet-sweep.jpg','scissors.jpg',
  'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif','water-can.jpg','wine-glass.jpg'];

const productsSection = document.getElementById ( 'productsSection' );
const firstImage = document.getElementById( 'firstImage' );
const secondImage = document.getElementById( 'secondImage' );
const thirdImage = document.getElementById( 'thirdImage' );


function Products ( name,namewithEtension ){
  this.name = name;
  this.namewithEtension = namewithEtension;
  this.image = `./img/${namewithEtension}`;
  this.timesOfshown = 0;
  this.clicks = 0;
  Products.all.push( this );

}
Products.all = [];


for( let i = 0; i < productsArray.length; i++ ) {
  new Products( productsArray[i],productsArrayExtension[i] );

}

let firstProductIndex = 0;
let secondProductIndex = 0;
let thirdProductIndex = 0;


function renderNewProduct(){
  let firstIndex = randomNumber( 0,Products.all.length - 1 );
  firstImage.src = Products.all[firstIndex].image;
  firstImage.alt = Products.all[firstIndex].name;
  firstProductIndex = firstIndex;

  let secondIndex;
  do{
    secondIndex = randomNumber( 0,Products.all.length - 1 );}
  while( firstIndex === secondIndex );
  secondImage.src = Products.all[secondIndex].image;
  secondImage.alt = Products.all[secondIndex].name;
  secondProductIndex = secondIndex;

  let thirdIndex;
  do{

    thirdIndex = randomNumber( 0,Products.all.length - 1 );}
  while ( thirdIndex === secondIndex || thirdIndex === firstIndex );

  thirdImage.src = Products.all[thirdIndex].image;
  thirdImage.alt = Products.all[thirdIndex].name;
  thirdProductIndex = thirdIndex;

  Products.all[firstIndex].timesOfshown++;
  Products.all[secondIndex].timesOfshown++;
  Products.all[thirdIndex].timesOfshown++;

  firstImage.src = Products.all[0].image;
}

const clickingCounter = 25;
Products.counters = 0;




document.getElementById( 'results' ).style.visibility = 'hidden';


// console.log(Products.all);
function clicking ( event ) {

  if ( Products.counters < clickingCounter ){
    const clickedElement = event.target;
    if ( clickedElement.id === 'firstImage' || clickedElement.id === 'secondImage' || clickedElement.id === 'thirdImage' ){
      if ( clickedElement.id === 'firstImage' ){
        Products.all[firstProductIndex].clicks++;
      }

      if ( clickedElement.id === 'secondImage' ){
        Products.all[secondProductIndex].clicks++;
      }
      if ( clickedElement.id === 'thirdImage' ){
        Products.all[thirdProductIndex].clicks++;
      }
      Products.counters++;


      renderNewProduct();
      // console.log( Products.all[firstProductIndex] );
      console.log( Products.all[secondProductIndex] );

      // console.log( Products.all );
    }
  }
  else{
    document.getElementById( 'results' ).style.visibility = 'visible';

  }
}


productsSection.addEventListener( 'click', clicking );

renderNewProduct();




// function list() {
//   const parentElement = document.getElementById ( 'theList' );
//   const listElement = document.createElement( 'list' );
//   listElement.id = 'myList';
//   parentElement.appendChild( listElement );
//   for ( let j = 0; j < Products.counters.length ; j ++ ){
//     listElement.textContent = `${Products.name[j]} had ${Products.timesOfshown[j]} votes`;
//     console.log( listElement.textContent );
//   }

// }

// list();
// renderNewProduct();























































function randomNumber( min, max ) {
  return Math.floor( Math.random() * ( max - min + 1 ) ) + min;
}
