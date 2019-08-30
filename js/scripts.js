function Order(){
  this.pizzas = [];
}

//Pizza Logic
function Pizza(size, toppings){
  this.size = size;
  this.toppings = toppings;
}

Pizza.prototype.calculatePrice = function (){

}

//Front End Logic
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
    placeHolder += '<div class="panel-body body' + i + '">' + "<strong>Toppings:</strong> " + listItems + '<br><strong></div>';
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
}
var clearForm = function(){
  $("#pizzasize").val("small");
  $.each($("input[name='topping']:checked"), function (){
    $(this).prop("checked", false);
  })
}

$(document).ready(function(){
  var myOrder = new Order();
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
