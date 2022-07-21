import React, {useState, useContext, useEffect} from 'react';
import { StyleSheet, AsyncStorage, ScrollView, ActivityIndicator, TouchableOpacity, Text, View, Dimensions, Image,Pressable, ViewPagerAndroidComponent } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import SelectDropdown from 'react-native-select-dropdown'
import { StatusBarHeight } from '../utils/HeightUtils';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';
import Svg, { Path, Circle, Line } from "react-native-svg"
import { useIsFocused } from '@react-navigation/native';

import { Entypo, Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 

import {GlobalContext} from '../App';
import { endpoint } from '../utils/endpoint';

import * as Location from 'expo-location';

import { CommonActions } from '@react-navigation/native';
import Placeholder from '../components/Placeholder';
import { removeUsername } from '../utils/utils';


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

  const[summaryAreaLandAssessment, setSummaryAreaLandAssessment] = useState([]);

  const [landAssessmentSum, setLandAssessmentSum] = useState([]);
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

  const [seedSum , setSeedSum] = useState([]);
  const [desaCount, setDesaCount] = useState([]);
  const [pekerjaCount, setPekerjaCount] = useState([]);
  const [priaCount, setPriaCount] = useState([]);
  const [wanitaCount, setWanitaCount] = useState([]);
  const [seedPlantingCount, setSeedPlantingCount] = useState([]);
  const [desaPlantingCount, setDesaPlantingCount] = useState([]);
  const [pekerjaPlantingCount, setPekerjaPlantingCount] = useState([]);
  const [priaPlantingCount, setPriaPlantingCount] = useState([]);
  const [wanitaPlantingCount, setWanitaPlantingCount] = useState([]);

  let focused = useIsFocused();

  const [presensi,setPresensi] = useState({
      jam_masuk_absen:null,
      jam_keluar_absen:null
  });

  

  const [projectLoading, setProjectLoading] = useState([]);
  const [project, setProject] = useState([]);


  const [presensiLoading, setPresensiLoading] = useState(true);
  const [countDataLoading, setCountDataLoading] = useState(true);
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

  
  async function fetchCountData(id) {



            var payload = {
                nama_project: id
            };
        

        let sumLandAssessment = async () => {
            let request = await fetch(`${endpoint}/sum-area-land-assessment`, {
                method: "GET",
                headers: {
                    "authorization": `Bearer ${globalContext.credentials.token}`
                }
            });
            let response = await request.json();
            return response.data;
        };

        let sumSeed = async () => {
            let request = await fetch(`${endpoint}/total-seed`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${globalContext.credentials.token}`
                }, body: JSON.stringify(payload)
            });
            let response = await request.json();
            return response.data;
        };

        let countDesa = async () => {
            let request = await fetch(`${endpoint}/total-desa`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${globalContext.credentials.token}`
                }, body: JSON.stringify(payload)
            });
            let response = await request.json();
            return response.data;
        };

        let countPekerja = async () => {
            let request = await fetch(`${endpoint}/total-involved`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${globalContext.credentials.token}`
                }, body: JSON.stringify(payload)
            });
            let response = await request.json();
            return response.data;
        };

        let countPria = async () => {
            let request = await fetch(`${endpoint}/total-male`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${globalContext.credentials.token}`
                }, body: JSON.stringify(payload)
            });
            let response = await request.json();
            return response.data;
        };

        let countWanita = async () => {
            let request = await fetch(`${endpoint}/total-female`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${globalContext.credentials.token}`
                }, body: JSON.stringify(payload)
            });
            let response = await request.json();
            return response.data;
        };

        let countSeedPlanting = async () => {
            let request = await fetch(`${endpoint}/total-seed-planting`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${globalContext.credentials.token}`
                }, body: JSON.stringify(payload)
            });
            let response = await request.json();
            return response.data;
        };

        let countDesaPlanting = async () => {
            let request = await fetch(`${endpoint}/total-desa-planting`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${globalContext.credentials.token}`
                }, body: JSON.stringify(payload)
            });
            let response = await request.json();
            return response.data;
        };

        let countPekerjaPlanting = async () => {
            let request = await fetch(`${endpoint}/total-involved-planting`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${globalContext.credentials.token}`
                }, body: JSON.stringify(payload)
            });
            let response = await request.json();
            return response.data;
        };

        let countPriaPlanting = async () => {
            let request = await fetch(`${endpoint}/total-male-planting`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${globalContext.credentials.token}`
                }, body: JSON.stringify(payload)
            });
            let response = await request.json();
            return response.data;
        };

        let countWanitaPlanting = async () => {
            let request = await fetch(`${endpoint}/total-female-planting`, {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                    "authorization": `Bearer ${globalContext.credentials.token}`
                }, body: JSON.stringify(payload)
            });
            let response = await request.json();
            return response.data;
        };

        let [landAssessmentSum, seedSum, desaCount, pekerjaCount, priaCount, wanitaCount, seedPlantingCount, desaPlantingCount, pekerjaPlantingCount, priaPlantingCount, wanitaPlantingCount] = await Promise.all([
            sumLandAssessment(),
            sumSeed(),
            countDesa(),
            countPekerja(),
            countPria(),
            countWanita(),
            countSeedPlanting(),
            countDesaPlanting(),
            countPekerjaPlanting(),
            countPriaPlanting(),
            countWanitaPlanting()
        ]);
        setLandAssessmentSum(landAssessmentSum);
        setSeedSum(seedSum);
        setDesaCount(desaCount);
        setPekerjaCount(pekerjaCount);
        setPriaCount(priaCount);
        setWanitaCount(wanitaCount);
        setSeedPlantingCount(seedPlantingCount);
        setDesaPlantingCount(desaPlantingCount);
        setPekerjaPlantingCount(pekerjaPlantingCount);
        setPriaPlantingCount(priaPlantingCount);
        setWanitaPlantingCount(wanitaPlantingCount);
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

  const fetchProject = async()=>{
    setProjectLoading(true);
    let request = await fetch(`${endpoint}/donor`,{
        method:"GET",
        headers:{
            "authorization":`Bearer ${globalContext.credentials.token}`
        }
    });
    let response = await request.json();
    setProjectLoading(false);
    setProject(response.data);
    }

    useEffect(()=>{
        fetchProject();
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
                        (globalContext.credentials.data.hak_akses !== "member") &&
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
                                (globalContext.credentials.data.hak_akses !== "donor") &&
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
                                (globalContext.credentials.data.hak_akses == "member") &&
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
                    {
                        (globalContext.credentials.data.hak_akses !== "donor") &&
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
                    }
                   
                </LinearGradient>
            </View>
            {
                (globalContext.credentials.data.hak_akses !== "donor") &&
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
            }
            {
                (globalContext.credentials.data.hak_akses !== "donor") &&
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
            }
            {
                (globalContext.credentials.data.hak_akses === "superuser") &&
                <View style={{marginBottom:EStyleSheet.value("25rem"),marginTop:EStyleSheet.value("30rem")}}>
                    <View style={{paddingHorizontal:EStyleSheet.value("20rem"),flexDirection:"row",justifyContent:"space-between"}}>
                        <Text style={{fontWeight:"bold"}}>DONOR</Text>
                    </View>
                     <View style={{paddingHorizontal:EStyleSheet.value("20rem"),paddingVertical:EStyleSheet.value("10rem")}}>
                        <View style={{overflow:"hidden",borderRadius:EStyleSheet.value("5rem"),marginBottom:EStyleSheet.value("20rem"),justifyContent:"center",alignItems:"center"}}>
                            <SelectDropdown 
                                style={{width:EStyleSheet.value("200rem"),height:EStyleSheet.value("50rem"),fontSize:EStyleSheet.value("12rem")}}
                                onSelect={(selectedItem, index) => {
                                    // Load data from from fetchCountData using projectId
                                    fetchCountData(selectedItem);

                                }}
                                data={
                                    [
                                        "Semua",
                                        ...project
                                    ]
                                }
                            />
                        </View>
                    </View>
                   <View style={{paddingHorizontal:EStyleSheet.value("20rem"),flexDirection:"row",justifyContent:"space-between"}}>
                        <Text style={{fontWeight:"bold"}}>SUMMARY</Text>
                   </View>
                     <View style={{paddingHorizontal:EStyleSheet.value("20rem"),paddingVertical:EStyleSheet.value("10rem")}}>
                     <View style={{paddingHorizontal:EStyleSheet.value("20rem"),paddingVertical:EStyleSheet.value("10rem"),backgroundColor:"#fafafa",overflow:"hidden",borderRadius:EStyleSheet.value("5rem"),marginBottom:EStyleSheet.value("20rem"),marginTop:EStyleSheet.value("10rem")}}>
                                <View style={{padding:EStyleSheet.value("10rem"),zIndex:99,justifyContent:"center",alignItems:"center",height:EStyleSheet.value("100rem")}}>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("12rem"),textAlign:"center"}}>Area of Land Assessment</Text>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("15rem"),textAlign:"center"}}>{landAssessmentSum} Ha</Text>
                                </View>
                                </View>
                        <Text style={{fontWeight:"bold"}}>SEED</Text>    
                        <View style={{paddingHorizontal:EStyleSheet.value("20rem"),paddingVertical:EStyleSheet.value("10rem"),backgroundColor:"#fafafa",overflow:"hidden",borderRadius:EStyleSheet.value("5rem"),marginBottom:EStyleSheet.value("20rem"),marginTop:EStyleSheet.value("10rem")}}>
                                <View style={{padding:EStyleSheet.value("20rem"),zIndex:99,justifyContent:"center",alignItems:"center",height:EStyleSheet.value("100rem")}}>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("12rem"),textAlign:"center"}}>Number of Villages</Text>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("15rem"),textAlign:"center"}}>{desaCount} Villages</Text>
                                </View>
                        </View>
                        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:EStyleSheet.value("10rem")}}>
                            <View
                            style={{...shadow2,backgroundColor:"#fafafa",overflow:"hidden",borderRadius:EStyleSheet.value("5rem"),marginBottom:EStyleSheet.value("20rem"),width:EStyleSheet.value("150rem")}}>
                                <View style={{padding:EStyleSheet.value("20rem"),zIndex:99,justifyContent:"center",alignItems:"center",height:EStyleSheet.value("100rem")}}>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("12rem"),textAlign:"center"}}>Number of Seeds</Text>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("15rem"),textAlign:"center"}}>{seedSum} Seeds</Text>
                                </View>
                            </View>
                            <View
                            style={{...shadow2,backgroundColor:"#fafafa",overflow:"hidden",borderRadius:EStyleSheet.value("5rem"),marginBottom:EStyleSheet.value("20rem"),width:EStyleSheet.value("150rem")}}>
                                <View style={{padding:EStyleSheet.value("20rem"),zIndex:99,justifyContent:"center",alignItems:"center",height:EStyleSheet.value("100rem")}}>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("12rem"),textAlign:"center"}}>Total Involved</Text>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("15rem"),textAlign:"center"}}>{pekerjaCount} People</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:EStyleSheet.value("10rem")}}>
                            <View
                            style={{...shadow2,backgroundColor:"#fafafa",overflow:"hidden",borderRadius:EStyleSheet.value("5rem"),marginBottom:EStyleSheet.value("20rem"),width:EStyleSheet.value("150rem")}}>
                                <View style={{padding:EStyleSheet.value("20rem"),zIndex:99,justifyContent:"center",alignItems:"center",height:EStyleSheet.value("100rem")}}>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("12rem"),textAlign:"center"}}>Total Male</Text>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("15rem"),textAlign:"center"}}>{priaCount} People</Text>
                                </View>
                            </View>
                            <View
                            style={{...shadow2,backgroundColor:"#fafafa",overflow:"hidden",borderRadius:EStyleSheet.value("5rem"),marginBottom:EStyleSheet.value("20rem"),width:EStyleSheet.value("150rem")}}>
                                <View style={{padding:EStyleSheet.value("20rem"),zIndex:99,justifyContent:"center",alignItems:"center",height:EStyleSheet.value("100rem")}}>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("12rem"),textAlign:"center"}}>Total Female</Text>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("15rem"),textAlign:"center"}}>{wanitaCount} People</Text>
                                </View>
                            </View>
                        </View>

                        <Text style={{fontWeight:"bold"}}>PLANTING</Text>    
                        <View
                            style={{...shadow2,backgroundColor:"#fafafa",overflow:"hidden",borderRadius:EStyleSheet.value("5rem"),marginBottom:EStyleSheet.value("20rem"),marginTop:EStyleSheet.value("10rem")}}>
                                <View style={{padding:EStyleSheet.value("20rem"),zIndex:99,justifyContent:"center",alignItems:"center",height:EStyleSheet.value("100rem")}}>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("12rem"),textAlign:"center"}}>Number of Villages</Text>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("15rem"),textAlign:"center"}}>{desaPlantingCount} Villages</Text>
                                </View>
                            </View>
                        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:EStyleSheet.value("10rem")}}>
                            <View
                            style={{...shadow2,backgroundColor:"#fafafa",overflow:"hidden",borderRadius:EStyleSheet.value("5rem"),marginBottom:EStyleSheet.value("20rem"),width:EStyleSheet.value("150rem")}}>
                                <View style={{padding:EStyleSheet.value("20rem"),zIndex:99,justifyContent:"center",alignItems:"center",height:EStyleSheet.value("100rem")}}>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("12rem"),textAlign:"center"}}>Number of Seeds</Text>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("15rem"),textAlign:"center"}}>{seedPlantingCount} Seeds</Text>
                                </View>
                            </View>
                            <View
                            style={{...shadow2,backgroundColor:"#fafafa",overflow:"hidden",borderRadius:EStyleSheet.value("5rem"),marginBottom:EStyleSheet.value("20rem"),width:EStyleSheet.value("150rem")}}>
                                <View style={{padding:EStyleSheet.value("20rem"),zIndex:99,justifyContent:"center",alignItems:"center",height:EStyleSheet.value("100rem")}}>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("12rem"),textAlign:"center"}}>Total Involved</Text>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("15rem"),textAlign:"center"}}>{pekerjaPlantingCount} People</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:EStyleSheet.value("10rem")}}>
                            <View
                           
                            style={{...shadow2,backgroundColor:"#fafafa",overflow:"hidden",borderRadius:EStyleSheet.value("5rem"),marginBottom:EStyleSheet.value("20rem"),width:EStyleSheet.value("150rem")}}>
                                <View style={{padding:EStyleSheet.value("20rem"),zIndex:99,justifyContent:"center",alignItems:"center",height:EStyleSheet.value("100rem")}}>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("12rem"),textAlign:"center"}}>Total Male</Text>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("15rem"),textAlign:"center"}}>{priaPlantingCount} People</Text>
                                </View>
                            </View>
                            <View
                            style={{...shadow2,backgroundColor:"#fafafa",overflow:"hidden",borderRadius:EStyleSheet.value("5rem"),marginBottom:EStyleSheet.value("20rem"),width:EStyleSheet.value("150rem")}}>
                                <View style={{padding:EStyleSheet.value("20rem"),zIndex:99,justifyContent:"center",alignItems:"center",height:EStyleSheet.value("100rem")}}>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("12rem"),textAlign:"center"}}>Total Female</Text>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("15rem"),textAlign:"center"}}>{wanitaPlantingCount} People</Text>
                                </View>
                            </View>
                        </View>
                    </View>
               </View>
            }

{
                (globalContext.credentials.data.hak_akses === "donor") &&
                <View style={{marginBottom:EStyleSheet.value("25rem"),marginTop:EStyleSheet.value("30rem")}}>
                   <View style={{paddingHorizontal:EStyleSheet.value("20rem"),flexDirection:"row",justifyContent:"space-between"}}>
                        <Text style={{fontWeight:"bold"}}>SUMMARY</Text>
                   </View>
                     <View style={{paddingHorizontal:EStyleSheet.value("20rem"),paddingVertical:EStyleSheet.value("10rem")}}>
                        <View 
                            style={{...shadow2,backgroundColor:"#fafafa",overflow:"hidden",borderRadius:EStyleSheet.value("5rem"),marginBottom:EStyleSheet.value("20rem")}}>
                                <View style={{padding:EStyleSheet.value("10rem"),zIndex:99,justifyContent:"center",alignItems:"center",height:EStyleSheet.value("100rem")}}>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("12rem"),textAlign:"center"}}>Area of Land Assessment</Text>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("15rem"),textAlign:"center"}}>{landAssessmentSum} Ha</Text>
                                </View>
                        </View>
                        <Text style={{fontWeight:"bold"}}>SEED</Text>    
                        <View
                            style={{...shadow2,backgroundColor:"#fafafa",overflow:"hidden",borderRadius:EStyleSheet.value("5rem"),marginBottom:EStyleSheet.value("20rem"),marginTop:EStyleSheet.value("10rem")}}>
                                <View style={{padding:EStyleSheet.value("20rem"),zIndex:99,justifyContent:"center",alignItems:"center",height:EStyleSheet.value("100rem")}}>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("12rem"),textAlign:"center"}}>Number of Villages</Text>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("15rem"),textAlign:"center"}}>{desaCount} Villages</Text>
                                </View>
                            </View>
                        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:EStyleSheet.value("10rem")}}>
                            <View
                            style={{...shadow2,backgroundColor:"#fafafa",overflow:"hidden",borderRadius:EStyleSheet.value("5rem"),marginBottom:EStyleSheet.value("20rem"),width:EStyleSheet.value("150rem")}}>
                                <View style={{padding:EStyleSheet.value("20rem"),zIndex:99,justifyContent:"center",alignItems:"center",height:EStyleSheet.value("100rem")}}>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("12rem"),textAlign:"center"}}>Number of Seeds</Text>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("15rem"),textAlign:"center"}}>{seedSum} Seeds</Text>
                                </View>
                            </View>
                            <View
                            style={{...shadow2,backgroundColor:"#fafafa",overflow:"hidden",borderRadius:EStyleSheet.value("5rem"),marginBottom:EStyleSheet.value("20rem"),width:EStyleSheet.value("150rem")}}>
                                <View style={{padding:EStyleSheet.value("20rem"),zIndex:99,justifyContent:"center",alignItems:"center",height:EStyleSheet.value("100rem")}}>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("12rem"),textAlign:"center"}}>Total Involved</Text>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("15rem"),textAlign:"center"}}>{pekerjaCount} People</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:EStyleSheet.value("10rem")}}>
                            <View
                            style={{...shadow2,backgroundColor:"#fafafa",overflow:"hidden",borderRadius:EStyleSheet.value("5rem"),marginBottom:EStyleSheet.value("20rem"),width:EStyleSheet.value("150rem")}}>
                                <View style={{padding:EStyleSheet.value("20rem"),zIndex:99,justifyContent:"center",alignItems:"center",height:EStyleSheet.value("100rem")}}>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("12rem"),textAlign:"center"}}>Total Male</Text>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("15rem"),textAlign:"center"}}>{priaCount} People</Text>
                                </View>
                            </View>
                            <View
                            style={{...shadow2,backgroundColor:"#fafafa",overflow:"hidden",borderRadius:EStyleSheet.value("5rem"),marginBottom:EStyleSheet.value("20rem"),width:EStyleSheet.value("150rem")}}>
                                <View style={{padding:EStyleSheet.value("20rem"),zIndex:99,justifyContent:"center",alignItems:"center",height:EStyleSheet.value("100rem")}}>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("12rem"),textAlign:"center"}}>Total Female</Text>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("15rem"),textAlign:"center"}}>{wanitaCount} People</Text>
                                </View>
                            </View>
                        </View>

                        <Text style={{fontWeight:"bold"}}>PLANTING</Text>    
                        <View
                            style={{...shadow2,backgroundColor:"#fafafa",overflow:"hidden",borderRadius:EStyleSheet.value("5rem"),marginBottom:EStyleSheet.value("20rem"),marginTop:EStyleSheet.value("10rem")}}>
                                <View style={{padding:EStyleSheet.value("20rem"),zIndex:99,justifyContent:"center",alignItems:"center",height:EStyleSheet.value("100rem")}}>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("12rem"),textAlign:"center"}}>Number of Villages</Text>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("15rem"),textAlign:"center"}}>{desaPlantingCount} Villages</Text>
                                </View>
                            </View>
                        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:EStyleSheet.value("10rem")}}>
                            <View
                            style={{...shadow2,backgroundColor:"#fafafa",overflow:"hidden",borderRadius:EStyleSheet.value("5rem"),marginBottom:EStyleSheet.value("20rem"),width:EStyleSheet.value("150rem")}}>
                                <View style={{padding:EStyleSheet.value("20rem"),zIndex:99,justifyContent:"center",alignItems:"center",height:EStyleSheet.value("100rem")}}>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("12rem"),textAlign:"center"}}>Number of Seeds</Text>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("15rem"),textAlign:"center"}}>{seedPlantingCount} Seeds</Text>
                                </View>
                            </View>
                            <View
                            style={{...shadow2,backgroundColor:"#fafafa",overflow:"hidden",borderRadius:EStyleSheet.value("5rem"),marginBottom:EStyleSheet.value("20rem"),width:EStyleSheet.value("150rem")}}>
                                <View style={{padding:EStyleSheet.value("20rem"),zIndex:99,justifyContent:"center",alignItems:"center",height:EStyleSheet.value("100rem")}}>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("12rem"),textAlign:"center"}}>Total Involved</Text>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("15rem"),textAlign:"center"}}>{pekerjaPlantingCount} People</Text>
                                </View>
                            </View>
                        </View>
                        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center",marginTop:EStyleSheet.value("10rem")}}>
                            <View
                            style={{...shadow2,backgroundColor:"#fafafa",overflow:"hidden",borderRadius:EStyleSheet.value("5rem"),marginBottom:EStyleSheet.value("20rem"),width:EStyleSheet.value("150rem")}}>
                                <View style={{padding:EStyleSheet.value("20rem"),zIndex:99,justifyContent:"center",alignItems:"center",height:EStyleSheet.value("100rem")}}>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("12rem"),textAlign:"center"}}>Total Male</Text>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("15rem"),textAlign:"center"}}>{priaPlantingCount} People</Text>
                                </View>
                            </View>
                            <View
                            style={{...shadow2,backgroundColor:"#fafafa",overflow:"hidden",borderRadius:EStyleSheet.value("5rem"),marginBottom:EStyleSheet.value("20rem"),width:EStyleSheet.value("150rem")}}>
                                <View style={{padding:EStyleSheet.value("20rem"),zIndex:99,justifyContent:"center",alignItems:"center",height:EStyleSheet.value("100rem")}}>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("12rem"),textAlign:"center"}}>Total Female</Text>
                                    <Text style={{color:"black",fontSize:EStyleSheet.value("15rem"),textAlign:"center"}}>{wanitaPlantingCount} People</Text>
                                </View>
                            </View>
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
                await removeUsername()
                console.log('logout')
                globalContext.setCredentials(null);
            }}
            >
                <MaterialCommunityIcons name="logout" size={24} color="black" />
            </TouchableOpacity>
        </View>
     </View>
  );
}


