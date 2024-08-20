/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  KeyboardAvoidingView,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import SignUp from './Pages/SignUp';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Home from './Pages/Home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Settings from './Pages/Settings';
import Icon from 'react-native-vector-icons/Ionicons';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
    return (
        <Tab.Navigator
          screenOptions={({ route }) => ({
              tabBarIcon: ({focused, color, size}) => {
                const icons: {[key: string]: string} = {
                  Home: focused ? 'home' : 'home-outline',
                  Settings: focused ? 'settings' : 'settings-outline'
                };
                return <Icon name={icons[route.name]} size={size} color={color}/>;
              },
              headerTransparent: true,
              headerTitle: 'SelfMaxx',
              headerTitleAlign: 'left',
              headerTitleStyle: {
                fontFamily: 'CormorantSC-Bold',
                fontSize: 30,
                color: 'white', 
              },
              tabBarStyle: {
                backgroundColor: '#2f2626',
              },
              tabBarHideOnKeyboard:true,
        })}
        >
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name= "Settings" component={Settings}/>
        </Tab.Navigator>
       
    );
};

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="SignUp"
          component={SignUp}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="BottomTabs"
          component={BottomTabs}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
 
// const styles = StyleSheet.create({
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//   },
//   bold: {
//     fontWeight: '700',
//   },
// });

export default App;
