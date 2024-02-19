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




export default function KindPlotBoundaringScreen(props){

    const globalContext = useContext(GlobalContext);
    const focused = useIsFocused();

    const [listLoading, setListLoading] = useState(true);
    const [list, setList] = useState([]);

    let fetchList = async () =>{
        setListLoading(true);
        let id = props.route.params.id_plot_boundaring;
        let request = await fetch(`${endpoint}/kind-plot-boundering`,{
            method:"POST",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`,
                "content-type":"application/json"
            },
            body:JSON.stringify({
              id_plot_boundaring:id
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
                props.navigation.navigate("InputDetailPlotBoundaring",{ id_plot_boundaring:props.route.params.id_plot_boundaring });
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
                  >Kode Site</DataTable.Title>
                  <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
                  sortDirection='descending'
                  >Kode Plot</DataTable.Title>
                  <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
                  sortDirection='descending'
                  >Luas Plot</DataTable.Title>
                  <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
                  sortDirection='descending'
                  >Latitude</DataTable.Title>
                  <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
                  sortDirection='descending'
                  >Longitude</DataTable.Title>
                  <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
                  sortDirection='descending'
                  >Colok / Propagul</DataTable.Title>
                  <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
                  sortDirection='descending'
                  >Nursery</DataTable.Title>
                  <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
                  sortDirection='descending'
                  >R.mucronata</DataTable.Title>
                  <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
                  sortDirection='descending'
                  >R.stylosa</DataTable.Title>
                  <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
                  sortDirection='descending'
                  >R.apiculata</DataTable.Title>
                  <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
                  sortDirection='descending'
                  >Avicennia spp</DataTable.Title>
                  <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
                  sortDirection='descending'
                  >Ceriops spp</DataTable.Title>
                  <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
                  sortDirection='descending'
                  >Xylocarpus spp</DataTable.Title>
                  <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
                  sortDirection='descending'
                  >Bruguiera spp</DataTable.Title>
                  <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
                  sortDirection='descending'
                  >Sonneratia spp</DataTable.Title>
                  <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
                  sortDirection='descending'
                  >Agroforestry</DataTable.Title>
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

                              let id = item.id_detail_plot_boundaring;
                              let request = await fetch(`${endpoint}/delete-kind-plot-boundering`,{
                                  method:"DELETE",
                                  headers:{
                                      "authorization":`Bearer ${globalContext.credentials.token}`,
                                      "content-type":"application/json"
                                  },
                                  body:JSON.stringify({
                                    id_detail_plot_boundaring:id
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
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.kode_site}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.kode_plot}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.luas}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.lat_detail_plot_bounding}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.long_detail_plot_bounding}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.sistem_tanam_1}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.sistem_tanam_2}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.r_mucronota}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.r_stylosa}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.r_apiculata}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.avicennia_spp}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.ceriops_spp}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.xylocarpus_spp}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.bruguiera_spp}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.sonneratia_spp}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.agroforestri}</DataTable.Cell>
          </DataTable.Row>
        ))}
        </DataTable>
      </ScrollView>
        }
      </View>
    )
}