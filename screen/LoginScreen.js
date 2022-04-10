import React,{useState,useEffect} from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, TouchableOpacity, Text, TextInput, View, Dimensions, Image } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import { StatusBarHeight } from '../utils/HeightUtils';
import { LinearGradient } from 'expo-linear-gradient';

import { Entypo, Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 


let shadow = {
    shadowColor: "#cacaca",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
}

export default function LoginScreen(props) {

    const [loginLoading, setLoginLoading] = useState(false);

    return (
        <View style={{flex:1,backgroundColor:"#fbfbfb"}}>
             <View style={{height:StatusBarHeight,backgroundColor:"#17bd9f"}}></View>
             <View style={{flex:1,justifyContent:"center",alignItems:"center"}}>
                <Text style={{fontSize:EStyleSheet.value("24rem"),color:"#8c8d90"}}>Masuk</Text>
                <Text style={{color:"#565e6f",fontSize:EStyleSheet.value("14rem"),marginTop:EStyleSheet.value("10rem"),marginBottom:EStyleSheet.value("10rem")}}>Masuk menggunakan email dan password</Text>
                <Entypo name="chevron-small-down" size={EStyleSheet.value("20rem")} color="#565e6f" />
                <View style={{...shadow,borderRadius:EStyleSheet.value("5rem"),padding:EStyleSheet.value("15rem"),marginTop:EStyleSheet.value("20rem"),width:Dimensions.get("screen").width-EStyleSheet.value("50rem"),backgroundColor:"white"}}>
                    <View style={{borderBottomWidth:1,borderColor:"#dadada",paddingBottom:EStyleSheet.value("5rem")}}>
                        <Text style={{color:"#acacb1"}}>Email</Text>
                        <TextInput style={{color:"#383b40",fontFamily:"PoppinsMedium"}} value="padangperwirayudha@gmail.com" placeholder="Email"/>
                    </View>
                    <View style={{borderBottomWidth:0,marginTop:EStyleSheet.value("10rem"),borderColor:"#dadada",paddingBottom:EStyleSheet.value("5rem")}}>
                        <Text style={{color:"#acacb1"}}>Password</Text>
                        <TextInput secureTextEntry={true} style={{color:"#383b40",fontFamily:"PoppinsMedium"}} value="padangperwirayudha@gmail.com" placeholder="Email"/>
                    </View>
                </View>
               {
                   (loginLoading) ?
                   <TouchableOpacity
                   activeOpacity={0.8}
                   onPress={()=>{
                   
                   }}
                   >
                       <LinearGradient 
                       colors={['#2ec5a2','#33c668','#33c668']}
                       start={{ x: 0, y: 1 }}
                       end={{ x: 1, y: 1 }}
                       style={{paddingVertical:EStyleSheet.value("13rem"),paddingHorizontal:EStyleSheet.value("20rem"),height:EStyleSheet.value("50rem"),justifyContent:"center",alignItems:"center",marginTop:EStyleSheet.value("25rem"),borderRadius:EStyleSheet.value("5rem"),backgroundColor:"#2bc3a7",width:Dimensions.get("screen").width-EStyleSheet.value("50rem")}}>
                          <ActivityIndicator color="white"/>
                       </LinearGradient>
                   </TouchableOpacity>
                   :
                   <TouchableOpacity
                   activeOpacity={0.8}
                   onPress={()=>{
                        setLoginLoading(true);
                        setTimeout(() => {
                            setLoginLoading(false);
                            props.navigation.navigate("Dashboard")
                        }, 1000);
                   }}
                   >
                       <LinearGradient 
                       colors={['#2ec5a2','#33c668','#33c668']}
                       start={{ x: 0, y: 1 }}
                       end={{ x: 1, y: 1 }}
                       style={{paddingVertical:EStyleSheet.value("13rem"),paddingHorizontal:EStyleSheet.value("20rem"),height:EStyleSheet.value("50rem"),justifyContent:"center",alignItems:"center",marginTop:EStyleSheet.value("25rem"),borderRadius:EStyleSheet.value("5rem"),backgroundColor:"#2bc3a7",width:Dimensions.get("screen").width-EStyleSheet.value("50rem")}}>
                           <Text style={{color:"white",fontFamily:"PoppinsMedium",fontSize:EStyleSheet.value("15rem")}}>Masuk</Text>
                       </LinearGradient>
                   </TouchableOpacity>
               }
             </View>
        </View>
    )
}