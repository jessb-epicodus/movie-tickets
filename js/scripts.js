//busness logic for CART
function TicketCart() {
  this.movieTickets = {};  // object that stores NewMovieTicket objects
  this.currentId = 0;  // creates ID @ 0 as soon as new TicketCart is declared/created
}

TicketCart.prototype.addTicket = function(ticket) {
  ticket.id = this.assignId();
  this.movieTickets[ticket.id] = ticket;
};

TicketCart.prototype.assignId = function() { //assigns unique ID soon as ticket is declared/created
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

//busness logic for TICKETS
function NewMovieTicket (movie, time, age) {
  this.movie = movie;
  this.time = time;
  this.age = age;
}

//UI logic
let cart = new TicketCart();  // global variable not always good idea but okay for now

function displayTicketDetails(cartToDisplay) {
  let ticketList = $("ul#tickets");
  let htmlForTicketInfo = "";  //
  Object.keys(cartToDisplay.movieTickets).forEach(function(key) {  
    const ticket = cartToDisplay.findTicket(key);
    htmlForTicketInfo += "<li id=" + ticket.id + ">" + "Ticket " + ticket.id + "</li>";
  });
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
    let newTicket = new NewMovieTicket(inputMovie, inputTime, inputAge);  // new Ticket objet passing in this gathered info as argumants
    cart.addTicket(newTicket);  
    displayTicketDetails(cart);
  });
});