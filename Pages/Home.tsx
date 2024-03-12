import React, {useEffect, useState} from 'react';
import {
  Alert,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
interface Errors {
  user?: string;
  pass?: string;
}

const Home = () => {
  const [user, setUser] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const navigation = useNavigation();

  useEffect(() => {
    // No need to trigger validateForm here
    // It will be triggered by onSubmitEditing
  }, [errors, isFormValid]);

  const validateForm = () => {
    let newErrors: Errors = {};

    // Validate name field
    if (!user) {
      newErrors.user = 'Name is required.';
    }

    // Validate password field
    if (!pass) {
      newErrors.pass = 'Password is required.';
    } else if (pass.length < 6) {
      newErrors.pass = 'Password must be at least 6 characters.';
    }

    // Merge new errors with existing ones
    setErrors(newErrors);

    // Update form validity
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const handleSubmit = () => {
    let newErrors: Errors = {};
    if (isFormValid) {
      // Form is valid, perform the submission logic
      console.log('User: ' + user);
    } else {
      // Form is invalid, display error messages
      console.log('Form has errors. Please correct them.');
    }

    if (user == 'Test' && pass == 'Test123') {
      navigation.navigate('Profile' as never);
    } else {
      newErrors.user = 'User does not exist. Please create an account.';
    }
    setErrors(newErrors);
  };

  return (
    <View>
      <LinearGradient
        colors={['#8EC5FC', '#E0C3FC']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        locations={[0, 1]}
        useAngle={true}
        angle={62}
        style={styles.background}>
        <Text style={styles.sectionTitle}>SelfMaxx</Text>
        <TextInput
          style={styles.input}
          placeholder="Name"
          onTextInput={validateForm}
          onChangeText={setUser}
          value={user}
        />
        {errors.user && <Text style={styles.error}>{errors.user}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Password"
          onTextInput={validateForm}
          onChangeText={setPass}
          value={pass}
          secureTextEntry
        />
        {errors.pass && <Text style={styles.error}>{errors.pass}</Text>}
        <TouchableOpacity
          style={[styles.buttonStyle, {opacity: isFormValid ? 1 : 0.5}]}
          disabled={!isFormValid}
          onPress={handleSubmit}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
  },
  sectionTitle: {
    fontSize: 50,
    fontWeight: '600',
    color: '#000000',
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
    borderRadius: 10,
  },
  buttonStyle: {
    width: '70%',
    marginLeft: '15%',
    borderRadius: 8,
    paddingVertical: 10,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: '#006AF9',
    marginTop: '2%',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontSize: 15,
    marginBottom: '2%',
    marginLeft: '2%',
  },
});

export default Home;
