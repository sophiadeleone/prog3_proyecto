import React, { Component } from 'react'
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { db, auth } from '../firebase/config';


export default class CrearPosts extends Component {

  constructor(props) {
    super(props);
    this.state = {
        description: '',
        error: ''
    };
  }

  crearPost() {
    if (this.state.description === '') {
        this.setState({ error: 'El post no puede estar vacío' });
    } else {
        db.collection('posts').add({
            owner: auth.currentUser.email,
            description: this.state.description,
            createdAt: Date.now(),
            
        })
        .then(() => {
          this.props.navigation.navigate("Home");
      })
        
        
        .catch(error => console.log(error));
    }
  }

  render() {
      return (
          <View style={styles.container}>
              <Text style={styles.titulo}>Crear Post</Text>

              <TextInput
                  value={this.state.description}
                  onChangeText={(text) => this.setState({ description: text })}
                  placeholder="Comparti lo que pensas con tus amigos!"
                  style={styles.input}
                  
              />
              
              {this.state.error !== '' && (
                  <Text style={styles.error}>{this.state.error}</Text> //muestro mensaje de error en caso de ser necesario 
              )}

              <TouchableOpacity onPress={() => this.crearPost()} style={styles.boton}>
                  <Text style={styles.textoBoton}>Publicar</Text>
              </TouchableOpacity>
          </View>
      );

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 20,
    justifyContent: 'center'
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#333'
  },
  input: {
    height: 120,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    backgroundColor: '#f9f9f9',
    padding: 12,
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 15
  },
  boton: {
    backgroundColor: '#007bff',
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3
  },
  textoBoton: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 14
  }
});
