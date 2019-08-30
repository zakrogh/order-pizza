function Pizza(size, toppings){
  this.size = size;
  for(let i = 0; i < toppings.length; i++){
    this.toppings.push(toppings[i]);
  }
}

$(document).ready(function(){
  $("#buildpizza").click(function(){
    $(".modal").modal();
  });
});
