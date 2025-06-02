import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';
import { FontAwesome } from '@expo/vector-icons';

export default class Post extends Component {
    constructor(props) {
      super(props);
      this.state = {
        likes: this.props.data.likes
      };
    }

    meGusta() {
        const user = auth.currentUser.email;
        const idPost = this.props.id;
        const arrayDeLikes = this.state.likes;
      
        if (arrayDeLikes.includes(user)) {
          const nuevoArray = arrayDeLikes.filter(email => email !== user);
          db.collection('posts').doc(idPost).update({ likes: nuevoArray });
          this.setState({ likes: nuevoArray });
        } else {
          arrayDeLikes.push(user);
          db.collection('posts').doc(idPost).update({ likes: arrayDeLikes });
          this.setState({ likes: arrayDeLikes });
        }
      }
      
      borrarPost() {
        db.collection('posts')
          .doc(this.props.id)
          .delete();
      }
    
      render() {
        console.log('')
        return (
          <View style={styles.card}>
            <Text style={styles.autor}>{this.props.data.owner}</Text>
            <Text style={styles.descripcion}>{this.props.data.description}</Text>
    
            <TouchableOpacity onPress={() => this.meGusta()} style={styles.likeContainer}>
            <FontAwesome
                name={this.state.likes.includes(auth.currentUser.email) ? 'heart' : 'heart-o'}
                size={20}
                color={this.state.likes.includes(auth.currentUser.email) ? 'red' : '#007bff'}
                />
            <Text style={styles.likeCount}>{this.state.likes.length}</Text>
            </TouchableOpacity>

            {this.props.estaEnPerfil ? (
              <TouchableOpacity
                onPress={() => this.borrarPost()}
                style={styles.botonEliminar}
              >
                <FontAwesome name='trash' size={16} color='#fff' />
              </TouchableOpacity>
            ) : null}
          </View>
        );
      }
}

const styles = StyleSheet.create({
    card: {
      backgroundColor: '#F5EFFF', // fondo de la card
      paddingVertical: 10,
      padding: 15,
      marginBottom: 15,
      borderRadius: 12,
      borderWidth: 2,
      borderColor: '#CDC1FF', //este era el color lila de mi paelta de colores 
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.05,
      shadowRadius: 4,
      elevation: 3
    },
    autor: {
      fontWeight: 'bold',
      color: '#7371FC', // lila fuerte
      fontSize: 15
    },
    descripcion: {
      fontSize: 16,
      marginVertical: 6,
      color: '#2E2E2E'
    },
    likeContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 6
    },
    likeCount: {
      marginLeft: 6,
      fontSize: 14,
      color: '#333'
    },
    botonEliminar: {
      backgroundColor: '#A594F9',
      padding: 10,
      marginTop: 10,
      borderRadius: 20,
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      alignSelf: 'flex-end'
    }
  });
  