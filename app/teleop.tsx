import { StatusBar } from 'expo-status-bar';
import { Keyboard, ScrollView, StyleSheet, View } from 'react-native';
import NavButton from './components/NavButton';
import ReefAlgaeView from './views/ReefAlgaeView';
import EndgameView from './views/EndgameView';
import PageHeader from './components/Header';
import AlgaeView from './views/AlgaeView';
import Stopwatch from './components/Timer';
import { Divider } from 'react-native-paper';

export default function App() {
    return (
        <View style={styles.container} onTouchStart={Keyboard.dismiss}>
            <PageHeader title='Teleop' pageNumber='3/4' previous="auto" />
            <ScrollView>

            {/* <Stopwatch/>
            <Divider /> */}
            
            <ReefAlgaeView phase="teleop" />
            <Divider />
            <AlgaeView phase="teleop" />
            <Divider />
            <EndgameView/>  

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
