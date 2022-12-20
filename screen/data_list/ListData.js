import React,{useState,useEffect, useContext} from 'react';
import { StyleSheet, Platform, ScrollView, ActivityIndicator, Alert, Linking, AsyncStorage, TouchableOpacity, Text, TextInput, View, Dimensions, Image } from 'react-native';

import EStyleSheet from 'react-native-extended-stylesheet';

import { StatusBarHeight } from '../../utils/HeightUtils';
import { LinearGradient } from 'expo-linear-gradient';

import { CommonActions, useIsFocused } from '@react-navigation/native';

import { toLocaleTimestamp } from '../../utils/utils';

import { Entypo, Feather, FontAwesome, AntDesign, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons'; 

import {endpoint} from '../../utils/endpoint';

import {GlobalContext} from '../../App';
import { getDistance } from 'geolib';

const ListData = (props) => {

    var item = props.data
    var locationData = JSON.parse(item.location_data)
    var dataGpx = item.file
    if(locationData != null){
        // Data location data
        var lastLocation = locationData[locationData.length - 1];
        var firstLocation = locationData[0];
        var jarakMeter = getDistance(
        {
            latitude: parseFloat(firstLocation.latitude),
            longitude: parseFloat(firstLocation.longitude)
        },
        {
            latitude: parseFloat(lastLocation.latitude),
            longitude: parseFloat(lastLocation.longitude)
        },
    )
    }

    return (
        <>
                    
            <TouchableOpacity
                style={{ marginBottom: EStyleSheet.value("20rem") }}
                activeOpacity={0.7}
                onPress={() => {
                    console.log('dada')
                }}>
                <LinearGradient
                    colors={['#1e915a', '#5daa5f']}
                    start={{ x: 0, y: 1 }}
                    end={{ x: 1, y: 1 }}
                    style={{ flexDirection: "row", marginHorizontal: EStyleSheet.value("20rem"), borderRadius: EStyleSheet.value("5rem") }}>
                    <View style={{ paddingHorizontal: EStyleSheet.value("20rem"), justifyContent: "center", alignItems: "center", paddingVertical: EStyleSheet.value("20rem") }}>
                        {
                            item.file == null &&
                            <Text style={{ color: "white", fontSize: EStyleSheet.value("20rem"), fontWeight: "bold" }}>{jarakMeter} m</Text>
                        }
                        {
                            item.file != null &&
                            <FontAwesome name="file" size={EStyleSheet.value("30rem")} color="white" />
                        }
                    </View>
                    <View style={{ flexDirection: "column", flex: 1, justifyContent: 'center' }}>
                        
                        <View style={{ padding: EStyleSheet.value("10rem") }}>
                        <Text style={{ color: "white",fontWeight: "bold",  fontSize: EStyleSheet.value("14rem") }}>{item.keterangan}</Text>
                            <Text style={{ color: "white", fontWeight: "bold", fontSize: EStyleSheet.value("10rem"), paddingBottom: EStyleSheet.value("10rem") }}>{item.created_at}</Text>
                            
                        </View>
                    </View>
                    <TouchableOpacity
                        activeOpacity={0.8}
                        onPress={() => {
                          
                        }}
                        style={{ justifyContent: "center", alignItems: "center", padding: EStyleSheet.value("10rem"), paddingRight: EStyleSheet.value("20rem") }}>
                        <View style={{ backgroundColor: "#B4E197", borderRadius: EStyleSheet.value("5rem"), padding: EStyleSheet.value("10rem"), paddingHorizontal: EStyleSheet.value("20rem") }}>
                            <FontAwesome name="map-marker" size={24} color="#005555" />
                        </View>
                    </TouchableOpacity>
                </LinearGradient>
                <View style={{ marginHorizontal: EStyleSheet.value("20rem"), flexDirection: "row", justifyContent: "space-around", padding: EStyleSheet.value("10rem"), backgroundColor: "#DDDDDD" }}>
                    {
                        item.file != null &&
                    <TouchableOpacity
                        onPress={() => {
                           
                        }}
                        style={{ backgroundColor: "#9ed649", borderRadius: EStyleSheet.value("5rem"), paddingHorizontal: EStyleSheet.value("10rem"), paddingVertical: EStyleSheet.value("5rem") }}>
                        <MaterialCommunityIcons name="eye" size={EStyleSheet.value("15rem")} color="white" />
                    </TouchableOpacity>
                    }

                </View>
            </TouchableOpacity>
        </>
    )
}

export default ListData