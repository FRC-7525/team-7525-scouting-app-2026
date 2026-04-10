import { View } from "react-native";
import { Appbar, Chip, Divider } from "react-native-paper";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { getMatchData } from "../api/data";
import { RobotSlot } from "../api/data_types";
import { BACKGROUND_COLOR, TEXT_COLOR } from "../consts";

interface PageHeaderProps {
    title: string;
    pageNumber?: string;
    previous?: string;
    slot?: RobotSlot;
}

function PageHeader({ title, pageNumber, previous, slot }: PageHeaderProps) {
    const [robotNumber, setRobotNumber] = useState<string>("");
    const [chipColor, setChipColor]     = useState(BACKGROUND_COLOR);

    useEffect(() => {
        getMatchData().then((data) => {
            if (data.alliance === "Red") {
                setChipColor("#f54242");
            } else {
                setChipColor("#2149a6");
            }

            if (slot && data[slot].robotNumber !== 0) {
                setRobotNumber(data[slot].robotNumber.toString());
            }
        });
    }, [slot]);

    return (
        <View>
            <Appbar.Header>
                { previous !== undefined &&
                    <Link href={previous} asChild>
                        <Appbar.BackAction />
                    </Link> }
                <Appbar.Content title={`${title} (${pageNumber})`} />
                { slot !== undefined &&
                    <Appbar.Content style={{ alignItems: "center" }} title={
                        <Chip style={{ backgroundColor: chipColor }} textStyle={{ color: TEXT_COLOR }}>
                            {robotNumber || "—"}
                        </Chip>
                    } />
                }
            </Appbar.Header>
            <Divider />
        </View>
    );
}

export default PageHeader;