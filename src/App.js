import './App.css';
import React, { Component } from 'react';
import { ChakraBaseProvider, extendBaseTheme } from '@chakra-ui/react'
// `@chakra-ui/theme` is a part of the base install with `@chakra-ui/react`
import chakraTheme from '@chakra-ui/theme'

import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Navigation from './components/Navigation/Navigation';
import EmployeesTable from './components/EmployeesTable/EmployeesTable';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const { Button } = chakraTheme.components

const theme = extendBaseTheme({
  components: {
    Button,
  },
})

const initialState = {
  route: 'signin',
  isSignedIn: false,
  username: '',
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({ username: data.username });
  };

  onRouteChange = (route) => {
    if (route === 'signout') {
      localStorage.removeItem('token');
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({ isSignedIn: true, route: 'home' })
    } else {
      this.setState({ route: route })
    }
  }

  render() {
    return (
      <ChakraBaseProvider theme={theme}>
        <div className='App'>
          <Navigation onRouteChange={this.onRouteChange} isSignedIn={this.state.isSignedIn} />
          {
            this.state.route === 'home' ?
              <div>
                <EmployeesTable />
              </div>
              :
              this.state.route === 'signin' ?
                <Signin onRouteChange={this.onRouteChange} loadUser={this.loadUser}></Signin>
                :
                <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}></Register>
          }
        </div>
        <ToastContainer></ToastContainer>
      </ChakraBaseProvider>
    )
  }
}

export default App;
