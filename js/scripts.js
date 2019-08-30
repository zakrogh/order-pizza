//Pizza Logic
function Pizza(size, toppings){
  this.size = size;
  for(let i = 0; i < toppings.length; i++){
    this.toppings.push(toppings[i]);
  }
}

Pizza.prototype.calculatePrice = function (){

}

//Front End Logic
$(document).ready(function(){
  $("#buildpizza").click(function(){
    $(".modal").modal();
  });
  $(".mainform").submit(function(event){
    event.preventDefault();
  });
});
