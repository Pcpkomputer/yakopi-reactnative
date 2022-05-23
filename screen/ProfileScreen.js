import { StatusBar } from 'expo-status-bar';
import React, {useState, useEffect, useRef, useContext} from 'react';
import { StyleSheet, Modal, Text, View, Dimensions, ScrollView, FlatList, Image, Pressable, BackHandler, ActivityIndicator, Linking, TextInput, AsyncStorage, ToastAndroid } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import { Entypo, Feather, Ionicons, MaterialCommunityIcons, AntDesign } from '@expo/vector-icons'; 
import Svg, { Path, Circle } from "react-native-svg"
import { LinearGradient } from 'expo-linear-gradient';

import * as ImagePicker from 'expo-image-picker';

import ImageViewer from 'react-native-image-zoom-viewer';

import {Picker} from '@react-native-picker/picker';

import { useIsFocused } from '@react-navigation/native';

import { StatusBarHeight } from '../utils/HeightUtils';
import { TouchableOpacity } from 'react-native-gesture-handler';

import DateTimePicker from '@react-native-community/datetimepicker';

import {endpoint} from '../utils/endpoint';

import {GlobalContext} from '../App';

import {toLocaleTimestamp } from '../utils/utils';

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

export default function ProfileScreen(props){

    let [imagePopup, setImagePopup] = useState([{
        url: 'https://avatars2.githubusercontent.com/u/7970947?v=3&s=460',
    }]);
    let [imagePopupOpened, setImagePopupOpened] = useState(false);

    useEffect(() => {
        const backAction = () => {
          props.navigation.goBack();
          return true;
        };
    
        const backHandler = BackHandler.addEventListener(
          "hardwareBackPress",
          backAction
        );
    
        return () => backHandler.remove();
      }, []);

    let [smokeScreenOpened, setSmokeScreenOpened] = useState(false);

    let focused = useIsFocused();

    let globalContext = useContext(GlobalContext);

    let [dataLoaded, setDataLoaded] = useState(false);

    let [simpanLoading, setSimpanLoading] = useState(false);

    let [detail, setDetail] = useState({});


    ////
    let [nama, setNama] = useState("");
    let [nickname, setNickname] = useState("");

    let [fotoProfil, setFotoProfil] = useState("");

    let [username, setUsername] = useState("");
    let [namaLengkap,setNamaLengkap] = useState("");
    let [jenkel, setJenkel] = useState("");
    let [tanggalLahir, setTanggalLahir] = useState(new Date());
    let [alamat, setAlamat] = useState("");
    let [email, setEmail] = useState("");
    let [notelepon, setNoTelepon] = useState("");


    let [newPassword, setNewPassword] = useState("");
    let [confirmPassword, setConfirmPassword] = useState("");


    let fetchProfil = async()=>{
        setDataLoaded(false);
        let request = await fetch(`${endpoint}/profile`,{
            method:"GET",
            headers:{
                "Authorization":`Bearer ${globalContext.credentials.token}`
            }
        });
        let result = await request.json();

        let response = result.data;
        
        setUsername(response.username);
        setNamaLengkap(response.nama_lengkap);
        setJenkel(response.jenkel);
        setAlamat(response.alamat);
        setEmail(response.email);
        setNoTelepon(response.no_hp);
        setFotoProfil(response.foto_pengguna || "");
        

        setDataLoaded(true);
    }

    let [calendarOpened, setCalendarOpened] = useState(false);

    useEffect(()=>{
        if(focused){
            fetchProfil();
        }
    },[focused])

    return (
        <View style={{flex:1,backgroundColor:"white"}}>

            
            {
                (smokeScreenOpened) &&
                <View style={{position:"absolute",elevation:9,shadowColor:"rgba(0,0,0,0)",justifyContent:"center",alignItems:"center",zIndex:9999,width:"100%",height:"100%"}}>
                    <View style={{backgroundColor:"black",position:"absolute",opacity:0.3,width:"100%",height:"100%"}}>
                    </View>
                    <ActivityIndicator color="white" size="large"/>
                </View>
            }

            <View style={{height:StatusBarHeight}}></View>
            <View style={{...shadow,backgroundColor:"white",flexDirection:"row",paddingHorizontal:EStyleSheet.value("20rem"),alignItems:"center",height:EStyleSheet.value("55rem")}}>
                 
                <View style={{position:"absolute",justifyContent:"center",alignItems:"center",width:Dimensions.get("screen").width}}>
                    <Text style={{fontWeight:"bold",color:"black"}}>Edit Profil</Text>
                </View>
            </View>
            {
                (dataLoaded) &&
                <ScrollView keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag" contentContainerStyle={{paddingBottom:EStyleSheet.value("20rem")}}>
                    <View style={{marginTop:EStyleSheet.value("20rem"),paddingVertical:EStyleSheet.value("5rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                        <View style={{justifyContent:"center",alignItems:"center",paddingVertical:EStyleSheet.value("20rem"),marginBottom:EStyleSheet.value("20rem")}}>
                            <View style={{width:EStyleSheet.value("130rem"),borderRadius:999,backgroundColor:"whitesmoke",height:EStyleSheet.value("130rem")}}>
                                
                                {
                                    (smokeScreenOpened) &&
                                    <View style={{borderRadius:999,position:"absolute",justifyContent:"center",alignItems:"center",width:"100%",height:"100%",overflow:"hidden",zIndex:999}}>
                                        <View style={{backgroundColor:"#5daa5f",opacity:0.2,position:"absolute",width:"100%",height:"100%"}}></View>
                                        <ActivityIndicator size="large" color="white"/>
                                    </View>
                                }
                                
                                
                                <Image style={{width:"100%",height:"100%",borderRadius:999}} source={{uri:(fotoProfil.match(/file:\/\//)) ? fotoProfil:"https://sispro-yakopi.org/"+fotoProfil}}></Image>
                                <Pressable
                                activeOpacity={0.8}
                                onPress={async ()=>{
                                    let result = await ImagePicker.launchImageLibraryAsync();

                                    if(!result.cancelled){

                                        setSmokeScreenOpened(true);


                                        setFotoProfil(result.uri);
                                        
                                        setSmokeScreenOpened(false);
                                    }
                                }}
                                style={{position:"absolute",justifyContent:"center",alignItems:"center",backgroundColor:"#5daa5f",borderRadius:999,width:EStyleSheet.value("40rem"),height:EStyleSheet.value("40rem"),right:EStyleSheet.value("0rem"),bottom:EStyleSheet.value("0rem")}}>
                                    <AntDesign name="edit" size={EStyleSheet.value("19rem")} color="white" />
                                </Pressable>
                            </View>
                        </View>
                        
                        <View style={{...shadow,flexDirection:"row",marginBottom:EStyleSheet.value("15rem"),alignItems:"center",borderRadius:EStyleSheet.value("5rem"),paddingVertical:EStyleSheet.value("10rem"),backgroundColor:"white",paddingHorizontal:EStyleSheet.value("15rem")}}>
                            <Text style={{marginRight:EStyleSheet.value("5rem"),color:"#5daa5f",fontWeight:"bold"}}>Username :</Text>
                            <TextInput 
                            editable={false}
                            style={{fontSize:EStyleSheet.value("15rem"),flex:1,color:"grey"}} value={username}/>
                        </View>
                        <View style={{...shadow,flexDirection:"row",marginBottom:EStyleSheet.value("15rem"),alignItems:"center",borderRadius:EStyleSheet.value("5rem"),paddingVertical:EStyleSheet.value("10rem"),backgroundColor:"white",paddingHorizontal:EStyleSheet.value("15rem")}}>
                            <Text style={{marginRight:EStyleSheet.value("5rem"),color:"#5daa5f",fontWeight:"bold"}}>Nama Lengkap :</Text>
                            <TextInput 
                               onChangeText={(text)=>{
                                setNamaLengkap(text);
                            }}
                            style={{fontSize:EStyleSheet.value("15rem"),flex:1,color:"grey"}} value={namaLengkap}/>
                        </View>
                        <View style={{...shadow,flexDirection:"row",height:EStyleSheet.value("48rem"),marginBottom:EStyleSheet.value("15rem"),alignItems:"center",borderRadius:EStyleSheet.value("5rem"),paddingVertical:EStyleSheet.value("10rem"),backgroundColor:"white",paddingHorizontal:EStyleSheet.value("15rem")}}>
                            <Text style={{marginRight:EStyleSheet.value("5rem"),color:"#5daa5f",fontWeight:"bold"}}>Jenkel :</Text>
                                <Picker
                                style={{flex:1,color:"grey"}}
                                selectedValue={jenkel}
                                onValueChange={(val)=>{
                                    setJenkel(val);
                                }}
                               >
                                <Picker.Item label="Laki-Laki" value="L" />
                                <Picker.Item label="Perempuan" value="P" />
                                </Picker>
                        </View>
                        <View style={{...shadow,flexDirection:"row",marginBottom:EStyleSheet.value("15rem"),alignItems:"center",borderRadius:EStyleSheet.value("5rem"),paddingVertical:EStyleSheet.value("10rem"),backgroundColor:"white",paddingHorizontal:EStyleSheet.value("15rem")}}>
                            <Text style={{marginRight:EStyleSheet.value("5rem"),color:"#5daa5f",fontWeight:"bold"}}>Alamat :</Text>
                            <TextInput 
                               onChangeText={(text)=>{
                                setAlamat(text);
                            }}
                            style={{fontSize:EStyleSheet.value("15rem"),flex:1,color:"grey"}} value={alamat}/>
                        </View>
                        <View style={{...shadow,flexDirection:"row",marginBottom:EStyleSheet.value("15rem"),alignItems:"center",borderRadius:EStyleSheet.value("5rem"),paddingVertical:EStyleSheet.value("10rem"),backgroundColor:"white",paddingHorizontal:EStyleSheet.value("15rem")}}>
                            <Text style={{marginRight:EStyleSheet.value("5rem"),color:"#5daa5f",fontWeight:"bold"}}>Email :</Text>
                            <TextInput 
                               onChangeText={(text)=>{
                                setEmail(email);
                            }}
                            style={{fontSize:EStyleSheet.value("15rem"),flex:1,color:"grey"}} value={email}/>
                        </View>
                        <View style={{...shadow,flexDirection:"row",marginBottom:EStyleSheet.value("15rem"),alignItems:"center",borderRadius:EStyleSheet.value("5rem"),paddingVertical:EStyleSheet.value("10rem"),backgroundColor:"white",paddingHorizontal:EStyleSheet.value("15rem")}}>
                            <Text style={{marginRight:EStyleSheet.value("5rem"),color:"#5daa5f",fontWeight:"bold"}}>No. HP :</Text>
                            <TextInput 
                               onChangeText={(text)=>{
                                setNoTelepon(text);
                            }}
                            style={{fontSize:EStyleSheet.value("15rem"),flex:1,color:"grey"}} value={notelepon}/>
                        </View>
                        <View style={{...shadow,flexDirection:"row",marginBottom:EStyleSheet.value("15rem"),alignItems:"center",borderRadius:EStyleSheet.value("5rem"),paddingVertical:EStyleSheet.value("10rem"),backgroundColor:"white",paddingHorizontal:EStyleSheet.value("15rem")}}>
                            <Text style={{marginRight:EStyleSheet.value("5rem"),color:"#5daa5f",fontWeight:"bold"}}>Buat Password :</Text>
                            <TextInput 
                               onChangeText={(text)=>{
                                setNewPassword(text);
                            }}
                            style={{fontSize:EStyleSheet.value("15rem"),flex:1,color:"grey"}} value={newPassword}/>
                        </View>
                        <View style={{...shadow,flexDirection:"row",marginBottom:EStyleSheet.value("15rem"),alignItems:"center",borderRadius:EStyleSheet.value("5rem"),paddingVertical:EStyleSheet.value("10rem"),backgroundColor:"white",paddingHorizontal:EStyleSheet.value("15rem")}}>
                            <Text style={{marginRight:EStyleSheet.value("5rem"),color:"#5daa5f",fontWeight:"bold"}}>Ulang Password :</Text>
                            <TextInput 
                               onChangeText={(text)=>{
                                setConfirmPassword(text);
                            }}
                            style={{fontSize:EStyleSheet.value("15rem"),flex:1,color:"grey"}} value={confirmPassword}/>
                        </View>
                        {
                            (simpanLoading) ?
                            <View
                            style={{flexDirection:"row",marginBottom:EStyleSheet.value("15rem"),justifyContent:"center",alignItems:"center",marginTop:EStyleSheet.value("20rem"),alignItems:"center",borderRadius:EStyleSheet.value("5rem"),paddingVertical:EStyleSheet.value("13rem"),backgroundColor:"#5daa5f",paddingHorizontal:EStyleSheet.value("15rem")}}>
                                <ActivityIndicator color="white"/>
                            </View>
                            :
                            <Pressable 
                            android_ripple={{
                                color:"white"
                            }}
                            onPress={async ()=>{

                                try {
                                    setSimpanLoading(true);
                                    if(username.length===0 || namaLengkap.length===0 || jenkel.length===0 || tanggalLahir.length===0 || alamat.length===0 || email.length===0 || notelepon.length===0){
                                        throw new Error("Masukkan semua data");
                                    }

                                    if(newPassword!==confirmPassword){
                                        throw new Error("Konfirmasi password salah")
                                    }
  

                                    let payload = {
                                        username:username,
                                        namalengkap:namaLengkap,
                                        jenkel:jenkel,
                                        tanggallahir:`${tanggalLahir.getFullYear()}-${tanggalLahir.getMonth()+1}-${tanggalLahir.getDate()}`,
                                        alamat:alamat,
                                        email:email,
                                        notelepon:notelepon,
                                        newpassword:newPassword
                                    };


                                    if(fotoProfil.match(/file:\/\//)){
                                        let name = `fotoprofil-${globalContext.credentials.data.nama_lengkap}-${new Date().getTime()}.jpg`;
        
                                        let formData = new FormData();

                                        var photo = {
                                            uri: fotoProfil,
                                            type: 'image/jpeg',
                                            name: name,
                                        };

                                        formData.append("foto_pengguna",photo);
                                        
                                        let path = `/assets/img/pengguna/`;
                                        
                                        let request = await fetch(`https://sispro-yakopi.org/endpoint/fotoProfile`,{
                                            method:"POST",
                                            body:formData
                                        });

                                        let response = await request.json();
                                        
                                        let filename = response.result.file_name;
                                        let payloadfilename = path+filename;

                                        payload["fotoprofil"] = payloadfilename;

                                        let req = await fetch(`${endpoint}/update-profile`,{
                                            method:"POST",
                                            headers:{
                                                "content-type":"application/json",
                                                "authorization":`Bearer ${globalContext.credentials.token}`
                                            },
                                            body:JSON.stringify(payload)
                                        })
                                        let res = await req.json();

                                        if(res.success){
                                            ToastAndroid.show(res.msg,500);
                                            fetchProfil();
                                        }

                                        globalContext.setCredentials(res.credentials);
                                        AsyncStorage.setItem("credentials",JSON.stringify(res.credentials));

                                        setSimpanLoading(false);

                                    }
                                    else{
                                        payload["fotoprofil"] = fotoProfil;

                                        let req = await fetch(`${endpoint}/update-profile`,{
                                            method:"POST",
                                            headers:{
                                                "content-type":"application/json",
                                                "authorization":`Bearer ${globalContext.credentials.token}`
                                            },
                                            body:JSON.stringify(payload)
                                        })
                                        let res = await req.json();

                                        if(res.success){
                                            ToastAndroid.show(res.msg,500);
                                            fetchProfil();
                                        }

                                        globalContext.setCredentials(res.credentials);
                                        AsyncStorage.setItem("credentials",JSON.stringify(res.credentials));

                                        setSimpanLoading(false);
                                    }   

                                    
                                } catch (error) {
                                    ToastAndroid.show(error.message,500);
                                     setSimpanLoading(false);
                                }

                                


                               

                            
                            }}
                            style={{flexDirection:"row",marginBottom:EStyleSheet.value("15rem"),justifyContent:"center",alignItems:"center",marginTop:EStyleSheet.value("20rem"),alignItems:"center",borderRadius:EStyleSheet.value("5rem"),paddingVertical:EStyleSheet.value("13rem"),backgroundColor:"#5daa5f",paddingHorizontal:EStyleSheet.value("15rem")}}>
                                <Text style={{color:"white"}}>Simpan</Text>
                            </Pressable>
                        }
                    </View>
            </ScrollView>
            }
            {
                (!dataLoaded) &&
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <ActivityIndicator size="large" color="#5daa5f"/>
                </View>
            }

            <Modal 
            onRequestClose={()=>{
                setImagePopupOpened(false);
            }}
            visible={imagePopupOpened} transparent={false}>
                <ImageViewer 
                enableSwipeDown
                onCancel={()=>{
                    setImagePopupOpened(false);
                }}
                // onClick={()=>{
                //     setImagePopupOpened(false);
                // }}
                imageUrls={imagePopup}/>
            </Modal>


        {
            (calendarOpened) &&
            <DateTimePicker
            testID="dateTimePicker"
            value={tanggalLahir}
            mode={"date"}
            is24Hour={true}
            display="default"
            onChange={(value)=>{
                if(value.type==="set"){
                    let date = new Date(value.nativeEvent.timestamp);

                    setTanggalLahir(date);
                
                }

                setCalendarOpened(false);
               
            }}
            />
            }
        </View>
    )
}