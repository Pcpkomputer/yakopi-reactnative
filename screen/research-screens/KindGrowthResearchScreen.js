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




export default function KindGrowthResearchScreen(props){

    const globalContext = useContext(GlobalContext);

    const [listLoading, setListLoading] = useState(true);
    const [list, setList] = useState([]);

    let fetchList = async () =>{
        setListLoading(true);
        let id = props.route.params.id_growth_research;
        let request = await fetch(`${endpoint}/research/dataGrowthResearch`,{
            method:"POST",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`,
                "content-type":"application/json"
            },
            body:JSON.stringify({
              id:id
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
    },[]);

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
                props.navigation.navigate("InputDetailGrowthResearch",{ id_growth_research:props.route.params.id_growth_research });
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
      <ScrollView horizontal>
        <DataTable style={styles.container}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title>No</DataTable.Title>
          <DataTable.Title 
          sortDirection='descending'
          >No Tangging</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >Tinggi</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >Diameter</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >Jumlah Daun</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >Jumlah Percabangan</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >Keterangan</DataTable.Title>
        </DataTable.Header>
        {listLoading ? <ActivityIndicator size="large" color="#0000ff" /> :
        list.map((item, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell>
            {
              (props.route.params.status == "0") &&
              <View style={{flexDirection:"row",alignItems:"center"}}>
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

                              let id = item.id_detail_growth_research;
                              let request = await fetch(`${endpoint}/research/growthResearch/deleteDetail`,{
                                  method:"DELETE",
                                  headers:{
                                      "authorization":`Bearer ${globalContext.credentials.token}`,
                                      "content-type":"application/json"
                                  },
                                  body:JSON.stringify({
                                    id:id
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
              <TouchableOpacity 
                onPress={()=>{
                    props.navigation.navigate("AssetGrowthResearch",{type:"image",id_detail_growth_research:item.id_detail_growth_research,status:props.route.params.status});
                }}
                style={{backgroundColor:"#05ACAC",borderRadius:EStyleSheet.value("5rem"),paddingHorizontal:EStyleSheet.value("10rem"),paddingVertical:EStyleSheet.value("5rem")}}>
                    <Entypo name="image" size={EStyleSheet.value("15rem")} color="white" />
                </TouchableOpacity>
              </View>
              
          }
          {
              (props.route.params.status != "0") &&
              <Text>{index+1}</Text>
          }
            </DataTable.Cell>
            <DataTable.Cell>{item.no_tagging}</DataTable.Cell>
            <DataTable.Cell>{item.tinggi}</DataTable.Cell>
            <DataTable.Cell>{item.diameter}</DataTable.Cell>
            <DataTable.Cell>{item.jumlah_daun}</DataTable.Cell>
            <DataTable.Cell>{item.jumlah_percabangan}</DataTable.Cell>
            <DataTable.Cell>{item.keterangan}</DataTable.Cell>
          </DataTable.Row>
        ))}
        </DataTable>
      </ScrollView>
    }
      </View>
    )
}