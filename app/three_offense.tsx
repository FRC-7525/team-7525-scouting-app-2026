import { StatusBar } from 'expo-status-bar';
import { Dimensions, Keyboard, ScrollView, StyleSheet, View } from 'react-native';
import NavButton from './components/NavButton';
import PageHeader from './components/Header';
import { Divider } from 'react-native-paper';
import SuperScoutView from './views/SuperScoutView';
import Checkbox from './components/Checkbox';
import { updateCapabilityTag } from './api/data';
import { OffenseRobotData } from './api/data_types';
import IntakeLocationsView from './views/IntakeLocationsView';
import LabeledTextInput from './components/LabeledTextInput';
import { updateRobotNotes, getMatchData } from './api/data';

const { width } = Dimensions.get("window");

export default function App() {
    return (
        <View style={styles.container} onTouchStart={Keyboard.dismiss}>
            <PageHeader title='Robot 3' pageNumber='3/4' previous='two_offense' slot='robotThree'/>
            <ScrollView>
                <IntakeLocationsView slot="robotThree" />
                <Divider />
                <SuperScoutView slot="robotThree" />
                <Divider />
                <LabeledTextInput label="Notes" editable={true} multiline={true} submit={(e) => updateRobotNotes("robotThree", e.nativeEvent.text)} oldValue={getMatchData().then((data) => data.robotThree.notes)} />
                <Divider />
                <View style={styles.checkboxes}>
                    <Checkbox label="Can drive while shooting"
                        getChecked={(data) => (data.robotThree as OffenseRobotData).capabilityTags.includes("Can drive while shooting")}
                        update={(remove) => updateCapabilityTag("robotThree", "Can drive while shooting", remove)} />
                    <Checkbox label="Can get unstuck on gamepiece"
                        getChecked={(data) => (data.robotThree as OffenseRobotData).capabilityTags.includes("Can get unstuck on gamepiece")}
                        update={(remove) => updateCapabilityTag("robotThree", "Can get unstuck on gamepiece", remove)} />
                    <Checkbox label="Can go over BUMP"
                        getChecked={(data) => (data.robotThree as OffenseRobotData).capabilityTags.includes("Can go over BUMP")}
                        update={(remove) => updateCapabilityTag("robotThree", "Can go over BUMP", remove)} />
                    <Checkbox label="Can go under TRENCH"
                        getChecked={(data) => (data.robotThree as OffenseRobotData).capabilityTags.includes("Can go under TRENCH")}
                        update={(remove) => updateCapabilityTag("robotThree", "Can go under TRENCH", remove)} />
                    <Checkbox label="Shuttles by shooting"
                        getChecked={(data) => (data.robotThree as OffenseRobotData).capabilityTags.includes("Shuttles by shooting")}
                        update={(remove) => updateCapabilityTag("robotThree", "Shuttles by shooting", remove)} />
                    <Checkbox label="Shuttles by pushing"
                        getChecked={(data) => (data.robotThree as OffenseRobotData).capabilityTags.includes("Shuttles by pushing")}
                        update={(remove) => updateCapabilityTag("robotThree", "Shuttles by pushing", remove)} />
                </View>
                <NavButton pageName='summary_offense' text='Next' />
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