import { Stack } from 'expo-router';

export default function RootLayout() {
    return (
        <Stack screenOptions={{ gestureEnabled: false }}>
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="teleop" options={{ headerShown: false }} />
            <Stack.Screen name="auto" options={{ headerShown: false }} />
            <Stack.Screen name="summary" options={{ headerShown: false }} />
            <Stack.Screen name="submit" options={{ headerShown: false }} />
        </Stack>
    );
}
