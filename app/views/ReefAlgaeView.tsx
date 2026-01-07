import { getMatchData, updateReefScores } from '../api/data';
import MathBlock from '../components/MathBlock';
import { View, StyleSheet } from 'react-native';
import SectionTitle from '../components/SectionTitle';
import { GamePhase, ReefLevel } from '../api/data_types';
import React from 'react';

interface ReefAlgaeViewProps {
    phase: GamePhase;
};

function ReefAlgaeView({ phase }: ReefAlgaeViewProps) {
    const getLevelData = async (level: ReefLevel) => {
        return getMatchData().then((data) => data[phase]["reef"][level]);
    };


    return (
        <View style={styles.container}>
            <SectionTitle>Reef</SectionTitle>
            <MathBlock label="L4" min={0} max={10} onPress={(count: number) => {
                updateReefScores(phase, "L4", count);
            }} oldCount={getLevelData("L4")} />

            <MathBlock label="L3" min={0} max={10} onPress={(count: number) => {
                updateReefScores(phase, "L3", count);
            }} oldCount={getLevelData("L3")} />

            <MathBlock label="L2" min={0} max={10} onPress={(count: number) => {
                updateReefScores(phase, "L2", count);
            }} oldCount={getLevelData("L2")} />
            
            <MathBlock label="L1" min={0} max={10} onPress={(count: number) => {
                updateReefScores(phase, "L1", count);
            }} oldCount={getLevelData("L1")} />

        </View>
        
    )

} 

const styles = StyleSheet.create({
    container: {
        paddingBottom: 10
    }
});


export default ReefAlgaeView;
