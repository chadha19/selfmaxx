import React, {useState} from 'react';
import {Button, StyleSheet, Text, TextInput, View} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

const Home = () => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>SelfMaxx</Text>
      <TextInput
        style={styles.input}
        placeholder="Type Here"
        onChangeText={newUser => setUser(newUser)}
        value={user}
      />
      <TextInput
        style={styles.input}
        placeholder="Type Here"
        onChangeText={newPass => setPass(newPass)}
        value={pass}
      />
      <View style={styles.buttonStyle}>
        <Button title="Login" onPress={() => {}} color={Colors.black} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: '#daeaf6',
  },
  sectionTitle: {
    fontSize: 50,
    fontFamily: 'Futura',
    fontWeight: '600',
    color: '#515999',
    textAlign: 'center',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  bold: {
    fontWeight: '700',
    color: '#7ec4cf',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  buttonStyle: {
    width: '70%',
    marginLeft: '15%',
  },
});

export default Home;
