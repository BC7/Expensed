import 'react-native-gesture-handler';
import * as React from 'react';
import {View, Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from './screens/Home';
import NewEntryScreen from './screens/New';
import SettingsScreen from './screens/Settings';
import RecordsScreen from './screens/Records';
import DetailsScreen from './screens/Details';
import colors from './theme';
import styles from './theme';

const Stack = createStackNavigator();

function App() {
  const stackOptions = {
    headerStyle: {
      backgroundColor: colors.navBackGround,
    },
    headerTintColor: colors.tint,
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Expensed',
            ...stackOptions,
          }}
        />
        <Stack.Screen
          name="Records"
          component={RecordsScreen}
          options={{
            title: 'Records',
            ...stackOptions,
            // headerTitleStyle: {
            //   fontSize: 18,
            //   fontWeight: 'bold',
            // },
          }}
        />
        <Stack.Screen
          name="Details"
          options={{
            title: 'Details',
            ...stackOptions,
            // headerTitleStyle: {
            //   fontSize: 18,
            //   fontWeight: 'bold',
            // },
          }}
          component={DetailsScreen}
        />
        <Stack.Screen
          name="New"
          options={{
            title: 'New Entry',
            ...stackOptions,
          }}
          component={NewEntryScreen}
        />
        <Stack.Screen
          name="Settings"
          options={{
            title: 'Expensed',
            ...stackOptions,
          }}
          component={SettingsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
