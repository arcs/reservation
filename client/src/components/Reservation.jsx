import React from 'react';
import styled from 'styled-components';
import $ from 'jquery';

const MainContainer = styled.div`
  border: 1px solid #d3d8de;
  float: right;
  font-family: Lato, Arial, Helvetica Neue, sans-serif;
  height: 1080px;
  padding: 150px 160px 0px 20px;
  width: 400px;
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
  height: 27px;
  margin-top: 20px;
  width: 27px;
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
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  height: 40px;
`;

const Share = styled.button`
  background-image: url('./share.png');
  background-repeat: no-repeat;
  background-position: center;
  background-color: #fff;
  border: none;
  border-radius: 50%; 
  box-shadow: 0 1px 2px rgba(0,0,0,.16);
  cursor: pointer;
  height: 40px;
  margin-left: 100px;
  margin-right: 8px;
  touch-action: manipulation;
  width: 40px;
`;

const Favorite = styled.button`
  background-image: url('./favorite.png');
  background-repeat: no-repeat;
  background-position: center; 
  background-color: #fff;
  border: none;
  border-radius: 50%; 
  box-shadow: 0 1px 2px rgba(0,0,0,.16);
  cursor: pointer;
  height: 40px;
  width: 40px;
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
  background-color: #fff;
  border: 1px solid #d3d8de;
  border-radius: 4px;
  margin-bottom: 8px;
`;

const CheckIn = styled.div`
  background-color: #fff; 
  background-image: url('./calendar.png');
  background-position: 170px; 
  background-repeat: no-repeat;
  border-right: 1px solid #d3d8de;
  border-bottom: 1px solid #d3d8de;
  color: #0067db;
  cursor: pointer;
  float: left;
  padding: 16px;
  touch-action: manipulation;
  width: 170px;
`;

const CheckOut = styled.div`
  background-color: #fff;
  background-image: url('./calendar.png');
  background-position: 370px; 
  background-repeat: no-repeat;
  border-bottom: 1px solid #d3d8de;
  color: #0067db;
  cursor: pointer;
  padding: 16px;
  width: auto;
`;

const CheckOutPad = styled.span`
  margin-left: 16px;
`;

const Guests = styled.div`
  background-color: #fff;
  background-position: 370px; 
  background-repeat: no-repeat;
  border-bottom: 1px solid #d3d8de;
  color: #0067db;
  cursor: pointer;
  padding: 16px;
  width: auto;
`;

const Book = styled.button`
  background-color: #0067db;
  border: 1px solid transparent;
  border-radius: 100px;
  color: #fff;
  cursor: pointer;
  font-size: 1rem;
  min-height: 48px;
  width: 240px;
`;

const BookingContainer = styled.div`
  text-align: center;
  padding: 16px;
`;

const Question = styled.a`
  border-radius: 100px;
  color: #0067db;
  cursor: pointer;
  display: block;
  padding: 16px;
  text-align: center;
`;

const Assistance = styled.p`
  text-align: center;
`;

const Feedback = styled.button`
  background-color: #fff;
  border-bottom-width: 0;
  border-color: #d3d8de;
  border-radius: 4px 4px 0 0;
  color: #0067db;
  margin-left: 400px;
  margin-top: 620px;
  min-height: 48px;
  text-shadow: no
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
          <div>
            <MainContainer>
              <div>
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
                <div>
                  <Reviews>{this.state.data.reviewcount} Reviews</Reviews>
                  <Stars>{this.state.data.starrating}</Stars>
                </div>
              </TopContainer>
                <DatesContainer>
                  <div>
                    <CheckIn>Check In</CheckIn>
                    <CheckOut><CheckOutPad>Check Out</CheckOutPad></CheckOut>
                    <Guests>Guests</Guests>
                  </div>
                </DatesContainer>
                <BookingContainer>
                  <Book>Book Now</Book>
                </BookingContainer>
                <div>
                  <Question>Ask Owner a Question</Question>
                </div>
                <Assistance>
                  <span>For Booking assistance, call <b>888-829-7076</b><br/>
                  <b>Property #</b> {this.state.data.propertyid}</span>
                </Assistance>
                <div>
                  <Feedback>Feedback</Feedback>
                </div>
              </div>
            </MainContainer>
          </div>}
      </div>
    )
  }
}
