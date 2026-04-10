import {
    MatchData,
    OffenseRobotData,
    DefenseRobotData,
    START_POSITION,
    CrossLineTag,
    IntakeLocationTag,
    CapabilityTag,
    ErrorTag,
    SCOUTING_ROLE,
    AllianceColor,
    RobotSlot,
} from "./data_types";
import AsyncStorage from "@react-native-async-storage/async-storage";

export function getMatchData(): Promise<MatchData> {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem("matchData")
            .then((res) => {
                if (res !== null) {
                    resolve(JSON.parse(res) as MatchData);
                } else {
                    console.warn("No match data found - Returning empty object.");
                    resolve(new MatchData());
                }
            }).catch((err) => reject(err));
    });
}

export function saveMatchData(data: MatchData): Promise<void> {
    return AsyncStorage.setItem("matchData", JSON.stringify(data));
}

export function deleteMatchData(): Promise<void> {
    return AsyncStorage.removeItem("matchData");
}

function modifyMatchData(modifier: (data: MatchData) => MatchData): Promise<void> {
    return new Promise((resolve, reject) => {
        getMatchData()
            .then((data) => resolve(saveMatchData(modifier(data))))
            .catch((err) => reject(err));
    });
}

function getOffenseSlot(data: MatchData, slot: RobotSlot): OffenseRobotData {
    const robot = data[slot];
    if ((robot as OffenseRobotData).type !== "offense") {
        throw new Error(`Slot ${slot} is not OffenseRobotData`);
    }
    return robot as OffenseRobotData;
}

function getDefenseSlot(data: MatchData, slot: RobotSlot): DefenseRobotData {
    const robot = data[slot];
    if ((robot as DefenseRobotData).type !== "defense") {
        throw new Error(`Slot ${slot} is not DefenseRobotData`);
    }
    return robot as DefenseRobotData;
}

export function updateName(name: string): Promise<void> {
    return modifyMatchData((data) => { data.scouterName = name; return data; });
}

export function updateMatchNumber(matchNumber: number): Promise<void> {
    return modifyMatchData((data) => { data.matchNumber = matchNumber; return data; });
}

export function updateScoutingRole(role: SCOUTING_ROLE): Promise<void> {
    return modifyMatchData((data) => {
        data.scoutingRole = role;
        data.alliance = role.includes("Red") ? "Red" : "Blue";

        const isOffense = role === SCOUTING_ROLE.OFFENSE_RED || role === SCOUTING_ROLE.OFFENSE_BLUE;

        (["robotOne", "robotTwo", "robotThree"] as const).forEach((slot) => {
            const existing = data[slot];
            const fresh = isOffense ? new OffenseRobotData() : new DefenseRobotData();
            fresh.robotNumber       = existing.robotNumber;
            fresh.driverCitrusScale = existing.driverCitrusScale;
            fresh.notes             = existing.notes;
            data[slot] = fresh;
        });

        return data;
    });
}

export function updateAlliance(alliance: AllianceColor): Promise<void> {
    return modifyMatchData((data) => { data.alliance = alliance; return data; });
}

export function updateAppUpdate(updated: boolean): Promise<void> {
    return modifyMatchData((data) => { data.appUpdated = updated; return data; });
}

export function updateAllRobotNumbers(r1: number, r2: number, r3: number): Promise<void> {
    return modifyMatchData((data) => {
        data.robotOne.robotNumber   = r1;
        data.robotTwo.robotNumber   = r2;
        data.robotThree.robotNumber = r3;
        return data;
    });
}

export function updateIntakeTag(slot: RobotSlot, tag: IntakeLocationTag, remove?: boolean): Promise<void> {
    return modifyMatchData((data) => {
        const tags = new Set(data[slot].intakeTags);
        remove ? tags.delete(tag) : tags.add(tag);
        data[slot].intakeTags = [...tags];
        return data;
    });
}

export function updateCrossLineTag(slot: RobotSlot, tag: CrossLineTag, remove?: boolean): Promise<void> {
    return modifyMatchData((data) => {
        const tags = new Set(data[slot].crossLineTags);
        remove ? tags.delete(tag) : tags.add(tag);
        data[slot].crossLineTags = [...tags];
        return data;
    });
}

export function updateRobotNumber(slot: RobotSlot, num: number): Promise<void> {
    return modifyMatchData((data) => { data[slot].robotNumber = num; return data; });
}

export function updateDriverCitrusScale(slot: RobotSlot, scale: number): Promise<void> {
    return modifyMatchData((data) => { data[slot].driverCitrusScale = scale; return data; });
}

export function updateRobotNotes(slot: RobotSlot, notes: string): Promise<void> {
    return modifyMatchData((data) => { data[slot].notes = notes; return data; });
}

export function updateStartPosition(slot: RobotSlot, position: START_POSITION): Promise<void> {
    return modifyMatchData((data) => {
        getOffenseSlot(data, slot).startPosition = position;
        return data;
    });
}

export function updateCapabilityTag(slot: RobotSlot, tag: CapabilityTag, remove?: boolean): Promise<void> {
    return modifyMatchData((data) => {
        const robot = getOffenseSlot(data, slot);
        const tags = new Set(robot.capabilityTags);
        remove ? tags.delete(tag) : tags.add(tag);
        robot.capabilityTags = [...tags];
        return data;
    });
}

export function updateDefenseCitrusScale(slot: RobotSlot, scale: number): Promise<void> {
    return modifyMatchData((data) => {
        getDefenseSlot(data, slot).defenseCitrusScale = scale;
        return data;
    });
}

export function updateRobotWeight(slot: RobotSlot, weight: number): Promise<void> {
    return modifyMatchData((data) => {
        getDefenseSlot(data, slot).robotWeight = weight;
        return data;
    });
}

export function updateErrorTag(slot: RobotSlot, tag: ErrorTag, remove?: boolean): Promise<void> {
    return modifyMatchData((data) => {
        const robot = getDefenseSlot(data, slot);
        const tags = new Set(robot.errorTags);
        remove ? tags.delete(tag) : tags.add(tag);
        robot.errorTags = [...tags];
        return data;
    });
}

export function addUnsyncedData(data: MatchData): Promise<void> {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem("unsynced")
            .then((res) => {
                const unsynced: MatchData[] = JSON.parse(res ?? "[]");
                const isDuplicate = unsynced.some(
                    (entry) =>
                        entry.matchNumber === data.matchNumber &&
                        entry.scoutingRole === data.scoutingRole
                );
                if (!isDuplicate) unsynced.push(data);
                resolve(AsyncStorage.setItem("unsynced", JSON.stringify(unsynced)));
            }).catch((err) => reject(`Failed to save unsynced match data: ${err}`));
    });
}