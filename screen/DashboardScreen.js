import React from 'react';
import { StyleSheet, ScrollView, Text, View, Dimensions, Image } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import { StatusBarHeight } from '../utils/HeightUtils';
import { LinearGradient } from 'expo-linear-gradient';

import { Entypo, Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 

let shadow = {
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
}


let shadow2 = {
    shadowColor: "grey",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
}

export default function DashboardScreen() {
  return (
     <View style={{flex:1,backgroundColor:"#edf0f4"}}>
        <ScrollView keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag">
            <View style={{height:StatusBarHeight,backgroundColor:"#17bd9f"}}></View>
            <View style={{backgroundColor:"#17bd9f",height:EStyleSheet.value("100rem"),flexDirection:"row",alignItems:"center",paddingHorizontal:EStyleSheet.value("15rem")}}>
                <Feather name="menu" size={24} color="white" />
                <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                    <Text style={{color:"white",fontSize:EStyleSheet.value("23rem")}}>Yakopi</Text>
                </View>
                <FontAwesome name="user" size={24} color="white" />
            </View>
            <View style={{backgroundColor:"whitesmoke",paddingTop:0,paddingBottom:0}}>
                <View style={{position:"absolute",backgroundColor:"#17bd9f",height:"50%",right:0,width:"100%"}}>
                </View>
                
                <LinearGradient
                colors={['#33c668', '#2ec5a2']}
                start={{ x: 0, y: 1 }}
                end={{ x: 1, y: 1 }}
                style={{...shadow,overflow:"hidden",marginHorizontal:EStyleSheet.value("15rem"),backgroundColor:"#2ec5a2",borderRadius:EStyleSheet.value("10rem")}}>
                    <View style={{padding:EStyleSheet.value("15rem"),flexDirection:"row"}}>
                        <View style={{backgroundColor:"whitesmoke",overflow:"hidden",borderRadius:EStyleSheet.value("5rem"),width:EStyleSheet.value("80rem"),height:EStyleSheet.value("100rem")}}>
                            <Image style={{width:"100%",height:"100%"}} source={{uri:"https://cdn1-production-images-kly.akamaized.net/Ox45KRSgCbfZleEyxdswoqKJcTw=/535x710/smart/filters:quality(75):strip_icc():format(jpeg)/kly-media-production/medias/3350868/original/056911700_1610786361-20210116-potret-keluarga-manusia-perak-ARBAS-6.jpg"}}/>
                        </View>
                        <View style={{paddingLeft:EStyleSheet.value("20rem"),flex:1,justifyContent:"center"}}>
                            <Text style={{color:"white",fontSize:EStyleSheet.value("15rem")}}>Selamat pagi!</Text>
                            <Text style={{marginTop:EStyleSheet.value("5rem"),flex:1,textAlignVertical:"center",color:"white",fontFamily:"PoppinsMedium",fontSize:EStyleSheet.value("20rem")}}>Padang Perwira Yudha</Text>
                            <View style={{backgroundColor:"whitesmoke",justifyContent:"center",alignItems:"center",borderRadius:EStyleSheet.value("10rem"),flex:1,marginTop:EStyleSheet.value("10rem")}}>
                                <Text>Presensi</Text>
                            </View>
                        </View>
                    </View>
                    <View style={{height:EStyleSheet.value("40rem"),paddingBottom:EStyleSheet.value("10rem"),justifyContent:"space-evenly",paddingHorizontal:EStyleSheet.value("20rem"),flexDirection:"row",alignItems:"center"}}>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <Entypo name="time-slot" size={EStyleSheet.value("20rem")} color="white" />
                            <Text style={{color:"white",marginLeft:EStyleSheet.value("10rem")}}>Presensi :</Text>
                        </View>
                        <View style={{flexDirection:"row",alignItems:"center"}}>
                            <Entypo name="time-slot" size={EStyleSheet.value("20rem")} color="white" />
                            <Text style={{color:"white",marginLeft:EStyleSheet.value("10rem")}}>Pulang :</Text>
                        </View>
                    </View>
                </LinearGradient>
            </View>
            <View style={{marginTop:EStyleSheet.value("30rem"),flexDirection:"row",paddingHorizontal:EStyleSheet.value("15rem")}}>
                <View style={{...shadow2,flex:1,backgroundColor:"#fafafa",marginRight:EStyleSheet.value("10rem")}}>
                    <View style={{backgroundColor:"#fafafa",overflow:"hidden",borderRadius:EStyleSheet.value("5rem")}}>
                        <View style={{padding:EStyleSheet.value("10rem"),zIndex:99,justifyContent:"center",alignItems:"center",height:EStyleSheet.value("140rem")}}>
                            <Text numberOfLines={2} style={{color:"white",fontSize:EStyleSheet.value("22rem"),textAlign:"center"}}>Restoration</Text>
                        </View>

                        <Image style={{position:"absolute",width:"100%",height:"100%"}} source={{uri:"https://media.istockphoto.com/photos/mangroove-tree-detail-view-picture-id830059752?k=20&m=830059752&s=170667a&w=0&h=B2XDDDbhsJTxP7OcpFspMnQbhZ6xXAJ_MKDUHjPR2jM="}}/>
                    
                        <LinearGradient
                        style={{position:"absolute",bottom:0,width:"100%",height:"50%"}}
                        colors={['transparent', 'rgba(0,0,0,1)']}>
                        </LinearGradient>
                    </View>
                </View>
                <View style={{...shadow2,flex:1,backgroundColor:"#fafafa",marginLeft:EStyleSheet.value("10rem")}}>
                    <View style={{backgroundColor:"#fafafa",overflow:"hidden",borderRadius:EStyleSheet.value("5rem")}}>
                        <View style={{padding:EStyleSheet.value("10rem"),zIndex:99,justifyContent:"center",alignItems:"center",height:EStyleSheet.value("140rem")}}>
                            <Text style={{color:"white",fontSize:EStyleSheet.value("22rem"),textAlign:"center"}}>Community Development</Text>
                        </View>

                        <Image style={{position:"absolute",width:"100%",height:"100%"}} source={{uri:"https://islandsafarimergui.com/wp-content/uploads/2012/06/Mangroove-Trees-in-Lampi-Island-1.jpg"}}/>
                    
                        <LinearGradient
                        style={{position:"absolute",bottom:0,width:"100%",height:"50%"}}
                        colors={['transparent', 'rgba(0,0,0,1)']}>
                        </LinearGradient>
                    </View>
                </View>
            </View>
            <View style={{paddingHorizontal:EStyleSheet.value("15rem"),marginTop:EStyleSheet.value("30rem")}}>
                <View style={{...shadow2,backgroundColor:"#fafafa",overflow:"hidden",borderRadius:EStyleSheet.value("5rem")}}>
                    <View style={{padding:EStyleSheet.value("10rem"),zIndex:99,justifyContent:"center",alignItems:"center",height:EStyleSheet.value("140rem")}}>
                        <Text style={{color:"white",fontSize:EStyleSheet.value("40rem")}}>Simulation</Text>
                    </View>

                    <Image style={{position:"absolute",width:"100%",height:"100%"}} source={{uri:"https://lingkarjateng.com/wp-content/uploads/2020/03/Mangroove.jpg"}}/>
                
                    <LinearGradient
                    style={{position:"absolute",bottom:0,width:"100%",height:"50%"}}
                    colors={['transparent', 'rgba(0,0,0,1)']}>
                    </LinearGradient>
                </View>
            </View>
        </ScrollView>

        <View style={{position:"absolute",alignItems:"center",width:"100%",flexDirection:"row",justifyContent:"space-between",bottom:EStyleSheet.value("30rem"),paddingHorizontal:EStyleSheet.value("20rem")}}>
            <View>
                <Feather name="user" size={24} color="black" />
            </View>
            <View>
                <View style={{...shadow2,overflow:"hidden",justifyContent:"center",alignItems:"center",backgroundColor:"white",borderRadius:999,width:EStyleSheet.value("60rem"),height:EStyleSheet.value("60rem")}}>
                    <Image resizeMode="stretch" style={{width:"50%",height:"70%"}} source={{uri:"https://devjobsindo.org/wp-content/uploads/2022/02/WhatsApp-Image-2022-02-25-at-5.14.01-PM-200x287.jpeg"}}/>
                </View>
            </View>
            <View>
                <MaterialCommunityIcons name="logout" size={24} color="black" />
            </View>
        </View>
     </View>
  );
}


