import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@screens/HomeScreen/HomeScreen';
import FavoritesScreen from '@screens/FavoritesScreen/FavoritesScreen';
import BookedScreen from '@screens/BookedScreen/BookedScreen';

type TabParamList = {
  Movies: undefined;
  Favorites: undefined;
  Booked: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Movies"
        component={HomeScreen}
        options={{ tabBarTestID: 'MoviesTab', title: 'Phim' }}
      />
      <Tab.Screen
        name="Favorites"
        component={FavoritesScreen}
        options={{ tabBarTestID: 'FavoritesTab', title: 'Yêu thích' }}
      />
      <Tab.Screen
        name="Booked"
        component={BookedScreen}
        options={{ tabBarTestID: 'BookedTab', title: 'Đã đặt' }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
