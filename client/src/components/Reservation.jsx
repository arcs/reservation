import React from "react";
import $ from "jquery";

// const data = {
//   price: [86, 95, 103, 110, 115, 121, 130, 150, 155, 166, 177, 199, 225, 265, 305, 455, 510],
//   reviewCount: [4, 8, 16, 23, 33, 45, 57, 61],
//   rating: ['Exceptional 5/5', 'Awesome 4/5', 'Great 3/5'],
//   checkin: [18, 19, 20, 21, 22],
//   checkout: [25, 26, 27, 28, 29, 30],
//   guests: ['2 guests', '2 guests, pets', '3 guests, pets', '3 guests', '4 guests', '4 guests, pets', '5 guests', '5 guests, pets', '6 guests', '6 guests, pets']
// };

export default class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      property: null,
      data: null
    };
  }

  componentDidMount() {
    let propertyId = Number(window.location.pathname.replace(/\//,''));
    if (propertyId > 0) {
      $.get(`/reservation/${propertyId}`, result => {
        this.setState({data: result})
      })
    } else {
      $.get('/reservation', result => {
        this.setState({data: result[0]})
      }, 'json')
    }
  }

  render () {
    return (
      <div>
        <div id="sidebar-container">
          <div id="inner-container">
            <div id="sidebar-top">
              <div id="sidebar-price">
                <span id="lightning-bolt"></span>
                <span id="price"><b>${this.state.data.price[Math.floor(Math.random() * this.state.data.price.length)]}</b>
                </span>
                <span> per night</span>
              </div>
              <div id="side-bar-icons">
                <span id="sidebar-pic1"></span>
                <span id="sidebar-pic2"></span>
              </div>
            </div>
            <div id="stars-box">
              <span id="stars">STARS</span>
              <span id="stars-reviews">{this.state.data.reviewCount[Math.floor(Math.random() * this.state.data.reviewCount.length)]} Reviews</span>
              <span id="stars-fraction">{this.state.data.rating[Math.floor(Math.random() * this.state.data.rating.length)]}</span>
            </div>
            <div id="availabliities">
              <span id="check-mark"></span>
              <span> Your dates are <b>Available!</b></span>
              <div>Check In
                <span id="check-in-date">
                  {'Nov ' + this.state.data.checkin[Math.floor(Math.random() * this.state.data.checkin.length)]}
                </span>
              </div>
              <div>Check Out
                <span id="check-out-date">
                  {'Nov ' + this.state.data.checkout[Math.floor(Math.random() * this.state.data.checkout.length)]}
                </span>
              </div>
              <div id="guests">Guests
                <span id="guest-count">
                  {this.state.data.guests[Math.floor(Math.random() * this.state.data.guests.length)]}
                </span>
              </div>
            </div>
            <div id="book-now-box">
              <span>Total</span>
              <span id="booking-cost">
                {$('#price').val() * ((Number($('#check-out-date').text().slice(-2))) - (Number($('#check-in-date').text().slice(-2)))) + ($('#price').val() * ((Number($('#check-out-date').text().slice(-2))) - (Number($('#check-in-date').text().slice(-2)))) * .15) + 30}
              </span>
              <span>Includes taxes and fees</span>
              <span id="view-details">View details</span>
            </div>
            <button id="book-now">Book Now</button>
            <div id="contact-owner">Ask Owner a Question</div>
            <span>For Booking assistance, call <b>888-829-7076</b></span>
            <span><b>Property #</b>{' ' + Math.random() * 100000 + 'vb'}</span>
            <div id="feedback">Feedback</div>
          </div>
        </div>
      </div>
    )
  }
}
