import React, {useState, useContext, useEffect} from 'react';
import { StyleSheet, AsyncStorage, ScrollView, ActivityIndicator, TouchableOpacity, Text, View, Dimensions, Image,Pressable } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import { StatusBarHeight } from '../utils/HeightUtils';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import Svg, { Path, Circle, Line } from "react-native-svg"

import { Entypo, Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 

import {GlobalContext} from '../App';
import { endpoint } from '../utils/endpoint';

import * as Location from 'expo-location';

import { CommonActions } from '@react-navigation/native';
import Placeholder from '../components/Placeholder';


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


let shadow2 = {
    shadowColor: "grey",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
}


export default function DashboardScreen(props) {

  const globalContext = useContext(GlobalContext);


  const [thumbnailRestoration, setThumbnailRestoration] = useState([]);
  const [thumbnailComdev, setThumbnailComdev] = useState([]);
  const [thumbnailResearch, setThumbnailResearch] = useState([]);

  const [landAssessmentCount, setLandAssessmentCount] = useState([]);
  const [seedCollectingCount, setSeedCollectingCount] = useState([]);
  const [nurseryActivityCount, setNurseryActivityCount] = useState([]);
  const [plantingActionCount, setPlantingActionCount] = useState([]);
  const [transportCount, setTransportCount] = useState([]);
  const [growthCount, setGrowthCount] = useState([]);
  const [replantingCount, setReplantingCount] = useState([]);
  const [subtitutePlotCount, setSubtitutePlotCount] = useState([]);
  const [replacementPlotCount, setReplacementPlotCount] = useState([]);

  const [communityRegisterCount, setCommunityRegisterCount] = useState([]);
  const [silvosheryCount, setSilvosheryCount] = useState([]);

  const [growthResearchCount, setGrowthResearchCount] = useState([]);
  const [diversityFaunaCount, setDiversityFaunaCount] = useState([]);
  const [diversityFloraCount, setDiversityFloraCount] = useState([]);
  const [hamaCount, setHamaCount] = useState([]);
  const [fiskimCount, setFiskimCount] = useState([]);

  const [presensi,setPresensi] = useState({
      jam_masuk_absen:null,
      jam_keluar_absen:null
  });

  const [presensiLoading, setPresensiLoading] = useState(true);
  const [smokeScreenOpened, setSmokeScreenOpened] = useState(true);


  const fetchThumbnail = async()=>{

    let photoRestoration = async()=>{
        let request = await fetch(`${endpoint}/photo_restoration`,{
            method:"GET",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`
            }
        });
        let response = await request.json();
        return response.data;
    }
    let photoComdev = async()=>{
        let request = await fetch(`${endpoint}/photo_comdev`,{
            method:"GET",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`
            }
        });
        let response = await request.json();
        return response.data;
    }

    let photoResearch = async()=>{
        let request = await fetch(`${endpoint}/photo_research`,{
            method:"GET",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`
            }
        });
        let response = await request.json();
        return response.data;
    }

    let [thumbnailRestoration, thumbnailComdev, thumbnailResearch] = await Promise.all([
        photoRestoration(),
        photoComdev(),
        photoResearch()
      ]);
    setThumbnailRestoration(thumbnailRestoration);
    setThumbnailComdev(thumbnailComdev);
    setThumbnailResearch(thumbnailResearch);
  }

  const fetchCountData = async()=>{

    let countLandAssessment = async()=>{
        let request = await fetch(`${endpoint}/count-land-assessment`,{
            method:"GET",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`
            }
        });
        let response = await request.json();
        return response.data;
    }

    let countSeedCollecting = async()=>{
        let request = await fetch(`${endpoint}/count-seed-collecting`,{
            method:"GET",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`
            }
        });
        let response = await request.json();
        return response.data;
    }

    let countNurseryActivity = async()=>{
        let request = await fetch(`${endpoint}/count-nursery-activity`,{
            method:"GET",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`
            }
        });
        let response = await request.json();
        return response.data;
    }

    let countPlantingAction = async()=>{
        let request = await fetch(`${endpoint}/count-planting-action`,{
            method:"GET",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`
            }
        });
        let response = await request.json();
        return response.data;
    }

    let countTransport = async()=>{
        let request = await fetch(`${endpoint}/count-transport`,{
            method:"GET",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`
            }
        });
        let response = await request.json();
        return response.data;
    }

    let countGrowth = async()=>{
        let request = await fetch(`${endpoint}/count-growth`,{
            method:"GET",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`
            }
        });
        let response = await request.json();
        return response.data;
    }

    let countReplanting = async()=>{
        let request = await fetch(`${endpoint}/count-replanting`,{
            method:"GET",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`
            }
        });
        let response = await request.json();
        return response.data;
    }

    let countSubtitutePlot = async()=>{
        let request = await fetch(`${endpoint}/count-subtitute-plot`,{
            method:"GET",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`
            }
        });
        let response = await request.json();
        return response.data;
    }

    let countReplacementPlot = async()=>{
        let request = await fetch(`${endpoint}/count-replacement-plot`,{
            method:"GET",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`
            }
        });
        let response = await request.json();
        return response.data;
    }

    let countCommunityRegister = async()=>{
        let request = await fetch(`${endpoint}/count-community-register`,{
            method:"GET",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`
            }
        });
        let response = await request.json();
        return response.data;
    }

    let countSilvoshery = async()=>{
        let request = await fetch(`${endpoint}/count-silvoshery`,{
            method:"GET",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`
            }
        });
        let response = await request.json();
        return response.data;
    }
    
    let countGrowthResearch = async()=>{
        let request = await fetch(`${endpoint}/count-growth-research`,{
            method:"GET",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`
            }
        });
        let response = await request.json();
        return response.data;
    }
    
    let countDiversityFlora = async()=>{
        let request = await fetch(`${endpoint}/count-diversity-flora`,{
            method:"GET",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`
            }
        });
        let response = await request.json();
        return response.data;
    }

    let countDiversityFauna = async()=>{
        let request = await fetch(`${endpoint}/count-diversity-fauna`,{
            method:"GET",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`
            }
        });
        let response = await request.json();
        return response.data;
    }

    let countHama = async()=>{
        let request = await fetch(`${endpoint}/count-hama`,{
            method:"GET",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`
            }
        });
        let response = await request.json();
        return response.data;
    }

    let countFiskim = async()=>{
        let request = await fetch(`${endpoint}/count-fiskim`,{
            method:"GET",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`
            }
        });
        let response = await request.json();
        return response.data;
    }

    let [landAssessmentCount, seedCollectingCount, nurseryActivityCount, plantingActionCount, transportCount, growthCount, replantingCount, subtitutePlotCount, replacementPlotCount, communityRegisterCount, silvosheryCount, growthResearchCount, diversityFloraCount, diversityFaunaCount, hamaCount, fiskimCount] = await Promise.all([
        countLandAssessment(),
        countSeedCollecting(),
        countNurseryActivity(),
        countPlantingAction(),
        countTransport(),
        countGrowth(),
        countReplanting(),
        countSubtitutePlot(),
        countReplacementPlot(),
        countCommunityRegister(),
        countSilvoshery(),
        countGrowthResearch(),
        countDiversityFlora(),
        countDiversityFauna(),
        countHama(),
        countFiskim()
    ]);
    setLandAssessmentCount(landAssessmentCount);
    setSeedCollectingCount(seedCollectingCount);
    setNurseryActivityCount(nurseryActivityCount);
    setPlantingActionCount(plantingActionCount);
    setTransportCount(transportCount);
    setGrowthCount(growthCount);
    setReplantingCount(replantingCount);
    setSubtitutePlotCount(subtitutePlotCount);
    setReplacementPlotCount(replacementPlotCount);
    setCommunityRegisterCount(communityRegisterCount);
    setSilvosheryCount(silvosheryCount);
    setGrowthResearchCount(growthResearchCount);
    setDiversityFloraCount(diversityFloraCount);
    setDiversityFaunaCount(diversityFaunaCount);
    setHamaCount(hamaCount);
    setFiskimCount(fiskimCount);
    }

  const fetchPresensi = async()=>{
      setPresensiLoading(true);
      let request = await fetch(`${endpoint}/cek-presensi`,{
          method:"POST",
          headers:{
              "authorization":`Bearer ${globalContext.credentials.token}`
          }
      });
      let response = await request.json();
      setPresensiLoading(false);
      setPresensi(response.data);
  };

  useEffect(()=>{
    fetchPresensi();
    fetchThumbnail();
    fetchCountData();
  },[]);

  return (
     <View style={{flex:1,backgroundColor:"#edf0f4"}}>
        <ScrollView 
        contentContainerStyle={{paddingBottom:EStyleSheet.value("95rem")}}
        keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag">
            <View style={{height:StatusBarHeight,backgroundColor:"#1e915a"}}></View>
            <View style={{backgroundColor:"#1e915a",height:EStyleSheet.value("100rem"),flexDirection:"row",alignItems:"center",paddingHorizontal:EStyleSheet.value("15rem")}}>
                <Feather style={{opacity:0}} name="menu" size={24} color="white" />
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"white",fontFamily:"PoppinsMedium",fontSize:EStyleSheet.value("23rem")}}>YAKOPI</Text>
                </View>
                <FontAwesome style={{opacity:0}} name="user" size={24} color="white" />
            </View>
            <View style={{backgroundColor:"whitesmoke",paddingTop:0,paddingBottom:0}}>
                <View style={{position:"absolute",backgroundColor:"#1e915a",height:"50%",right:0,width:"100%"}}>
                </View>
                
                <LinearGradient
                colors={['#1e915a', '#5daa5f']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                style={{...shadow,overflow:"hidden",marginHorizontal:EStyleSheet.value("15rem"),backgroundColor:"#2ec5a2",borderRadius:EStyleSheet.value("10rem")}}>
                    
                    {
                        (presensiLoading) &&
                        <View style={{position:"absolute",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",zIndex:100}}>
                            <View style={{position:"absolute",width:"100%",height:"100%",backgroundColor:"grey",opacity:0.4}}></View>
                            <ActivityIndicator size="large" color="white"/>
                        </View>
                    }
                    
                    <View style={{padding:EStyleSheet.value("15rem"),flexDirection:"row"}}>
                        <View style={{backgroundColor:"whitesmoke",overflow:"hidden",borderRadius:EStyleSheet.value("5rem"),width:EStyleSheet.value("100rem"),height:EStyleSheet.value("100rem")}}>
                            <Image resizeMode="stretch" style={{width:"100%",height:"100%"}} source={'https://sispro-yakopi.org/'+globalContext?.credentials?.data?.foto_pengguna ? {uri:'https://sispro-yakopi.org/'+globalContext?.credentials?.data?.foto_pengguna || ""}:require("../assets/logo.jpeg")}/>
                        </View>
                        <View
                        style={{paddingLeft:EStyleSheet.value("20rem"),flex:1,justifyContent:"center"}}>
                            <Text style={{color:"white",fontSize:EStyleSheet.value("15rem")}}>Halo!</Text>
                            <Text style={{marginTop:EStyleSheet.value("5rem"),flex:1,textAlignVertical:"center",color:"white",fontFamily:"PoppinsMedium",fontSize:EStyleSheet.value("20rem")}}>{globalContext?.credentials?.data?.nama_lengkap || ""}</Text>
                            {
                                (!presensi?.jam_masuk_absen && !presensi?.jam_keluar_absen) &&
                                <TouchableOpacity 
                                activeOpacity={0.8}
                                onPress={async ()=>{
                                    let { status } = await Location.requestForegroundPermissionsAsync();
                                    if (status !== 'granted') {
                                       alert("Akses permissions lokasi diperlukan");
                                    }
                                    else{
                                        let image = await ImagePicker.launchCameraAsync();
                                        if(!image.cancelled){
                                                setPresensiLoading(true);
    
                                                // const manipResult = await manipulateAsync(
                                                //     pick.uri,
                                                //     [
                                                //     { resize:{height:1200,width:600} },
                                                //     ],
                                                //     { compress: 1, format: SaveFormat.JPEG }
                                                // );
    
                                                let location = await Location.getLastKnownPositionAsync();
    
                                                var photo = {
                                                    uri: image.uri,
                                                    type: 'image/jpeg',
                                                    name: `presensi-${globalContext.credentials.data.nama_lengkap}-${new Date().getTime()}.jpg`,
                                                };
    
                                                let formdata = new FormData();
                                                formdata.append("foto_absen_masuk",photo);
    
                                                let request = await fetch(`https://sispro-yakopi.org/endpoint/fotoAbsenMasuk`,{
                                                    method:"POST",
                                                    body:formdata
                                                });
                                                let response = await request.json();
                                                
                                                let filename = response.result.file_name;
    
                                                let time = new Date();
                                                let timezone = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
    
                                                
                                                let presensi = await fetch(`${endpoint}/presensi-masuk`,{
                                                    method:"POST",
                                                    headers:{
                                                        "content-type":"application/json",
                                                        "Authorization":`Bearer ${globalContext.credentials.token}`
                                                    },
                                                    body:JSON.stringify({
                                                        filename:filename,
                                                        timezone:timezone,
                                                        latitude:location.coords.latitude,
                                                        longitude:location.coords.longitude
                                                    })
                                                });
                                                let responsepresensi = await presensi.json();

                                                if(responsepresensi.success){
                                                    alert(responsepresensi.msg);
                                                    setPresensiLoading(false);
    
                                                    await fetchPresensi();
                                                }
                                                else{
                                                    alert(responsepresensi.msg);
                                                    setPresensiLoading(false);
    
                                                    await fetchPresensi();
                                                }
                                        }
                                    }
                                   
                                }}
                                style={{backgroundColor:"whitesmoke",justifyContent:"center",alignItems:"center",borderRadius:EStyleSheet.value("10rem"),flex:1,marginTop:EStyleSheet.value("10rem")}}>
                                    <Text>Presensi</Text>
                                </TouchableOpacity> 
                            }
                            {
                                (presensi?.jam_masuk_absen && !presensi?.jam_keluar_absen) &&
                                <TouchableOpacity 
                                activeOpacity={0.8}
                                onPress={async ()=>{
                                    let image = await ImagePicker.launchCameraAsync();
                                    if(!image.cancelled){
                                        setPresensiLoading(true);
                                        let location = await Location.getLastKnownPositionAsync();

                                        var photo = {
                                            uri: image.uri,
                                            type: 'image/jpeg',
                                            name: `presensipulang-${globalContext.credentials.data.nama_lengkap}-${new Date().getTime()}.jpg`,
                                        };

                                        let formdata = new FormData();
                                        formdata.append("foto_absen_keluar",photo);

                                        let request = await fetch(`https://sispro-yakopi.org/endpoint/fotoAbsenPulang`,{
                                            method:"POST",
                                            body:formdata
                                        });
                                        let response = await request.json();
                                        
                                        let filename = response.result.file_name;

                                        let time = new Date();
                                        let timezone = `${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}`;
                                        

                                        let presensi = await fetch(`${endpoint}/presensi-pulang`,{
                                            method:"POST",
                                            headers:{
                                                "content-type":"application/json",
                                                "Authorization":`Bearer ${globalContext.credentials.token}`
                                            },
                                            body:JSON.stringify({
                                                filename:filename,
                                                timezone:timezone,
                                                latitude:location.coords.latitude,
                                                longitude:location.coords.longitude
                                            })
                                        });
                                        let responsepresensi = await presensi.json();

                                        if(responsepresensi.success){
                                            alert(responsepresensi.msg);
                                            setPresensiLoading(false);

                                            await fetchPresensi();
                                        }
                                        else{
                                            alert(responsepresensi.msg);
                                            setPresensiLoading(false);

                                            await fetchPresensi();
                                        }
                                    }
                                }}
                                style={{backgroundColor:"whitesmoke",justifyContent:"center",alignItems:"center",borderRadius:EStyleSheet.value("10rem"),flex:1,marginTop:EStyleSheet.value("10rem")}}>
                                    <Text>Pulang</Text>
                                </TouchableOpacity>
                            }
                        </View>
                        
                        
                    </View>
                    <View style={{height:EStyleSheet.value("40rem"),paddingBottom:EStyleSheet.value("10rem"),justifyContent:"space-evenly",paddingHorizontal:EStyleSheet.value("20rem"),flexDirection:"row",alignItems:"center"}}>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <Entypo name="time-slot" size={EStyleSheet.value("20rem")} color="white" />
                            <Text style={{color:"white",marginLeft:EStyleSheet.value("10rem")}}>Presensi : {presensi.jam_masuk_absen}</Text>
                        </View>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <Entypo name="time-slot" size={EStyleSheet.value("20rem")} color="white" />
                            <Text style={{color:"white",marginLeft:EStyleSheet.value("10rem")}}>Pulang : {presensi.jam_keluar_absen}</Text>
                        </View>
                    </View>
                </LinearGradient>
            </View>
            <View style={{marginTop:EStyleSheet.value("30rem"),flexDirection:"row",paddingHorizontal:EStyleSheet.value("15rem")}}>
                <TouchableOpacity 
                activeOpacity={0.8}
                onPress={()=>{
                    props.navigation.navigate("Restoration");
                }}
                style={{...shadow2,flex:1,backgroundColor:"#fafafa",marginRight:EStyleSheet.value("10rem")}}>
                    <View style={{backgroundColor:"#fafafa",overflow:"hidden",borderRadius:EStyleSheet.value("5rem")}}>
                        <View style={{padding:EStyleSheet.value("10rem"),zIndex:99,justifyContent:"center",alignItems:"center",height:EStyleSheet.value("140rem")}}>
                            <Text numberOfLines={2} style={{color:"white",fontSize:EStyleSheet.value("18rem"),textAlign:"center"}}>Restoration</Text>
                        </View>

                        <Image style={{position:"absolute",width:"100%",height:"100%"}} source={{uri:thumbnailRestoration[0]?.photo_restoration || null}}/>
                    
                        <LinearGradient
                        style={{position:"absolute",bottom:0,width:"100%",height:"50%"}}
                        colors={['transparent', 'rgba(0,0,0,1)']}>
                        </LinearGradient>
                    </View>
                </TouchableOpacity>
                <View style={{...shadow2,flex:1,backgroundColor:"#fafafa",marginLeft:EStyleSheet.value("10rem")}}>
                    <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={()=>{
                        props.navigation.navigate("Comdev");
                    }}
                    style={{backgroundColor:"#fafafa",overflow:"hidden",borderRadius:EStyleSheet.value("5rem")}}>
                        <View style={{padding:EStyleSheet.value("10rem"),zIndex:99,justifyContent:"center",alignItems:"center",height:EStyleSheet.value("140rem")}}>
                            <Text style={{color:"white",fontSize:EStyleSheet.value("18rem"),textAlign:"center"}}>Community Development</Text>
                        </View>

                        <Image style={{position:"absolute",width:"100%",height:"100%"}} source={{uri:thumbnailComdev[0]?.photo_comdev || null}}/>
                    
                        <LinearGradient
                        style={{position:"absolute",bottom:0,width:"100%",height:"50%"}}
                        colors={['transparent', 'rgba(0,0,0,1)']}>
                        </LinearGradient>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={{paddingHorizontal:EStyleSheet.value("15rem"),marginTop:EStyleSheet.value("30rem")}}>
                <TouchableOpacity
                activeOpacity={0.8}
                onPress={()=>{
                    props.navigation.navigate("Research");
                }}
                style={{...shadow2,backgroundColor:"#fafafa",overflow:"hidden",borderRadius:EStyleSheet.value("5rem")}}>
                    <View style={{padding:EStyleSheet.value("10rem"),zIndex:99,justifyContent:"center",alignItems:"center",height:EStyleSheet.value("140rem")}}>
                        <Text style={{color:"white",fontSize:EStyleSheet.value("40rem")}}>Research</Text>
                    </View>

                    <Image style={{position:"absolute",width:"100%",height:"100%"}} source={{uri:thumbnailResearch[0]?.photo_research || null}}/>
                
                    <LinearGradient
                    style={{position:"absolute",bottom:0,width:"100%",height:"50%"}}
                    colors={['transparent', 'rgba(0,0,0,1)']}>
                    </LinearGradient>
                </TouchableOpacity>
            </View>
            {
                <View style={{marginBottom:EStyleSheet.value("25rem"),marginTop:EStyleSheet.value("30rem")}}>
                   <View style={{paddingHorizontal:EStyleSheet.value("20rem"),flexDirection:"row",justifyContent:"space-between"}}>
                        <Text style={{fontWeight:"bold"}}>RESTORATION</Text>
                   </View>
                   <View style={{marginTop:EStyleSheet.value("20rem"),overflow:"hidden",paddingHorizontal:EStyleSheet.value("20rem")}}>
                        <Pressable
                        onPress={()=>{
                            props.navigation.navigate("ListLandAssessment");
                        }}
                        >
                            <LinearGradient 
                            colors={['#1e915a', '#1e915a', '#1e915a']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            style={{backgroundColor:"#1e915a",...shadow,overflow:"hidden",marginBottom:EStyleSheet.value("15rem"),borderRadius:EStyleSheet.value("5rem"),display:"flex",flexDirection:"row"}}>
                                <View style={{width:EStyleSheet.value("70rem"),justifyContent:"center",alignItems:"center",height:EStyleSheet.value("60rem"),backgroundColor:"#1e915a",borderTopLeftRadius:EStyleSheet.value("5rem"),borderBottomLeftRadius:EStyleSheet.value("5rem")}}>
                                <Image resizeMode="stretch" style={{width:"100%",height:"100%"}} source={{uri:"https://www.yakopi.org/wp-content/uploads/2021/05/yakopi-.png"}}/>
                                </View>
                                <View style={{flex:1,justifyContent:"center"}}>
                                    <Text style={{color:"white",marginBottom:EStyleSheet.value("2rem"),fontSize:EStyleSheet.value("10rem"),fontSize:EStyleSheet.value("15rem")}}>KT-1</Text>
                                    <Text numberOfLines={1} style={{fontWeight:"bold",color:"white",paddingRight:EStyleSheet.value("20rem"),fontSize:EStyleSheet.value("6rem")}}>SITE AND PLOT ASSESSMENT</Text>
                                </View>
                                <LinearGradient 
                                colors={['#008a48', '#008a48', '#008a48']}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                style={{width:EStyleSheet.value("80rem"),backgroundColor:"whitesmoke",justifyContent:"center",alignItems:"center",borderTopLeftRadius:EStyleSheet.value("10rem"),borderBottomLeftRadius:EStyleSheet.value("10rem")}}>
                                    <Text style={{color:"white",fontSize:EStyleSheet.value("15rem")}}>{landAssessmentCount}</Text>
                                </LinearGradient>
                            </LinearGradient>
                        </Pressable>
                   </View>

                   <View style={{marginTop:EStyleSheet.value("5rem"),overflow:"hidden",paddingHorizontal:EStyleSheet.value("20rem")}}>
                        <Pressable
                        onPress={()=>{
                            props.navigation.navigate("ListSeedCollecting");
                        }}
                        >
                            <LinearGradient 
                            colors={['#1e915a', '#1e915a', '#1e915a']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            style={{backgroundColor:"#1e915a",...shadow,overflow:"hidden",marginBottom:EStyleSheet.value("15rem"),borderRadius:EStyleSheet.value("5rem"),display:"flex",flexDirection:"row"}}>
                                <View style={{width:EStyleSheet.value("70rem"),justifyContent:"center",alignItems:"center",height:EStyleSheet.value("60rem"),backgroundColor:"#1e915a",borderTopLeftRadius:EStyleSheet.value("5rem"),borderBottomLeftRadius:EStyleSheet.value("5rem")}}>
                                <Image resizeMode="stretch" style={{width:"100%",height:"100%"}} source={{uri:"https://www.yakopi.org/wp-content/uploads/2021/05/yakopi-.png"}}/>
                                </View>
                                <View style={{flex:1,justifyContent:"center"}}>
                                    <Text style={{color:"white",marginBottom:EStyleSheet.value("2rem"),fontSize:EStyleSheet.value("10rem"),fontSize:EStyleSheet.value("15rem")}}>KT-2</Text>
                                    <Text numberOfLines={1} style={{fontWeight:"bold",color:"white",paddingRight:EStyleSheet.value("20rem"),fontSize:EStyleSheet.value("6rem")}}>PENGUMPULAN BIBIT PROPAGUL & TRANSPORTASI</Text>
                                </View>
                                <LinearGradient 
                                colors={['#008a48', '#008a48', '#008a48']}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                style={{width:EStyleSheet.value("80rem"),backgroundColor:"whitesmoke",justifyContent:"center",alignItems:"center",borderTopLeftRadius:EStyleSheet.value("10rem"),borderBottomLeftRadius:EStyleSheet.value("10rem")}}>
                                    <Text style={{color:"white",fontSize:EStyleSheet.value("15rem")}}>{seedCollectingCount}</Text>
                                </LinearGradient>
                            </LinearGradient>
                        </Pressable>
                   </View>

                   <View style={{marginTop:EStyleSheet.value("5rem"),overflow:"hidden",paddingHorizontal:EStyleSheet.value("20rem")}}>
                        <Pressable
                        onPress={()=>{
                            props.navigation.navigate("ListNurseryActivity");
                        }}
                        >
                            <LinearGradient 
                            colors={['#1e915a', '#1e915a', '#1e915a']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            style={{backgroundColor:"#1e915a",...shadow,overflow:"hidden",marginBottom:EStyleSheet.value("15rem"),borderRadius:EStyleSheet.value("5rem"),display:"flex",flexDirection:"row"}}>
                                <View style={{width:EStyleSheet.value("70rem"),justifyContent:"center",alignItems:"center",height:EStyleSheet.value("60rem"),backgroundColor:"#1e915a",borderTopLeftRadius:EStyleSheet.value("5rem"),borderBottomLeftRadius:EStyleSheet.value("5rem")}}>
                                <Image resizeMode="stretch" style={{width:"100%",height:"100%"}} source={{uri:"https://www.yakopi.org/wp-content/uploads/2021/05/yakopi-.png"}}/>
                                </View>
                                <View style={{flex:1,justifyContent:"center"}}>
                                    <Text style={{color:"white",marginBottom:EStyleSheet.value("2rem"),fontSize:EStyleSheet.value("10rem"),fontSize:EStyleSheet.value("15rem")}}>KT-3</Text>
                                    <Text numberOfLines={1} style={{fontWeight:"bold",color:"white",paddingRight:EStyleSheet.value("20rem"),fontSize:EStyleSheet.value("6rem")}}>KEGIATAN PEMBIBITAN/NURSERY</Text>
                                </View>
                                <LinearGradient 
                                colors={['#008a48', '#008a48', '#008a48']}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                style={{width:EStyleSheet.value("80rem"),backgroundColor:"whitesmoke",justifyContent:"center",alignItems:"center",borderTopLeftRadius:EStyleSheet.value("10rem"),borderBottomLeftRadius:EStyleSheet.value("10rem")}}>
                                    <Text style={{color:"white",fontSize:EStyleSheet.value("15rem")}}>{nurseryActivityCount}</Text>
                                </LinearGradient>
                            </LinearGradient>
                        </Pressable>
                   </View>

                   <View style={{marginTop:EStyleSheet.value("5rem"),overflow:"hidden",paddingHorizontal:EStyleSheet.value("20rem")}}>
                        <Pressable
                        onPress={()=>{
                            props.navigation.navigate("ListPlantingAction");
                        }}
                        >
                            <LinearGradient 
                            colors={['#1e915a', '#1e915a', '#1e915a']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            style={{backgroundColor:"#1e915a",...shadow,overflow:"hidden",marginBottom:EStyleSheet.value("15rem"),borderRadius:EStyleSheet.value("5rem"),display:"flex",flexDirection:"row"}}>
                                <View style={{width:EStyleSheet.value("70rem"),justifyContent:"center",alignItems:"center",height:EStyleSheet.value("60rem"),backgroundColor:"#1e915a",borderTopLeftRadius:EStyleSheet.value("5rem"),borderBottomLeftRadius:EStyleSheet.value("5rem")}}>
                                <Image resizeMode="stretch" style={{width:"100%",height:"100%"}} source={{uri:"https://www.yakopi.org/wp-content/uploads/2021/05/yakopi-.png"}}/>
                                </View>
                                <View style={{flex:1,justifyContent:"center"}}>
                                    <Text style={{color:"white",marginBottom:EStyleSheet.value("2rem"),fontSize:EStyleSheet.value("10rem"),fontSize:EStyleSheet.value("15rem")}}>KT-4</Text>
                                    <Text numberOfLines={1} style={{fontWeight:"bold",color:"white",paddingRight:EStyleSheet.value("20rem"),fontSize:EStyleSheet.value("6rem")}}>KEGIATAN PENANAMAN MANGROVE</Text>
                                </View>
                                <LinearGradient 
                                colors={['#008a48', '#008a48', '#008a48']}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                style={{width:EStyleSheet.value("80rem"),backgroundColor:"whitesmoke",justifyContent:"center",alignItems:"center",borderTopLeftRadius:EStyleSheet.value("10rem"),borderBottomLeftRadius:EStyleSheet.value("10rem")}}>
                                    <Text style={{color:"white",fontSize:EStyleSheet.value("15rem")}}>{plantingActionCount}</Text>
                                </LinearGradient>
                            </LinearGradient>
                        </Pressable>
                   </View>

                   <View style={{marginTop:EStyleSheet.value("5rem"),overflow:"hidden",paddingHorizontal:EStyleSheet.value("20rem")}}>
                        <Pressable
                        onPress={()=>{
                            props.navigation.navigate("ListTransport");
                        }}
                        >
                            <LinearGradient 
                            colors={['#1e915a', '#1e915a', '#1e915a']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            style={{backgroundColor:"#1e915a",...shadow,overflow:"hidden",marginBottom:EStyleSheet.value("15rem"),borderRadius:EStyleSheet.value("5rem"),display:"flex",flexDirection:"row"}}>
                                <View style={{width:EStyleSheet.value("70rem"),justifyContent:"center",alignItems:"center",height:EStyleSheet.value("60rem"),backgroundColor:"#1e915a",borderTopLeftRadius:EStyleSheet.value("5rem"),borderBottomLeftRadius:EStyleSheet.value("5rem")}}>
                                <Image resizeMode="stretch" style={{width:"100%",height:"100%"}} source={{uri:"https://www.yakopi.org/wp-content/uploads/2021/05/yakopi-.png"}}/>
                                </View>
                                <View style={{flex:1,justifyContent:"center"}}>
                                    <Text style={{color:"white",marginBottom:EStyleSheet.value("2rem"),fontSize:EStyleSheet.value("10rem"),fontSize:EStyleSheet.value("15rem")}}>KT-5</Text>
                                    <Text numberOfLines={1} style={{fontWeight:"bold",color:"white",paddingRight:EStyleSheet.value("20rem"),fontSize:EStyleSheet.value("6rem")}}>KEGIATAN PENANAMAN BIBIT & TRANSPORTASI</Text>
                                </View>
                                <LinearGradient 
                                colors={['#008a48', '#008a48', '#008a48']}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                style={{width:EStyleSheet.value("80rem"),backgroundColor:"whitesmoke",justifyContent:"center",alignItems:"center",borderTopLeftRadius:EStyleSheet.value("10rem"),borderBottomLeftRadius:EStyleSheet.value("10rem")}}>
                                    <Text style={{color:"white",fontSize:EStyleSheet.value("15rem")}}>{transportCount}</Text>
                                </LinearGradient>
                            </LinearGradient>
                        </Pressable>
                   </View>

                   <View style={{marginTop:EStyleSheet.value("5rem"),overflow:"hidden",paddingHorizontal:EStyleSheet.value("20rem")}}>
                        <Pressable
                        onPress={()=>{
                            alert("Coming Soon");
                            //props.navigation.navigate("ListPlotBoundaring");
                        }}
                        >
                            <LinearGradient 
                            colors={['#1e915a', '#1e915a', '#1e915a']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            style={{backgroundColor:"#1e915a",...shadow,overflow:"hidden",marginBottom:EStyleSheet.value("15rem"),borderRadius:EStyleSheet.value("5rem"),display:"flex",flexDirection:"row"}}>
                                <View style={{width:EStyleSheet.value("70rem"),justifyContent:"center",alignItems:"center",height:EStyleSheet.value("60rem"),backgroundColor:"#1e915a",borderTopLeftRadius:EStyleSheet.value("5rem"),borderBottomLeftRadius:EStyleSheet.value("5rem")}}>
                                <Image resizeMode="stretch" style={{width:"100%",height:"100%"}} source={{uri:"https://www.yakopi.org/wp-content/uploads/2021/05/yakopi-.png"}}/>
                                </View>
                                <View style={{flex:1,justifyContent:"center"}}>
                                    <Text style={{color:"white",marginBottom:EStyleSheet.value("2rem"),fontSize:EStyleSheet.value("10rem"),fontSize:EStyleSheet.value("15rem")}}>KT-6</Text>
                                    <Text numberOfLines={1} style={{fontWeight:"bold",color:"white",paddingRight:EStyleSheet.value("20rem"),fontSize:EStyleSheet.value("6rem")}}>MONITORING HASIL TANAM (PLOT BOUNDARING)</Text>
                                </View>
                                <LinearGradient 
                                colors={['#008a48', '#008a48', '#008a48']}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                style={{width:EStyleSheet.value("80rem"),backgroundColor:"whitesmoke",justifyContent:"center",alignItems:"center",borderTopLeftRadius:EStyleSheet.value("10rem"),borderBottomLeftRadius:EStyleSheet.value("10rem")}}>
                                    <Text style={{color:"white",fontSize:EStyleSheet.value("15rem")}}>0</Text>
                                </LinearGradient>
                            </LinearGradient>
                        </Pressable>
                   </View>

                   <View style={{marginTop:EStyleSheet.value("5rem"),overflow:"hidden",paddingHorizontal:EStyleSheet.value("20rem")}}>
                        <Pressable
                        onPress={()=>{
                            props.navigation.navigate("ListGrowth");
                        }}
                        >
                            <LinearGradient 
                            colors={['#1e915a', '#1e915a', '#1e915a']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            style={{backgroundColor:"#1e915a",...shadow,overflow:"hidden",marginBottom:EStyleSheet.value("15rem"),borderRadius:EStyleSheet.value("5rem"),display:"flex",flexDirection:"row"}}>
                                <View style={{width:EStyleSheet.value("70rem"),justifyContent:"center",alignItems:"center",height:EStyleSheet.value("60rem"),backgroundColor:"#1e915a",borderTopLeftRadius:EStyleSheet.value("5rem"),borderBottomLeftRadius:EStyleSheet.value("5rem")}}>
                                <Image resizeMode="stretch" style={{width:"100%",height:"100%"}} source={{uri:"https://www.yakopi.org/wp-content/uploads/2021/05/yakopi-.png"}}/>
                                </View>
                                <View style={{flex:1,justifyContent:"center"}}>
                                    <Text style={{color:"white",marginBottom:EStyleSheet.value("2rem"),fontSize:EStyleSheet.value("10rem"),fontSize:EStyleSheet.value("15rem")}}>KT-7</Text>
                                    <Text numberOfLines={1} style={{fontWeight:"bold",color:"white",paddingRight:EStyleSheet.value("20rem"),fontSize:EStyleSheet.value("6rem")}}>MONITORING PERTUMBUHAN TANAMAN</Text>
                                </View>
                                <LinearGradient 
                                colors={['#008a48', '#008a48', '#008a48']}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                style={{width:EStyleSheet.value("80rem"),backgroundColor:"whitesmoke",justifyContent:"center",alignItems:"center",borderTopLeftRadius:EStyleSheet.value("10rem"),borderBottomLeftRadius:EStyleSheet.value("10rem")}}>
                                    <Text style={{color:"white",fontSize:EStyleSheet.value("15rem")}}>{growthCount}</Text>
                                </LinearGradient>
                            </LinearGradient>
                        </Pressable>
                   </View>

                   <View style={{marginTop:EStyleSheet.value("5rem"),overflow:"hidden",paddingHorizontal:EStyleSheet.value("20rem")}}>
                        <Pressable
                        onPress={()=>{
                            props.navigation.navigate("ListReplanting");
                        }}
                        >
                            <LinearGradient 
                            colors={['#1e915a', '#1e915a', '#1e915a']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            style={{backgroundColor:"#1e915a",...shadow,overflow:"hidden",marginBottom:EStyleSheet.value("15rem"),borderRadius:EStyleSheet.value("5rem"),display:"flex",flexDirection:"row"}}>
                                <View style={{width:EStyleSheet.value("70rem"),justifyContent:"center",alignItems:"center",height:EStyleSheet.value("60rem"),backgroundColor:"#1e915a",borderTopLeftRadius:EStyleSheet.value("5rem"),borderBottomLeftRadius:EStyleSheet.value("5rem")}}>
                                <Image resizeMode="stretch" style={{width:"100%",height:"100%"}} source={{uri:"https://www.yakopi.org/wp-content/uploads/2021/05/yakopi-.png"}}/>
                                </View>
                                <View style={{flex:1,justifyContent:"center"}}>
                                    <Text style={{color:"white",marginBottom:EStyleSheet.value("2rem"),fontSize:EStyleSheet.value("10rem"),fontSize:EStyleSheet.value("15rem")}}>KT-8</Text>
                                    <Text numberOfLines={1} style={{fontWeight:"bold",color:"white",paddingRight:EStyleSheet.value("20rem"),fontSize:EStyleSheet.value("6rem")}}>KEGIATAN PENYISIPAN/REPLANTING</Text>
                                </View>
                                <LinearGradient 
                                colors={['#008a48', '#008a48', '#008a48']}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                style={{width:EStyleSheet.value("80rem"),backgroundColor:"whitesmoke",justifyContent:"center",alignItems:"center",borderTopLeftRadius:EStyleSheet.value("10rem"),borderBottomLeftRadius:EStyleSheet.value("10rem")}}>
                                    <Text style={{color:"white",fontSize:EStyleSheet.value("15rem")}}>{replantingCount}</Text>
                                </LinearGradient>
                            </LinearGradient>
                        </Pressable>
                   </View>

                   <View style={{marginTop:EStyleSheet.value("5rem"),overflow:"hidden",paddingHorizontal:EStyleSheet.value("20rem")}}>
                        <Pressable
                        onPress={()=>{
                            props.navigation.navigate("ListSubtitutePlot");
                        }}
                        >
                            <LinearGradient 
                            colors={['#1e915a', '#1e915a', '#1e915a']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            style={{backgroundColor:"#1e915a",...shadow,overflow:"hidden",marginBottom:EStyleSheet.value("15rem"),borderRadius:EStyleSheet.value("5rem"),display:"flex",flexDirection:"row"}}>
                                <View style={{width:EStyleSheet.value("70rem"),justifyContent:"center",alignItems:"center",height:EStyleSheet.value("60rem"),backgroundColor:"#1e915a",borderTopLeftRadius:EStyleSheet.value("5rem"),borderBottomLeftRadius:EStyleSheet.value("5rem")}}>
                                <Image resizeMode="stretch" style={{width:"100%",height:"100%"}} source={{uri:"https://www.yakopi.org/wp-content/uploads/2021/05/yakopi-.png"}}/>
                                </View>
                                <View style={{flex:1,justifyContent:"center"}}>
                                    <Text style={{color:"white",marginBottom:EStyleSheet.value("2rem"),fontSize:EStyleSheet.value("10rem"),fontSize:EStyleSheet.value("15rem")}}>KT-9</Text>
                                    <Text numberOfLines={1} style={{fontWeight:"bold",color:"white",paddingRight:EStyleSheet.value("20rem"),fontSize:EStyleSheet.value("6rem")}}>PENCARIAN PLOT PENGGANTI</Text>
                                </View>
                                <LinearGradient 
                                colors={['#008a48', '#008a48', '#008a48']}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                style={{width:EStyleSheet.value("80rem"),backgroundColor:"whitesmoke",justifyContent:"center",alignItems:"center",borderTopLeftRadius:EStyleSheet.value("10rem"),borderBottomLeftRadius:EStyleSheet.value("10rem")}}>
                                    <Text style={{color:"white",fontSize:EStyleSheet.value("15rem")}}>{subtitutePlotCount}</Text>
                                </LinearGradient>
                            </LinearGradient>
                        </Pressable>
                   </View>

                   <View style={{marginTop:EStyleSheet.value("5rem"),overflow:"hidden",paddingHorizontal:EStyleSheet.value("20rem")}}>
                        <Pressable
                        onPress={()=>{
                            props.navigation.navigate("ListReplacementPlot");
                        }}
                        >
                            <LinearGradient 
                            colors={['#1e915a', '#1e915a', '#1e915a']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            style={{backgroundColor:"#1e915a",...shadow,overflow:"hidden",marginBottom:EStyleSheet.value("15rem"),borderRadius:EStyleSheet.value("5rem"),display:"flex",flexDirection:"row"}}>
                                <View style={{width:EStyleSheet.value("70rem"),justifyContent:"center",alignItems:"center",height:EStyleSheet.value("60rem"),backgroundColor:"#1e915a",borderTopLeftRadius:EStyleSheet.value("5rem"),borderBottomLeftRadius:EStyleSheet.value("5rem")}}>
                                <Image resizeMode="stretch" style={{width:"100%",height:"100%"}} source={{uri:"https://www.yakopi.org/wp-content/uploads/2021/05/yakopi-.png"}}/>
                                </View>
                                <View style={{flex:1,justifyContent:"center"}}>
                                    <Text style={{color:"white",marginBottom:EStyleSheet.value("2rem"),fontSize:EStyleSheet.value("10rem"),fontSize:EStyleSheet.value("15rem")}}>KT-10</Text>
                                    <Text numberOfLines={1} style={{fontWeight:"bold",color:"white",paddingRight:EStyleSheet.value("20rem"),fontSize:EStyleSheet.value("6rem")}}>PENGGANTIAN PLOT YANG HILANG/RUSAK</Text>
                                </View>
                                <LinearGradient 
                                colors={['#008a48', '#008a48', '#008a48']}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                style={{width:EStyleSheet.value("80rem"),backgroundColor:"whitesmoke",justifyContent:"center",alignItems:"center",borderTopLeftRadius:EStyleSheet.value("10rem"),borderBottomLeftRadius:EStyleSheet.value("10rem")}}>
                                    <Text style={{color:"white",fontSize:EStyleSheet.value("15rem")}}>{replacementPlotCount}</Text>
                                </LinearGradient>
                            </LinearGradient>
                        </Pressable>
                   </View>

                   
                   <View style={{marginBottom:EStyleSheet.value("25rem"),marginTop:EStyleSheet.value("30rem")}}>
                    <View style={{paddingHorizontal:EStyleSheet.value("20rem"),flexDirection:"row",justifyContent:"space-between"}}>
                        <Text style={{fontWeight:"bold"}}>COMMUNITY DEVELOPMENT</Text>
                    </View>
                    <View style={{marginTop:EStyleSheet.value("20rem"),overflow:"hidden",paddingHorizontal:EStyleSheet.value("20rem")}}>
                        <Pressable
                        onPress={()=>{
                            props.navigation.navigate("ListCommunityRegister");
                        }}
                        >
                            <LinearGradient 
                            colors={['#1e915a', '#1e915a', '#1e915a']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            style={{backgroundColor:"#1e915a",...shadow,overflow:"hidden",marginBottom:EStyleSheet.value("15rem"),borderRadius:EStyleSheet.value("5rem"),display:"flex",flexDirection:"row"}}>
                                <View style={{width:EStyleSheet.value("70rem"),justifyContent:"center",alignItems:"center",height:EStyleSheet.value("60rem"),backgroundColor:"#1e915a",borderTopLeftRadius:EStyleSheet.value("5rem"),borderBottomLeftRadius:EStyleSheet.value("5rem")}}>
                                <Image resizeMode="stretch" style={{width:"100%",height:"100%"}} source={{uri:"https://www.yakopi.org/wp-content/uploads/2021/05/yakopi-.png"}}/>
                                </View>
                                <View style={{flex:1,justifyContent:"center"}}>
                                    <Text numberOfLines={1} style={{fontWeight:"bold",color:"white",paddingRight:EStyleSheet.value("20rem"),fontSize:EStyleSheet.value("12rem")}}>COMMUNITY REGISTER</Text>
                                </View>
                                <LinearGradient 
                                colors={['#008a48', '#008a48', '#008a48']}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                style={{width:EStyleSheet.value("80rem"),backgroundColor:"whitesmoke",justifyContent:"center",alignItems:"center",borderTopLeftRadius:EStyleSheet.value("10rem"),borderBottomLeftRadius:EStyleSheet.value("10rem")}}>
                                    <Text style={{color:"white",fontSize:EStyleSheet.value("15rem")}}>{landAssessmentCount}</Text>
                                </LinearGradient>
                            </LinearGradient>
                        </Pressable>
                    </View>

                    <View style={{marginTop:EStyleSheet.value("5rem"),overflow:"hidden",paddingHorizontal:EStyleSheet.value("20rem")}}>
                        <Pressable
                        onPress={()=>{
                            props.navigation.navigate("ListSilvoshery");
                        }}
                        >
                            <LinearGradient 
                            colors={['#1e915a', '#1e915a', '#1e915a']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            style={{backgroundColor:"#1e915a",...shadow,overflow:"hidden",marginBottom:EStyleSheet.value("15rem"),borderRadius:EStyleSheet.value("5rem"),display:"flex",flexDirection:"row"}}>
                                <View style={{width:EStyleSheet.value("70rem"),justifyContent:"center",alignItems:"center",height:EStyleSheet.value("60rem"),backgroundColor:"#1e915a",borderTopLeftRadius:EStyleSheet.value("5rem"),borderBottomLeftRadius:EStyleSheet.value("5rem")}}>
                                <Image resizeMode="stretch" style={{width:"100%",height:"100%"}} source={{uri:"https://www.yakopi.org/wp-content/uploads/2021/05/yakopi-.png"}}/>
                                </View>
                                <View style={{flex:1,justifyContent:"center"}}>
                                    <Text numberOfLines={1} style={{fontWeight:"bold",color:"white",paddingRight:EStyleSheet.value("20rem"),fontSize:EStyleSheet.value("12rem")}}>SILVOSHERY</Text>
                                </View>
                                <LinearGradient 
                                colors={['#008a48', '#008a48', '#008a48']}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                style={{width:EStyleSheet.value("80rem"),backgroundColor:"whitesmoke",justifyContent:"center",alignItems:"center",borderTopLeftRadius:EStyleSheet.value("10rem"),borderBottomLeftRadius:EStyleSheet.value("10rem")}}>
                                    <Text style={{color:"white",fontSize:EStyleSheet.value("15rem")}}>{silvosheryCount}</Text>
                                </LinearGradient>
                            </LinearGradient>
                        </Pressable>
                    </View>

                    </View>

                    <View style={{marginBottom:EStyleSheet.value("25rem"),marginTop:EStyleSheet.value("10rem")}}>
                    <View style={{paddingHorizontal:EStyleSheet.value("20rem"),flexDirection:"row",justifyContent:"space-between"}}>
                        <Text style={{fontWeight:"bold"}}>RESEARCH</Text>
                    </View>
                    <View style={{marginTop:EStyleSheet.value("20rem"),overflow:"hidden",paddingHorizontal:EStyleSheet.value("20rem")}}>
                        <Pressable
                        onPress={()=>{
                            props.navigation.navigate("ListGrowthResearch");
                        }}
                        >
                            <LinearGradient 
                            colors={['#1e915a', '#1e915a', '#1e915a']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            style={{backgroundColor:"#1e915a",...shadow,overflow:"hidden",marginBottom:EStyleSheet.value("15rem"),borderRadius:EStyleSheet.value("5rem"),display:"flex",flexDirection:"row"}}>
                                <View style={{width:EStyleSheet.value("70rem"),justifyContent:"center",alignItems:"center",height:EStyleSheet.value("60rem"),backgroundColor:"#1e915a",borderTopLeftRadius:EStyleSheet.value("5rem"),borderBottomLeftRadius:EStyleSheet.value("5rem")}}>
                                <Image resizeMode="stretch" style={{width:"100%",height:"100%"}} source={{uri:"https://www.yakopi.org/wp-content/uploads/2021/05/yakopi-.png"}}/>
                                </View>
                                <View style={{flex:1,justifyContent:"center"}}>
                                    <Text style={{color:"white",marginBottom:EStyleSheet.value("2rem"),fontSize:EStyleSheet.value("10rem"),fontSize:EStyleSheet.value("15rem")}}>KT-12</Text>
                                    <Text numberOfLines={1} style={{fontWeight:"bold",color:"white",paddingRight:EStyleSheet.value("20rem"),fontSize:EStyleSheet.value("6rem")}}>MONITORING PERTUMBUHAN TANAMAN PLOT RISET</Text>
                                </View>
                                <LinearGradient 
                                colors={['#008a48', '#008a48', '#008a48']}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                style={{width:EStyleSheet.value("80rem"),backgroundColor:"whitesmoke",justifyContent:"center",alignItems:"center",borderTopLeftRadius:EStyleSheet.value("10rem"),borderBottomLeftRadius:EStyleSheet.value("10rem")}}>
                                    <Text style={{color:"white",fontSize:EStyleSheet.value("15rem")}}>{growthResearchCount}</Text>
                                </LinearGradient>
                            </LinearGradient>
                        </Pressable>
                   </View>

                   <View style={{marginTop:EStyleSheet.value("5rem"),overflow:"hidden",paddingHorizontal:EStyleSheet.value("20rem")}}>
                        <Pressable
                        onPress={()=>{
                            props.navigation.navigate("ListDiversityFauna");
                        }}
                        >
                            <LinearGradient 
                            colors={['#1e915a', '#1e915a', '#1e915a']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            style={{backgroundColor:"#1e915a",...shadow,overflow:"hidden",marginBottom:EStyleSheet.value("15rem"),borderRadius:EStyleSheet.value("5rem"),display:"flex",flexDirection:"row"}}>
                                <View style={{width:EStyleSheet.value("70rem"),justifyContent:"center",alignItems:"center",height:EStyleSheet.value("60rem"),backgroundColor:"#1e915a",borderTopLeftRadius:EStyleSheet.value("5rem"),borderBottomLeftRadius:EStyleSheet.value("5rem")}}>
                                <Image resizeMode="stretch" style={{width:"100%",height:"100%"}} source={{uri:"https://www.yakopi.org/wp-content/uploads/2021/05/yakopi-.png"}}/>
                                </View>
                                <View style={{flex:1,justifyContent:"center"}}>
                                    <Text style={{color:"white",marginBottom:EStyleSheet.value("2rem"),fontSize:EStyleSheet.value("10rem"),fontSize:EStyleSheet.value("15rem")}}>KT-13</Text>
                                    <Text numberOfLines={1} style={{fontWeight:"bold",color:"white",paddingRight:EStyleSheet.value("20rem"),fontSize:EStyleSheet.value("6rem")}}>MONITORING KEANEKARAGAMAN FAUNA</Text>
                                </View>
                                <LinearGradient 
                                colors={['#008a48', '#008a48', '#008a48']}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                style={{width:EStyleSheet.value("80rem"),backgroundColor:"whitesmoke",justifyContent:"center",alignItems:"center",borderTopLeftRadius:EStyleSheet.value("10rem"),borderBottomLeftRadius:EStyleSheet.value("10rem")}}>
                                    <Text style={{color:"white",fontSize:EStyleSheet.value("15rem")}}>{diversityFaunaCount}</Text>
                                </LinearGradient>
                            </LinearGradient>
                        </Pressable>
                   </View>

                   <View style={{marginTop:EStyleSheet.value("5rem"),overflow:"hidden",paddingHorizontal:EStyleSheet.value("20rem")}}>
                        <Pressable
                        onPress={()=>{
                            props.navigation.navigate("ListDiversityFlora");
                        }}
                        >
                            <LinearGradient 
                            colors={['#1e915a', '#1e915a', '#1e915a']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            style={{backgroundColor:"#1e915a",...shadow,overflow:"hidden",marginBottom:EStyleSheet.value("15rem"),borderRadius:EStyleSheet.value("5rem"),display:"flex",flexDirection:"row"}}>
                                <View style={{width:EStyleSheet.value("70rem"),justifyContent:"center",alignItems:"center",height:EStyleSheet.value("60rem"),backgroundColor:"#1e915a",borderTopLeftRadius:EStyleSheet.value("5rem"),borderBottomLeftRadius:EStyleSheet.value("5rem")}}>
                                <Image resizeMode="stretch" style={{width:"100%",height:"100%"}} source={{uri:"https://www.yakopi.org/wp-content/uploads/2021/05/yakopi-.png"}}/>
                                </View>
                                <View style={{flex:1,justifyContent:"center"}}>
                                    <Text style={{color:"white",marginBottom:EStyleSheet.value("2rem"),fontSize:EStyleSheet.value("10rem"),fontSize:EStyleSheet.value("15rem")}}>KT-14</Text>
                                    <Text numberOfLines={1} style={{fontWeight:"bold",color:"white",paddingRight:EStyleSheet.value("20rem"),fontSize:EStyleSheet.value("6rem")}}>MONITORING KEANEKARAGAMAN FLORA</Text>
                                </View>
                                <LinearGradient 
                                colors={['#008a48', '#008a48', '#008a48']}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                style={{width:EStyleSheet.value("80rem"),backgroundColor:"whitesmoke",justifyContent:"center",alignItems:"center",borderTopLeftRadius:EStyleSheet.value("10rem"),borderBottomLeftRadius:EStyleSheet.value("10rem")}}>
                                    <Text style={{color:"white",fontSize:EStyleSheet.value("15rem")}}>{diversityFloraCount}</Text>
                                </LinearGradient>
                            </LinearGradient>
                        </Pressable>
                   </View>

                   <View style={{marginTop:EStyleSheet.value("5rem"),overflow:"hidden",paddingHorizontal:EStyleSheet.value("20rem")}}>
                        <Pressable
                        onPress={()=>{
                            props.navigation.navigate("ListHama");
                        }}
                        >
                            <LinearGradient 
                            colors={['#1e915a', '#1e915a', '#1e915a']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            style={{backgroundColor:"#1e915a",...shadow,overflow:"hidden",marginBottom:EStyleSheet.value("15rem"),borderRadius:EStyleSheet.value("5rem"),display:"flex",flexDirection:"row"}}>
                                <View style={{width:EStyleSheet.value("70rem"),justifyContent:"center",alignItems:"center",height:EStyleSheet.value("60rem"),backgroundColor:"#1e915a",borderTopLeftRadius:EStyleSheet.value("5rem"),borderBottomLeftRadius:EStyleSheet.value("5rem")}}>
                                <Image resizeMode="stretch" style={{width:"100%",height:"100%"}} source={{uri:"https://www.yakopi.org/wp-content/uploads/2021/05/yakopi-.png"}}/>
                                </View>
                                <View style={{flex:1,justifyContent:"center"}}>
                                    <Text style={{color:"white",marginBottom:EStyleSheet.value("2rem"),fontSize:EStyleSheet.value("10rem"),fontSize:EStyleSheet.value("15rem")}}>KT-15</Text>
                                    <Text numberOfLines={1} style={{fontWeight:"bold",color:"white",paddingRight:EStyleSheet.value("20rem"),fontSize:EStyleSheet.value("6rem")}}>MONITORING HAMA TANAMAN</Text>
                                </View>
                                <LinearGradient 
                                colors={['#008a48', '#008a48', '#008a48']}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                style={{width:EStyleSheet.value("80rem"),backgroundColor:"whitesmoke",justifyContent:"center",alignItems:"center",borderTopLeftRadius:EStyleSheet.value("10rem"),borderBottomLeftRadius:EStyleSheet.value("10rem")}}>
                                    <Text style={{color:"white",fontSize:EStyleSheet.value("15rem")}}>{hamaCount}</Text>
                                </LinearGradient>
                            </LinearGradient>
                        </Pressable>
                   </View>

                   <View style={{marginTop:EStyleSheet.value("5rem"),overflow:"hidden",paddingHorizontal:EStyleSheet.value("20rem")}}>
                        <Pressable
                        onPress={()=>{
                            props.navigation.navigate("ListFiskim");
                        }}
                        >
                            <LinearGradient 
                            colors={['#1e915a', '#1e915a', '#1e915a']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            style={{backgroundColor:"#1e915a",...shadow,overflow:"hidden",marginBottom:EStyleSheet.value("15rem"),borderRadius:EStyleSheet.value("5rem"),display:"flex",flexDirection:"row"}}>
                                <View style={{width:EStyleSheet.value("70rem"),justifyContent:"center",alignItems:"center",height:EStyleSheet.value("60rem"),backgroundColor:"#1e915a",borderTopLeftRadius:EStyleSheet.value("5rem"),borderBottomLeftRadius:EStyleSheet.value("5rem")}}>
                                <Image resizeMode="stretch" style={{width:"100%",height:"100%"}} source={{uri:"https://www.yakopi.org/wp-content/uploads/2021/05/yakopi-.png"}}/>
                                </View>
                                <View style={{flex:1,justifyContent:"center"}}>
                                    <Text style={{color:"white",marginBottom:EStyleSheet.value("2rem"),fontSize:EStyleSheet.value("10rem"),fontSize:EStyleSheet.value("15rem")}}>KT-16</Text>
                                    <Text numberOfLines={1} style={{fontWeight:"bold",color:"white",paddingRight:EStyleSheet.value("20rem"),fontSize:EStyleSheet.value("6rem")}}>PARAMETER FISIKA KIMIA</Text>
                                </View>
                                <LinearGradient 
                                colors={['#008a48', '#008a48', '#008a48']}
                                start={{ x: 0, y: 1 }}
                                end={{ x: 1, y: 1 }}
                                style={{width:EStyleSheet.value("80rem"),backgroundColor:"whitesmoke",justifyContent:"center",alignItems:"center",borderTopLeftRadius:EStyleSheet.value("10rem"),borderBottomLeftRadius:EStyleSheet.value("10rem")}}>
                                    <Text style={{color:"white",fontSize:EStyleSheet.value("15rem")}}>{fiskimCount}</Text>
                                </LinearGradient>
                            </LinearGradient>
                        </Pressable>
                   </View>

                    </View>
               </View>

                
            }
            
        </ScrollView>

        <View style={{...shadow,position:"absolute",height:EStyleSheet.value("50rem"),backgroundColor:"white",alignItems:"center",width:"100%",flexDirection:"row",justifyContent:"space-between",bottom:0,paddingHorizontal:EStyleSheet.value("20rem")}}>
           <TouchableOpacity
              activeOpacity={0.8}  
                onPress={()=>{
                    props.navigation.navigate("Profil");
                }}>
                    <Feather name="user" size={24} color="black" />
            </TouchableOpacity>
            <View style={{position:"absolute",bottom:EStyleSheet.value("20rem"),right:(Dimensions.get("screen").width/2)-EStyleSheet.value("30rem")}}>
                <TouchableOpacity
                activeOpacity={0.8}
                style = {{...shadow2,overflow:"hidden",justifyContent:"center",alignItems:"center",backgroundColor:"white",borderRadius:999,width:EStyleSheet.value("60rem"),height:EStyleSheet.value("60rem")}}
                onPress={()=>{
                    props.navigation.navigate("Home");
                }}>
                    <Image resizeMode="stretch" style={{width:"50%",height:"70%"}} source={{uri:"https://devjobsindo.org/wp-content/uploads/2022/02/WhatsApp-Image-2022-02-25-at-5.14.01-PM-200x287.jpeg"}}/>
                </TouchableOpacity>
            </View>
            <TouchableOpacity
            activeOpacity={0.6}
            onPress={async ()=>{
                await AsyncStorage.removeItem("credentials");
                globalContext.setCredentials(null);
            }}
            >
                <MaterialCommunityIcons name="logout" size={24} color="black" />
            </TouchableOpacity>
        </View>
     </View>
  );
}


