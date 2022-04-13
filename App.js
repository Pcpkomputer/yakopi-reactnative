import React, {useState,useEffect,useCallback, createContext} from 'react';
import { StyleSheet, Text, View, Dimensions, AsyncStorage } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import DashboardScreen from './screen/DashboardScreen';
import LoginScreen from './screen/LoginScreen';

import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const GlobalContext = createContext();

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({$rem: entireScreenWidth / 380});

function TabNavigator(){
  return (
    <Tab.Navigator tabBar={props => null}>
        <Tab.Screen 
        options={{
          headerShown:false
        }}
        name="Home" component={DashboardScreen} />
  </Tab.Navigator>
  )
}

function AuthNavigator(){
  return (
   
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
        options={{
          headerShown:false
        }}
        name="Login" component={LoginScreen} />
      </Stack.Navigator>
  )
}


function MasterNavigator(){
  return (
   
    <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
        options={{
          headerShown:false
        }}
        name="Dashboard" component={TabNavigator} />
      </Stack.Navigator>
  )
}



export default function App() {

  const [appIsReady, setAppIsReady] = useState(false);
  const [credentials,setCredentials] = useState(null);


  let fetchCredentials = async()=>{
    let credentials = await AsyncStorage.getItem("credentials");
    if(credentials){
        let parsed = JSON.parse(credentials);
        setCredentials(parsed);
    }
    else{
        setCredentials(null);
    }
  }

  useEffect(() => {
    async function prepare() {
      try {
        await SplashScreen.preventAutoHideAsync();
        await Font.loadAsync({
          Poppins: require('./fonts/Poppins-Regular.ttf'),
          PoppinsMedium: require('./fonts/Poppins-Medium.ttf'),
        });
        await fetchCredentials();
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      setTimeout(async () => {
        await SplashScreen.hideAsync();
      }, 1000);
    }
  }, [appIsReady]);

  if (!appIsReady) {
    return null;
  }

  if(!credentials){
    return (
      <GlobalContext.Provider value={{credentials,setCredentials}}>
            <NavigationContainer
            onReady={onLayoutRootView}
            >
              <AuthNavigator/>
          </NavigationContainer>
    </GlobalContext.Provider>
    );
  }
  else{
    return (
        <GlobalContext.Provider value={{credentials,setCredentials}}>
              <NavigationContainer
              onReady={onLayoutRootView}
              >
                <MasterNavigator/>
            </NavigationContainer>
      </GlobalContext.Provider>
      );
  }
  
  
}

