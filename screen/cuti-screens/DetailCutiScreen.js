import React,{useState,useEffect, useContext} from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, Pressable, AsyncStorage, TouchableOpacity, Text, TextInput, View, Dimensions, Image } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import { StatusBarHeight } from '../../utils/HeightUtils';
import { LinearGradient } from 'expo-linear-gradient';

import { CommonActions } from '@react-navigation/native';

import { Entypo, Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 

import {endpoint} from '../../utils/endpoint';

import {GlobalContext} from '../../App';

import ComdevTextInput from '../comdev-components/ComdevTextInput';
import ComdevSelectInput from '../comdev-components/ComdevSelectInput';

import DatePicker from 'react-native-modern-datepicker';

export default function DetailCutiScreen(props){

    useEffect(()=>{
        console.log(props.route.params.item);
    },[])

    const globalContext = useContext(GlobalContext);

    const [showSelectDateInput, setShowSelectDateInput] = useState(false);
    const [labelSelectDateInput, setLabelSelectDateInput] = useState("");
    const [indexSelectDateInput, setIndexSelectDateInput] = useState(-1);

    const [showSelectInput, setShowSelectInput] = useState(false);
    const [listSelectInput, setListSelectInput] = useState([]);
    const [labelSelectInput, setLabelSelectInput] = useState("");
    const [indexSelectInput, setIndexSelectInput] = useState(-1);

    const [smokeScreenOpened, setSmokeScreenOpened] = useState(false);

    const [locationMode,setLocationMode] = useState(null);
    const [province,setProvince] = useState([]);
    const [city, setCity] = useState([]);
    const [district, setDistrict] = useState([]);

    const [data,setData] = useState({
        id_kategori_cuti:[],
        project:[],
        province:[],
        city:[],
        district:[],
    });

    let fetchProject = async ()=>{
        let request = await fetch(`${endpoint}/project`,{
            method:"GET",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`
            }
        });
        let response = await request.json();
        setData((prev)=>{
            return {
                ...prev,
                project:response.data.map((item)=>{
                    return {
                        id:item.id_project,
                        value:item.nama_project
                    }
                })
            }
        })
    }

    let fetchKategoriCuti = async ()=>{
        let request = await fetch(`${endpoint}/kategori-cuti`,{
            method:"GET",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`
            }
        });
        let response = await request.json();
        setData((prev)=>{
            return {
                ...prev,
                id_kategori_cuti:response.data.map((item)=>{
                    return {
                        id:item.id_kategori_cuti,
                        value:item.nama_kategori_cuti
                    }
                })
            }
        })
    }

    let fetchProvince = async ()=>{
        let request = await fetch(`${endpoint}/province`,{
            method:"GET",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`
            }
        });
        let response = await request.json();
        setProvince(response.data);
        setData((prev)=>{
            return {
                ...prev,
                province:response.data.map((item)=>{
                    return {
                        id:item.prov_id,
                        value:item.prov_name
                    }
                })
            }
        })
    }

    useEffect(()=>{
        fetchProject();
        fetchProvince();
    },[]);


    const [schema, setSchema] = useState([
        {
            type:"selectinput",
            label:"Kategori Cuti",
            value:{
                id:props.route.params.item.id_kategori_cuti || -1,
                value:props.route.params.item.nama_kategori_cuti || "",
            },
            form:"id_kategori_cuti",
            required:true
        },
        {
            type:"textinput",
            label:"Tanggal Mulai Cuti",
            value:props.route.params.item.tanggal_mulai_cuti || "",
            form:"tanggal_mulai_cuti",
            required:true
        },
        {
            type:"textinput",
            label:"Tanggal Selesai Cuti",
            value:props.route.params.item.tanggal_selesai_cuti || "",
            form:"tanggal_selesai_cuti",
            required:true
        },
        {
            type:"textinput",
            label:"Keterangan Cuti",
            value:props.route.params.item.keterangan_cuti || "",
            form:"keterangan_cuti",
            required:true
        },
        {
            type:"textinput",
            label:"Status Cuti",
            value:props.route.params.item.status_cuti || "",
            form:"status_cuti",
            required:true
        },
        {
            type:"textinput",
            label:"Diterima Oleh",
            value:props.route.params.item.diterima_oleh || "",
            form:"diterima_oleh",
            required:true
        },
        {
            type:"textinput",
            label:"Keterangan Diterima",
            value:props.route.params.item.keterangan_diterima || "",
            form:"keterangan_diterima",
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
            (showSelectInput) &&
            <View style={{position:"absolute",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",zIndex:1000}}>
                <Pressable 
                onPress={()=>{
                    setShowSelectInput(false);
                }}
                style={{backgroundColor:"black",position:"absolute",opacity:0.2,width:"100%",height:"100%",zIndex:999}}></Pressable>
                <View style={{backgroundColor:"white",overflow:"hidden",width:Dimensions.get("screen").width-EStyleSheet.value("50rem"),borderRadius:EStyleSheet.value("5rem"),zIndex:1000}}>
                    <View style={{height:EStyleSheet.value("50rem"),backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center"}}>
                        <Text>{labelSelectInput}</Text>
                    </View>
                    <ScrollView style={{height:EStyleSheet.value("200rem")}}>
                        {
                            listSelectInput.map((item,index)=>{
                                return (
                                    <Pressable 
                                    onPress={async ()=>{
                                        setSchema((prev)=>{
                                            return prev.map((item_,i)=>{
                                                if(i===indexSelectInput){
                                                    return {
                                                        ...item_,
                                                        value:{
                                                            ...item_.value,
                                                            id:item.id,
                                                            value:item.value
                                                        }
                                                    }
                                                }
                                                return item_;
                                            })
                                        });
                                        setShowSelectInput(false);
                                        
                                        if(locationMode==="province"){
                                            setSmokeScreenOpened(true);
                                            let prov_id = province[index].prov_id;
                                            let request = await fetch(`${endpoint}/city/${prov_id}`,{
                                                method:"GET",
                                                headers:{
                                                    "authorization":`Bearer ${globalContext.credentials.token}`
                                                }
                                            });
                                            let response = await request.json();
                                            setCity(response.data);
                                            setData((prev)=>{
                                                return {
                                                    ...prev,
                                                    city:response.data.map((item)=>{
                                                        return {
                                                            id:item.city_id,
                                                            value:item.city_name
                                                        }
                                                    })
                                                }
                                            });
                                            setSmokeScreenOpened(false);
                                        }
                                        else if(locationMode==="city"){
                                            let city_id = city[index].city_id;
                                            setSmokeScreenOpened(true);
                                            let prov_id = province[index].prov_id;
                                            let request = await fetch(`${endpoint}/district/${city_id}`,{
                                                method:"GET",
                                                headers:{
                                                    "authorization":`Bearer ${globalContext.credentials.token}`
                                                }
                                            });
                                            let response = await request.json();
                                            console.log(response);
                                            setDistrict(response.data);
                                            setData((prev)=>{
                                                return {
                                                    ...prev,
                                                    district:response.data.map((item)=>{
                                                        return {
                                                            id:item.dis_id,
                                                            value:item.dis_name
                                                        }
                                                    })
                                                }
                                            });
                                            setSmokeScreenOpened(false);
                                        }
                                    }}
                                    android_ripple={{
                                        color:"#e8e8e8"
                                    }}
                                    style={{paddingVertical:EStyleSheet.value("20rem"),justifyContent:"center",alignItems:"center"}}>
                                        <Text>{item.value}</Text>
                                    </Pressable>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </View>
        }


            <View style={{height:StatusBarHeight}}></View>
            <View style={{backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center",height:EStyleSheet.value("50rem")}}>
                <Text style={{fontSize:EStyleSheet.value("16rem"),color:"#a9adb8"}}>Detail Cuti</Text>
            </View>
            <ScrollView
            keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag"
            >
               {
                   schema.map((item,index)=>{
                       if(item.type==="textinput"){
                            return (
                            <ComdevTextInput  
                            getter={schema}
                            setter={setSchema}
                            index={index}
                            disable={true}
                            label={item.label}/>
                           )
                       }
                       else if(item.type==="selectinput"){
                            return (
                            <ComdevSelectInput  
                            getter={schema}
                            setter={setSchema}
                            index={index}
                            disable={true}
                            item={data[item.label]}
                            onSelectPress={()=>{
                                setShowSelectInput(true);
                                setListSelectInput(data[item.form]);
                                setLabelSelectInput(item.label);
                                setIndexSelectInput(index);
                                if(item.label==="Province"){
                                    setLocationMode("province");
                                }
                                else if(item.label==="City"){
                                    setLocationMode("city");
                                }
                                else if(item.label==="District"){
                                    setLocationMode("district");
                                }
                                else {
                                    setLocationMode(null);
                                }
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
               <View style={{height:EStyleSheet.value("30rem")}}></View>
               
            </ScrollView>
        </View>
    )
}