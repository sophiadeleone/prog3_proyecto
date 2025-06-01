import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { db, auth } from '../firebase/config';
import { FontAwesome } from '@expo/vector-icons';


class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posteos: [],
      loading: true
    };
  }

  componentDidMount() {
    const postsRef = db.collection('posts');

    const consulta = this.props.estaEnPerfil
      ? postsRef.where('owner', '==', auth.currentUser.email).orderBy('createdAt', 'desc')
      : postsRef.orderBy('createdAt', 'desc');

    consulta.onSnapshot(docs => {
      let posts = [];
      docs.forEach(doc => {
        posts.push({
          id: doc.id,
          data: doc.data()
        });
      });

      this.setState({ posteos: posts, loading: false });
    });
  }

  meGusta(idPost, arrayDeLikes) {
    const user = auth.currentUser.email;

    if (arrayDeLikes.includes(user)) {
      const nuevoArray = arrayDeLikes.filter(email => email !== user);
      db.collection('posts').doc(idPost).update({ likes: nuevoArray });
    } else {
      arrayDeLikes.push(user);
      db.collection('posts').doc(idPost).update({ likes: arrayDeLikes });
    }
  }

  borrarPosteo(id) {
    db.collection('posts').doc(id).delete();
  }

  render() {
    return (
      <View style={styles.flatlist}>
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
                <TouchableOpacity onPress={() => this.meGusta(item.id, item.data.likes)}>
                  <Text style={styles.like}>Likes: {item.data.likes.length}</Text>
                </TouchableOpacity>

                {this.props.estaEnPerfil ? (
                  <TouchableOpacity onPress={() => this.borrarPosteo(item.id)} style={styles.botonEliminar}>
                    <FontAwesome name='trash' size={16} color='#fff' />
                    <Text style={styles.textoBotonEliminar}> Eliminar</Text>
                  </TouchableOpacity>
                ) : null}

              </View>
            )}
          />
        )}
      </View>
    );
  }
}

export default Posts;

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
  },
  like: {
    fontSize: 14,
    color: '#007bff'
  },
  botonEliminar: {
    backgroundColor: '#d32f2f',
    paddingVertical: 5,
    marginTop: 8,
    borderRadius: 5,
    alignItems: 'center'
  },
  textoBotonEliminar: {
    color: '#fff',
    fontWeight: 'bold'
  },
  loading: {
    textAlign: 'center'
  }
});
