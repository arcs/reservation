import React from "react";
import $ from "jquery";

export default class Reservation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      init: false,
      property: null,
      data: null
    };
  }

  componentDidMount() {
    let propertyId = Number(window.location.pathname.replace(/\//,''));
    if (propertyId > 0) {
      $.get(`http://localhost:3001/reservation/${propertyId}`, result => {
        this.setState({data: result[0], init: true});
        console.log(result);
      })
    } else {
      $.get('http://localhost:3001/reservation', result => {
        this.setState({data: result[0], init: true});
        console.log(result);
      }, 'json')
    }
  }

  render () {
    return (
      <div>
        {this.state.init &&
        <div id="sidebar-container">
          <div id="inner-container">
            <div id="sidebar-top">
              <div id="sidebar-price">
                <span id="lightning-bolt"></span>
                <span id="price"><b>${this.state.data.costpernight}</b>
                </span>
                <span> avg/night</span>
              </div>
              <div id="side-bar-icons">
                <span id="sidebar-pic1"></span>
                <span id="sidebar-pic2"></span>
              </div>
            </div>
            <div id="stars-box">
              <span id="stars">STARS</span>
              <span id="stars-reviews"> {this.state.data.reviewcount} Reviews</span><br/>
              <span id="stars-fraction">{this.state.data.starrating}</span>
            </div>
            <div id="availabliities">
              <span id="check-mark"></span>
              <div> Your dates are <b>Available!</b></div>
              <span>Check In</span>
              <span> Check Out
                <span id="check-out-date">
                  {' Nov ' + this.state.data.reserveddate}
                </span>
              </span>
              <div id="guests">Guests
                <span id="guest-count"> # of guests</span>
              </div>
            </div>
            <div id="book-now-box">
              <span>Total</span>
              <span id="booking-cost">
                {/*{$('#price').val() * ((Number($('#check-out-date').text().slice(-2))) - (Number($('#check-in-date').text().slice(-2)))) + ($('#price').val() * ((Number($('#check-out-date').text().slice(-2))) - (Number($('#check-in-date').text().slice(-2)))) * .15) + 30}*/}
              </span>
              <span> Includes taxes and fees</span><br/>
              <span id="view-details"> View details</span>
            </div>
            <button id="book-now">Book Now</button>
            <div id="contact-owner">Ask Owner a Question</div>
            <span>For Booking assistance, call <b>888-829-7076</b></span><br/>
            <span><b>Property #</b>{this.state.data.propertyid}</span>
            <div id="feedback">Feedback</div>
          </div>
        </div>
        }
      </div>
    )
  }
}
