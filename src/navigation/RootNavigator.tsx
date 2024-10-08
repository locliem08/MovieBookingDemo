import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import BookingScreen from '../screens/BookingScreen/BookingScreen';

export type RootStackParamList = {
    Tabs: undefined;
    Booking: { movieId: number };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Tabs"
                component={TabNavigator}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Booking"
                component={BookingScreen}
                options={{ title: 'Đặt vé' }}
            />
        </Stack.Navigator>
    );
};

export default RootNavigator;
