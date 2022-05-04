import React,{useState,useEffect, useContext} from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, Pressable, AsyncStorage, TouchableOpacity, Text, TextInput, View, Dimensions, Image } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import { StatusBarHeight } from '../utils/HeightUtils';
import { LinearGradient } from 'expo-linear-gradient';

import { CommonActions } from '@react-navigation/native';

import { Entypo, Feather, FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons'; 

import {endpoint} from '../utils/endpoint';

import {GlobalContext} from '../App';

import RestorationTextInput from './restoration-components/RestorationTextInput';
import RestorationSelectInput from './restoration-components/RestorationSelectInput';
import RestorationDateInput from './restoration-components/RestorationDateInput';

import DatePicker from 'react-native-modern-datepicker';

export default function DetailRestorationScreen(props){

    const [showSelectDateInput, setShowSelectDateInput] = useState(false);
    const [labelSelectDateInput, setLabelSelectDateInput] = useState("");
    const [indexSelectDateInput, setIndexSelectDateInput] = useState(-1);

    const [showSelectInput, setShowSelectInput] = useState(false);
    const [listSelectInput, setListSelectInput] = useState([]);
    const [labelSelectInput, setLabelSelectInput] = useState("");
    const [indexSelectInput, setIndexSelectInput] = useState(-1);

    const [project,setProject] = useState(["Project 1","Project 2"]);

    const [schema, setSchema] = useState([
        {
            type:"textinput",
            label:"Site Code",
            value:""
        },
        {
            type:"selectinput",
            label:"Project",
            value:""
        },
        {
            type:"textinput",
            label:"Surveyor",
            value:""
        },
        {
            type:"dateinput",
            label:"Date Land Assessment",
            value:""
        },
    ]);

    return (
        <View style={{flex:1}}>


        {
            (showSelectDateInput) &&
            <View style={{position:"absolute",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",zIndex:1000}}>
                <Pressable 
                onPress={()=>{
                    setShowSelectInput(false);
                }}
                style={{backgroundColor:"black",position:"absolute",opacity:0.2,width:"100%",height:"100%",zIndex:999}}></Pressable>
                <View style={{backgroundColor:"white",overflow:"hidden",width:Dimensions.get("screen").width-EStyleSheet.value("50rem"),borderRadius:EStyleSheet.value("5rem"),zIndex:1000}}>
                   <DatePicker
                   options={{
                    mainColor: '#1e915a',
                  }}
                   onSelectedChange={(date)=>{
                        setSchema((prev)=>{
                            return prev.map((item_,i)=>{
                                if(i===indexSelectDateInput){
                                    return {
                                        ...item_,
                                        value:date
                                    }
                                }
                                return item_;
                            })
                        });
                       setShowSelectDateInput(false);
                   }}
                   />
                </View>
            </View>
        }

        {
            (showSelectInput) &&
            <View style={{position:"absolute",width:"100%",height:"100%",justifyContent:"center",alignItems:"center",zIndex:1000}}>
                <Pressable 
                onPress={()=>{
                    setShowSelectInput(false);
                }}
                style={{backgroundColor:"black",position:"absolute",opacity:0.2,width:"100%",height:"100%",zIndex:999}}></Pressable>
                <View style={{backgroundColor:"white",overflow:"hidden",width:Dimensions.get("screen").width-EStyleSheet.value("50rem"),borderRadius:EStyleSheet.value("5rem"),zIndex:1000}}>
                    <View style={{height:EStyleSheet.value("50rem"),backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center"}}>
                        <Text>{labelSelectInput}</Text>
                    </View>
                    <ScrollView style={{height:EStyleSheet.value("200rem")}}>
                        {
                            listSelectInput.map((item,index)=>{
                                return (
                                    <Pressable 
                                    onPress={()=>{
                                        setSchema((prev)=>{
                                            return prev.map((item_,i)=>{
                                                if(i===indexSelectInput){
                                                    return {
                                                        ...item_,
                                                        value:item
                                                    }
                                                }
                                                return item_;
                                            })
                                        });
                                        setShowSelectInput(false);
                                    }}
                                    android_ripple={{
                                        color:"#e8e8e8"
                                    }}
                                    style={{paddingVertical:EStyleSheet.value("20rem"),justifyContent:"center",alignItems:"center"}}>
                                        <Text>{item}</Text>
                                    </Pressable>
                                )
                            })
                        }
                    </ScrollView>
                </View>
            </View>
        }


            <View style={{height:StatusBarHeight}}></View>
            <View style={{backgroundColor:"#f6f7fb",justifyContent:"center",alignItems:"center",height:EStyleSheet.value("50rem")}}>
                <Text style={{fontSize:EStyleSheet.value("16rem"),color:"#a9adb8"}}>Isikan form restoration berikut</Text>
            </View>
            <ScrollView
            keyboardShouldPersistTaps="always" keyboardDismissMode="on-drag"
            >
               {
                   schema.map((item,index)=>{
                       if(item.type==="textinput"){
                            return (
                            <RestorationTextInput  
                            getter={schema}
                            setter={setSchema}
                            index={index}
                            label={item.label}/>
                           )
                       }
                       else if(item.type==="selectinput"){
                            return (
                            <RestorationSelectInput  
                            getter={schema}
                            setter={setSchema}
                            index={index}
                            item={project}
                            onSelectPress={()=>{
                                setShowSelectInput(true);
                                setListSelectInput(project);
                                setLabelSelectInput(item.label);
                                setIndexSelectInput(index);
                            }}
                            label={item.label}/>
                           )
                       }
                       else if(item.type==="dateinput"){
                        return (
                        <RestorationDateInput  
                        getter={schema}
                        setter={setSchema}
                        index={index}
                        onSelectPress={()=>{
                            setShowSelectDateInput(true);
                            setIndexSelectDateInput(index);
                        }}
                        label={item.label}/>
                       )
                   }
                       
                   })
               }
            </ScrollView>
        </View>
    )
}