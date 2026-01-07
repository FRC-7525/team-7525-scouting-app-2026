import { AlgaeLevel, CLIMB_TYPE, DRIVER_STATION, GamePhase, MatchData, ReefLevel, START_POSITION, Tag } from "./data_types";
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

export function updateReefScores(phase: GamePhase, level: ReefLevel, score: number): Promise<void> {
    return modifyMatchData((data) => {
        data[phase]["reef"][level] = score;
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

export function updateAlgaeScore(phase: GamePhase, location: AlgaeLevel, score: number): Promise<void> {
    return modifyMatchData((data) => {
        data[phase]["algae"][location] = score;
        return data;
    });
}

export function updateClimb(climbType: CLIMB_TYPE): Promise<void> {
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

export function updateTags(tag: Tag, removeTag?: boolean): Promise<void> {
    return modifyMatchData((data) => {
        const tags = new Set(data["tags"]);

        if (removeTag) {
            tags.delete(tag);
        } else {
            tags.add(tag);
        }

        data["tags"] = [...tags];
        return data;
    });
}

export function updateDefenseTime(time: number): Promise<void> {
    return modifyMatchData((data) => {
        data["teleop"]["defenseTime"] = time;
        return data;
    });
}

export function updateAppUpdate(updated: boolean): Promise<void> {
    return modifyMatchData((data) => {
        data["appUpdated"] = updated;
        return data;
    })
}