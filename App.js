import React, {Component} from "react";
import { StyleSheet, Text, View, Button, ActivityIndicator, AppRegistry } from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";
import { CheckBox, Input, Image, ListItem, Header, ScrollView } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


class LoginView extends React.Component {
  state = {
    checked: false,
  };
  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.header}>Welcome to Witway</Text>
          <Text style={styles.headerWords}>Ready to take control of your life & make the most of everyday oppotunity?</Text>
        </View>


        <Text>Create a UserName to get started.</Text>
        <Input
          placeholder='User Name'
          leftIcon={{ type: 'font-awesome', name: 'user' }}
          errorStyle={{ color: 'red' }}
        />
        <Input
          placeholder='Password'
          secureTextEntry={true}
          leftIcon={{ type: 'font-awesome', name: 'lock' }}
          errorStyle={{ color: 'red' }}
        />

        <CheckBox
          center
          title='I verify that I am at least 18 years or older'
          checked={this.state.checked}
          onPress={() => this.setState({ checked: !this.state.checked })}
        />
        <Button
          title="Create"
          color="#841584"
          accessibilityLabel="Create a new user now"
        />
      </View>
    );
  }
}





const App = () => (
  <LoginView />
);



const styles = StyleSheet.create({

  container: {
    marginTop: 25,
    padding: 10
  },
  header: {
    fontSize: 20
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around"
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    padding: 10
  },
  subNavItem: {
    padding: 5
  },
  topic: {
    textAlign: "center",
    fontSize: 15
  }
});

export default App;
