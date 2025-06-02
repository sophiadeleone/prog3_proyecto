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
        backgroundColor: '#fff'
    },
    titulo: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    info: {
        fontSize: 16,
        marginBottom: 8,
        color: '#444',                
        backgroundColor: '#f0f4f8',   
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 8,
        width: '100%',
        textAlign: 'left',
        fontWeight: '500'
    },
    botonLogout: {
        backgroundColor: '#1976d2',
        padding: 10,
        borderRadius: 25,
        marginTop: 20,
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent: 'center',
        alignSelf: 'flex-end' 
    },
    textoBoton: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default Profile;

