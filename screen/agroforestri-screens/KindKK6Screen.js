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




export default function KindKK6(props){

    const globalContext = useContext(GlobalContext);
    const focused = useIsFocused();

    const [listLoading, setListLoading] = useState(true);
    const [list, setList] = useState([]);

    let fetchList = async () =>{
        setListLoading(true);
        let id = props.route.params.id_agroforest_kt6;
        let request = await fetch(`${endpoint}/kind-agroforest-kt6`,{
            method:"POST",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`,
                "content-type":"application/json"
            },
            body:JSON.stringify({
                id_agroforest_kt6:id
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
                props.navigation.navigate("InputDetailKK6",{ id_agroforest_kt6:props.route.params.id_agroforest_kt6 });
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
                  >Nursery</DataTable.Title>
                  <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
                  sortDirection='descending'
                  >Coffea sp</DataTable.Title>
                  <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
                  sortDirection='descending'
                  >Parkia speciosa</DataTable.Title>
                  <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
                  sortDirection='descending'
                  >Archidendron pauciflorum</DataTable.Title>
                  <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
                  sortDirection='descending'
                  >Durio Zibethinus Murr</DataTable.Title>
                  <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
                  sortDirection='descending'
                  >Leucaena leucocephala</DataTable.Title>
                  <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
                  sortDirection='descending'
                  >Persea americana</DataTable.Title>
                  <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
                  sortDirection='descending'
                  >Sub-total Bibit</DataTable.Title>
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

                              let id = item.id_agroforest_kt6_detail;
                              let request = await fetch(`${endpoint}/delete-kind-agroforest-kt6`,{
                                  method:"DELETE",
                                  headers:{
                                      "authorization":`Bearer ${globalContext.credentials.token}`,
                                      "content-type":"application/json"
                                  },
                                  body:JSON.stringify({
                                    id_agroforest_kt6_detail:id
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
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.site_code}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.plot_code}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.luas}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.latitude}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.longtitude}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.nursery}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.bibit_1}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.bibit_2}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.bibit_3}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.bibit_4}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.bibit_5}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.bibit_6}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>
              {item.bibit_1 + item.bibit_2 + item.bibit_3 + item.bibit_4 + item.bibit_5 + item.bibit_6}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
        <DataTable.Row style={styles.tableTotal}>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>Total</DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}/>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}/>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{list.reduce((a, b) => a + b.luas, 0)}</DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{list.reduce((a, b) => a + b.bibit_1, 0)}</DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{list.reduce((a, b) => a + b.bibit_2, 0)}</DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{list.reduce((a, b) => a + b.bibit_3, 0)}</DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{list.reduce((a, b) => a + b.bibit_4, 0)}</DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{list.reduce((a, b) => a + b.bibit_5, 0)}</DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{list.reduce((a, b) => a + b.bibit_6, 0)}</DataTable.Cell>
        </DataTable.Row>
        </DataTable>
      </ScrollView>
        }
      </View>
    )
}