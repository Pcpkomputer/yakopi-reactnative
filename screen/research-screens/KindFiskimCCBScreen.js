import React,{useState,useEffect, useContext} from 'react';
import { StyleSheet, ScrollView, ActivityIndicator,Alert,Linking, Pressable, AsyncStorage, TouchableOpacity, Text, TextInput, View, Dimensions, Image } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import { StatusBarHeight } from '../../utils/HeightUtils';
import { LinearGradient } from 'expo-linear-gradient';

import { CommonActions } from '@react-navigation/native';

import { Entypo, Feather, FontAwesome, MaterialCommunityIcons,AntDesign } from '@expo/vector-icons'; 

import {endpoint} from '../../utils/endpoint';

import {GlobalContext} from '../../App';

import { DataTable } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';




export default function KindFiskimCCBScreen(props){

    const globalContext = useContext(GlobalContext);
    const focused = useIsFocused();

    const [listLoading, setListLoading] = useState(true);
    const [list, setList] = useState([]);

    let fetchList = async () =>{
        setListLoading(true);
        let id = props.route.params.id_ccb;
        let request = await fetch(`${endpoint}/research/ccb/fiskim`,{
            method:"POST",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`,
                "content-type":"application/json"
            },
            body:JSON.stringify({
                id_ccb:id
            })
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

    const styles = StyleSheet.create({
        container: {
          padding: 15,
        },
        tableHeader: {
          backgroundColor: '#DCDCDC',

        },
        tableTotal: {
          backgroundColor: '#DCDCDC',
        },
      });


    return (
      <View style={{flex:1, backgroundColor:'#fff'}}>
        {
        (props.route.params.status == "0") &&
        <TouchableOpacity 
            activeOpacity={0.6}
            onPress={()=>{
                props.navigation.navigate("InputDetailFloraCCB",{ id_ccb:props.route.params.id_ccb });
            }}
            style={{position:"absolute",zIndex:9999,bottom:EStyleSheet.value("30rem"),right:EStyleSheet.value("30rem")}}>
                <AntDesign name="pluscircle" size={EStyleSheet.value("60rem")} color="#1e915a" />
        </TouchableOpacity>
        }
        {
                (listLoading) ?
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <ActivityIndicator color="black" size="large"/>
                </View>
                :
      <ScrollView>
        <DataTable style={styles.container}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title>No</DataTable.Title>
          <DataTable.Title 
          sortDirection='descending'
          >Parameter</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >Pagi</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >Siang</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >Sore</DataTable.Title>
        </DataTable.Header>
        {listLoading ? <ActivityIndicator size="large" color="#0000ff" /> :
        list.map((item, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell>
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

                              let id = item.id_ccb_fiskim;
                              console.log(id);
                              let request = await fetch(`${endpoint}/research/ccb/deleteFiskim`,{
                                  method:"DELETE",
                                  headers:{
                                      "authorization":`Bearer ${globalContext.credentials.token}`,
                                      "content-type":"application/json"
                                  },
                                  body:JSON.stringify({
                                    id_ccb_fiskim:id                                  
                                })
                              });
                              let response = await request.json();
                              if(response.success){
                                  await fetchList();
                              }
                              else{
                                  alert(response.msg);
                                  setListLoading(false);
                              }
                        } }
                      ]
                    );
              }}
              style={{backgroundColor:"#FF5C57",borderRadius:EStyleSheet.value("5rem"),paddingHorizontal:EStyleSheet.value("10rem"),paddingVertical:EStyleSheet.value("5rem")}}>
                  <Text style={{color:"#fff"}}>{index+1}</Text>
              </TouchableOpacity>
            </DataTable.Cell>
            <DataTable.Cell>{item.parameter}</DataTable.Cell>
            <DataTable.Cell>{item.hasil_pengukuran_pagi}</DataTable.Cell>
            <DataTable.Cell>{item.hasil_pengukuran_siang}</DataTable.Cell>
            <DataTable.Cell>{item.hasil_pengukuran_sore}</DataTable.Cell>
          </DataTable.Row>
        ))}
        </DataTable>
      </ScrollView>
    }
      </View>
    )
}