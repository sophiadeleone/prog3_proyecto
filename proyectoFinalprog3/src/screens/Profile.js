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
            userName: ''
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
      backgroundColor: '#E5D9F2' // color lavanda claro
    },
    titulo: {
      fontSize: 26,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: '#7371FC' // lila fuerte
    },
    info: {
      fontSize: 15,
      marginBottom: 12,
      color: '#2E2E2E',
      backgroundColor: '#F5EFFF', 
      paddingVertical: 10,
      paddingHorizontal: 14,
      borderRadius: 10,
      borderWidth: 1,
      borderColor: '#CDC1FF', // contorno lila claro
      width: '25%',
      textAlign: 'left',
      fontWeight: '500',
      fontFamily: 'Georgia' 
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
    }
  });
  

export default Profile;

