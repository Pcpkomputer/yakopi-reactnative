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


export default function ResearchScreen(props){

    const [restoration,setResearch] = useState([
        "Growth Research",
        "CCB",
        "Biodiversity"
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
                             if(item==="Growth Research"){
                                // alert("Fitur Ini Belum Tersedia");
                                // props.navigation.navigate("ListGrowthResearch");
                                props.navigation.navigate("FilterGrowthResearch");
                             }else if (item==="CCB"){
                                // alert("Fitur Ini Belum Tersedia");
                                // props.navigation.navigate("ListDiversityFauna");
                                props.navigation.navigate("FilterCCB");
                             }else if (item==="Biodiversity"){
                                props.navigation.navigate("Biodiversity");
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