import React, { useState, useEffect, useCallback, createContext, useRef } from 'react';
import { StyleSheet, Text, View, Dimensions, Button,TouchableOpacity, Image, Alert ,Linking} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EStyleSheet from 'react-native-extended-stylesheet';
import { endpoint } from './utils/endpoint';
import * as Application from 'expo-application';
import NetInfo from "@react-native-community/netinfo";

import DashboardScreen from './screen/DashboardScreen';
import ProfileScreen from './screen/ProfileScreen';
import LoginScreen from './screen/LoginScreen';
import RestorationScreen from './screen/RestorationScreen';
import ComdevScreen from './screen/ComdevScreen';
import ResearchScreen from './screen/ResearchScreen';
import BiodiversityScreen from './screen/BiodiversityScreen';
import AgroforestriScreen from './screen/AgroforestriScreen';

import InputCutiScreen from './screen/cuti-screens/InputCutiScreen';
import ListCutiScreen from './screen/cuti-screens/ListCutiScreen';
import DetailCutiScreen from './screen/cuti-screens/DetailCutiScreen';
import * as TaskManager from 'expo-task-manager'
import * as Location from 'expo-location'

import ListBounderingScreen from './screen/agroforestri-screens/ListBounderingScreen';
import InputBounderingScreen from './screen/agroforestri-screens/InputBounderingScreen';

import FilterKK1Screen from './screen/agroforestri-screens/FilterKK1Screen';
import ListKK1Screen from './screen/agroforestri-screens/ListKK1Screen';
import ListKK1OfflineScreen from './screen/agroforestri-screens/ListKK1OfflineScreen';
import InputKK1Screen from './screen/agroforestri-screens/InputKK1Screen';
import InputKK1OfflineScreen from './screen/agroforestri-screens/InputKK1OfflineScreen';
import UpdateKK1Screen from './screen/agroforestri-screens/UpdateKK1Screen';
import DetailKK1Screen from './screen/agroforestri-screens/DetailKK1Screen';
import AssetsKK1Screen from './screen/agroforestri-screens/AssetsKK1Screen';

import FilterKK2Screen from './screen/agroforestri-screens/FilterKK2Screen';
import ListKK2Screen from './screen/agroforestri-screens/ListKK2Screen';
import ListKK2OfflineScreen from './screen/agroforestri-screens/ListKK2OfflineScreen';
import InputKK2Screen from './screen/agroforestri-screens/InputKK2Screen';
import InputKK2OfflineScreen from './screen/agroforestri-screens/InputKK2OfflineScreen';
import UpdateKK2Screen from './screen/agroforestri-screens/UpdateKK2Screen';
import DetailKK2Screen from './screen/agroforestri-screens/DetailKK2Screen';
import AssetsKK2Screen from './screen/agroforestri-screens/AssetsKK2Screen';
import KindKK2Screen from './screen/agroforestri-screens/KindKK2Screen';
import KindKK2OfflineScreen from './screen/agroforestri-screens/KindKK2OfflineScreen';
import InputDetailKK2Screen from './screen/agroforestri-screens/InputDetailKK2Screen';
import InputDetailKK2OfflineScreen from './screen/agroforestri-screens/InputDetailKK2OfflineScreen';

import FilterKK3Screen from './screen/agroforestri-screens/FilterKK3Screen';
import ListKK3Screen from './screen/agroforestri-screens/ListKK3Screen';
import ListKK3OfflineScreen from './screen/agroforestri-screens/ListKK3OfflineScreen';
import InputKK3Screen from './screen/agroforestri-screens/InputKK3Screen';
import InputKK3OfflineScreen from './screen/agroforestri-screens/InputKK3OfflineScreen';
import UpdateKK3Screen from './screen/agroforestri-screens/UpdateKK3Screen';
import DetailKK3Screen from './screen/agroforestri-screens/DetailKK3Screen';
import AssetsKK3Screen from './screen/agroforestri-screens/AssetsKK3Screen';
import KindKK3Screen from './screen/agroforestri-screens/KindKK3Screen';
import KindKK3OfflineScreen from './screen/agroforestri-screens/KindKK3OfflineScreen';
import InputDetailKK3Screen from './screen/agroforestri-screens/InputDetailKK3Screen';
import InputDetailKK3OfflineScreen from './screen/agroforestri-screens/InputDetailKK3OfflineScreen';

import FilterKK4Screen from './screen/agroforestri-screens/FilterKK4Screen';
import ListKK4Screen from './screen/agroforestri-screens/ListKK4Screen';
import ListKK4OfflineScreen from './screen/agroforestri-screens/ListKK4OfflineScreen';
import InputKK4Screen from './screen/agroforestri-screens/InputKK4Screen';
import InputKK4OfflineScreen from './screen/agroforestri-screens/InputKK4OfflineScreen';
import UpdateKK4Screen from './screen/agroforestri-screens/UpdateKK4Screen';
import DetailKK4Screen from './screen/agroforestri-screens/DetailKK4Screen';
import KindKK4Screen from './screen/agroforestri-screens/KindKK4Screen';
import KindKK4OfflineScreen from './screen/agroforestri-screens/KindKK4OfflineScreen';
import InputDetailKK4Screen from './screen/agroforestri-screens/InputDetailKK4Screen';
import InputDetailKK4OfflineScreen from './screen/agroforestri-screens/InputDetailKK4OfflineScreen';

import FilterKK5Screen from './screen/agroforestri-screens/FilterKK5Screen';
import ListKK5Screen from './screen/agroforestri-screens/ListKK5Screen';
import ListKK5OfflineScreen from './screen/agroforestri-screens/ListKK5OfflineScreen';
import InputKK5Screen from './screen/agroforestri-screens/InputKK5Screen';
import InputKK5OfflineScreen from './screen/agroforestri-screens/InputKK5OfflineScreen';
import UpdateKK5Screen from './screen/agroforestri-screens/UpdateKK5Screen';
import DetailKK5Screen from './screen/agroforestri-screens/DetailKK5Screen';
import KindKK5Screen from './screen/agroforestri-screens/KindKK5Screen';
import KindKK5OfflineScreen from './screen/agroforestri-screens/KindKK5OfflineScreen';
import InputDetailKK5Screen from './screen/agroforestri-screens/InputDetailKK5Screen';
import InputDetailKK5OfflineScreen from './screen/agroforestri-screens/InputDetailKK5OfflineScreen';

import FilterKK6Screen from './screen/agroforestri-screens/FilterKK6Screen';
import ListKK6Screen from './screen/agroforestri-screens/ListKK6Screen';
import ListKK6OfflineScreen from './screen/agroforestri-screens/ListKK6OfflineScreen';
import InputKK6Screen from './screen/agroforestri-screens/InputKK6Screen';
import InputKK6OfflineScreen from './screen/agroforestri-screens/InputKK6OfflineScreen';
import UpdateKK6Screen from './screen/agroforestri-screens/UpdateKK6Screen';
import DetailKK6Screen from './screen/agroforestri-screens/DetailKK6Screen';
import KindKK6Screen from './screen/agroforestri-screens/KindKK6Screen';
import KindKK6OfflineScreen from './screen/agroforestri-screens/KindKK6OfflineScreen';
import InputDetailKK6Screen from './screen/agroforestri-screens/InputDetailKK6Screen';
import InputDetailKK6OfflineScreen from './screen/agroforestri-screens/InputDetailKK6OfflineScreen';

import FilterKK7Screen from './screen/agroforestri-screens/FilterKK7Screen';
import ListKK7Screen from './screen/agroforestri-screens/ListKK7Screen';
import ListKK7OfflineScreen from './screen/agroforestri-screens/ListKK7OfflineScreen';
import InputKK7Screen from './screen/agroforestri-screens/InputKK7Screen';
import InputKK7OfflineScreen from './screen/agroforestri-screens/InputKK7OfflineScreen';
import UpdateKK7Screen from './screen/agroforestri-screens/UpdateKK7Screen';
import DetailKK7Screen from './screen/agroforestri-screens/DetailKK7Screen';
import KindKK7Screen from './screen/agroforestri-screens/KindKK7Screen';
import KindKK7OfflineScreen from './screen/agroforestri-screens/KindKK7OfflineScreen';
import InputDetailKK7Screen from './screen/agroforestri-screens/InputDetailKK7Screen';
import InputDetailKK7OfflineScreen from './screen/agroforestri-screens/InputDetailKK7OfflineScreen';

import FilterKK8Screen from './screen/agroforestri-screens/FilterKK8Screen';
import ListKK8Screen from './screen/agroforestri-screens/ListKK8Screen';
import ListKK8OfflineScreen from './screen/agroforestri-screens/ListKK8OfflineScreen';
import InputKK8Screen from './screen/agroforestri-screens/InputKK8Screen';
import InputKK8OfflineScreen from './screen/agroforestri-screens/InputKK8OfflineScreen';
import UpdateKK8Screen from './screen/agroforestri-screens/UpdateKK8Screen';
import DetailKK8Screen from './screen/agroforestri-screens/DetailKK8Screen';
import KindKK8Screen from './screen/agroforestri-screens/KindKK8Screen';
import KindKK8OfflineScreen from './screen/agroforestri-screens/KindKK8OfflineScreen';
import InputDetailKK8Screen from './screen/agroforestri-screens/InputDetailKK8Screen';
import InputDetailKK8OfflineScreen from './screen/agroforestri-screens/InputDetailKK8OfflineScreen';

import FilterKK9Screen from './screen/agroforestri-screens/FilterKK9Screen';
import ListKK9Screen from './screen/agroforestri-screens/ListKK9Screen';
import ListKK9OfflineScreen from './screen/agroforestri-screens/ListKK9OfflineScreen';
import InputKK9Screen from './screen/agroforestri-screens/InputKK9Screen';
import InputKK9OfflineScreen from './screen/agroforestri-screens/InputKK9OfflineScreen';
import UpdateKK9Screen from './screen/agroforestri-screens/UpdateKK9Screen';
import DetailKK9Screen from './screen/agroforestri-screens/DetailKK9Screen';
import KindKK9Screen from './screen/agroforestri-screens/KindKK9Screen';
import KindKK9OfflineScreen from './screen/agroforestri-screens/KindKK9OfflineScreen';
import InputDetailKK9Screen from './screen/agroforestri-screens/InputDetailKK9Screen';
import InputDetailKK9OfflineScreen from './screen/agroforestri-screens/InputDetailKK9OfflineScreen';

import FilterKK10Screen from './screen/agroforestri-screens/FilterKK10Screen';
import ListKK10Screen from './screen/agroforestri-screens/ListKK10Screen';
import ListKK10OfflineScreen from './screen/agroforestri-screens/ListKK10OfflineScreen';
import InputKK10Screen from './screen/agroforestri-screens/InputKK10Screen';
import InputKK10OfflineScreen from './screen/agroforestri-screens/InputKK10OfflineScreen';
import UpdateKK10Screen from './screen/agroforestri-screens/UpdateKK10Screen';
import DetailKK10Screen from './screen/agroforestri-screens/DetailKK10Screen';
import KindKK10Screen from './screen/agroforestri-screens/KindKK10Screen';
import KindKK10OfflineScreen from './screen/agroforestri-screens/KindKK10OfflineScreen';
import InputDetailKK10Screen from './screen/agroforestri-screens/InputDetailKK10Screen';
import InputDetailKK10OfflineScreen from './screen/agroforestri-screens/InputDetailKK10OfflineScreen';

