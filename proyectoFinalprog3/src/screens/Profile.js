import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, db } from "../firebase/config"; 
import Posts from '../components/Posts'; 
import { FontAwesome } from '@expo/vector-icons';

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userEmail: '',
            userName: '',
            cantidadPosteos: 0
        };
    }

    componentDidMount() {
        const user = auth.currentUser;
        if (user) {
            this.setState({ userEmail: user.email });

            db.collection("users")
              .where("owner", "==", user.email)
              .onSnapshot((docs) => {
                docs.forEach((doc) => {
                    this.setState({ userName: doc.data().username });
                });
              });
        
            db.collection("posts")
              .where("owner", "==", user.email)
              .onSnapshot((docs) => {
                this.setState({ cantidadPosteos: docs.size });
            });
            
        }
    }

    logout() {
        auth.signOut()
            .then(() => {
                this.props.navigation.navigate("Login");
            })
            .catch(err => console.log("err en signout", err));
    }

    render() {
        console.log('Render en perfil')
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Mi Perfil</Text>
                <Text style={styles.info}><FontAwesome name='envelope' size={16} />  Email: {this.state.userEmail}</Text>
                <Text style={styles.info}><FontAwesome name='user' size={16} />  Usuario: {this.state.userName}</Text>
                
                {this.state.cantidadPosteos === 0 && (
                  <Text style={styles.sinPosteos}>¡Todavía no creaste ningún posteo!</Text>
                )}
                
                <Posts estaEnPerfil={true} />

                <TouchableOpacity onPress={() => this.logout()} style={styles.botonLogout}>
                    <FontAwesome name='sign-out' size={16} color='white' />
                    <Text style={styles.textoBoton}>  Cerrar Sesión</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: '5%',
      backgroundColor: '#E5D9F2',
      alignItems: 'center'
    },
    titulo: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: '#7371FC' // lila fuerte
    },
    info: {
      fontSize: 18,
      marginBottom: 16,
      color: '#2E2E2E',
      backgroundColor: '#F5EFFF', 
      paddingVertical: 10,
      paddingHorizontal: 14,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#CDC1FF',
      textAlign: 'center',
      fontWeight: '500',
      fontFamily: 'Georgia' ,
      width: '100%',
    },
    botonLogout: {
      backgroundColor: '#7371FC',
      paddingVertical: 12,
      paddingHorizontal: 20,
      borderRadius: 25,
      marginTop: 30,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      alignSelf: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3
    },
    textoBoton: {
      color: '#fff',
      fontSize: 16,
      fontWeight: 'bold'
    },
    sinPosteos: {
      fontSize: 18,
      marginBottom: 16,
      color: '#2E2E2E',
      backgroundColor: '#F5EFFF', 
      paddingVertical: 10,
      paddingHorizontal: 14,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#CDC1FF',
      textAlign: 'center',
      fontWeight: '500',
      fontFamily: 'Georgia' ,
      width: '100%',
      height: 70,
      textAlignVertical: 'center',
      alignSelf: 'center', 
    }
  });
  

export default Profile;

