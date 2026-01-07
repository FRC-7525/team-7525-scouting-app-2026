import { DataTable } from "react-native-paper";

interface TableHeaderProps {
    titles: string[];
}

function TableHeader({ titles }: TableHeaderProps) {
    return (
        <DataTable.Header>
            { titles.map((title) => 
                <DataTable.Title style={{justifyContent: "center", flex: 1}} key={title}>{title}</DataTable.Title>
            )}
        </DataTable.Header>
    )
}

export default TableHeader;