import InputLandAssessmentScreen from './screen/restoration-screens/InputLandAssessmentScreen';
import InputLandAssessmentOfflineScreen from './screen/restoration-screens/InputLandAssessmentOfflineScreen';
import UpdateLandAssessmentScreen from './screen/restoration-screens/UpdateLandAssessmentScreen';
import UpdateLandAssessmentOfflineScreen from './screen/restoration-screens/UpdateLandAssessmentOfflineScreen';
import ListLandAssessmentScreen from './screen/restoration-screens/ListLandAssessmentScreen';
import ListLandAssessmentOfflineScreen from './screen/restoration-screens/ListLandAssessmentOfflineScreen';
import FilterLandAssessmentScreen from './screen/restoration-screens/FilterLandAssessmentScreen';
import DetailLandAssessmentScreen from './screen/restoration-screens/DetailLandAssessmentScreen';
import AssetsLandAssessmentScreen from './screen/restoration-screens/AssetsLandAssesmentScreen';

import InputSeedCollectingScreen from './screen/restoration-screens/InputSeedCollectingScreen';
import InputSeedCollectingOfflineScreen from './screen/restoration-screens/InputSeedCollectingOfflineScreen';
import UpdateSeedCollectingScreen from './screen/restoration-screens/UpdateSeedCollectingScreen'; 
import UpdateSeedCollectingOfflineScreen from './screen/restoration-screens/UpdateSeedCollectingOfflineScreen';
import ListSeedCollectingScreen from './screen/restoration-screens/ListSeedCollectingScreen';
import ListSeedCollectingOfflineScreen from './screen/restoration-screens/ListSeedCollectingOfflineScreen';
import FilterSeedCollectingScreen from './screen/restoration-screens/FilterSeedCollectingScreen';
import KindSeedCollectingScreen from './screen/restoration-screens/KindSeedCollectingScreen';
import KindSeedCollectingOfflineScreen from './screen/restoration-screens/KindSeedCollectingOfflineScreen';
import DetailSeedCollectingScreen from './screen/restoration-screens/DetailSeedCollectingScreen';
import InputDetailSeedCollectingScreen from './screen/restoration-screens/InputDetailSeedCollecting';
import InputDetailSeedCollectingOfflineScreen from './screen/restoration-screens/InputDetailSeedCollectingOfflineScreen';
import AssetsSeedCollectingScreen from './screen/restoration-screens/AssetsSeedCollectionScreen';

import ListNurseryActivityScreen from './screen/restoration-screens/ListNurseryActivityScreen';
import ListNurseryActivityOfflineScreen from './screen/restoration-screens/ListNurseryActivityOfflineScreen';
import InputNurseryActivityScreen from './screen/restoration-screens/InputNurseryActivityScreen';
import InputNurseryActivityOfflineScreen from './screen/restoration-screens/InputNurseryActivityOfflineScreen';
import UpdateNurseryActivityScreen from './screen/restoration-screens/UpdateNurseryActivityScreen';
import UpdateNurseryActivityOfflineScreen from './screen/restoration-screens/UpdateNurseryActivityOfflineScreen';
import FilterNurseryActivityScreen from './screen/restoration-screens/FilterNurseryActivityScreen';
import KindNurseryActivityScreen from './screen/restoration-screens/KindNurseryActivityScreen';
import KindNurseryActivityOfflineScreen from './screen/restoration-screens/KindNurseryActivityOfflineScreen';
import DetailNurseryActivityScreen from './screen/restoration-screens/DetailNurseryActivityScreen';
import InputDetailNurseryActivityScreen from './screen/restoration-screens/InputDetailNurseryActivityScreen';
import InputDetailNurseryActivityOfflineScreen from './screen/restoration-screens/InputDetailNurseryActivityOfflineScreen';
import AssetsNurseryActivityScreen from './screen/restoration-screens/AssetsNurseryActivityScreen';

import ListPlantingActionScreen from './screen/restoration-screens/ListPlantingActionScreen';
import ListPlantingActionOfflineScreen from './screen/restoration-screens/ListPlantingActionOfflineScreen';
import InputPlantingActionScreen from './screen/restoration-screens/InputPlantingActionScreen';
import InputPlantingActionOfflineScreen from './screen/restoration-screens/InputPlantingActionOfflineScreen';
import UpdatePlantingActionScreen from './screen/restoration-screens/UpdatePlantingActionScreen';
import UpdatePlantingActionOfflineScreen from './screen/restoration-screens/UpdatePlantingActionOfflineScreen';
import FilterPlantingActionScreen from './screen/restoration-screens/FilterPlantingActionScreen';
import KindPlantingActionScreen from './screen/restoration-screens/KindPlantingActionScreen';
import KindPlantingActionOfflineScreen from './screen/restoration-screens/KindPlantingActionOfflineScreen';
import DetailPlantingActionScreen from './screen/restoration-screens/DetailPlantingActionScreen';
import InputDetailPlantingActionScreen from './screen/restoration-screens/InputDetailPlantingActionScreen';
import InputDetailPlantingActionOfflineScreen from './screen/restoration-screens/InputDetailPlantingActionOfflineScreen';
import AssetsPlantingActionScreen from './screen/restoration-screens/AssetsPlantingActionScreen';

import ListTransportScreen from './screen/restoration-screens/ListTransportScreen';
import ListTransportOfflineScreen from './screen/restoration-screens/ListTransportOfflineScreen';
import InputTransportScreen from './screen/restoration-screens/InputTransportScreen';
import InputTransportOfflineScreen from './screen/restoration-screens/InputTransportOfflineScreen';
import UpdateTransportScreen from './screen/restoration-screens/UpdateTransportScreen';
import UpdateTransportOfflineScreen from './screen/restoration-screens/UpdateTransportOfflineScreen';
import FilterTransportScreen from './screen/restoration-screens/FilterTransportScreen';
import KindTransportScreen from './screen/restoration-screens/KindTransportScreen';
import KindTransportOfflineScreen from './screen/restoration-screens/KindTransportOfflineScreen';
import DetailTransportScreen from './screen/restoration-screens/DetailTransportScreen';
import InputDetailTransportScreen from './screen/restoration-screens/InputDetailTransportScreen';
import InputDetailTransportOfflineScreen from './screen/restoration-screens/InputDetailTransportOfflineScreen';
import AssetsTransportScreen from './screen/restoration-screens/AssetsTransportScreen';

import ListGrowthScreen from './screen/restoration-screens/ListGrowthScreen';
import ListGrowthOfflineScreen from './screen/restoration-screens/ListGrowthOfflineScreen';
import InputGrowthScreen from './screen/restoration-screens/InputGrowthScreen';
import InputGrowthOfflineScreen from './screen/restoration-screens/InputGrowthOfflineScreen';
import UpdateGrowthScreen from './screen/restoration-screens/UpdateGrowthScreen';
import UpdateGrowthOfflineScreen from './screen/restoration-screens/UpdateGrowthOfflineScreen';
import FilterGrowthScreen from './screen/restoration-screens/FilterGrowthScreen';
import KindGrowthScreen from './screen/restoration-screens/KindGrowthScreen';
import KindGrowthOfflineScreen from './screen/restoration-screens/KindGrowthOfflineScreen';
import DetailGrowthScreen from './screen/restoration-screens/DetailGrowthScreen';
import InputDetailGrowthScreen from './screen/restoration-screens/InputDetailGrowthScreen';
import InputDetailGrowthOfflineScreen from './screen/restoration-screens/InputDetailGrowthOfflineScreen';

import ListReplantingScreen from './screen/restoration-screens/ListReplantingScreen';
import ListReplantingOfflineScreen from './screen/restoration-screens/ListReplantingOfflineScreen';
import InputReplantingScreen from './screen/restoration-screens/InputReplantingScreen';
import InputReplantingOfflineScreen from './screen/restoration-screens/InputReplantingOfflineScreen';
import UpdateReplantingScreen from './screen/restoration-screens/UpdateReplantingScreen';
import UpdateReplantingOfflineScreen from './screen/restoration-screens/UpdateReplantingOfflineScreen';
import FilterReplantingScreen from './screen/restoration-screens/FilterReplantingScreen';
import KindReplantingScreen from './screen/restoration-screens/KindReplantingScreen';
import KindReplantingOfflineScreen from './screen/restoration-screens/KindReplantingOfflineScreen';
import DetailReplantingScreen from './screen/restoration-screens/DetailReplantingScreen';
import InputDetailReplantingScreen from './screen/restoration-screens/InputDetailReplantingScreen';
import InputDetailReplantingOfflineScreen from './screen/restoration-screens/InputDetailReplantingOfflineScreen';
import AssetsReplantingScreen from './screen/restoration-screens/AssetsReplantingScreen';

import ListSubtitutePlotScreen from './screen/restoration-screens/ListSubtitutePlotScreen';
import ListSubtitutePlotOfflineScreen from './screen/restoration-screens/ListSubtitutePlotOfflineScreen';
import InputSubtitutePlotScreen from './screen/restoration-screens/InputSubtitutePlotScreen';
import InputSubtitutePlotOfflineScreen from './screen/restoration-screens/InputSubtitutePlotOfflineScreen';
import UpdateSubtitutePlotScreen from './screen/restoration-screens/UpdateSubtitutePlotScreen';
import FilterSubtitutePlotScreen from './screen/restoration-screens/FilterSubtitutePlotScreen';
import KindSubtitutePlotScreen from './screen/restoration-screens/KindSubtitutePlotScreen';
import KindSubtitutePlotOfflineScreen from './screen/restoration-screens/KindSubtitutePlotOfflineScreen';
import DetailSubtitutePlotScreen from './screen/restoration-screens/DetailSubtitutePlotScreen';
import InputDetailSubtitutePlotScreen from './screen/restoration-screens/InputDetailSubtitutePlotScreen';
import InputDetailSubtitutePlotOfflineScreen from './screen/restoration-screens/InputDetailSubtitutePlotOfflineScreen';
import AssetsSubtitutePlotScreen from './screen/restoration-screens/AssetsSubtitutePlotScreen';

import ListReplacementPlotScreen from './screen/restoration-screens/ListReplacementPlotScreen';
import ListReplacementPlotOfflineScreen from './screen/restoration-screens/ListReplacementPlotOfflineScreen';
import InputReplacementPlotScreen from './screen/restoration-screens/InputReplacementPlotScreen';
import InputReplacementPlotOfflineScreen from './screen/restoration-screens/InputReplacementPlotOfflineScreen';
import UpdateReplacementPlotScreen from './screen/restoration-screens/UpdateReplacementPlotScreen';
import FilterReplacementPlotScreen from './screen/restoration-screens/FilterReplacementPlotScreen';
import KindReplacementPlotScreen from './screen/restoration-screens/KindReplacementPlotScreen';
import KindReplacementPlotOfflineScreen from './screen/restoration-screens/KindReplacementPlotOfflineScreen';
import DetailReplacementPlotScreen from './screen/restoration-screens/DetailReplacementPlotScreen';
import InputDetailReplacementPlotScreen from './screen/restoration-screens/InputDetailReplacementPlotScreen';
import InputDetailReplacementPlotOfflineScreen from './screen/restoration-screens/InputDetailReplacementPlotOfflineScreen';
import AssetsReplacementPlotScreen from './screen/restoration-screens/AssetsReplacementPlotScreen';

import InputCommunityRegisterScreen from './screen/comdev-screens/InputCommunityScreen';
import InputComunnityOfflineScreen from './screen/comdev-screens/InputCommunityOfflineScreen';
import ListCommunityRegisterScreen from './screen/comdev-screens/ListCommunityScreen';
import UpdateCommunityRegisterScreen from './screen/comdev-screens/UpdateCommunityScreen';
import ListCommunityRegisterOfflineScreen from './screen/comdev-screens/ListCommunityOfflineScreen';
import FilterCommunityScreen from './screen/comdev-screens/FilterCommunityScreen';
import DetailCommunityRegisterScreen from './screen/comdev-screens/DetailCommunityScreen';

import InputSilvosheryScreen from './screen/comdev-screens/InputSilvosheryScreen';
import InputSilvosheryOfflineScreen from './screen/comdev-screens/InputSilvosheryOfflineScreen';
import UpdateSilvosheryScreen from './screen/comdev-screens/UpdateSilvosheryScreen';
import ListSilvosheryScreen from './screen/comdev-screens/ListSilvosheryScreen';
import ListSilvosheryOfflineScreen from './screen/comdev-screens/ListSilvosheryOfflineScreen';
import FilterSilvosheryScreen from './screen/comdev-screens/FilterSilvosheryScreen';
import DetailSilvosheryScreen from './screen/comdev-screens/DetailSilvosheryScreen';

