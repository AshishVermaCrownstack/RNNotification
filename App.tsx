/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import messaging from '@react-native-firebase/messaging';
import React, { useEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import PushNotification, { Importance } from 'react-native-push-notification';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

export const getFmcToken = async () => {
  await messaging().requestPermission();
  try {
    const fmcToken = await messaging().getToken();
    console.log('FmcToken : ', fmcToken);
  } catch (error) {
    console.log('Error in getFmcToken :', error);
  }
};

PushNotification.createChannel(
  {
    channelId: 'RNNotification', // (required)
    channelName: 'RNNotification', // (required)
    importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
    vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
  },
  created => console.log(`createChannel returned '${created}'`), // (optional) callback returns whether the channel was created, false means it already existed.
);

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  useEffect(()=>{
    getFmcToken();
    const unsubscribe = messaging().onMessage( async (remoteMessage:any) => {
      
      console.log( 'Message handled in foreground!',remoteMessage )

      PushNotification.localNotification({
        channelId:'RNNotification',
        title:remoteMessage.notification?.title,
        message:remoteMessage.notification?.body!
      })
    });
    return unsubscribe;
  },[])

  return (
    <SafeAreaView style={backgroundStyle}>
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            justifyContent:'center',
            alignItems:'center',
            height:'100%'
          }}>
            <Text style={{fontWeight:'bold', fontSize:18}}>Welcome to RN-Notification</Text>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
