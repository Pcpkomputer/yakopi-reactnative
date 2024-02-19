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
import RestorationTextAreaInput from '../restoration-components/RestorationTextAreaInput';

import DatePicker from 'react-native-modern-datepicker';

export default function UpdateKK7Screen(props){

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
        lokasi_tanam:["field/Ladang","yard/pekarangan"].map((item,_)=>{return {id:item,value:item}}),
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
        setSmokeScreenOpened(true);
        Promise.all([fetchProject(),fetchProvince()]).then(()=>{
            setSmokeScreenOpened(false);
        })
    },[]);


    const [schema, setSchema] = useState([
        {
            type:"textinput",
            label:"Invoice Code",
            value:props.route.params.item.invoice_code || "", 
            form:"invoice_code",
            required:false
        },
        {
            type:"textinput",
            label:"Kode Site",
            value:props.route.params.item.site_code || "",
            form:"site_code",
            required:true
        },
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
            label:"Surveyor",
            value:props.route.params.item.nama_surveyor || "",
            form:"nama_surveyor",
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
                id:props.route.params.item.id_provinces || -1,
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
            type:"textinput",
            label:"Tanggal Kegiatan/Monitoring Ke",
            value:props.route.params.item.kegaiatan || "",
            form:"kegaiatan",
            required:true
        },
        {
            type:"selectinput",
            label:"Sub-ekosistem lokasi tanam",
            value:{
                id:props.route.params.item.lokasi_tanam || -1,
                value:props.route.params.item.lokasi_tanam || "",
            },
            form:"lokasi_tanam",
            required:true
        },
        {
            type:"textinput",
            label:"Jarak tanam dan kerapatan bibit",
            value:props.route.params.item.jarak_tanam || "",
            form:"jarak_tanam",
            required:true
        },
        {
            type:"textinput",
            label:"Keberadaan jenis-jenis mangrove yang sudah ada di lokasi tanam dan perkiraan persentasenya",
            value:props.route.params.item.jenis_mangrove || "",
            form:"jenis_mangrove",
            required:true
        },
        {
            type:"spacer",
            label:"Catatan Khusus",
        },
        {
            type:"textinput",
            label:"Informasi penting dari anggota kelompok",
            value:props.route.params.item.informasi_1 || "",
            form:"informasi_1",
            required:false
        },
        {
            type:"textinput",
            label:"Informasi penting lainnya yang tidak tersedia di daftar isian",
            value:props.route.params.item.informasi_2 || "",
            form:"informasi_2",
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
                            label={item.label}/>
                           )
                       }
                       else if(item.type==="textarea"){
                        return (
                            <RestorationTextAreaInput  
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
                            item={data[item.label]}
                            onSelectPress={()=>{
                                setShowSelectInput(true);
                                setListSelectInput(data[item.form]);
                                setLabelSelectInput(item.label);
                                setIndexSelectInput(index);
                                if(item.label==="Provinsi"){
                                    setLocationMode("province");
                                }
                                else if(item.label==="Kota/Kabupaten"){
                                    setLocationMode("city");
                                }
                                else if(item.label==="Kecamatan"){
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
                   console.log(check);
                    
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
                    try{
                        let request = await fetch(`${endpoint}/agroforest-kt7/update/${props.route.params.item.id_agroforest_kt7}`,{
                            method:"PUT",
                            headers:{
                                "authorization":`Bearer ${globalContext.credentials.token}`,
                                "content-type":"application/json"
                            },
                            body:JSON.stringify(payload)
                        });
                        console.log(payload);
                        let response = await request.json();
                        if(response.success){
                            setSmokeScreenOpened(false);
                            props.navigation.goBack();
                        }else{
                            setSmokeScreenOpened(false);
                            alert(response.message);
                        }
                    }catch(e){
                        setSmokeScreenOpened(false);
                        alert(e.message);
                    }
               }}
               style={{marginTop:EStyleSheet.value("20rem"),backgroundColor:"#1e915a",paddingVertical:EStyleSheet.value("15rem"),borderRadius:EStyleSheet.value("10rem"),justifyContent:"center",alignItems:"center",marginBottom:EStyleSheet.value("20rem"),marginHorizontal:EStyleSheet.value("20rem")}}>
                   <Text style={{color:"white"}}>Proses</Text>
               </TouchableOpacity>
            </ScrollView>
        </View>
    )
}