import { StatusBar } from 'expo-status-bar';
import { Dimensions, Keyboard, ScrollView, StyleSheet, View } from 'react-native';
import LabeledTextInput from './components/LabeledTextInput';
import { addUnsyncedData, deleteMatchData, getMatchData, updateNotes, updateCapabilityTag, updateErrorTag } from './api/data';
import PageHeader from './components/Header';
import SummaryTableView from './views/SummaryTableView';
import Checkbox from './components/Checkbox';
import NavButton from './components/NavButton';
import { Divider } from 'react-native-paper';
import Dropdown from './components/Dropdown' 

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
                <Checkbox label="Climb failure" getChecked={(data) => data.errorTags.includes("Climb failure")} update={(remove) => updateErrorTag("Climb failure", remove)} />
                <Checkbox label="Gamepiece stuck" getChecked={(data) => data.errorTags.includes("Gamepiece stuck")} update={(remove) => updateErrorTag("Gamepiece stuck", remove)} />
                <Checkbox label="Tipped over" getChecked={(data) => data.errorTags.includes("Tipped over")} update={(remove) => updateErrorTag("Tipped over", remove)} />
                <Checkbox label="Broke" getChecked={(data) => data.errorTags.includes("Broke")} update={(remove) => updateErrorTag("Broke", remove)} />
                <Checkbox label="Stuck on gamepiece" getChecked={(data) => data.errorTags.includes("Stuck on gamepiece")} update={(remove) => updateErrorTag("Stuck on gamepiece", remove)} />
                <Checkbox label="Foul" getChecked={(data) => data.errorTags.includes("Foul")} update={(remove) => updateErrorTag("Foul", remove)} />
            </View>
            <Divider />
            <View style={styles.checkboxes}>
                <Checkbox label="Can drive while shooting" getChecked={(data) => data.capabilityTags.includes("Can drive while shooting")} update={(remove) => updateCapabilityTag("Can drive while shooting", remove)} />
                <Checkbox label="Can get unstuck on gamepiece" getChecked={(data) => data.capabilityTags.includes("Can get unstuck on gamepiece")} update={(remove) => updateCapabilityTag("Can get unstuck on gamepiece", remove)} />
                <Checkbox label="Can go over BUMP" getChecked={(data) => data.capabilityTags.includes("Can go over BUMP")} update={(remove) => updateCapabilityTag("Can go over BUMP", remove)} />
                <Checkbox label="Can go under TRENCH" getChecked={(data) => data.capabilityTags.includes("Can go under TRENCH")} update={(remove) => updateCapabilityTag("Can go under TRENCH", remove)} />
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
