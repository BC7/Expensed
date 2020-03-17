import AsyncStorage from '@react-native-community/async-storage';

exports.getRecords = () => {
  return new Promise((resolve, reject) => {
    try {
      AsyncStorage.getAllKeys()
        .then(keys => {
          if (keys !== null && keys.length > 0) {
            AsyncStorage.multiGet(keys, (err, stores) => {
              let weeks = {};
              stores.map((result, i, store) => {
                // get at each store's key/value so you can work with it
                const key = store[i][0];
                const data = store[i][1];
                if (!key.includes('-budget')) {
                  const weekStart = JSON.parse(data).week;
                  if (!Object.keys(weeks).includes(weekStart)) {
                    weeks[weekStart] = [JSON.parse(data)];
                  } else {
                    weeks[weekStart].push(JSON.parse(data));
                  }
                }
              });
              resolve(weeks);
            });
          }
        })
        .catch(e => {
          console.log(`ERROR:  ${e}`);
          resolve({});
        });
    } catch (e) {
      console.log(`ERROR:  ${e}`);
      resolve({});
    }
  });
};

exports.addItem = item => {
  AsyncStorage.setItem(item.timeStamp.toString(), JSON.stringify(item));
};

exports.removeItem = item => {
  return AsyncStorage.removeItem(item);
};

exports.updateBudget = (week, value, cb) => {
  return AsyncStorage.setItem(`${week}-budget`, value.toString()).then(cb());
};
