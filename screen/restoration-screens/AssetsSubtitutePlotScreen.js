import React,{useState,useEffect, useContext} from 'react';
import { StyleSheet, Platform, FlatList, ScrollView,Alert, BackHandler, ActivityIndicator, Linking, AsyncStorage, TouchableOpacity, Text, TextInput, View, Dimensions, Image } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import { StatusBarHeight } from '../../utils/HeightUtils';
import { LinearGradient } from 'expo-linear-gradient';

import { CommonActions } from '@react-navigation/native';

import { toLocaleTimestamp } from '../../utils/utils';

import { Entypo, Feather, FontAwesome, AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 

import {endpoint} from '../../utils/endpoint';

import {GlobalContext} from '../../App';

import { Video, AVPlaybackStatus } from 'expo-av';

import * as ImagePicker from 'expo-image-picker';
import * as DocumentPicker from 'expo-document-picker';

function createUUID() {
    // http://www.ietf.org/rfc/rfc4122.txt
    var s = [];
    var hexDigits = "0123456789abcdef";
    for (var i = 0; i < 36; i++) {
        s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
    }
    s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = "-";

    var uuid = s.join("");
    return uuid;
}

let shadow = {
    shadowColor: "#000",
shadowOffset: {
	width: 0,
	height: 2,
},
shadowOpacity: 0.25,
shadowRadius: 3.84,

elevation: 5,
}


function AssetsVideo(props){

    let [modalKeteranganOpened, setModalKeteranganOpened] = useState(false);
    let [keterangan, setKeterangan] = useState("");

    useEffect(() => {
        const backAction = () => {
          if(modalKeteranganOpened){
              setModalKeteranganOpened(false);
              return true;
          }
          else{
              props.navigation.goBack();
              return true;
          }
        
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, [modalKeteranganOpened]);

    let globalContext = useContext(GlobalContext);

    const [imageLoading, setImageLoading] = useState(true);

    const [video, setVideo] = useState([]);

    const fetchVideo = async()=>{
        setImageLoading(true);
        let id = props.route.params.id_detail_subtitute_plot;
        let request = await fetch(`${endpoint}/video-subtitute-plot`,{
            method:"POST",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`,
                "content-type":"application/json"
            },
            body:JSON.stringify({
                id_detail_subtitute_plot:id
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
            headerTitle: `Video - ${props.route.params.id_detail_subtitute_plot}`,
        });
    },[])

    return (
        <View style={{flex:1}}>


            {
                (modalKeteranganOpened) &&
                <View style={{position:"absolute",width:"100%",zIndex:999,height:"100%",justifyContent:"center",alignItems:"center"}}>
                    <View style={{...shadow,backgroundColor:"white",width:Dimensions.get("screen").width-EStyleSheet.value("60rem"),borderRadius:EStyleSheet.value("5rem"),padding:EStyleSheet.value("20rem")}}>
                        <View style={{justifyContent:"center",alignItems:"center"}}>
                            <Text>Isi Keterangan</Text>
                        </View>
                        <View>
                            <TextInput 
                            onChangeText={(text)=>{
                                setKeterangan(text);
                            }}
                            required={true}
                            value={keterangan}
                            style={{height:EStyleSheet.value("100rem")}} multiline={true} placeholder="Keterangan"/>
                        </View>
                        <TouchableOpacity 
                        onPress={async ()=>{
                            let required = true;
                            if(keterangan==""){
                                required = false;
                            }
                            if(required){
                                let gambar = await DocumentPicker.getDocumentAsync();
                                if(gambar.type==="success"){

                                    setImageLoading(true);
                                    setModalKeteranganOpened(false);
                
                                    let uuid = createUUID();
                
                                    var photo = {
                                        uri: gambar.uri,
                                        type: 'video/mp4',
                                        name: `${uuid}.mp4`,
                                    };
                
                                    let form = new FormData();
                
                                    form.append("file_subtitute_plot_video",photo);
                                    let request = await fetch(`https://sispro-yakopi.org/endpoint/dokumentasiVideoSubtitutePlot`,{
                                        method:"POST",
                                        body:form
                                    });
                                    let response = await request.json();
                
                                    let url = `/assets/img/videoSubtitutePlot/${response.result.orig_name}`;

                                    let id = props.route.params.id_detail_subtitute_plot;

                                    
                                    let req2 = await fetch(`${endpoint}/add-video-subtitute-plot`,{
                                        method:"POST",
                                        headers:{
                                            "authorization":`Bearer ${globalContext.credentials.token}`,
                                            "content-type":"application/json"
                                        },
                                        body:JSON.stringify({
                                            id_detail_subtitute_plot:id,
                                            keterangan_subtitute_plot_video:keterangan,
                                            link_subtitute_plot_video:"",
                                            file_subtitute_plot_video:url
                                        })
                                    });
                                    let res2 = await req2.json();
                                    
                                    if(res2.success){
                                        alert(res2.msg);
                                        setKeterangan("");
                                        await fetchVideo();
                                    }
                
                                }
                            }else{
                                alert("Keterangan tidak boleh kosong");
                            }
                           
                        }}
                        style={{backgroundColor:"#1e915a",marginTop:EStyleSheet.value("5rem"),paddingVertical:EStyleSheet.value("15rem"),justifyContent:"center",alignItems:"center",borderRadius:EStyleSheet.value("5rem")}}>
                            <Text style={{color:"white"}}>Tambah</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }


            {
            
            <TouchableOpacity 
            activeOpacity={0.6}
            onPress={()=>{
                setModalKeteranganOpened(true);
            }}
            style={{position:"absolute",zIndex:9999,bottom:EStyleSheet.value("30rem"),right:EStyleSheet.value("30rem")}}>
                <AntDesign name="pluscircle" size={EStyleSheet.value("60rem")} color="#1e915a" />
            </TouchableOpacity>
            }

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
                                        (item.link_subtitute_plot_video===null || item.link_subtitute_plot_video==="") ?
                                        <Video
                                        style={{flex:1}}
                                        source={{
                                        uri: `${endpoint.replace(/api(.?)/g,"")}${item.file_subtitute_plot_video}`,
                                        }}
                                        useNativeControls
                                        resizeMode="contain"/>
                                        :
                                        <Video
                                        style={{flex:1}}
                                        source={{
                                        uri: item.link_subtitute_plot_video,
                                        }}
                                        useNativeControls
                                        resizeMode="contain"/>
                                    }
                                </View>
                                <View style={{zIndex:10,paddingHorizontal:EStyleSheet.value("20rem"),paddingVertical:EStyleSheet.value("15rem")}}>
                                    <Text style={{color:"white",fontSize:EStyleSheet.value("20rem")}}>{item.keterangan_subtitute_plot_video}</Text>
                                </View>
                                <LinearGradient
                                style={{position:"absolute",bottom:0,width:"100%",height:"50%"}}
                                colors={['transparent', 'rgba(0,0,0,0.5)']}>
                                </LinearGradient>
                                {
                                    
                                    <TouchableOpacity
                                    onPress={async ()=>{
                                        Alert.alert(
                                            "Dialog Konfirmasi",
                                            "Anda yakin ingin menghapus data ini?",
                                            [
                                              {
                                                text: "Tidak",
                                                style: "cancel"
                                              },
                                              { text: "Iya", onPress: async () => {
                      
                                                    let id = item.id_subtitute_plot_video;
                                                    let request = await fetch(`${endpoint}/delete-video-subtitute-plot`,{
                                                        method:"DELETE",
                                                        headers:{
                                                            "authorization":`Bearer ${globalContext.credentials.token}`,
                                                            "content-type":"application/json"
                                                        },
                                                        body:JSON.stringify({
                                                            id_subtitute_plot_video:id
                                                        })
                                                    });
                                                    let response = await request.json();
                                                    if(response.success){
                                                        await fetchVideo();
                                                    }
                                                    else{
                                                        alert(response.msg);
                                                    }
                                              } }
                                            ]
                                          );
                                    }
                                    }
                                    style={{position:"absolute",top:EStyleSheet.value("20rem"),right:EStyleSheet.value("20rem"),backgroundColor:"red",paddingHorizontal:EStyleSheet.value("10rem"),paddingVertical:EStyleSheet.value("10rem"),borderRadius:EStyleSheet.value("5rem")}}>
                                        <Text style={{color:"white"}}>Hapus</Text>
                                    </TouchableOpacity>
                                }
                                
                            </View>
                        )
                    }}
                    />
            }
        </View>
    )
}




