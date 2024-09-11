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
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
const process = require('process');


GoogleSignin.configure({ 
  webClientId: process.env.WEB_CLIENT_ID!,
  scopes:['https://www.googleapis.com/auth/calendar'],
  offlineAccess:true,
});

const SignUp = () => {
  
  const navigation = useNavigation();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // No need to trigger validateForm here
    // It will be triggered by onSubmitEditing

  });


  const googleSignIn = async () => {
      try {
        setLoading(true);
        await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
        const {idToken, serverAuthCode} = await GoogleSignin.signIn();
      
       
        await axios.post("http://10.0.2.2:3000/authCode", {authCode: serverAuthCode});

        const googleCredential = auth.GoogleAuthProvider.credential(idToken);
        
        //await auth().currentUser?.getIdToken(true);
        
        navigation.navigate('Home' as never);
        navigation.navigate('BottomTabs' as never);
        setLoading(false);

        return await auth().signInWithCredential(googleCredential);

      } catch(error) {
        console.error(error);
      }
  };

  return (
    <View>
      <LinearGradient
        colors={['#000000', '#000000']}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        locations={[0, 1]}
        useAngle={true}
        angle={62}
        style={styles.background}>
        <Text style={styles.sectionTitle}>SelfMaxx</Text>
        <View style={styles.userInterface}>
          <TouchableOpacity
            style={styles.buttonStyle}
            onPress={googleSignIn}
            disabled={loading}>
            <LinearGradient
              colors={['#ffffff','#f0f0f0']}
              style={styles.gradientButton}
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}>
              <Text style={styles.buttonText}>
                Sign In With Google
              </Text>
            </LinearGradient>
          </TouchableOpacity>
      
        </View>
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
    fontSize: 65,
    fontWeight: '600',
    color: '#ffffff',
    textAlign: 'center',
    fontFamily: 'CormorantSC-Medium',
    paddingTop: 50,
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
  buttonStyle: {
    width: '70%',
    marginLeft: '15%',
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
    backgroundColor: '#006AF9',
    marginTop: '6%',
  },
  buttonText: {
    color: '#000000',
    fontFamily: 'CormorantSC-Bold',
    fontSize: 20,
    fontWeight: '100',
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
    marginLeft: '4%',
  },
  userInterface: {
    marginTop: '25%',
  }
  
});

export default SignUp;
