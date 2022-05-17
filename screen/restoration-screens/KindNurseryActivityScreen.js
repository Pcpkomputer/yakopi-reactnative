import React,{useState,useEffect, useContext} from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, Pressable, AsyncStorage, TouchableOpacity, Text, TextInput, View, Dimensions, Image } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import { StatusBarHeight } from '../../utils/HeightUtils';
import { LinearGradient } from 'expo-linear-gradient';

import { CommonActions } from '@react-navigation/native';

import { Entypo, Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 

import {endpoint} from '../../utils/endpoint';

import {GlobalContext} from '../../App';

import { DataTable } from 'react-native-paper';




export default function KindNurseryActivity(props){

    const globalContext = useContext(GlobalContext);

    const [listLoading, setListLoading] = useState(true);
    const [list, setList] = useState([]);

    let fetchList = async () =>{
        setListLoading(true);
        let id = props.route.params.id_nursery_activity;
        let request = await fetch(`${endpoint}/kind-nursery-activity`,{
            method:"POST",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`,
                "content-type":"application/json"
            },
            body:JSON.stringify({
                id_nursery_activity:id
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
      <ScrollView horizontal>
        <DataTable style={styles.container}>
        <DataTable.Header style={styles.tableHeader}>
          <DataTable.Title 
          sortDirection='descending'
          >Tanggal</DataTable.Title>
          <DataTable.Title
          sortDirection='descending'
          >Pekerja</DataTable.Title>
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
            <DataTable.Cell>{item.tanggal_collecting}</DataTable.Cell>
            <DataTable.Cell>{item.jumlah_pekerja}</DataTable.Cell>
            <DataTable.Cell numeric>{item.r_mucronoto}</DataTable.Cell>
            <DataTable.Cell numeric>{item.r_styloso}</DataTable.Cell>
            <DataTable.Cell numeric>{item.r_apiculata}</DataTable.Cell>
            <DataTable.Cell numeric>{item.avicennia_spp}</DataTable.Cell>
            <DataTable.Cell numeric>{item.ceriops_spp}</DataTable.Cell>
            <DataTable.Cell numeric>{item.xylocarpus_spp}</DataTable.Cell>
            <DataTable.Cell numeric>{item.bruguiera_spp}</DataTable.Cell>
            <DataTable.Cell numeric>{item.sonneratia_spp}</DataTable.Cell>
            <DataTable.Cell numeric>
              {item.r_mucronoto + item.r_styloso + item.r_apiculata + item.avicennia_spp + item.ceriops_spp + item.xylocarpus_spp + item.bruguiera_spp + item.sonneratia_spp}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
        <DataTable.Row style={styles.tableTotal}>
          <DataTable.Cell>Total</DataTable.Cell>
          <DataTable.Cell numeric>{list.reduce((a, b) => a + b.jumlah_pekerja, 0)}</DataTable.Cell>
          <DataTable.Cell numeric>{list.reduce((a, b) => a + b.r_mucronoto, 0)}</DataTable.Cell>
          <DataTable.Cell numeric>{list.reduce((a, b) => a + b.r_styloso, 0)}</DataTable.Cell>
          <DataTable.Cell numeric>{list.reduce((a, b) => a + b.r_apiculata, 0)}</DataTable.Cell>
          <DataTable.Cell numeric>{list.reduce((a, b) => a + b.avicennia_spp, 0)}</DataTable.Cell>
          <DataTable.Cell numeric>{list.reduce((a, b) => a + b.ceriops_spp, 0)}</DataTable.Cell>
          <DataTable.Cell numeric>{list.reduce((a, b) => a + b.xylocarpus_spp, 0)}</DataTable.Cell>
          <DataTable.Cell numeric>{list.reduce((a, b) => a + b.bruguiera_spp, 0)}</DataTable.Cell>
          <DataTable.Cell numeric>{list.reduce((a, b) => a + b.sonneratia_spp, 0)}</DataTable.Cell>
          <DataTable.Cell numeric>
            {list.reduce((a, b) => a + b.r_mucronoto + b.r_styloso + b.r_apiculata + b.avicennia_spp + b.ceriops_spp + b.xylocarpus_spp + b.bruguiera_spp + b.sonneratia_spp, 0)}
          </DataTable.Cell>
        </DataTable.Row>
        </DataTable>
      </ScrollView>
    
    )
}