import InputCommunityGroupScreen from './screen/comdev-screens/InputCommunityGroupScreen';
import InputComunnityGroupOfflineScreen from './screen/comdev-screens/InputComunnityGroupOfflineScreen';
import UpdateCommunityGroupScreen from './screen/comdev-screens/UpdateCommunityGroupScreen';
import ListCommunityGroupScreen from './screen/comdev-screens/ListCommunityGroupScreen';
import ListCommunityGroupOfflineScreen from './screen/comdev-screens/ListCommunityGroupOfflineScreen';
import FilterCommunityGroupScreen from './screen/comdev-screens/FilterCommunityGroupScreen';
import DetailCommunityGroupScreen from './screen/comdev-screens/DetailCommunityGroupScreen';
import DokumentasiCommunityGroupScreen from './screen/comdev-screens/DokumentasiCommunityGroupScreen';

import ListGrowthResearchScreen from './screen/research-screens/ListGrowthResearchScreen';
import ListGrowthResearchOfflineScreen from './screen/research-screens/ListGrowthResearchOfflineScreen';
import InputGrowthResearchScreen from './screen/research-screens/InputGrowthResearchScreen';
import UpdateGrowthResearchScreen from './screen/research-screens/UpdateGrowthResearchScreen';
import InputGrowthResearchOfflineScreen from './screen/research-screens/InputGrowthResearchOfflineScreen';
import FilterGrowthResearchScreen from './screen/research-screens/FilterGrowthResearchScreen';
import KindGrowthResearchScreen from './screen/research-screens/KindGrowthResearchScreen';
import DetailGrowthResearchScreen from './screen/research-screens/DetailGrowthResearchScreen';
import InputDetailGrowthResearchScreen from './screen/research-screens/InputDetailGrowthResearchScreen';
import AssetsGrowthResearchScreen from './screen/research-screens/AssetsGrowthResearchScreen';

import ListDiversityFaunaScreen from './screen/research-screens/ListDiversityFaunaScreen';
import ListDiversityFaunaOfflineScreen from './screen/research-screens/ListDiversityFaunaOfflineScreen';
import InputDiversityFaunaScreen from './screen/research-screens/InputDiversityFaunaScreen';
import InputDiversityFaunaOfflineScreen from './screen/research-screens/InputDiversityFaunaOfflineScreen';
import UpdateDiversityFaunaScreen from './screen/research-screens/UpdateDiversityFaunaScreen';
import FilterDiversityFaunaScreen from './screen/research-screens/FilterDiversityFaunaScreen';
import KindDiversityFaunaScreen from './screen/research-screens/KindDiversityFaunaScreen';
import KindDiversityFiskimScreen from './screen/research-screens/KindDiversityFiskimScreen';
import DetailDiversityFaunaScreen from './screen/research-screens/DetailDiversityFaunaScreen';
import InputDetailDiversityFaunaScreen from './screen/research-screens/InputDetailDiversityFaunaScreen';
import InputDetailDiversityFiskimScreen from './screen/research-screens/InputDetailDiversityFiskimScreen';
import AssetsDiversityFaunaScreen from './screen/research-screens/AssetsDiversityFaunaScreen';

import ListDiversityFloraScreen from './screen/research-screens/ListDiversityFloraScreen';
import ListDiversityFloraOfflineScreen from './screen/research-screens/ListDiversityFloraOfflineScreen';
import InputDiversityFloraScreen from './screen/research-screens/InputDiversityFloraScreen';
import InputDiversityFloraOfflineScreen from './screen/research-screens/InputDiversityFloraOfflineScreen';
import FilterDiversityFloraScreen from './screen/research-screens/FilterDiversityFloraScreen';
import KindDiversityFloraScreen from './screen/research-screens/KindDiversityFloraScreen';
import DetailDiversityFloraScreen from './screen/research-screens/DetailDiversityFloraScreen';
import InputDetailDiversityFloraScreen from './screen/research-screens/InputDetailDiversityFloraScreen';
import AssetsDiversityFloraScreen from './screen/research-screens/AssetsDiversityFloraScreen';

import ListHamaScreen from './screen/research-screens/ListHamaScreen';
import ListHamaOfflineScreen from './screen/research-screens/ListHamaOfflineScreen';
import InputHamaScreen from './screen/research-screens/InputHamaScreen';
import InputHamaOfflineScreen from './screen/research-screens/InputHamaOfflineScreen';
import FilterHamaScreen from './screen/research-screens/FilterHamaScreen';
import KindHamaScreen from './screen/research-screens/KindHamaScreen';
import DetailHamaScreen from './screen/research-screens/DetailHamaScreen';
import InputDetailHamaScreen from './screen/research-screens/InputDetailHamaScreen';
import AssetsHamaScreen from './screen/research-screens/AssetsHamaScreen';

import ListFiskimScreen from './screen/research-screens/ListFiskimScreen';
import ListFiskimOfflineScreen from './screen/research-screens/ListFiskimOfflineScreen';
import InputFiskimScreen from './screen/research-screens/InputFiskimScreen';
import InputFiskimOfflineScreen from './screen/research-screens/InputFiskimOfflineScreen';
import FilterFiskimScreen from './screen/research-screens/FilterFiskimScreen';
import KindFiskimScreen from './screen/research-screens/KindFiskimScreen';
import DetailFiskimScreen from './screen/research-screens/DetailFiskimScreen';
import InputDetailFiskimScreen from './screen/research-screens/InputDetailFiskimScreen';
import DetailDataTrackingScreen from './screen/restoration-screens/DetailDataTrackingScreen';

import ListCCBScreen from './screen/research-screens/ListCCBScreen';
import ListCCBOfflineScreen from './screen/research-screens/ListCCBOfflineScreen';
import FilterCCBScreen from './screen/research-screens/FilterCCBScreen';
import InputCCBScreen from './screen/research-screens/InputCCBScreen';
import InputCCBOfflineScreen from './screen/research-screens/InputCCBOfflineScreen';
import UpdateCCBScreen from './screen/research-screens/UpdateCCBScreen';
import KindCarbonCCBScreen from './screen/research-screens/KindCarbonCCBScreen';
import InputDetailCarbonCCBScreen from './screen/research-screens/InputDetailCarbonCCBScreen';
import KindFloraCCBScreen from './screen/research-screens/KindFloraCCBScreen';
import InputDetailFloraCCBScreen from './screen/research-screens/InputDetailFloraCCBScreen';
import KindFaunaCCBScreen from './screen/research-screens/KindFaunaCCBScreen';
import InputDetailFaunaCCBScreen from './screen/research-screens/InputDetailFaunaCCBScreen';
import KindFiskimCCBScreen from './screen/research-screens/KindFiskimCCBScreen';
import InputDetailFiskimCCBScreen from './screen/research-screens/InputDetailFiskimCCBScreen';

import ListPlanktonScreen from './screen/research-screens/ListPlanktonScreen';
import ListPlanktonOfflineScreen from './screen/research-screens/ListPlanktonOfflineScreen';
import FilterPlanktonScreen from './screen/research-screens/FilterPlanktonScreen';
import InputPlanktonScreen from './screen/research-screens/InputPlanktonScreen';
import InputPlanktonOfflineScreen from './screen/research-screens/InputPlanktonOfflineScreen';
import UpdatePlanktonScreen from './screen/research-screens/UpdatePlanktonScreen';
import DetailPlanktonScreen from './screen/research-screens/DetailPlanktonScreen';
import KindFitoplanktonScreen from './screen/research-screens/KindFitoplanktonScreen';
import InputDetailFitoplanktonScreen from './screen/research-screens/InputDetailFitoplanktonScreen';
import KindZooplanktonScreen from './screen/research-screens/KindZooplanktonScreen';
import InputDetailZooplanktonScreen from './screen/research-screens/InputDetailZooplanktonScreen';
import KindPlanktonFiskimScreen from './screen/research-screens/KindPlanktonFiskimScreen';
import InputDetailPlanktonFiskimScreen from './screen/research-screens/InputDetailPlanktonFiskimScreen';


import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';

import { NavigationContainer,Link } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getTrackingStatus, getUsername, saveLocationHistory } from './utils/utils';
import LocationUtils from './utils/LocationUtils';
import ListPlatBoundaring from './screen/restoration-screens/ListPlatBoundaring';
import ListPlotBoundaringScreen from './screen/restoration-screens/ListPlotBoundaringScreen';
import InputNewPlotBoundaring from './screen/restoration-screens/InputNewPlotBoundaring';
import InputPlotBoundaringScreen from './screen/restoration-screens/InputPlotBoundaringScreen';
import KindPlotBoundaringScreen from './screen/restoration-screens/KindPlotBoundaringScreen';
import InputDetailPlotBoundaringScreen from './screen/restoration-screens/InputDetailPlotBoundaringScreen';




const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const GlobalContext = createContext();



