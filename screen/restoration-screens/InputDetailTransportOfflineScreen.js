import React,{useState,useEffect, useContext} from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, Pressable, TouchableOpacity, Text, TextInput, View, Dimensions, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EStyleSheet from 'react-native-extended-stylesheet';

import { StatusBarHeight } from '../../utils/HeightUtils';
import { LinearGradient } from 'expo-linear-gradient';

import { CommonActions } from '@react-navigation/native';

import { Entypo, Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 

import {endpoint} from '../../utils/endpoint';

import {GlobalContext} from '../../App';

import RestorationTextInput from '../restoration-components/RestorationTextInput';
import RestorationSelectInput from '../restoration-components/RestorationSelectInput';
import RestorationDateInput from '../restoration-components/RestorationDateInput';
import RestorationCoordsInput from '../restoration-components/RestorationCoordsInput';
import RestorationNumberInput from '../restoration-components/RestorationNumberInput';

import DatePicker from 'react-native-modern-datepicker';

export default function InputDetailTransportOfflineScreen(props){

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

    const globalContext = useContext(GlobalContext);
    const [KT5Kind, setKT5Kind] = useState(globalContext.KT5Kind);
    const id_transport = props.route.params.id_transport;

    const [showSelectDateInput, setShowSelectDateInput] = useState(false);
    const [labelSelectDateInput, setLabelSelectDateInput] = useState("");
    const [indexSelectDateInput, setIndexSelectDateInput] = useState(-1);

    const [showSelectInput, setShowSelectInput] = useState(false);
    const [listSelectInput, setListSelectInput] = useState([]);
    const [labelSelectInput, setLabelSelectInput] = useState("");
    const [indexSelectInput, setIndexSelectInput] = useState(-1);

    const [smokeScreenOpened, setSmokeScreenOpened] = useState(false);
    


    const [schema, setSchema] = useState([
        {
            form:"id_transport",
            value:props.route.params.id_transport,
        },
        {
            type:"dateinput",
            label:"Tanggal",
            value:"",
            form:"date_transport",
            required:true
        },
        {
            type:"textNumber",
            label:"Jumlah Pekerja",
            value:"",
            form:"jumlah_pekerja",
            required:true
        },
        {
            type:"textNumber",
            label:"Jumlah Pria",
            value:"",
            form:"pria",
            required:true
        },
        {
            type:"textNumber",
            label:"Jumlah Wanita",
            value:"",
            form:"wanita",
            required:true
        },
        {
            type:"coordsinput",
            label:"Koordinat",
            value:{
                latitude:"",
                longitude:""
            },
            form:"coordinate",
            required:false
        },
        {
            type:"textNumber",
            label:"R.mucronata",
            value:"0",
            form:"r_mucronota",
            required:true
        },
        {
            type:"textNumber",
            label:"R.stylosa",
            value:"0",
            form:"r_stylosa",
            required:true
        },
        {
            type:"textNumber",
            label:"R.apiculata",
            value:"0",
            form:"r_apiculata",
            required:true
        },
        {
            type:"textNumber",
            label:"Avicennia spp",
            value:"0",
            form:"avicennia_spp",
            required:true
        },
        {
            type:"textNumber",
            label:"Ceriops spp",
            value:"0",
            form:"ceriops_spp",
            required:true
        },
        {
            type:"textNumber",
            label:"Xylocarpus spp",
            value:"0",
            form:"xylocarpus_spp",
            required:true
        },
        {
            type:"textNumber",
            label:"Bruguiera spp",
            value:"0",
            form:"bruguiera_spp",
            required:true
        },
        {
            type:"textNumber",
            label:"Sonneratia spp",
            value:"0",
            form:"sonneratia_spp",
            required:true
        },
    ]);

    return (
        <View style={{flex:1}}>


            {
                (smokeScreenOpened) &&
                <View style={{position:"absolute",elevation:9,shadowColor:"rgba(0,0,0,0)",justifyContent:"center",alignItems:"center",zIndex:9999,width:"100%",height:"100%"}}>
                    <View style={{backgroundColor:"black",position:"absolute",opacity:0.3,width:"100%",height:"100%"}}>
                    </View>
                    <ActivityIndicator color="white" size="large"/>
                </View>
            } 


        {
            (showSelectDateInput) &&
            <View style={{position:"absolute",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",zIndex:1000}}>
                <Pressable 
                onPress={()=>{
                    setShowSelectInput(false);
                }}
                style={{backgroundColor:"black",position:"absolute",opacity:0.2,width:"100%",height:"100%",zIndex:999}}></Pressable>
                <View style={{backgroundColor:"white",overflow:"hidden",width:Dimensions.get("screen").width-EStyleSheet.value("50rem"),borderRadius:EStyleSheet.value("5rem"),zIndex:1000}}>
                   <DatePicker
                   options={{
                    mainColor: '#1e915a',
                  }}
                   onSelectedChange={(date)=>{
                        setSchema((prev)=>{
                            return prev.map((item_,i)=>{
                                if(i===indexSelectDateInput){
                                    return {
                                        ...item_,
                                        value:date
                                    }
                                }
                                return item_;
                            })
                        });
                       setShowSelectDateInput(false);
                   }}
                   />
                </View>
            </View>
        }

            <ScrollView
            keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag"
            >
               {
                   schema.map((item,index)=>{
                       if(item.type==="textNumber"){
                            return (
                            <RestorationNumberInput
                            getter={schema}
                            setter={setSchema}
                            index={index}
                            label={item.label}/>
                           )
                       }
                       else if(item.type==="textinput"){
                        return (
                        <RestorationTextInput
                        getter={schema}
                        setter={setSchema}
                        index={index}
                        label={item.label}/>
                       )
                        }
                       else if(item.type==="dateinput"){
                        return (
                        <RestorationDateInput  
                        getter={schema}
                        setter={setSchema}
                        index={index}
                        onSelectPress={()=>{
                            setShowSelectDateInput(true);
                            setIndexSelectDateInput(index);
                        }}
                        label={item.label}/>
                       )
                     }
                     else if(item.type==="coordsinput"){
                        return (
                        <RestorationCoordsInput  
                        getter={schema}
                        setter={setSchema}
                        keyboardType="numeric"
                        index={index}
                        onGetLocation={(location)=>{
                            setSchema((prev)=>{
                                return prev.map((item,i)=>{
                                    if(index===i){
                                        return {
                                            ...item,
                                            value:{
                                                latitude:location.coords.latitude.toString(),
                                                longitude:location.coords.longitude.toString()
                                            }
                                        }
                                    }
                                    return item;
                                })
                            })
                        }}
                        label={item.label}/>
                       )
                    }
                    else if(item.type==="spacer"){
                        return (
                        <View style={{paddingVertical:EStyleSheet.value("10rem"),backgroundColor:"#f6f7fb",borderTopWidth:1,borderColor:"#e8e8e8",paddingHorizontal:EStyleSheet.value("25rem")}}>
                            <Text style={{color:"#2d2d2a",fontFamily:"NunitoBold",letterSpacing:1.1}}>{item.label}</Text>
                        </View>
                        )
                    }
                       
                   })
               }
               <TouchableOpacity 
                activeOpacity={0.8}
                onPress={async () => {
                    let required = schema.filter((item) => item.required);
                    let check = required.every((item) => {
                    if (item.type === "selectinput") {
                        return item.value.value.length > 0;
                    } else {
                        return item.value.length > 0;
                    }
                    });

                    setSmokeScreenOpened(true);

                    let filtered = schema.filter((item) => item.type !== "spacer");
                    let payload = {};
                    filtered.forEach((item, index) => {
                    if (item.type === "selectinput") {
                        payload[item.form] = item.value.id;
                    } else {
                        payload[item.form] = item.value;
                    }
                    });

                    payload.id = props.route.params.id_transport;
                    let payloadArray = [payload];

                    try {
                    const storedKT5Kind = await AsyncStorage.getItem("KT5Kind");
                    const parsedStoredKT5Kind = JSON.parse(storedKT5Kind) || [];

                    if (parsedStoredKT5Kind.length > 0) {
                        const updatedKT5Kind = [...parsedStoredKT5Kind, ...payloadArray];
                        await AsyncStorage.setItem("KT5Kind", JSON.stringify(updatedKT5Kind));
                        setKT5Kind(updatedKT5Kind);
                    } else {
                        await AsyncStorage.setItem("KT5Kind", JSON.stringify(payloadArray));
                        setKT5Kind(payloadArray);
                    }

                    setSmokeScreenOpened(false);
                    alert('Berhasil menyimpan data ke local');
                    props.navigation.navigate("KindTransportOffline",{id_transport:props.route.params.id_transport});
                    } catch (error) {
                    console.error("Error saving data to AsyncStorage:", error);
                    setSmokeScreenOpened(false);
                    }
                }}
               style={{marginTop:EStyleSheet.value("20rem"),backgroundColor:"#1e915a",paddingVertical:EStyleSheet.value("15rem"),borderRadius:EStyleSheet.value("10rem"),justifyContent:"center",alignItems:"center",marginBottom:EStyleSheet.value("20rem"),marginHorizontal:EStyleSheet.value("20rem")}}>
                   <Text style={{color:"white"}}>Proses</Text>
               </TouchableOpacity>
            </ScrollView>
        </View>
    )
}