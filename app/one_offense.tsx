import { StatusBar } from 'expo-status-bar';
import { Dimensions, Keyboard, ScrollView, StyleSheet, View } from 'react-native';
import NavButton from './components/NavButton';
import PageHeader from './components/Header';
import { Divider } from 'react-native-paper';
import SuperScoutView from './views/SuperScoutView';
import Checkbox from './components/Checkbox';
import LabeledTextInput from './components/LabeledTextInput';
import { updateCapabilityTag, updateRobotNotes, getMatchData } from './api/data';
import { OffenseRobotData } from './api/data_types';
import IntakeLocationsView from './views/IntakeLocationsView';

const { width } = Dimensions.get("window");

export default function App() {
    return (
        <View style={styles.container} onTouchStart={Keyboard.dismiss}>
            <PageHeader title='Robot 1' pageNumber='1/4' slot='robotOne'/>
            <ScrollView>
                <IntakeLocationsView slot="robotOne" />
                <Divider />
                <SuperScoutView slot="robotOne" />
                <Divider />
                <LabeledTextInput label="Notes" editable={true} multiline={true} submit={(e) => updateRobotNotes("robotOne", e.nativeEvent.text)} oldValue={getMatchData().then((data) => data.robotOne.notes)} />
                <Divider />
                <View style={styles.checkboxes}>
                    <Checkbox label="Can drive while shooting"
                        getChecked={(data) => (data.robotOne as OffenseRobotData).capabilityTags.includes("Can drive while shooting")}
                        update={(remove) => updateCapabilityTag("robotOne", "Can drive while shooting", remove)} />
                    <Checkbox label="Can get unstuck on gamepiece"
                        getChecked={(data) => (data.robotOne as OffenseRobotData).capabilityTags.includes("Can get unstuck on gamepiece")}
                        update={(remove) => updateCapabilityTag("robotOne", "Can get unstuck on gamepiece", remove)} />
                    <Checkbox label="Can go over BUMP"
                        getChecked={(data) => (data.robotOne as OffenseRobotData).capabilityTags.includes("Can go over BUMP")}
                        update={(remove) => updateCapabilityTag("robotOne", "Can go over BUMP", remove)} />
                    <Checkbox label="Can go under TRENCH"
                        getChecked={(data) => (data.robotOne as OffenseRobotData).capabilityTags.includes("Can go under TRENCH")}
                        update={(remove) => updateCapabilityTag("robotOne", "Can go under TRENCH", remove)} />
                    <Checkbox label="Shuttles by shooting"
                        getChecked={(data) => (data.robotOne as OffenseRobotData).capabilityTags.includes("Shuttles by shooting")}
                        update={(remove) => updateCapabilityTag("robotOne", "Shuttles by shooting", remove)} />
                    <Checkbox label="Shuttles by pushing"
                        getChecked={(data) => (data.robotOne as OffenseRobotData).capabilityTags.includes("Shuttles by pushing")}
                        update={(remove) => updateCapabilityTag("robotOne", "Shuttles by pushing", remove)} />
                </View>
                <NavButton pageName='two_offense' text='Next' />
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