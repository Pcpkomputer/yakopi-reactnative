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

import ComdevTextInput from '../comdev-components/ComdevTextInput';
import ComdevSelectInput from '../comdev-components/ComdevSelectInput';
import ComdevNumberInput from '../comdev-components/ComdevNumberInput';

import DatePicker from 'react-native-modern-datepicker';

export default function InputComunnityOfflineScreen(props){

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
    const [comdev, setComdev] = useState(globalContext.comdev);

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
    });

    useEffect(()=>{
        AsyncStorage.getItem("localProvince").then((value)=>{
            if(value){
                setProvince(JSON.parse(value));
                setData((prev)=>{
                    return {
                        ...prev,
                        province:JSON.parse(value).map((item)=>{
                            return {
                                id:item.prov_id,
                                value:item.prov_name
                            }
                        })
                    }
                })
            }
        });

        AsyncStorage.getItem("localProject").then((value)=>{
            if(value){
                setData((prev)=>{
                    return {
                        ...prev,
                        project:JSON.parse(value).map((item)=>{
                            return {
                                id:item.id_project,
                                value:item.nama_project
                            }
                        })
                    }
                })
            }
        });
    },[]);


    const [schema, setSchema] = useState([
        {
            type:"selectinput",
            label:"Project",
            value:{
                id:"",
                value:""
            },
            form:"project",
            required:true
        },
        {
            type:"textinput",
            label:"MOU",
            value:"",
            form:"nomor_mou",
            required:true
        },
        {
            type:"textinput",
            label:"Group Name",
            value:"",
            form:"nama_kelompok",
            required:true
        },
        {
            type:"textinput",
            label:"Leader",
            value:"",
            form:"ketua_kelompok",
            required:true
        },
        {
            type:"spacer",
            label:"Location",
        },
        {
            type:"selectinput",
            label:"Province",
            value:{
                id:"",
                value:""
            },
            form:"province",
            required:true
        },
        {
            type:"selectinput",
            label:"City",
            value:{
                id:"",
                value:""
            },
            form:"city",
            required:true
        },
        {
            type:"selectinput",
            label:"District",
            value:{
                id:"",
                value:""
            },
            form:"district",
            required:true
        },
        {
            type:"textinput",
            label:"Village",
            value:"",
            form:"village",
            required:true
        },
        {
            type:"textinput",
            label:"Backwood",
            value:"",
            form:"backwood",
            required:true
        },
        {
            type:"numberinput",
            label:"Number of sites",
            value:"",
            form:"jumlah_site",
            required:true
        },
        {
            type:"numberinput",
            label:"Number of plot",
            value:"",
            form:"jumlah_plot",
            required:false
        },
        {
            type:"numberinput",
            label:"Area",
            value:"",
            form:"luas_area_mou",
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
                                            // ambil dari local storage sesuai dengan prov_id
                                            let filtered = JSON.parse(await AsyncStorage.getItem("localDistrict")).filter((item)=>{
                                                return item.prov_id===province[index].prov_id;
                                            }
                                            );
                                            setCity(filtered);
                                            setData((prev)=>{
                                                return {
                                                    ...prev,
                                                    city:filtered.map((item)=>{
                                                        return {
                                                            id:item.city_id,
                                                            value:item.city_name
                                                        }
                                                    })
                                                }
                                            })
                                            setSmokeScreenOpened(false);
                                        }
                                        else if(locationMode==="city"){
                                            setSmokeScreenOpened(true);
                                            // ambil dari local storage sesuai dengan city_id
                                            let filtered = JSON.parse(await AsyncStorage.getItem("localSubDistrict")).filter((item)=>{
                                                return item.city_id===city[index].city_id;
                                            }
                                            );
                                            setDistrict(filtered);
                                            setData((prev)=>{
                                                return {
                                                    ...prev,
                                                    district:filtered.map((item)=>{
                                                        return {
                                                            id:item.dis_id,
                                                            value:item.dis_name
                                                        }
                                                    })
                                                }
                                            })
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
                            label={item.label}/>
                           )
                       }
                        else if(item.type==="numberinput"){
                            return (
                                <ComdevNumberInput
                                getter={schema}
                                setter={setSchema}
                                index={index}
                                label={item.label}/>
                            )
                        }
                       else if(item.type==="selectinput"){
                            return (
                            <ComdevSelectInput  
                            getter={schema}
                            setter={setSchema}
                            index={index}
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
                        let payloadArray = [];
                        payloadArray.push(payload);
                        if(comdev){
                            setSmokeScreenOpened(false);
                            setComdev([...comdev,...payloadArray]);
                            AsyncStorage.setItem("comdev",JSON.stringify([...comdev,...payloadArray]));
                            alert('Berhasil menyimpan data ke local');
                            props.navigation.navigate("ListCommunityRegisterOffline");
                        }else{
                            setComdev(payloadArray);
                            AsyncStorage.setItem("comdev",JSON.stringify(payloadArray));
                            setSmokeScreenOpened(false);
                            alert('Berhasil menyimpan data ke local');
                            props.navigation.navigate("ListCommunityRegisterOffline");
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