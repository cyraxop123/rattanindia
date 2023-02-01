import React, { useState, useEffect } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const Loader = () => {
  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('../../assets/videos/Loader.gif')}/>
    </View>
  )
}

export default Loader

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: '100%',
    backgroundColor: 'rgba(0, 13, 0, 0.87)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
    height: '100%'
  },
  image: {
    resizeMode: 'contain',
    width: '30%'
  }
})