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
    crossLineTags: CrossLineTag[] = [];
    intakeTags: IntakeLocationTag[] = [];
    ballCount: number = 0;
};

export class AutoData extends PhaseData {
    leftStart: boolean = false;
    startPosition: START_POSITION = START_POSITION.SCORING_TABLE;
    climb: AUTO_CLIMB_TYPE = AUTO_CLIMB_TYPE.NO_CLIMB;
    AutoshuttlingTime: number = 0;
}

export class TeleopData extends PhaseData {
    climb: TELEOP_CLIMB_TYPE = TELEOP_CLIMB_TYPE.NO_CLIMB;
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

    errorTags: ErrorTag[] = [];
    capabilityTags: CapabilityTag[] = [];
}

export type GamePhase = "teleop" | "autonomous";

export type ErrorTag =
  | "Stuck on gamepiece"
  | "Broke"
  | "Tipped over"
  | "Gamepiece stuck"
  | "Climb failure"
  | "Foul";

export type CrossLineTag =
  | "BUMP"
  | "TRENCH";

export type IntakeLocationTag =
  | "Depot"
  | "Outpost"
  | "Center zone"

export type CapabilityTag =
  | "Can drive while shooting"
  | "Can get unstuck on gamepiece"
  |"Can go over BUMP"
  |"Can go under TRENCH";

export type Tag =
  | ErrorTag
  | CrossLineTag
  | IntakeLocationTag
  | CapabilityTag;


