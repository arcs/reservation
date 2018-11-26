import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';

const Lightning = styled.div`
  background-image: url('./instant-book2.png');
  width: 27px;
  height: 27px;
  margin-top: 20px;
`;

const TopContainer = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  position: relative;
`;

const RowContainer = styled.section`
  align-items: stretch;
  display: flex;
  flex-direction: row;
  height: 40px;
`;

const Price = styled.h1`
  color: #323f4d;
  font-size: 32px;
  font-weight: bold;
  height: 32px;
  line-height: 0px;
  margin-right: 4px;
`;

const Average = styled.p`
  color: #5e6d77;
  font-size: 14px;
  height: 20px;
  line-height: 46px;
`;

const Reviews = styled.p`
  color: #323f4d;
  font-size: 14px;
`;

const Stars = styled.p`
  color: #5e6d77;
  font-size: 14px;
  font-style: italic;
  margin-top: -10px;
`;

const Book = styled.button`
  min-height: 48px;
  position: relative;
  border-radius: 100px;
  background-color: #0067db;
  border-color: #0067db;
  color: #fff;
  text-shadow: none;
  transition: all .25s ease-in-out;
  line-height: 24px;
  box-shadow: none;
  margin-bottom: 0;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  padding: 11px 32px;
  font-size: 1rem;
  user-select: none;
  display: block;
  width: 10%;
`;

const Question = styled.a`
  box-sizing: border-box;
  display: block;
  font-size: 16px;
  white-space: normal;
  min-height: 48px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 0;
  color: #0067db;
  font-weight: 400;
  border-color: transparent;
  background: none;
  background-color: transparent;
  position: relative;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  border: 1px solid transparent;
  border-radius: 100px;
  padding: 11px 96px;
  line-height: 24px;
`;

const Assistance = styled.p`
  padding-top: 8px;
  flex-direction: column;
  margin-bottom: 16px;
`;

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
      })
    } else {
      $.get('http://localhost:3001/reservation', result => {
        this.setState({data: result[0], init: true});
      }, 'json')
    }
  }

  render() {
    return (
      <div>
        {this.state.init &&
          <div id="sidebar-container">
            <div id="inner-container">
              <TopContainer>
              <div>
                <RowContainer>
                  <Lightning></Lightning>
                  <Price>${this.state.data.costpernight}</Price>
                  <Average> avg/night</Average>
                <div id="side-bar-icons">
                  <span id="sidebar-pic1"></span>
                  <span id="sidebar-pic2"></span>
                </div>
                </RowContainer>
              </div>
              <div id="stars-box">
                <span id="stars"></span>
                <Reviews>{this.state.data.reviewcount} Reviews</Reviews>
                <Stars>{this.state.data.starrating}</Stars>
              </div>
            </TopContainer>
              <div id="availabliities">
                <span id="check-mark"></span>
                <div> Your dates are <b>Available!</b></div>
                <span>Check In</span>
                <span> Check Out
                  <span id="check-out-date">
                    {' Nov ' + this.state.data.reserveddate}
                  </span>
                </span>
                <div id="guests">Guests<br/>
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
              <Book>Book Now</Book>
              <div>
                <Question>Ask Owner a Question</Question>
              </div>
              <Assistance>
              <span>For Booking assistance, call <b>888-829-7076</b><br/>
              <b>Property #</b> {this.state.data.propertyid}</span>
              </Assistance>
              <div id="feedback">Feedback</div>
            </div>
          </div>}
      </div>
    )
  }
}
