import React from "react";
import { StyleSheet, Text, View, Button, TextInput, Switch, AppRegistry } from "react-native";

import { NativeRouter, Route, Link } from "react-router-native";


const LoginHeader = () => (
  <View>
    <Text style={styles.header}>Welcome to Witway</Text>
    <Text style={styles.headerWords}>Ready to take control of your life & make the most of everyday oppotunity?</Text>
  </View>
);

const LoginForm = () => (
  <View>
    <Text>Create a UserName to get started.</Text>
    <Text>User Name</Text>
    <UsernameInput />
    <Text>Password</Text>
    <PasswordInput />
    <Switch />
    <Text>I verify that I am at least 18 years or older</Text>
    <Button
      //onPress={}
      title="Create"
      color="#841584"
      accessibilityLabel="Create a new user now"
    />
  </View>

);

const UsernameInput = () => (
  <TextInput
    style={styles.singleLineInput}
  />
);
const PasswordInput = () => (
  <TextInput
    style={styles.singleLineInput}
    secureTextEntry={true}
  />
);
const LoginView = () => (
  <View>
    <LoginHeader />
    <LoginForm />
  </View>
);




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
