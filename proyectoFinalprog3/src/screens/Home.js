import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import Posts from '../components/Posts';

class Home extends Component {
    
      render() {
        return (
          <View style={styles.container}>
    
            <Posts />

          </View>
        );
      }
    }

export default Home;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      width: '100%',
      padding: 10,
      backgroundColor: '#ffffff'
    },
    titulo: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: '#333333'
    }
  });
  