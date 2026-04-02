import { View, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import MathBlock from "../components/MathBlock";
import SectionTitle from "../components/SectionTitle";
import Slider from "../components/Slider";
import { getMatchData, updateDefenseAbility, updateDriverCitrusScale} from "../api/data";
import { GamePhase } from "../api/data_types";


function SuperScoutView() {
    return (
        <View style={styles.container}>
            <SectionTitle>Rank Drivers (1= best)</SectionTitle>
            <Slider min={1} max={3} step={1} onValueChange={() => {}} oldValue={} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingVertical: 10,
        paddingHorizontal: 16,
        gap: 8,
    },
});

export default SuperScoutView;