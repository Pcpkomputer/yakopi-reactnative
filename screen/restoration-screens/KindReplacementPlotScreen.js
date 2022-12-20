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




export default function KindReplacementPlot(props){

    const globalContext = useContext(GlobalContext);

    const [listLoading, setListLoading] = useState(true);
    const [list, setList] = useState([]);

    let fetchList = async () =>{
        setListLoading(true);
        let id = props.route.params.id_replacement_plot;
        let request = await fetch(`${endpoint}/kind-replacement-plot`,{
            method:"POST",
            headers:{
                "authorization":`Bearer ${globalContext.credentials.token}`,
                "content-type":"application/json"
            },
            body:JSON.stringify({
              id_replacement_plot:id
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
        <TouchableOpacity 
            activeOpacity={0.6}
            onPress={()=>{
                props.navigation.navigate("InputDetailReplacementPlot",{ id_replacement_plot:props.route.params.id_replacement_plot });
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
          >Kode Site (100%)</DataTable.Title>
           <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
          sortDirection='descending'
          >Kode Plot (100%)</DataTable.Title>
           <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
          sortDirection='descending'
          >Luas Plot (ha) (100%)</DataTable.Title>
          <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
          sortDirection='descending'
          >Kode Plot</DataTable.Title>
          <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
          sortDirection='descending'
          >Luas Plot (ha)</DataTable.Title>
          <DataTable.Title style={{flex:1,width:Dimensions.get("window").width/3}}
          sortDirection='descending'
          >Koordinat</DataTable.Title>
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
            {
              (props.route.params.status == "1") &&
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

                              let id = item.id_detail_replacement_plot;
                              let request = await fetch(`${endpoint}/delete-kind-replacement-plot`,{
                                  method:"DELETE",
                                  headers:{
                                      "authorization":`Bearer ${globalContext.credentials.token}`,
                                      "content-type":"application/json"
                                  },
                                  body:JSON.stringify({
                                    id_detail_replacement_plot:id
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
                    props.navigation.navigate("AssetReplacementPlot",{type:"image",id_detail_replacement_plot:item.id_detail_replacement_plot,status:props.route.params.status});
                }}
                style={{backgroundColor:"#05ACAC",borderRadius:EStyleSheet.value("5rem"),paddingHorizontal:EStyleSheet.value("10rem"),paddingVertical:EStyleSheet.value("5rem")}}>
                    <Entypo name="image" size={EStyleSheet.value("15rem")} color="white" />
                </TouchableOpacity>
                <TouchableOpacity 
                  onPress={()=>{
                    props.navigation.navigate("AssetReplacementPlot",{type:"video",id_detail_replacement_plot:item.id_detail_replacement_plot,status:props.route.params.status});
                }}
                style={{backgroundColor:"#F59C1B",borderRadius:EStyleSheet.value("5rem"),paddingHorizontal:EStyleSheet.value("10rem"),paddingVertical:EStyleSheet.value("5rem")}}>
                    <Feather name="video" size={EStyleSheet.value("15rem")} color="white" />
                </TouchableOpacity>
                <TouchableOpacity 
                    onPress={()=>{
                      props.navigation.navigate("AssetReplacementPlot",{type:"drone",id_detail_replacement_plot:item.id_detail_replacement_plot,status:props.route.params.status});
                  }}
                  style={{backgroundColor:"#49B6D6",borderRadius:EStyleSheet.value("5rem"),paddingHorizontal:EStyleSheet.value("10rem"),paddingVertical:EStyleSheet.value("5rem")}}>
                      <MaterialCommunityIcons name="drone" size={EStyleSheet.value("15rem")} color="white" />
                  </TouchableOpacity>
              
              </View>
              
          }
          {
              (props.route.params.status != "1") &&
              <Text>{index+1}</Text>
          }
            </DataTable.Cell>
           <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.site_code_all}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.plot_code_all}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.area_plot_all}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.plot_code}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.area_plot}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>
            <TouchableOpacity 
              activeOpacity={0.8}
              onPress={()=>{
                  var scheme = Platform.OS === 'ios' ? 'maps:' : 'geo:';
                  var url = scheme + `${item.lat_replacement_plot},${item.long_replacement_plot}`;
                  Linking.openURL(url);
              }}
              style={{justifyContent:"center",alignItems:"center",padding:EStyleSheet.value("10rem"),paddingRight:EStyleSheet.value("20rem")}}>
                  <View style={{backgroundColor:"#B4E197",borderRadius:EStyleSheet.value("5rem"),padding:EStyleSheet.value("10rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
                    <Text style={{color:"#fff"}}>Lokasi</Text>
                  </View>
              </TouchableOpacity>
            </DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.r_mucronota}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.r_stylosa}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.r_apiculata}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.avicennia_spp}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.ceriops_spp}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.xylocarpus_spp}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.bruguiera_spp}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{item.sonneratia_spp}</DataTable.Cell>
            <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>
              {item.r_mucronata + item.r_stylosa + item.r_apiculata + item.avicennia_spp + item.ceriops_spp + item.xylocarpus_spp + item.bruguiera_spp + item.sonneratia_spp}
            </DataTable.Cell>
          </DataTable.Row>
        ))}
         <DataTable.Row style={styles.tableTotal}>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>Total</DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}></DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}></DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}></DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}></DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}></DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}></DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{list.reduce((a, b) => a + b.r_mucronata, 0)}</DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{list.reduce((a, b) => a + b.r_stylosa, 0)}</DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{list.reduce((a, b) => a + b.r_apiculata, 0)}</DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{list.reduce((a, b) => a + b.avicennia_spp, 0)}</DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{list.reduce((a, b) => a + b.ceriops_spp, 0)}</DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{list.reduce((a, b) => a + b.xylocarpus_spp, 0)}</DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{list.reduce((a, b) => a + b.bruguiera_spp, 0)}</DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>{list.reduce((a, b) => a + b.sonneratia_spp, 0)}</DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>
            {list.reduce((a, b) => a + b.r_mucronata + b.r_stylosa + b.r_apiculata + b.avicennia_spp + b.ceriops_spp + b.xylocarpus_spp + b.bruguiera_spp + b.sonneratia_spp, 0)}
          </DataTable.Cell>
        </DataTable.Row>
        {/* Rata rata */}
        <DataTable.Row style={styles.tableTotal}>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>Rata-rata</DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}></DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}></DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}></DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}></DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}></DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}></DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>
            {list.length > 0 ? (list.reduce((a, b) => a + b.r_mucronata, 0) / list.length).toFixed(2) : 0}
          </DataTable.Cell>
          <DataTable.Cell style={{flex:1,width:Dimensions.get("window").width/3}}>
            {list.length > 0 ? (list.reduce((a, b) => a + b.r_stylosa, 0) / list.length).toFixed(2) : 0}
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
            {list.length > 0 ? (list.reduce((a, b) => a + b.r_mucronata + b.r_stylosa + b.r_apiculata + b.avicennia_spp + b.ceriops_spp + b.xylocarpus_spp + b.bruguiera_spp + b.sonneratia_spp, 0) / list.length).toFixed(2) : 0}
          </DataTable.Cell>
        </DataTable.Row>
        </DataTable>
      </ScrollView>
    }
      </View>
    )
}