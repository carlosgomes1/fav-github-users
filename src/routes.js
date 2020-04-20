import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';

const AppStack = createStackNavigator();

export default function Routes() {
    return (
        <NavigationContainer>
            <AppStack.Navigator
                initialRouteName="Main"
                screenOptions={{
                    headerStatusBarHeight: 20,
                    headerBackTitleVisible: false,
                    headerStyle: { backgroundColor: '#7159c1' },
                    headerTintColor: '#FFF',
                }}
            >
                <AppStack.Screen
                    name="Main"
                    component={Main}
                    options={{ title: 'Usuários' }}
                />
                <AppStack.Screen name="User" component={User} />
            </AppStack.Navigator>
        </NavigationContainer>
    );
}
