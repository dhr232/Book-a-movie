const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const movieList = document.getElementById("movie");
var ticketPrice = +movieList.value;


//To recall the last saved state using JSON file.
populateUI();

//Update slected movie index and price. Save it in localStorage
function setMovieData(movieIndex, moviePrice) {
  // 3.Add received value from our selection to localstorage. Cache memory
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

//4. Update data with selected seats and price
function updateValues() {
  // To only select empties sits
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  // [...] will add whole Array()
  //map will return a value. forEach will only search through array
  const seatsIndex = [...selectedSeats].map(function(seat) {
    //Recall particular selected seat
    return [...seats].indexOf(seat);
  });
  //store selected seats in cache memory
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;
  //Update the total selected seats and total price
  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;

}

//5. UI get data from localStorage. Retrieve the last selection
function populateUI() {
  //To retrieve data for selected seats from setmoviedata
  //JSON.parse will covert string data to array
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if(selectedSeats !== null && selectedSeats.length>0){
    //check its beginning or person is coming back
    seats.forEach((seat, index)=>{
      if(selectedSeats.indexOf(index) > -1){
        seat.classList.add("selected");
      }
    });
  }
  //To retrieve data for movie selection from updateValues
  const selectedMovieIndex= localStorage.getItem("selectedMovieIndex");
  if(selectedMovieIndex !== null){
    movieList.selectedIndex = selectedMovieIndex;
  }
  //To retrieve data for total price and total selection
  const totalTicketPrice = localStorage.getItem("selectedMoviePrice");
  if(totalTicketPrice !== 0){
    ticketPrice = totalTicketPrice;
  }
}

// 1. We add eventlistener on movielist
movieList.addEventListener("change", (e) => {
  // + sign will convert target.value which is string type to int
  ticketPrice = +e.target.value;
  // Send 2 values of movieIndex(1,2,3,4) and moviePrice to setMovieData()
  setMovieData(e.target.selectedIndex, e.target.value);
  // To update value as we select it. Realtime
  updateValues();
});
// 2. Add event listener on seat selection
container.addEventListener("click", (e) => {
  //check click is happenig on only at seat not on any other part of screen
  if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
    //toggle the css class of selected to make it blue or empty
    e.target.classList.toggle("selected");
    //update the last line
    updateValues();
  }
});

//Update value to recent ones. This is for last line for total selected seats and total price
updateValues();
