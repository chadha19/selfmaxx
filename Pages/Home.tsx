import {StyleSheet, Text, TextInput, View, TouchableOpacity, FlatList, TouchableWithoutFeedback, Modal, Button} from 'react-native';
import React, {useCallback, useEffect, useState, useMemo} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import {Bubble, BubbleProps, GiftedChat, GiftedChatProps, IMessage} from 'react-native-gifted-chat'
import auth from "@react-native-firebase/auth";
import LottieView from 'lottie-react-native';
import axios from 'axios';
import { Image } from 'react-native';
import checkmarkAnimation from '../assets/fonts/checkmark.json';

 
export const Home = () => {
    const [messages, setMessages] = useState<IMessage[]>([]);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [scheduleMessage, setScheduleMessage] = useState<string>("");
    const [calendarConfirmation, setCalendarConfirmation] = useState<boolean>(false);
  
    const sendMessage = async (message:string) => {
      
      try {
        const response = await axios.post("http://10.0.2.2:3000/chat", {message:message});
        if (response) {
          const botMessage = {
            _id: Math.floor(Date.now() * Math.random()),
            text: response.data.reply.trim(),
            createdAt: new Date(),
            user: {
              _id: 1,
              name: 'Chatbot',
              avatar: 'https://img.freepik.com/premium-vector/robot-icon-bot-sign-design-chatbot-symbol-concept-voice-support-service-bot-online-support-bot-vector-stock-illustration_100456-34.jpg'
            },
            pending: true
          }      
          botSend([botMessage]);
        }
      } catch (error) {
        console.error("Error in sending message: " + error);
      }
    };

    const botSend = useCallback((messages:IMessage[]=[]) => {
      setMessages(previousMessages => GiftedChat.append(previousMessages, messages),
      );
    }, []);

    const onSend = useCallback((messages:IMessage[]=[]) => {
        const userMessage = messages[0].text;
        sendMessage(userMessage);
        setMessages(previousMessages => GiftedChat.append(previousMessages, messages),
      );
    }, []);

    const renderBubble = (props: BubbleProps<IMessage>) => {
      const {currentMessage} = props;
      
      if (currentMessage!.text.substring(0, 8).toLowerCase() == "schedule" && currentMessage!.user._id==1) {
        
        return (
          <View>
            
            <Bubble
              {...props}
              wrapperStyle={{
                left: {
                  backgroundColor: 'pink',
                  
                },
              }} 
              textStyle={{
                left: {
                  fontFamily:'Lato-Regular',
                }
              }}
              
             
            />  
            <TouchableOpacity style={styles.buttonStyle} onPress={ () => {
                                  setModalVisible(true);
                                  setScheduleMessage(currentMessage!.text); }}>
              <LinearGradient
                colors={['#ff1493', '#b084f3']}
                style={styles.gradientButton}
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}  
              >
                <Text style={styles.buttonText}>Add to Your Calendar!</Text>
              </LinearGradient>
            </TouchableOpacity>
            
          </View>
        );
      } else {
          return (
            <Bubble
                {...props}
              />
          );
      } 
    }; 

    const addGoogleCalendar = async () => {
      
      try { 
        await axios.post("http://10.0.2.2:3000/googlecalendar", {message:scheduleMessage});
        console.log("Event successfully added");
        //setCalendarConfirmation(true);
        //setTimeout(()=>setCalendarConfirmation(false), 5000);
      } catch (error) {
        console.error("Error in adding to google calendar: " + error);
      }
    }

    /*const modalDisplay = () => {
      if (calendarConfirmation) {
        return (
          <View>
              <Text style={styles.modalTitleText}>Successfully Added to Calendar!</Text>
              <LottieView
                source={checkmarkAnimation}
                autoPlay
                loop={false}
              />
          </View>
        );
      } else {
        return (
          <View>
              <Text style={styles.modalTitleText}>Add it to Your Calendar!</Text>
              <Text style={styles.modalMessage}>{scheduleMessage}</Text>
              <TouchableOpacity style={styles.googleCalendarButton} onPress={addGoogleCalendar}>
                <Image source={{uri: 'https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-03-512.png'}} style={styles.googleCalendarIcon}/>
                  <Text style={styles.googleCalendarText}>Google Calendar</Text>
              </TouchableOpacity>
          </View>
        );
      }
      
    }*/

    return (
      <View>
        <LinearGradient
          colors={['black', 'black']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          locations={[0, 1]}
          useAngle={true}
          angle={62}
          style={styles.background}>
          <View style={styles.giftedChat}>
            <GiftedChat
              messages={messages}
              showAvatarForEveryMessage={true}
              onSend={messages=> onSend(messages)}
              placeholder="Type your message..."
              renderBubble={renderBubble}
              user={{
                _id: auth()?.currentUser?.uid!,
              }} 
              keyboardShouldPersistTaps={'handled'}
            />
          </View>
            
            <Modal 
              visible={modalVisible}
              transparent={true}
              animationType='slide'
              onRequestClose={() => setModalVisible(false)}
            >
              <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
                <View style={styles.modalBackground}>
                  <TouchableWithoutFeedback onPress={()=> {}}>
                      <View style={styles.modalBox}>
                        <Text style={styles.modalTitleText}>Add it to Your Calendar!</Text>
                        <Text style={styles.modalMessage}>{scheduleMessage}</Text>
                        <TouchableOpacity style={styles.googleCalendarButton} onPress={addGoogleCalendar}>
                          <Image source={{uri: 'https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-03-512.png'}} style={styles.googleCalendarIcon}/>
                          <Text style={styles.googleCalendarText}>Google Calendar</Text>
                        </TouchableOpacity>
                      </View>
                  </TouchableWithoutFeedback>
                </View>
              </TouchableWithoutFeedback>
            </Modal>
          
        </LinearGradient>
      </View>
    );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 15,
  },
  googleCalendarIcon: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  background: {
    width: '100%',
    height: '100%',
  },
  giftedChat: {
    paddingTop: 60,
    flex: 1,
    //paddingBottom: 5,
  },
  gradientButton: {
    width: '100%',
    borderRadius: 8,
    paddingVertical: 10,
    overflow: 'hidden',
    alignItems: 'center',
  },
  modalBox: {
    justifyContent: 'center',
    width: '90%',
    borderRadius: 8,
    backgroundColor: 'white',
    alignItems: 'center',
    padding: 20,
    height: '50%',
    
  },
  modalBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
  },
  buttonStyle: {
    width: '80%',
    borderRadius: 8,
    marginBottom: 10,
    backgroundColor: '#006AF9',
    marginTop: '3%',
    marginRight:60,
  },
  buttonText: {
    color: 'black',
    fontFamily: 'Lato-Bold',
    fontSize: 18,
    //fontWeight: 'bold',
  },
  googleCalendarButton: {
    width: '60%',
    borderRadius: 8,
    borderColor: 'black',
    backgroundColor: 'grey',
    marginTop: '10%',
    justifyContent: 'center',
    padding: 3,
    flexDirection: 'row',
    alignItems: 'center',
  },
  googleCalendarText: {
    color: 'white',
    fontFamily: 'Lato-Bold',
  },
  modalTitleText: {
    fontFamily: 'Lato-Bold',
    fontSize: 25,
    color: 'black', 
    marginBottom: 50,
    textAlign: 'center',
  },
  modalMessage: {
    fontFamily: 'Lato-Black',
    textAlign: 'center',
    color: 'black',
    fontSize: 16,
    flex: 1,
  }
});

export default Home;
