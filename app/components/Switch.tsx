import { Text, View } from "react-native";
import { Switch as PaperSwitch } from "react-native-paper";
import { BACKGROUND_COLOR } from "../consts";
import { useEffect, useState } from "react";

interface SwitchProps {
    label: string;
    onToggle?: (state: boolean) => void;
    oldValue?: Promise<boolean>;
}

function Switch({ label, onToggle, oldValue }: SwitchProps) {
    const [ switchState, setSwitchState ] = useState(false);
    onToggle ??= () => {};

    useEffect(() => {
        const getOldState = async () => {
            setSwitchState(await oldValue ?? false);
        }

        getOldState();
    }, []);
    
    const onSwitchChange = () => {
        onToggle(!switchState);
        setSwitchState(!switchState);
    }

    return (
        <View>
            <Text>{label}</Text>
            <PaperSwitch color={BACKGROUND_COLOR}
                value={switchState} onValueChange={onSwitchChange} />
        </View>
    )
}

export default Switch;