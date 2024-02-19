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




function AssetsPdf(props){

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
        let id = props.route.params.id_community_group;
        let request = await fetch(`${endpoint}/pdf-community-group`,{
            method:"POST",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`,
                "content-type":"application/json"
            },
            body:JSON.stringify({
                id_community_group:id
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
            headerTitle: `PDF Community Group`,
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
                            value={keterangan}
                            required={true}
                            style={{height:EStyleSheet.value("100rem")}} multiline={true} placeholder="Keterangan"/>
                        </View>
                        <TouchableOpacity 
                        onPress={async ()=>{
                            let required = true;
                            if(keterangan==""){
                                required = false;
                            }
                            if(required){
                                // pilih file
                                let gambar = await DocumentPicker.getDocumentAsync();
                                if(!gambar.canceled){

                                    setImageLoading(true);
                                    setModalKeteranganOpened(false);
                
                                    let uuid = createUUID();
                
                                    var photo = {
                                        uri: gambar.assets[0].uri,
                                        type: 'application/pdf',
                                        name: `${uuid}.pdf`,
                                    };

                
                                    let form = new FormData();
                
                                    form.append("file_community_group_pdf",photo);
                                    let request = await fetch(`https://sispro-yakopi.org/endpoint/dokumentasiPdfCommunityGroup`,{
                                        method:"POST",
                                        body:form
                                    });
                                    let response = await request.json();
                
                                    let url = `/assets/img/communityGroup/${response.result.orig_name}`;

                                    let id = props.route.params.id_community_group;

                                    // $keterangan_land_assessment_video = $request->keterangan_land_assessment_video;
                                    // $link_land_assessment_video = $request->link_land_assessment_video;
                                    // $file_land_assessment_video = $request->file_land_assessment_video;
                
                                    let req2 = await fetch(`${endpoint}/add-pdf-community-group`,{
                                        method:"POST",
                                        headers:{
                                            "authorization":`Bearer ${globalContext.credentials.token}`,
                                            "content-type":"application/json"
                                        },
                                        body:JSON.stringify({
                                            id_community_group:id,
                                            nama_file:keterangan,
                                            file_community_group_pdf:url
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
                        console.log(`${endpoint.replace(/api(.?)/g,"")}${item.file_community_group_pdf}`);
                        return (
                            <View style={{marginHorizontal:EStyleSheet.value("20rem"),overflow:"hidden",borderRadius:EStyleSheet.value("3rem"),marginBottom:EStyleSheet.value("15rem")}}>
                                <TouchableOpacity
                                onPress={()=>{
                                    Linking.openURL(`${endpoint.replace(/api(.?)/g,"")}${item.file_community_group_pdf}`);
                                }}
                                style={{backgroundColor:"#e8e8e8",height:EStyleSheet.value("200rem")}}>
                                <View style={{backgroundColor:"#e8e8e8",height:EStyleSheet.value("200rem")}}>
                                    <View style={{justifyContent:"center",alignItems:"center",flex:1}}>
                                        <MaterialIcons name="picture-as-pdf" size={EStyleSheet.value("100rem")} color="black" />
                                    </View>
                                </View>
                                <View style={{position:"absolute",zIndex:10,bottom:EStyleSheet.value("20rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                                    <Text style={{color:"white",fontSize:EStyleSheet.value("20rem")}}>{item.nama_file}</Text>
                                </View>
                                </TouchableOpacity>
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
                      
                                                    let id = item.id_community_group_pdf;
                                                    let request = await fetch(`${endpoint}/delete-pdf-community-group`,{
                                                        method:"DELETE",
                                                        headers:{
                                                            "authorization":`Bearer ${globalContext.credentials.token}`,
                                                            "content-type":"application/json"
                                                        },
                                                        body:JSON.stringify({
                                                            id_community_group_pdf:id
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
        let id = props.route.params.id_community_group;
        let request = await fetch(`${endpoint}/photo-community-group`,{
            method:"POST",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`,
                "content-type":"application/json"
            },
            body:JSON.stringify({
                id_community_group:id
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
            headerTitle: `Image Community Group`,
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
                                if(!gambar.canceled){

                                    setImageLoading(true);
                                    setModalKeteranganOpened(false);
                
                                    let uuid = createUUID();
                
                                    var photo = {
                                        uri: gambar.assets[0].uri,
                                        type: 'image/jpeg',
                                        name: `${uuid}.jpg`,
                                    };
                
                                    let form = new FormData();
                
                                    form.append("file_community_group_dokumentasi",photo);
                                    let request = await fetch(`https://sispro-yakopi.org/endpoint/dokumentasiImageCommunityGroup`,{
                                        method:"POST",
                                        body:form
                                    });
                                    let response = await request.json();
                
                                    let url = `/assets/img/communityGroup/${response.result.orig_name}`;

                                    let id = props.route.params.id_community_group;

                                    // $id_land_assessment = $request->id_land_assessment;
                                    // $keterangan_land_assessment_photo = $request->keterangan_land_assessment_photo;
                                    // $link_land_assessment_photo = $request->link_land_assessment_photo;
                                    // $file_land_assessment_photo = $request->file_land_assessment_photo;
                
                                    let req2 = await fetch(`${endpoint}/add-photo-community-group`,{
                                        method:"POST",
                                        headers:{
                                            "authorization":`Bearer ${globalContext.credentials.token}`,
                                            "content-type":"application/json"
                                        },
                                        body:JSON.stringify({
                                            id_community_group:id,
                                            nama_file:keterangan,
                                            file_community_group_dokumentasi:url
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
                                alert("Data Keterangan boleh kosong");
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
                                    <Image style={{width:"100%",height:"100%"}} source={{uri:`${endpoint.replace(/api(.?)/g,"")}${item.file_community_group_dokumentasi}`}}></Image>
                                </View>
                                <View style={{position:"absolute",zIndex:10,bottom:EStyleSheet.value("20rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                                    <Text style={{color:"white",fontSize:EStyleSheet.value("20rem")}}>{item.nama_file}</Text>
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
                      
                                                    let id = item.id_community_group_dokumentasi;
                                                    let request = await fetch(`${endpoint}/delete-photo-community-group`,{
                                                        method:"DELETE",
                                                        headers:{
                                                            "authorization":`Bearer ${globalContext.credentials.token}`,
                                                            "content-type":"application/json"
                                                        },
                                                        body:JSON.stringify({
                                                            id_community_group_dokumentasi:id
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


export default function DokumentasiCommunityGroup(props){

    if(props.route.params.type==="image"){
        return <AssetsImage {...props}/>
    }
    else if(props.route.params.type==="pdf"){
        return <AssetsPdf {...props}/>
    }

}