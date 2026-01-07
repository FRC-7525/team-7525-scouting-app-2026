import SelectDropdown from 'react-native-select-dropdown'
import { Text, View, StyleSheet } from "react-native";
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface DropdownProps {
    label?: string;
    items: string[];
    placeholder?: string;
    onChange?: (selected: string) => void;
}

function Dropdown({ label, items, placeholder, onChange }: DropdownProps) {
    onChange ??= () => {};
    var hideLabel = false

    if (label == undefined) {
        hideLabel = true
    }

    return (
        <View>
            
            { !hideLabel && <Text>{label}</Text> }

            <SelectDropdown
                data={items}
                onSelect={(selected: string) => {
                    onChange(selected);
                }}

                renderButton={(selectedItem, _isOpened) => {
                    return (
                        <View style={styles.dropdownButtonStyle}>
                                { !selectedItem &&
                                    <Text style={styles.dropdownButtonTxtPlaceholderStyle}>
                                        {placeholder}
                                    </Text>
                                }
                                { selectedItem &&
                                    <Text style={styles.dropdownButtonTxtStyle}>
                                        {selectedItem}
                                    </Text>
                                }
                            <Icon name="chevron-down" style={styles.dropdownButtonArrowStyle} />
                        </View>
                    );
                }}
                renderItem={(item, _index, isSelected) => {
                    return (
                        <View style={{ ...styles.dropdownItemStyle, ...(isSelected && { backgroundColor: '#D2D9DF' }) }}>
                            <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                        </View>
                    );
                }}
                showsVerticalScrollIndicator={false}
                dropdownStyle={styles.dropdownMenuStyle}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    dropdownButtonStyle: {
        width: 200,
        height: 30,
        backgroundColor: '#FFF',
        borderColor: '#CCC',
        borderRadius: 2,
        borderStyle: "solid",
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 12
    },
    dropdownButtonTxtStyle: {
        flex: 1,
        verticalAlign: "middle",
        fontSize: 16,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownButtonTxtPlaceholderStyle: {
        flex: 200,
        verticalAlign: "middle",
        fontSize: 16,
        fontWeight: '500',
        color: '#BBB',
    },
    dropdownButtonArrowStyle: {
        fontSize: 28,
    },
    dropdownButtonIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
    dropdownMenuStyle: {
        backgroundColor: '#E9ECEF',
        borderRadius: 8,
    },
    dropdownItemStyle: {
        width: '100%',
        flexDirection: 'row',
        paddingHorizontal: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 8,
    },
    dropdownItemTxtStyle: {
        flex: 1,
        fontSize: 18,
        fontWeight: '500',
        color: '#151E26',
    },
    dropdownItemIconStyle: {
        fontSize: 28,
        marginRight: 8,
    },
});

export default Dropdown;
