import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { Component } from 'react'
import { Colors } from 'react-native/Libraries/NewAppScreen';

export class Home extends Component {
  render() {
    return (
      <View>
        <Text style={styles.sectionTitle}>SelfMaxx</Text>
        <TextInput style={styles.input} placeholder='Type Here'></TextInput>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
    marginLeft: 15
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  bold: {
    fontWeight: '700',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  }
});

export default Home