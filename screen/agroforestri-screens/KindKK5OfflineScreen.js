import React,{useState,useEffect, useContext} from 'react';
import { StyleSheet, ScrollView, ActivityIndicator,Alert, Pressable, TouchableOpacity, Text, TextInput, View, Dimensions, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EStyleSheet from 'react-native-extended-stylesheet';

import { StatusBarHeight } from '../../utils/HeightUtils';
import { LinearGradient } from 'expo-linear-gradient';

import { CommonActions, useIsFocused } from '@react-navigation/native';

import { Entypo, Feather, FontAwesome, MaterialCommunityIcons,AntDesign } from '@expo/vector-icons'; 

import {endpoint} from '../../utils/endpoint';

import {GlobalContext} from '../../App';

import { DataTable } from 'react-native-paper';




export default function KindKK5Offline(props){

    const globalContext = useContext(GlobalContext);
    const focused = useIsFocused();

    

    const [KK5, setKK5] = useState(globalContext.KK5);
    const [KK5Kind, setKK5Kind] = useState(globalContext.KK5Kind);
    const id_agroforest_KK5 = props.route.params.id_agroforest_KK5;

    const [listLoading, setListLoading] = useState(true);
    const [list, setList] = useState([]);

    let fetchList = async () =>{
        setListLoading(true);
        let list = await AsyncStorage.getItem("KK5Kind");
        console.log(list);
        list = JSON.parse(list);
        if(list===null){
            list = [];
        }
        list = list.filter((item)=>{
            return item.id === id_agroforest_KK5;
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
                props.navigation.navigate("InputDetailKK5Offline",{ id_agroforest_KK5:props.route.params.id_agroforest_KK5 });
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
          >Tanggal</DataTable.Title>
          <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
          sortDirection='descending'
          >Total</DataTable.Title>
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
                                  let list = await AsyncStorage.getItem("KK5Kind");
                                  list = JSON.parse(list);
                                  
                                  if (list === null) {
                                      list = [];
                                  }

                                  list.splice(index, 1);
                                  await AsyncStorage.setItem("KK5Kind", JSON.stringify(list));

                                  // Update the local state
                                  setKK5Kind(list);

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
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.date_kt5_detail}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.total}</DataTable.Cell>
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
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{list.reduce((a, b) => a + b.total, 0)}</DataTable.Cell>
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