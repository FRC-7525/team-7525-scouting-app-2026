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

export enum AUTO_CLIMB_TYPE {
    L1 = 'L1',
    NO_CLIMB = "Nothing"
};

export enum TELEOP_CLIMB_TYPE {
    L1 = 'L1',
    L2 = 'L2',
    L3 = 'L3',
    NO_CLIMB = "Nothing"
};

class PhaseData {

    ballCount: number = 0;
};

export class AutoData extends PhaseData {
    leftStart: boolean = false;
    startPosition: START_POSITION = START_POSITION.SCORING_TABLE;
    climb: AUTO_CLIMB_TYPE = AUTO_CLIMB_TYPE.L1;
    AutoshuttlingTime: number = 0;
}

export class TeleopData extends PhaseData {
    climb: TELEOP_CLIMB_TYPE = TELEOP_CLIMB_TYPE.L1;
    defenseTime: number = 0;
    TeleopshuttlingTime:number = 0;
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
export type Tag = "Can drive while shooting" |"Can pass over BUMP" | "Can pass under TRENCH"|"Can pick up from DEPOT"|"Can feed OUTPOST"|"Stuck on gamepiece" | "Broke" | "Tipped over" | "Gamepiece stuck" | "Climb failure";
