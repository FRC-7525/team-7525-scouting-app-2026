import { StatusBar } from 'expo-status-bar';
import { Keyboard, StyleSheet, View, ScrollView } from 'react-native';
import { Text } from 'react-native-paper';
import NavButton from './components/NavButton';
import PageHeader from './components/Header';
import LabeledTextInput from './components/LabeledTextInput';
import { getMatchData, updateMatchNumber, updateName, updateScoutingRole, updateAllRobotNumbers } from './api/data';
import { MatchData, SCOUTING_ROLE } from './api/data_types';
import { useEffect, useState } from 'react';
import RadioButton from './components/RadioButton';
import { onValue, ref, get, update } from 'firebase/database';
import { db } from '../firebaseConfig';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as FileSystem from "expo-file-system";
import { TEXT_WARNING_COLOR } from './consts';

export default function App() {
    const [ nameFilled, setNameFilled ] = useState(false);
    const [ eventCode, setEventCode ] = useState("");
    const [ unsyncedMatches, setUnsyncedMatches ] = useState(0);
    const [ scoutingRole, setScoutingRole ] = useState<SCOUTING_ROLE>(SCOUTING_ROLE.UNSELECTED);
    const [ matchNumber, setMatchNumber ] = useState(0);
    const [ robotNumbers, setRobotNumbers ] = useState<[number, number, number] | null>(null);
    const [ appUpdated, setAppUpdated ] = useState<boolean | null>(null);
    const [ scoutingDisabled, setScoutingDisabled ] = useState(true);

    const isOffense = scoutingRole === SCOUTING_ROLE.OFFENSE_RED || scoutingRole === SCOUTING_ROLE.OFFENSE_BLUE;
    const isDefense = scoutingRole === SCOUTING_ROLE.DEFENSE_RED || scoutingRole === SCOUTING_ROLE.DEFENSE_BLUE;
    const canNavigate = nameFilled && matchNumber !== 0 && robotNumbers !== null && scoutingRole !== SCOUTING_ROLE.UNSELECTED;

    const sync = () => {
        AsyncStorage.getItem("unsynced").then(async (res) => {
            const unsyncedList = JSON.parse(res ?? "[]") as MatchData[];
            setUnsyncedMatches(unsyncedList.length);

            const codeSnap = await get(ref(db, "eventCode"));
            if (!codeSnap.exists()) return;
            const code = codeSnap.val();
            setEventCode(code);

            if (unsyncedList.length === 0) return;

            const updates: { [key: string]: MatchData } = {};
            unsyncedList.forEach((data) => {
                const path = `${code}/${data.matchNumber}/${data.scouterName}`;
                FileSystem.writeAsStringAsync(
                    (FileSystem.documentDirectory ?? "") + path.replaceAll("/", "_"),
                    JSON.stringify(data)
                ).catch((err) => console.error(`Failed to write match: ${err}`));
                updates[path] = data;
            });

            await update(ref(db), updates);
            AsyncStorage.setItem("unsynced", "[]");
            setUnsyncedMatches(0);
        });
    };

    const lookupRobots = (role: SCOUTING_ROLE, match: number, code: string) => {
        if (role === SCOUTING_ROLE.UNSELECTED || match === 0 || code === "") {
            setRobotNumbers(null);
            return;
        }

        const alliance = role.includes("Red") ? "red" : "blue";

        get(ref(db, `${code}/schedule/${match}/${alliance}`)).then((snap) => {
            if (!snap.exists()) {
                setRobotNumbers(null);
                return;
            }

            const teams: number[] = snap.val();
            if (!teams || teams.length < 3) {
                setRobotNumbers(null);
                return;
            }

            const [r1, r2, r3] = teams;
            setRobotNumbers([r1, r2, r3]);
            updateAllRobotNumbers(r1, r2, r3);
        });
    };

    useEffect(() => {
        getMatchData().then((data) => {
            setNameFilled(data.scouterName !== "");
            setScoutingRole(data.scoutingRole);
            setMatchNumber(data.matchNumber);
            const r1 = data.robotOne.robotNumber;
            const r2 = data.robotTwo.robotNumber;
            const r3 = data.robotThree.robotNumber;
            if (r1 && r2 && r3) setRobotNumbers([r1, r2, r3]);
        });

        get(ref(db, "/updateSha")).then((snap) => {
            if (!snap.exists()) return;
            const appSha = process.env.EXPO_PUBLIC_SHA ?? "";
            setAppUpdated(appSha === snap.val());
        });

        const unsubScoutingEnabled = onValue(ref(db, "scoutingEnabled"), (snap) => {
            if (!snap.exists()) return;
            setScoutingDisabled(!snap.val());
        });

        sync();

        return () => unsubScoutingEnabled();
    }, []);

    useEffect(() => {
        lookupRobots(scoutingRole, matchNumber, eventCode);
    }, [matchNumber, eventCode]);

    return (
        <View style={styles.container} onTouchStart={Keyboard.dismiss}>
            <PageHeader title='Main' />
            <ScrollView>
                { scoutingDisabled &&
                    <Text variant="bodyLarge" theme={{ colors: { onSurface: TEXT_WARNING_COLOR } }}>
                        Scouting is disabled, no data will be synced.
                    </Text> }
                { appUpdated === false &&
                    <Text variant="bodyLarge" theme={{ colors: { onSurface: TEXT_WARNING_COLOR } }}>
                        App is out of date, please update before scouting.
                    </Text> }
                { eventCode !== "" && <Text>Event Code: {eventCode}</Text> }
                { unsyncedMatches !== 0 && <Text>Unsynced Matches: {unsyncedMatches}</Text> }
                { robotNumbers !== null &&
                    <Text>Alliance Robots: {robotNumbers.join(", ")}</Text> }
                { scoutingRole !== SCOUTING_ROLE.UNSELECTED && matchNumber !== 0 && robotNumbers === null &&
                    <Text theme={{ colors: { onSurface: TEXT_WARNING_COLOR } }}>
                        No schedule data found for match {matchNumber}.
                    </Text> }

                <LabeledTextInput
                    label="Name"
                    editable={true}
                    submit={(e) => {
                        updateName(e.nativeEvent.text);
                        setNameFilled(e.nativeEvent.text !== "");
                    }}
                    oldValue={getMatchData().then((data) => data.scouterName)}
                    required />

                <LabeledTextInput
                    label="Match Number"
                    editable={true}
                    inputMode='numeric'
                    submit={(e) => {
                        const num = Number(e.nativeEvent.text);
                        updateMatchNumber(num);
                        setMatchNumber(num);
                    }}
                    oldValue={getMatchData().then((data) => data.matchNumber.toString())}
                    required />

                <RadioButton
                    data={[
                        SCOUTING_ROLE.OFFENSE_RED,
                        SCOUTING_ROLE.OFFENSE_BLUE,
                        SCOUTING_ROLE.DEFENSE_RED,
                        SCOUTING_ROLE.DEFENSE_BLUE,
                    ]}
                    onSelect={(selected: string) => {
                        const role = selected as SCOUTING_ROLE;
                        updateScoutingRole(role).then(() => {
                            setScoutingRole(role);
                            lookupRobots(role, matchNumber, eventCode);
                        });
                    }}
                    oldSelected={getMatchData().then((data) => data.scoutingRole)}
                    defaultValue={SCOUTING_ROLE.UNSELECTED} />

                <View style={styles.buttons}>
                    { isOffense &&
                        <NavButton text="Offense" pageName="one_offense" disabled={!canNavigate} /> }
                    { isDefense &&
                        <NavButton text="Defense" pageName="one_defense" disabled={!canNavigate} /> }
                    { unsyncedMatches > 0 &&
                        <NavButton text="Sync" onClick={sync} /> }
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