//Business Logc
function Order(){
  this.pizzas = [];
}

//Pizza Logic
function Pizza(size, toppings){
  this.size = size;
  this.toppings = toppings;
  this.price = this.calculatePrice();
}

//base price is $10, each topping is $2
Pizza.prototype.calculatePrice = function (){
  let price = 10.0;
  switch(this.size){
    case "Small":
      price *= 1;
      break;
    case "Medium":
      price *= 1.2;
      break;
    case "Large":
      price *= 1.5;
      break;
    case "Extra Large":
      price *= 2;
      break;
    case "Gigantic":
      price *= 5
      break;
  }
  price += this.toppings.length * 2;
  return price;
}

var deletePizza = function(myOrder, num){
  myOrder.pizzas.splice(num, 1);
}

//Front End Logic

//This is kind of a mess but it essentially puts
// the pizza info into a panel inside of a column
// and then wraps that column in a row, making sure
// that each row has 1-3 columns
var displayOrder = function(myOrder){
  $(".orderpanel").show();
  $(".order").text("");
  for(let i = 0; i < myOrder.pizzas.length; i++){
    var placeHolder = "";
    var oldWrapper;
    var wrapper;
    var listItems = '<ul><li>Cheese</li><li>Sauce</li>';
    for(let j = 0; j < myOrder.pizzas[i].toppings.length; j++){
      listItems += '<li>' + myOrder.pizzas[i].toppings[j] + '</li>';
    }
    listItems += '</ul>';

    placeHolder += '<div class="col-md-4 column' + i + '">';
    placeHolder += '<div class="panel panel-info pizza' + i + '" id="pizza' + i + '">';
    placeHolder += '<div class="panel-heading heading' + i + '">' + "Pizza " + (i + 1) + '</div>';
    placeHolder += '<div class="panel-body body' + i + '">' + "<strong>Size:</strong> " + myOrder.pizzas[i].size + "<br><strong>Toppings:</strong> " + listItems + '<br><strong> Price:</strong> $'+ myOrder.pizzas[i].price +'</div>';
    placeHolder += '<button class="btn btn-warning deletebutton delete' + i + '">Delete</button>';
    placeHolder += '</div></div>';
    $(".order").append(placeHolder);
    if((i % 3) === 0 && i > 0){
      wrapper = ".column" + (i);
      $(wrapper).wrap('<div class="row"></div>');
    }else if((i % 3) === 1){
      oldWrapper = ".column" + (i - 1);
      wrapper = ".column" + (i) + ", " + oldWrapper;
      $(oldWrapper).unwrap()
      $(wrapper).wrapAll('<div class="row"></div>');
    }else if((i % 3 ) === 2){
      oldWrapper = ".column" + (i - 2) + ", " + ".column" + (i - 1);
      wrapper = ".column" + (i) + ", " + oldWrapper;
      $(oldWrapper).unwrap();
      $(wrapper).wrapAll('<div class="row"></div>');
    }else{
      $(".column0").wrap('<div class="row"></div>');
    }
  }
  let total = 0;
  for(let i = 0; i < myOrder.pizzas.length; i++){
    total += myOrder.pizzas[i].price;
  }
  $(".total").text("Your Total is: $" + total);
}
var clearForm = function(){
  $("#pizzasize").val("Small");
  $.each($("input[name='topping']:checked"), function (){
    $(this).prop("checked", false);
  })
}
function attachPizzaListeners(myOrder) {
  //delete button logic for deleting pizzas
  $(".order").on("click", ".deletebutton", function() {
    let classArray = this.className.split("");
    pizzaToDelete = classArray[classArray.length - 1];
    deletePizza(myOrder, pizzaToDelete);
    displayOrder(myOrder);
  });
};

$(document).ready(function(){
  var myOrder = new Order();
  attachPizzaListeners(myOrder);
  $("#buildpizza").click(function(){
    $(".modal").modal();
  });
  $(".mainform").submit(function(event){
    let toppings = [];
    $.each($("input[name='topping']:checked"), function (){
      toppings.push($(this).val());
    })
    let size = $("#pizzasize").val();
    var newPizza = new Pizza(size, toppings)
    myOrder.pizzas.push(newPizza);
    displayOrder(myOrder);
    clearForm();
    $(".modal").modal('hide');
    event.preventDefault();
  });
});
