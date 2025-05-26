import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { auth, db } from "../firebase/config"; 

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            usuarios: []
        };
    }

    componentDidMount() {
        db.collection("users").onSnapshot((docs) => {
            let arrDocs = [];
            docs.forEach((doc) => arrDocs.push({
                id: doc.id,
                data: doc.data()
            }));
            this.setState({
                usuarios: arrDocs
            }, () => console.log("este es el state", this.state));
        });
    }

    logout() {
        auth.signOut()
            .then(() => {
                this.props.navigation.navigate("Register");
            })
            .catch(err => console.log("err en signout", err));
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Profile Screen</Text>

                <TouchableOpacity onPress={() => this.logout()} style={styles.boton}>
                    <Text style={styles.textoBoton}>Cerrar Sesion</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titulo: {
        fontSize: 24,
        marginBottom: 20
    },
    boton: {
        backgroundColor: '#d32f2f',
        padding: 15,
        borderRadius: 8,
        marginVertical: 10
    },
    textoBoton: {
        color: 'white',
        fontSize: 18
    }
});

export default Profile;

