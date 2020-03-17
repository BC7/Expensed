import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Button,
  TextInput,
} from 'react-native';
import {getRecords, updateBudget, removeItem} from '../utils';
import AsyncStorage from '@react-native-community/async-storage';
import {styles} from '../theme';
export default class DetailsScreen extends React.Component {
  static navigationOptions = ({route, navigation}) => {
    return {
      title: `Week of ${navigation.state.params.week || '-'}`,
      //   headerTitle: 'Weekly Records',
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

  constructor(props) {
    super(props);

    const {week} = this.props.route.params;
    const {entries} = JSON.parse(this.props.route.params.entries);

    this.state = {
      entries: [],
      budget: 0,
      net: 0,
      week: week,
    };

    // this.getBudget();
    getRecords().then(res => {
      this.setState({entries: res[week]}, this.getBudget());
    });
  }
  componentDidMount = () => {
    const {week} = this.state;
    getRecords().then(res => {
      this.setState({entries: res[week]}, this.getBudget());
    });
  };

  getBudget = () => {
    const {week} = this.props.route.params;
    try {
      AsyncStorage.getItem(`${week}-budget`)
        .then(val => {
          if (val == 0 || val == null) {
            this.setState({budget: 0, net: 0});
          } else {
            this.setState({
              budget: this.formatNumber(val),
              net: this.calculateNet(val),
            });
          }
        })
        .catch(e => {
          console.log(`ERROR: ${e}`);
        });
    } catch (e) {
      console.log(`ERROR: ${e}`);
    }
  };

  updateBudget = val => {
    const {week} = this.state;

    const newBudget = this.formatNumber(val);
    try {
      updateBudget(week, newBudget, () => {
        this.setState({
          budget: newBudget,
          net: this.calculateNet(newBudget),
        });
      });
    } catch (e) {
      console.log(`ERROR: ${e}`);
    }
  };

  formatNumber = num => {
    // var arr = 5736865  //return 57,368.65
    let arr = num
      .toString()
      .replace('$', '')
      .split(',')
      .join('')
      .split('.')
      .join('')
      .split('');
    //   .reverse();
    let formatted = [];
    let cIndex = 3;
    // basic format checks
    if (num == 0) {
      return 0;
    }

    if (arr.length < 2) {
      return `.0${arr[0]}`;
    }

    if (arr.length == 2) {
      return `.${arr.join('')}`;
    }

    if (arr[0] == '0') {
      arr.shift(); //remove leading zero
    }

    const decimal = `.${arr.slice(arr.length - 2).join('')}`;
    arr.pop();
    arr.pop();
    formatted.unshift(decimal);
    arr = arr.reverse();
    for (var i = 0; i < arr.length; i++) {
      if (i == cIndex) {
        formatted.unshift(',');
        cIndex += 3;
      }
      formatted.unshift(arr[i]);
    }
    formatted = formatted.join('');
    return formatted;
  };

  calculateNet = budget => {
    const {entries} = this.state;

    let net = +parseFloat(budget.split(',').join('')).toFixed(2);

    entries.forEach(x => {
      if (x.type == 'expense') {
        net -= +parseFloat(x.amount).toFixed(2);
      } else {
        net += +parseFloat(x.amount).toFixed(2);
      }
    });

    return this.formatNumber(parseFloat(net).toFixed(2));
  };

  deleteEntry = key => {
    const {navigate} = this.props.navigation;
    const {entries, week} = this.state;
    const element = entries[key];
    try {
      removeItem(element.timeStamp)
        .then(() => {
          let updatedEntries = entries.filter(x => x !== element);
          if (updatedEntries.length > 0) {
            this.setState({entries: updatedEntries});
          } else {
            removeItem(`${week}-budget`).then(() => navigate('Home', {}));
          }
        })
        .catch(e => {
          console.log('ERROR:  ', e);
        });
    } catch (e) {
      console.log(`ERROR: ${e}`);
    }
  };

  render = () => {
    const {entries, budget, net} = this.state;
    return (
      <View style={styles.container}>
        <View
          style={
            (styles.header1, {flexDirection: 'row', alignItems: 'center'})
          }>
          <Text style={{fontSize: 20}}>Budget: </Text>
          <TextInput
            style={styles.budgetInput}
            onChangeText={budget => this.updateBudget(budget)}
            value={`$${budget === 0 ? '00.00' : budget}`}
            placeholder={`$${budget === 0 || budget === '' ? '0.00' : budget}`}
            keyboardType="numeric"
          />
        </View>

        {entries.length > 0 ? (
          entries.map((element, key) => {
            type = element.type;
            return (
              <View key={key} style={styles.logItem}>
                <View style={styles.logDetails}>
                  <Text style={{fontSize: 18}}>{element.memo}</Text>
                  <Text style={{fontSize: 14}}>{element.timeStamp}</Text>
                </View>
                <Text
                  style={[
                    styles.logAmount,
                    {color: type === 'expense' ? 'red' : 'green'},
                  ]}>
                  {type === 'expense'
                    ? `- $${element.amount}`
                    : `+ $${element.amount}`}
                </Text>
                <Button
                  style={styles.deleteButton}
                  title="X"
                  key={key}
                  onPress={() => {
                    this.deleteEntry(key);
                  }}
                />
              </View>
            );
          })
        ) : (
          <Text>Transaction History Not Found</Text>
        )}

        {entries.length > 0 ? (
          <Text style={styles.footer}>Remaining: {net}</Text>
        ) : (
          <Text style={styles.footer}>Remaining: $00.00{net}</Text>
        )}
      </View>
    );
  };
}
