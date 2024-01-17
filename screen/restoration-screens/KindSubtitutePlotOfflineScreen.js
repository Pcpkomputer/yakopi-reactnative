import React,{useState,useEffect, useContext} from 'react';
import { StyleSheet, ScrollView, ActivityIndicator,Alert, Linking,Pressable, TouchableOpacity, Text, TextInput, View, Dimensions, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EStyleSheet from 'react-native-extended-stylesheet';

import { StatusBarHeight } from '../../utils/HeightUtils';
import { LinearGradient } from 'expo-linear-gradient';

import { CommonActions } from '@react-navigation/native';

import { Entypo, Feather, FontAwesome, MaterialCommunityIcons,AntDesign } from '@expo/vector-icons'; 

import {endpoint} from '../../utils/endpoint';

import {GlobalContext} from '../../App';

import { DataTable } from 'react-native-paper';

import { useIsFocused } from '@react-navigation/native';




export default function KindSubtitutePlotOffline(props){

  const globalContext = useContext(GlobalContext);
  const focused = useIsFocused();

  const [KT9, setKT9] = useState(globalContext.KT9);
  const [KT9Kind, setKT9Kind] = useState(globalContext.KT9Kind);
  const id_subtitute_plot = props.route.params.id_subtitute_plot;

  const [listLoading, setListLoading] = useState(true);
  const [list, setList] = useState([]);

  let fetchList = async () =>{
      setListLoading(true);
      let list = await AsyncStorage.getItem("KT9Kind");
      list = JSON.parse(list);
      if(list===null){
          list = [];
      }
      list = list.filter((item)=>{
          return item.id === id_subtitute_plot;
      })
      setList(list);
      setListLoading(false);

      

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
        <TouchableOpacity 
            activeOpacity={0.6}
            onPress={()=>{
                props.navigation.navigate("InputDetailSubtitutePlotOffline",{ id_subtitute_plot:props.route.params.id_subtitute_plot });
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
          <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}>No</DataTable.Title>
          <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
          sortDirection='descending'
          >Kode Plot Sementara</DataTable.Title>
           <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
          sortDirection='descending'
          >Perkiraan Tinggi (m)</DataTable.Title>
           <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
          sortDirection='descending'
          >Perkiraan Umur (thn)</DataTable.Title>
          <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
          sortDirection='descending'
          >Perkiraan Luas Plot (ha)</DataTable.Title>
          <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
          sortDirection='descending'
          >Koordinat</DataTable.Title>
          <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
          sortDirection='descending'
          >Jenis mangrove yangsudah ada</DataTable.Title>
          <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
          sortDirection='descending'
          >Jarak Tanaman (m)</DataTable.Title>
           <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
          sortDirection='descending'
          >Kematian (%)</DataTable.Title>
          <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
          sortDirection='descending'
          >Penyebab Kematian</DataTable.Title>
          <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
          sortDirection='descending'
          >Status Tambak</DataTable.Title>
          <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
          sortDirection='descending'
          >Biodiversity</DataTable.Title>
        </DataTable.Header>
        {listLoading ? <ActivityIndicator size="large" color="#0000ff" /> :
        list.map((item, index) => (
          <DataTable.Row key={index}>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>
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

                                  // hapus data di async storage sesuai dengan index yang dipilih
                                  let list = await AsyncStorage.getItem("KT9Kind");
                                  list = JSON.parse(list);
                                  
                                  if (list === null) {
                                      list = [];
                                  }

                                  list.splice(index, 1);
                                  await AsyncStorage.setItem("KT9Kind", JSON.stringify(list));

                                  // Update the local state
                                  setKT9Kind(list);

                                  setList(list);
                                  setListLoading(false);
                                  fetchList();
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
              }}>
              <Text style={{ color: "#fff" }}>{index + 1}</Text>
          </TouchableOpacity>
            </DataTable.Cell>
           <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.plot_code}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.tinggi_tanaman}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.umur_tanaman}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.luas_plot}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>
            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={()=>{
                  var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
                  var url = scheme + `${item.lat_detail_subtitute_plot},${item.long_detail_subtitute_plot}`;
                  Linking.openURL(url);
              }}
              style={{justifyContent:"center",alignItems:"center",padding:EStyleSheet.value("10rem"),paddingRight:EStyleSheet.value("20rem")}}>
                  <View style={{backgroundColor:"#B4E197",borderRadius:EStyleSheet.value("5rem"),padding:EStyleSheet.value("10rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                    <Text style={{color:"#fff"}}>Lokasi</Text>
                  </View>
              </TouchableOpacity>
            </DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.jenis_mangrove}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.jarak_tanaman}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.kematian}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.penyebab_kematian}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.jenis_tanah}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.status_tambak}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.biodiversity}</DataTable.Cell>
          </DataTable.Row>
        ))}
        </DataTable>
      </ScrollView>
    }
      </View>
    )
}