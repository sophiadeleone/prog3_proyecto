import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import {db, auth} from "../firebase/config"

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            username: '',
            password: '',
            errorMessage: ''
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
        //me adelanto a lo que firewal te va a decir osea me ahorro pasos que firebase va a pinchar
        if (email === '' || password === '' || username === '') { //si pasa una O la otra O la otra, te da el error
            this.setState({ errorMessage: 'Todos los campos son obligatorios' });
        } else if (!email.includes('@')) {
            this.setState({ errorMessage: 'Email mal formateado' });
        } else if (password.length < 6) {
            this.setState({ errorMessage: 'La password debe tener una longitud mínima de 6 caracteres' });
        } else {
       
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
                    .catch(err => this.setState({ errorMessage: 'Error al guardar usuario en DB' }));
                
            })
            .catch(err => this.setState({ errorMessage: err.message }));

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
                <Text style={styles.titulo}>¡Unite a la comunidad!</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={(text) => this.setState({ email: text })}
                    value={this.state.email}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Nombre de usuario"
                    onChangeText={(text) => this.setState({ username: text })}
                    value={this.state.username}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Contraseña"
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({ password: text })}
                    value={this.state.password}
                />
                 
                 {/* Muestro erroor si existe */}
                {this.state.errorMessage !== '' && (
                    <Text style={styles.errorText}>{this.state.errorMessage}</Text>
                )}

                <TouchableOpacity onPress={() => this.registrarUsuario(this.state.email, this.state.password, this.state.username)} style={styles.boton}>
                    <Text style={styles.textoBoton}>Registrate</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.redireccionar('Login')} style={styles.textoBotonSecundario}>
                    <Text style={styles.textoBotonSecundario}>Ya tengo cuenta</Text>
                </TouchableOpacity>
            </View>
       
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#E5D9F2',
      paddingHorizontal: '8%',
      justifyContent: 'center',
      alignItems: 'center'
    },
    titulo: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 30,
      color: '#7371FC',
      letterSpacing: 0.6
    },
    input: {
      width: '100%',
      height: 52,
      borderWidth: 1.5,
      borderColor: '#CDC1FF',
      borderRadius: 10,
      backgroundColor: '#F5EFFF',
      paddingHorizontal: 14,
      paddingVertical: 10,
      marginBottom: 14,
      fontSize: 16,
      color: '#2E2E2E'
    },
    boton: {
      width: '100%',
      backgroundColor: '#7371FC',
      paddingVertical: 14,
      borderRadius: 30,
      alignItems: 'center',
      marginTop: 10,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3
    },
    textoBoton: {
      color: '#fff',
      fontWeight: 'bold',
      fontSize: 16,
      letterSpacing: 0.4
    },
    textoBotonSecundario: {
      color: '#A594F9',
      fontSize: 14,
      marginTop: 12,
      textDecorationLine: 'underline'
    },
    errorText: {
      color: '#D32F2F',
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 12,
      width: '100%'
    }
  });
  




export default Register;