import { View, Text, Keyboard } from 'react-native'
import { useEffect, useState } from 'react';
import { RadioButton as PaperRadioButton } from 'react-native-paper';
import { BACKGROUND_COLOR } from '../consts';

interface RadioButton {
    data: string[];
    onSelect?: (option: string) => void;
    oldSelected?: Promise<string>;
    defaultValue?: string;
}

function RadioButton({ data, onSelect, oldSelected, defaultValue }: RadioButton) {
    onSelect ??= () => {};

    const [ selectedOption, setSelectedOption ] = useState("");

    useEffect(() => {
        const getPreviousSelected = async () => {
            setSelectedOption(await oldSelected ?? defaultValue ?? "");
        }

        getPreviousSelected();
    }, []);

    const onOptionSelect = (option: string) => {
        setSelectedOption(option);
        onSelect(option);
    }

    return (
        <PaperRadioButton.Group onValueChange={(option) => onOptionSelect(option)} value={selectedOption}>
            { data.map((element) => 
                <View key={element} style={{ flexDirection: "row", alignItems: "center" }}>
                    <PaperRadioButton.Android color={BACKGROUND_COLOR} value={element} />
                    <Text>{element}</Text>
                </View>
            ) }
        </PaperRadioButton.Group>
    );
} 

export default RadioButton;
