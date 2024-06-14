import {StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';



export class Home extends Component {
  render() {
    return (
      <View>
        <LinearGradient
          colors={['white', 'white']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          locations={[0, 1]}
          useAngle={true}
          angle={62}
          style={styles.background}>
          <Text style={styles.sectionTitle}></Text>
        </LinearGradient>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  sectionTitle: {
    fontSize: 30,
    fontWeight: '600',
    color: 'black',
    textAlign: 'center',
    fontFamily: 'CormorantSC-Bold',
  },
});

export default Home;
