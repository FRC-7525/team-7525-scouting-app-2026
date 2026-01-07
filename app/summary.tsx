import { StatusBar } from 'expo-status-bar';
import { Dimensions, Keyboard, ScrollView, StyleSheet, View } from 'react-native';
import LabeledTextInput from './components/LabeledTextInput';
import { addUnsyncedData, deleteMatchData, getMatchData, updateNotes } from './api/data';
import PageHeader from './components/Header';
import SummaryTableView from './views/SummaryTableView';
import Checkbox from './components/Checkbox';
import NavButton from './components/NavButton';
import { Divider } from 'react-native-paper';

const { width } = Dimensions.get("window");

export default function App() {
    return (
        <View style={styles.container}>
            <PageHeader title="Summary" pageNumber="4/4" previous='teleop' />
            <ScrollView style={{flex: 1}}> 

            <LabeledTextInput label="Notes" editable={true} multiline={true} 
                submit={(e) => {
                    updateNotes(e.nativeEvent.text);
                }} oldValue={getMatchData().then((data) => data["notes"])} />

            <SummaryTableView />
            <View style={styles.checkboxes}>
                <Checkbox tag='Caught on fire'/>
                <Checkbox tag='Stuck on gamepiece'/>
                <Checkbox tag='Broke'/>
                <Checkbox tag='Tipped over'/>
                <Checkbox tag='Gamepiece stuck'/>
                <Checkbox tag='Climb failure'/>
            </View>
            <NavButton text="End" pageName='submit'/>

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
            rowGap: 20,
        },

        checkboxes: {
            flex: 1,
            marginLeft: width * 0.25
        }
    });
