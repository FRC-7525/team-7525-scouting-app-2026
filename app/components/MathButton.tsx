import { Dispatch, SetStateAction } from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";
import { BACKGROUND_COLOR, TEXT_COLOR } from "../consts";

interface MathButtonProps {
    operation: "+" | "-";
    count: number;
    step: number,
    setCount: (newCount: number) => void;
    min?: number;
    max?: number;
};

function MathButton({ operation, count, setCount, step, min, max }: MathButtonProps) {
    const handlePress = () => {
        if (operation == "-") {
            setCount(count - step);

            if (min !== undefined && count <= min) {
                setCount(min);
            }
        } else {
            setCount(count + step);

            if (max !== undefined && count >= max) {
                setCount(max);
            }
        }
    }

    return (
        <View style={[{ flex: 4 }]}>
            <Button textColor={TEXT_COLOR} buttonColor={BACKGROUND_COLOR}
                contentStyle={{ height: 45 }}
                onPress={handlePress}>{operation}</Button>
        </View>
    )
}

export default MathButton;