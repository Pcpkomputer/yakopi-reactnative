import React,{useState,useEffect, useContext} from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, Pressable, AsyncStorage, TouchableOpacity, Text, TextInput, View, Dimensions, Image, FlatList, Alert, BackHandler, Linking } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import { StatusBarHeight } from '../../utils/HeightUtils';
import { LinearGradient } from 'expo-linear-gradient';

import { CommonActions } from '@react-navigation/native';

import { Entypo, Feather, FontAwesome, AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 

import * as ImagePicker from 'expo-image-picker';

import * as Location from 'expo-location';

import {endpoint} from '../../utils/endpoint';

import {GlobalContext} from '../../App';

import Platform from 'react-native';

import DatePicker from 'react-native-modern-datepicker';

export default function SeedPlotBoundaringScreen(props){

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

    function createUUID() {
      // http://www.ietf.org/rfc/rfc4122.txt
      var s = [];
      var hexDigits = "0123456789abcdef";
      for (var i = 0; i < 36; i++) {
          s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
      }
      s[14] = "4";  // bits 12-15 of the time_hi_and_version field to 0010
      s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1);  // bits 6-7 of the clock_seq_hi_and_reserved to 01
      s[8] = s[13] = s[18] = s[23] = "-";
  
      var uuid = s.join("");
      return uuid;
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
    let [nama, setNama] = useState("");
    let [latitude, setLatitude] = useState("");
    let [longitude, setLongitude] = useState("");

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
        let id = props.route.params.id_plot_boundaring;
        let request = await fetch(`${endpoint}/seed-plot-boundering`,{
            method:"POST",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`,
                "content-type":"application/json"
            },
            body:JSON.stringify({
              id_plot_boundaring:id
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
            headerTitle: `BIBIT`
        });
    },[])

    return (
        <View style={{flex:1}}>


            {
                (modalKeteranganOpened) &&
                <View style={{position:"absolute",width:"100%",zIndex:999,height:"100%",justifyContent:"center",alignItems:"center"}}>
                    <View style={{...shadow,backgroundColor:"white",width:Dimensions.get("screen").width-EStyleSheet.value("60rem"),borderRadius:EStyleSheet.value("5rem"),padding:EStyleSheet.value("20rem")}}>
                        {/* buat agar kesamping dan ada border ya */}
                        <View style={{flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                            <Text style={{fontSize:EStyleSheet.value("20rem")}}>Tambah Data</Text>
                            <TouchableOpacity onPress={()=>setModalKeteranganOpened(false)}>
                                <AntDesign name="close" size={EStyleSheet.value("30rem")} color="black" />
                            </TouchableOpacity>
                        </View>
                        <View style={{marginTop:EStyleSheet.value("20rem")}}>
                            <Text>Keterangan</Text>
                            <TextInput
                            value={keterangan}
                            onChangeText={(text)=>setKeterangan(text)}
                            placeholder="Keterangan"
                            style={{borderWidth:1,borderColor:"#e8e8e8",padding:EStyleSheet.value("10rem"),borderRadius:EStyleSheet.value("5rem")}}/>
                        </View>
                        <View style={{marginTop:EStyleSheet.value("20rem")}}>
                            <Text>Nama Bibit</Text>
                            <TextInput
                            value={nama}
                            onChangeText={(text)=>setNama(text)}
                            placeholder="Nama Bibit"
                            style={{borderWidth:1,borderColor:"#e8e8e8",padding:EStyleSheet.value("10rem"),borderRadius:EStyleSheet.value("5rem")}}/>
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

                                    let id = props.route.params.id_plot_boundaring;

                                    // ambil latitude dan longitude dengan expo location
                                    // izin lokasi
                                    let { status } = await Location.requestPermissionsAsync();
                                    if (status !== 'granted') {
                                        alert('Izin lokasi diperlukan untuk mengambil lokasi');
                                    }
                                    else{
                                        let location = await Location.getCurrentPositionAsync({});
                                        setLatitude(location.coords.latitude);
                                        setLongitude(location.coords.longitude);
                                    }


                                   try{
                                    let req2 = await fetch(`${endpoint}/add-seed-plot-boundering`,{
                                        method:"POST",
                                        headers:{
                                            "authorization":`Bearer ${globalContext.credentials.token}`,
                                            "content-type":"application/json"
                                        },
                                        body:JSON.stringify({
                                          id_plot_boundaring:id,
                                          nama_bibit:nama,
                                          latitude:latitude,
                                          longitude:longitude,
                                          gambar:url,
                                          keterangan:keterangan
                                        })
                                    });
                                    let res2 = await req2.json();

                                    console.log(res2);
                                    
                                    if(res2.success){
                                        alert(res2.msg);
                                        setKeterangan("");
                                        setNama("");
                                        setImageLoading(false);
                                        await fetchImage();
                                    }else{
                                        alert(res2.msg);
                                        setKeterangan("");
                                        setNama("");
                                        setImageLoading(false);
                                    }
                                  }catch(e){
                                    alert("Gagal menambahkan data");
                                    setKeterangan("");
                                    setNama("");
                                    setImageLoading(false);
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
                                        <Image style={{width:"100%",height:"100%"}} source={{uri:`${endpoint.replace(/api(.?)/g,"")}${item.gambar}`}}></Image>                                        
                                </View>
                                <View style={{position:"absolute",zIndex:10,bottom:EStyleSheet.value("20rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                                    <Text style={{color:"white",fontSize:EStyleSheet.value("20rem")}}>{item.nama_bibit}</Text>
                                    <Text style={{color:"white",fontSize:EStyleSheet.value("10rem")}}>{item.keterangan}</Text>
                                </View>
                                <LinearGradient
                                style={{position:"absolute",bottom:0,width:"100%",height:"50%"}}
                                colors={['transparent', 'rgba(0,0,0,0.5)']}>
                                </LinearGradient>
                                <TouchableOpacity 
                                activeOpacity={0.8}
                                onPress={()=>{
                                    Linking.openURL(`https://www.google.com/maps/search/?api=1&query=${item.latitude},${item.longtitude}`);
                                }}
                                style={{position:"absolute",top:EStyleSheet.value("20rem"),left:EStyleSheet.value("20rem"),backgroundColor:"#1e915a",paddingHorizontal:EStyleSheet.value("10rem"),paddingVertical:EStyleSheet.value("10rem"),borderRadius:EStyleSheet.value("5rem")}}>
                                    <Text style={{color:"white"}}>Lihat Lokasi</Text>
                                </TouchableOpacity>
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
                      
                                                    let id = item.id_plot_boundaring_seed
                                                    let request = await fetch(`${endpoint}/delete-seed-plot-boundering`,{
                                                        method:"DELETE",
                                                        headers:{
                                                            "authorization":`Bearer ${globalContext.credentials.token}`,
                                                            "content-type":"application/json"
                                                        },
                                                        body:JSON.stringify({
                                                          id_plot_boundaring_seed:id
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