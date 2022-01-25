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
  if (this.ticket[id] != undefined) {
    return this.ticket[id];
  }
  return false;
};

TicketCart.prototype.deleteTicket = function(id){
  if (this.ticket[id] === undefined) {
    return false;
  }
  delete this.ticket[id];
  return trequestAnimationFrame;
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