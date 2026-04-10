import { View, StyleSheet } from 'react-native';
import RadioButton from '../components/RadioButton';
import { getMatchData, updateStartPosition } from '../api/data';
import { OffenseRobotData, RobotSlot, START_POSITION } from '../api/data_types';
import SectionTitle from '../components/SectionTitle';

interface AutoStartPositionViewProps {
    slot: RobotSlot;
}

function AutoStartPositionView({ slot }: AutoStartPositionViewProps) {
    return (
        <View style={styles.container}>
            <SectionTitle>Starting Position:</SectionTitle>
            <RadioButton
                data={["Scoring Table Side", "Center", "Audience Side"]}
                onSelect={(option: string) => updateStartPosition(slot, option as START_POSITION)}
                oldSelected={getMatchData().then((data) => (data[slot] as OffenseRobotData).startPosition)} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 10,
        alignItems: "center"
    },
});

export default AutoStartPositionView;