import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import {db, auth} from "../firebase/config"

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: ''
        };
    }

    //auth.onAuthStateChange para mantener al usuario dentro de la aplicaicon si sale de la app y vuelve a entrar, para que no se tenga que volver a logear cada vez, que quede autologeado
    
    
    componentDidMount (){
            auth.onAuthStateChanged((user=>{
                if(user){
                    this.props.navigation.navigate("BottomTabs")
                }
            }))
        }

    redireccionar(nombrePantalla) {
        this.props.navigation.navigate(nombrePantalla);
    }

    registrarUsuario(email, password, username){
        console.log('email', email)
        console.log('password', password)
        if(
            (email!= " " && 
            password !== " "
            && 
            username !== " "
            )
            &&
            email.includes("@") //me ahorro pasos que firebase va a pinchar  y pro eso tamb pongo length
        ) {
            auth.createUserWithEmailAndPassword (email, password)
            .then( ()=> {
                db.collection("users").add({
                        owner: email,
                        username: username,
                        createdAt: Date.now(),
                        updatedAt: Date.now()
                    })
                    .then(() => {
                        this.props.navigation.navigate("Login");
                    })
                    .catch(err => console.log("Error al crear el documento de usuario:", err));
                
            })
            .catch(err => console.log ("err:", err))
        }
    }

    // registrarUsuario() {
    //     console.log('Email:', this.state.email);
    //     console.log('Username:', this.state.username);
    //     console.log('Password:', this.state.password);
    // }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Formulario de Registro</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={(text) => this.setState({ email: text })}
                    value={this.state.email}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Username"
                    onChangeText={(text) => this.setState({ username: text })}
                    value={this.state.username}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({ password: text })}
                    value={this.state.password}
                />

                <TouchableOpacity onPress={() => this.registrarUsuario(this.state.email, this.state.password, this.state.username)} style={styles.boton}>
                    <Text style={styles.textoBoton}>Registrate</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.redireccionar('Login')} style={styles.boton}>
                    <Text style={styles.textoBoton}>Ir al Login</Text>
                </TouchableOpacity>

                {/* Vista de datos en tiempo real para que cheque que hicelas cosas bien desp lo tenog que borrar!!, profs esto es para mi*/}
                <View style={styles.dataContainer}>
                    <Text style={styles.dataText}>Email: {this.state.email}</Text>
                    <Text style={styles.dataText}>Username: {this.state.username}</Text>
                    <Text style={styles.dataText}>Password: {this.state.password}</Text>
                </View>
            </View>
        );
    }
}








































const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 10,
        marginTop: 20
    },
    titulo: {
        fontSize: 24,
        marginBottom: 20
    },
    input: {
        height: 20,
        paddingVertical: 15,
        paddingHorizontal: 10,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 6,
        marginVertical: 10,
        width: '100%'
    },
    boton: {
        backgroundColor: '#28a745',
        paddingHorizontal: 10,
        paddingVertical: 6,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: '#28a745',
        textAlign: 'center',
        marginVertical: 10,
        width: '100%'
    },
    textoBoton: {
        color: '#fff',
        textAlign: 'center'
    },
    dataContainer: {
        marginTop: 20,
        width: '100%',
        backgroundColor: '#f9f9f9',
        padding: 15,
        borderRadius: 6
    },
    dataText: {
        fontSize: 16,
        color: '#333'
    }
});

export default Register;