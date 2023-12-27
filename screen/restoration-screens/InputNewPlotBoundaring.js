import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Platform, ScrollView, ActivityIndicator, Alert, Linking,  TouchableOpacity, Text, TextInput, View, Dimensions, Image } from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";

import EStyleSheet from 'react-native-extended-stylesheet';

import { StatusBarHeight } from '../../utils/HeightUtils';
import { LinearGradient } from 'expo-linear-gradient';
import moment from "moment";

import * as Location from "expo-location";

import { CommonActions, useIsFocused } from '@react-navigation/native';

import { getLocationHistory, getUsername, removeTrackingStatus, setTrackingStatus, toLocaleTimestamp } from '../../utils/utils';

import { Entypo, Feather, FontAwesome, AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';

import { endpoint } from '../../utils/endpoint';

import { GlobalContext } from '../../App';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';


const InputNewPlotBoundaring = (props) => {
    const focused = useIsFocused();

    const globalContext = useContext(GlobalContext);
    const [isTracking, setIsTracking] = useState(false)
    const [saveButton, showSaveButton] = useState(false)
    let [keterangan, setKeterangan] = useState('')
    let [totalHektar, setTotalHektar] = useState(0)

    const processTracking = async () => {
        if(isTracking){
            clearInterval(globalContext.intervalTrackingPosition.current);
            globalContext.intervalTrackingPosition.current = setInterval(async () => {
                let currentLocation = await Location.getLastKnownPositionAsync();
                let coords = currentLocation.coords;
                let timestamp = moment().format("DD-MM-YYYY HH:SS:mm");
                let store = await AsyncStorage.getItem("trackinglocation");
                coords = { ...coords, timestamp };
                if (store) {
                    let parsed = JSON.parse(store);
                    await AsyncStorage.setItem("trackinglocation", JSON.stringify([...parsed, coords]));
                } else {
                    await AsyncStorage.setItem("trackinglocation", JSON.stringify([coords]));
                }
                setIsTracking(false)
                removeTrackingStatus()
                showSaveButton(true)
            }, 5000);
        }else{
            setTrackingStatus('1')
            setIsTracking(true)
            showSaveButton(false)
        }
    }

    useEffect(() => {
        AsyncStorage.removeItem('log_gps')
    }, [])

    const processSave = async () => {
        clearInterval(globalContext.intervalTrackingPosition.current);
        let track = await AsyncStorage.getItem("trackinglocation");
        console.log(track)
        await AsyncStorage.removeItem("trackinglocation");
        // const listLocation = await getLocationHistory()
        // const userName = await getUsername()
        // if(listLocation.length > 0){
            let body = {
                location: track,
                keterangan: keterangan,
                total_hektar: totalHektar,
            }
            console.log(body)
            // location/insertdata
            let request = await fetch(`${endpoint}/save-coordinate-tracking`,{
                method:"POST",
                headers:{
                    "authorization":`Bearer ${globalContext.credentials.token}`,
                    "content-type":"application/json",
                },
                body: JSON.stringify(body)
              });
            
            var response = JSON.parse(await request.text())
            if(response.code == 200){
                props.navigation.goBack();
            }else{
                console.log(response)
            }
    //     }else{
    //         alert('Lokasi terlalu pendek')
    //     }
    }

    return (
        <>
            <View style={{ flex: 1, justifyContent: 'center', backgroundColor: '#fff' }}>
                <View style={{ alignSelf: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: EStyleSheet.value("20rem"), color: "black", fontWeight: 'bold' }}>Tracking KT-6</Text>
                    <TouchableOpacity onPress={e => processTracking()} style={{ marginTop: EStyleSheet.value("20rem"), backgroundColor: isTracking ? "red" : "#1e915a", paddingHorizontal: EStyleSheet.value("15rem"), paddingVertical: EStyleSheet.value("15rem"), borderRadius: EStyleSheet.value("10rem"), justifyContent: "center", alignItems: "center", marginBottom: EStyleSheet.value("20rem") }}>
                        <Text style={{ color: "white" }}>{isTracking ? "Stop Tracking" : "Start Tracking"}</Text>
                    </TouchableOpacity>
                    <Text style={{ color: "black" }}>{isTracking ? "Tracking sedang berlangsung" : "Ketuk tombol diatas untuk memulai"}</Text>
                    {
                        saveButton &&
                            
                            <View style={{ marginTop: EStyleSheet.value("20rem"), paddingHorizontal: EStyleSheet.value("15rem"), paddingVertical: EStyleSheet.value("15rem"), borderRadius: EStyleSheet.value("10rem"), justifyContent: "center", alignItems: "center", marginBottom: EStyleSheet.value("20rem") }}>
                                <Text style={{ color: "black" }}>Keterangan Tracking</Text>
                                <TextInput
                                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 200, marginTop: 10 }}
                                    onChangeText={text => setKeterangan(text)}
                                    value={keterangan}
                                />
                                <Text style={{ color: "black", marginTop: 10 }}>Total Hektar</Text>
                                <TextInput
                                    style={{ height: 40, borderColor: 'gray', borderWidth: 1, width: 200, marginTop: 10 }}
                                    onChangeText={text => setTotalHektar(text)}
                                    value={totalHektar}
                                    keyboardType="numeric"
                                />
                                <TouchableOpacity onPress={e => processSave()} style={{ marginTop: EStyleSheet.value("20rem"), backgroundColor: "#1e915a", paddingHorizontal: EStyleSheet.value("15rem"), paddingVertical: EStyleSheet.value("15rem"), borderRadius: EStyleSheet.value("10rem"), justifyContent: "center", alignItems: "center", marginBottom: EStyleSheet.value("20rem") }}>
                                    <Text style={{ color: "white" }}>Save</Text>
                                </TouchableOpacity>
                            </View>
                        
                    }
                </View>

            </View>
        </>
    )
}

export default InputNewPlotBoundaring