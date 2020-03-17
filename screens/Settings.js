import React from 'react';
import { StyleSheet, View, Text, StatusBar, Button } from 'react-native';

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings'
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <Text>Settings</Text>
      </View>
    );
  }
}
