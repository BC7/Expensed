import React from 'react';
import {StyleSheet, View, Text, TextInput, Button} from 'react-native';
import RadioButton from '../components/RadioButton';
import {addItem} from '../utils';
import {styles} from '../theme';
export default class NewEntryScreen extends React.Component {
  static navigationOptions = {
    title: 'New Transaction',
  };

  state = {
    memo: '',
    amount: 0,
    type: 'expense',
  };

  componentWillUnmount = () => {};

  getWeek = d => {
    d = new Date(d);
    var day = d.getDay(),
      diff = d.getDate() - day + (day == 0 ? -7 : 0); // adjust when day is sunday
    return new Date(d.setDate(diff));
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

  saveEntry = navigate => {
    const {memo, amount, type} = this.state;

    let transaction = {};
    const timeStamp = new Date();
    const week = this.getWeek(timeStamp);

    if (amount > 0) {
      transaction = {
        week: `${week.getMonth()}/${week.getDate()}/${week.getFullYear()}`,
        timeStamp: `${timeStamp.getMonth()}/${timeStamp.getDate()}/${timeStamp.getFullYear()} ${timeStamp.getHours()}:${
          timeStamp.getMinutes() < 10
            ? `0${timeStamp.getMinutes()}`
            : timeStamp.getMinutes()
        }`,
        memo: memo,
        type: type,
        amount: amount,
      };

      try {
        addItem(transaction);
        navigate('Records', {});
      } catch (e) {
        // save error
        console.log('ERROR:  ', e);
      }
    }
  };

  render() {
    const {navigate} = this.props.navigation;
    return (
      <View style={styles.container}>
        <View style={styles.row}>
          <View style={{width: '45%', paddingLeft: 7}}>
            <View
              style={styles.radioGroup}
              onStartShouldSetResponder={e => {
                this.setState({type: 'expense'});
              }}>
              <RadioButton
                selected={this.state.type == 'expense' ? true : false}
              />
              <Text style={styles.label}>Spent</Text>
            </View>
            <View
              style={styles.radioGroup}
              onStartShouldSetResponder={e => {
                this.setState({type: ''});
              }}>
              <RadioButton
                selected={this.state.type !== 'expense' ? true : false}
              />
              <Text style={styles.label}>Received</Text>
            </View>
          </View>
          <View
            style={{
              width: '50%',
              flexDirection: 'row',
              alignItems: 'center',
              marginLeft: 'auto',
            }}>
            <Text style={styles.label}>Amount: $</Text>
            <TextInput
              style={styles.valueInput}
              onChangeText={amount =>
                this.setState({amount: this.formatNumber(amount)})
              }
              value={`${this.state.amount === 0 ? '' : `${this.state.amount}`}`}
              placeholder="0.00"
              keyboardType="numeric"
            />
          </View>
        </View>

        <Text style={styles.header1}> Memo: </Text>

        <TextInput
          style={styles.memo}
          onChangeText={memo => this.setState({memo})}
          value={this.state.memo}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            width: '90%',
          }}>
          <View style={styles.logWeek}>
            <Button
              title="discard"
              onPress={() => {
                navigate('Home', {});
              }}
            />
          </View>
          <View style={styles.logWeek}>
            <Button
              title="save"
              onPress={() => {
                this.saveEntry(navigate);
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}
