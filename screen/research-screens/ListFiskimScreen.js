import React,{useState,useEffect, useContext} from 'react';
import { StyleSheet, Platform, ScrollView, ActivityIndicator, Alert, Linking, AsyncStorage, TouchableOpacity, Text, TextInput, View, Dimensions, Image } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import { StatusBarHeight } from '../../utils/HeightUtils';
import { LinearGradient } from 'expo-linear-gradient';

import { CommonActions, useIsFocused } from '@react-navigation/native';

import { toLocaleTimestamp } from '../../utils/utils';

import { Entypo, Feather, FontAwesome, AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 

import {endpoint} from '../../utils/endpoint';

import {GlobalContext} from '../../App';


export default function ListFiskimScreen(props){

    const focused = useIsFocused();

    const globalContext = useContext(GlobalContext);

    const [listLoading, setListLoading] = useState(true);
    const [list, setList] = useState([]);

    let fetchList = async () =>{
        setListLoading(true);
        let request = await fetch(`${endpoint}/research/fiskim`,{
            method:"GET",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`
            }
        });
        let response = await request.json();
        console.log(response);

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
                props.navigation.navigate("InputFiskim");
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
                            <TouchableOpacity 
                            style={{marginBottom:EStyleSheet.value("20rem")}}
                            activeOpacity={0.7}
                            onPress={()=>{
                                props.navigation.navigate("DetailFiskim",{item:item});
                            }}
                            key={item.id_fiskim}>
                            <LinearGradient
                            colors={['#1e915a', '#5daa5f']}
                            start={{ x: 0, y: 1 }}
                            end={{ x: 1, y: 1 }}
                            style={{flexDirection:"row",marginHorizontal:EStyleSheet.value("20rem"),borderRadius:EStyleSheet.value("5rem")}}>
                                <View style={{paddingHorizontal:EStyleSheet.value("20rem"),justifyContent:"center",alignItems:"center",paddingVertical:EStyleSheet.value("20rem")}}>
                                    <Text style={{color:"white",fontSize:EStyleSheet.value("20rem"),fontWeight:"bold"}}>{item.id_fiskim}</Text>
                                </View>
                                <View style={{flexDirection:"column",flex:1}}>
                                    <ScrollView showsHorizontalScrollIndicator={false} horizontal={true} style={{paddingTop:EStyleSheet.value("10rem"),paddingHorizontal:EStyleSheet.value("10rem"),flexDirection:"row"}}>
                                        <View style={{backgroundColor:"#446A46",marginRight:EStyleSheet.value("5rem"),alignSelf:"flex-start",borderRadius:EStyleSheet.value("10rem"),paddingHorizontal:EStyleSheet.value("10rem")}}>
                                        <Text style={{fontSize:EStyleSheet.value("11rem"),color:"white"}}>{item.nama_project}</Text>
                                        </View>
                                        <View style={{backgroundColor:"#125B50",marginRight:EStyleSheet.value("25rem"),alignSelf:"flex-start",borderRadius:EStyleSheet.value("10rem"),paddingHorizontal:EStyleSheet.value("10rem")}}>
                                        <Text style={{fontSize:EStyleSheet.value("11rem"),color:"white"}}>{item.dilaporkan_oleh}</Text>
                                        </View>
                                    
                                    </ScrollView>
                                    <View style={{padding:EStyleSheet.value("10rem")}}>
                                        <Text style={{color:"white",fontWeight:"bold",fontSize:EStyleSheet.value("16rem"),paddingBottom:EStyleSheet.value("10rem")}}>PARAMETER FISIKA KIMIA</Text>
                                    </View>
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
                                <TouchableOpacity 
                                 onPress={()=>{
                                    props.navigation.navigate("KindFiskim",{id_fiskim:item.id_fiskim,status:item.status});
                                }}
                                style={{backgroundColor:"#9ed649",borderRadius:EStyleSheet.value("5rem"),paddingHorizontal:EStyleSheet.value("10rem"),paddingVertical:EStyleSheet.value("5rem")}}>
                                    <MaterialCommunityIcons name="eye" size={EStyleSheet.value("15rem")} color="white" />
                                </TouchableOpacity>
                                {
                                    (item.status===0 && item.created_by===globalContext.credentials.data.id_pengguna) &&
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

                                                    let id = item.id_fiskim;
                                                    let request = await fetch(`${endpoint}/research/fiskim/delete`,{
                                                        method:"DELETE",
                                                        headers:{
                                                            "authorization":`Bearer ${globalContext.credentials.token}`,
                                                            "content-type":"application/json"
                                                        },
                                                        body:JSON.stringify({
                                                            id_fiskim:id
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
                                {
                                    (item.status===0 && item.created_by===globalContext.credentials.data.id_pengguna) &&
                                    <TouchableOpacity 
                                    onPress={async ()=>{
                                        Alert.alert(
                                            "Dialog Konfirmasi",
                                            "Anda yakin ingin menyetujui data ini?",
                                            [
                                              {
                                                text: "Tidak",
                                                style: "cancel"
                                              },
                                              { text: "Iya", onPress: async () => {

                                                    setListLoading(true);

                                                    let id = item.id_fiskim;
                                                    let request = await fetch(`${endpoint}/research/approve-fiskim`,{
                                                        method:"POST",
                                                        headers:{
                                                            "authorization":`Bearer ${globalContext.credentials.token}`,
                                                            "content-type":"application/json"
                                                        },
                                                        body:JSON.stringify({
                                                            id_fiskim:id
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
                                    style={{backgroundColor:"#5daa5f",borderRadius:EStyleSheet.value("5rem"),paddingHorizontal:EStyleSheet.value("10rem"),paddingVertical:EStyleSheet.value("5rem")}}>
                                      <FontAwesome name="check"  size={EStyleSheet.value("15rem")} color="white" />
                                    </TouchableOpacity>
                                }
                            </View>
                        </TouchableOpacity>
                         )
                     })
                 }
            </ScrollView>
            }
        </View>
    )
}