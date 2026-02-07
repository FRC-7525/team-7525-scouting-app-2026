import { DataTable, Divider } from "react-native-paper";
import TableHeader from "../components/TableHeader";
import { ScrollView, View } from "react-native";
import { getMatchData } from "../api/data";
import TableRow from "../components/TableRow";

function SummaryTableView() {
    return (
        <ScrollView>
            <DataTable>
                <TableHeader titles={[ "Auto Summary" ]} />
                <TableRow label="Scouter" data={ getMatchData().then((data) => data["scouterName"]) } />
                <TableRow label="Match Number" data={ getMatchData().then((data) => data["matchNumber"].toString()) } />
                <TableRow label="Start Position" data={ getMatchData().then((data) => data["autonomous"]["startPosition"]) } />
                <TableRow label="Left Start" data={ getMatchData().then((data) => data["autonomous"]["leftStart"] ? "Yes" : "No") } />
                <TableRow label ="Ball Count" data={ getMatchData ().then((data) => data["autonomous"]["ballCount"].toString())} />
                <TableRow label ="Shuttle Time" data={ getMatchData ().then((data) => data["autonomous"] ["AutoshuttlingTime"].toString())} />
                <TableRow label="Climb Type" data={ getMatchData().then((data) => data["autonomous"]["climb"].toString()) } />
            </DataTable>
            <Divider />
            <DataTable>
                <TableHeader titles={[ "Teleop Summary" ]} />
                <TableRow label ="Ball Count" data={ getMatchData ().then((data) => data["teleop"]["ballCount"].toString())} />
                <TableRow label ="Shuttle Time" data={ getMatchData ().then((data) => data["teleop"] ["TeleopshuttlingTime"].toString())} />
                <TableRow label ="Defense Time" data={ getMatchData ().then((data) => data["teleop"] ["defenseTime"].toString())} />
                <TableRow label="Climb Type" data={ getMatchData().then((data) => data["teleop"]["climb"].toString()) } />
            </DataTable>

        </ScrollView>
    )
}

export default SummaryTableView;
