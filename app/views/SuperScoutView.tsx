import { View, StyleSheet, Text } from "react-native";
import { useEffect, useState } from "react";
import MathBlock from "../components/MathBlock";
import SectionTitle from "../components/SectionTitle";
import Slider from "../components/Slider";
import { getMatchData, updateDefenseAbility, updateDriverCitrusScale} from "../api/data";
import { GamePhase } from "../api/data_types";


function SuperScoutView() {
    return (
        <View style={styles.container}>
            <SectionTitle>Rank Drivers (1=best)</SectionTitle>
            <Slider min={1} max={3} step={1} onValueChange={(val) => updateDriverCitrusScale(val)} oldValue={getMatchData().then((data) => data["teleop"].driverCitrusScale)}/>
            <SectionTitle>Defense Ability (1=best)</SectionTitle>
            <Slider min={1} max={3} step={1} onValueChange={(val) => updateDefenseAbility(val)} oldValue={getMatchData().then((data) => data["teleop"].defenseAbility)}/>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        gap: 8,
    },
    text: {
        color: "#000000",
        fontSize: 15,
        fontWeight: "500",
    }
});

export default SuperScoutView;