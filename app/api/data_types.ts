export enum SCOUTING_ROLE {
    OFFENSE_RED = "Offense Red",
    OFFENSE_BLUE = "Offense Blue",
    DEFENSE_RED = "Defense Red",
    DEFENSE_BLUE = "Defense Blue",
    UNSELECTED = "Unselected",
}

export enum START_POSITION {
    SCORING_TABLE = "Scoring Table Side",
    CENTER = "Center",
    AUDIENCE = "Audience Side",
}

export type AllianceColor = "Red" | "Blue";
export type RobotSlot = "robotOne" | "robotTwo" | "robotThree";

export class RobotData {
    robotNumber: number = 0;
    driverCitrusScale: number = 1;
    notes: string = "";
}

export class OffenseRobotData extends RobotData {
    readonly type = "offense" as const;
    startPosition: START_POSITION = START_POSITION.SCORING_TABLE;
    crossLineTags: CrossLineTag[] = [];
    intakeTags: IntakeLocationTag[] = [];
    capabilityTags: CapabilityTag[] = [];
}

export class DefenseRobotData extends RobotData {
    readonly type = "defense" as const;
    defenseCitrusScale: number = 1;
    robotWeight: number = 1;
    errorTags: ErrorTag[] = [];
}

export class MatchData {
    appUpdated: boolean = true;
    scouterName: string = "";
    matchNumber: number = 0;
    scoutingRole: SCOUTING_ROLE = SCOUTING_ROLE.UNSELECTED;
    alliance: AllianceColor = "Red";
    robotOne: OffenseRobotData | DefenseRobotData = new OffenseRobotData();
    robotTwo: OffenseRobotData | DefenseRobotData = new OffenseRobotData();
    robotThree: OffenseRobotData | DefenseRobotData = new OffenseRobotData();
    notes: string = "";
}

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
    | "Center zone";

export type CapabilityTag =
    | "Can drive while shooting"
    | "Can get unstuck on gamepiece"
    | "Can go over BUMP"
    | "Can go under TRENCH"
    | "Shuttles by shooting"
    | "Shuttles by pushing";

export type Tag =
    | ErrorTag
    | CrossLineTag
    | IntakeLocationTag
    | CapabilityTag;