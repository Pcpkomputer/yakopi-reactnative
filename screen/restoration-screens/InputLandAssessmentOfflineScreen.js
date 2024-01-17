import React,{useState,useEffect, useContext} from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, Pressable, TouchableOpacity, Text, TextInput, View, Dimensions, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import EStyleSheet from 'react-native-extended-stylesheet';

import { StatusBarHeight } from '../../utils/HeightUtils';
import { LinearGradient } from 'expo-linear-gradient';

import { CommonActions } from '@react-navigation/native';

import { Entypo, Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 
import * as Font from 'expo-font';
import {endpoint} from '../../utils/endpoint';

import {GlobalContext} from '../../App';

import RestorationTextInput from '../restoration-components/RestorationTextInput';
import RestorationSelectInput from '../restoration-components/RestorationSelectInput';
import RestorationDateInput from '../restoration-components/RestorationDateInput';
import RestorationCoordsInput from '../restoration-components/RestorationCoordsInput';
import RestorationNumberInput from '../restoration-components/RestorationNumberInput';

import DatePicker from 'react-native-modern-datepicker';

export default function InputLandAssessmentScreen(props){
    

    const globalContext = useContext(GlobalContext);
    const [KT1, setKT1] = useState(globalContext.KT1);

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
        site_position:["Pond","Riverine","Coast-line"].map((item,_)=>{return {id:item,value:item}}),
        history_location:["Former Intensive Pond","Former Oil Palm","Shrubs","Other"].map((item,_)=>{return {id:item,value:item}}),
        road_access:["Car + Motorbike + Boat","Car + Motorbike","Motorbike","Boat"].map((item,_)=>{return {id:item,value:item}}),
        land_condition:["Dry","Sometimes it's flooded","Permanently inundated"].map((item,_)=>{return {id:item,value:item}}),
        shrubs:["Pie-pie/paku laut","Teruntun","Nipah","Biduri","Legundi"].map((item,_)=>{return {id:item,value:item}}),
        pet_nuisance:["Cow","Goat","Sheep","Buffalo","There is not any"].map((item,_)=>{return {id:item,value:item}}),
        pest_potential:["Caterpillar","Grasshopper","Other"].map((item,_)=>{return {id:item,value:item}}),
        tritype_disorder_potential:["Small","Medium","Big"].map((item,_)=>{return {id:item,value:item}}),
        crab_interference_potential:["Small","Medium","Big"].map((item,_)=>{return {id:item,value:item}}),
        potential_for_waves:["Small","Medium","Big"].map((item,_)=>{return {id:item,value:item}}),
        type_of_soil:["Soft mud","Sticky","Sandy","Other"].map((item,_)=>{return {id:item,value:item}}),
    });

    // province, city, district ambil dari AsyncStorage
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
            value:"",
            form:"invoice_code",
            required:false
        },
        {
            type:"textinput",
            label:"Kode Site",
            value:"",
            form:"site_code",
            required:true
        },
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
            label:"Surveyor",
            value:"",
            form:"surveyor",
            required:true
        },
        {
            type:"dateinput",
            label:"Tanggal",
            value:"",
            form:"date_land_assessment",
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
            type:"spacer",
            label:"Lokasi",
        },
        {
            type:"selectinput",
            label:"Provinsi",
            value:{
                id:"",
                value:""
            },
            form:"province",
            required:true
        },
        {
            type:"selectinput",
            label:"Kota / Kabupaten",
            value:{
                id:"",
                value:""
            },
            form:"city",
            required:true
        },
        {
            type:"selectinput",
            label:"Kecamatan",
            value:{
                id:"",
                value:""
            },
            form:"district",
            required:true
        },
        {
            type:"textinput",
            label:"Desa",
            value:"",
            form:"village",
            required:true
        },
        {
            type:"textinput",
            label:"Dusun",
            value:"",
            form:"backwood",
            required:true
        },
        {
            type:"numberinput",
            label:"Luas Land Assessment",
            value:"",
            form:"area_land_assessment",
            required:false
        },
        {
            type:"selectinput",
            label:"Posisi Site",
            value:{
                id:"",
                value:""
            },
            form:"site_position",
            required:false
        },
        {
            type:"numberinput",
            label:"Perkiraan jumlah plot per site",
            value:"",
            form:"estimated_number_of_plots_per_site",
            required:false
        },
        {
            type:"selectinput",
            label:"Sejarah lokasi",
            value:{
                id:"",
                value:""
            },
            form:"history_location",
            required:false
        },
        {
            type:"selectinput",
            label:"Akses jalan",
            value:{
                id:"",
                value:""
            },
            form:"road_access",
            required:false
        },
        {
            type:"spacer",
            label:"Kesesuaian Lahan",
        },
        {
            type:"selectinput",
            label:"Kondisi lahan",
            value:{
                id:"",
                value:""
            },
            form:"land_condition",
            required:false
        },
        {
            type:"numberinput",
            label:"Adanya tegakan mangrove (jumlah % dan jenis-jenis yang ada)",
            value:"",
            form:"the_presence_of_mangrove_stands",
            required:false
        },
        {
            type:"selectinput",
            label:"Adanya perdu",
            value:{
                id:"",
                value:""
            },
            form:"shrubs",
            required:false
        },
        {
            type:"selectinput",
            label:"Potensi gangguan hewan peliharaan",
            value:{
                id:"",
                value:""
            },
            form:"pet_nuisance",
            required:false
        },
        {
            type:"selectinput",
            label:"Potensi hama",
            value:{
                id:"",
                value:""
            },
            form:"pest_potential",
            required:false
        },
        {
            type:"selectinput",
            label:"Potensi gangguan tritip",
            value:{
                id:"",
                value:""
            },
            form:"tritype_disorder_potential",
            required:false
        },
        {
            type:"selectinput",
            label:"Potensi gangguan kepiting",
            value:{
                id:"",
                value:""
            },
            form:"crab_interference_potential",
            required:false
        },
        {
            type:"selectinput",
            label:"Potensi gempuran ombak atau arus dari laut/pesisir",
            value:{
                id:"",
                value:""
            },
            form:"potential_for_waves",
            required:false
        },
        {
            type:"selectinput",
            label:"Jenis tanah",
            value:{
                id:"",
                value:""
            },
            form:"type_of_soil",
            required:false
        },
        {
            type:"spacer",
            label:"Catatan Khusus",
        },
        {
            type:"textinput",
            label:"Informasi penting dari anggota kelompok",
            value:"",
            form:"important_information_from_group_members",
            required:false
        },
        {
            type:"textinput",
            label:"Informasi penting lainnya yang tidak tersedia di daftar isian (biodiversity)",
            value:"",
            form:"other_important_information_from_group_members",
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
                            <RestorationTextInput  
                            key={index}
                            getter={schema}
                            setter={setSchema}
                            index={index}
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
                                else if(item.label==="Kota / Kabupaten"){
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
                    setSmokeScreenOpened(true);

                    try {
                    let required = schema.filter((item) => item.required);
                    let check = required.every((item) => {
                        if (item.type === "selectinput") {
                        return item.value.value.length > 0;
                        } else {   
                        return item.value.length > 0;
                        }
                    });

                    if (check) {
                        let filtered = schema.filter((item) => item.type !== "spacer");
                        let payload = {};
                        
                        filtered.forEach((item, index) => {
                        if (item.type === "selectinput") {
                            payload[item.form] = item.value.id;
                        } else {   
                            payload[item.form] = item.value;
                        }
                        });

                        let existingData = await AsyncStorage.getItem("KT1");
                        existingData = JSON.parse(existingData) || [];

                        let newData = [...existingData, payload];

                        setKT1(newData);
                        await AsyncStorage.setItem("KT1", JSON.stringify(newData));

                        setSmokeScreenOpened(false);
                        alert('Berhasil menyimpan data ke local');
                        props.navigation.navigate("ListLandAssessmentOffline");
                    } else {
                        setSmokeScreenOpened(false);
                        alert('Data tidak lengkap. Mohon isi semua field yang diperlukan.');
                    }
                    } catch (error) {
                    console.error("Error saving data to AsyncStorage:", error);
                    setSmokeScreenOpened(false);
                    alert("Terjadi kesalahan saat menyimpan data ke local");
                    }
                }}
                style={{
                    marginTop: EStyleSheet.value("20rem"),
                    backgroundColor: "#1e915a",
                    paddingVertical: EStyleSheet.value("15rem"),
                    borderRadius: EStyleSheet.value("10rem"),
                    justifyContent: "center",
                    alignItems: "center",
                    marginBottom: EStyleSheet.value("20rem"),
                    marginHorizontal: EStyleSheet.value("20rem"),
                }}
                >
                <Text style={{ color: "white" }}>Proses</Text>
                </TouchableOpacity>

            </ScrollView>
        </View>
    )
}