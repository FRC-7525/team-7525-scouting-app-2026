import { StatusBar } from 'expo-status-bar';
import { Dimensions, Keyboard, ScrollView, StyleSheet, View } from 'react-native';
import NavButton from './components/NavButton';
import PageHeader from './components/Header';
import { Divider } from 'react-native-paper';
import SuperScoutView from './views/SuperScoutView';
import Checkbox from './components/Checkbox';
import { getMatchData, updateCapabilityTag, updateErrorTag, updateRobotNotes } from './api/data';
import { DefenseRobotData, OffenseRobotData } from './api/data_types';
import DefenseView from './views/DefenseView';
import LabeledTextInput from './components/LabeledTextInput';

// export type ErrorTag =
//     | "Stuck on gamepiece"
//     | "Broke"
//     | "Tipped over"
//     | "Gamepiece stuck"
//     | "Climb failure"
//     | "Foul";

const { width } = Dimensions.get("window");

export default function App() {
    return (
        <View style={styles.container} onTouchStart={Keyboard.dismiss}>
            <PageHeader title='Robot 1' pageNumber='1/4' slot='robotOne'/>
            <ScrollView>
                <SuperScoutView slot="robotOne" />
                <Divider />
                <DefenseView slot="robotOne" />
                <Divider />
                <LabeledTextInput label="Notes" editable={true} multiline={true} submit={(e) => updateRobotNotes("robotOne", e.nativeEvent.text)} oldValue={getMatchData().then((data) => data.robotOne.notes)} />
                <Divider />
                <View style={styles.checkboxes}>
                    <Checkbox label="Can drive while shooting"
                        getChecked={(data) => (data.robotOne as DefenseRobotData).errorTags.includes("Foul")}
                        update={(remove) => updateErrorTag("robotOne", "Foul", remove)} />
                    <Checkbox label="Can get unstuck on gamepiece"
                        getChecked={(data) => (data.robotOne as DefenseRobotData).errorTags.includes("Stuck on gamepiece")}
                        update={(remove) => updateErrorTag("robotOne", "Stuck on gamepiece", remove)} />
                    <Checkbox label="Broke"
                        getChecked={(data) => (data.robotOne as DefenseRobotData).errorTags.includes("Broke")}
                        update={(remove) => updateErrorTag("robotOne", "Broke", remove)} />
                    <Checkbox label="Tipped Over"
                        getChecked={(data) => (data.robotOne as DefenseRobotData).errorTags.includes("Tipped over")}
                        update={(remove) => updateErrorTag("robotOne", "Tipped over", remove)} />
                    <Checkbox label="Gamepiece stuck"
                        getChecked={(data) => (data.robotOne as DefenseRobotData).errorTags.includes("Gamepiece stuck")}
                        update={(remove) => updateErrorTag("robotOne", "Gamepiece stuck", remove)} />
                    <Checkbox label="Climb failure"
                        getChecked={(data) => (data.robotOne as DefenseRobotData).errorTags.includes("Climb failure")}
                        update={(remove) => updateErrorTag("robotOne", "Climb failure", remove)} />
                </View>
                <NavButton pageName='two_defense' text='Next' />
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
    checkboxes: {
        flex: 1,
        marginLeft: width * 0.25
    }
});