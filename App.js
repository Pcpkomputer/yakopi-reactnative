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

import ListGrowthResearchScreen from './screen/research-screens/ListGrowthResearchScreen';
import InputGrowthResearchScreen from './screen/research-screens/InputGrowthResearchScreen';
import KindGrowthResearchScreen from './screen/research-screens/KindGrowthResearchScreen';
import DetailGrowthResearchScreen from './screen/research-screens/DetailGrowthResearchScreen';
import InputDetailGrowthResearchScreen from './screen/research-screens/InputDetailGrowthResearchScreen';
import AssetsGrowthResearchScreen from './screen/research-screens/AssetsGrowthResearchScreen';

import ListDiversityFaunaScreen from './screen/research-screens/ListDiversityFaunaScreen';
import InputDiversityFaunaScreen from './screen/research-screens/InputDiversityFaunaScreen';
import KindDiversityFaunaScreen from './screen/research-screens/KindDiversityFaunaScreen';
import DetailDiversityFaunaScreen from './screen/research-screens/DetailDiversityFaunaScreen';
import InputDetailDiversityFaunaScreen from './screen/research-screens/InputDetailDiversityFaunaScreen';
import AssetsDiversityFaunaScreen from './screen/research-screens/AssetsDiversityFaunaScreen';

import ListDiversityFloraScreen from './screen/research-screens/ListDiversityFloraScreen';
import InputDiversityFloraScreen from './screen/research-screens/InputDiversityFloraScreen';
import KindDiversityFloraScreen from './screen/research-screens/KindDiversityFloraScreen';
import DetailDiversityFloraScreen from './screen/research-screens/DetailDiversityFloraScreen';
import InputDetailDiversityFloraScreen from './screen/research-screens/InputDetailDiversityFloraScreen';
import AssetsDiversityFloraScreen from './screen/research-screens/AssetsDiversityFloraScreen';

import ListHamaScreen from './screen/research-screens/ListHamaScreen';
import InputHamaScreen from './screen/research-screens/InputHamaScreen';
import KindHamaScreen from './screen/research-screens/KindHamaScreen';
import DetailHamaScreen from './screen/research-screens/DetailHamaScreen';
import InputDetailHamaScreen from './screen/research-screens/InputDetailHamaScreen';
import AssetsHamaScreen from './screen/research-screens/AssetsHamaScreen';

