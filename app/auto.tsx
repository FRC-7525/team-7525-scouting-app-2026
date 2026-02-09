
import { StatusBar } from 'expo-status-bar';
import { Divider } from "react-native-paper";
import { Keyboard, ScrollView, StyleSheet, View } from 'react-native';
import PageHeader from './components/Header';
import NavButton from './components/NavButton';
import ReefAlgaeView from './views/AutoShuttleTimerView';
import AutoStartPositionView from './views/AutoStartPositionView'
import AutoClimbView from './views/AutoClimbView';
import AutoShuttleTimerView from './views/AutoShuttleTimerView';
import React from 'react';
import CountBallsView from './views/CountBallsView';

export default function App() {
    return (
        <View style={styles.container}>
             
            <PageHeader title='Auto' pageNumber='2/4' previous='' />
        
            <ScrollView>
            <AutoStartPositionView/>
            <CountBallsView phase ="autonomous" />
            <Divider />
            <AutoShuttleTimerView />
            <Divider />
            <AutoClimbView />
            <NavButton text="Next" pageName="teleop" />
            <StatusBar style="auto" />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
        backgroundColor: '#fff',
        rowGap: 15
    },
   
});
