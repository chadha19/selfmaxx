import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import auth from "@react-native-firebase/auth";
import validator from 'validator';
import Icon from 'react-native-vector-icons/Ionicons';
interface Errors {
  user?: string;
  pass?: string;
  account?: string;
}

const Home = () => {
  const [user, setUser] = useState<string>('');
  const [pass, setPass] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [errors, setErrors] = useState<Errors>({});
  const [isFormValid, setIsFormValid] = useState<boolean>(false);
  const navigation = useNavigation();
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    // No need to trigger validateForm here
    // It will be triggered by onSubmitEditing
  }, [errors, isFormValid]);



  const validateForm = () => {
    let newErrors: Errors = {};

    

    if (!validator.isEmail(user)) {
      newErrors.user = 'Must use a valid email address';
      
    }

    // Validate password field
    if (touched) {
      if (!pass) {
        newErrors.pass = 'Password is required.';
      } else if (pass.length < 6) {
        newErrors.pass = 'Password must be at least 6 characters.';
      }
    }
    

    // Merge new errors with existing ones
    setErrors(newErrors);

    // Update form validity
    setIsFormValid(Object.keys(newErrors).length === 0);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };


  const signupVerify = () => {
    let newErrors: Errors = {};
    if (isFormValid) {
      // Form is valid, perform the submission logic
      console.log('User: ' + user);
    } else {
      // Form is invalid, display error messages
      console.log('Form has errors. Please correct them.');
    }
    
    auth().createUserWithEmailAndPassword(user, pass).then(() => {
        console.log("User created");
        navigation.navigate('Profile' as never);
      })
      .catch(error => {
        if (error.code == 'auth/email-already-in-use') {
          newErrors.account = 'This email address is already in use. Try signing in or using another email.';
        } else {
          newErrors.account = 'An unexpected error occured. Please try again';
        }
        setErrors(newErrors);
        
      });
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
          placeholder="Enter Email Address"
          onTextInput={validateForm}
          onChangeText={setUser}
          value={user}
        />
        {errors.user && <Text style={styles.error}>{errors.user}</Text>}
        <View style={styles.input}>
            <TouchableOpacity onPress={toggleShowPassword} style={styles.icon}>
              <Icon name={showPassword ? 'eye' : "eye-off"} size={33}/>
            </TouchableOpacity>
            <TextInput
              style={styles.passwordInput}
              placeholder="Password"
              onTextInput={ () => {
                validateForm();
                setTouched(true);
                }
              }
              onChangeText={setPass} 
              value={pass}
              secureTextEntry={!showPassword}
            />
        </View>
        {touched && errors.pass ? <Text style={styles.error}>{errors.pass}</Text> : null}
        <TouchableOpacity
          style={[styles.buttonStyle, {opacity: isFormValid ? 1 : 0.5}]}
          disabled={!isFormValid}
          onPress={signupVerify}>
          <LinearGradient
            colors={['#00c6fb', '#005bea']}
            style={styles.gradientButton}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}>
            <Text style={[styles.buttonText, {opacity: isFormValid ? 1 : 0.5}]}>
              Sign Up
            </Text>
          </LinearGradient>
        </TouchableOpacity>
        {errors.account && <Text style={styles.error}>{errors.account}</Text> }
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
    color: '#ffffff',
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
    flexDirection: 'row',
    alignItems: 'center',
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    backgroundColor: 'white',
    position: 'relative',
  },
  passwordInput : {
    flex: 1,
    height: 40,
    paddingRight: 60,
    
  },
  buttonStyle: {
    width: '70%',
    marginLeft: '15%',
    borderRadius: 8,
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
  gradientButton: {
    width: '100%',
    borderRadius: 8,
    paddingVertical: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
  icon: {
    right: 10,
    position: 'absolute',
    justifyContent: 'center',
    zIndex: 1,
  },
  error: {
    color: 'red',
    fontSize: 15,
    marginBottom: '2%',
    marginLeft: '2%',
  },
  
});

export default Home;
