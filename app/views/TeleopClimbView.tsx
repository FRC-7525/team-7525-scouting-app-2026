import { Text, View, StyleSheet } from "react-native";
import React from "react";
import RadioButton from "../components/RadioButton";
import { Divider } from "react-native-paper";
import { getMatchData, updateTeleopClimb } from "../api/data";
import { TELEOP_CLIMB_TYPE } from "../api/data_types";
import SectionTitle from "../components/SectionTitle";

function TeleopClimbView() {
    return (
        <View>
            <SectionTitle>{"Climb"}</SectionTitle>
           
            <View style={styles.container}>
                <View style={styles.centerRadioButtons}>
                    <RadioButton data={["L1", "L2", "L3", "Nothing"]}
                        onSelect={(option: string) => {
                            updateTeleopClimb(option as TELEOP_CLIMB_TYPE);
                        }}
                        oldSelected={getMatchData().then((data) => data["teleop"]["climb"])}/>
                </View>
            </View>
        </View>
    );

}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingBottom: 10
    },
    centerRadioButtons: {
        flex: 1,
        alignItems: 'center'
    }
})

export default TeleopClimbView;
