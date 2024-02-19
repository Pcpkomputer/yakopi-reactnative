import React,{useState,useEffect, useContext} from 'react';
import { StyleSheet, ScrollView, ActivityIndicator,Alert, Pressable, AsyncStorage, TouchableOpacity, Text, TextInput, View, Dimensions, Image } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import { StatusBarHeight } from '../../utils/HeightUtils';
import { LinearGradient } from 'expo-linear-gradient';

import { CommonActions } from '@react-navigation/native';

import { Entypo, Feather, FontAwesome, MaterialCommunityIcons,AntDesign } from '@expo/vector-icons'; 

import {endpoint} from '../../utils/endpoint';

import {GlobalContext} from '../../App';

import { DataTable } from 'react-native-paper';

import { useIsFocused } from '@react-navigation/native';




export default function KindKK9(props){

    const globalContext = useContext(GlobalContext);
    const focused = useIsFocused();

    const [listLoading, setListLoading] = useState(true);
    const [list, setList] = useState([]);

    let fetchList = async () =>{
        setListLoading(true);
        let id = props.route.params.id_agroforest_kt9;
        let request = await fetch(`${endpoint}/kind-agroforest-kt9`,{
            method:"POST",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`,
                "content-type":"application/json"
            },
            body:JSON.stringify({
                id_agroforest_kt9:id
            })
        });
        let response = await request.json();
        console.log(response);

        if(response.success){
            setList(response.data);
            setListLoading(false);
        }
    }

    useEffect(()=>{
        fetchList();
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
        <TouchableOpacity 
            activeOpacity={0.6}
            onPress={()=>{
                props.navigation.navigate("InputDetailKK9",{ id_agroforest_kt9:props.route.params.id_agroforest_kt9 });
            }}
            style={{position:"absolute",zIndex:9999,bottom:EStyleSheet.value("30rem"),right:EStyleSheet.value("30rem")}}>
                <AntDesign name="pluscircle" size={EStyleSheet.value("60rem")} color="#1e915a" />
        </TouchableOpacity>
        {
                (listLoading) ?
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <ActivityIndicator color="black" size="large"/>
                </View>
                :
                <ScrollView horizontal>
                <DataTable style={styles.container}>
                <DataTable.Header style={styles.tableHeader}>
                  <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
                  sortDirection='descending'>No</DataTable.Title>
                  <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
                  sortDirection='descending'
                  >Kode plot sementara</DataTable.Title>
                  <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
                  sortDirection='descending'
                  >Perkiraan tinggi tanaman (m)</DataTable.Title>
                  <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
                  sortDirection='descending'
                  >Perkiraan umur tanaman (thn)</DataTable.Title>
                  <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
                  sortDirection='descending'
                  >Perkiraan Luas Plot (ha)</DataTable.Title>
                  <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
                  sortDirection='descending'
                  >Latitude</DataTable.Title>
                  <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
                  sortDirection='descending'
                  >Longitude</DataTable.Title>
                  <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
                  sortDirection='descending'
                  >Jenis agroforestri yang sudah ada</DataTable.Title>
                  <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
                  sortDirection='descending'
                  >Jarak tanam (m)</DataTable.Title>
                  <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
                  sortDirection='descending'
                  >Kematian (%)</DataTable.Title>
                  <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
                  sortDirection='descending'
                  >Penyebab kematian</DataTable.Title>
                  <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
                  sortDirection='descending'
                  >Jenis tanah</DataTable.Title>
                  <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
                  sortDirection='descending'
                  >Status tanah</DataTable.Title>
                  <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
                  sortDirection='descending'
                  >Biodiversity</DataTable.Title>
                </DataTable.Header>
        {listLoading ? <ActivityIndicator size="large" color="#0000ff" /> :
        list.map((item, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}> 
            {
              (props.route.params.status == "1") &&
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

                              let id = item.id_agroforest_kt9_detail;
                              let request = await fetch(`${endpoint}/delete-kind-agroforest-kt9`,{
                                  method:"DELETE",
                                  headers:{
                                      "authorization":`Bearer ${globalContext.credentials.token}`,
                                      "content-type":"application/json"
                                  },
                                  body:JSON.stringify({
                                    id_agroforest_kt9_detail:id
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
                  <Text style={{color:"#fff"}}>{index+1}</Text>
              </TouchableOpacity>
          }
          {
              (props.route.params.status != "1") &&
              <Text>{index+1}</Text>
          }
           </DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.kode_plot}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.tinggi}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.tahun}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.luas}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.latitude}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.longtitude}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.jenis}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.jarak}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.kematian}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.penyebab_kematian}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.jenis_tanah}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.status_tanah}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.biodiversity}</DataTable.Cell>
          </DataTable.Row>
        ))}
        </DataTable>
      </ScrollView>
        }
      </View>
    )
}