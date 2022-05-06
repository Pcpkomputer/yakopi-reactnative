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

import { Video, AVPlaybackStatus } from 'expo-av';


function AssetsVideo(props){

    let globalContext = useContext(GlobalContext);

    const [imageLoading, setImageLoading] = useState(true);

    const [video, setVideo] = useState([]);

    const fetchVideo = async()=>{
        setImageLoading(true);
        let id = props.route.params.id_land_assessment;
        let request = await fetch(`${endpoint}/video-land-assessment`,{
            method:"POST",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`,
                "content-type":"application/json"
            },
            body:JSON.stringify({
                id_land_assessment:id
            })
        });
        let response = await request.json();
        if(response.success){
            setVideo(response.data);
            setImageLoading(false);
        }
       
    }

    useEffect(()=>{
        fetchVideo();
    },[]);

    useEffect(()=>{
        props.navigation.setOptions({
            headerTitle: `Video Land Assessment - ${props.route.params.site_code}`,
        });
    },[])

    return (
        <View style={{flex:1}}>


            <TouchableOpacity 
            activeOpacity={0.6}
            onPress={()=>{
                alert("tambah video");
            }}
            style={{position:"absolute",zIndex:9999,bottom:EStyleSheet.value("30rem"),right:EStyleSheet.value("30rem")}}>
                <AntDesign name="pluscircle" size={EStyleSheet.value("60rem")} color="#1e915a" />
            </TouchableOpacity>

            {
                (imageLoading) ?
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <ActivityIndicator color="black" size="large"/>
                </View>
                :
                <FlatList
                    contentContainerStyle={{paddingTop:EStyleSheet.value("15rem")}}
                    keyExtractor={(item,index)=>`image-${index}`}
                    data={video}
                    renderItem={({item,index})=>{
                        return (
                            <View style={{marginHorizontal:EStyleSheet.value("20rem"),overflow:"hidden",borderRadius:EStyleSheet.value("3rem"),marginBottom:EStyleSheet.value("15rem")}}>
                                <View style={{backgroundColor:"#e8e8e8",height:EStyleSheet.value("200rem")}}>
                                    {
                                        (item.link_land_assessment_video===null || item.link_land_assessment_video==="") ?
                                        <Video
                                        style={{flex:1}}
                                        source={{
                                        uri: `${endpoint.replace("/api","")}/${item.file_land_assessment_video}`,
                                        }}
                                        useNativeControls
                                        resizeMode="contain"/>
                                        :
                                        <Video
                                        style={{flex:1}}
                                        source={{
                                        uri: item.link_land_assessment_video,
                                        }}
                                        useNativeControls
                                        resizeMode="contain"/>
                                    }
                                </View>
                                <View style={{zIndex:10,paddingHorizontal:EStyleSheet.value("20rem"),paddingVertical:EStyleSheet.value("15rem")}}>
                                    <Text style={{color:"white",fontSize:EStyleSheet.value("20rem")}}>{item.keterangan_land_assessment_video}</Text>
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

    let globalContext = useContext(GlobalContext);

    const [imageLoading, setImageLoading] = useState(true);
    const [image, setImage] = useState([]);

    const fetchImage = async()=>{
        setImageLoading(true);
        let id = props.route.params.id_land_assessment;
        let request = await fetch(`${endpoint}/drone-land-assessment`,{
            method:"POST",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`,
                "content-type":"application/json"
            },
            body:JSON.stringify({
                id_land_assessment:id
            })
        });
        let response = await request.json();
        if(response.success){
            setImage(response.data);
            setImageLoading(false);
        }
       
    }

    useEffect(()=>{
        fetchImage();
    },[]);

    useEffect(()=>{
        props.navigation.setOptions({
            headerTitle: `Drone Land Assessment - ${props.route.params.site_code}`,
        });
    },[])

    return (
        <View style={{flex:1}}>


            <TouchableOpacity 
            activeOpacity={0.6}
            onPress={()=>{
                alert("tambah drone");
            }}
            style={{position:"absolute",zIndex:9999,bottom:EStyleSheet.value("30rem"),right:EStyleSheet.value("30rem")}}>
                <AntDesign name="pluscircle" size={EStyleSheet.value("60rem")} color="#1e915a" />
            </TouchableOpacity>



            {
                (imageLoading) ?
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <ActivityIndicator color="black" size="large"/>
                </View>
                :
                <FlatList
                    contentContainerStyle={{paddingTop:EStyleSheet.value("15rem")}}
                    keyExtractor={(item,index)=>`image-${index}`}
                    data={image}
                    renderItem={({item,index})=>{
                        return (
                            <View style={{marginHorizontal:EStyleSheet.value("20rem"),overflow:"hidden",borderRadius:EStyleSheet.value("3rem"),marginBottom:EStyleSheet.value("15rem")}}>
                                <View style={{backgroundColor:"#e8e8e8",height:EStyleSheet.value("200rem")}}>
                                    {
                                        (item.link_land_assessment_drone===null || item.link_land_assessment_drone==="") ?
                                        <Image style={{width:"100%",height:"100%"}} source={{uri:`${endpoint.replace("/api","")}/${item.file_land_assessment_drone}`}}></Image>
                                        :
                                        <Image style={{width:"100%",height:"100%"}} source={{uri:item.link_land_assessment_drone}}></Image>
                                    }
                                </View>
                                <View style={{position:"absolute",zIndex:10,bottom:EStyleSheet.value("20rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                                    <Text style={{color:"white",fontSize:EStyleSheet.value("20rem")}}>{item.keterangan_land_assessment_drone}</Text>
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

    let globalContext = useContext(GlobalContext);

    const [imageLoading, setImageLoading] = useState(true);
    const [image, setImage] = useState([]);

    const fetchImage = async()=>{
        setImageLoading(true);
        let id = props.route.params.id_land_assessment;
        let request = await fetch(`${endpoint}/photo-land-assessment`,{
            method:"POST",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`,
                "content-type":"application/json"
            },
            body:JSON.stringify({
                id_land_assessment:id
            })
        });
        let response = await request.json();
        if(response.success){
            setImage(response.data);
            setImageLoading(false);
        }
       
    }

    useEffect(()=>{
        fetchImage();
    },[]);

    useEffect(()=>{
        props.navigation.setOptions({
            headerTitle: `Photo Land Assessment - ${props.route.params.site_code}`,
        });
    },[])

    return (
        <View style={{flex:1}}>


            <TouchableOpacity 
            activeOpacity={0.6}
            onPress={()=>{
                alert("tambah gambar");
            }}
            style={{position:"absolute",zIndex:9999,bottom:EStyleSheet.value("30rem"),right:EStyleSheet.value("30rem")}}>
                <AntDesign name="pluscircle" size={EStyleSheet.value("60rem")} color="#1e915a" />
            </TouchableOpacity>

            {
                (imageLoading) ?
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <ActivityIndicator color="black" size="large"/>
                </View>
                :
                <FlatList
                    contentContainerStyle={{paddingTop:EStyleSheet.value("15rem")}}
                    keyExtractor={(item,index)=>`image-${index}`}
                    data={image}
                    renderItem={({item,index})=>{
                        return (
                            <View style={{marginHorizontal:EStyleSheet.value("20rem"),overflow:"hidden",borderRadius:EStyleSheet.value("3rem"),marginBottom:EStyleSheet.value("15rem")}}>
                                <View style={{backgroundColor:"#e8e8e8",height:EStyleSheet.value("200rem")}}>
                                    {
                                        (item.link_land_assessment_photo===null || item.link_land_assessment_photo==="") ?
                                        <Image style={{width:"100%",height:"100%"}} source={{uri:`${endpoint.replace("/api","")}/${item.file_land_assessment_photo}`}}></Image>
                                        :
                                        <Image style={{width:"100%",height:"100%"}} source={{uri:item.link_land_assessment_photo}}></Image>
                                    }
                                </View>
                                <View style={{position:"absolute",zIndex:10,bottom:EStyleSheet.value("20rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                                    <Text style={{color:"white",fontSize:EStyleSheet.value("20rem")}}>{item.keterangan_land_assessment_photo}</Text>
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