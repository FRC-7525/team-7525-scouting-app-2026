import { AUTO_CLIMB_TYPE, TELEOP_CLIMB_TYPE, DRIVER_STATION, GamePhase, MatchData, START_POSITION, Tag, CrossLineTag, IntakeLocationTag, CapabilityTag, ErrorTag } from "./data_types";
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
    })
}

export function saveMatchData(data: MatchData): Promise<void> {
    return AsyncStorage.setItem("matchData", JSON.stringify(data));
}

export function deleteMatchData(): Promise<void> {
    return AsyncStorage.removeItem("matchData");
}

function modifyMatchData(modifier: (data: MatchData) => MatchData): Promise<void> {
    return new Promise((resolve, reject) => {
        getMatchData().then((data) => {
            resolve(saveMatchData(modifier(data)));
        }).catch((err) => reject(err));
    });
}

export function updateName(name: string): Promise<void> {
    return modifyMatchData((data) => {
        data["scouterName"] = name;
        return data;
    });
}

export function updateMatchNumber(matchNumber: number): Promise<void> {
    return modifyMatchData((data) => {
        data["matchNumber"] = matchNumber;
        return data;
    });
}

export function updateTeamNumber(teamNumber: number): Promise<void> {
    return modifyMatchData((data) => {
        data["teamNumber"] = teamNumber;
        return data;
    });
}

export function updateDriverStation(station: DRIVER_STATION): Promise<void> {
    return modifyMatchData((data) => {
        data["driverStation"] = station;
        return data;
    });
}

export function updateBallCount(phase: GamePhase, ballCount: number): Promise<void> {
    return modifyMatchData((data) => {
        data[phase].ballCount = ballCount;
        return data;
    });
}

export function updateLeftStart(leftStart: boolean): Promise<void> {
    return modifyMatchData((data) => {
        data["autonomous"]["leftStart"] = leftStart;
        return data;
    });
}

export function updateStartPosition(position: START_POSITION): Promise<void> {
    return modifyMatchData((data) => {
        data["autonomous"]["startPosition"] = position;
        return data;
    });
}

export function updateAutoClimb(climbType: AUTO_CLIMB_TYPE): Promise<void> {
    return modifyMatchData((data) => {
        data["autonomous"]["climb"] = climbType;
        return data;
    });
}

export function updateTeleopClimb(climbType: TELEOP_CLIMB_TYPE): Promise<void> {
    return modifyMatchData((data) => {
        data["teleop"]["climb"] = climbType;
        return data;
    });
}

export function updateNotes(notes: string): Promise<void> {
    return modifyMatchData((data) => {
        data["notes"] = notes;
        return data;
    });
}

export function addUnsyncedData(data: MatchData): Promise<void> {
    return new Promise((resolve, reject) => {
        AsyncStorage.getItem("unsynced")
            .then((res) => {
                const unsynced = new Set(JSON.parse(res ?? "[]"));
                unsynced.add(data);
                resolve(AsyncStorage.setItem("unsynced", JSON.stringify([ ...unsynced ])));
            }).catch((err) => reject(`Failed to save unsynced match data: ${err}`));
    })
}

export function updateErrorTag(tag: ErrorTag, remove?: boolean): Promise<void> {
    return modifyMatchData((data) => {
        const tags = new Set(data.errorTags);

        if (remove) tags.delete(tag);
        else tags.add(tag);

        data.errorTags = [...tags];
        return data;
    });
}

export function updateCrossLineTag(tag: CrossLineTag, remove?: boolean, phase: GamePhase = "autonomous"): Promise<void> {
    return modifyMatchData((data) => {
        const tags = new Set(data[phase].crossLineTags);

        if (remove) tags.delete(tag);
        else tags.add(tag);

        data[phase].crossLineTags = [...tags];
        return data;
    });
}

export function updateIntakeLocationTag(tag: IntakeLocationTag, remove?: boolean, phase: GamePhase = "autonomous"): Promise<void> {
    return modifyMatchData((data) => {
        const tags = new Set(data[phase].intakeTags);

        if (remove) tags.delete(tag);
        else tags.add(tag);

        data[phase].intakeTags = [...tags];
        return data;
    });
}

export function updateCapabilityTag(tag: CapabilityTag, remove?: boolean): Promise<void> {
    return modifyMatchData((data) => {
        const tags = new Set(data.capabilityTags);

        if (remove) tags.delete(tag);
        else tags.add(tag);

        data.capabilityTags = [...tags];
        return data;
    });
}

export function updateDefenseTime(time: number): Promise<void> {
    return modifyMatchData((data) => {
        data["teleop"]["defenseTime"] = time;
        return data;
    });
}

export function updateAutoShuttlingTime(phase: GamePhase, time: number): Promise<void> {
    return modifyMatchData((data) => {
        data["autonomous"]["AutoshuttlingTime"] = time;
        return data;
    });
}

export function updateTeleopShuttlingTime(phase: GamePhase, time: number): Promise<void> {
    return modifyMatchData((data) => {
        data["teleop"]["TeleopshuttlingTime"] = time;
        return data;
    });
}

export function updateAppUpdate(updated: boolean): Promise<void> {
    return modifyMatchData((data) => {
        data["appUpdated"] = updated;
        return data;
    })
}