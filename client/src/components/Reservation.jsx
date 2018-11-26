import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';

const MainContainer = styled.div`
  height: 1080px;
  width: 400px;
  float: right;
  padding: 25px;
  border: 1px solid #d3d8de;
  font-family: Lato,Arial,Helvetica Neue,sans-serif;
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

const Lightning = styled.div`
  background-image: url('./instant-book.png');
  filter: brightness(0%);
  width: 27px;
  height: 27px;
  margin-top: 20px;
`;

const Price = styled.h1`
  color: #323f4d;
  font-size: 32px;
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

const Widget = styled.div`
  display: flex;
  flex-direction: row;
  height: 40px;
  box-sizing: border-box;
`;

const Share = styled.button`
  background-image: url('./share.png');
  background-repeat: no-repeat;
  background-position: center;
  background-color: white;
  width: 40px;
  height: 40px;
  margin-left: 100px;
  margin-right: 8px;
  border: none;
  touch-action: manipulation;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0,0,0,.16);
  border-radius: 50%; 
`;

const Favorite = styled.button`
  background-image: url('./favorite.png');
  background-repeat: no-repeat;
  background-position: center; 
  background-color: white;
  width: 40px;
  height: 40px;
  border: none;
  touch-action: manipulation;
  cursor: pointer;
  box-shadow: 0 1px 2px rgba(0,0,0,.16);
  border-radius: 50%; 
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

const DatesContainer = styled.div`
  margin-bottom: 8px;
  background-color: #fff;
  border: 1px solid #d3d8de;
  border-radius: 4px;
`;

const CheckIn = styled.div`
  background-color: #fff;
  width: 170px;
  border-right: 1px solid #d3d8de;
  border-bottom: 1px solid #d3d8de;
  float: left;
  background-image: url('./calendar.png');
  background-repeat: no-repeat;
  background-position: 170px; 
  background-color: white; 
  touch-action: manipulation;
  cursor: pointer;
  padding: 16px;
`;

const CheckOut = styled.div`
  background-color: #fff;
  width: auto;
  border-bottom: 1px solid #d3d8de;
  background-image: url('./calendar.png');
  background-repeat: no-repeat;
  background-position: 370px; 
  background-color: white;
  touch-action: manipulation;
  cursor: pointer;
  padding: 16px;
`;

const Guests = styled.div`
  float: bottom;
`;

const Book = styled.button`
  min-height: 48px;
  border-radius: 100px;
  background-color: #0067db;
  color: #fff;
  text-align: center;
  touch-action: manipulation;
  cursor: pointer;
  border: 1px solid transparent;
  padding: 11px 32px;
  font-size: 1rem;
  display: block;
  width: 365px;
`;

const Question = styled.a`
  display: block;
  color: #0067db;
  text-align: center;
  touch-action: manipulation;
  cursor: pointer;
  border-radius: 100px;
  padding: 20px
`;

const Assistance = styled.p`
  text-align: center;
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
            <MainContainer>
              <div id="inner-container">
                <TopContainer>
                <div>
                  <RowContainer>
                    <Lightning></Lightning>
                    <Price>${this.state.data.costpernight}</Price>
                    <Average> avg/night</Average>
                    <div>
                      <Widget>
                        <Share></Share>
                        <Favorite></Favorite>
                      </Widget>
                    </div>
                  </RowContainer>
                </div>
                <div id="stars-box">
                  <span id="stars"></span>
                  <Reviews>{this.state.data.reviewcount} Reviews</Reviews>
                  <Stars>{this.state.data.starrating}</Stars>
                </div>
              </TopContainer>
                <DatesContainer>
                  <div id="availablities">
                    <CheckIn>Check In</CheckIn>
                    <CheckOut>Check Out</CheckOut>
                    <Guests>Guests</Guests>
                  </div>
                </DatesContainer>
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
            </MainContainer>
          </div>}
      </div>
    )
  }
}
