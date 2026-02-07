import { StatusBar } from 'expo-status-bar';
import { Keyboard, ScrollView, StyleSheet, View } from 'react-native';
import NavButton from './components/NavButton';
import PageHeader from './components/Header';
import CountBallsView from './views/CountBallsView';
import Stopwatch from './components/Timer';
import { Divider } from 'react-native-paper';
import TeleopTimerView from './views/TeleopTimerView';
import TeleopClimbView from './views/TeleopClimbView';

export default function App() {
    return (
        <View style={styles.container} onTouchStart={Keyboard.dismiss}>
            <PageHeader title='Teleop' pageNumber='3/4' previous="auto" />
            <ScrollView>

            {/* <Stopwatch/>
            <Divider /> */}
            
            <CountBallsView phase="teleop" />
            <Divider />
            <TeleopTimerView />
            <Divider />
            <TeleopClimbView /> 

            <StatusBar style="auto" />
            <NavButton pageName='summary' text='Next' />
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
