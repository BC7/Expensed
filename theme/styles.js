import {StyleSheet} from 'react-native';

styles = StyleSheet.create({
  container: {
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
  logWeek: {
    width: '50%',
    margin: 7,
    padding: 7,
  },
  label: {
    marginLeft: 10,
    fontSize: 18,
  },
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  radioGroup: {
    width: '50%',
    flexDirection: 'row',
    margin: 7,
  },
  memo: {
    fontSize: 16,
    margin: 10,
    height: '40%',
    width: '90%',
    borderColor: 'gray',
    borderWidth: 1,
    padding: 7,
  },

  valueInput: {
    fontSize: 16,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    width: '40%',
    marginLeft: 5,
    paddingLeft: 7,
  },
  footer: {
    fontSize: 20,
  },
  budgetInput: {
    marginLeft: 10,
    fontSize: 24,
  },
  logItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    minWidth: 300,
    padding: 7,
  },
  logDetails: {
    minWidth: 200,
  },
  logAmount: {
    minWidth: 100,
    margin: 20,
    fontWeight: 'bold',
    fontSize: 24,
  },
  deleteButton: {
    marginLeft: 7,
    fontSize: 24,
    width: 50,
    height: 50,
    fontWeight: 'bold',
    borderRadius: 25,
    borderWidth: 0,
    borderColor: '#000',
    borderStyle: 'solid',
  },
});

export default styles;
