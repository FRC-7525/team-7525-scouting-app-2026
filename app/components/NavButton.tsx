import { Link } from 'expo-router';
import { View } from 'react-native';
import { Button } from 'react-native-paper';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { BACKGROUND_COLOR, TEXT_COLOR } from '../consts';

interface NavButtonProps {
    text: string;
    pageName?: string;
    disabled?: boolean;
    onClick?: () => void;
}

function NavButton({ text, pageName, disabled, onClick }: NavButtonProps) {
    pageName ??= "";
    disabled ??= false;
    onClick ??= () => {};
    const insets = useSafeAreaInsets();

    return (
        <View style={[{ flexDirection: 'row-reverse', marginTop: 10 }]}>
            <Link href={"/" + pageName} asChild>
                <Button textColor={TEXT_COLOR} buttonColor={BACKGROUND_COLOR} mode="contained"
                    contentStyle={{ height: 85, width: 85 }} onPress={onClick} disabled={disabled}>{text}</Button>
            </Link>
        </View>
    )
}

export default NavButton;
