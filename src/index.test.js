import React from 'react';
import { mount } from 'enzyme';
import Reservation from '../db/index.js';

describe('Jest and Enzyme tests should be working', () => {
  test('Make sure Jest is working', () => {
    expect(true).toBe(true);
  });

  test('Make sure Enzyme method mount is working', () => {
    const divTest = <div>hello</div>;
    const answer = mount(divTest);
    expect(answer.text()).toBe('hello');
  });
});

describe('Database should be returning info correctly', () => {
  test('Confirm we have a 100th booking', done => {
    Reservation.find({propertyId: 100}).exec(function(err, data) {
      if (err) {
        console.log('Error finding 1000th photo', err);
      } else {
        expect(data[0].propertyId).toBe(100);
        done();
      }
    })
  });
  test('One booking should have the correct properties', () => {
    expect.assertions(4);
    return Reservation.find({propertyId: 100}).exec()
      .then(data => {
        expect(data[0].reviewCount).toBe(44);
        expect(data[0].availableDate).toBe(28);
        expect(data[0].reservedDate).toBe(26);
        expect(typeof data[0].costPerNight).toBe('number');
      })
  })
});