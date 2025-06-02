import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { db, auth } from '../firebase/config';
import { FontAwesome } from '@expo/vector-icons';
import Post from './Post';

class Posts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posteos: [],
      loading: true
    };
  }

  componentDidMount() {
    console.log('Se monta en perfil', this.props.estaEnPerfil)
    const postsRef = db.collection('posts');

    const consulta = this.props.estaEnPerfil
      // ? postsRef.where('owner', '==', auth.currentUser.email).orderBy('createdAt', 'desc')
      ? postsRef.where('owner', '==', auth.currentUser.email)
      : postsRef.orderBy('createdAt', 'desc');

    consulta.onSnapshot(docs => {
      console.log('Se ejecuta onSnapshot en perfil', this.props.estaEnPerfil)
      let posts = [];
      docs.forEach(doc => {
        posts.push({
          id: doc.id,
          data: doc.data()
        });
      });

      this.props.estaEnPerfil && posts.sort((post1, post2)=> post2.data.createdAt - post1.data.createdAt)



      this.setState({ posteos: posts, loading: false });
    });
  }

  componentWillUnmount(){
    console.log('desmonta el profile')
  }

  
  render() {
    console.log('Se renderiza en perfil', this.props.estaEnPerfil)
    return (
      <View style={styles.flatlist}>
        {this.state.loading ? (
            <View style={styles.loaderContainer}>
            <ActivityIndicator size='large' color='#7371FC' />
          </View>
        ) : (
          <FlatList
            data={this.state.posteos}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <Post
                id={item.id}
                data={item.data}
                estaEnPerfil={this.props.estaEnPerfil}
              />
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
    backgroundColor: '#E5D9F2' 
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
  
});
