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
      backgroundColor: '#f5f5f5',
      padding: 15,
      marginBottom: 15,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3
    },
    autor: {
      fontWeight: 'bold',
      color: '#007bff'
    },
    descripcion: {
      fontSize: 16,
      marginVertical: 5,
      color: '#333'
    },

    likeContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 5
    },
    likeCount: {
        marginLeft: 6,
        fontSize: 14,
        color: '#333'
    },
    botonEliminar: {
      backgroundColor: '#d32f2f',
      padding: 10,
      marginTop: 8,
      borderRadius: 25,
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
      alignSelf: 'flex-end'
    }
  });