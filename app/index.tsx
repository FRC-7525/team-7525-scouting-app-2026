import { StatusBar } from 'expo-status-bar';
import { Keyboard, StyleSheet, View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import NavButton from './components/NavButton';
import PageHeader from './components/Header';
import LabeledTextInput from './components/LabeledTextInput';
import { getMatchData, updateMatchNumber, updateName, updateTeamNumber, updateDriverStation, deleteMatchData } from './api/data';
import { DRIVER_STATION, MatchData } from './api/data_types';
import { useEffect, useState } from 'react';
import RadioButton from './components/RadioButton';
import { child, get, onValue, push, ref, set, update } from 'firebase/database';
import { db } from '../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from "expo-file-system";
import { TEXT_WARNING_COLOR } from './consts';

export default function App() {
    const [ nameFilled, setNameFilled ] = useState(false);
    const [ eventCode, setEventCode ] = useState("");
    const [ unsyncedMatches, setUnsyncedMatches ] = useState(0);
    const [ driverStation, setDriverStation ] = useState("");
    const [ matchNumber, setMatchNumber ] = useState(0);
    const [ teamNumber, setTeamNumber ] = useState(0);
    const [ appUpdated, setAppUpdated ] = useState(false);
    const [ scoutingDisabled, setScoutingDisabled ] = useState(true);

    const sync = () => {
        AsyncStorage.getItem("unsynced").then(async (res) => {
            const unsyncedMatches = JSON.parse(res ?? "[]") as MatchData[];

            setUnsyncedMatches(unsyncedMatches.length);

            onValue(ref(db, "eventCode"), (code) => {
                setEventCode(code.val());

                if (unsyncedMatches.length === 0) return;
                const updates: { [key: string]: MatchData } = {};
                unsyncedMatches.forEach((data) => {
                    const path = `${code.val()}/${data["teamNumber"]}/${data["matchNumber"]}/${data["scouterName"]}`;
                    FileSystem.writeAsStringAsync((FileSystem.documentDirectory ?? "") + path.replaceAll("/", "_"), JSON.stringify(data))
                        .catch((err) => { console.error(`Failed to write match: ${err}`) });

                    updates[path] = data;
                });

                update(ref(db), updates).then(() => {
                    AsyncStorage.setItem("unsynced", "[]");
                    setUnsyncedMatches(0);
                });
            });
        });
    }

    useEffect(() => {
        getMatchData().then((data) => {
            setNameFilled(data["scouterName"] !== "");
            setDriverStation(data["driverStation"]);
            setMatchNumber(data["matchNumber"]);
        });

        get(ref(db, "/updateSha")).then(snap => {
            if (!snap.exists()) return;

            const appSha = process.env.EXPO_PUBLIC_SHA ?? "";
            setAppUpdated(appSha === snap.val());
        });
        
        onValue(ref(db, "scoutingEnabled"), (snap) => {
            if (!snap.exists()) return;

            setScoutingDisabled(!snap.val());
        });

        sync();
   }, []);

    useEffect(() => {
        if (matchNumber !== 0 && eventCode !== "" && driverStation !== DRIVER_STATION.UNSELECTED) {
            onValue(ref(db, `${eventCode}/schedule`), (snap) => {
                if (!snap.exists()) return;

                const matches = snap.val();
                const match = matches[matchNumber];

                if (match === undefined) return;

                const [ alliance, station ] = driverStation.split(' ');

                setTeamNumber(match[alliance.toLowerCase()][Number(station) - 1]);
                updateTeamNumber(match[alliance.toLowerCase()][Number(station) - 1]);
            }, { onlyOnce: true });
        } else {
            setTeamNumber(0);
        }
    }, [ driverStation, matchNumber, eventCode ]);

    return (
        <View style={styles.container} onTouchStart={Keyboard.dismiss}>
            <PageHeader title='Main' pageNumber='1/4' showTeam={false} />
            <ScrollView>
                { scoutingDisabled && <Text variant="bodyLarge" theme={{ colors: { 'onSurface': TEXT_WARNING_COLOR } }}>Scouting is disabled, no data will be synced.</Text> }
                { eventCode !== "" && <Text>Event Code: {eventCode}</Text> }
                { unsyncedMatches !== 0 && <Text>Unsynced Matches: {unsyncedMatches}</Text> }
                { teamNumber !== 0 && <Text>Team Number: {teamNumber}</Text> }
                <LabeledTextInput label="Name" editable={true} submit={(e) => {
                        updateName(e.nativeEvent.text);
                        setNameFilled(e.nativeEvent.text !== "");
                    }} oldValue={
                        getMatchData().then((data) => data["scouterName"])
                    } required />


                <LabeledTextInput label="Match number" editable={true}
                    inputMode='numeric' submit={(e) => {
                        const matchNumber = Number(e.nativeEvent.text);
                        updateMatchNumber(matchNumber);
                        setMatchNumber(matchNumber);
                    }} oldValue={
                        getMatchData().then((data) => data["matchNumber"].toString())
                    } required />

                <RadioButton
                    data={["Red 1", "Red 2", "Red 3", "Blue 1", "Blue 2", "Blue 3"]}
                    onSelect={(selected: string) => {
                        updateDriverStation(selected as DRIVER_STATION);
                        setDriverStation(selected);
                    }}
                    oldSelected={getMatchData().then((data) => data["driverStation"])}
                    defaultValue={DRIVER_STATION.UNSELECTED} />

                <View style={styles.buttons}>
                    <NavButton text="Go" pageName="auto"
                        disabled={!(nameFilled && teamNumber !== 0 && matchNumber !== 0)} />

                    {unsyncedMatches > 0 && <NavButton text="Sync" onClick={sync} />}
                </View>


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

    buttons: {
        flex: 1,
        columnGap: 15,
        flexDirection: "row-reverse"
    }
});
