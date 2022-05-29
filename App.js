import React, {useState,useEffect,useCallback, createContext} from 'react';
import { StyleSheet, Text, View, Dimensions, AsyncStorage, Button, Image} from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import { endpoint } from './utils/endpoint';
import * as Application from 'expo-application';

import DashboardScreen from './screen/DashboardScreen';
import ProfileScreen from './screen/ProfileScreen';
import LoginScreen from './screen/LoginScreen';
import RestorationScreen from './screen/RestorationScreen';
import ComdevScreen from './screen/ComdevScreen';
import ResearchScreen from './screen/ResearchScreen';

import InputCutiScreen from './screen/cuti-screens/InputCutiScreen';
import ListCutiScreen from './screen/cuti-screens/ListCutiScreen';
import DetailCutiScreen from './screen/cuti-screens/DetailCutiScreen';

import InputLandAssessmentScreen from './screen/restoration-screens/InputLandAssessmentScreen';
import ListLandAssessmentScreen from './screen/restoration-screens/ListLandAssessmentScreen';
import DetailLandAssessmentScreen from './screen/restoration-screens/DetailLandAssessmentScreen';
import AssetsLandAssessmentScreen from './screen/restoration-screens/AssetsLandAssesmentScreen';

import InputSeedCollectingScreen from './screen/restoration-screens/InputSeedCollectingScreen';
import ListSeedCollectingScreen from './screen/restoration-screens/ListSeedCollectingScreen';
import KindSeedCollectingScreen from './screen/restoration-screens/KindSeedCollectingScreen';
import DetailSeedCollectingScreen from './screen/restoration-screens/DetailSeedCollectingScreen';
import InputDetailSeedCollectingScreen from './screen/restoration-screens/InputDetailSeedCollecting';
import AssetsSeedCollectingScreen from './screen/restoration-screens/AssetsSeedCollectionScreen';

import ListNurseryActivityScreen from './screen/restoration-screens/ListNurseryActivityScreen';
import InputNurseryActivityScreen from './screen/restoration-screens/InputNurseryActivityScreen';
import KindNurseryActivityScreen from './screen/restoration-screens/KindNurseryActivityScreen';
import DetailNurseryActivityScreen from './screen/restoration-screens/DetailNurseryActivityScreen';
import InputDetailNurseryActivityScreen from './screen/restoration-screens/InputDetailNurseryActivityScreen';
import AssetsNurseryActivityScreen from './screen/restoration-screens/AssetsNurseryActivityScreen';

import ListPlantingActionScreen from './screen/restoration-screens/ListPlantingActionScreen';
import InputPlantingActionScreen from './screen/restoration-screens/InputPlantingActionScreen';
import KindPlantingActionScreen from './screen/restoration-screens/KindPlantingActionScreen';
import DetailPlantingActionScreen from './screen/restoration-screens/DetailPlantingActionScreen';
import InputDetailPlantingActionScreen from './screen/restoration-screens/InputDetailPlantingActionScreen';
import AssetsPlantingActionScreen from './screen/restoration-screens/AssetsPlantingActionScreen';

import ListTransportScreen from './screen/restoration-screens/ListTransportScreen';
import InputTransportScreen from './screen/restoration-screens/InputTransportScreen';
import KindTransportScreen from './screen/restoration-screens/KindTransportScreen';
import DetailTransportScreen from './screen/restoration-screens/DetailTransportScreen';
import InputDetailTransportScreen from './screen/restoration-screens/InputDetailTransportScreen';
import AssetsTransportScreen from './screen/restoration-screens/AssetsTransportScreen';

import ListGrowthScreen from './screen/restoration-screens/ListGrowthScreen';
import InputGrowthScreen from './screen/restoration-screens/InputGrowthScreen';
import KindGrowthScreen from './screen/restoration-screens/KindGrowthScreen';
import DetailGrowthScreen from './screen/restoration-screens/DetailGrowthScreen';
import InputDetailGrowthScreen from './screen/restoration-screens/InputDetailGrowthScreen';

import ListReplantingScreen from './screen/restoration-screens/ListReplantingScreen';
import InputReplantingScreen from './screen/restoration-screens/InputReplantingScreen';
import KindReplantingScreen from './screen/restoration-screens/KindReplantingScreen';
import DetailReplantingScreen from './screen/restoration-screens/DetailReplantingScreen';
import InputDetailReplantingScreen from './screen/restoration-screens/InputDetailReplantingScreen';
import AssetsReplantingScreen from './screen/restoration-screens/AssetsReplantingScreen';

