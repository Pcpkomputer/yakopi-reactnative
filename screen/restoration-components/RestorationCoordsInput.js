import React,{useState,useEffect, useContext} from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, AsyncStorage, TouchableOpacity, Text, TextInput, View, Dimensions, Image } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import { StatusBarHeight } from '../../utils/HeightUtils';
import { LinearGradient } from 'expo-linear-gradient';

import * as Location from 'expo-location';

import { CommonActions } from '@react-navigation/native';

import { Entypo, Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 

import {endpoint} from '../../utils/endpoint';

import {GlobalContext} from '../../App';


export default function RestorationCoordsInput(props){
    return (
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>{props.label}</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"column",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TextInput 
                editable={props.disable ? false:true}
                keyboardType={(props.keyboardType ? props.keyboardType:"default")}
                onChangeText={(text)=>{
                    props.setter((prev)=>{
                        return prev.map((item,index)=>{
                            if(index===props.index){
                                return {
                                    ...item,
                                    value:{
                                        ...item.value,
                                        latitude:text
                                    }
                                }
                            }
                            return item;
                        })
                    })
                }}
                value={props.getter[props.index].value.latitude}
                style={{flex:1}} placeholder={"Latitude"}/>
                 <TextInput 
                editable={props.disable ? false:true}
                keyboardType={(props.keyboardType ? props.keyboardType:"default")}
                onChangeText={(text)=>{
                    props.setter((prev)=>{
                        return prev.map((item,index)=>{
                            if(index===props.index){
                                return {
                                    ...item,
                                    value:{
                                        ...item.value,
                                        longitude:text
                                    }
                                }
                            }
                            return item;
                        })
                    })
                }}
                value={props.getter[props.index].value.longitude}
                style={{flex:1}} placeholder={"Longitude"}/>
                {
                    (!props.disable) &&
                    <TouchableOpacity 
                    activeOpacity={0.8}
                    onPress={async ()=>{
                        let { status } = await Location.requestForegroundPermissionsAsync();
                        if (status !== 'granted') {
                          alert("Need permissions");
                        }
                        else{
                            let location = await Location.getLastKnownPositionAsync();
                            props.onGetLocation(location);
                        }
                  
                       
                    }}
                    style={{backgroundColor:"#1e915a",marginTop:EStyleSheet.value("10rem"),width:"100%",borderRadius:EStyleSheet.value("5rem")}}>
                        <Text style={{textAlign:"center",color:"white"}}>Get Coordinate</Text>
                    </TouchableOpacity>
                }
            </View>
         
        </View>
    );
}