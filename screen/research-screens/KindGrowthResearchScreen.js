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




export default function KindGrowthResearchScreen(props){

    const globalContext = useContext(GlobalContext);

    const focused = useIsFocused();

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
          >Kode Site</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >Kode Plot</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >Luas</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >Latitude</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >Longtitude</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >Jenis Tanaman</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >Jumlah yang ditanam</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >Jumlah Hidup</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >Persentase Kehidupan</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >Jumlah Mati</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >Persentase Kematian</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >Penyebab Kematian</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >Jenis Tanah</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >Status Tambak</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >Biodiversity</DataTable.Title>
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
              </View>
              
          }
          {
              (props.route.params.status != "0") &&
              <Text>{index+1}</Text>
          }
            </DataTable.Cell>
            <DataTable.Cell>{item.kode_site}</DataTable.Cell>
            <DataTable.Cell>{item.kode_plot}</DataTable.Cell>
            <DataTable.Cell>{item.luas}</DataTable.Cell>
            <DataTable.Cell>{item.lat_gps}</DataTable.Cell>
            <DataTable.Cell>{item.long_gps}</DataTable.Cell>
            <DataTable.Cell>{item.jenis_tanaman}</DataTable.Cell>
            <DataTable.Cell>{item.jumlah_yang_ditanam}</DataTable.Cell>
            <DataTable.Cell>{item.jumlah_hidup}</DataTable.Cell>
            <DataTable.Cell>{item.persentase_kehidupan}</DataTable.Cell>
            <DataTable.Cell>{item.jumlah_mati}</DataTable.Cell>
            <DataTable.Cell>{item.persentase_kematian}</DataTable.Cell>
            <DataTable.Cell>{item.penyebab_kematian}</DataTable.Cell>
            <DataTable.Cell>{item.jenis_tanah}</DataTable.Cell>
            <DataTable.Cell>{item.status_tambak}</DataTable.Cell>
            <DataTable.Cell>{item.biodiversity}</DataTable.Cell>
          </DataTable.Row>
        ))}
        </DataTable>
      </ScrollView>
    }
      </View>
    )
}