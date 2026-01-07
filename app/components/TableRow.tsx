// this is a really specific table row just for the summary page! hence the weirdish looking code

import { useEffect, useState } from "react";
import { DataTable } from "react-native-paper";

interface TableRowProps {
    label: string;
    data: Promise<string>;
}

function TableRow({ label, data }: TableRowProps) {
    const [ firstEntry, setFirstEntry ] = useState("");

    useEffect(() => {
        const getEntries = async () => {
            setFirstEntry(await data ?? "");
        }

        getEntries();
    }, []);

    return (
        <DataTable.Row>
            <DataTable.Cell>
                {label}
            </DataTable.Cell>

            <DataTable.Cell>
                {firstEntry}
            </DataTable.Cell>
        </DataTable.Row>
    )
}

export default TableRow;