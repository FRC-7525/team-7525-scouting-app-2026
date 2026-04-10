import { DataTable, Divider } from "react-native-paper";
import TableHeader from "../components/TableHeader";
import { ScrollView, View } from "react-native";
import { getMatchData } from "../api/data";
import { DefenseRobotData, OffenseRobotData } from "../api/data_types";
import TableRow from "../components/TableRow";

type SummaryTableViewProps = {
    mode: "offense" | "defense";
};

function SummaryTableView({ mode }: SummaryTableViewProps) {
    return (
        <View>
            <DataTable>
                <TableHeader titles={[ "Summary" ]} />
                <TableRow label="Scouter" data={ getMatchData().then((data) => data.scouterName) } />
                <TableRow label="Match Number" data={ getMatchData().then((data) => data.matchNumber.toString()) } />
                <TableRow label="Alliance" data={ getMatchData().then((data) => data.alliance) } />
                <TableRow label="Role" data={ getMatchData().then((data) => data.scoutingRole) } />
                <TableRow label="Robots" data={ getMatchData().then((data) => {
                    const r1 = data.robotOne.robotNumber   || "";
                    const r2 = data.robotTwo.robotNumber   || "";
                    const r3 = data.robotThree.robotNumber || "";
                    return `${r1}, ${r2}, ${r3}`;
                })} />
            </DataTable>

    {(["robotOne", "robotTwo", "robotThree"] as const).map((slot, i) => (
        <DataTable key={slot}>
            <TableHeader titles={[ `Robot ${i + 1}` ]} />
            <TableRow label="Robot Number" data={ getMatchData().then((data) => data[slot].robotNumber.toString()) } />
            <TableRow label="Intake Locations" data={ getMatchData().then((data) => data[slot].intakeTags.join(", ") || "" )} />
            <TableRow label="Driver Citrus Scale" data={ getMatchData().then((data) => data[slot].driverCitrusScale.toString()) } />
            <TableRow label="Notes" data={ getMatchData().then((data) => data[slot].notes || "") } />

            { mode === "offense" && <>
                <TableRow label="Start Position" data={ getMatchData().then((data) => {
                    const robot = data[slot];
                    return (robot as OffenseRobotData)?.startPosition || "";
                })} />
                <TableRow label="Capability Tags" data={ getMatchData().then((data) => {
                    const robot = data[slot];
                    return (robot as OffenseRobotData)?.capabilityTags.join(", ") || "";
                })} />
            </> }

            { mode === "defense" && <>
                <TableRow label="Defense Citrus Scale" data={ getMatchData().then((data) => {
                    const robot = data[slot];
                    return (robot as DefenseRobotData)?.defenseCitrusScale.toString() || "";
                })} />
                <TableRow label="Robot Weight" data={ getMatchData().then((data) => {
                    const robot = data[slot];
                    return (robot as DefenseRobotData)?.robotWeight.toString() || "";
                })} />
                <TableRow label="Error Tags" data={ getMatchData().then((data) => {
                    const robot = data[slot];
                    return (robot as DefenseRobotData)?.errorTags.join(", ") || "";
                })} />
            </> }

            { i < 2 && <Divider /> }
        </DataTable>
    ))}
        </View>
    );
}

export default SummaryTableView;