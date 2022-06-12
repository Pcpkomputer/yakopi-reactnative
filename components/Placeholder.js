import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, useRef} from 'react';
import { ImageBackground,BackHandler,Animated, Image, StyleSheet, Text, ScrollView, TextInput, View,FlatList, Pressable, Dimensions, useWindowDimensions, Easing } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Ionicons } from '@expo/vector-icons'; 
import { FontAwesome5, AntDesign } from '@expo/vector-icons'; 


export default function Placeholder(props){

    const fadeAnim = useRef(new Animated.Value(1)).current;


    let callbackFade = ()=>{
        Animated.timing(fadeAnim,{
            toValue:1,
            duration:500,
            useNativeDriver:true,
        }).start(()=>{
            fadeAnimation();
        });
    }


    let fadeAnimation = ()=>{
        Animated.timing(fadeAnim,{
            toValue:0.5,
            duration:500,
            useNativeDriver:true
        }).start(()=>{
            callbackFade();
        });
    }

    useEffect(()=>{
        fadeAnimation();
    },[])

    if(!props.show){
        return null;
    }
   
    return (
        <Animated.View style={[{opacity:fadeAnim,backgroundColor:'#ededee'},{...props.style}]}>
            {
                props.children
            }
        </Animated.View>
    )
}