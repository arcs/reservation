import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    let propertyId = Number(window.location.pathname.replace(/\//,''));
    if (propertyId > 0) {
      $.get(`/reservations/${propertyId}`, result => {
        console.log('This is a test');
        this.setState({data: result})
      })
    } else {
      $.get('/reservations', result => {
        this.setState({data: result[0]})
      }, 'json')
    }
  }

  render () {
    return (
      <div>Hello World!</div>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));
