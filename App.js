import React, { Component } from 'react';
import { StyleSheet, Text, View, AppRegistry, TouchableWithoutFeedback, Dimensions, Modal, } from 'react-native';
import ImageElement from './src/ImageElement';
import axios from 'axios'

export default class App extends Component {



  state = {
    modalVisible: false,
    modalImage: require('./img/img1.jpg'),
    images: [
      require('./img/img1.jpg'),
      // require('./img/img2.jpg'),
      // require('./img/img3.jpg'),
      // require('./img/img4.jpg'),
      // require('./img/img5.jpg'),
      // require('./img/img6.jpg'),

    ]
  }

  loadWallpapers = () => {
    axios.get('https://api.unsplash.com/photos/?client_id=896d4f52c589547b2134bd75ed48742db637fa51810b49b607e37e46ab2c0043').then(function (response) {
      console.log('responseeeee', response.data)
      this.setState({ images: response.data })
    }.bind(this)).catch(function (error) {
      console.log("err", error)
    }).finally(function () {
      console.log("request completed")
    })
  }

  componentDidMount() {
    this.loadWallpapers()
  }

  setModalVisible(visible, imageKey) {
    this.setState({ modalImage: this.state.images[imageKey] });
    this.setState({ modalVisible: visible })
  }

  getImage() {
    return this.state.modalImage
  }

  render() {

    let images = this.state.images.map((val, key) => {
      return <TouchableWithoutFeedback key={key}
        onPress={() => { this.setModalVisible(true, key) }} >
        <View style={styles.imagewrap} >
          <ImageElement imgsource={val}></ImageElement>
        </View>
      </TouchableWithoutFeedback>
    })


    return (
      <View style={styles.container}>
        <Modal style={styles.modal} animationType={'fade'}
          transparent={true} visible={this.state.modalVisible}
          onRequestClose={() => { }}

        >

          <View style={styles.modal}>
            <Text style={styles.text}
              onPress={() => { this.setModalVisible(false) }}
            >
              Close
      </Text>

            <ImageElement imgsource={this.state.modalImage}>

            </ImageElement>
          </View>
        </Modal>
        {images}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#eee'
  },
  imagewrap: {
    margin: 2,
    padding: 2,
    height: (Dimensions.get('window').height / 3) - 12,
    width: (Dimensions.get('window').width / 2) - 4,
    backgroundColor: '#fff'
  },
  modal: {
    flex: 1,
    padding: 40,
    backgroundColor: 'rgba(0, 0, 0, 0.9)'
  },
  text: {
    color: '#fff'
  }
});
