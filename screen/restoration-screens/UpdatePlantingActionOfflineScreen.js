import React,{useState,useEffect, useContext} from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, Pressable, TouchableOpacity, Text, TextInput, View, Dimensions, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EStyleSheet from 'react-native-extended-stylesheet';

import { StatusBarHeight } from '../../utils/HeightUtils';
import { LinearGradient } from 'expo-linear-gradient';

import { CommonActions, useIsFocused } from '@react-navigation/native';

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

export default function UpdatePlantingActionOfflineScreen(props){

    

    const globalContext = useContext(GlobalContext);

    const focused = useIsFocused();

    const [projectSelected,setProjectSelected] = useState("");
    
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
    const [provinceSelected,setProvinceSelected] = useState([]);
    const [city, setCity] = useState([]);
    const [citySelected, setCitySelected] = useState([]);
    const [district, setDistrict] = useState([]);
    const [districtSelected, setDistrictSelected] = useState([]);

    const index = props.route.params.index;

    const [KT4, setKT4] = useState(globalContext.KT4);
    console.log(KT4,"KT4");
    const [list, setList] = useState([]);

    let fetchProjectById = async (id)=>{
        let request = await fetch(`${endpoint}/project/${id}`,{
            method:"GET",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`
            }
        });
        let response = await request.json();
        setProjectSelected(response.data[0].nama_project);
    
        // Update state 'schema' with the selected project
        setSchema(prevSchema => {
            return prevSchema.map(item => {
                if (item.form === "project") {
                    return {
                        ...item,
                        value: {
                            id: id,
                            value: response.data[0].nama_project
                        }
                    };
                }
                return item;
            });
        });
    }
    
    

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

    let fetchProvinceById = async (id)=>{
        let request = await fetch(`${endpoint}/province/${id}`,{
            method:"GET",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`
            }
        });
        let response = await request.json();
        setProvinceSelected(response.data[0].prov_name);

        setSchema(prevSchema => {
            return prevSchema.map(item => {
                if (item.form === "province") {
                    return {
                        ...item,
                        value: {
                            id: id,
                            value: response.data[0].prov_name
                        }
                    };
                }
                return item;
            });
        }
        );

    }

    let fetchCityById = async (id)=>{
        let request = await fetch(`${endpoint}/city/${id}`,{
            method:"GET",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`
            }
        });
        let response = await request.json();
        setCitySelected(response.data[0].city_name);

        setSchema(prevSchema => {
            return prevSchema.map(item => {
                if (item.form === "city") {
                    return {
                        ...item,
                        value: {
                            id: id,
                            value: response.data[0].city_name
                        }
                    };
                }
                return item;
            });
        }
        );
    }

    let fetchDistrictById = async (id)=>{
        let request = await fetch(`${endpoint}/district/${id}`,{
            method:"GET",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`
            }
        });
        let response = await request.json();
        setDistrictSelected(response.data[0].dis_name);

        setSchema(prevSchema => {
            return prevSchema.map(item => {
                if (item.form === "district") {
                    return {
                        ...item,
                        value: {
                            id: id,
                            value: response.data[0].dis_name
                        }
                    };
                }
                return item;
            });
        }
        );
    }
            



    let fetchList = async () => {
        setListLoading(true);
        
        let list = await AsyncStorage.getItem("KT4");
        list = JSON.parse(list);
        if(list===null){
            list = [];
        }
        setList(list[props.route.params.index]);

        let KT4 = KT4[props.route.params.index];
        setKT4(KT4[props.route.params.index]);
        setList(KT4[props.route.params.index]);
    };


    useEffect(()=>{
        if(focused){
            fetchList();
            fetchProject();
            fetchProvince();
            if (KT4 && KT4.length > 0 && KT4[index]) {
                fetchProjectById(KT4[index].project);
                fetchProvinceById(KT4[index].province);
                fetchCityById(KT4[index].city);
                fetchDistrictById(KT4[index].district);
            }
        }
    },[focused]);

    const [data,setData] = useState({
        project:[],
        province:[],
        city:[],
        district:[],
        lokasi_tanam:["Pond","Riverine","Coast-line"].map((item,_)=>{return {id:item,value:item}}),
        transportation:["Boat","Car","Motorcycle"].map((item,_)=>{return {id:item,value:item}}),
    });



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


    const [schema, setSchema] = useState([
        {
            type:"textinput",
            label:"Invoice Code",
            value:KT4[props.route.params.index].invoice_code,
            form:"invoice_code",
            required:false
        },
        {
            type:"selectinput",
            label:"Project",
            value:{
                id:KT4[props.route.params.index].id_project,
                value:projectSelected || "",
            },
            form:"project",
            required:true
        },
        {
            type:"textinput",
            label:"Dilaporkan Oleh",
            value:KT4[props.route.params.index].dilaporkan_oleh || "",
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
                id:KT4[props.route.params.index].id_provinces,
                value:provinceSelected || "",
            },
            form:"province",
            required:true
        },
        {
            type:"selectinput",
            label:"Kota/Kabupaten",
            value:{
                id:KT4[props.route.params.index].id_cities,
                value:citySelected || "",
            },
            form:"city",
            required:true
        },
        {
            type:"selectinput",
            label:"Kecamatan",
            value:{
                id:KT4[props.route.params.index].id_districts,
                value:districtSelected || "",
            },
            form:"district",
            required:true
        },
        {
            type:"textinput",
            label:"Desa",
            value:KT4[props.route.params.index].village || "",
            form:"village",
            required:true
        },
        {
            type:"textinput",
            label:"Dusun",
            value:KT4[props.route.params.index].backwood || "",
            form:"backwood",
            required:true
        },
        {
            type:"textinput",
            label:"Jarak tanam dan kerapatan bibit",
            value:KT4[props.route.params.index].jarak_tanam || "",
            form:"jarak_tanam",
            required:true
        },
        {
            type:"selectinput",
            label:"Sub-ekosistem lokasi tanam",
            value:{
                id:"",
                value:KT4[props.route.params.index].lokasi_tanam || "",
            },
            form:"lokasi_tanam",
            required:true
        },
        {
            type:"textinput",
            label:"Keberadaan jenis-jenis mangrove yang sudah ada di lokasi tanam dan perkiraan persentasenya   ",
            value:KT4[props.route.params.index].info_1 || "",
            form:"info_1",
            required:true
        },
        {
            type:"selectinput",
            label:"Transportasi yang digunakan untuk mengangkut bibit ke lokasi tanam",
            value:{
                id:KT4[props.route.params.index].transportation,
                value:KT4[props.route.params.index].transportation || "",
            },
            form:"transportation",
            required:true
        },
        {
            type:"spacer",
            label:"Catatan Khusus",
        },
        {
            type:"textarea",
            label:"Informasi penting dari anggota kelompok",
            value:KT4[props.route.params.index].catatan_1 || "",
            form:"catatan_1",
            required:true
        },
        {
            type:"textarea",
            label:"Informasi penting lainnya yang tidak tersedia di daftar isian",
            value:KT4[props.route.params.index].catatan_2 || "",
            form:"catatan_2",
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
                            key={index}
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
                       else if(item.type==="numberinput"){
                            return (
                            <RestorationNumberInput
                            key={index}
                            getter={schema}
                            setter={setSchema}
                            index={index}
                            label={item.label}/>
                            )
                        }
                       else if(item.type==="selectinput"){
                            return (
                            <RestorationSelectInput  
                            key={index}
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
                        key={index}
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
                        key={index}
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
                                                latitude:location.coords.latitude,
                                                longitude:location.coords.longitude
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
                        // update KT4 local storage and state global yang index nya sesuai dengan index dan update datanya sesuai dengan schema
                        let KT4 = await AsyncStorage.getItem("KT4");
                        KT4 = JSON.parse(KT4);
                        KT4[index] = payload;
                        console.log(KT4,"KT4");
                        setKT4(KT4);
                        await AsyncStorage.setItem("KT4",JSON.stringify(KT4));
                        setSmokeScreenOpened(false);
                        props.navigation.dispatch(CommonActions.goBack());
                  
               }}
               style={{marginTop:EStyleSheet.value("20rem"),backgroundColor:"#1e915a",paddingVertical:EStyleSheet.value("15rem"),borderRadius:EStyleSheet.value("10rem"),justifyContent:"center",alignItems:"center",marginBottom:EStyleSheet.value("20rem"),marginHorizontal:EStyleSheet.value("20rem")}}>
                   <Text style={{color:"white"}}>Proses</Text>
               </TouchableOpacity>
            </ScrollView>
        </View>
    )
}