import { StatusBar } from 'expo-status-bar';
import { Keyboard, ScrollView, StyleSheet, View } from 'react-native';
import { Divider } from 'react-native-paper';
import PageHeader from './components/Header';
import NavButton from './components/NavButton';
import SummaryTableView from './views/SummaryTableView';

export default function App() {
    return (
        <View style={styles.container}>
            <PageHeader title="Summary" pageNumber="4/4" previous="three_defense" />
            <ScrollView>
                <SummaryTableView mode="defense" />
                <Divider />
                <NavButton text="Submit" pageName="submit" />
                <StatusBar style="auto" />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        padding: 15,
        flex: 1,
        backgroundColor: '#fff',
        rowGap: 15,
    },
});