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

import DatePicker from 'react-native-modern-datepicker';

export default function DetailPlantingActionScreen(props){

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
        project:[],
        province:[],
        city:[],
        district:[],
        transport_info:["Boat","Car","Motorcycle"].map((item,_)=>{return {id:item,value:item}}),
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
            label:"Project",
            value:{
                id:props.route.params.item.id_project || -1,
                value:props.route.params.item.nama_project || "",
            },
            form:"project",
            required:true
        },
        {
            type:"textinput",
            label:"Dilaporkan Oleh",
            value:props.route.params.item.dilaporkan_oleh || "",
            form:"dilaporkan_oleh",
            required:true
        },
        {
            type:"spacer",
            label:"Lokasi",
        },
        {
            type:"selectinput",
            label:"Provinsi",
            value:{
                id:props.route.params.item.id_province || -1,
                value:props.route.params.item.prov_name || "",
            },
            form:"province",
            required:true
        },
        {
            type:"selectinput",
            label:"Kota/Kabupaten",
            value:{
                id:props.route.params.item.id_cities || -1,
                value:props.route.params.item.city_name || "",
            },
            form:"city",
            required:true
        },
        {
            type:"selectinput",
            label:"Kecamatan",
            value:{
                id:props.route.params.item.id_districts || -1,
                value:props.route.params.item.dis_name || "",
            },
            form:"district",
            required:true
        },
        {
            type:"textinput",
            label:"Desa",
            value:props.route.params.item.nama_desa || "",
            form:"village",
            required:true
        },
        {
            type:"textinput",
            label:"Dusun",
            value:props.route.params.item.nama_dusun || "",
            form:"backwood",
            required:true
        },
        {
            type:"selectinput",
            label:"Transportasi yang digunakan untuk mengangkut bibit ke lokasi tanam",
            value:{
                id:"",
                value:props.route.params.item.transport_info || "",
            },
            form:"transport_info",
            required:false
        },
        {
            type:"spacer",
            label:"Lokasi Tujuan",
        },
        {
            type:"textinput",
            label:"Kab/Kota",
            value:props.route.params.item.daerah_tujuan || "",
            form:"daerah_tujuan",
            required:false
        },
        {
            type:"textinput",
            label:"Kecamatan",
            value:props.route.params.item.kecamatan || "",
            form:"kecamatan",
            required:false
        },
        {
            type:"textinput",
            label:"Desa",
            value:props.route.params.item.desa || "",
            form:"desa",
            required:false
        },
        {
            type:"textinput",
            label:"Dusun",
            value:props.route.params.item.dusun || "",
            form:"dusun",
            required:false
        },
        {
            type:"spacer",
            label:"Catatan Khusus",
        },
        {
            type:"textinput",
            label:"Informasi penting dari anggota kelompok",
            value:props.route.params.item.catatan_1 || "",
            form:"catatan_1",
            required:false
        },
        {
            type:"textinput",
            label:"Informasi penting lainnya yang tidak tersedia di daftar isian",
            value:props.route.params.item.catatan_2 || "",
            form:"catatan_2",
            required:false
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
            <View style={{...shadow,backgroundColor:"white",flexDirection:"row",paddingHorizontal:EStyleSheet.value("20rem"),alignItems:"center",height:EStyleSheet.value("55rem")}}>
                 <TouchableOpacity
                activeOpacity={0.8}
                onPress={()=>{
                    props.navigation.goBack();
                }}
                >
                    <Entypo name="chevron-left" size={EStyleSheet.value("20rem")} color="black" />
                </TouchableOpacity>
                <View style={{position:"absolute",justifyContent:"center",alignItems:"center",width:Dimensions.get("screen").width}}>
                    <Text style={{fontWeight:"bold",color:"black"}}>DETAIL KT-5</Text>
                </View>
            </View>
            <ScrollView
            keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag"
            >
               {
                   schema.map((item,index)=>{
                       if(item.type==="textinput"){
                            return (
                            <RestorationTextInput  
                            getter={schema}
                            setter={setSchema}
                            index={index}
                            disable={true}
                            label={item.label}/>
                           )
                       }
                       else if(item.type==="selectinput"){
                            return (
                            <RestorationSelectInput  
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
                       else if(item.type==="dateinput"){
                        return (
                        <RestorationDateInput  
                        getter={schema}
                        setter={setSchema}
                        index={index}
                        disable={true}
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
                        disable={true}
                        setter={setSchema}
                        keyboardType="numeric"
                        index={index}
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
               {/* <TouchableOpacity 
               activeOpacity={0.8}
               onPress={()=>{
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
                   }
                   else{
                       alert("Isikan semua data yang diperlukan");
                   }
               }}
               style={{marginTop:EStyleSheet.value("20rem"),backgroundColor:"#1e915a",paddingVertical:EStyleSheet.value("15rem"),borderRadius:EStyleSheet.value("10rem"),justifyContent:"center",alignItems:"center",marginBottom:EStyleSheet.value("20rem"),marginHorizontal:EStyleSheet.value("20rem")}}>
                   <Text style={{color:"white"}}>Proses</Text>
               </TouchableOpacity> */}
            </ScrollView>
        </View>
    )
}