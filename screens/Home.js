import React from 'react';
import {StyleSheet, View, Text, Button} from 'react-native';

export default class HomeScreen extends React.Component {
  styles = StyleSheet.create({
    contatiner: {
      flexDirection: 'column',
      justifyContent: 'flex-start',
      paddingTop: 25,
      backgroundColor: 'skyblue',
      alignItems: 'center',
      height: '100%',
      width: '100%',
    },
    menuItem: {
      width: '50%',
      margin: 7,
      padding: 7,
      borderRadius: 400,
    },
    header1: {
      justifyContent: 'center',
      fontSize: 24,
      marginBottom: 12,
    },
    header2: {
      justifyContent: 'center',
      fontSize: 20,
      marginBottom: 75,
    },
  });

  // WIPE STORAGE
  // triggerReset() {
  //   try {
  //     AsyncStorage.getAllKeys()
  //       .then(keys => {
  //         if (keys !== null && keys.length > 0) {
  //           AsyncStorage.multiRemove(keys);
  //         }
  //       })
  //       .catch(e => {
  //         // error reading value
  //         console.log('ERROR:  ', e);
  //       });
  //   } catch (e) {
  //     console.log('ERROR:  ', e);
  //   }
  // }

  render() {
    const {navigate} = this.props.navigation;
    return (
      <React.Fragment>
        <View style={this.styles.contatiner}>
          <Text style={this.styles.header1}>Track your spending</Text>
          <Text style={this.styles.header2}>Track your life!</Text>
          <View style={this.styles.menuItem}>
            <Button
              title="Weekly Logs"
              onPress={() => navigate('Records', {})}
            />
          </View>
          <View style={this.styles.menuItem}>
            <Button title="New Entry" onPress={() => navigate('New', {})} />
          </View>
          <View style={this.styles.menuItem}>
            <Button title="Settings" onPress={() => navigate('Settings', {})} />
          </View>
        </View>
      </React.Fragment>
    );
  }
}
