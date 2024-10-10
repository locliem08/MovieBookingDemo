import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TabNavigator from './TabNavigator';
import BookingScreen from '@screens/BookingScreen/BookingScreen';
import { TouchableOpacity, Text } from 'react-native';

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
                options={({ navigation }) => ({
                    title: 'Đặt vé',
                    headerLeft: () => (
                        <TouchableOpacity
                            onPress={() => navigation.goBack()}
                            testID="BookingScreenBackButton"
                        >
                            <Text>Back</Text>
                        </TouchableOpacity>
                    ),
                })}
            />
        </Stack.Navigator>
    );
};

export default RootNavigator;
