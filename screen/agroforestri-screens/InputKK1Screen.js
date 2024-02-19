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

export default function InputKK1Screen(props){
    

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
        posisi_site:["Ladang","Pekarangan"].map((item,_)=>{return {id:item,value:item}}),
        sejarah_lokasi:["Bekas Kopi","Semak Belukar","Lainnya"].map((item,_)=>{return {id:item,value:item}}),
        akses_jalan:["Mobil + sp. motor","Hanya spd motor","Jalan Kaki"].map((item,_)=>{return {id:item,value:item}}),
        perdu:["Kopi","Petai Cina","Jeruk","Lainnya"].map((item,_)=>{return {id:item,value:item}}),
        gangguan_hewan:["Sapi","Kambing","Domba","Kerbau","Tidak Ada"].map((item,_)=>{return {id:item,value:item}}),
        hama:["Ulat","Belalang","Penggerek Buah","Lainnya"].map((item,_)=>{return {id:item,value:item}}),
        longsor_erosi:["Kecil","Sedang","Besar"].map((item,_)=>{return {id:item,value:item}}),
        jenis_tanah:["Tanah Berpasir","Liat/Lempung","Lempung Berpasir","Lainnya"].map((item,_)=>{return {id:item,value:item}}),
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
            form:"nama_surveyor",
            required:true
        },
        {
            type:"dateinput",
            label:"Tanggal",
            value:"",
            form:"date_kt1",
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
            type:"selectinput",
            label:"Posisi Site",
            value:{
                id:"",
                value:""
            },
            form:"posisi_site",
            required:false
        },
        {
            type:"numberinput",
            label:"Perkiraan jumlah plot per site",
            value:"",
            form:"perkiraan_jumlah_plot",
            required:false
        },
        {
            type:"selectinput",
            label:"Sejarah lokasi",
            value:{
                id:"",
                value:""
            },
            form:"sejarah_lokasi",
            required:false
        },
        {
            type:"selectinput",
            label:"Akses jalan",
            value:{
                id:"",
                value:""
            },
            form:"akses_jalan",
            required:false
        },
        {
            type:"spacer",
            label:"Kesesuaian Lahan",
        },
        {
            type:"numberinput",
            label:"Ketinggian",
            value:"",
            form:"ketinggian",
            required:false
        },
        {
            type:"numberinput",
            label:"Kemiringan",
            value:"",
            form:"kemiringan",
            required:false
        },
        {
            type:"textinput",
            label:"Adanya tanaman keras/pohon (jumlah % dan jenis-jenis yang ada)",
            value:"",
            form:"adanya_tanaman_keras",
            required:true
        },
        {
            type:"textinput",
            label:"PH Tanah",
            value:"",
            form:"ph_tanah",
            required:true
        },
        {
            type:"selectinput",
            label:"Adanya perdu ",
            value:{
                id:"",
                value:""
            },
            form:"perdu",
            required:false
        },
        
        {
            type:"selectinput",
            label:"Potensi gangguan hewan peliharaan",
            value:{
                id:"",
                value:""
            },
            form:"gangguan_hewan",
            required:false
        },
        {
            type:"selectinput",
            label:"Potensi hama",
            value:{
                id:"",
                value:""
            },
            form:"hama",
            required:false
        },
        {
            type:"selectinput",
            label:"Potensi longsor dan erosi",
            value:{
                id:"",
                value:""
            },
            form:"longsor_erosi",
            required:false
        },
        {
            type:"selectinput",
            label:"Jenis tanah",
            value:{
                id:"",
                value:""
            },
            form:"jenis_tanah",
            required:false
        },
        {
            type:"textinput",
            label:"Jarak sumber air",
            value:"",
            form:"jenis_sumber_air",
            required:true
        },
        {
            type:"spacer",
            label:"Catatan Khusus",
        },
        {
            type:"textinput",
            label:"Informasi penting dari anggota kelompok",
            value:"",
            form:"informasi_1",
            required:false
        },
        {
            type:"textinput",
            label:"Informasi penting lainnya yang tidak tersedia di daftar isian (biodiversity)",
            value:"",
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
                        try{
                            let request = await fetch(`${endpoint}/agroforest-kt1`,{
                                method:"POST",
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