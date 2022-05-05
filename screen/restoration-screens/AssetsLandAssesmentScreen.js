import React,{useState,useEffect, useContext} from 'react';
import { StyleSheet, Platform, FlatList, ScrollView, ActivityIndicator, Linking, AsyncStorage, TouchableOpacity, Text, TextInput, View, Dimensions, Image } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import { StatusBarHeight } from '../../utils/HeightUtils';
import { LinearGradient } from 'expo-linear-gradient';

import { CommonActions } from '@react-navigation/native';

import { toLocaleTimestamp } from '../../utils/utils';

import { Entypo, Feather, FontAwesome, AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 

import {endpoint} from '../../utils/endpoint';

import {GlobalContext} from '../../App';


function AssetsVideo(props){

    const [imageLoading, setImageLoading] = useState(true);

    useEffect(()=>{
        setTimeout(() => {
            setImageLoading(false);
        }, 500);
    },[]);

    useEffect(()=>{
        props.navigation.setOptions({
            headerTitle: `Video Land Assessment - ${props.route.params.site_code}`,
        });
    },[])

    return (
        <View style={{flex:1}}>
            {
                (imageLoading) ?
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <ActivityIndicator color="black" size="large"/>
                </View>
                :
                <FlatList
                    contentContainerStyle={{paddingTop:EStyleSheet.value("15rem")}}
                    keyExtractor={(item,index)=>`image-${index}`}
                    data={[1,2,3,4,5]}
                    renderItem={({item,index})=>{
                        return (
                            <View style={{marginHorizontal:EStyleSheet.value("20rem"),overflow:"hidden",borderRadius:EStyleSheet.value("3rem"),marginBottom:EStyleSheet.value("15rem")}}>
                                <View style={{backgroundColor:"#e8e8e8",height:EStyleSheet.value("200rem")}}>
                                    <Image style={{width:"100%",height:"100%"}} source={{uri:"https://www.worldbank.org/content/dam/photos/780x439/2021/may-6/mangrove-photo.jpeg"}}></Image>
                                </View>
                                <View style={{position:"absolute",zIndex:10,bottom:EStyleSheet.value("20rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                                    <Text style={{color:"white",fontSize:EStyleSheet.value("20rem")}}>Ini adalah keterangan gambar ke 1 atau ke 2</Text>
                                </View>
                                <LinearGradient
                                style={{position:"absolute",bottom:0,width:"100%",height:"50%"}}
                                colors={['transparent', 'rgba(0,0,0,0.5)']}>
                                </LinearGradient>
                            </View>
                        )
                    }}
                    />
            }
        </View>
    )
}




function AssetsDrone(props){

    const [imageLoading, setImageLoading] = useState(true);

    useEffect(()=>{
        setTimeout(() => {
            setImageLoading(false);
        }, 500);
    },[]);

    useEffect(()=>{
        props.navigation.setOptions({
            headerTitle: `Drone Land Assessment - ${props.route.params.site_code}`,
        });
    },[])

    return (
        <View style={{flex:1}}>
            {
                (imageLoading) ?
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <ActivityIndicator color="black" size="large"/>
                </View>
                :
                <FlatList
                    contentContainerStyle={{paddingTop:EStyleSheet.value("15rem")}}
                    keyExtractor={(item,index)=>`image-${index}`}
                    data={[1,2,3,4,5]}
                    renderItem={({item,index})=>{
                        return (
                            <View style={{marginHorizontal:EStyleSheet.value("20rem"),overflow:"hidden",borderRadius:EStyleSheet.value("3rem"),marginBottom:EStyleSheet.value("15rem")}}>
                                <View style={{backgroundColor:"#e8e8e8",height:EStyleSheet.value("200rem")}}>
                                    <Image style={{width:"100%",height:"100%"}} source={{uri:"https://www.worldbank.org/content/dam/photos/780x439/2021/may-6/mangrove-photo.jpeg"}}></Image>
                                </View>
                                <View style={{position:"absolute",zIndex:10,bottom:EStyleSheet.value("20rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                                    <Text style={{color:"white",fontSize:EStyleSheet.value("20rem")}}>Ini adalah keterangan gambar ke 1 atau ke 2</Text>
                                </View>
                                <LinearGradient
                                style={{position:"absolute",bottom:0,width:"100%",height:"50%"}}
                                colors={['transparent', 'rgba(0,0,0,0.5)']}>
                                </LinearGradient>
                            </View>
                        )
                    }}
                    />
            }
        </View>
    )
}



function AssetsImage(props){

    const [imageLoading, setImageLoading] = useState(true);

    useEffect(()=>{
        setTimeout(() => {
            setImageLoading(false);
        }, 500);
    },[]);

    useEffect(()=>{
        props.navigation.setOptions({
            headerTitle: `Photo Land Assessment - ${props.route.params.site_code}`,
        });
    },[])

    return (
        <View style={{flex:1}}>
            {
                (imageLoading) ?
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <ActivityIndicator color="black" size="large"/>
                </View>
                :
                <FlatList
                    contentContainerStyle={{paddingTop:EStyleSheet.value("15rem")}}
                    keyExtractor={(item,index)=>`image-${index}`}
                    data={[1,2,3,4,5]}
                    renderItem={({item,index})=>{
                        return (
                            <View style={{marginHorizontal:EStyleSheet.value("20rem"),overflow:"hidden",borderRadius:EStyleSheet.value("3rem"),marginBottom:EStyleSheet.value("15rem")}}>
                                <View style={{backgroundColor:"#e8e8e8",height:EStyleSheet.value("200rem")}}>
                                    <Image style={{width:"100%",height:"100%"}} source={{uri:"https://www.worldbank.org/content/dam/photos/780x439/2021/may-6/mangrove-photo.jpeg"}}></Image>
                                </View>
                                <View style={{position:"absolute",zIndex:10,bottom:EStyleSheet.value("20rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                                    <Text style={{color:"white",fontSize:EStyleSheet.value("20rem")}}>Ini adalah keterangan gambar ke 1 atau ke 2</Text>
                                </View>
                                <LinearGradient
                                style={{position:"absolute",bottom:0,width:"100%",height:"50%"}}
                                colors={['transparent', 'rgba(0,0,0,0.5)']}>
                                </LinearGradient>
                            </View>
                        )
                    }}
                    />
            }
        </View>
    )
}


export default function AssetsLandAssessmentScreen(props){

    if(props.route.params.type==="image"){
        return <AssetsImage {...props}/>
    }
    else if(props.route.params.type==="drone"){
        return <AssetsDrone {...props}/>
    }
    else if(props.route.params.type==="video"){
        return <AssetsVideo {...props}/>
    }

}