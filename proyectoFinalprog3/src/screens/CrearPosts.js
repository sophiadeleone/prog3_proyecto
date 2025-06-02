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
            likes: []
            
        })
        .then(() => {
          // Limpio el campo para que cuando el usuario quiera volver a escribir, el campo este vacio. 
          this.setState({
            description: '',
            error: ''
          });
          // Navegoo a Home
          this.props.navigation.navigate("Home")
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
                  placeholderTextColor="#999" //queria que el texto se vea mas clarito y encontre que con placeholderTextColor deja el texto gris. Y tiene que ir en el TextInput
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
    backgroundColor: '#E5D9F2',
    padding: 20,
    justifyContent: 'center'
  },
  titulo: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#7371FC',
    letterSpacing: 0.5,
    fontFamily: 'Georgia'
  },
  input: {
    height: 200,                     
    width: '80%',                     
    alignSelf: 'center',              
    borderColor: '#CDC1FF',
    borderWidth: 1.5,
    borderRadius: 12,
    backgroundColor: '#F5EFFF',
    padding: 14,
    fontSize: 16,
    textAlignVertical: 'top',
    marginBottom: 15,
    color: '#2E2E2E'
  },
  
  boton: {
    backgroundColor: '#7371FC',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 30,
    width: '50%',              
    alignSelf: 'center',       
    marginTop: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 3
  },
  
  textoBoton: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    letterSpacing: 0.3,
    alignSelf: 'center',
    fontFamily: 'Georgia'

  },
  error: {
    color: '#D32F2F',
    textAlign: 'center',
    marginBottom: 10,
    fontSize: 14
  }
});
