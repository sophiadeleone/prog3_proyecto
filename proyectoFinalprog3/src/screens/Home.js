import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Posts from '../components/Posts';

class Home extends Component {
    
      render() {
        return (
          <View style={styles.container}>
            <Text style={styles.titulo}>Se está diciendo...</Text> 
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
      backgroundColor: '#E5D9F2' // fondo lavanda claro de la paleta de colores que elegimos
    },
    titulo: {
      fontSize: 28,
      fontWeight: 'bold',
      textAlign: 'center',
      color: '#7371FC',
      marginBottom: 20,
      fontFamily: 'Georgia'
      }
  });
  
  