import { Text, View, StyleSheet } from 'react-native';
import { useState } from 'react';
import RadioButton from '../components/RadioButton';
import { getMatchData, updateLeftStart, updateStartPosition } from '../api/data';
import { START_POSITION } from '../api/data_types';
import Switch from '../components/Switch';


function AutoStartPositionView () {
    return (
        <View style={styles.container}>
            <View style={styles.side}>
                <Switch label="Left Start"
                    onToggle={(state: boolean) => {
                        updateLeftStart(state);
                    }} oldValue={ getMatchData().then((data) => data["autonomous"]["leftStart"]) } />
            </View>

            <View style={[{ width: 0.5, backgroundColor: "black" }]}/>
            
            <View style={styles.side}>
                <Text> {'Starting Position:'}</Text>
                <RadioButton data={["Scoring Table Side", "Center", "Audience Side"]}  
                    onSelect={(option: string) => {
                        updateStartPosition(option as START_POSITION);
                    }}
                    oldSelected={getMatchData().then((data) => data["autonomous"]["startPosition"])} />
            </View>
        </View>   
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        paddingBottom: 10
    },
    side: {
        flex: 1,
        alignItems: 'center'
    }
});

export default AutoStartPositionView;
