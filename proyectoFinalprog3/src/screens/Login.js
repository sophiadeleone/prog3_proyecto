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
            this.setState({ errorMessage: "La contraseña debe contener minimo 6 caracteres" });
            return;
        }

        // Intentar loguear al usuario
        auth.signInWithEmailAndPassword(email, password)
            .then(() => {
                this.props.navigation.navigate("Home");
            })
            .catch((err) => {
                console.log("el error de login es", JSON.parse(err.message).error.message)
                this.setState({ errorMessage: JSON.parse(err.message).error.message });
            });
    }

    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.titulo}>Formulario de Login</Text>

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

                {/* Muestra los errores si hay */}
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
    errorText: {
        color: 'red',
        marginBottom: 10
    }
});

export default Login;