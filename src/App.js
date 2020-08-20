import React, { Component } from 'react';
import Main from './components/MainComponent';
import './App.css';
import {BrowserRouter } from 'react-router-dom';
import {Provider } from 'react-redux';
import { ConfigureStore } from './Redux/configureStore';

const store = ConfigureStore();

class App extends Component {

    constructor(props){
      super(props);
      this.state = {
        visibility : false
      }
    }
  
  render(){   
    var visibility = false;
    return (
      <Provider store={store}>
      <BrowserRouter>
      <div>
        <Main/>
      </div>
      </BrowserRouter>
      </Provider>
    );
  }
  
}

export default App;
