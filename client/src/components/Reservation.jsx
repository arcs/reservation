import React from 'react';
import styled from 'styled-components';
import ReactStars from 'react-stars';
import $ from 'jquery';

const MainContainer = styled.div`
  background-color: #fff;
  border: 1px solid #d3d8de;
  float: right;
  font-family: Lato, Arial, Helvetica Neue, sans-serif;
  height: 2320px;
  padding-left: 20px;
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
  margin-top: 20px;
`;

const Lightning = styled.div`
  background-image: url('https://s3-us-west-2.amazonaws.com/fec1-reservation-icons/instant-book.png');
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
  background-image: url('https://s3-us-west-2.amazonaws.com/fec1-reservation-icons/share.png');
  background-repeat: no-repeat;
  background-position: center;
  background-color: #fff;
  border: none;
  border-radius: 50%; 
  box-shadow: 0 1px 2px rgba(0,0,0,.16);
  cursor: pointer;
  height: 40px;
  margin: 0px 8px 0px 120px;
  touch-action: manipulation;
  width: 40px;
`;

const Favorite = styled.button`
  background-image: url('https://s3-us-west-2.amazonaws.com/fec1-reservation-icons/favorite.png');
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

const Reviews = styled.span`
  color: #323f4d;
  font-size: 16px;
  padding: 5px 0px 0px 5px; 
`;

const ReviewContainer = styled.div`
  display: inline-flex;
  padding-top: 16px;
`;

const Stars = styled.p`
  color: #5e6d77;
  font-size: 14px;
  font-style: italic;
  margin-top: -8px;
`;

const DatesContainer = styled.div`
  background-color: #fff;
  border: 1px solid #d3d8de;
  border-radius: 4px;
  height: 100px;
  margin: 120px 18px 8px auto;
`;

const CheckIn = styled.div`
  background-color: #fff; 
  background-image: url('https://s3-us-west-2.amazonaws.com/fec1-reservation-icons/calendar.png');
  background-position: 90%; 
  background-repeat: no-repeat;
  border-right: 1px solid #d3d8de;
  border-bottom: 1px solid #d3d8de;
  color: #0067db;
  cursor: pointer;
  float: left;
  height: auto;
  padding: 16px;
  width: 42%;
`;

const CheckOut = styled.div`
  background-color: #fff;
  background-image: url('https://s3-us-west-2.amazonaws.com/fec1-reservation-icons/calendar.png');
  background-position: 95%; 
  background-repeat: no-repeat;
  border-bottom: 1px solid #d3d8de;
  color: #0067db;
  cursor: pointer;
  height: auto;
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
  height: auto;
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
  margin-left: 16%;
  width: 240px;
`;

const BookingContainer = styled.div`
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
      $.get(`http://reservation.us-east-2.elasticbeanstalk.com/reservation/${propertyId}`, result => {
        this.setState({data: result[0], init: true});
      })
    } else {
      $.get('http://reservation.us-east-2.elasticbeanstalk.com/reservation', result => {
        console.log(result);
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
                    <ReviewContainer>
                      <ReactStars
                        count={5}
                        color1={'#C6CCD1'}
                        color2={'#2C2F34'}
                        edit={false}
                        size={24}
                        value={Number(this.state.data.starrating.slice(-3, -2))}
                      />
                      <Reviews>{this.state.data.reviewcount} Reviews</Reviews>
                    </ReviewContainer>
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
                </div>
            </MainContainer>
          </div>}
      </div>
    )
  }
}
