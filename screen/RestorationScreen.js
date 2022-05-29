import React,{useState,useEffect, useContext} from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, AsyncStorage,Alert, TouchableOpacity, Text, TextInput, View, Dimensions, Image } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import { StatusBarHeight } from '../utils/HeightUtils';
import { LinearGradient } from 'expo-linear-gradient';

import { CommonActions } from '@react-navigation/native';

import { Entypo, Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 

import {endpoint} from '../utils/endpoint';

import {GlobalContext} from '../App';


export default function RestorationScreen(props){

    const [restoration,setRestoration] = useState([
        "Land Assessment (KT-1)",
        "Seed Collecting (KT-2)",
        "Nursery Activity (KT-3)",
        "Planting Action (KT-4)",
        "Transport (KT-5)",
        "Plot Boundaring (KT-6)",
        "Growth (KT-7)",
        "Replanting (KT-8)",
        "Subtitute Plot (KT-9)",
        "Replacement Plot (KT-10)",
        
    ]);

    return (
        <View>
           <ScrollView  
           keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag"
           contentContainerStyle={{paddingTop:EStyleSheet.value("15rem")}}>
               {
                   restoration.map((item,index)=>{
                       return (
                        <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>{
                             if(item==="Land Assessment (KT-1)"){
                                // alert("Fitur Ini Belum Tersedia");
                                props.navigation.navigate("ListLandAssessment");
                             }
                             else if(item==="Seed Collecting (KT-2)"){
                                // alert("Fitur Ini Belum Tersedia");
                                 props.navigation.navigate("ListSeedCollecting");
                             }
                             else if(item==="Nursery Activity (KT-3)"){
                                // alert("Fitur Ini Belum Tersedia");
                                props.navigation.navigate("ListNurseryActivity");
                            }
                            else if(item==="Planting Action (KT-4)"){
                                // alert("Fitur Ini Belum Tersedia");
                                props.navigation.navigate("ListPlantingAction");
                            }
                            else if(item==="Transport (KT-5)"){
                                // alert("Fitur Ini Belum Tersedia");
                                props.navigation.navigate("ListTransport");
                            }
                            else if(item==="Plot Boundaring (KT-6)"){
                                alert("Fitur Ini Belum Tersedia");
                                // props.navigation.navigate("ListPlotBoundaring");
                            }
                            else if(item==="Growth (KT-7)"){
                                // alert("Fitur Ini Belum Tersedia");
                                props.navigation.navigate("ListGrowth");
                            }
                            else if(item==="Replanting (KT-8)"){
                                // alert("Fitur Ini Belum Tersedia");
                                props.navigation.navigate("ListReplanting");
                            }
                            else if(item==="Subtitute Plot (KT-9)"){
                                // alert("Fitur Ini Belum Tersedia");
                                props.navigation.navigate("ListSubtitutePlot");
                            }
                            else if(item==="Replacement Plot (KT-10)"){
                                alert("Fitur Ini Belum Tersedia");
                                // props.navigation.navigate("ListReplacementPlot");
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