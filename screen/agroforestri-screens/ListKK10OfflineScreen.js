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


export default function ListKK10OfflineScreen(props){

    const focused = useIsFocused();

    const globalContext = useContext(GlobalContext);
    const [credentials,setCredentials] = useState(globalContext.credentials);
    const [KK10, setKK10] = useState(globalContext.KK10);

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
        
        let list = await AsyncStorage.getItem("KK10");
        list = JSON.parse(list);
        if(list===null){
            list = [];
        }
        setList(list);
        console.log(list);

      
        setListLoading(false);
      };
      

      useEffect(() => {
        if (focused) {
          fetchList();
        }
      }, [focused, credentials]);

      console.log(list);

    return (
        <View style={{ flex: 1 }}>
          <TouchableOpacity
            activeOpacity={0.6}
            onPress={() => {
              props.navigation.navigate("InputKK10Offline");
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
                                        <Text style={{fontSize:EStyleSheet.value("11rem"),color:"white"}}>{item.nama_surveyor}</Text>
                                        </View>
                                    
                                    </ScrollView>
                                    <View style={{padding:EStyleSheet.value("10rem")}}>
                                        <Text style={{color:"white",fontWeight:"bold",fontSize:EStyleSheet.value("16rem"),paddingBottom:EStyleSheet.value("10rem")}}>PENGGANTIAN PLOT YANG HILANG/RUSAK</Text>
                                    </View>
                                </View>
                                <TouchableOpacity 
                                activeOpacity={0.8}
                                onPress={()=>{
                                    var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
                                    var url = scheme + `${item.coordinate.latitude},${item.coordinate.longitude}`;
                                    Linking.openURL(url);
                                }}
                                style={{justifyContent:"center",alignItems:"center",padding:EStyleSheet.value("10rem"),paddingRight:EStyleSheet.value("20rem")}}>
                                    <View style={{backgroundColor:"#B4E197",borderRadius:EStyleSheet.value("5rem"),padding:EStyleSheet.value("10rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                                    <FontAwesome name="map-marker" size={24} color="#005555" />
                                    </View>
                                </TouchableOpacity>
                            </LinearGradient>
                            <View style={{marginHorizontal:EStyleSheet.value("20rem"),flexDirection:"row",justifyContent:"space-around",padding:EStyleSheet.value("10rem"),backgroundColor:"#DDDDDD"}}>
                            <TouchableOpacity 
                                 onPress={()=>{
                                    props.navigation.navigate("KindKK10Offline",{id_agroforest_kt10:item.id,status:item.status});
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
                                                let list = await AsyncStorage.getItem("KK10");
                                                list = JSON.parse(list) || [];

                                                if (list.length > 0) {
                                                list.splice(index, 1);
                                                await AsyncStorage.setItem("KK10", JSON.stringify(list));
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
                                                let list = await AsyncStorage.getItem("KK10");
                                                list = JSON.parse(list) || [];
                                                let data = list[index];

                                                let request = await fetch(`${endpoint}/agroforest-kt10`, {
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
                                                    await AsyncStorage.setItem("KK10", JSON.stringify(list));

                                                    // Update KK10Kind
                                                    let id = response.id_agroforest_kt10;
                                                    let id_agroforest_kt10 = data.id;

                                                    let KK10Kind = await AsyncStorage.getItem("KK10Kind");
                                                    KK10Kind = JSON.parse(KK10Kind) || [];

                                                    let KK10KindFiltered = KK10Kind.filter(item => item.id_agroforest_kt10 === id_agroforest_kt10);

                                                    if (KK10KindFiltered.length > 0) {
                                                        KK10KindFiltered.forEach(item => {
                                                            item.id_agroforest_kt10 = id;
                                                        });
                                                        await AsyncStorage.setItem("KK10Kind", JSON.stringify(KK10Kind));
                                                    } else {
                                                        // KK10Kind tidak ada, tidak perlu mengupload
                                                        alert("Data Berhasil Di Upload");
                                                        setListLoading(false);
                                                        fetchList(); // Add a function to reload the list
                                                        return;
                                                    }

                                                    let KK10KindFiltered2 = KK10Kind.filter(item => item.id_agroforest_kt10 === id);

                                                    if (KK10KindFiltered2.length > 0) {
                                                        for (let i = 0; i < KK10KindFiltered2.length; i++) {
                                                            let request1 = await fetch(`${endpoint}/add-kind-agroforest-kt10`, {
                                                                method: "POST",
                                                                headers: {
                                                                    "authorization": `Bearer ${globalContext.credentials.token}`,
                                                                    "content-type": "application/json"
                                                                },
                                                                body: JSON.stringify(KK10KindFiltered2[i])
                                                            });

                                                            let response1 = await request1.json();

                                                            if (response1.success) {
                                                                list.splice(index, 1);
                                                                await AsyncStorage.setItem("KK10", JSON.stringify(list));

                                                                let KK10Kind = await AsyncStorage.getItem("KK10Kind");
                                                                KK10Kind = JSON.parse(KK10Kind) || [];
                                                                let KK10KindFiltered = KK10Kind.filter(item => item.id_agroforest_kt10 !== id);
                                                                await AsyncStorage.setItem("KK10Kind", JSON.stringify(KK10KindFiltered));

                                                                setList(list);
                                                                setListLoading(false);
                                                                alert("Data berhasil diupload");
                                                                fetchList(); // Add a function to reload the list
                                                            } else {
                                                                alert("Data gagal diupload");
                                                                setListLoading(false);
                                                            }
                                                        }
                                                    } else {
                                                        KK10KindFiltered2 = KK10KindFiltered2[0];

                                                        try {
                                                            let request1 = await fetch(`${endpoint}/add-kind-agroforest-kt10`, {
                                                                method: "POST",
                                                                headers: {
                                                                    "authorization": `Bearer ${globalContext.credentials.token}`,
                                                                    "content-type": "application/json"
                                                                },
                                                                body: JSON.stringify(KK10KindFiltered2)
                                                            });

                                                            let response1 = await request1.json();

                                                            if (response1.success) {
                                                                list.splice(index, 1);
                                                                await AsyncStorage.setItem("KK10", JSON.stringify(list));

                                                                let KK10Kind = await AsyncStorage.getItem("KK10Kind");
                                                                KK10Kind = JSON.parse(KK10Kind) || [];
                                                                let KK10KindFiltered = KK10Kind.filter(item => item.id_agroforest_kt10 !== id);
                                                                await AsyncStorage.setItem("KK10Kind", JSON.stringify(KK10KindFiltered));

                                                                setList(list);
                                                                setListLoading(false);
                                                                alert("Data berhasil diupload");
                                                                fetchList(); // Add a function to reload the list
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