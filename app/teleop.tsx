import { StatusBar } from 'expo-status-bar';
import { Keyboard, ScrollView, StyleSheet, View } from 'react-native';
import NavButton from './components/NavButton';
import PageHeader from './components/Header';
import CountBallsView from './views/CountBallsView';
import Stopwatch from './components/Timer';
import { Divider } from 'react-native-paper';
import TeleopTimerView from './views/TeleopTimerView';
import TeleopClimbView from './views/TeleopClimbView';
import { useState } from 'react';

export default function App() {
    const [timersActive, setTimersActive] = useState(false);

    const handleNext = () => {
        setTimersActive(false);
    };

    return (
        <View style={styles.container} onTouchStart={Keyboard.dismiss}>
            <PageHeader title='Teleop' pageNumber='3/4' previous="auto" />
            <ScrollView>
                <CountBallsView phase="teleop" />              
                <Divider />
                <TeleopTimerView 
                    shuttleRunning={timersActive} 
                    setShuttleRunning={setTimersActive} 
                    defenseRunning={false}
                    setDefenseRunning={() => {}}
                />
                <Divider />
                <TeleopClimbView />

                <NavButton pageName='summary' text='Next' onClick={handleNext} />
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
