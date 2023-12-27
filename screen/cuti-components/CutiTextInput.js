import React,{useState,useEffect, useContext} from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Text, TextInput, View, Dimensions, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EStyleSheet from 'react-native-extended-stylesheet';

import { StatusBarHeight } from '../../utils/HeightUtils';
import { LinearGradient } from 'expo-linear-gradient';

import { CommonActions } from '@react-navigation/native';

import { Entypo, Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 

import {endpoint} from '../../utils/endpoint';

import {GlobalContext} from '../../App';


export default function CutiTextInput(props){
    return (
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>{props.label}</Text>
            </View>
            <View style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <TextInput 
                editable={props.disable ? false:true}
                keyboardType={(props.keyboardType ? props.keyboardType:"default")}
                onChangeText={(text)=>{
                    props.setter((prev)=>{
                        return prev.map((item,index)=>{
                            if(index===props.index){
                                return {
                                    ...item,
                                    value:text
                                }
                            }
                            return item;
                        })
                    })
                }}
                value={props.getter[props.index].value}
                style={{flex:1}} placeholder={props.label}/>
            </View>
        </View>
    );
}