import React,{useState,useEffect, useContext} from 'react';
import { StyleSheet, ScrollView, ActivityIndicator,Alert, Linking,Pressable, AsyncStorage, TouchableOpacity, Text, TextInput, View, Dimensions, Image } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import { StatusBarHeight } from '../../utils/HeightUtils';
import { LinearGradient } from 'expo-linear-gradient';

import { CommonActions } from '@react-navigation/native';

import { Entypo, Feather, FontAwesome, MaterialCommunityIcons,AntDesign } from '@expo/vector-icons'; 

import {endpoint} from '../../utils/endpoint';

import {GlobalContext} from '../../App';

import { DataTable } from 'react-native-paper';




export default function KindPlantingAction(props){

    const globalContext = useContext(GlobalContext);

    const [listLoading, setListLoading] = useState(true);
    const [list, setList] = useState([]);

    let fetchList = async () =>{
        setListLoading(true);
        let id = props.route.params.id_planting_action;
        let request = await fetch(`${endpoint}/kind-planting-action`,{
            method:"POST",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`,
                "content-type":"application/json"
            },
            body:JSON.stringify({
              id_planting_action:id
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
                props.navigation.navigate("InputDetailPlantingAction",{ id_planting_action:props.route.params.id_planting_action });
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
          >Tanggal</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >Jumlah Pekerja</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >Pria</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >Wanita</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >Kode Site</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >Kode Plot</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >Koordinat</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >Colok / Propagaul</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >Nursery</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >R.mucronata</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >R.stylosa</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >R.apiculata</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >Avicennia spp</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >Ceriops spp</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >Xylocarpus spp</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >Bruguiera spp</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >Sonneratia spp</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >Sub-total Bibit</DataTable.Title>
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

                              let id = item.id_detail_planting_action;
                              let request = await fetch(`${endpoint}/delete-kind-planting-action`,{
                                  method:"DELETE",
                                  headers:{
                                      "authorization":`Bearer ${globalContext.credentials.token}`,
                                      "content-type":"application/json"
                                  },
                                  body:JSON.stringify({
                                    id_detail_planting_action:id
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
                    props.navigation.navigate("AssetPlantingAction",{type:"image",id_detail_planting_action:item.id_detail_planting_action,status:props.route.params.status});
                }}
                style={{backgroundColor:"#05ACAC",borderRadius:EStyleSheet.value("5rem"),paddingHorizontal:EStyleSheet.value("10rem"),paddingVertical:EStyleSheet.value("5rem")}}>
                    <Entypo name="image" size={EStyleSheet.value("15rem")} color="white" />
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={()=>{
                    props.navigation.navigate("AssetPlantingAction",{type:"video",id_detail_planting_action:item.id_detail_planting_action,status:props.route.params.status});
                }}
                style={{backgroundColor:"#F59C1B",borderRadius:EStyleSheet.value("5rem"),paddingHorizontal:EStyleSheet.value("10rem"),paddingVertical:EStyleSheet.value("5rem")}}>
                    <Feather name="video" size={EStyleSheet.value("15rem")} color="white" />
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={()=>{
                      props.navigation.navigate("AssetPlantingAction",{type:"drone",id_detail_planting_action:item.id_detail_planting_action,status:props.route.params.status});
                  }}
                  style={{backgroundColor:"#49B6D6",borderRadius:EStyleSheet.value("5rem"),paddingHorizontal:EStyleSheet.value("10rem"),paddingVertical:EStyleSheet.value("5rem")}}>
                      <MaterialCommunityIcons name="drone" size={EStyleSheet.value("15rem")} color="white" />
                  </TouchableOpacity>
              
              </View>
              
          }
          {
              (props.route.params.status != "0") &&
              <Text>{index+1}</Text>
          }
            </DataTable.Cell>
            <DataTable.Cell>{item.date_planting_action}</DataTable.Cell>
            <DataTable.Cell>{item.jumlah_pekerja}</DataTable.Cell>
            <DataTable.Cell>{item.pria}</DataTable.Cell>
            <DataTable.Cell>{item.wanita}</DataTable.Cell>
            <DataTable.Cell>{item.kode_site}</DataTable.Cell>
            <DataTable.Cell>{item.kode_plot}</DataTable.Cell>
            <DataTable.Cell>
            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={()=>{
                  var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
                  var url = scheme + `${item.lat_detail_planting_action},${item.long_detail_planting_action}`;
                  Linking.openURL(url);
              }}
              style={{justifyContent:"center",alignItems:"center",padding:EStyleSheet.value("10rem"),paddingRight:EStyleSheet.value("20rem")}}>
                  <View style={{backgroundColor:"#B4E197",borderRadius:EStyleSheet.value("5rem"),padding:EStyleSheet.value("10rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                    <Text style={{color:"#fff"}}>Lokasi</Text>
                  </View>
              </TouchableOpacity>
            </DataTable.Cell>
            <DataTable.Cell>{item.sistem_tanam_1}</DataTable.Cell>
            <DataTable.Cell>{item.sistem_tanam_2}</DataTable.Cell>
            <DataTable.Cell>{item.r_mucronota}</DataTable.Cell>
            <DataTable.Cell>{item.r_stylosa}</DataTable.Cell>
            <DataTable.Cell>{item.r_apiculata}</DataTable.Cell>
            <DataTable.Cell>{item.avicennia_spp}</DataTable.Cell>
            <DataTable.Cell>{item.ceriops_spp}</DataTable.Cell>
            <DataTable.Cell>{item.xylocarpus_spp}</DataTable.Cell>
            <DataTable.Cell>{item.bruguiera_spp}</DataTable.Cell>
            <DataTable.Cell>{item.sonneratia_spp}</DataTable.Cell>
            <DataTable.Cell>
              {item.r_mucronota + item.r_stylosa + item.r_apiculata + item.avicennia_spp + item.ceriops_spp + item.xylocarpus_spp + item.bruguiera_spp + item.sonneratia_spp}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
        <DataTable.Row style={styles.tableTotal}>
          <DataTable.Cell>Total</DataTable.Cell>
          <DataTable.Cell></DataTable.Cell>
          <DataTable.Cell>{list.reduce((a, b) => a + b.jumlah_pekerja, 0)}</DataTable.Cell>
          <DataTable.Cell>{list.reduce((a, b) => a + b.pria, 0)}</DataTable.Cell>
          <DataTable.Cell>{list.reduce((a, b) => a + b.wanita, 0)}</DataTable.Cell>
          <DataTable.Cell></DataTable.Cell>
          <DataTable.Cell></DataTable.Cell>
          <DataTable.Cell></DataTable.Cell>
          <DataTable.Cell></DataTable.Cell>
          <DataTable.Cell></DataTable.Cell>
          <DataTable.Cell></DataTable.Cell>
          <DataTable.Cell>{list.reduce((a, b) => a + b.r_mucronota, 0)}</DataTable.Cell>
          <DataTable.Cell>{list.reduce((a, b) => a + b.r_stylosa, 0)}</DataTable.Cell>
          <DataTable.Cell>{list.reduce((a, b) => a + b.r_apiculata, 0)}</DataTable.Cell>
          <DataTable.Cell>{list.reduce((a, b) => a + b.avicennia_spp, 0)}</DataTable.Cell>
          <DataTable.Cell>{list.reduce((a, b) => a + b.ceriops_spp, 0)}</DataTable.Cell>
          <DataTable.Cell>{list.reduce((a, b) => a + b.xylocarpus_spp, 0)}</DataTable.Cell>
          <DataTable.Cell>{list.reduce((a, b) => a + b.bruguiera_spp, 0)}</DataTable.Cell>
          <DataTable.Cell>{list.reduce((a, b) => a + b.sonneratia_spp, 0)}</DataTable.Cell>
          <DataTable.Cell>
            {list.reduce((a, b) => a + b.r_mucronota + b.r_stylosa + b.r_apiculata + b.avicennia_spp + b.ceriops_spp + b.xylocarpus_spp + b.bruguiera_spp + b.sonneratia_spp, 0)}
          </DataTable.Cell>
        </DataTable.Row>
        </DataTable>
      </ScrollView>
    }
      </View>
    )
}