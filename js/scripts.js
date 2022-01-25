//busness logic for CART
function TicketCart() {
  this.movieTickets = {};  // object that stores NewMovieTicket objects
  this.currentId = 0;  // creates ID @ 0 as soon as new TicketCart is declared/created
}

TicketCart.prototype.assignId = function() { //assigns unique ID soon as ticket is declared/created
  this.currentID += 1;
  return this.currentId;
};

TicketCart.prototype.addTicket = function(ticket) { 
  ticket.id = this.assignId();
  this.movieTickets[ticket.id] = ticket;
};

//busness logic for TICKETS
function NewMovieTicket (movie, time, age) {
  this.movie = movie;
  this.time = time;
  this.age = age;
}

NewMovieTicket.prototype.ticketDetails = function() {
  return this.movie + " " + this.time + " " + this.age;
};

// //UI logic
// $(document).ready(function() {
//   $("form#add-ticket").submit(function(event) {
//     event.preventDefault();
//   }
// });