import ListFiskimScreen from './screen/research-screens/ListFiskimScreen';
import InputFiskimScreen from './screen/research-screens/InputFiskimScreen';
import KindFiskimScreen from './screen/research-screens/KindFiskimScreen';
import DetailFiskimScreen from './screen/research-screens/DetailFiskimScreen';
import InputDetailFiskimScreen from './screen/research-screens/InputDetailFiskimScreen';

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
          headerShown:true,
          headerTitle:"TAMBAH CUTI"
        }}
        name="InputCuti" component={InputCutiScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"LIST CUTI"
        }}
        name="ListCuti" component={ListCutiScreen} />
          <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"DETAIL CUTI"
        }}
        name="DetailCuti" component={DetailCutiScreen} />

          <Stack.Screen 
        options={{
          headerShown:true,
        }}
        name="Restoration" component={RestorationScreen} />
           <Stack.Screen 
        options={{
          headerShown:true,
          headerTitle:"TAMBAH KT-1"
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
          headerShown:true,
          headerTitle:"DETAIL KT-1"
        }}
        name="DetailLandAssessment" component={DetailLandAssessmentScreen} />
           <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"ASSET LAND ASSESSMENT"
        }}
        name="AssetLandAssessment" component={AssetsLandAssessmentScreen} />


      <Stack.Screen 
        options={{
          headerShown:true,
          headerTitle:"TAMBAH KT-2"
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
          headerShown:true,
          headerTitle:"DETAIL KT-2"
        }}
        name="DetailSeedCollecting" component={DetailSeedCollectingScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"TAMBAH JENIS & JUMLAH BIBIT"
        }}
        name="InputDetailSeedCollecting" component={InputDetailSeedCollectingScreen} />
           <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"ASSET SEED COLLECTING"
        }}
        name="AssetSeedCollecting" component={AssetsSeedCollectingScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"JENIS DAN JUMLAH BIBIT"
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
          headerShown:true,
          headerTitle:"TAMBAH KT-3"
        }}
        name="InputNurseryActivity" component={InputNurseryActivityScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"DETAIL KT-3"
        }}
        name="DetailNurseryActivity" component={DetailNurseryActivityScreen} />
        <Stack.Screen
          options={{
            headerShown:true,
            headerTitle:"TAMBAH JENIS & JUMLAH BIBIT"
          }}
          name="InputDetailNurseryActivity" component={InputDetailNurseryActivityScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"ASSET NURSERY ACTIVITY"
        }}
        name="AssetNurseryActivity" component={AssetsNurseryActivityScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"JENIS & JUMLAH BIBIT"
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
          headerShown:true,
          headerTitle:"INPUT KT-4"
        }}
        name="InputPlantingAction" component={InputPlantingActionScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"DETAIL KT-4"
        }}
        name="DetailPlantingAction" component={DetailPlantingActionScreen} />
        <Stack.Screen
          options={{
            headerShown:true,
            headerTitle:"TAMBAH JENIS & JUMLAH BIBIT"
          }}
          name="InputDetailPlantingAction" component={InputDetailPlantingActionScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"ASSET PLANTING ACTION"
        }}
        name="AssetPlantingAction" component={AssetsPlantingActionScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"JENIS & JUMLAH BIBIT"
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
          headerShown:true,
          headerTitle:"TAMBAH KT-5"
        }}
        name="InputTransport" component={InputTransportScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"DETAIL KT-5"
        }}
        name="DetailTransport" component={DetailTransportScreen} />
        <Stack.Screen
          options={{
            headerShown:true,
            headerTitle:"TAMBAH LOKASI TUJUAN"
          }}
          name="InputDetailTransport" component={InputDetailTransportScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"ASSET TRANSPORT"
        }}
        name="AssetsTransport" component={AssetsTransportScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"LOKASI TUJUAN"
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
          headerShown:true,
          headerTitle:"TAMBAH KT-7"
        }}
        name="InputGrowth" component={InputGrowthScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"DETAIL KT-7"
        }}
        name="DetailGrowth" component={DetailGrowthScreen} />
        <Stack.Screen
          options={{
            headerShown:true,
            headerTitle:"TAMBAH DATA PLOT"
          }}
          name="InputDetailGrowth" component={InputDetailGrowthScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"DATA PLOT"
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
          headerShown:true,
          headerTitle:"TAMBAH KT-8"
        }}
        name="InputReplanting" component={InputReplantingScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"DETAIL KT-8"
        }}
        name="DetailReplanting" component={DetailReplantingScreen} />
        <Stack.Screen
          options={{
            headerShown:true,
            headerTitle:"TAMBAH PLOT"
          }}
          name="InputDetailReplanting" component={InputDetailReplantingScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"ASSET REPLANTING"
        }}
        name="AssetReplanting" component={AssetsReplantingScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"DATA PLOT"
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
          headerShown:true,
          headerTitle:"TAMBAH KT-9"
        }}
        name="InputSubtitutePlot" component={InputSubtitutePlotScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"DETAIL KT-9"
        }}
        name="DetailSubtitutePlot" component={DetailSubtitutePlotScreen} />
        <Stack.Screen
          options={{
            headerShown:true,
            headerTitle:"TAMBAH PLOT"
          }}
          name="InputDetailSubtitutePlot" component={InputDetailSubtitutePlotScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"ASSET SUBTITUTE PLOT"
        }}
        name="AssetSubtitutePlot" component={AssetsSubtitutePlotScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"DATA PLOT"
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
          headerShown:true,
          headerTitle:"TAMBAH KT-10"
        }}
        name="InputReplacementPlot" component={InputReplacementPlotScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"DETAIL KT-10"
        }}
        name="DetailReplacementPlot" component={DetailReplacementPlotScreen} />
        <Stack.Screen
          options={{
            headerShown:true,
            headerTitle:"TAMBAH PLOT"
          }}
          name="InputDetailReplacementPlot" component={InputDetailReplacementPlotScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"ASSET REPLACEMENT PLOT"
        }}
        name="AssetReplacementPlot" component={AssetsReplacementPlotScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"DATA PLOT"
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
          headerTitle:"TAMBAH COMMUNITY"
        }}
        name="InputCommunityRegister" component={InputCommunityRegisterScreen} />
        <Stack.Screen
        options={{
          headerShown:true,
          headerTitle:"COMMUNITY REGISTER"
        }}
        name="ListCommunityRegister" component={ListCommunityRegisterScreen} />
        <Stack.Screen
        options={{
          headerShown:true,
          headerTitle:"DETAIL COMMUNITY"
        }}
        name="DetailCommunityRegister" component={DetailCommunityRegisterScreen} />
        <Stack.Screen
        options={{
          headerShown:true,
          headerTitle:"TAMBAH SILVOSHERY"
        }}
        name="InputSilvoshery" component={InputSilvosheryScreen} />
        <Stack.Screen
        options={{
          headerShown:true,
          headerTitle:"SILVOSHERT"
        }}
        name="ListSilvoshery" component={ListSilvosheryScreen} />
        <Stack.Screen
        options={{
          headerShown:true,
          headerTitle:"DETAIL SILVOSHERT"
        }}
        name="DetailSilvoshery" component={DetailSilvosheryScreen} />


        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"KT-12"
        }}
        name="ListGrowthResearch" component={ListGrowthResearchScreen} />
        <Stack.Screen 
        options={{
          headerShown:true,
          headerTitle:"TAMBAH KT-12"
        }}
        name="InputGrowthResearch" component={InputGrowthResearchScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"DETAIL KT-12"
        }}
        name="DetailGrowthResearch" component={DetailGrowthResearchScreen} />
        <Stack.Screen
          options={{
            headerShown:true,
            headerTitle:"TAMBAH DATA PLOT KT-12"
          }}
          name="InputDetailGrowthResearch" component={InputDetailGrowthResearchScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"ASSET GROWTH RESEARCH"
        }}
        name="AssetGrowthResearch" component={AssetsGrowthResearchScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"DATA PLOT"
        }}
        name="KindGrowthResearch" component={KindGrowthResearchScreen} />

<Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"KT-13"
        }}
        name="ListDiversityFauna" component={ListDiversityFaunaScreen} />
        <Stack.Screen 
        options={{
          headerShown:true,
          headerTitle:"TAMBAH KT-13"
        }}
        name="InputDiversityFauna" component={InputDiversityFaunaScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"DETAIL KT-13"
        }}
        name="DetailDiversityFauna" component={DetailDiversityFaunaScreen} />
        <Stack.Screen
          options={{
          headerShown:true,
          headerTitle:"TAMBAH DATA PLOT KT-13"
          }}
          name="InputDetailDiversityFauna" component={InputDetailDiversityFaunaScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"ASSET DIVERSITY FAUNA"
        }}
        name="AssetDiversityFauna" component={AssetsDiversityFaunaScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"DATA PLOT"
        }}
        name="KindDiversityFauna" component={KindDiversityFaunaScreen} />

<Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"KT-14"
        }}
        name="ListDiversityFlora" component={ListDiversityFloraScreen} />
        <Stack.Screen 
        options={{
          headerShown:true,
          headerTitle:"TAMBAH KT-14"
        }}
        name="InputDiversityFlora" component={InputDiversityFloraScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"DETAIL KT-14"
        }}
        name="DetailDiversityFlora" component={DetailDiversityFloraScreen} />
        <Stack.Screen
          options={{
            headerShown:true,
          headerTitle:"TAMBAH DATA PLOT KT-14"
          }}
          name="InputDetailDiversityFlora" component={InputDetailDiversityFloraScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"ASSET DIVERSITY FLORA"
        }}
        name="AssetDiversityFlora" component={AssetsDiversityFloraScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"DATA PLOT"
        }}
        name="KindDiversityFlora" component={KindDiversityFloraScreen} />

<Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"KT-15"
        }}
        name="ListHama" component={ListHamaScreen} />
        <Stack.Screen 
        options={{
          headerShown:true,
          headerTitle:"DETAIL KT-15"
        }}
        name="InputHama" component={InputHamaScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"DETAIL KT-15"
        }}
        name="DetailHama" component={DetailHamaScreen} />
        <Stack.Screen
          options={{
            headerShown:true,
          headerTitle:"TAMBAH DATA PLOT KT-15"
          }}
          name="InputDetailHama" component={InputDetailHamaScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"ASSET HAMA"
        }}
        name="AssetHama" component={AssetsHamaScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"DATA PLOT HAMA"
        }}
        name="KindHama" component={KindHamaScreen} />

<Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"KT-16"
        }}
        name="ListFiskim" component={ListFiskimScreen} />
        <Stack.Screen 
        options={{
          headerShown:true,
          headerTitle:"TAMBAH KT-16"
        }}
        name="InputFiskim" component={InputFiskimScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"DETAIL KT-16"
        }}
        name="DetailFiskim" component={DetailFiskimScreen} />
        <Stack.Screen
          options={{
            headerShown:true,
            headerTitle:"TAMBAH DATA PLOT KT-16"
          }}
          name="InputDetailFiskim" component={InputDetailFiskimScreen} />
        <Stack.Screen 
         options={{
          headerShown:true,
          headerTitle:"DATA PLOT FISKIM"
        }}
        name="KindFiskim" component={KindFiskimScreen} />

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
          await Font.loadAsync({
            Poppins: require('./fonts/Poppins-Regular.ttf'),
            PoppinsMedium: require('./fonts/Poppins-Medium.ttf'),
          });
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
    await Font.loadAsync({
      Poppins: require('./fonts/Poppins-Regular.ttf'),
      PoppinsMedium: require('./fonts/Poppins-Medium.ttf'),
    });
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
      setIsNeedUpdate(false);
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