function AssetsDrone(props){

    let [modalKeteranganOpened, setModalKeteranganOpened] = useState(false);
    let [keterangan, setKeterangan] = useState("");

    useEffect(() => {
        const backAction = () => {
          if(modalKeteranganOpened){
              setModalKeteranganOpened(false);
              return true;
          }
          else{
              props.navigation.goBack();
              return true;
          }
        
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, [modalKeteranganOpened]);


    let globalContext = useContext(GlobalContext);

    const [imageLoading, setImageLoading] = useState(true);
    const [image, setImage] = useState([]);

    const fetchImage = async()=>{
        setImageLoading(true);
        let id = props.route.params.id_detail_subtitute_plot;
        let request = await fetch(`${endpoint}/drone-subtitute-plot`,{
            method:"POST",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`,
                "content-type":"application/json"
            },
            body:JSON.stringify({
                id_detail_subtitute_plot:id
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
            headerTitle: `Drone - ${props.route.params.id_detail_subtitute_plot}`,
        });
    },[])

    return (
        <View style={{flex:1}}>


{
                (modalKeteranganOpened) &&
                <View style={{position:"absolute",width:"100%",zIndex:999,height:"100%",justifyContent:"center",alignItems:"center"}}>
                    <View style={{...shadow,backgroundColor:"white",width:Dimensions.get("screen").width-EStyleSheet.value("60rem"),borderRadius:EStyleSheet.value("5rem"),padding:EStyleSheet.value("20rem")}}>
                        <View style={{justifyContent:"center",alignItems:"center"}}>
                            <Text>Isi Keterangan</Text>
                        </View>
                        <View>
                            <TextInput 
                            onChangeText={(text)=>{
                                setKeterangan(text);
                            }}
                            required={true}
                            value={keterangan}
                            style={{height:EStyleSheet.value("100rem")}} multiline={true} placeholder="Keterangan"/>
                        </View>
                        <TouchableOpacity 
                        onPress={async ()=>{
                            let required = true;
                            if(keterangan==""){
                                required = false;
                            }
                            if(required){
                                let gambar = await ImagePicker.launchImageLibraryAsync();
                                if(!gambar.cancelled){

                                    setImageLoading(true);
                                    setModalKeteranganOpened(false);
                
                                    let uuid = createUUID();
                
                                    var photo = {
                                        uri: gambar.uri,
                                        type: 'image/jpeg',
                                        name: `${uuid}.jpg`,
                                    };
                
                                    let form = new FormData();
                
                                    form.append("file_subtitute_plot_drone",photo);
                                    let request = await fetch(`https://sispro-yakopi.org/endpoint/dokumentasiDroneSubtitutePlot`,{
                                        method:"POST",
                                        body:form
                                    });
                                    let response = await request.json();
                
                                    let url = `/assets/img/droneSubtitutePlot/${response.result.orig_name}`;

                                    let id = props.route.params.id_detail_subtitute_plot;

                                    
                                    let req2 = await fetch(`${endpoint}/add-drone-subtitute-plot`,{
                                        method:"POST",
                                        headers:{
                                            "authorization":`Bearer ${globalContext.credentials.token}`,
                                            "content-type":"application/json"
                                        },
                                        body:JSON.stringify({
                                            id_detail_subtitute_plot:id,
                                            keterangan_subtitute_plot_drone:keterangan,
                                            link_subtitute_plot_drone:"",
                                            file_subtitute_plot_drone:url
                                        })
                                    });
                                    let res2 = await req2.json();
                                    
                                    if(res2.success){
                                        alert(res2.msg);
                                        setKeterangan("");
                                        await fetchImage();
                                    }
                
                                }
                            }else{
                                alert("Keterangan tidak boleh kosong");
                            }
                           
                        }}
                        style={{backgroundColor:"#1e915a",marginTop:EStyleSheet.value("5rem"),paddingVertical:EStyleSheet.value("15rem"),justifyContent:"center",alignItems:"center",borderRadius:EStyleSheet.value("5rem")}}>
                            <Text style={{color:"white"}}>Tambah</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }

            {
            
            <TouchableOpacity 
            activeOpacity={0.6}
            onPress={()=>{
                setModalKeteranganOpened(true);
            }}
            style={{position:"absolute",zIndex:9999,bottom:EStyleSheet.value("30rem"),right:EStyleSheet.value("30rem")}}>
                <AntDesign name="pluscircle" size={EStyleSheet.value("60rem")} color="#1e915a" />
            </TouchableOpacity>
            }



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
                        console.log(`${endpoint.replace(/api(.?)/g,"")}${item.file_subtitute_plot_drone}`);
                        return (
                            <View style={{marginHorizontal:EStyleSheet.value("20rem"),overflow:"hidden",borderRadius:EStyleSheet.value("3rem"),marginBottom:EStyleSheet.value("15rem")}}>
                                <View style={{backgroundColor:"#e8e8e8",height:EStyleSheet.value("200rem")}}>
                                    {
                                        (item.link_subtitute_plot_drone===null || item.link_subtitute_plot_drone==="") ?
                                        <Image style={{width:"100%",height:"100%"}} source={{uri:`${endpoint.replace(/api(.?)/g,"")}${item.file_subtitute_plot_drone}`}}></Image>
                                        :
                                        <Image style={{width:"100%",height:"100%"}} source={{uri:item.link_subtitute_plot_drone}}></Image>
                                    }
                                </View>
                                <View style={{position:"absolute",zIndex:10,bottom:EStyleSheet.value("20rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                                    <Text style={{color:"white",fontSize:EStyleSheet.value("20rem")}}>{item.keterangan_subtitute_plot_video}</Text>
                                </View>
                                <LinearGradient
                                style={{position:"absolute",bottom:0,width:"100%",height:"50%"}}
                                colors={['transparent', 'rgba(0,0,0,0.5)']}>
                                </LinearGradient>
                                {
                                    
                                    <TouchableOpacity
                                    onPress={async ()=>{
                                        Alert.alert(
                                            "Dialog Konfirmasi",
                                            "Anda yakin ingin menghapus data ini?",
                                            [
                                              {
                                                text: "Tidak",
                                                style: "cancel"
                                              },
                                              { text: "Iya", onPress: async () => {
                      
                                                    let id = item.id_subtitute_plot_drone;
                                                    let request = await fetch(`${endpoint}/delete-drone-subtitute-plot`,{
                                                        method:"DELETE",
                                                        headers:{
                                                            "authorization":`Bearer ${globalContext.credentials.token}`,
                                                            "content-type":"application/json"
                                                        },
                                                        body:JSON.stringify({
                                                            id_subtitute_plot_drone:id
                                                        })
                                                    });
                                                    let response = await request.json();
                                                    if(response.success){
                                                        await fetchImage();
                                                    }
                                                    else{
                                                        alert(response.msg);
                                                    }
                                              } }
                                            ]
                                          );
                                    }
                                    }
                                    style={{position:"absolute",top:EStyleSheet.value("20rem"),right:EStyleSheet.value("20rem"),backgroundColor:"red",paddingHorizontal:EStyleSheet.value("10rem"),paddingVertical:EStyleSheet.value("10rem"),borderRadius:EStyleSheet.value("5rem")}}>
                                        <Text style={{color:"white"}}>Hapus</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        )
                    }}
                    />
            }
        </View>
    )
}