function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View style={{ flexDirection: 'row' }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            // The `merge: true` option makes sure that the params inside the tab screen are preserved
            navigation.navigate({ name: route.name, merge: true });
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}
          >
            <Text style={{ color: isFocused ? '#673ab7' : '#222' }}>
              {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const entireScreenWidth = Dimensions.get('window').width;
EStyleSheet.build({ $rem: entireScreenWidth / 380 });

function TabNavigator() {
  return (
    <Tab.Navigator tabBar={props => null}>
      <Tab.Screen
        options={{
          headerShown: false
        }}
        name="Home" component={DashboardScreen} />
      <Tab.Screen
        options={{
          headerShown: false
        }}
        name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

function AuthNavigator() {
  return (

    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name="Login" component={LoginScreen} />
    </Stack.Navigator>
  )
}


function MasterNavigator() {
  return (

    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        options={{
          headerShown: false
        }}
        name="Dashboard" component={TabNavigator} />

      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH CUTI"
        }}
        name="InputCuti" component={InputCutiScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "LIST CUTI"
        }}
        name="ListCuti" component={ListCutiScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DETAIL CUTI"
        }}
        name="DetailCuti" component={DetailCutiScreen} />

        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "LIST BOUNDERING"
        }}
        name="ListBoundering" component={ListBounderingScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH BOUNDERING"
        }}
        name="InputBoundering" component={InputBounderingScreen} />

      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name="Agroforestri" component={AgroforestriScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "FILTER KK-1"
        }}
        name="FilterKK1" component={FilterKK1Screen} />
         <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KK-1 (SERVER)"
        }}
        name="ListKK1" component={ListKK1Screen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KK-1 (LOCAL)"
        }}
        name="ListKK1Offline" component={ListKK1OfflineScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KK-1 (SERVER)"
        }}
        name="InputKK1" component={InputKK1Screen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KK-1 (LOCAL)"
        }}
        name="InputKK1Offline" component={InputKK1OfflineScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "UPDATE KK-1"
        }}
        name="UpdateKK1" component={UpdateKK1Screen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DETAIL KK-1"
        }}
        name="DetailKK1" component={DetailKK1Screen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "ASSET KK-1"
        }}
        name="AssetsKK1" component={AssetsKK1Screen} />
      
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "FILTER KK-2"
        }}
        name="FilterKK2" component={FilterKK2Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KK-2 (SERVER)"
        }}
        name="ListKK2" component={ListKK2Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KK-2 (LOCAL)"
        }}
        name="ListKK2Offline" component={ListKK2OfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KK-2 (SERVER)"
        }}
        name="InputKK2" component={InputKK2Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KK-2 (LOCAL)"
        }}
        name="InputKK2Offline" component={InputKK2OfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "UPDATE KK-2"
        }}
        name="UpdateKK2" component={UpdateKK2Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DETAIL KK-2"
        }}
        name="DetailKK2" component={DetailKK2Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "ASSET KK-2"
        }}
        name="AssetsKK2" component={AssetsKK2Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "JENIS DAN JUMLAH BIBIT"
        }}
        name="KindKK2" component={KindKK2Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "JENIS DAN JUMLAH BIBIT (LOCAL)"
        }}
        name="KindKK2Offline" component={KindKK2OfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH JENIS & JUMLAH BIBIT"
        }}
        name="InputDetailKK2" component={InputDetailKK2Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH JENIS & JUMLAH BIBIT (LOCAL)"
        }}
        name="InputDetailKK2Offline" component={InputDetailKK2OfflineScreen} />

        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "FILTER KK-3"
        }}
        name="FilterKK3" component={FilterKK3Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KK-3 (SERVER)"
        }}
        name="ListKK3" component={ListKK3Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KK-3 (LOCAL)"
        }}
        name="ListKK3Offline" component={ListKK3OfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KK-3 (SERVER)"
        }}
        name="InputKK3" component={InputKK3Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KK-3 (LOCAL)"
        }}
        name="InputKK3Offline" component={InputKK3OfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "UPDATE KK-3"
        }}
        name="UpdateKK3" component={UpdateKK3Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DETAIL KK-3"
        }}
        name="DetailKK3" component={DetailKK3Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "ASSET KK-3"
        }}
        name="AssetsKK3" component={AssetsKK3Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "JENIS DAN JUMLAH BIBIT"
        }}
        name="KindKK3" component={KindKK3Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "JENIS DAN JUMLAH BIBIT (LOCAL)"
        }}
        name="KindKK3Offline" component={KindKK3OfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH JENIS & JUMLAH BIBIT"
        }}
        name="InputDetailKK3" component={InputDetailKK3Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH JENIS & JUMLAH BIBIT (LOCAL)"
        }}
        name="InputDetailKK3Offline" component={InputDetailKK3OfflineScreen} />


      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "FILTER KK-4"
        }}
        name="FilterKK4" component={FilterKK4Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KK-4 (SERVER)"
        }}
        name="ListKK4" component={ListKK4Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KK-4 (LOCAL)"
        }}
        name="ListKK4Offline" component={ListKK4OfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KK-4 (SERVER)"
        }}
        name="InputKK4" component={InputKK4Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KK-4 (LOCAL)"
        }}
        name="InputKK4Offline" component={InputKK4OfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "UPDATE KK-4"
        }}
        name="UpdateKK4" component={UpdateKK4Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DETAIL KK-4"
        }}
        name="DetailKK4" component={DetailKK4Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "JENIS DAN JUMLAH BIBIT"
        }}
        name="KindKK4" component={KindKK4Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "JENIS DAN JUMLAH BIBIT (LOCAL)"
        }}
        name="KindKK4Offline" component={KindKK4OfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH JENIS & JUMLAH BIBIT"
        }}
        name="InputDetailKK4" component={InputDetailKK4Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH JENIS & JUMLAH BIBIT (LOCAL)"
        }}
        name="InputDetailKK4Offline" component={InputDetailKK4OfflineScreen} />

      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "FILTER KK-5"
        }}
        name="FilterKK5" component={FilterKK5Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KK-5 (SERVER)"
        }}
        name="ListKK5" component={ListKK5Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KK-5 (LOCAL)"
        }}
        name="ListKK5Offline" component={ListKK5OfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KK-5 (SERVER)"
        }}
        name="InputKK5" component={InputKK5Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KK-5 (LOCAL)"
        }}
        name="InputKK5Offline" component={InputKK5OfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "UPDATE KK-5"
        }}
        name="UpdateKK5" component={UpdateKK5Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DETAIL KK-5"
        }}
        name="DetailKK5" component={DetailKK5Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "JENIS DAN JUMLAH BIBIT"
        }}
        name="KindKK5" component={KindKK5Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "JENIS DAN JUMLAH BIBIT (LOCAL)"
        }}
        name="KindKK5Offline" component={KindKK5OfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH JENIS & JUMLAH BIBIT"
        }}
        name="InputDetailKK5" component={InputDetailKK5Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH JENIS & JUMLAH BIBIT (LOCAL)"
        }}
        name="InputDetailKK5Offline" component={InputDetailKK5OfflineScreen} />

      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "FILTER KK-6"
        }}
        name="FilterKK6" component={FilterKK6Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KK-6 (SERVER)"
        }}
        name="ListKK6" component={ListKK6Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KK-6 (LOCAL)"
        }}
        name="ListKK6Offline" component={ListKK6OfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KK-6 (SERVER)"
        }}
        name="InputKK6" component={InputKK6Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KK-6 (LOCAL)"
        }}
        name="InputKK6Offline" component={InputKK6OfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "UPDATE KK-6"
        }}
        name="UpdateKK6" component={UpdateKK6Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DETAIL KK-6"
        }}
        name="DetailKK6" component={DetailKK6Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "JENIS DAN JUMLAH BIBIT"
        }}
        name="KindKK6" component={KindKK6Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "JENIS DAN JUMLAH BIBIT (LOCAL)"
        }}
        name="KindKK6Offline" component={KindKK6OfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH JENIS & JUMLAH BIBIT"
        }}
        name="InputDetailKK6" component={InputDetailKK6Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH JENIS & JUMLAH BIBIT (LOCAL)"
        }}
        name="InputDetailKK6Offline" component={InputDetailKK6OfflineScreen} />


      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "FILTER KK-7"
        }}
        name="FilterKK7" component={FilterKK7Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KK-7 (SERVER)"
        }}
        name="ListKK7" component={ListKK7Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KK-7 (LOCAL)"
        }}
        name="ListKK7Offline" component={ListKK7OfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KK-7 (SERVER)"
        }}
        name="InputKK7" component={InputKK7Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KK-7 (LOCAL)"
        }}
        name="InputKK7Offline" component={InputKK7OfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "UPDATE KK-7"
        }}
        name="UpdateKK7" component={UpdateKK7Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DETAIL KK-7"
        }}
        name="DetailKK7" component={DetailKK7Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "JENIS DAN JUMLAH BIBIT"
        }}
        name="KindKK7" component={KindKK7Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "JENIS DAN JUMLAH BIBIT (LOCAL)"
        }}
        name="KindKK7Offline" component={KindKK7OfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH JENIS & JUMLAH BIBIT"
        }}
        name="InputDetailKK7" component={InputDetailKK7Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH JENIS & JUMLAH BIBIT (LOCAL)"
        }}
        name="InputDetailKK7Offline" component={InputDetailKK7OfflineScreen} />

      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "FILTER KK-8"
        }}
        name="FilterKK8" component={FilterKK8Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KK-8 (SERVER)"
        }}
        name="ListKK8" component={ListKK8Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KK-8 (LOCAL)"
        }}
        name="ListKK8Offline" component={ListKK8OfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KK-8 (SERVER)"
        }}
        name="InputKK8" component={InputKK8Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KK-8 (LOCAL)"
        }}
        name="InputKK8Offline" component={InputKK8OfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "UPDATE KK-8"
        }}
        name="UpdateKK8" component={UpdateKK8Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DETAIL KK-8"
        }}
        name="DetailKK8" component={DetailKK8Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "JENIS DAN JUMLAH BIBIT"
        }}
        name="KindKK8" component={KindKK8Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "JENIS DAN JUMLAH BIBIT (LOCAL)"
        }}
        name="KindKK8Offline" component={KindKK8OfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH JENIS & JUMLAH BIBIT"
        }}
        name="InputDetailKK8" component={InputDetailKK8Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH JENIS & JUMLAH BIBIT (LOCAL)"
        }}
        name="InputDetailKK8Offline" component={InputDetailKK8OfflineScreen} />

      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "FILTER KK-9"
        }}
        name="FilterKK9" component={FilterKK9Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KK-9 (SERVER)"
        }}
        name="ListKK9" component={ListKK9Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KK-9 (LOCAL)"
        }}
        name="ListKK9Offline" component={ListKK9OfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KK-9 (SERVER)"
        }}
        name="InputKK9" component={InputKK9Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KK-9 (LOCAL)"
        }}
        name="InputKK9Offline" component={InputKK9OfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "UPDATE KK-9"
        }}
        name="UpdateKK9" component={UpdateKK9Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DETAIL KK-9"
        }}
        name="DetailKK9" component={DetailKK9Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "JENIS DAN JUMLAH BIBIT"
        }}
        name="KindKK9" component={KindKK9Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "JENIS DAN JUMLAH BIBIT (LOCAL)"
        }}
        name="KindKK9Offline" component={KindKK9OfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH JENIS & JUMLAH BIBIT"
        }}
        name="InputDetailKK9" component={InputDetailKK9Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH JENIS & JUMLAH BIBIT (LOCAL)"
        }}
        name="InputDetailKK9Offline" component={InputDetailKK9OfflineScreen} />


      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "FILTER KK-10"
        }}
        name="FilterKK10" component={FilterKK10Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KK-10 (SERVER)"
        }}
        name="ListKK10" component={ListKK10Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KK-10 (LOCAL)"
        }}
        name="ListKK10Offline" component={ListKK10OfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KK-10 (SERVER)"
        }}
        name="InputKK10" component={InputKK10Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KK-10 (LOCAL)"
        }}
        name="InputKK10Offline" component={InputKK10OfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "UPDATE KK-10"
        }}
        name="UpdateKK10" component={UpdateKK10Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DETAIL KK-10"
        }}
        name="DetailKK10" component={DetailKK10Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "JENIS DAN JUMLAH BIBIT"
        }}
        name="KindKK10" component={KindKK10Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "JENIS DAN JUMLAH BIBIT (LOCAL)"
        }}
        name="KindKK10Offline" component={KindKK10OfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH JENIS & JUMLAH BIBIT"
        }}
        name="InputDetailKK10" component={InputDetailKK10Screen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH JENIS & JUMLAH BIBIT (LOCAL)"
        }}
        name="InputDetailKK10Offline" component={InputDetailKK10OfflineScreen} />




      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name="Restoration" component={RestorationScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KT-1 (SERVER)"
        }}
        name="InputLandAssessment" component={InputLandAssessmentScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KT-1 (LOCAL)"
        }}
        name="InputLandAssessmentOffline" component={InputLandAssessmentOfflineScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "UPDATE KT-1 (SERVER)"
        }}
        name="UpdateLandAssessment" component={UpdateLandAssessmentScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "UPDATE KT-1 (LOCAL)"
        }}
        name="UpdateLandAssessmentOffline" component={UpdateLandAssessmentOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KT-1 (SERVER)"
        }}
        name="ListLandAssessment" component={ListLandAssessmentScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KT-1 (LOCAL)"
        }}
        name="ListLandAssessmentOffline" component={ListLandAssessmentOfflineScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "FILTER KT-1"
        }}
        name="FilterLandAssessment" component={FilterLandAssessmentScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DETAIL KT-1"
        }}
        name="DetailLandAssessment" component={DetailLandAssessmentScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "ASSET LAND ASSESSMENT"
        }}
        name="AssetLandAssessment" component={AssetsLandAssessmentScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DETAIL DATA TRACKING"
        }}
        name="DetailDataTracking" component={DetailDataTrackingScreen} />


      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KT-2 (SERVER)"
        }}
        name="InputSeedCollecting" component={InputSeedCollectingScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KT-2 (LOCAL)"
        }}
        name="InputSeedCollectingOffline" component={InputSeedCollectingOfflineScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Update KT-2 (SERVER)"
        }}
        name="UpdateSeedCollecting" component={UpdateSeedCollectingScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Update KT-2 (LOCAL)"
        }}
        name="UpdateSeedCollectingOffline" component={UpdateSeedCollectingOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KT-2 (SERVER)"
        }}
        name="ListSeedCollecting" component={ListSeedCollectingScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KT-2 (LOCAL)"
        }}
        name="ListSeedCollectingOffline" component={ListSeedCollectingOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "FILTER KT-2"
        }}
        name="FilterSeedCollecting" component={FilterSeedCollectingScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DETAIL KT-2"
        }}
        name="DetailSeedCollecting" component={DetailSeedCollectingScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH JENIS & JUMLAH BIBIT"
        }}
        name="InputDetailSeedCollecting" component={InputDetailSeedCollectingScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH JENIS & JUMLAH BIBIT (LOCAL)"
        }}
        name="InputDetailSeedCollectingOffline" component={InputDetailSeedCollectingOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "ASSET SEED COLLECTING"
        }}
        name="AssetSeedCollecting" component={AssetsSeedCollectingScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "JENIS DAN JUMLAH BIBIT"
        }}
        name="KindSeedCollecting" component={KindSeedCollectingScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "JENIS DAN JUMLAH BIBIT (LOCAL)"
        }}
        name="KindSeedCollectingOffline" component={KindSeedCollectingOfflineScreen} />



      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KT-3 (SERVER)"
        }}
        name="ListNurseryActivity" component={ListNurseryActivityScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KT-3 (LOCAL)"
        }}
        name="ListNurseryActivityOffline" component={ListNurseryActivityOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KT-3 (LOCAL)"
        }}
        name="InputNurseryActivityOffline" component={InputNurseryActivityOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KT-3 (SERVER)"
        }}
        name="InputNurseryActivity" component={InputNurseryActivityScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "UPDATE KT-3 (SERVER)"
        }}
        name="UpdateNurseryActivity" component={UpdateNurseryActivityScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "UPDATE KT-3 (LOCAL)"
        }}
        name="UpdateNurseryActivityOffline" component={UpdateNurseryActivityOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "FILTER KT-3"
        }}
        name="FilterNurseryActivity" component={FilterNurseryActivityScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DETAIL KT-3"
        }}
        name="DetailNurseryActivity" component={DetailNurseryActivityScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH JENIS & JUMLAH BIBIT"
        }}
        name="InputDetailNurseryActivity" component={InputDetailNurseryActivityScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH JENIS & JUMLAH BIBIT (LOCAL)"
        }}
        name="InputDetailNurseryActivityOffline" component={InputDetailNurseryActivityOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "ASSET NURSERY ACTIVITY"
        }}
        name="AssetNurseryActivity" component={AssetsNurseryActivityScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "JENIS & JUMLAH BIBIT"
        }}
        name="KindNurseryActivity" component={KindNurseryActivityScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "JENIS & JUMLAH BIBIT (LOCAL)"
        }}
        name="KindNurseryActivityOffline" component={KindNurseryActivityOfflineScreen} />



      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KT-4 (SERVER)"
        }}
        name="ListPlantingAction" component={ListPlantingActionScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KT-4 (LOCAL)"
        }}
        name="ListPlantingActionOffline" component={ListPlantingActionOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KT-4 (SERVER)"
        }}
        name="InputPlantingAction" component={InputPlantingActionScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KT-4 (LOCAL)"
        }}
        name="InputPlantingActionOffline" component={InputPlantingActionOfflineScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "UPDATE KT-4 (SERVER)"
        }}
        name="UpdatePlantingAction" component={UpdatePlantingActionScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "UPDATE KT-4 (LOCAL)"
        }}
        name="UpdatePlantingActionOffline" component={UpdatePlantingActionOfflineScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "FILTER KT-4"
        }}
        name="FilterPlantingAction" component={FilterPlantingActionScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DETAIL KT-4"
        }}
        name="DetailPlantingAction" component={DetailPlantingActionScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH JENIS & JUMLAH BIBIT (SERVER)"
        }}
        name="InputDetailPlantingAction" component={InputDetailPlantingActionScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH (LOCAL)"
        }}
        name="InputDetailPlantingActionOffline" component={InputDetailPlantingActionOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "ASSET PLANTING ACTION"
        }}
        name="AssetPlantingAction" component={AssetsPlantingActionScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "JENIS & JUMLAH BIBIT (SERVER)"
        }}
        name="KindPlantingAction" component={KindPlantingActionScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "JENIS & JUMLAH BIBIT (LOCAL)"
        }}
        name="KindPlantingActionOffline" component={KindPlantingActionOfflineScreen} />

      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KT-5 (SERVER)"
        }}
        name="ListTransport" component={ListTransportScreen} />
      <Stack.Screen
      options={{
        headerShown: true,
        headerTitle: "KT-5 (LOCAL)"
      }}
      name="ListTransportOffline" component={ListTransportOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KT-5 (SERVER)"
        }}
        name="InputTransport" component={InputTransportScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "UPDATE KT-5 (SERVER)"
        }}
        name="UpdateTransport" component={UpdateTransportScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "UPDATE KT-5 (LOCAL)"
        }}
        name="UpdateTransportOffline" component={UpdateTransportOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KT-5 (LOCAL)"
        }}
        name="InputTransportOffline" component={InputTransportOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "FILTER KT-5"
        }}
        name="FilterTransport" component={FilterTransportScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DETAIL KT-5"
        }}
        name="DetailTransport" component={DetailTransportScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH LOKASI TUJUAN"
        }}
        name="InputDetailTransport" component={InputDetailTransportScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH LOKASI TUJUAN (LOCAL)"
        }}
        name="InputDetailTransportOffline" component={InputDetailTransportOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "ASSET TRANSPORT"
        }}
        name="AssetsTransport" component={AssetsTransportScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "LOKASI TUJUAN"
        }}
        name="KindTransport" component={KindTransportScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "LOKASI TUJUAN (LOCAL)"
        }}
        name="KindTransportOffline" component={KindTransportOfflineScreen} />

        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KT-6"
        }}
        name="ListPlotBoundaring" component={ListPlotBoundaringScreen} />
         <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "INPUT KT-6"
        }}
        name="InputPlotBoundaring" component={InputPlotBoundaringScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Jenis & Jumlah Bibit"
        }}
        name="KindPlotBoundaring" component={KindPlotBoundaringScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH JENIS & JUMLAH BIBIT"
        }}
        name="InputDetailPlotBoundaring" component={InputDetailPlotBoundaringScreen} />

      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KT-7 (SERVER)"
        }}
        name="ListGrowth" component={ListGrowthScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KT-7 (LOCAL)"
        }}
        name="ListGrowthOffline" component={ListGrowthOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KT-7 (SERVER)"
        }}
        name="InputGrowth" component={InputGrowthScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KT-7 (LOCAL)"
        }}
        name="InputGrowthOffline" component={InputGrowthOfflineScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "UPDATE KT-7 (SERVER)"
        }}
        name="UpdateGrowth" component={UpdateGrowthScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "UPDATE KT-7 (LOCAL)"
        }}
        name="UpdateGrowthOffline" component={UpdateGrowthOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "FILTER KT-7"
        }}
        name="FilterGrowth" component={FilterGrowthScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DETAIL KT-7"
        }}
        name="DetailGrowth" component={DetailGrowthScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH DATA PLOT"
        }}
        name="InputDetailGrowth" component={InputDetailGrowthScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH DATA PLOT (LOCAL)"
        }}
        name="InputDetailGrowthOffline" component={InputDetailGrowthOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DATA PLOT"
        }}
        name="KindGrowth" component={KindGrowthScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DATA PLOT (LOCAL)"
        }}
        name="KindGrowthOffline" component={KindGrowthOfflineScreen} />

      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KT-8 (SERVER)"
        }}
        name="ListReplanting" component={ListReplantingScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KT-8 (LOCAL)"
        }}
        name="ListReplantingOffline" component={ListReplantingOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KT-8 (SERVER)"
        }}
        name="InputReplanting" component={InputReplantingScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KT-8 (LOCAL)"
        }}
        name="InputReplantingOffline" component={InputReplantingOfflineScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "UPDATE KT-8 (SERVER)"
        }}
        name="UpdateReplanting" component={UpdateReplantingScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "UPDATE KT-8 (LOCAL)"
        }}
        name="UpdateReplantingOffline" component={UpdateReplantingOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "FILTER KT-8"
        }}
        name="FilterReplanting" component={FilterReplantingScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DETAIL KT-8"
        }}
        name="DetailReplanting" component={DetailReplantingScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH PLOT"
        }}
        name="InputDetailReplanting" component={InputDetailReplantingScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH PLOT (LOCAL)"
        }}
        name="InputDetailReplantingOffline" component={InputDetailReplantingOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "ASSET REPLANTING"
        }}
        name="AssetReplanting" component={AssetsReplantingScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DATA PLOT"
        }}
        name="KindReplanting" component={KindReplantingScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DATA PLOT (LOCAL)"
        }}
        name="KindReplantingOffline" component={KindReplantingOfflineScreen} />

      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KT-9 (SERVER)"
        }}
        name="ListSubtitutePlot" component={ListSubtitutePlotScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KT-9 (LOCAL)"
        }}
        name="ListSubtitutePlotOffline" component={ListSubtitutePlotOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KT-9 (SERVER)"
        }}
        name="InputSubtitutePlot" component={InputSubtitutePlotScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "UDPATE KT-9"
        }}
        name="UpdateSubtitutePlot" component={UpdateSubtitutePlotScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KT-9 (LOCAL)"
        }}
        name="InputSubtitutePlotOffline" component={InputSubtitutePlotOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "FILTER KT-9"
        }}
        name="FilterSubtitutePlot" component={FilterSubtitutePlotScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DETAIL KT-9"
        }}
        name="DetailSubtitutePlot" component={DetailSubtitutePlotScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH PLOT"
        }}
        name="InputDetailSubtitutePlot" component={InputDetailSubtitutePlotScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH PLOT (LOCAL)"
        }}
        name="InputDetailSubtitutePlotOffline" component={InputDetailSubtitutePlotOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "ASSET SUBTITUTE PLOT"
        }}
        name="AssetSubtitutePlot" component={AssetsSubtitutePlotScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DATA PLOT"
        }}
        name="KindSubtitutePlot" component={KindSubtitutePlotScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DATA PLOT (LOCAL)"
        }}
        name="KindSubtitutePlotOffline" component={KindSubtitutePlotOfflineScreen} />


      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KT-10 (SERVER)"
        }}
        name="ListReplacementPlot" component={ListReplacementPlotScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KT-10 (LOCAL)"
        }}
        name="ListReplacementPlotOffline" component={ListReplacementPlotOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KT-10 (SERVER)"
        }}
        name="InputReplacementPlot" component={InputReplacementPlotScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "UPDATE KT-10"
        }}
        name="UpdateReplacementPlot" component={UpdateReplacementPlotScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KT-10 (LOCAL)"
        }}
        name="InputReplacementPlotOffline" component={InputReplacementPlotOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "FILTER KT-10"
        }}
        name="FilterReplacementPlot" component={FilterReplacementPlotScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DETAIL KT-10"
        }}
        name="DetailReplacementPlot" component={DetailReplacementPlotScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH PLOT"
        }}
        name="InputDetailReplacementPlot" component={InputDetailReplacementPlotScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH PLOT (LOCAL)"
        }}
        name="InputDetailReplacementPlotOffline" component={InputDetailReplacementPlotOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "ASSET REPLACEMENT PLOT"
        }}
        name="AssetReplacementPlot" component={AssetsReplacementPlotScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DATA PLOT"
        }}
        name="KindReplacementPlot" component={KindReplacementPlotScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DATA PLOT (LOCAL)"
        }}
        name="KindReplacementPlotOffline" component={KindReplacementPlotOfflineScreen} />




      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name="Comdev" component={ComdevScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
        }}
        name="Research" component={ResearchScreen} />

      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH COMMUNITY (SERVER)"
        }}
        name="InputCommunityRegister" component={InputCommunityRegisterScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH COMMUNITY (LOCAL)"
        }}
        name="InputComunnityOffline" component={InputComunnityOfflineScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "UPDATE COMMUNITY"
        }}
        name="UpdateCommunityRegister" component={UpdateCommunityRegisterScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "COMMUNITY (SERVER)"
        }}
        name="ListCommunityRegister" component={ListCommunityRegisterScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "COMMUNITY (LOCAL)"
        }}
        name="ListCommunityRegisterOffline" component={ListCommunityRegisterOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "FILTER COMMUNITY"
        }}
        name="FilterCommunity" component={FilterCommunityScreen} />
        
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DETAIL COMMUNITY"
        }}
        name="DetailCommunityRegister" component={DetailCommunityRegisterScreen} />

      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH COMMUNITY GROUP(SERVER)"
        }}
        name="InputCommunityGroup" component={InputCommunityGroupScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH COMMUNITY GROUP (LOCAL)"
        }}
        name="InputComunnityGroupOffline" component={InputComunnityGroupOfflineScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "UPDATE COMMUNITY GROUP"
        }}
        name="UpdateCommunityGroup" component={UpdateCommunityGroupScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "COMMUNITY GROUP (SERVER)"
        }}
        name="ListCommunityGroup" component={ListCommunityGroupScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "COMMUNITY GROUP (LOCAL)"
        }}
        name="ListCommunityGroupOffline" component={ListCommunityGroupOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "FILTER COMMUNITY GROUP"
        }}
        name="FilterCommunityGroup" component={FilterCommunityGroupScreen} />
        
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DETAIL COMMUNITY GROUP"
        }}
        name="DetailCommunityGroup" component={DetailCommunityGroupScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DOKUMENTASI COMMUNITY GROUP"
        }}
        name="DokumentasiCommunityGroup" component={DokumentasiCommunityGroupScreen} />

      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH SILVOSHERY (SERVER)"
        }}
        name="InputSilvoshery" component={InputSilvosheryScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "UPDATE SILVOSHERY"
        }}
        name="UpdateSilvoshery" component={UpdateSilvosheryScreen} />
        
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH SILVOSHERY (LOCAL)"
        }}
        name="InputSilvosheryOffline" component={InputSilvosheryOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "SILVOSHERY (SERVER)"
        }}
        name="ListSilvoshery" component={ListSilvosheryScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "SILVOSHERY (LOCAL)"
        }}
        name="ListSilvosheryOffline" component={ListSilvosheryOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "FILTER SILVOSHERY"
        }}
        name="FilterSilvoshery" component={FilterSilvosheryScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DETAIL SILVOSHERT"
        }}
        name="DetailSilvoshery" component={DetailSilvosheryScreen} />


      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Biodiversity"
        }}
        name="Biodiversity" component={BiodiversityScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KT-12 (SERVER)"
        }}
        name="ListGrowthResearch" component={ListGrowthResearchScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KT-12 (LOCAL)"
        }}
        name="ListGrowthResearchOffline" component={ListGrowthResearchOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KT-12 (SERVER)"
        }}
        name="InputGrowthResearch" component={InputGrowthResearchScreen} />
       <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "UPDATE KT-12"
        }}
        name="UpdateGrowthResearch" component={UpdateGrowthResearchScreen} />
      
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KT-12 (LOCAL)"
        }}
        name="InputGrowthResearchOffline" component={InputGrowthResearchOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "FILTER KT-12"
        }}
        name="FilterGrowthResearch" component={FilterGrowthResearchScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DETAIL KT-12"
        }}
        name="DetailGrowthResearch" component={DetailGrowthResearchScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH DATA PLOT KT-12"
        }}
        name="InputDetailGrowthResearch" component={InputDetailGrowthResearchScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "ASSET GROWTH RESEARCH"
        }}
        name="AssetGrowthResearch" component={AssetsGrowthResearchScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DATA PLOT"
        }}
        name="KindGrowthResearch" component={KindGrowthResearchScreen} />

      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "BIODIVERSITY (SERVER)"
        }}
        name="ListDiversityFauna" component={ListDiversityFaunaScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "BIODIVERSITY (LOCAL)"
        }}
        name="ListDiversityFaunaOffline" component={ListDiversityFaunaOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH BIODIVERSITY (SERVER)"
        }}
        name="InputDiversityFauna" component={InputDiversityFaunaScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH BIODIVERSITY (LOCAL)"
        }}
        name="InputDiversityFaunaOffline" component={InputDiversityFaunaOfflineScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "UPDATE BIODIVERSITY"
        }}
        name="UpdateDiversityFauna" component={UpdateDiversityFaunaScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "FILTER BIODIVERSITY"
        }}
        name="FilterDiversityFauna" component={FilterDiversityFaunaScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DETAIL BIODIVERSITY"
        }}
        name="DetailDiversityFauna" component={DetailDiversityFaunaScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH FAUNA"
        }}
        name="InputDetailDiversityFauna" component={InputDetailDiversityFaunaScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH FISKIM"
        }}
        name="InputDetailDiversityFiskim" component={InputDetailDiversityFiskimScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "ASSET DIVERSITY FAUNA"
        }}
        name="AssetDiversityFauna" component={AssetsDiversityFaunaScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DATA FAUNA"
        }}
        name="KindDiversityFauna" component={KindDiversityFaunaScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DATA FISKIM"
        }}
        name="KindDiversityFiskim" component={KindDiversityFiskimScreen} />

      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KT-14 (SERVER)"
        }}
        name="ListDiversityFlora" component={ListDiversityFloraScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KT-14 (LOCAL)"
        }}
        name="ListDiversityFloraOffline" component={ListDiversityFloraOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KT-14 (SERVER)"
        }}
        name="InputDiversityFlora" component={InputDiversityFloraScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KT-14 (LOCAL)"
        }}
        name="InputDiversityFloraOffline" component={InputDiversityFloraOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "FILTER KT-14"
        }}
        name="FilterDiversityFlora" component={FilterDiversityFloraScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DETAIL KT-14"
        }}
        name="DetailDiversityFlora" component={DetailDiversityFloraScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH DATA PLOT KT-14"
        }}
        name="InputDetailDiversityFlora" component={InputDetailDiversityFloraScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "ASSET DIVERSITY FLORA"
        }}
        name="AssetDiversityFlora" component={AssetsDiversityFloraScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DATA PLOT"
        }}
        name="KindDiversityFlora" component={KindDiversityFloraScreen} />

      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KT-15 (SERVER)"
        }}
        name="ListHama" component={ListHamaScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KT-15 (LOCAL)"
        }}
        name="ListHamaOffline" component={ListHamaOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KT-15 (SERVER)"
        }}
        name="InputHama" component={InputHamaScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KT-15 (LOCAL)"
        }}
        name="InputHamaOffline" component={InputHamaOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "FILTER KT-15"
        }}
        name="FilterHama" component={FilterHamaScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DETAIL KT-15"
        }}
        name="DetailHama" component={DetailHamaScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH DATA PLOT KT-15"
        }}
        name="InputDetailHama" component={InputDetailHamaScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "ASSET HAMA"
        }}
        name="AssetHama" component={AssetsHamaScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DATA PLOT HAMA"
        }}
        name="KindHama" component={KindHamaScreen} />

      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KT-16 (SERVER)"
        }}
        name="ListFiskim" component={ListFiskimScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "KT-16 (LOCAL)"
        }}
        name="ListFiskimOffline" component={ListFiskimOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KT-16 (SERVER)"
        }}
        name="InputFiskim" component={InputFiskimScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH KT-16 (LOCAL)"
        }}
        name="InputFiskimOffline" component={InputFiskimOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "FILTER KT-16"
        }}
        name="FilterFiskim" component={FilterFiskimScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DETAIL KT-16"
        }}
        name="DetailFiskim" component={DetailFiskimScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH DATA PLOT KT-16"
        }}
        name="InputDetailFiskim" component={InputDetailFiskimScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DATA PLOT FISKIM"
        }}
        name="KindFiskim" component={KindFiskimScreen} />

      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "CCB (SERVER)"
        }}
        name="ListCCB" component={ListCCBScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "CCB (LOCAL)"
        }}
        name="ListCCBOffline" component={ListCCBOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "FILTER CCB"
        }}
        name="FilterCCB" component={FilterCCBScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH CCB (SERVER)"
        }}
        name="InputCCB" component={InputCCBScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "UPDATE CCB"
        }}
        name="UpdateCCB" component={UpdateCCBScreen} />
         <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH CCB (LOCAL)"
        }}
        name="InputCCBOffline" component={InputCCBOfflineScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Carbon CCB"
        }}
        name="KindCarbonCCB" component={KindCarbonCCBScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Tambah Carbon CCB (Server)"
        }}
        name="InputDetailCarbonCCB" component={InputDetailCarbonCCBScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Flora CCB"
        }}
        name="KindFloraCCB" component={KindFloraCCBScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Tambah Flora CCB (Server)"
        }}
        name="InputDetailFloraCCB" component={InputDetailFloraCCBScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Fauna CCB"
        }}
        name="KindFaunaCCB" component={KindFaunaCCBScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Tambah Fauna CCB (Server)"
        }}
        name="InputDetailFaunaCCB" component={InputDetailFaunaCCBScreen} />
         <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Fikim CCB"
        }}
        name="KindFiskimCCB" component={KindFiskimCCBScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Tambah Fiskim CCB (Server)"
        }}
        name="InputDetailFiskimCCB" component={InputDetailFiskimCCBScreen} />

      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Plankton (SERVER)"
        }}
        name="ListPlankton" component={ListPlanktonScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Plankton (LOCAL)"
        }}
        name="ListPlanktonOffline" component={ListPlanktonOfflineScreen} />
      <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "FILTER PLANKTON"
        }}
        name="FilterPlankton" component={FilterPlanktonScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH PLANKTON (SERVER)"
        }}
        name="InputPlankton" component={InputPlanktonScreen} />
         <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "TAMBAH PLANKTON (LOCAL)"
        }}
        name="InputPlanktonOffline" component={InputPlanktonOfflineScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "UPDATE PLANKTON"
        }}
        name="UpdatePlankton" component={UpdatePlanktonScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "DETAIL PLANKTON"
        }}
        name="DetailPlankton" component={DetailPlanktonScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Fitoplankton"
        }}
        name="KindFitoplankton" component={KindFitoplanktonScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Tambah Fitoplankton"
        }}
        name="InputDetailFitoplankton" component={InputDetailFitoplanktonScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Zooplankton"
        }}
        name="KindZooplankton" component={KindZooplanktonScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Tambah Zooplankton"
        }}
        name="InputDetailZooplankton" component={InputDetailZooplanktonScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "PLANKTON FISKIM"
        }}
        name="KindPlanktonFiskim" component={KindPlanktonFiskimScreen} />
        <Stack.Screen
        options={{
          headerShown: true,
          headerTitle: "Tambah Plankton Fiskim"
        }}
        name="InputDetailPlanktonFiskim" component={InputDetailPlanktonFiskimScreen} />

    </Stack.Navigator>
  )
}


