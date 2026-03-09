import { Text, View, StyleSheet } from 'react-native';
import { useState } from 'react';
import RadioButton from '../components/RadioButton';
import { getMatchData, updateLeftStart, updateStartPosition } from '../api/data';
import { START_POSITION } from '../api/data_types';
import SectionTitle from '../components/SectionTitle'
import Switch from '../components/Switch';


function AutoStartPositionView () {
    return (
        <View style={styles.container}>
                <SectionTitle> {'Starting Position:'}</SectionTitle>
                <RadioButton data={["Scoring Table Side", "Center", "Audience Side"]}  
                    onSelect={(option: string) => {
                        updateStartPosition(option as START_POSITION);
                    }}
                    oldSelected={getMatchData().then((data) => data["autonomous"]["startPosition"])} />

        </View>   
    )
}

const styles = StyleSheet.create({
    container: {
        // flexDirection: "row",
        paddingBottom: 10,
        alignItems: "center"
    },
    side: {
        flex: 1,
        alignItems: 'center'
    }
});

export default AutoStartPositionView;