function AssetsImage(props){

    let [modalKeteranganOpened, setModalKeteranganOpened] = useState(false);
    let [keterangan, setKeterangan] = useState("");

    useEffect(() => {
        const backAction = () => {
          if(modalKeteranganOpened){
              setModalKeteranganOpened(false);
              return true;
          }
          else{
              props.navigation.goBack();
              return true;
          }
        
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, [modalKeteranganOpened]);
    

    let globalContext = useContext(GlobalContext);

    const [imageLoading, setImageLoading] = useState(true);
    const [image, setImage] = useState([]);

    const fetchImage = async()=>{
        setImageLoading(true);
        let id = props.route.params.id_detail_subtitute_plot;
        let request = await fetch(`${endpoint}/photo-subtitute-plot`,{
            method:"POST",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`,
                "content-type":"application/json"
            },
            body:JSON.stringify({
                id_detail_subtitute_plot:id
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
            headerTitle: `Photo - ${props.route.params.id_detail_subtitute_plot}`,
        });
    },[])

    return (
        <View style={{flex:1}}>


            {
                (modalKeteranganOpened) &&
                <View style={{position:"absolute",width:"100%",zIndex:999,height:"100%",justifyContent:"center",alignItems:"center"}}>
                    <View style={{...shadow,backgroundColor:"white",width:Dimensions.get("screen").width-EStyleSheet.value("60rem"),borderRadius:EStyleSheet.value("5rem"),padding:EStyleSheet.value("20rem")}}>
                        <View style={{justifyContent:"center",alignItems:"center"}}>
                            <Text>Isi Keterangan</Text>
                        </View>
                        <View>
                            <TextInput 
                            onChangeText={(text)=>{
                                setKeterangan(text);
                            }}
                            required={true}
                            value={keterangan}
                            style={{height:EStyleSheet.value("100rem")}} multiline={true} placeholder="Keterangan"/>
                        </View>
                        <TouchableOpacity 
                        onPress={async ()=>{
                            let required = true;
                            if(keterangan==""){
                                required = false;
                            }
                            if(required){
                                let gambar = await ImagePicker.launchImageLibraryAsync();
                                if(!gambar.cancelled){

                                    setImageLoading(true);
                                    setModalKeteranganOpened(false);
                
                                    let uuid = createUUID();
                
                                    var photo = {
                                        uri: gambar.uri,
                                        type: 'image/jpeg',
                                        name: `${uuid}.jpg`,
                                    };
                
                                    let form = new FormData();
                
                                    form.append("file_subtitute_plot_photo",photo);
                                    let request = await fetch(`https://sispro-yakopi.org/endpoint/dokumentasiPhotoSubtitutePlot`,{
                                        method:"POST",
                                        body:form
                                    });
                                    let response = await request.json();
                
                                    let url = `/assets/img/photoSubtitutePlot/${response.result.orig_name}`;

                                    let id = props.route.params.id_detail_subtitute_plot;

                                    let req2 = await fetch(`${endpoint}/add-photo-subtitute-plot`,{
                                        method:"POST",
                                        headers:{
                                            "authorization":`Bearer ${globalContext.credentials.token}`,
                                            "content-type":"application/json"
                                        },
                                        body:JSON.stringify({
                                            id_detail_subtitute_plot:id,
                                            keterangan_subtitute_plot_photo:keterangan,
                                            link_subtitute_plot_photo:"",
                                            file_subtitute_plot_photo:url
                                        })
                                    });
                                    let res2 = await req2.json();
                                    
                                    if(res2.success){
                                        alert(res2.msg);
                                        setKeterangan("");
                                        await fetchImage();
                                    }
                
                                }
                            }else{
                                alert("Keterangan harus diisi");
                            }
                        }}
                        style={{backgroundColor:"#1e915a",marginTop:EStyleSheet.value("5rem"),paddingVertical:EStyleSheet.value("15rem"),justifyContent:"center",alignItems:"center",borderRadius:EStyleSheet.value("5rem")}}>
                            <Text style={{color:"white"}}>Tambah</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }

            {
            
            <TouchableOpacity 
            activeOpacity={0.6}
            onPress={async ()=>{
               setModalKeteranganOpened(true);
            }}
            style={{position:"absolute",zIndex:99,bottom:EStyleSheet.value("30rem"),right:EStyleSheet.value("30rem")}}>
                <AntDesign name="pluscircle" size={EStyleSheet.value("60rem")} color="#1e915a" />
            </TouchableOpacity>
            }

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
                                        (item.link_subtitute_plot_photo===null || item.link_subtitute_plot_photo==="") ?
                                        <Image style={{width:"100%",height:"100%"}} source={{uri:`${endpoint.replace(/api(.?)/g,"")}${item.file_subtitute_plot_photo}`}}></Image>
                                        :
                                        <Image style={{width:"100%",height:"100%"}} source={{uri:item.link_subtitute_plot_photo}}></Image>
                                    }
                                </View>
                                <View style={{position:"absolute",zIndex:10,bottom:EStyleSheet.value("20rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                                    <Text style={{color:"white",fontSize:EStyleSheet.value("20rem")}}>{item.keterangan_subtitute_plot_photo}</Text>
                                </View>
                                <LinearGradient
                                style={{position:"absolute",bottom:0,width:"100%",height:"50%"}}
                                colors={['transparent', 'rgba(0,0,0,0.5)']}>
                                </LinearGradient>
                                {
                                    
                                    <TouchableOpacity
                                    onPress={async ()=>{
                                        Alert.alert(
                                            "Dialog Konfirmasi",
                                            "Anda yakin ingin menghapus data ini?",
                                            [
                                              {
                                                text: "Tidak",
                                                style: "cancel"
                                              },
                                              { text: "Iya", onPress: async () => {
                      
                                                    let id = item.id_subtitute_plot_photo;
                                                    let request = await fetch(`${endpoint}/delete-photo-subtitute-plot`,{
                                                        method:"DELETE",
                                                        headers:{
                                                            "authorization":`Bearer ${globalContext.credentials.token}`,
                                                            "content-type":"application/json"
                                                        },
                                                        body:JSON.stringify({
                                                            id_subtitute_plot_photo:id
                                                        })
                                                    });
                                                    let response = await request.json();
                                                    if(response.success){
                                                        await fetchImage();
                                                    }
                                                    else{
                                                        alert(response.msg);
                                                    }
                                              } }
                                            ]
                                          );
                                    }
                                    }
                                    style={{position:"absolute",top:EStyleSheet.value("20rem"),right:EStyleSheet.value("20rem"),backgroundColor:"red",paddingHorizontal:EStyleSheet.value("10rem"),paddingVertical:EStyleSheet.value("10rem"),borderRadius:EStyleSheet.value("5rem")}}>
                                        <Text style={{color:"white"}}>Hapus</Text>
                                    </TouchableOpacity>
                                }
                            </View>
                        )
                    }}
                    />
            }
        </View>
    )
}


export default function AssetsSubtitutePlotScreen(props){

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