//busness logic for CART
function TicketCart() {
  this.movieTickets = {};
  this.currentId = 0;
  // this.total = 0;
}

TicketCart.prototype.addTicket = function(ticket) {
  ticket.id = this.assignId();
  this.movieTickets[ticket.id] = ticket;
};

TicketCart.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

TicketCart.prototype.findTicket = function(id) {
  if (this.movieTickets[id] != undefined) {
    return this.movieTickets[id];
  }
  return false;
};

TicketCart.prototype.deleteTicket = function(id) {
  if (this.movieTickets[id] === undefined) {
    return false;
  }
  delete this.movieTickets[id];
  return true;
};



//busness logic for ticket
function Ticket (movieTitle, showTime, ageType) {
  this.movieTitle = movieTitle;
  this.showTime = showTime;
  this.ageType = ageType;
}

// Ticket.prototype.eaPrice = function() {
//   this.price = 5;
//   if (this.movieTitle === "New Release"){
//     this.price += 2;
//   } else if (this.movieTitle === "Throwback") {
//     //throwback tickets are standard price
//   } 
 
//   if (this.movieTime === "Evening") {
//     this.price += 2.5;
//   } else if (this.movieTime === "Matinee") {
//     //matinee tickets are standard price
//   } 
  
//   if (this.ageType === "Adult") {
//     this.price += 2.5;
//   } else if (this.ageType === "Child" || this.price === "Senior") {
//     //child & sr ticket price is standard
//   } 
//   return this.price
// }


//UI logic
let cart = new TicketCart();  // global variable not always good idea but okay for now

function displayTicketDetails(cartToDisplay) {
  let ticketList = $("ul#tickets");
  let htmlForTicketInfo = "";  //
  Object.keys(cartToDisplay.movieTickets).forEach(function(key) {  
    const ticket = cartToDisplay.findTicket(key);
    htmlForTicketInfo += "<li id=" + ticket.id + ">" + ticket.ageType + " - " + ticket.movieTitle + " - "  + ticket.showTime + "</li>";
  });  //+ price
  ticketList.html(htmlForTicketInfo);
}

function showTicketDetails(ticketId) {
  const ticket = cart.findTicket(ticketId);
  $("#ticket-details").show();
  $(".movie").html(ticket.movie);
  $(".time").html(ticket.time);
  $(".age").html(ticket.age);
  let buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + ticket.id + ">Delete</button>");
}

function attachTicketListener() {
  $("ul#tickets").on("click", "li", function() {
    showTicketDetails(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    cart.deleteTicket(this.id);
    $("#ticket-details").hide();
    displayTicketDetails(cart);
  });
}

$(document).ready(function() {
  attachTicketListener();
  $("form#add-ticket").submit(function(event) {
    event.preventDefault();
    const inputMovie = $("#movie").val();
    const inputTime = $("#time").val();
    const inputAge = $("#age").val();
    let newTicket = new Ticket(inputMovie, inputTime, inputAge);
    cart.addTicket(newTicket);  
    displayTicketDetails(cart);
  });
});