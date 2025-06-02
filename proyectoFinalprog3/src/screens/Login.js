import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { auth } from "../firebase/config";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            errorMessage: ''
        };
    }

    verificarCredenciales(email, password) {
        
        if (!email.includes("@")) {
            this.setState({ errorMessage: "Email mal formateado" });
            return;
        }

        if (password.length < 6) {
            this.setState({ errorMessage: "Credenciales invalidas" });
            return;
        }

        // Intentar loguear al usuario
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                this.props.navigation.navigate("Tab");
            })
            .catch((err) => {
                console.log("el error de login es", JSON.parse(err.message).error.message)
                this.setState({ errorMessage: JSON.parse(err.message).error.message });
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Vemos que ya te has registrado... ingresa tus datos!</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    keyboardType="email-address"
                    onChangeText={(text) => this.setState({ email: text })}
                    value={this.state.email}
                />

                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    secureTextEntry={true}
                    onChangeText={(text) => this.setState({ password: text })}
                    value={this.state.password}
                />

                
                {this.state.errorMessage !== "" && (
                    <Text style={styles.errorText}>{this.state.errorMessage}</Text>
                )}

                <TouchableOpacity 
                    onPress={() => this.verificarCredenciales(this.state.email, this.state.password)} 
                    style={styles.boton}
                >
                    <Text style={styles.textoBoton}>Login</Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')} style={styles.boton}>
                    <Text style={styles.textoBoton}>Ir al registro</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingHorizontal: 20,
      backgroundColor: '#E5D9F2'
    },
    titulo: {
      fontSize: 28,
      fontWeight: 'bold',
      marginBottom: 30,
      color: '#7371FC',
      letterSpacing: 0.6
    },
    input: {
      height: 50,
      paddingVertical: 10,
      paddingHorizontal: 14,
      borderWidth: 1.5,
      borderColor: '#CDC1FF',
      borderRadius: 12,
      marginVertical: 10,
      width: '90%',
      backgroundColor: '#F5EFFF',
      fontSize: 16,
      color: '#2E2E2E'
    },
    boton: {
      backgroundColor: '#7371FC',
      paddingVertical: 14,
      borderRadius: 25,
      marginTop: 16,
      width: '90%',
      alignItems: 'center',
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
      letterSpacing: 0.3
    },
    errorText: {
      color: '#D32F2F',
      marginTop: 6,
      textAlign: 'center',
      width: '90%',
      fontSize: 14
    }
  });
  


export default Login;