import React,{useState,useEffect, useContext} from 'react';
import { StyleSheet, ScrollView, ActivityIndicator,Alert, TouchableOpacity, Text, TextInput, View, Dimensions, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EStyleSheet from 'react-native-extended-stylesheet';

import { StatusBarHeight } from '../utils/HeightUtils';
import { LinearGradient } from 'expo-linear-gradient';

import { CommonActions } from '@react-navigation/native';

import { Entypo, Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 

import {endpoint} from '../utils/endpoint';

import {GlobalContext} from '../App';


export default function AgroforestriScreen(props){

    const [agroforestri,setAgroforestri] = useState([
        "Land Assessment (KK-1)",
        "Seed Collecting (KK-2)",
        "Nursery Activity (KK-3)",
        "Planting Action (KK-4)",
        "Transport (KK-5)",
        "Plot Boundaring (KK-6)",
        "Growth (KK-7)",
        "Replanting (KK-8)",
        "Subtitute Plot (KK-9)",
        "Replacement Plot (KK-10)",
        "Boundering Agroforestri",
        
    ]);

    return (
        <View>
           <ScrollView  
           keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag"
           contentContainerStyle={{paddingTop:EStyleSheet.value("15rem")}}>
               {
                   agroforestri.map((item,index)=>{
                       return (
                        <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={()=>{
                             if(item==="Land Assessment (KK-1)"){
                                // alert("Fitur Ini Belum Tersedia");
                                // props.navigation.navigate("ListLandAssessment");
                                props.navigation.navigate("FilterKK1");
                             }
                             else if(item==="Seed Collecting (KK-2)"){
                                // alert("Fitur Ini Belum Tersedia");
                                props.navigation.navigate("FilterKK2");
                             }
                             else if(item==="Nursery Activity (KK-3)"){
                                // alert("Fitur Ini Belum Tersedia");
                                props.navigation.navigate("FilterKK3");
                            }
                            else if(item==="Planting Action (KK-4)"){
                                // alert("Fitur Ini Belum Tersedia");
                                props.navigation.navigate("FilterKK4");
                            }
                            else if(item==="Transport (KK-5)"){
                                // alert("Fitur Ini Belum Tersedia");
                                props.navigation.navigate("FilterKK5");
                            }
                            else if(item==="Plot Boundaring (KK-6)"){
                                // alert("Fitur Ini Belum Tersedia");
                                 props.navigation.navigate("FilterKK6");
                            }
                            else if(item==="Growth (KK-7)"){
                                // alert("Fitur Ini Belum Tersedia");
                                props.navigation.navigate("FilterKK7");
                            }
                            else if(item==="Replanting (KK-8)"){
                                // alert("Fitur Ini Belum Tersedia");
                                props.navigation.navigate("FilterKK8");
                            }
                            else if(item==="Subtitute Plot (KK-9)"){
                                // alert("Fitur Ini Belum Tersedia");
                                props.navigation.navigate("FilterKK9");
                            }
                            else if(item==="Replacement Plot (KK-10)"){
                                // alert("Fitur Ini Belum Tersedia");
                                props.navigation.navigate("FilterKK10");
                            }
                            else if(item==="Boundering Agroforestri"){
                                // alert("Fitur Ini Belum Tersedia");
                                props.navigation.navigate("ListBoundering");
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