const LOCATION_TASK_NAME = "LOCATION_TASK_NAME"
let foregroundSubscription = null






export default function App() {

  let [appLoaded, setAppLoaded] = useState(false);
  let [credentials, setCredentials] = useState(null);
  let [localProvince, setLocalProvince] = useState(null);
  let [localDistrict, setLocalDistrict] = useState(null);
  let [localSubDistrict, setLocalSubDistrict] = useState(null);
  let [localProject, setLocalProject] = useState(null);
  let [KT1, setKT1] = useState([]);
  let [KK1, setKK1] = useState([]);
  let [KT2, setKT2] = useState([]);
  let [KK2, setKK2] = useState([]);
  let [KT2Kind, setKT2Kind] = useState([]);
  let [KK2Kind, setKK2Kind] = useState([]);
  let [KT3, setKT3] = useState([]);
  let [KK3, setKK3] = useState([]);
  let [KT3Kind, setKT3Kind] = useState([]);
  let [KK3Kind, setKK3Kind] = useState([]);
  let [KT4, setKT4] = useState([]);
  let [KK4, setKK4] = useState([]);
  let [KT4Kind, setKT4Kind] = useState([]);
  let [KK4Kind, setKK4Kind] = useState([]);
  let [KT5, setKT5] = useState([]);
  let [KT5Kind, setKT5Kind] = useState([]);
  let [KK5, setKK5] = useState([]);
  let [KK5Kind, setKK5Kind] = useState([]);
  let [KK6, setKK6] = useState([]);
  let [KK6Kind, setKK6Kind] = useState([]);
  let [KT7, setKT7] = useState([]);
  let [KT7Kind, setKT7Kind] = useState([]);
  let [KK7, setKK7] = useState([]);
  let [KK7Kind, setKK7Kind] = useState([]);
  let [KT8, setKT8] = useState([]);
  let [KK8, setKK8] = useState([]);
  let [KT8Kind, setKT8Kind] = useState([]);
  let [KK8Kind, setKK8Kind] = useState([]);
  let [KT9, setKT9] = useState([]);
  let [KK9, setKK9] = useState([]);
  let [KT9Kind, setKT9Kind] = useState([]);
  let [KK9Kind, setKK9Kind] = useState([]);
  let [KT10, setKT10] = useState([]);
  let [KK10, setKK10] = useState([]);
  let [KT10Kind, setKT10Kind] = useState([]);
  let [KK10Kind, setKK10Kind] = useState([]);
  let [KT12, setKT12] = useState([]);
  let [KT13, setKT13] = useState([]);
  let [KT14, setKT14] = useState([]);
  let [KT15, setKT15] = useState([]);
  let [KT16, setKT16] = useState([]);
  let [comdev, setComdev] = useState([]);
  let [silvoshery, setSilvoshery] = useState([]);
  let [communityGroup, setCommunityGroup] = useState([]);
  let [ccb, setCCB] = useState([]);
  let [plankton, setPlankton] = useState([]);

  const backgroundTask = async ({ data, error }) => {
    if (error) {
      console.log(error);
      return;
    }
    if (data) {
      const { locations } = data;
      const location = locations[0];
      if (location) {
        var trackStatus = await getTrackingStatus();
        if (trackStatus != null || trackStatus != undefined) {
          await saveLocationHistory(location);
          console.log('insert');
        } else {
          console.log(trackStatus);
        }
      }
    }
  };

  useEffect(() => {
    TaskManager.defineTask(LOCATION_TASK_NAME, backgroundTask);

    return () => {
      // Unregister task when component unmounts
      TaskManager.unregisterAllTasksAsync();
    };
  }, []);


  useEffect(() => {
    const requestPermissions = async () => {
      // Check network status
      const isNetworkConnected = await NetInfo.fetch().then((state) => state.isConnected);

      // Request location permissions only if online
      if (isNetworkConnected) {
        const permissionLocation = await Location.getForegroundPermissionsAsync();
        if (!permissionLocation['granted']) {
          // Show alert dialog to show user that the app is requesting access to location
          Alert.alert(
            'Location Permission',
            'YAKOPI collects location data to enable plot boundaring tracking even when the app is closed or not in use.',
            [
              { text: 'Cancel', style: 'cancel' },
              { text: 'OK', onPress: async () => {
                // Request permissions
                const foreground = await Location.requestForegroundPermissionsAsync()
                if (foreground.granted) await Location.requestBackgroundPermissionsAsync()
              }
              }
            ],
            { cancelable: false }
          )
        } else {
          const foreground = await Location.requestForegroundPermissionsAsync();
          if (foreground.granted) await Location.requestBackgroundPermissionsAsync();
        }
      }
    };

    requestPermissions();
  }, []);



  let checkCredentials = async () => {
    try {
      await SplashScreen.preventAutoHideAsync();
    } catch (error) {
      let credentials = await AsyncStorage.getItem("credentials");
      if (credentials === null) {
        setCredentials(null);
      }
      else {
        let parsed = JSON.parse(credentials);
        setCredentials(parsed);
      }
      await Font.loadAsync({
        Poppins: require('./fonts/Poppins-Regular.ttf'),
        PoppinsMedium: require('./fonts/Poppins-Medium.ttf'),
        NunitoBold: require('./fonts/Nunito-Bold.ttf'),
      });
      await fetchNeedUpdate();
      setAppLoaded(true);
    }

    let credentials = await AsyncStorage.getItem("credentials");
    if (credentials === null) {
      setCredentials(null);
    }
    else {
      let parsed = JSON.parse(credentials);
      setCredentials(parsed);
    }
    let localProvince = await AsyncStorage.getItem("localProvince");
    if (localProvince === null) {
      setLocalProvince(null);
    }
    else {
      let parsed = JSON.parse(localProvince);
      setLocalProvince(parsed);
    }
    let localDistrict = await AsyncStorage.getItem("localDistrict");
    if (localDistrict === null) {
      setLocalDistrict(null);
    }
    else {
      let parsed = JSON.parse(localDistrict);
      setLocalDistrict(parsed);
    }
    let localSubDistrict = await AsyncStorage.getItem("localSubDistrict");
    if (localSubDistrict === null) {
      setLocalSubDistrict(null);
    }
    else {
      let parsed = JSON.parse(localSubDistrict);
      setLocalSubDistrict(parsed);
    }
    let localProject = await AsyncStorage.getItem("localProject");
    if (localProject === null) {
      setLocalProject(null);
    }
    else {
      let parsed = JSON.parse(localProject);
      setLocalProject(parsed);
    }

    let KT1 = await AsyncStorage.getItem("KT1");
    if(KT1 === null){
      setKT1([]);
    }
    else{
      let parsed = JSON.parse(KT1);
      setKT1(parsed);
    }
    let KK1 = await AsyncStorage.getItem("KK1");
    if(KK1 === null){
      setKK1([]);
    }
    else{
      let parsed = JSON.parse(KT1);
      setKT1(parsed);
    }
    let KT2 = await AsyncStorage.getItem("KT2");
    if(KT2 === null){
      setKT2([]);
    }
    else{
      let parsed = JSON.parse(KT2);
      setKT2(parsed);
    }
    let KK2 = await AsyncStorage.getItem("KK2");
    if(KK2 === null){
      setKK2([]);
    }
    else{
      let parsed = JSON.parse(KK2);
      setKK2(parsed);
    }
    let KT2Kind = await AsyncStorage.getItem("KT2Kind");
    if(KT2Kind === null){
      setKT2Kind([]);
    }
    else{
      let parsed = JSON.parse(KT2Kind);
      setKT2Kind(parsed);
    }
    let KK2Kind = await AsyncStorage.getItem("KK2Kind");
    if(KK2Kind === null){
      setKK2Kind([]);
    }
    else{
      let parsed = JSON.parse(KK2Kind);
      setKK2Kind(parsed);
    }
    let KT3 = await AsyncStorage.getItem("KT3");
    if(KT3 === null){
      setKT3([]);
    }
    else{
      let parsed = JSON.parse(KT3);
      setKT3(parsed);
    }
    let KK3 = await AsyncStorage.getItem("KK3");
    if(KK3 === null){
      setKK3([]);
    }
    else{
      let parsed = JSON.parse(KK3);
      setKK3(parsed);
    }
    let KT3Kind = await AsyncStorage.getItem("KT3Kind");
    if(KT3Kind === null){
      setKT3Kind([]);
    }
    else{
      let parsed = JSON.parse(KT3Kind);
      setKT3Kind(parsed);
    }
    let KK3Kind = await AsyncStorage.getItem("KK3Kind");
    if(KK3Kind === null){
      setKK3Kind([]);
    }
    else{
      let parsed = JSON.parse(KK3Kind);
      setKK3Kind(parsed);
    }
    let KT4 = await AsyncStorage.getItem("KT4");
    if(KT4 === null){
      setKT4([]);
    }
    else{
      let parsed = JSON.parse(KT4);
      setKT4(parsed);
    }
    let KK4 = await AsyncStorage.getItem("KK4");
    if(KK4 === null){
      setKK4([]);
    }
    else{
      let parsed = JSON.parse(KK4);
      setKK4(parsed);
    }
    let KT4Kind = await AsyncStorage.getItem("KT4Kind");
    if(KT4Kind === null){
      setKT4Kind([]);
    }
    else{
      let parsed = JSON.parse(KT4Kind);
      setKT4Kind(parsed);
    }
    let KK4Kind = await AsyncStorage.getItem("KK4Kind");
    if(KK4Kind === null){
      setKK4Kind([]);
    }
    else{
      let parsed = JSON.parse(KK4Kind);
      setKK4Kind(parsed);
    }
    let KT5 = await AsyncStorage.getItem("KT5");
    if(KT5 === null){
      setKT5([]);
    }
    else{
      let parsed = JSON.parse(KT5);
      setKT5(parsed);
    }
    let KK5 = await AsyncStorage.getItem("KK5");
    if(KK5 === null){
      setKK5([]);
    }
    else{
      let parsed = JSON.parse(KK5);
      setKK5(parsed);
    }
    let KT5Kind = await AsyncStorage.getItem("KT5Kind");
    if(KT5Kind === null){
      setKT5Kind([]);
    }
    else{
      let parsed = JSON.parse(KT5Kind);
      setKT5Kind(parsed);
    }
    let KK5Kind = await AsyncStorage.getItem("KK5Kind");
    if(KK5Kind === null){
      setKK5Kind([]);
    }
    else{
      let parsed = JSON.parse(KK5Kind);
      setKK5Kind(parsed);
    }
    let KK6 = await AsyncStorage.getItem("KK6");
    if(KK6 === null){
      setKK6([]);
    }
    else{
      let parsed = JSON.parse(KK6);
      setKK6(parsed);
    }
    let KK6Kind = await AsyncStorage.getItem("KK6Kind");
    if(KK6Kind === null){
      setKK6Kind([]);
    }
    else{
      let parsed = JSON.parse(KK6Kind);
      setKK6Kind(parsed);
    }
    let KT7 = await AsyncStorage.getItem("KT7");
    if(KT7 === null){
      setKT7([]);
    }
    else{
      let parsed = JSON.parse(KT7);
      setKT7(parsed);
    }
    let KT7Kind = await AsyncStorage.getItem("KT7Kind");
    if(KT7Kind === null){
      setKT7Kind([]);
    }
    else{
      let parsed = JSON.parse(KT7Kind);
      setKT7Kind(parsed);
    }
    let KK7 = await AsyncStorage.getItem("KK7");
    if(KK7 === null){
      setKK7([]);
    }
    else{
      let parsed = JSON.parse(KK7);
      setKK7(parsed);
    }
    let KT8 = await AsyncStorage.getItem("KT8");
    if(KT8 === null){
      setKT8([]);
    }
    else{
      let parsed = JSON.parse(KT8);
      setKT8(parsed);
    }
    let KK8 = await AsyncStorage.getItem("KK8");
    if(KK8 === null){
      setKK8([]);
    }
    else{
      let parsed = JSON.parse(KK8);
      setKK8(parsed);
    }
    let KT8Kind = await AsyncStorage.getItem("KT8Kind");
    if(KT8Kind === null){
      setKT8Kind([]);
    }
    else{
      let parsed = JSON.parse(KT8Kind);
      setKT8Kind(parsed);
    }
    let KK8Kind = await AsyncStorage.getItem("KK8Kind");
    if(KK8Kind === null){
      setKK8Kind([]);
    }
    else{
      let parsed = JSON.parse(KK8Kind);
      setKK8Kind(parsed);
    }
    let KT9 = await AsyncStorage.getItem("KT9");
    if(KT9 === null){
      setKT9([]);
    }
    else{
      let parsed = JSON.parse(KT9);
      setKT9(parsed);
    }
    let KK9 = await AsyncStorage.getItem("KK9");
    if(KK9 === null){
      setKK9([]);
    }
    else{
      let parsed = JSON.parse(KK9);
    }
    let KT9Kind = await AsyncStorage.getItem("KT9Kind");
    if(KT9Kind === null){
      setKT9Kind([]);
    }
    else{
      let parsed = JSON.parse(KT9Kind);
      setKT9Kind(parsed);
    }
    let KK9Kind = await AsyncStorage.getItem("KK9Kind");
    if(KK9Kind === null){
      setKK9Kind([]);
    }
    else{
      let parsed = JSON.parse(KK9Kind);
      setKK9Kind(parsed);
    }
    let KT10 = await AsyncStorage.getItem("KT10");
    if(KT10 === null){
      setKT10([]);
    }
    else{
      let parsed = JSON.parse(KT10);
      setKT10(parsed);
    }
    let KK10 = await AsyncStorage.getItem("KK10");
    if(KK10 === null){
      setKK10([]);
    }
    else{
      let parsed = JSON.parse(KK10);
      setKK10(parsed);
    }
    let KT10Kind = await AsyncStorage.getItem("KT10Kind");
    if(KT10Kind === null){
      setKT10Kind([]);
    }
    else{
      let parsed = JSON.parse(KT10Kind);
      setKT10Kind(parsed);
    }
    let KK10Kind = await AsyncStorage.getItem("KK10Kind");
    if(KK10Kind === null){
      setKK10Kind([]);
    }
    else{
      let parsed = JSON.parse(KK10Kind);
      setKK10Kind(parsed);
    }
    let KT12 = await AsyncStorage.getItem("KT12");
    if(KT12 === null){
      setKT12([]);
    }
    else{
      let parsed = JSON.parse(KT12);
      setKT12(parsed);
    }
    let KT13 = await AsyncStorage.getItem("KT13");
    if(KT13 === null){
      setKT13([]);
    }
    else{
      let parsed = JSON.parse(KT13);
      setKT13(parsed);
    }
    let KT14 = await AsyncStorage.getItem("KT14");
    if(KT14 === null){
      setKT14([]);
    }
    else{
      let parsed = JSON.parse(KT14);
      setKT14(parsed);
    }
    let KT15 = await AsyncStorage.getItem("KT15");
    if(KT15 === null){
      setKT15([]);
    }
    else{
      let parsed = JSON.parse(KT15);
      setKT15(parsed);
    }
    let KT16 = await AsyncStorage.getItem("KT16");
    if(KT16 === null){
      setKT16([]);
    }
    else{
      let parsed = JSON.parse(KT16);
      setKT16(parsed);
    }
    let comdev = await AsyncStorage.getItem("comdev");
    if(comdev === null){
      setComdev([]);
    }
    else{
      let parsed = JSON.parse(comdev);
      setComdev(parsed);
    }
    let silvoshery = await AsyncStorage.getItem("silvoshery");
    if(silvoshery === null){
      setSilvoshery([]);
    }
    else{
      let parsed = JSON.parse(silvoshery);
      setSilvoshery(parsed);
    }
    let communityGroup = await AsyncStorage.getItem("communityGroup");
    if(communityGroup === null){
      setCommunityGroup([]);
    }
    else{
      let parsed = JSON.parse(communityGroup);
      setCommunityGroup(parsed);
    }
    let ccb = await AsyncStorage.getItem("ccb");
    if(ccb === null){
      setCCB([]);
    }
    else{
      let parsed = JSON.parse(ccb);
      setCCB(parsed);
    }
    let plankton = await AsyncStorage.getItem("plankton");
    if(plankton === null){
      setPlankton([]);
    }
    else{
      let parsed = JSON.parse(plankton);
      setPlankton(parsed);
    }

    await Font.loadAsync({
      Poppins: require('./fonts/Poppins-Regular.ttf'),
      PoppinsMedium: require('./fonts/Poppins-Medium.ttf'),
      NunitoBold: require('./fonts/Nunito-Bold.ttf'),
      
    });
    await fetchNeedUpdate();
    setAppLoaded(true);

  }
  useEffect(() => {
    checkCredentials();
  }, [])



  useEffect(() => {
    if (appLoaded) {
      setTimeout(() => {
        SplashScreen.hideAsync();
      }, 1000);
    }
  }, [appLoaded]);

  let [changelog, setChangelog] = useState("");

  const intervalTrackingPosition = useRef(null);


  let fetchNeedUpdate = async () => {

    try{
      let request = await fetch(`${endpoint}/mobilebuildnumber`);
      let response = await request.json();

      if(Platform.OS === "android"){
        if(response.production == "1"){
          if (response.buildnumber.toString() !== Application.nativeBuildVersion.toString()) {
            setIsNeedUpdate(true);
            setChangelog(response.changelog_mobile);
          }
        }else{
            setIsNeedUpdate(false);
        }
      }else{
        if(response.production == "1"){
          if (response.buildnumberIOS.toString() !== Application.nativeBuildVersion.toString()) {
            setIsNeedUpdate(true);
            setChangelog(response.changelog_mobile);
          }
        }else{
            setIsNeedUpdate(false);
        }
      }
    }catch(e){
      setIsNeedUpdate(false);
    }


  };

  let [isNeedUpdate, setIsNeedUpdate] = useState(false);


  if (isNeedUpdate) {
    if(Platform.OS === "android"){
      return (
        <View style={{flex:1,backgroundColor:"white",justifyContent:"center",alignItems:"center"}}>
            <Image style={{ width: EStyleSheet.value("140rem"), height: EStyleSheet.value("200rem") }} source={require("./assets/logo.jpeg")}></Image>
            <Text style={{marginTop:EStyleSheet.value("30rem"),fontWeight:"bold",textAlign:"center",paddingHorizontal:EStyleSheet.value("50rem"),fontSize:EStyleSheet.value("14rem")}}>Terdapat update aplikasi baru, tolong segera lakukan update pada playstore</Text>
            <Text style={{paddingTop:EStyleSheet.value("20rem"),fontWeight:"bold"}}>Changelog :</Text>
            <Text style={{fontSize:EStyleSheet.value("10rem"),textAlign:"center",marginHorizontal:EStyleSheet.value("50rem"),marginTop:EStyleSheet.value("5rem")}}>{changelog}</Text>
            <TouchableOpacity 
            activeOpacity={0.8}
            onPress={()=>{
              Linking.openURL("https://play.google.com/store/apps/details?id=com.yayasan.konservasi.pesisir.indonesia.yakopi");
            }}
            style={{marginTop:EStyleSheet.value("20rem"),borderRadius:EStyleSheet.value("10rem"),overflow:"hidden",backgroundColor:"black",width:EStyleSheet.value("280rem"),height:EStyleSheet.value("50rem")}}>
                <Image resizeMode="center" style={{width:"100%",height:"100%"}} source={require("./assets/googleplay.jpeg")}/>
            </TouchableOpacity>
        </View>
      )
    }else{
      return (
        <View style={{flex:1,backgroundColor:"white",justifyContent:"center",alignItems:"center"}}>
            <Image style={{ width: EStyleSheet.value("140rem"), height: EStyleSheet.value("200rem") }} source={require("./assets/logo.jpeg")}></Image>
            <Text style={{marginTop:EStyleSheet.value("30rem"),fontWeight:"bold",textAlign:"center",paddingHorizontal:EStyleSheet.value("50rem"),fontSize:EStyleSheet.value("14rem")}}>Terdapat update aplikasi baru, tolong segera lakukan update pada appstore</Text>
            <Text style={{paddingTop:EStyleSheet.value("20rem"),fontWeight:"bold"}}>Changelog :</Text>
            <Text style={{fontSize:EStyleSheet.value("10rem"),textAlign:"center",marginHorizontal:EStyleSheet.value("50rem"),marginTop:EStyleSheet.value("5rem")}}>{changelog}</Text>
            <TouchableOpacity 
            activeOpacity={0.8}
            onPress={()=>{
              Linking.openURL("https://apps.apple.com/id/app/yakopi/id1625994111?l=id");
            }}
            style={{marginTop:EStyleSheet.value("20rem"),borderRadius:EStyleSheet.value("10rem"),overflow:"hidden",backgroundColor:"black",width:EStyleSheet.value("280rem"),height:EStyleSheet.value("50rem")}}>
                <Image resizeMode="center" style={{width:"100%",height:"100%"}} source={require("./assets/appstore.jpeg")}/>
            </TouchableOpacity>
        </View>
      )
    }

  }

  if (!appLoaded) {
    return null;
  }

  if (!credentials) {
    return (
      <GlobalContext.Provider value={{ credentials, setCredentials,intervalTrackingPosition, localProject, setLocalProject, localProvince, setLocalProvince, localDistrict, setLocalDistrict, localSubDistrict, setLocalSubDistrict, KT1, setKT1, KK1, setKK1, KT2, setKT2, KT2Kind, setKT2Kind, KK2, setKK2, KK2Kind, setKK2Kind, KT3, setKT3, KT3Kind, setKT3Kind, KK3, setKK3, KK3Kind, setKK3Kind, KT4, setKT4, KT4Kind, setKT4Kind, KK4, setKK4, KK4Kind, setKK4Kind, KT5, setKT5, KT5Kind, setKT5Kind, KK5, setKK5, KK5Kind, setKK5Kind, KK6, setKK6, KK6Kind, setKK6Kind, KT7, setKT7, KT7Kind, setKT7Kind, KK7, setKK7, KK7Kind, setKK7Kind, KT8, setKT8, KT8Kind, setKT8Kind, KK8, setKK8, KK8Kind, setKK8Kind, KT9, setKT9, KT9Kind, setKT9Kind, KK9, setKK9, KK9Kind, setKK9Kind, KT10, setKT10, KT10Kind, setKT10Kind, KK10, setKK10, KK10Kind, setKK10Kind, KT12, setKT12, KT13, setKT13, KT14, setKT14, KT15, setKT15, KT16, setKT16, comdev, setComdev, silvoshery, setSilvoshery,communityGroup,setCommunityGroup, ccb, setCCB, plankton, setPlankton }}>
        <NavigationContainer>
          <AuthNavigator />
        </NavigationContainer>
      </GlobalContext.Provider>
    );
  }
  else {
    return (
      <GlobalContext.Provider value={{ credentials, setCredentials,intervalTrackingPosition, localProject, setLocalProject, localProvince, setLocalProvince, localDistrict, setLocalDistrict, localSubDistrict, setLocalSubDistrict, KT1, setKT1, KK1, setKK1, KT2, setKT2, KT2Kind, setKT2Kind, KK2, setKK2, KK2Kind, setKK2Kind, KT3, setKT3, KT3Kind, setKT3Kind, KK3, setKK3, KK3Kind, setKK3Kind, KT4, setKT4, KT4Kind, setKT4Kind, KK4, setKK4, KK4Kind, setKK4Kind,  KT5, setKT5, KT5Kind, setKT5Kind, KK5, setKK5, KK5Kind, setKK5Kind, KK6, setKK6, KK6Kind, setKK6Kind, KT7, setKT7, KT7Kind, setKT7Kind, KK7, setKK7, KK7Kind, setKK7Kind, KT8, setKT8, KT8Kind, setKT8Kind, KK8, setKK8, KK8Kind, setKK8Kind, KT9, setKT9,  KT9Kind, setKT9Kind, KK9, setKK9, KK9Kind, setKK9Kind, KT10, setKT10,  KT10Kind, setKT10Kind,KK10, setKK10, KK10Kind, setKK10Kind, KT12, setKT12, KT13, setKT13,  KT14, setKT14, KT15, setKT15, KT16, setKT16, comdev, setComdev, silvoshery, setSilvoshery,communityGroup,setCommunityGroup, ccb, setCCB, plankton, setPlankton }}>
        <NavigationContainer>
          <MasterNavigator />
        </NavigationContainer>
      </GlobalContext.Provider>
    );
  }


}

