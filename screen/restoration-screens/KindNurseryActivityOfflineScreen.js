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




export default function KindNurseryActivity(props){

    const globalContext = useContext(GlobalContext);

    const focused = useIsFocused();

    

    const [KT3, setKT3] = useState(globalContext.KT3);
    const [KT3Kind, setKT3Kind] = useState(globalContext.KT3Kind);
    const id_nursery_activity = props.route.params.id_nursery_activity;

    const [listLoading, setListLoading] = useState(true);
    const [list, setList] = useState([]);

    let fetchList = async () =>{
        setListLoading(true);
        let list = await AsyncStorage.getItem("KT3Kind");
        list = JSON.parse(list);
        if(list===null){
            list = [];
        }
        list = list.filter((item)=>{
            return item.id === id_nursery_activity;
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
                props.navigation.navigate("InputDetailNurseryActivityOffline",{ id_nursery_activity:props.route.params.id_nursery_activity });
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
          >Tanggal</DataTable.Title>
          <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
          sortDirection='descending'
          >Pekerja</DataTable.Title>
           <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
          sortDirection='descending'
          >Pria</DataTable.Title>
           <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
          sortDirection='descending'
          >Wanita</DataTable.Title>
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
                                  let list = await AsyncStorage.getItem("KT3Kind");
                                  list = JSON.parse(list);
                                  
                                  if (list === null) {
                                      list = [];
                                  }

                                  list.splice(index, 1);
                                  await AsyncStorage.setItem("KT3Kind", JSON.stringify(list));

                                  // Update the local state
                                  setKT3Kind(list);

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
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.tanggal_collecting}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.jumlah_pekerja}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.pria}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.wanita}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.r_mucronoto}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.r_styloso}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.r_apiculata}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.avicennia_spp}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.ceriops_spp}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.xylocarpus_spp}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.bruguiera_spp}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.sonneratia_spp}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>
              {item.r_mucronoto + item.r_styloso + item.r_apiculata + item.avicennia_spp + item.ceriops_spp + item.xylocarpus_spp + item.bruguiera_spp + item.sonneratia_spp}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
        <DataTable.Row style={styles.tableTotal}>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>Total</DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}></DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{list.reduce((a, b) => a + b.jumlah_pekerja, 0)}</DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{list.reduce((a, b) => a + b.pria, 0)}</DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{list.reduce((a, b) => a + b.wanita, 0)}</DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{list.reduce((a, b) => a + b.r_mucronoto, 0)}</DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{list.reduce((a, b) => a + b.r_styloso, 0)}</DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{list.reduce((a, b) => a + b.r_apiculata, 0)}</DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{list.reduce((a, b) => a + b.avicennia_spp, 0)}</DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{list.reduce((a, b) => a + b.ceriops_spp, 0)}</DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{list.reduce((a, b) => a + b.xylocarpus_spp, 0)}</DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{list.reduce((a, b) => a + b.bruguiera_spp, 0)}</DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{list.reduce((a, b) => a + b.sonneratia_spp, 0)}</DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>
            {list.reduce((a, b) => a + b.r_mucronoto + b.r_styloso + b.r_apiculata + b.avicennia_spp + b.ceriops_spp + b.xylocarpus_spp + b.bruguiera_spp + b.sonneratia_spp, 0)}
          </DataTable.Cell>
        </DataTable.Row>
        {/* Rata rata */}
        <DataTable.Row style={styles.tableTotal}>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>Rata-rata</DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}></DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>
            {list.length > 0 ? (list.reduce((a, b) => a + b.jumlah_pekerja, 0) / list.length).toFixed(2) : 0}
          </DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>
            {list.length > 0 ? (list.reduce((a, b) => a + b.pria, 0) / list.length).toFixed(2) : 0}
          </DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>
            {list.length > 0 ? (list.reduce((a, b) => a + b.wanita, 0) / list.length).toFixed(2) : 0}
          </DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>
            {list.length > 0 ? (list.reduce((a, b) => a + b.r_mucronoto, 0) / list.length).toFixed(2) : 0}
          </DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>
            {list.length > 0 ? (list.reduce((a, b) => a + b.r_styloso, 0) / list.length).toFixed(2) : 0}
          </DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>
            {list.length > 0 ? (list.reduce((a, b) => a + b.r_apiculata, 0) / list.length).toFixed(2) : 0}
          </DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>
            {list.length > 0 ? (list.reduce((a, b) => a + b.avicennia_spp, 0) / list.length).toFixed(2) : 0}
          </DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>
            {list.length > 0 ? (list.reduce((a, b) => a + b.ceriops_spp, 0) / list.length).toFixed(2) : 0}
          </DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>
            {list.length > 0 ? (list.reduce((a, b) => a + b.xylocarpus_spp, 0) / list.length).toFixed(2) : 0}
          </DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>
            {list.length > 0 ? (list.reduce((a, b) => a + b.bruguiera_spp, 0) / list.length).toFixed(2) : 0}
          </DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>
            {list.length > 0 ? (list.reduce((a, b) => a + b.sonneratia_spp, 0) / list.length).toFixed(2) : 0}
          </DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>
            {list.length > 0 ? (list.reduce((a, b) => a + b.r_mucronoto + b.r_styloso + b.r_apiculata + b.avicennia_spp + b.ceriops_spp + b.xylocarpus_spp + b.bruguiera_spp + b.sonneratia_spp, 0) / list.length).toFixed(2) : 0}
          </DataTable.Cell>
        </DataTable.Row>
        </DataTable>
      </ScrollView>
    }
      </View>
    )
}