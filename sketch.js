var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;
var feed;
var lastFed1;
var timeli
var lasFedS

//crea aquí las variables feed y lastFed 


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;
 

  //tiempo
  lastFed1=hour();

  timeli=database.ref('FeedTime');
  timeli.on("value", function(data){
lasFedS=data.val();
  })

  //crea aquí el boton Alimentar al perro
feed=createButton("Alimento al perro");
feed.position(650, 95);
feed.mousePressed(feedDog )


  addFood=createButton("Agregar Alimento");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //escribe el código para leer el valor de tiempo de alimentación de la base de datos
 
 
  //escribe el código para mostrar el texto lastFed time aquí
  fill("white")
  textSize(17)
text("Ultima hora en que se alimento: " + lastFed1, 100, 30) 
  drawSprites();
}

//función para leer la Existencia de alimento

function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);

  //escribe el código aquí para actualizar las existencia de alimento, y la última vez que se alimentó al perro
var foodsstockval=foodObj.getFoodStock();
if(foodsstockval<=0){
  foodObj.updateFoodStock(foodsstockval*0);
}
else{
  foodObj.updateFoodStock(foodsstockval-1);
}

lasFedS=lastFed1
  database.ref('/').update({
FeedTime:lasFedS
  })


}

//funcón para agregar alimento al almacén
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}


