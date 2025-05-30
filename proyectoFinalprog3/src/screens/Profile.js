import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { auth, db } from "../firebase/config";

class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
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

            db.collection("posts")
              .where("owner", "==", user.email)
              .onSnapshot((docs) => {
                let posts = [];
                docs.forEach((doc) => {
                    posts.push({
                        id: doc.id,
                        data: doc.data()
                    });
                });
                this.setState({ posts });
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

    borrarPosteo(id) {
        db.collection("posts").doc(id).delete(); // delete es parte de la documentacion de firebase firestore, chequear q este ok que lo use
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Mi Perfil</Text>
                <Text style={styles.info}>Email: {this.state.userEmail}</Text>
                <Text style={styles.info}>Usuario: {this.state.userName}</Text>

                <Text style={styles.subtitulo}>Mis posteos</Text>
                <FlatList
                    data={this.state.posts}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.postContainer}>
                            <Text>{item.data.texto}</Text>
                            <TouchableOpacity onPress={() => this.borrarPosteo(item.id)} style={styles.botonEliminar}>
                                <Text style={styles.textoBotonEliminar}>Eliminar</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />

                <TouchableOpacity onPress={() => this.logout()} style={styles.botonLogout}>
                    <Text style={styles.textoBoton}>Cerrar Sesión</Text>
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
    subtitulo: {
        fontSize: 20,
        marginTop: 20,
        marginBottom: 10
    },
    info: {
        fontSize: 16,
        marginBottom: 5
    },
    postContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        marginVertical: 5
    },
    botonEliminar: {
        backgroundColor: '#d32f2f',
        paddingVertical: 5,
        marginTop: 5,
        borderRadius: 5,
        alignItems: 'center'
    },
    textoBotonEliminar: {
        color: '#fff',
        fontWeight: 'bold'
    },
    botonLogout: {
        backgroundColor: '#1976d2',
        padding: 10,
        borderRadius: 5,
        marginTop: 20,
        alignItems: 'center'
    },
    textoBoton: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default Profile;
