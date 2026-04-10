import { StatusBar } from 'expo-status-bar';
import { Dimensions, Keyboard, ScrollView, StyleSheet, View } from 'react-native';
import NavButton from './components/NavButton';
import PageHeader from './components/Header';
import { Divider } from 'react-native-paper';
import SuperScoutView from './views/SuperScoutView';
import Checkbox from './components/Checkbox';
import { updateCapabilityTag, updateRobotNotes, getMatchData } from './api/data';
import { OffenseRobotData } from './api/data_types';
import IntakeLocationsView from './views/IntakeLocationsView';
import LabeledTextInput from './components/LabeledTextInput';
import AutoStartPositionView from './views/AutoStartPositionView';

const { width } = Dimensions.get("window");

export default function App() {
    return (
        <View style={styles.container} onTouchStart={Keyboard.dismiss}>
            <PageHeader title='Robot 2' pageNumber='2/4' previous='one_offense' slot='robotTwo'/>
            <ScrollView>
                <AutoStartPositionView slot="robotTwo" />
                <IntakeLocationsView slot="robotTwo" />
                <Divider />
                <SuperScoutView slot="robotTwo" />
                <Divider />
                <LabeledTextInput label="Notes" editable={true} multiline={true} submit={(e) => updateRobotNotes("robotTwo", e.nativeEvent.text)} oldValue={getMatchData().then((data) => data.robotTwo.notes)} />
                <Divider />
                <View style={styles.checkboxes}>
                    <Checkbox label="Can drive while shooting"
                        getChecked={(data) => (data.robotTwo as OffenseRobotData).capabilityTags.includes("Can drive while shooting")}
                        update={(remove) => updateCapabilityTag("robotTwo", "Can drive while shooting", remove)} />
                    <Checkbox label="Can get unstuck on gamepiece"
                        getChecked={(data) => (data.robotTwo as OffenseRobotData).capabilityTags.includes("Can get unstuck on gamepiece")}
                        update={(remove) => updateCapabilityTag("robotTwo", "Can get unstuck on gamepiece", remove)} />
                    <Checkbox label="Can go over BUMP"
                        getChecked={(data) => (data.robotTwo as OffenseRobotData).capabilityTags.includes("Can go over BUMP")}
                        update={(remove) => updateCapabilityTag("robotTwo", "Can go over BUMP", remove)} />
                    <Checkbox label="Can go under TRENCH"
                        getChecked={(data) => (data.robotTwo as OffenseRobotData).capabilityTags.includes("Can go under TRENCH")}
                        update={(remove) => updateCapabilityTag("robotTwo", "Can go under TRENCH", remove)} />
                    <Checkbox label="Shuttles by shooting"
                        getChecked={(data) => (data.robotTwo as OffenseRobotData).capabilityTags.includes("Shuttles by shooting")}
                        update={(remove) => updateCapabilityTag("robotTwo", "Shuttles by shooting", remove)} />
                    <Checkbox label="Shuttles by pushing"
                        getChecked={(data) => (data.robotTwo as OffenseRobotData).capabilityTags.includes("Shuttles by pushing")}
                        update={(remove) => updateCapabilityTag("robotTwo", "Shuttles by pushing", remove)} />
                </View>
                <NavButton pageName='three_offense' text='Next' />
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