import ListSubtitutePlotScreen from './screen/restoration-screens/ListSubtitutePlotScreen';
import InputSubtitutePlotScreen from './screen/restoration-screens/InputSubtitutePlotScreen';
import KindSubtitutePlotScreen from './screen/restoration-screens/KindSubtitutePlotScreen';
import DetailSubtitutePlotScreen from './screen/restoration-screens/DetailSubtitutePlotScreen';
import InputDetailSubtitutePlotScreen from './screen/restoration-screens/InputDetailSubtitutePlotScreen';
import AssetsSubtitutePlotScreen from './screen/restoration-screens/AssetsSubtitutePlotScreen';

import ListReplacementPlotScreen from './screen/restoration-screens/ListReplacementPlotScreen';
import InputReplacementPlotScreen from './screen/restoration-screens/InputReplacementPlotScreen';
import KindReplacementPlotScreen from './screen/restoration-screens/KindReplacementPlotScreen';
import DetailReplacementPlotScreen from './screen/restoration-screens/DetailReplacementPlotScreen';
import InputDetailReplacementPlotScreen from './screen/restoration-screens/InputDetailReplacementPlotScreen';
import AssetsReplacementPlotScreen from './screen/restoration-screens/AssetsReplacementPlotScreen';

import InputCommunityRegisterScreen from './screen/comdev-screens/InputCommunityScreen';
import ListCommunityRegisterScreen from './screen/comdev-screens/ListCommunityScreen';
import DetailCommunityRegisterScreen from './screen/comdev-screens/DetailCommunityScreen';

import InputSilvosheryScreen from './screen/comdev-screens/InputSilvosheryScreen';
import ListSilvosheryScreen from './screen/comdev-screens/ListSilvosheryScreen';
import DetailSilvosheryScreen from './screen/comdev-screens/DetailSilvosheryScreen';

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
        <Tab.Screen 
        options={{
          headerShown:false
        }}
        name="Profil" component={ProfileScreen} />
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

        <Stack.Screen 
        options={{
          headerShown:false
        }}
        name="InputCuti" component={InputCutiScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"List Cuti"
        }}
        name="ListCuti" component={ListCutiScreen} />
          <Stack.Screen 
         options={{
          headerShown:false
        }}
        name="DetailCuti" component={DetailCutiScreen} />

          <Stack.Screen 
        options={{
          headerShown:true,
        }}
        name="Restoration" component={RestorationScreen} />
           <Stack.Screen 
        options={{
          headerShown:false
        }}
        name="InputLandAssessment" component={InputLandAssessmentScreen} />
           <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"KT-1"
        }}
        name="ListLandAssessment" component={ListLandAssessmentScreen} />
          <Stack.Screen 
         options={{
          headerShown:false
        }}
        name="DetailLandAssessment" component={DetailLandAssessmentScreen} />
           <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"Asset Land Assessment"
        }}
        name="AssetLandAssessment" component={AssetsLandAssessmentScreen} />


      <Stack.Screen 
        options={{
          headerShown:false
        }}
        name="InputSeedCollecting" component={InputSeedCollectingScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"KT-2"
        }}
        name="ListSeedCollecting" component={ListSeedCollectingScreen} />
          <Stack.Screen 
         options={{
          headerShown:false
        }}
        name="DetailSeedCollecting" component={DetailSeedCollectingScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"Tambah Jenis & Jumlah Bibit"
        }}
        name="InputDetailSeedCollecting" component={InputDetailSeedCollectingScreen} />
           <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"Asset Seed Collecting"
        }}
        name="AssetSeedCollecting" component={AssetsSeedCollectingScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"Jenis dan Jumlah Bibit"
        }}
        name="KindSeedCollecting" component={KindSeedCollectingScreen} />



        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"KT-3"
        }}
        name="ListNurseryActivity" component={ListNurseryActivityScreen} />
        <Stack.Screen 
        options={{
          headerShown:false
        }}
        name="InputNurseryActivity" component={InputNurseryActivityScreen} />
        <Stack.Screen 
         options={{
          headerShown:false
        }}
        name="DetailNurseryActivity" component={DetailNurseryActivityScreen} />
        <Stack.Screen
          options={{
            headerShown:true,
            headerTitle:"Tambah Jenis & Jumlah Bibit"
          }}
          name="InputDetailNurseryActivity" component={InputDetailNurseryActivityScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"Asset Nursery Activity"
        }}
        name="AssetNurseryActivity" component={AssetsNurseryActivityScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"Jenis dan Jumlah Bibit"
        }}
        name="KindNurseryActivity" component={KindNurseryActivityScreen} />


        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"KT-4"
        }}
        name="ListPlantingAction" component={ListPlantingActionScreen} />
        <Stack.Screen 
        options={{
          headerShown:false
        }}
        name="InputPlantingAction" component={InputPlantingActionScreen} />
        <Stack.Screen 
         options={{
          headerShown:false
        }}
        name="DetailPlantingAction" component={DetailPlantingActionScreen} />
        <Stack.Screen
          options={{
            headerShown:true,
            headerTitle:"Tambah Jenis & Jumlah Bibit"
          }}
          name="InputDetailPlantingAction" component={InputDetailPlantingActionScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"Asset Planting Action"
        }}
        name="AssetPlantingAction" component={AssetsPlantingActionScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"Jenis dan Jumlah Bibit"
        }}
        name="KindPlantingAction" component={KindPlantingActionScreen} />

        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"KT-5"
        }}
        name="ListTransport" component={ListTransportScreen} />
        <Stack.Screen 
        options={{
          headerShown:false
        }}
        name="InputTransport" component={InputTransportScreen} />
        <Stack.Screen 
         options={{
          headerShown:false
        }}
        name="DetailTransport" component={DetailTransportScreen} />
        <Stack.Screen
          options={{
            headerShown:true,
            headerTitle:"Tambah Lokasi Tujuan"
          }}
          name="InputDetailTransport" component={InputDetailTransportScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"Asset Transport"
        }}
        name="AssetsTransport" component={AssetsTransportScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"Lokasi Tujuan"
        }}
        name="KindTransport" component={KindTransportScreen} />

<Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"KT-7"
        }}
        name="ListGrowth" component={ListGrowthScreen} />
        <Stack.Screen 
        options={{
          headerShown:false
        }}
        name="InputGrowth" component={InputGrowthScreen} />
        <Stack.Screen 
         options={{
          headerShown:false
        }}
        name="DetailGrowth" component={DetailGrowthScreen} />
        <Stack.Screen
          options={{
            headerShown:true,
            headerTitle:"Tambah Data Plot"
          }}
          name="InputDetailGrowth" component={InputDetailGrowthScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"Data Plot"
        }}
        name="KindGrowth" component={KindGrowthScreen} />

        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"KT-8"
        }}
        name="ListReplanting" component={ListReplantingScreen} />
        <Stack.Screen 
        options={{
          headerShown:false
        }}
        name="InputReplanting" component={InputReplantingScreen} />
        <Stack.Screen 
         options={{
          headerShown:false
        }}
        name="DetailReplanting" component={DetailReplantingScreen} />
        <Stack.Screen
          options={{
            headerShown:true,
            headerTitle:"Tambah Plot"
          }}
          name="InputDetailReplanting" component={InputDetailReplantingScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"Asset Replanting"
        }}
        name="AssetReplanting" component={AssetsReplantingScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"Data Plot"
        }}
        name="KindReplanting" component={KindReplantingScreen} />

        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"KT-9"
        }}
        name="ListSubtitutePlot" component={ListSubtitutePlotScreen} />
        <Stack.Screen 
        options={{
          headerShown:false
        }}
        name="InputSubtitutePlot" component={InputSubtitutePlotScreen} />
        <Stack.Screen 
         options={{
          headerShown:false
        }}
        name="DetailSubtitutePlot" component={DetailSubtitutePlotScreen} />
        <Stack.Screen
          options={{
            headerShown:true,
            headerTitle:"Tambah Plot"
          }}
          name="InputDetailSubtitutePlot" component={InputDetailSubtitutePlotScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"Asset Subtitute Plot"
        }}
        name="AssetSubtitutePlot" component={AssetsSubtitutePlotScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"Data Plot"
        }}
        name="KindSubtitutePlot" component={KindSubtitutePlotScreen} />


<Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"KT-10"
        }}
        name="ListReplacementPlot" component={ListReplacementPlotScreen} />
        <Stack.Screen 
        options={{
          headerShown:false
        }}
        name="InputReplacementPlot" component={InputReplacementPlotScreen} />
        <Stack.Screen 
         options={{
          headerShown:false
        }}
        name="DetailReplacementPlot" component={DetailReplacementPlotScreen} />
        <Stack.Screen
          options={{
            headerShown:true,
            headerTitle:"Tambah Plot"
          }}
          name="InputDetailReplacementPlot" component={InputDetailReplacementPlotScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"Asset Replacement Plot"
        }}
        name="AssetReplacementPlot" component={AssetsReplacementPlotScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"Data Plot"
        }}
        name="KindReplacementPlot" component={KindReplacementPlotScreen} />




        <Stack.Screen 
        options={{
          headerShown:true,
        }}
        name="Comdev" component={ComdevScreen} />
        <Stack.Screen 
        options={{
          headerShown:true,
        }}
        name="Research" component={ResearchScreen} />
        <Stack.Screen
        options={{
          headerShown:true,
        }}
        name="InputCommunityRegister" component={InputCommunityRegisterScreen} />
        <Stack.Screen
        options={{
          headerShown:true,
        }}
        name="ListCommunityRegister" component={ListCommunityRegisterScreen} />
        <Stack.Screen
        options={{
          headerShown:false,
        }}
        name="DetailCommunityRegister" component={DetailCommunityRegisterScreen} />
        <Stack.Screen
        options={{
          headerShown:true,
        }}
        name="InputSilvoshery" component={InputSilvosheryScreen} />
        <Stack.Screen
        options={{
          headerShown:true,
        }}
        name="ListSilvoshery" component={ListSilvosheryScreen} />
        <Stack.Screen
        options={{
          headerShown:false,
        }}
        name="DetailSilvoshery" component={DetailSilvosheryScreen} />
      </Stack.Navigator>
  )
}



export default function App() {

  let [appLoaded, setAppLoaded] = useState(false);
  let [credentials, setCredentials] = useState(null);
  let checkCredentials = async ()=>{
    try {
        await SplashScreen.preventAutoHideAsync();
    } catch (error) {
          let credentials = await AsyncStorage.getItem("credentials");
          if(credentials===null){
            setCredentials(null);
          }
          else{
            let parsed = JSON.parse(credentials);
            setCredentials(parsed);
          }
          await fetchNeedUpdate();
          setAppLoaded(true);
      }

    let credentials = await AsyncStorage.getItem("credentials");
    if(credentials===null){
      setCredentials(null);
    }
    else{
      let parsed = JSON.parse(credentials);
      setCredentials(parsed);
    }
    await fetchNeedUpdate();
    setAppLoaded(true);

  }
  useEffect(()=>{
    checkCredentials();
  },[])
  useEffect(()=>{
    if(appLoaded){
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 1000);
    }
  },[appLoaded])

  let [changelog, setChangelog] = useState("");


  let fetchNeedUpdate = async()=>{

    let request = await fetch(`${endpoint}/mobilebuildnumber`);
    let response = await request.json();

    if(response.buildnumber.toString()!==Application.nativeBuildVersion.toString()){
      setIsNeedUpdate(true);
      setChangelog(response.changelog_mobile);
    }


  };

  let [isNeedUpdate, setIsNeedUpdate] = useState(false);


  if(isNeedUpdate){
    return (
      <View style={{flex:1,backgroundColor:"white",justifyContent:"center",alignItems:"center"}}>
          <Image style={{width:EStyleSheet.value("140rem"),height:EStyleSheet.value("200rem")}} source={require("./assets/logo.jpeg")}></Image>
          <Text style={{marginTop:EStyleSheet.value("30rem"),fontWeight:"bold",textAlign:"center",paddingHorizontal:EStyleSheet.value("50rem"),fontSize:EStyleSheet.value("14rem")}}>Terdapat Perubahan pada aplikasi, Tolong Segera Lakukan Update</Text>
          <Text style={{paddingTop:EStyleSheet.value("20rem"),fontWeight:"bold"}}>Changelog :</Text>
          <Text style={{fontSize:EStyleSheet.value("10rem"),textAlign:"center",marginHorizontal:EStyleSheet.value("50rem"),marginTop:EStyleSheet.value("5rem")}}>{changelog}</Text>
      </View>
    )

  }

  if(!appLoaded){
    return null;
  }

  if(!credentials){
    return (
      <GlobalContext.Provider value={{credentials,setCredentials}}>
            <NavigationContainer>
              <AuthNavigator/>
          </NavigationContainer>
    </GlobalContext.Provider>
    );
  }
  else{
    return (
        <GlobalContext.Provider value={{credentials,setCredentials}}>
              <NavigationContainer>
                <MasterNavigator/>
            </NavigationContainer>
      </GlobalContext.Provider>
      );
  }
  
  
}

