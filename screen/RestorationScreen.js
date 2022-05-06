import React,{useState,useEffect, useContext} from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, AsyncStorage, TouchableOpacity, Text, TextInput, View, Dimensions, Image } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import { StatusBarHeight } from '../utils/HeightUtils';
import { LinearGradient } from 'expo-linear-gradient';

import { CommonActions } from '@react-navigation/native';

import { Entypo, Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 

import {endpoint} from '../utils/endpoint';

import {GlobalContext} from '../App';


export default function RestorationScreen(props){

    const [restoration,setRestoration] = useState([
        "Land Assessment",
        "Seed Collecting",
        "Nursery Activity",
        "Planting Action",
        "Transport",
        "Growth",
        "Replanting",
        "Subtitute Plot",
        "Replacement Plot",
        "Plot Boundaring",
        
    ]);

    return (
        <View>
           <ScrollView  
           keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag"
           contentContainerStyle={{paddingTop:EStyleSheet.value("15rem")}}>
               {
                   restoration.map((item)=>{
                       return (
                        <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>{
                             if(item==="Land Assessment"){
                                props.navigation.navigate("ListLandAssessment");
                             }
                             else if(item==="Seed Collecting"){
                                 props.navigation.navigate("ListSeedCollecting");
                             }
                             else if(item==="Nursery Activity"){
                                props.navigation.navigate("ListNurseryActivity");
                            }
                            else if(item==="Planting Action"){
                                props.navigation.navigate("ListPlantingAction");
                            }
                            else if(item==="Transport"){
                                props.navigation.navigate("ListTransport");
                            }
                            else if(item==="Growth"){
                                props.navigation.navigate("ListGrowth");
                            }
                            else if(item==="Replanting"){
                                props.navigation.navigate("ListReplanting");
                            }
                            else if(item==="Subtitute Plot"){
                                props.navigation.navigate("ListSubtitutePlot");
                            }
                            else if(item==="Replacement Plot"){
                                props.navigation.navigate("ListReplacementPlot");
                            }
                            else if(item==="Plot Boundaring"){
                                props.navigation.navigate("ListPlotBoundaring");
                            }
                        }}
                        >
                             <LinearGradient
                            colors={['#1e915a', '#5daa5f']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            style={{marginHorizontal:EStyleSheet.value("20rem"),marginBottom:EStyleSheet.value("15rem"),justifyContent:"center",alignItems:"center",borderRadius:EStyleSheet.value("5rem"),paddingVertical:EStyleSheet.value("20rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                                <Text style={{color:"white",fontFamily:"PoppinsMedium"}}>{item}</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                       )
                   })
               }
           </ScrollView>
        </View>
    )
}