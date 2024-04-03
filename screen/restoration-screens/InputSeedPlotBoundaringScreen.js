import React,{useState,useEffect, useContext} from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, Pressable, AsyncStorage, TouchableOpacity, Text, TextInput, View, Dimensions, Image, FlatList, Alert, BackHandler } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import { StatusBarHeight } from '../../utils/HeightUtils';
import { LinearGradient } from 'expo-linear-gradient';

import { CommonActions } from '@react-navigation/native';

import { Entypo, Feather, FontAwesome, AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 

import * as ImagePicker from 'expo-image-picker';

import {endpoint} from '../../utils/endpoint';

import {GlobalContext} from '../../App';

import RestorationTextInput from '../restoration-components/RestorationTextInput';
import RestorationSelectInput from '../restoration-components/RestorationSelectInput';
import RestorationDateInput from '../restoration-components/RestorationDateInput';
import RestorationCoordsInput from '../restoration-components/RestorationCoordsInput';
import RestorationNumberInput from '../restoration-components/RestorationNumberInput';

import DatePicker from 'react-native-modern-datepicker';

export default function InputSeedPlotBoundaringScreen(props){

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

    
    const [showSelectDateInput, setShowSelectDateInput] = useState(false);
    const [labelSelectDateInput, setLabelSelectDateInput] = useState("");
    const [indexSelectDateInput, setIndexSelectDateInput] = useState(-1);

    const [showSelectInput, setShowSelectInput] = useState(false);
    const [listSelectInput, setListSelectInput] = useState([]);
    const [labelSelectInput, setLabelSelectInput] = useState("");
    const [indexSelectInput, setIndexSelectInput] = useState(-1);

    const [smokeScreenOpened, setSmokeScreenOpened] = useState(false);
    



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
            headerTitle: `TAMBAH BIBIT`
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
                
                                    form.append("file_land_assessment_photo",photo);
                                    let request = await fetch(`https://sispro-yakopi.org/endpoint/dokumentasiPhotoLandAssessment`,{
                                        method:"POST",
                                        body:form
                                    });
                                    let response = await request.json();
                
                                    let url = `/assets/img/photoLandAssessment/${response.result.orig_name}`;

                                    let id = props.route.params.id_land_assessment;

                                    // $id_land_assessment = $request->id_land_assessment;
                                    // $keterangan_land_assessment_photo = $request->keterangan_land_assessment_photo;
                                    // $link_land_assessment_photo = $request->link_land_assessment_photo;
                                    // $file_land_assessment_photo = $request->file_land_assessment_photo;
                
                                    let req2 = await fetch(`${endpoint}/add-photo-land-assessment`,{
                                        method:"POST",
                                        headers:{
                                            "authorization":`Bearer ${globalContext.credentials.token}`,
                                            "content-type":"application/json"
                                        },
                                        body:JSON.stringify({
                                            id_land_assessment:id,
                                            keterangan_land_assessment_photo:keterangan,
                                            link_land_assessment_photo:"",
                                            file_land_assessment_photo:url
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
                                    {
                                        (item.link_land_assessment_photo===null || item.link_land_assessment_photo==="") ?
                                        <Image style={{width:"100%",height:"100%"}} source={{uri:`${endpoint.replace(/api(.?)/g,"")}${item.file_land_assessment_photo}`}}></Image>
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
                      
                                                    let id = item.id_land_assessment_photo;
                                                    let request = await fetch(`${endpoint}/delete-photo-land-assessment`,{
                                                        method:"DELETE",
                                                        headers:{
                                                            "authorization":`Bearer ${globalContext.credentials.token}`,
                                                            "content-type":"application/json"
                                                        },
                                                        body:JSON.stringify({
                                                            id_land_assessment_photo:id
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