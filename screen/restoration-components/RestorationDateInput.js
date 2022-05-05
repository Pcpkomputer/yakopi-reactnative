import React,{useState,useEffect, useContext} from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, AsyncStorage, TouchableOpacity, Text, TextInput, View, Dimensions, Image } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import { StatusBarHeight } from '../../utils/HeightUtils';
import { LinearGradient } from 'expo-linear-gradient';

import { CommonActions } from '@react-navigation/native';

import { Entypo, Feather, FontAwesome, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'; 

import {endpoint} from '../../utils/endpoint';

import {GlobalContext} from '../../App';


export default function RestorationDateInput(props){
    return (
        <View style={{justifyContent:"center",alignItems:"center",borderBottomWidth:1,borderColor:"#e8e8e8",flexDirection:"row",backgroundColor:"white"}}>
            <View style={{flex:1,paddingLeft:EStyleSheet.value("25rem")}}>
                <Text>{props.label}</Text>
            </View>
            <TouchableOpacity 
            disabled={props.disable ? true:false}
            activeOpacity={0.6}
            onPress={props.onSelectPress}
            style={{flex:1,backgroundColor:"white",flexDirection:"row",alignItems:"center",paddingVertical:EStyleSheet.value("15rem"),paddingRight:EStyleSheet.value("25rem")}}>
                <Text style={{flex:1}}>{props.getter[props.index].value==="" ? "YYYY/MM/DD":props.getter[props.index].value}</Text>
                <AntDesign name="caretdown" size={EStyleSheet.value("10rem")} color="grey" />
            </TouchableOpacity>
        </View>
    );
}