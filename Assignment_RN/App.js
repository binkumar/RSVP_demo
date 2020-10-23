import React from 'react';
import { Provider } from 'react-redux';
import { Alert } from 'react-native';

import AppStackNavigator from './app/Eduvanz/AppStackNavigator';
import store from './app/Redux/store';
import { insertData } from './app/RealmDB';

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false
    };
  }

  componentDidMount() {
    Alert.alert(
      "",
      "Select user type",
      [
        {
          text: "Guest",
          onPress: () => this.setState({ isAdmin: false }),
          style: "cancel"
        },
        { text: "Admin", onPress: () => this.setState({ isAdmin: true }) }
      ],
      { cancelable: false }
    );
    insertData()
      .then(status => {
        console.log(status);
      })
      .catch(error => {
        console.log(error);
      });
  }

  render() {
    return (
      <Provider store={store}>
        <AppStackNavigator isAdmin={this.state.isAdmin} appProperties={this.props} />
      </Provider>
    );
  }
}

export default App;
//Assignment: https://gist.github.com/vinayakg/dd66f010f24a5aaf0e83e700865307a6