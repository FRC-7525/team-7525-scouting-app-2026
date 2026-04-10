import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <Stack screenOptions={{ gestureEnabled: false }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="one_defense" options={{ headerShown: false }} />
            <Stack.Screen name="two_defense" options={{ headerShown: false }} />
            <Stack.Screen name="three_defense" options={{ headerShown: false }} />
            <Stack.Screen name="summary_defense" options={{ headerShown: false }} />
            <Stack.Screen name="one_offense" options={{ headerShown: false }} />
            <Stack.Screen name="two_offense" options={{ headerShown: false }} />
            <Stack.Screen name="three_offense" options={{ headerShown: false }} />
            {/* <Stack.Screen name="teleop" options={{ headerShown: false }} />
            <Stack.Screen name="auto" options={{ headerShown: false }} /> */}
            <Stack.Screen name="summary_offense" options={{ headerShown: false }} />
            <Stack.Screen name="submit" options={{ headerShown: false }} />
        </Stack>
    );
}
