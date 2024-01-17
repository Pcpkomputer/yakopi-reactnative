import React,{useState,useEffect, useContext} from 'react';
import { StyleSheet, Platform, ScrollView, ActivityIndicator, Alert, Linking,  TouchableOpacity, Text, TextInput, View, Dimensions, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import EStyleSheet from 'react-native-extended-stylesheet';

import { StatusBarHeight } from '../../utils/HeightUtils';
import { LinearGradient } from 'expo-linear-gradient';

import { CommonActions, useIsFocused } from '@react-navigation/native';

import { toLocaleTimestamp } from '../../utils/utils';

import { Entypo, Feather, FontAwesome, AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 

import {endpoint} from '../../utils/endpoint';

import {GlobalContext} from '../../App';

import NetInfo from '@react-native-community/netinfo';


export default function ListPlantingActionScreen(props){

    const focused = useIsFocused();

    const globalContext = useContext(GlobalContext);
    const [credentials,setCredentials] = useState(globalContext.credentials);
    const [KT4, setKT4] = useState(globalContext.KT4);
    const [KT4Kind, setKT4Kind] = useState(globalContext.KT4Kind);

    const [listLoading, setListLoading] = useState(true);
    const [list, setList] = useState([]);

    const [isConnected, setIsConnected] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setIsConnected(state.isConnected);
        });
        return () => {
            unsubscribe();
        }
    }
    ,[]);

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

    let fetchList = async () => {
        setListLoading(true);
        
        let list = await AsyncStorage.getItem("KT4");
        list = JSON.parse(list);
        if(list===null){
            list = [];
        }
        setList(list);

      
        setListLoading(false);
      };
      

      useEffect(() => {
        if (focused) {
          fetchList();
        }
      }, [focused, credentials]);



    return (
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              props.navigation.navigate("InputPlantingActionOffline");
            }}
            style={{
              position: "absolute",
              zIndex: 9999,
              bottom: EStyleSheet.value("30rem"),
              right: EStyleSheet.value("30rem"),
            }}
          >
            <AntDesign
              name="pluscircle"
              size={EStyleSheet.value("60rem")}
              color="#1e915a"
            />
          </TouchableOpacity>
      
          <ScrollView contentContainerStyle={{paddingTop:EStyleSheet.value("20rem")}}>
                 {
                     list.map((item,index)=>{
                         return (
                            <TouchableOpacity 
                            style={{marginBottom:EStyleSheet.value("20rem")}}
                            activeOpacity={0.7}
                            >
                            <LinearGradient
                            colors={['#1e915a', '#5daa5f']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            style={{flexDirection:"row",marginHorizontal:EStyleSheet.value("20rem"),borderRadius:EStyleSheet.value("5rem")}}>
                                <View style={{paddingHorizontal:EStyleSheet.value("20rem"),justifyContent:"center",alignItems:"center",paddingVertical:EStyleSheet.value("20rem")}}>
                                    <Text style={{color:"white",fontSize:EStyleSheet.value("20rem"),fontWeight:"bold"}}>
                                        {index+1}
                                    </Text>
                                </View>
                                <View style={{flexDirection:"column",flex:1}}>
                                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{paddingTop:EStyleSheet.value("10rem"),paddingHorizontal:EStyleSheet.value("10rem"),flexDirection:"row"}}>
                                        <View style={{backgroundColor:"#125B50",marginRight:EStyleSheet.value("25rem"),alignSelf:"flex-start",borderRadius:EStyleSheet.value("10rem"),paddingHorizontal:EStyleSheet.value("10rem")}}>
                                        <Text style={{fontSize:EStyleSheet.value("11rem"),color:"white"}}>{item.dilaporkan_oleh}</Text>
                                        </View>
                                    
                                    </ScrollView>
                                    <View style={{padding:EStyleSheet.value("10rem")}}>
                                        <Text style={{color:"white",fontWeight:"bold",fontSize:EStyleSheet.value("16rem"),paddingBottom:EStyleSheet.value("10rem")}}>KEGIATAN PENANAMAN MANGROVE</Text>
                                    </View>
                                </View>
                            </LinearGradient>
                            <View style={{marginHorizontal:EStyleSheet.value("20rem"),flexDirection:"row",justifyContent:"space-around",padding:EStyleSheet.value("10rem"),backgroundColor:"#DDDDDD"}}>
                            <TouchableOpacity 
                                 onPress={()=>{
                                    props.navigation.navigate("KindPlantingActionOffline",{id_planting_action:item.id});
                                }}
                                style={{backgroundColor:"#9ed649",borderRadius:EStyleSheet.value("5rem"),paddingHorizontal:EStyleSheet.value("10rem"),paddingVertical:EStyleSheet.value("5rem")}}>
                                    <MaterialCommunityIcons name="eye" size={EStyleSheet.value("15rem")} color="white" />
                                </TouchableOpacity>
                                <TouchableOpacity 
                                        onPress={async () => {
                                            Alert.alert(
                                            "Dialog Konfirmasi",
                                            "Anda yakin ingin menghapus data ini?",
                                            [
                                                {
                                                text: "Tidak",
                                                style: "cancel"
                                                },
                                                { 
                                                text: "Iya", 
                                                onPress: async () => {
                                                    setListLoading(true);

                                                    // Hapus data di async storage sesuai dengan index yang dipilih
                                                    let list = await AsyncStorage.getItem("KT4");
                                                    list = JSON.parse(list) || [];

                                                    if (list.length > 0) {
                                                    list.splice(index, 1);
                                                    await AsyncStorage.setItem("KT4", JSON.stringify(list));
                                                    setList(list);
                                                    setListLoading(false);
                                                    fetchList(); // Add a function to reload the list
                                                    } else {
                                                    setListLoading(false);
                                                    // Handle case when the list is already empty
                                                    alert("List is already empty");
                                                    }
                                                } 
                                                }
                                            ]
                                            );
                                        }}
                                        style={{
                                            backgroundColor: "#FF5C57",
                                            borderRadius: EStyleSheet.value("5rem"),
                                            paddingHorizontal: EStyleSheet.value("10rem"),
                                            paddingVertical: EStyleSheet.value("5rem")
                                        }}
                                        >
                                    <MaterialIcons name="delete-outline" size={EStyleSheet.value("15rem")} color="white" />
                                    </TouchableOpacity>
                                {
                                    isConnected ? (
                                        <TouchableOpacity
                                            onPress={async () => {
                                                setListLoading(true);

                                                try {
                                                    let list = await AsyncStorage.getItem("KT4");
                                                    list = JSON.parse(list) || [];
                                                    let data = list[index];

                                                    let request = await fetch(`${endpoint}/planting-action`,{
                                                        method: "POST",
                                                        headers: {
                                                            "authorization": `Bearer ${globalContext.credentials.token}`,
                                                            "content-type": "application/json"
                                                        },
                                                        body: JSON.stringify(data)
                                                    });

                                                    let response = await request.json();

                                                    if (response.success) {
                                                        // Hapus data di async storage sesuai dengan index yang dipilih
                                                        list.splice(index, 1);
                                                        await AsyncStorage.setItem("KT4", JSON.stringify(list));

                                                        // Update KT4Kind
                                                        let id = response.id_planting_action;
                                                        let id_planting_action = data.id;

                                                        let KT4Kind = await AsyncStorage.getItem("KT4Kind");
                                                        KT4Kind = JSON.parse(KT4Kind) || [];

                                                        let KT4KindFiltered = KT4Kind.filter(item => item.id_planting_action === id_planting_action);

                                                        if (KT4KindFiltered.length > 0) {
                                                            KT4KindFiltered.forEach(item => {
                                                                item.id_planting_action = id;
                                                            });
                                                        } else {
                                                            // KT4Kind tidak ada, tidak perlu mengupload
                                                            alert("Data Berhasil Di Upload");
                                                            setListLoading(false);
                                                            fetchList(); // Add a function to reload the list
                                                            return;
                                                        }

                                                        let KT4KindFiltered2 = KT4Kind.filter(item => item.id_planting_action === id);


                                                        // Jika lebih dari 1, lakukan loop
                                                        if (KT4KindFiltered2.length > 0) {
                                                            for (let i = 0; i < KT4KindFiltered2.length; i++) {
                                                                let request1 = await fetch(`${endpoint}/add-kind-planting-action`,{
                                                                    method: "POST",
                                                                    headers: {
                                                                        "authorization": `Bearer ${globalContext.credentials.token}`,
                                                                        "content-type": "application/json"
                                                                    },
                                                                    body: JSON.stringify(KT4KindFiltered2[i])
                                                                });

                                                                let response1 = await request1.json();

                                                                if (response1.success) {
                                                                    // Hapus data KT4Kind yang terkait dengan KT4 yang dihapus
                                                                    let KT4KindFiltered = KT4Kind.filter(item => item.id_planting_action !== id);
                                                                    await AsyncStorage.setItem("KT4Kind", JSON.stringify(KT4KindFiltered));

                                                                    setList(list);
                                                                    setListLoading(false);
                                                                    alert("Data berhasil diupload");
                                                                    fetchList(); // Add a function to reload the list
                                                                    let updatedKT4Kind = [...KT4Kind, KT4KindFiltered]; // Gantilah 'data' dengan properti yang sesuai
                                                                    setKT4Kind(updatedKT4Kind);
                                                                } else {
                                                                    alert("Data gagal diupload");
                                                                    setListLoading(false);
                                                                }
                                                            }
                                                        } else {
                                                            KT4KindFiltered2 = KT4KindFiltered2[0];

                                                            try {
                                                                let request1 = await fetch(`${endpoint}/add-kind-planting-action`,{
                                                                    method: "POST",
                                                                    headers: {
                                                                        "authorization": `Bearer ${globalContext.credentials.token}`,
                                                                        "content-type": "application/json"
                                                                    },
                                                                    body: JSON.stringify(KT4KindFiltered2)
                                                                });

                                                                let response1 = await request1.json();

                                                                if (response1.success) {
                                                                    // Hapus data KT4Kind yang terkait dengan KT4 yang dihapus
                                                                    let KT4KindFiltered = KT4Kind.filter(item => item.id_planting_action !== id);
                                                                    await AsyncStorage.setItem("KT4Kind", JSON.stringify(KT4KindFiltered));

                                                                    setList(list);
                                                                    setListLoading(false);
                                                                    alert("Data berhasil diupload");
                                                                    fetchList(); // Add a function to reload the list
                                                                    let updatedKT4Kind = [...KT4Kind, KT4KindFiltered]; // Gantilah 'data' dengan properti yang sesuai
                                                                    setKT4Kind(updatedKT4Kind);
                                                                } else {
                                                                    alert("Data gagal diupload");
                                                                    setListLoading(false);
                                                                }
                                                            } catch (err) {
                                                                console.log(err);
                                                                alert("Data gagal diupload");
                                                                setListLoading(false);
                                                            }
                                                        }
                                                    } else {
                                                        alert("Data gagal diupload");
                                                        setListLoading(false);
                                                    }
                                                } catch (error) {
                                                    console.error("Error handling upload:", error);
                                                    setListLoading(false);
                                                    alert("Terjadi kesalahan saat mengupload data");
                                                }
                                            }}
                                            style={{
                                                backgroundColor: "#05ACAC",
                                                borderRadius: EStyleSheet.value("5rem"),
                                                paddingHorizontal: EStyleSheet.value("10rem"),
                                                paddingVertical: EStyleSheet.value("5rem")
                                            }}
                                        >
                                            <MaterialIcons name="cloud-upload" size={EStyleSheet.value("15rem")} color="white" />
                                        </TouchableOpacity>
                                    ) : (
                                        null
                                    )
                                }

                            </View>
                        </TouchableOpacity>
                         )
                     })
                 }
            </ScrollView>
        </View>
      );

}