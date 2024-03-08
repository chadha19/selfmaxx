import React, {useEffect, useState} from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
interface Errors {
  user?: string;
  pass?: string;
}

const Home = () => {
  const [user, setUser] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [errors, setErrors] = useState<Errors>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(false);

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
    if (isFormValid) {
      // Form is valid, perform the submission logic
      console.log('Form submitted successfully!');
    } else {
      // Form is invalid, display error messages
      console.log('Form has errors. Please correct them.');
    }
  };

  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>SelfMaxx</Text>
      <TextInput
        style={styles.input}
        placeholder="Name"
        onSubmitEditing={validateForm}
        onChangeText={setUser}
        value={user}
      />
      {errors.user && <Text style={styles.error}>{errors.user}</Text>}
      <TextInput
        style={styles.input}
        placeholder="Password"
        onSubmitEditing={validateForm}
        onChangeText={setPass}
        value={pass}
        secureTextEntry
      />
      {errors.pass && <Text style={styles.error}>{errors.pass}</Text>}
      <TouchableOpacity
        style={[styles.buttonStyle, {opacity: isFormValid ? 1 : 0.5}]}
        disabled={!isFormValid}
        onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
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
    borderRadius: 8,
    paddingVertical: 10,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: '#515999',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontSize: 20,
    marginBottom: 12,
  },
});

export default Home;
