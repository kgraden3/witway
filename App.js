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
          <Text style={styles.header}>WitWay</Text>
          <Text style={styles.headerWords}>Take control of your life - make the most of everyday opportunities</Text>
        </View>


        <Input
          placeholder=' User Name'
          leftIcon={{ type: 'font-awesome',  color: '#0F444F', name: 'user' }}
          errorStyle={{ color: 'red' }}
        />
        <Input
          placeholder=' Password'
          secureTextEntry={true}
          leftIcon={{ type: 'font-awesome', color: '#0F444F', name: 'lock' }}
          errorStyle={{ color: 'red' }}
        />
        <Input
          placeholder=' Email'
          leftIcon={{ type: 'font-awesome',  color: '#0F444F', name: 'envelope' }}
          errorStyle={{ color: 'red' }}
        />

        <CheckBox
          center
          title='I am at least 18 years or older'
          checked={this.state.checked}
          checkedColor='#255E69'
          onPress={() => this.setState({ checked: !this.state.checked })}
        />
        <Button
          title="Connect"
          color="#255E69"
          accessibilityLabel="Create a new user"
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
    fontSize: 60,
     textAlign: 'center',
     color: '#A7383D',
     fontWeight: 'bold',
     fontFamily: 'Honor-Medium'
  },
  headerWords: {
    fontSize: 25,
    textAlign: 'center',
    padding: 20,
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
