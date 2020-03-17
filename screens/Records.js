import React from 'react';
import {View, Text, Button} from 'react-native';
import {getRecords} from '../utils';
import {styles} from '../theme';

export default class RecordsScreen extends React.Component {
  static navigationOptions = ({navigation}) => {
    return {
      headerTitle: 'Weekly Records',
      headerRight: (
        <Button
          onPress={() => navigation.navigate('New', {})}
          title="New"
          // color="#eee"
        />
      ),
      headerRightContainerStyle: {
        marginRight: 7,
      },
    };
  };

  state = {weekEntries: []};

  componentDidMount = () => {
    getRecords().then(res => {
      this.setState({weekEntries: res});
    });
  };

  render = () => {
    const {navigate} = this.props.navigation;
    const {weekEntries} = this.state;
    const weeks = Object.keys(weekEntries);
    return (
      <View style={styles.container}>
        <Text style={styles.header1}>Weekly Records</Text>
        {weeks.length > 0 ? (
          weeks.map((element, key) => {
            return (
              <View style={styles.logWeek} key={key}>
                <Button
                  title={'Week of ' + element}
                  key={key}
                  onPress={() =>
                    navigate('Details', {
                      week: element,
                      entries: JSON.stringify(weekEntries[element]),
                    })
                  }
                />
              </View>
            );
          })
        ) : (
          <Text>No Transactions Found</Text>
        )}
      </View>
    );
  };
}
