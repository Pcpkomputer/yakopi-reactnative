import React,{useState,useEffect, useContext} from 'react';
import { StyleSheet, Platform, ScrollView,Modal,Pressable, ActivityIndicator, Alert, Linking, AsyncStorage, TouchableOpacity, Text, TextInput, View, Dimensions, Image, ToastAndroid } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';
import * as DocumentPicker from 'expo-document-picker';
import { StatusBarHeight } from '../../utils/HeightUtils';
import { LinearGradient } from 'expo-linear-gradient';

import { CommonActions, useIsFocused } from '@react-navigation/native';

import { getUsername, toLocaleTimestamp } from '../../utils/utils';

import { Entypo, Feather, FontAwesome, AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 

import {endpoint} from '../../utils/endpoint';

import {GlobalContext} from '../../App';
import ListData from '../data_list/ListData';


const ListPlatBoundaring = (props) => {
    const focused = useIsFocused();

    const globalContext = useContext(GlobalContext);

    const [listLoading, setListLoading] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [list, setList] = useState([]);

    let [fileGpx, setFileGpx] = useState(null);
    let [keterangan, setKeterangan] = useState(null);

    let fetchList = async () =>{
        setListLoading(true);
        let request = await fetch(`${endpoint}/location/getlisthistory`,{
            method:"POST",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`,
                "content-type":"application/json"
            },
            body: JSON.stringify({username: await getUsername()})
        });
        let response = JSON.parse(await request.text());
        console.log(response);
        if(response.code == 200){
            setList(response.message);
            setListLoading(false);
        }
    }

    useEffect(()=>{
        if(focused){
            fetchList();
        }
    },[focused]);


    return(
        <>
            <View style={{flex:1}}>
            

            <TouchableOpacity 
            activeOpacity={0.6}
            onPress={()=>{
                props.navigation.navigate("InputNewPlotBoundaring");
            }}
            style={{position:"absolute",zIndex:9999,bottom:EStyleSheet.value("30rem"),right:EStyleSheet.value("30rem")}}>
                <AntDesign name="pluscircle" size={EStyleSheet.value("60rem")} color="#1e915a" />
            </TouchableOpacity>

            {/* Button import file gpx */}
            <Pressable
            onPress={()=>{
                setModalVisible(true);
            }}
            style={{position:"absolute",zIndex:9999,bottom:EStyleSheet.value("30rem"),left:EStyleSheet.value("30rem")}}>
                <MaterialCommunityIcons name="file-import" size={EStyleSheet.value("60rem")} color="#1e915a" />
            </Pressable>

            <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
            >
                <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Import File GPX</Text>
                    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:EStyleSheet.value("20rem")}}>
                    <TextInput
                        placeholder="Keterangan"
                        style={{borderWidth:1,borderColor:"#ccc",borderRadius:5,padding:10,marginBottom:10,flex:1}}
                        onChangeText={(text)=>{
                            setKeterangan(text);
                        }}
                        />

                    </View>
                    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}>
                        <TouchableOpacity
                        onPress={async ()=>{
                            let result = await DocumentPicker.getDocumentAsync({
                                type:"application/gpx+xml"
                            });
                            if(result.type == "success"){
                                setFileGpx(result);
                            }
                        }}
                        style={{backgroundColor:"#1e915a",padding:EStyleSheet.value("10rem"),borderRadius:EStyleSheet.value("10rem")}}>
                            <Text style={{color:"#fff"}}>Pilih File</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={async ()=>{
                            setFileGpx(null);
                        }}
                        style={{backgroundColor:"#1e915a",padding:EStyleSheet.value("10rem"),borderRadius:EStyleSheet.value("10rem"),marginLeft:EStyleSheet.value("10rem")}}>
                            <Text style={{color:"#fff"}}>Reset</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={{flexDirection:"row",alignItems:"center",justifyContent:"center",marginTop:EStyleSheet.value("20rem")}}>
                        <TouchableOpacity
                        onPress={async ()=>{
                            setModalVisible(false);
                        }}
                        style={{backgroundColor:"red",padding:EStyleSheet.value("10rem"),borderRadius:EStyleSheet.value("10rem")}}>
                            <Text style={{color:"#fff"}}>Batal</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                        onPress={async ()=>{
                            if(fileGpx != null){
                                let formData = new FormData();
                                formData.append("file_tracking",{
                                    uri:fileGpx.uri,
                                    name:fileGpx.name,
                                    type:"application/gpx+xml"
                                });
                                
                                let request = await fetch(`https://sispro-yakopi.org/endpoint/importTracking`,{
                                    method:"POST",
                                    body:formData
                                });
                                let path = `/assets/tracking/`;
                                let response = await request.json();
                                let filename = response.result.file_name;
                                let payloadfilename = path+filename;
                                let username = await getUsername();
                                let request2 = await fetch(`${endpoint}/import-tracking`,{
                                    method:"POST",
                                    headers:{
                                        "authorization":`Bearer ${globalContext.credentials.token}`,
                                        "content-type":"application/json"
                                    },
                                    body:JSON.stringify({
                                        username:username,
                                        keterangan:keterangan,
                                        filename:payloadfilename
                                    })
                                });
                                let response2 = await request2.json();
                                if(response2.success){
                                    setModalVisible(false);
                                    setFileGpx(null);
                                    ToastAndroid.show("Berhasil Import",ToastAndroid.SHORT);
                                    fetchList();
                                }

                            }
                        }}
                        style={{backgroundColor:"#1e915a",padding:EStyleSheet.value("10rem"),borderRadius:EStyleSheet.value("10rem"),marginLeft:EStyleSheet.value("10rem")}}>
                            <Text style={{color:"#fff"}}>Import</Text>
                        </TouchableOpacity>
                        </View>
                </View>
                </View>
            </Modal>
            {
                (listLoading) ?
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <ActivityIndicator color="black" size="large"/>
                </View>
                :
                <ScrollView contentContainerStyle={{paddingTop:EStyleSheet.value("20rem")}}>
                 {
                   list.map((data, index) => {
                    return <ListData data={data}/>
                   })  
                 }
                 
            </ScrollView>
            }
        </View>
        </>
    )
}
const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
      padding:EStyleSheet.value("20rem")
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: EStyleSheet.value("35rem"),
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: EStyleSheet.value("10rem"),
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });
export default ListPlatBoundaring