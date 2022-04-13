import React, {useState, useContext, useEffect} from 'react';
import { StyleSheet, AsyncStorage, ScrollView, ActivityIndicator, TouchableOpacity, Text, View, Dimensions, Image } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import { StatusBarHeight } from '../utils/HeightUtils';
import { LinearGradient } from 'expo-linear-gradient';
import * as ImagePicker from 'expo-image-picker';

import { Entypo, Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 

import {GlobalContext} from '../App';
import { endpoint } from '../utils/endpoint';

import * as Location from 'expo-location';

import { CommonActions } from '@react-navigation/native';

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

  const [presensi,setPresensi] = useState({
      jam_masuk_absen:null,
      jam_keluar_absen:null
  });

  const [presensiLoading, setPresensiLoading] = useState(true);
  const [smokeScreenOpened, setSmokeScreenOpened] = useState(true);

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
  },[]);

  return (
     <View style={{flex:1,backgroundColor:"#edf0f4"}}>
        <ScrollView keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag">
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
                        <View style={{backgroundColor:"whitesmoke",overflow:"hidden",borderRadius:EStyleSheet.value("5rem"),width:EStyleSheet.value("80rem"),height:EStyleSheet.value("100rem")}}>
                            <Image resizeMode="stretch" style={{width:"100%",height:"100%"}} source={globalContext?.credentials?.data?.foto_pengguna ? {uri:globalContext?.credentials?.data?.foto_pengguna || ""}:require("../assets/logo.jpeg")}/>
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
    
                                                let request = await fetch(`https://sispro-yakopi.org/api/fotoAbsenMasuk`,{
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

                                        var photo = {
                                            uri: image.uri,
                                            type: 'image/jpeg',
                                            name: `presensipulang-${globalContext.credentials.data.nama_lengkap}-${new Date().getTime()}.jpg`,
                                        };

                                        let formdata = new FormData();
                                        formdata.append("foto_absen_keluar",photo);

                                        let request = await fetch(`https://sispro-yakopi.org/api/fotoAbsenPulang`,{
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
                                                timezone:timezone
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
                <View style={{...shadow2,flex:1,backgroundColor:"#fafafa",marginRight:EStyleSheet.value("10rem")}}>
                    <View style={{backgroundColor:"#fafafa",overflow:"hidden",borderRadius:EStyleSheet.value("5rem")}}>
                        <View style={{padding:EStyleSheet.value("10rem"),zIndex:99,justifyContent:"center",alignItems:"center",height:EStyleSheet.value("140rem")}}>
                            <Text numberOfLines={2} style={{color:"white",fontSize:EStyleSheet.value("22rem"),textAlign:"center"}}>Restoration</Text>
                        </View>

                        <Image style={{position:"absolute",width:"100%",height:"100%"}} source={{uri:"https://media.istockphoto.com/photos/mangroove-tree-detail-view-picture-id830059752?k=20&m=830059752&s=170667a&w=0&h=B2XDDDbhsJTxP7OcpFspMnQbhZ6xXAJ_MKDUHjPR2jM="}}/>
                    
                        <LinearGradient
                        style={{position:"absolute",bottom:0,width:"100%",height:"50%"}}
                        colors={['transparent', 'rgba(0,0,0,1)']}>
                        </LinearGradient>
                    </View>
                </View>
                <View style={{...shadow2,flex:1,backgroundColor:"#fafafa",marginLeft:EStyleSheet.value("10rem")}}>
                    <View style={{backgroundColor:"#fafafa",overflow:"hidden",borderRadius:EStyleSheet.value("5rem")}}>
                        <View style={{padding:EStyleSheet.value("10rem"),zIndex:99,justifyContent:"center",alignItems:"center",height:EStyleSheet.value("140rem")}}>
                            <Text style={{color:"white",fontSize:EStyleSheet.value("22rem"),textAlign:"center"}}>Community Development</Text>
                        </View>

                        <Image style={{position:"absolute",width:"100%",height:"100%"}} source={{uri:"https://islandsafarimergui.com/wp-content/uploads/2012/06/Mangroove-Trees-in-Lampi-Island-1.jpg"}}/>
                    
                        <LinearGradient
                        style={{position:"absolute",bottom:0,width:"100%",height:"50%"}}
                        colors={['transparent', 'rgba(0,0,0,1)']}>
                        </LinearGradient>
                    </View>
                </View>
            </View>
            <View style={{paddingHorizontal:EStyleSheet.value("15rem"),marginTop:EStyleSheet.value("30rem")}}>
                <View style={{...shadow2,backgroundColor:"#fafafa",overflow:"hidden",borderRadius:EStyleSheet.value("5rem")}}>
                    <View style={{padding:EStyleSheet.value("10rem"),zIndex:99,justifyContent:"center",alignItems:"center",height:EStyleSheet.value("140rem")}}>
                        <Text style={{color:"white",fontSize:EStyleSheet.value("40rem")}}>Simulation</Text>
                    </View>

                    <Image style={{position:"absolute",width:"100%",height:"100%"}} source={{uri:"https://lingkarjateng.com/wp-content/uploads/2020/03/Mangroove.jpg"}}/>
                
                    <LinearGradient
                    style={{position:"absolute",bottom:0,width:"100%",height:"50%"}}
                    colors={['transparent', 'rgba(0,0,0,1)']}>
                    </LinearGradient>
                </View>
            </View>
        </ScrollView>

        <View style={{position:"absolute",alignItems:"center",width:"100%",flexDirection:"row",justifyContent:"space-between",bottom:EStyleSheet.value("30rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
            <View>
                <Feather name="user" size={24} color="black" />
            </View>
            <View>
                <View style={{...shadow2,overflow:"hidden",justifyContent:"center",alignItems:"center",backgroundColor:"white",borderRadius:999,width:EStyleSheet.value("60rem"),height:EStyleSheet.value("60rem")}}>
                    <Image resizeMode="stretch" style={{width:"50%",height:"70%"}} source={{uri:"https://devjobsindo.org/wp-content/uploads/2022/02/WhatsApp-Image-2022-02-25-at-5.14.01-PM-200x287.jpeg"}}/>
                </View>
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


