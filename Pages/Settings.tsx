import {StyleSheet, Text, View} from 'react-native';
import React, {Component} from 'react';
import LinearGradient from 'react-native-linear-gradient';



const Settings = () => {
    return (
        <View>
            <LinearGradient
            colors={['black', 'black']}
            start={{x: 0, y: 0}}
            end={{x: 1, y: 1}}
            locations={[0, 1]}
            useAngle={true}
            angle={62}
            style={styles.background}
            >
                <Text>These are the settings</Text>
            </LinearGradient>
        </View>
    );
};


const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        color: 'black',
      },
});







export default Settings;