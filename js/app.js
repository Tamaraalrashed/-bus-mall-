'use strict';

let productsArray = ['bag.jpg','banana.jpg', 'bathroom.jpg', 'boots.jpg', 'breakfast.jpg', 'bubblegum.jpg',
  'chair.jpg','cthulhu.jpg', 'dog-duck.jpg' , 'dragon.jpg', 'pen.jpg','pet-sweep.jpg','scissors.jpg',
  'shark.jpg', 'sweep.png', 'tauntaun.jpg', 'unicorn.jpg', 'usb.gif','water-can.jpg','wine-glass.jpg'];

const productsSection = document.getElementById ( 'productsSection' );
const firstImage = document.getElementById( 'firstImage' );
const secondImage = document.getElementById( 'secondImage' );
const thirdImage = document.getElementById( 'thirdImage' );


function Products ( name,img ){
  this.name = name;
  this.image = `./img/${img}`;
  this.timesOfshown = 0;
  this.clicks = 0;
  Products.all.push( this );

}
Products.all = [];

function getName( fileName ) {
  return fileName.split( '.' ).slice( 0,-1 ).join( '.' );
}

for( let i = 0; i < productsArray.length; i++ ) {
  new Products( getName ( productsArray[i] ),productsArray[i] );

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

}


document.getElementById( 'results' ).style.visibility = 'hidden';

const clickingCounter = 25;
Products.counters = 0;

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


    }
  }
  else{
    renderChart();
    document.getElementById( 'results' ).style.visibility = 'visible';
    removeEventListener( 'click', clicking );
  }
}


productsSection.addEventListener( 'click', clicking );

renderNewProduct();



const button = document.getElementById( 'results' );
function list() {
  console.log( Products.all );
  const parentElement = document.getElementById ( 'list' );
  for ( let j = 0; j < Products.all.length ; j ++ ){
    const l1Element = document.createElement( 'li' );
    parentElement.appendChild( l1Element );
    l1Element.textContent = `${Products.all[j].name} had ${Products.all[j].timesOfshown} votes and was seen  ${Products.all[j].clicks}.`;
    console.log( l1Element.textContent );
  }

}

renderNewProduct();
removeEventListener( 'click', clicking );
button.addEventListener( 'click', list );

let ctx = document.getElementById( 'myChart' ).getContext( '2d' );

function renderChart(){
  let nameArray = [];
  let clicksArray = [];
  let shownsArray = [];


  for( let i = 0; i < Products.all.length; i++ ) {
    nameArray.push( Products.all[i].name );
    clicksArray.push( Products.all[i].clicks );
    shownsArray.push( Products.all[i].timesOfshown );

  }

  new Chart ( ctx, {
    type: 'bar',
    data: {
      labels: nameArray,
      datasets: [
        {
          label: '# of Votes',
          data: shownsArray,
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 3,
        },
        {
          label: '# of Seens',
          data: clicksArray,
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          borderColor: 'rgba(54, 162, 235, 0.2)',
          borderWidth: 3,
        }
      ]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  } );
}




function randomNumber( min, max ) {
  let newIndex = Math.floor( Math.random() * ( max - min + 1 ) ) + min;
  while( newIndex === firstProductIndex || newIndex === secondProductIndex || newIndex === thirdProductIndex ){
    newIndex = Math.floor( Math.random() * ( max - min + 1 ) ) + min;
  }
  return newIndex;
}
