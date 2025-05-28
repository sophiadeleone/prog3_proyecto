import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { db } from '../firebase/config';

class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
          posteos: [],
          loading: true
        };
      }
    
      componentDidMount() {
        db.collection('posts')
          .orderBy('createdAt', 'desc') // Orden por fecha descendente
          .onSnapshot(docs => {
            let posts = [];
            docs.forEach(doc => {
              posts.push({
                id: doc.id,
                data: doc.data()
              });
            });
    
            this.setState({
              posteos: posts,
              loading: false
            });
          });
      }

      render() {
        return (
          <View style={styles.flatlist}>
            <Text style={styles.titulo}>Posteos recientes</Text>
    
            {this.state.loading ? (
          <Text style={styles.loading}>Cargando posteos...</Text>
            ) : (
              <FlatList
                data={this.state.posteos}
                keyExtractor={item => item.id.toString()}
                renderItem={({ item }) => (
                  <View style={styles.card}>
                    <Text style={styles.autor}>{item.data.owner}</Text>
                    <Text style={styles.descripcion}>{item.data.description}</Text>
                    <Text style={styles.fecha}>
                      {new Date(item.data.createdAt).toLocaleString()}
                    </Text>
                  </View>
                )}
              />
            )}
          </View>
        );
      }
    }

export default Home;

const styles = StyleSheet.create({
    flatlist: {
      width: '100%',
      flex: 1,
      padding: 10,
      backgroundColor: '#fff'
    },
    titulo: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
      textAlign: 'center',
      color: '#333'
    },
    card: {
      backgroundColor: '#f5f5f5',
      padding: 15,
      marginBottom: 15,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3
    },
    autor: {
      fontWeight: 'bold',
      color: '#007bff'
    },
    descripcion: {
      fontSize: 16,
      marginVertical: 5,
      color: '#333'
    },
    fecha: {
      fontSize: 12,
      textAlign: 'right',
      color: '#777'
    }
  });
  