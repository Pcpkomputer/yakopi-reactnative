import React,{useState,useEffect, useContext} from 'react';
import { StyleSheet, Platform, ScrollView, ActivityIndicator, Alert, Linking, Modal, TouchableOpacity, Text, TextInput, View, Dimensions, Image } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import { StatusBarHeight } from '../../utils/HeightUtils';
import { LinearGradient } from 'expo-linear-gradient';

import { CommonActions, useIsFocused } from '@react-navigation/native';

import { toLocaleTimestamp } from '../../utils/utils';

import { Entypo, Feather, FontAwesome, AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 

import {endpoint} from '../../utils/endpoint';

import {GlobalContext} from '../../App';


export default function ListBounderingScreen(props){

    const focused = useIsFocused();

    const globalContext = useContext(GlobalContext);

    const [listLoading, setListLoading] = useState(true);
    const [list, setList] = useState([]);

    // Tambahkan state untuk mengontrol modal
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    let fetchList = async () =>{
        setListLoading(true);
        let request = await fetch(`${endpoint}/agroforest-boundering`,{
            method:"GET",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`
            }
        });
        let response = await request.json();
        if(response.success){
            setList(response.data);
            setListLoading(false);
        }
    }

    useEffect(()=>{
        if(focused){
            fetchList();
        }
    },[focused]);

    return (
        <View style={{flex:1}}>
            

            <TouchableOpacity 
            activeOpacity={0.6}
            onPress={()=>{
                props.navigation.navigate("InputBoundering");
            }}
            style={{position:"absolute",zIndex:9999,bottom:EStyleSheet.value("30rem"),right:EStyleSheet.value("30rem")}}>
                <AntDesign name="pluscircle" size={EStyleSheet.value("60rem")} color="#1e915a" />
            </TouchableOpacity>

            <TouchableOpacity
                style={{flexDirection:"row",marginHorizontal:EStyleSheet.value("20rem"),borderRadius:EStyleSheet.value("5rem"),padding:EStyleSheet.value("10rem"),alignItems:"center",justifyContent:"center",marginTop:EStyleSheet.value("20rem"),color:"#1e915a",backgroundColor:"#1e915a"}}
                onPress={()=>{
                    fetchList();
                }
                }>
                    <Feather name="refresh-ccw" size={EStyleSheet.value("30rem")} color="#fff" />
            </TouchableOpacity>

            

            {
                (listLoading) ?
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <ActivityIndicator color="black" size="large"/>
                </View>
                :
                <ScrollView contentContainerStyle={{paddingTop:EStyleSheet.value("20rem")}}>
                 {
                     list.map((item,index)=>{
                         return (
                            <View 
                            style={{marginBottom:EStyleSheet.value("20rem")}}
                            activeOpacity={0.7}
                            onPress={()=>{
                            }}
                            key={item.id_agroforest_kt1}>
                            <LinearGradient
                            colors={['#1e915a', '#5daa5f']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            style={{flexDirection:"row",marginHorizontal:EStyleSheet.value("20rem"),borderRadius:EStyleSheet.value("5rem")}}>
                                <View style={{paddingHorizontal:EStyleSheet.value("20rem"),justifyContent:"center",alignItems:"center",paddingVertical:EStyleSheet.value("20rem")}}>
                                    <Text style={{color:"white",fontSize:EStyleSheet.value("20rem"),fontWeight:"bold"}}>{item.id_boundering_agroforestri}</Text>
                                </View>
                                <View style={{flexDirection:"column",flex:1}}>
                                    <View style={{padding:EStyleSheet.value("10rem")}}>
                                        <Text style={{color:"white",fontWeight:"bold",fontSize:EStyleSheet.value("16rem")}}>{item.keterangan_boundering_agroforestri}</Text>
                                    </View>
                                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{paddingHorizontal:EStyleSheet.value("10rem"),flexDirection:"row"}}>
                                        <View style={{backgroundColor:"#446A46",marginRight:EStyleSheet.value("5rem"),alignSelf:"flex-start",borderRadius:EStyleSheet.value("10rem"),paddingHorizontal:EStyleSheet.value("10rem")}}>
                                        <Text style={{fontSize:EStyleSheet.value("11rem"),color:"white"}}>{item.created_time}</Text>
                                        </View>
                                    </ScrollView>
                                    <ScrollView
                                    showsHorizontalScrollIndicator={false}
                                    horizontal={true}
                                    style={{
                                        paddingHorizontal: EStyleSheet.value('10rem'),
                                        flexDirection: 'row',
                                        paddingBottom: EStyleSheet.value('10rem'),
                                        marginTop:EStyleSheet.value("10rem")
                                    }}
                                    >
                                    <TouchableOpacity
                                        onPress={() => {
                                        setSelectedImage(`https://sispro-yakopi.org/${item.gambar}`);
                                        setModalVisible(true); // Tampilkan modal ketika gambar diklik
                                        }}
                                    >
                                        <Image
                                        source={{ uri: `https://sispro-yakopi.org/${item.gambar}` }}
                                        style={{
                                            width: EStyleSheet.value('100rem'),
                                            height: EStyleSheet.value('100rem'),
                                            borderRadius: EStyleSheet.value('10rem'),
                                        }}
                                        />
                                    </TouchableOpacity>
                                    </ScrollView>
                                    <ScrollView
                                    showsHorizontalScrollIndicator={false}
                                    horizontal={true}
                                    style={{
                                        paddingHorizontal: EStyleSheet.value('10rem'),
                                        flexDirection: 'row',
                                        paddingBottom: EStyleSheet.value('10rem'),
                                    }}
                                    >
                                        <Text style={{color:"white",fontSize:EStyleSheet.value("12rem")}}>Latitude: {item.latitude}</Text>
                                    </ScrollView>
                                    <ScrollView
                                    showsHorizontalScrollIndicator={false}
                                    horizontal={true}
                                    style={{
                                        paddingHorizontal: EStyleSheet.value('10rem'),
                                        flexDirection: 'row',
                                        paddingBottom: EStyleSheet.value('10rem'),
                                    }}
                                    >
                                        <Text style={{color:"white",fontSize:EStyleSheet.value("12rem")}}>Longitude: {item.longtitude}</Text>
                                    </ScrollView>
                                    <Modal
                                    animationType="slide"
                                    transparent={true}
                                    visible={modalVisible}
                                    onRequestClose={() => {
                                        setModalVisible(false); // Sembunyikan modal saat tombol kembali ditekan
                                    }}
                                    >
                                    <View style={styles.modalContainer}>
                                        <TouchableOpacity
                                        style={styles.closeButton}
                                        onPress={() => setModalVisible(false)}
                                        >
                                        <Text style={styles.closeButtonText}>Close</Text>
                                        </TouchableOpacity>
                                        <Image
                                        source={{ uri: selectedImage }}
                                        style={{ width: '100%', height: '100%' }}
                                        resizeMode="contain" // Memastikan gambar sesuai dengan ukuran modal
                                        />
                                    </View>
                                    </Modal>
                                </View>
                                <TouchableOpacity 
                                activeOpacity={0.8}
                                onPress={()=>{
                                    var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
                                    var url = scheme + `${item.latitude},${item.longitude}`;
                                    Linking.openURL(url);
                                }}
                                style={{justifyContent:"center",alignItems:"center",padding:EStyleSheet.value("10rem"),paddingRight:EStyleSheet.value("20rem")}}>
                                    <View style={{backgroundColor:"#B4E197",borderRadius:EStyleSheet.value("5rem"),padding:EStyleSheet.value("10rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                                    <FontAwesome name="map-marker" size={24} color="#005555" />
                                    </View>
                                </TouchableOpacity>
                            </LinearGradient>
                            <View style={{marginHorizontal:EStyleSheet.value("20rem"),flexDirection:"row",justifyContent:"space-around",padding:EStyleSheet.value("10rem"),backgroundColor:"#DDDDDD"}}>
                                {/* Button Ke url gambar */}
                                <TouchableOpacity
                                onPress={() => {
                                    Linking.openURL(`https://sispro-yakopi.org/${item.gambar}`);
                                }}
                                style={{backgroundColor:"#005555",borderRadius:EStyleSheet.value("5rem"),paddingHorizontal:EStyleSheet.value("10rem"),paddingVertical:EStyleSheet.value("5rem")}}>
                                    <Entypo name="image" size={EStyleSheet.value("15rem")} color="white" />
                                </TouchableOpacity>

                                {
                                    (item.status=="1" && item.verifikasi_1 == "" && globalContext.credentials.data.manager == null) &&
                                    <TouchableOpacity 
                                    onPress={async ()=>{

                                        Alert.alert(
                                            "Dialog Konfirmasi",
                                            "Anda yakin ingin Menverifikasi Data Ini?",
                                            [
                                              {
                                                text: "Tidak",
                                                style: "cancel"
                                              },
                                              { text: "Iya", onPress: async () => {

                                                    setListLoading(true);

                                                    let id = item.id_boundering_agroforestri;
                                                    let request = await fetch(`${endpoint}/agroforest-boundering-verifikasi_1`,{
                                                        method:"POST",
                                                        headers:{
                                                            "authorization":`Bearer ${globalContext.credentials.token}`,
                                                            "content-type":"application/json"
                                                        },
                                                        body:JSON.stringify({
                                                            id_boundering_agroforestri:id
                                                        })
                                                    });
                                                    let response = await request.json();
                                                    if(response.success){
                                                        alert(response.msg);
                                                        await fetchList();
                                                    }
                                                    else{
                                                        alert(response.msg);
                                                    }
                                              } }
                                            ]
                                          );


                                      

                                    }}
                                    style={{backgroundColor:"green",borderRadius:EStyleSheet.value("5rem"),paddingHorizontal:EStyleSheet.value("10rem"),paddingVertical:EStyleSheet.value("5rem")}}>
                                        <MaterialIcons name="verified-user" size={EStyleSheet.value("15rem")} color="white" />
                                    </TouchableOpacity>

                                }
                                {
                                    (item.status=="1" && item.verifikasi_2 == "" && globalContext.credentials.data.manager == "Restoration") &&
                                    <TouchableOpacity 
                                    onPress={async ()=>{

                                        Alert.alert(
                                            "Dialog Konfirmasi",
                                            "Anda yakin ingin Menverifikasi Data Ini?",
                                            [
                                              {
                                                text: "Tidak",
                                                style: "cancel"
                                              },
                                              { text: "Iya", onPress: async () => {

                                                    setListLoading(true);

                                                    let id = item.id_boundering_agroforestri;
                                                    let request = await fetch(`${endpoint}/agroforest-boundering-verifikasi_2`,{
                                                        method:"POST",
                                                        headers:{
                                                            "authorization":`Bearer ${globalContext.credentials.token}`,
                                                            "content-type":"application/json"
                                                        },
                                                        body:JSON.stringify({
                                                            id_boundering_agroforestri:id
                                                        })
                                                    });
                                                    let response = await request.json();
                                                    if(response.success){
                                                        alert(response.msg);
                                                        await fetchList();
                                                    }
                                                    else{
                                                        alert(response.msg);
                                                    }
                                              } }
                                            ]
                                          );


                                      

                                    }}
                                    style={{backgroundColor:"blue",borderRadius:EStyleSheet.value("5rem"),paddingHorizontal:EStyleSheet.value("10rem"),paddingVertical:EStyleSheet.value("5rem")}}>
                                        <MaterialIcons name="verified-user" size={EStyleSheet.value("15rem")} color="white" />
                                    </TouchableOpacity>

                                }
                                {
                                    (item.status===0 && item.created_by===globalContext.credentials.data.id_pengguna) &&
                                    <TouchableOpacity 
                                    onPress={async ()=>{

                                        Alert.alert(
                                            "Dialog Konfirmasi",
                                            "Anda yakin ingin mengirim ke server data ini?",
                                            [
                                              {
                                                text: "Tidak",
                                                style: "cancel"
                                              },
                                              { text: "Iya", onPress: async () => {

                                                    setListLoading(true);

                                                    let id = item.id_boundering_agroforestri;
                                                    let request = await fetch(`${endpoint}/approve-agroforest-boundering`,{
                                                        method:"POST",
                                                        headers:{
                                                            "authorization":`Bearer ${globalContext.credentials.token}`,
                                                            "content-type":"application/json"
                                                        },
                                                        body:JSON.stringify({
                                                            id_boundering_agroforestri:id
                                                        })
                                                    });
                                                    let response = await request.json();
                                                    if(response.success){
                                                        await fetchList();
                                                    }
                                                    else{
                                                        alert(response.msg);
                                                    }
                                              } }
                                            ]
                                          );


                                      

                                    }}
                                    style={{backgroundColor:"blue",borderRadius:EStyleSheet.value("5rem"),paddingHorizontal:EStyleSheet.value("10rem"),paddingVertical:EStyleSheet.value("5rem")}}>
                                    <MaterialIcons name="verified-user" size={EStyleSheet.value("15rem")} color="white" />
                                    </TouchableOpacity>
                                }
                                {
                                    (item.verifikasi_1 == "" && item.verifikasi_2 == "") &&
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

                                                    setListLoading(true);

                                                    let id = item.id_boundering_agroforestri;
                                                    let request = await fetch(`${endpoint}/delete-agroforest-boundering`,{
                                                        method:"DELETE",
                                                        headers:{
                                                            "authorization":`Bearer ${globalContext.credentials.token}`,
                                                            "content-type":"application/json"
                                                        },
                                                        body:JSON.stringify({
                                                            id_boundering_agroforestri:id
                                                        })
                                                    });
                                                    let response = await request.json();
                                                    if(response.success){
                                                        await fetchList();
                                                    }
                                                    else{
                                                        alert(response.msg);
                                                    }
                                              } }
                                            ]
                                          );


                                      

                                    }}
                                    style={{backgroundColor:"#FF5C57",borderRadius:EStyleSheet.value("5rem"),paddingHorizontal:EStyleSheet.value("10rem"),paddingVertical:EStyleSheet.value("5rem")}}>
                                        <MaterialIcons name="delete-outline"  size={EStyleSheet.value("15rem")} color="white" />
                                    </TouchableOpacity>
                                }
                            </View>
                        </View>
                         )
                     })
                 }
            </ScrollView>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    modalContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.9)', // Warna latar belakang hitam transparan
    },
    closeButton: {
      position: 'absolute',
      top: 40,
      right: 20,
      zIndex: 9999,
    },
    closeButtonText: {
      color: 'white',
      fontSize: 20,
    },
  });