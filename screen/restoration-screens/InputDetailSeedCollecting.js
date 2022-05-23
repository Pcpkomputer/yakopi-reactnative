import React,{useState,useEffect, useContext} from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, Pressable, AsyncStorage, TouchableOpacity, Text, TextInput, View, Dimensions, Image } from 'react-native';

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

export default function InputDetailSeedCollectingScreen(props){

    const globalContext = useContext(GlobalContext);

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
            form:"id_collecting_seed",
            value:props.route.params.id_collecting_seed,
        },
        {
            type:"dateinput",
            label:"Tanggal",
            value:"",
            form:"tanggal_collecting",
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
            label:"R.mucronata",
            value:"",
            form:"r_mucronoto",
            required:true
        },
        {
            type:"textNumber",
            label:"R.stylosa",
            value:"",
            form:"r_styloso",
            required:true
        },
        {
            type:"textNumber",
            label:"R.apiculata",
            value:"",
            form:"r_apiculata",
            required:true
        },
        {
            type:"textNumber",
            label:"Avicennia spp",
            value:"",
            form:"avicennia_spp",
            required:true
        },
        {
            type:"textNumber",
            label:"Ceriops spp",
            value:"",
            form:"ceriops_spp",
            required:true
        },
        {
            type:"textNumber",
            label:"Xylocarpus spp",
            value:"",
            form:"xylocarpus_spp",
            required:true
        },
        {
            type:"textNumber",
            label:"Bruguiera spp",
            value:"",
            form:"bruguiera_spp",
            required:true
        },
        {
            type:"textNumber",
            label:"Sonneratia spp",
            value:"",
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

            <View style={{backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center",height:EStyleSheet.value("50rem")}}>
                <Text style={{fontSize:EStyleSheet.value("16rem"),color:"#a9adb8"}}>TAMBAH DATA</Text>
            </View>
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
               onPress={async ()=>{
                   let required = schema.filter((item)=>item.required);
                   let check = required.every((item)=>{
                        if(item.type==="selectinput"){
                            return item.value.value.length>0;
                        }
                        else{   
                            return item.value.length>0;
                        }
                      
                   
                   });
                   if(check){   
                        setSmokeScreenOpened(true);
                        let filtered = schema.filter((item)=>item.type!=="spacer");
                        let payload = {};
                        filtered.forEach((item,index)=>{
                            if(item.type==="selectinput"){
                                payload[item.form]=item.value.id;
                            }
                            else{   
                                payload[item.form]=item.value;
                            }
                           
                        });
                        console.log(payload);
                        let request = await fetch(`${endpoint}/add-kind-seed-collecting`,{
                            method:"POST",
                            headers:{
                                "authorization":`Bearer ${globalContext.credentials.token}`,
                                "content-type":"application/json"
                            },
                            body:JSON.stringify(
                                payload
                            )
                        });
                        let response = await request.json();
                        if(response.success){
                            setSmokeScreenOpened(false);
                            props.navigation.goBack();
                        }
                   }
                   else{
                       alert("Isikan semua data yang diperlukan");
                   }
               }}
               style={{marginTop:EStyleSheet.value("20rem"),backgroundColor:"#1e915a",paddingVertical:EStyleSheet.value("15rem"),borderRadius:EStyleSheet.value("10rem"),justifyContent:"center",alignItems:"center",marginBottom:EStyleSheet.value("20rem"),marginHorizontal:EStyleSheet.value("20rem")}}>
                   <Text style={{color:"white"}}>Proses</Text>
               </TouchableOpacity>
            </ScrollView>
        </View>
    )
}