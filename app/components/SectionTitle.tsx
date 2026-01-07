import { ReactNode } from "react";
import { StyleSheet, Text } from "react-native";

interface SectionTitleProps {
    children: ReactNode;
};

function SectionTitle({ children }: SectionTitleProps) {
    return <Text style={styles.title}>{children}</Text>
}

const styles = StyleSheet.create({
    title: {
        marginVertical: 8,
        fontSize: 17,
        textAlign: "center"
    }
});

export default SectionTitle;