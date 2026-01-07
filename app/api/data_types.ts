export enum DRIVER_STATION {
    RED_ONE = "Red 1",
    RED_TWO = "Red 2",
    RED_THREE = "Red 3",
    BLUE_ONE = "Blue 1",
    BLUE_TWO = "Blue 2",
    BLUE_THREE = "Blue 3",
    UNSELECTED = "Unselected",
};

export enum START_POSITION {
    SCORING_TABLE = "Scoring Table Side",
    CENTER = "Center",
    AUDIENCE = "Audience Side",
};

export enum CLIMB_TYPE {
    DEEP_CLIMB = "Deep Climb",
    SHALLOW_CLIMB = "Shallow Climb",
    PARK = "Park",
    NO_CLIMB = "Nothing",
};


class PhaseData {
    reef: {
        L4: number,
        L3: number,
        L2: number,
        L1: number,
    } = { L4: 0, L3: 0, L2: 0, L1: 0 };
    algae: {
        net: number,
        processor: number,
    } = { net: 0, processor: 0 };
};

export class AutoData extends PhaseData {
    leftStart: boolean = false;
    startPosition: START_POSITION = START_POSITION.SCORING_TABLE;
}

export class TeleopData extends PhaseData {
    climb: CLIMB_TYPE = CLIMB_TYPE.DEEP_CLIMB;
    defenseTime: number = 0;
}

export class MatchData {
    appUpdated: boolean = true;
    scouterName: string = "";
    teamNumber: number = 0;
    matchNumber: number = 0;
    driverStation: DRIVER_STATION = DRIVER_STATION.UNSELECTED;
    autonomous: AutoData = new AutoData();
    teleop: TeleopData = new TeleopData();
    notes: string = "";
    tags: Tag[] = [];
}

export type GamePhase = "teleop" | "autonomous";
export type Tag = "Caught on fire" | "Stuck on gamepiece" | "Broke" | "Tipped over" | "Gamepiece stuck" | "Climb failure";
export type ReefLevel = "L4" | "L3" | "L2" | "L1";
export type AlgaeLevel = "net" | "processor";
