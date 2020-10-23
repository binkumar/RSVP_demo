import React, { useState, useEffect } from 'react';
import {
    createDrawerNavigator,
} from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';

import RegistrationScreen from './RegistrationScreen';
import ListScreen from './ListScreen';
import ReportScreen from './ReportScreen';

const Drawer = createDrawerNavigator();

function AppStackNavigator({ isAdmin }) {
    return (
        <NavigationContainer>
            <Drawer.Navigator
                drawerContentOptions={{
                    activeTintColor: '#e91e63',
                    itemStyle: { marginVertical: 5 },
                }}>
                <Drawer.Screen
                    name="RegistrationScreen"
                    options={{ drawerLabel: 'RegistrationScreen' }}
                    component={RegistrationScreen} />
                {isAdmin && <Drawer.Screen
                    name="ListScreen"
                    options={{ drawerLabel: 'ListScreen' }}
                    component={ListScreen} />}
                {isAdmin && <Drawer.Screen
                    name="ReportScreen"
                    options={{ drawerLabel: 'ReportScreen' }}
                    component={ReportScreen} />}
            </Drawer.Navigator>
        </NavigationContainer>
    );
}

export default AppStackNavigator;
