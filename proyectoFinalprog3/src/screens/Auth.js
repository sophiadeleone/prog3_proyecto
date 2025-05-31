import React, { Component } from 'react';
import { auth } from '../firebase/config';

class Auth extends Component {
  componentDidMount() {
    auth.onAuthStateChanged(user => {
      if (user) {
        this.props.navigation.navigate('Tab'); // si usiario esta logueado
      } else {
        this.props.navigation.navigate('Login'); // significa q el usuario no esta logueado
      }
    });
  }

  render() {
    return null; // pq hace falta renderizar nada, tdo lo q quiero es q rediriga
  }
}

export default Auth;
