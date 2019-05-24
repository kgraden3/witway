import React, { Component } from "react";
import { Alert, StyleSheet, Text, View, ActivityIndicator, ScrollView, AppRegistry, Dimensions, Animated } from "react-native";
import { NativeRouter, Route, Link, Redirect, withRouter } from "react-router-native";
import { CheckBox, Input, Image, ListItem, Header, Button, ButtonGroup, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { createStackNavigator, createAppContainer } from "react-navigation";

import NotifService from './notifService';



const { width } = Dimensions.get('window');
const { height} = Dimensions.get('window');





class Notify extends Component {
  constructor(props) {
    super(props);
    this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
  }

  onRegister(token) {
    Alert.alert("Registered !", JSON.stringify(token));
    console.log(token);
    this.setState({ registerToken: token.token, gcmRegistered: true });
  }

  onNotif(notif) {
    console.log(notif);
    Alert.alert(notif.title, notif.message);
  }
  handlePerm(perms) {
    Alert.alert("Permissions", JSON.stringify(perms));
  }
  render() {
    return (
      <Button
        title="Notify"
        onPress={() => { this.notif.localNotif() }}
      />
    );
  }
}

const SignOut = withRouter(
  ({ history }) =>
    (
      <View>
        <TouchableHighlight
          onPress={() => {
            fakeAuth.signout(() => history.push("/"));
          }}
        >
          <Text>Sign out</Text>
        </TouchableHighlight>
      </View>
    )
);

class LoginForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      age_checked: false,
      username: '',
      password: '',
      userLoggedIn: false,
      error: {
        username: '',
        password: '',
        age: '',
      }
    };
    this.login = this.login.bind(this);
    this.handleAge = this.handleAge.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }
  componentDidUpdate() {

  }
  login() {
    if (this.state.age_checked && this.state.username && this.state.password) {
      this.setState({ userLoggedIn: true });
    }
  };
  handleAge() {
    if (!this.state.age_checked) {
      this.setState({ error: { ...this.state.error, age: 'Please verify your age' } });
      return false;
    } else {
      this.setState({ error: { ...this.state.error, age: '' } });
      return true;
    }
  }
  handleUsername() {
    if (!this.state.username) {
      this.setState({ error: {...this.state.error, username: 'Please enter your username'}});
    } else {
      this.setState({ error: {...this.state.error, username: ''}});
    }
  }

  handlePassword() {
    if (!this.state.password) {
      this.setState({ error: {...this.state.error, password: 'Please enter your password'}});
    } else {
      this.setState({ error: {...this.state.error, password: ''}});
    }
  }

  render() {
    if (this.state.userLoggedIn) {
      return (
        <UserDetailView
          navigation={this.props.navigation}
          username={this.state.username}
        />
      );
    }
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
          errorMessage={this.state.error.username}
          onChangeText={(username) => this.setState({username})}
          onBlur={this.handleUsername}
        />
        <Input
          placeholder=' Password'
          secureTextEntry={true}
          leftIcon={{ type: 'font-awesome', color: '#0F444F', name: 'lock' }}
          errorStyle={{ color: 'red' }}
          errorMessage={this.state.error.password}
          onChangeText={(password) => this.setState({password})}
          onBlur={this.handlePassword}
        />

        <CheckBox
          center
          title='I am at least 18 years or older'
          checked={this.state.age_checked}
          checkedColor='#255E69'
          onPress={() => {this.setState({ age_checked: !this.state.age_checked }, this.handleAge)}}
        />
        <Text style={ {color: 'red' } }>{this.state.error.age}</Text>
        <Button
          title="Login"
          color="#841584"
          accessibilityLabel="Login Now"
          onPress={this.login}
        />
      </View>
    );
  }
}

class PrivacyChoice extends Component {
  constructor(props) {
    super(props)
    let index = this.props.private?0:1;
    this.state = {
      selectedIndex: index
    }
    this.updateIndex = this.updateIndex.bind(this)
  }

  updateIndex(selectedIndex) {
    this.setState({selectedIndex});
    this.props.onSelectChange(selectedIndex);
  }

  render() {
    const buttons = ['Private', 'Public']
    const { selectedIndex } = this.state

    return (
      <ButtonGroup
        onPress={this.updateIndex}
        selectedIndex={selectedIndex}
        buttons={buttons}
        containerStyle={{height: 30}}
      />
    )
  }
}
class DetailList extends Component {
  constructor(props) {
    super(props);

  }

  handleClick
  render() {
    return (
      <ListItem
        key={this.props.key}
        order={this.props.order}
        title={this.props.title}
        rightTitle={this.props.rightTitle}
        subtitle={this.props.subtitle}
        onPress={this.handleClick}
      />
    );
  }
}
class UserDetailView extends React.Component {
  constructor(props) {
    super(props);
    // get user details
    const username = this.props.username;
    // function to get user details based on username

    // set user details data to state

    // get a list of companions

    this.state = {
      user:
      {
        id: 1,
        username: 'username',
        location: {
          value: 'location',
          private: false,
        },
        public_profile_pic: './assets/images/Header-Icon-User.png',
        details: [
          {
            id: 1,
            order: 1,
            label: 'First Name',
            value: 'John',
            private: false,
          },
          {
            id: 2,
            order: 2,
            label: 'Last Name',
            value: 'Doe',
            private: false,
          },
        ],
        custom_details: [
          {
            id: 1,
            order: 1,
            label: 'custom1',
            value: 'customval1',
            private: false,
          },
        ],


      },
      companions:
      [
        {
          id: 1,
          username: 'companion username',
          location: {
            value: 'location',
            private: true,
          },
          public_profile_pic: './assets/images/Header-Icon-User.png',
          details: [
            {
              id: 1,
              order: 1,
              label: 'First Name',
              value: 'John',
              private: false,
            },
            {
              id: 2,
              order: 2,
              label: 'Last Name',
              value: 'Doe',
              private: false,
            },
          ],
        },
        {
          id: 2,
          username: 'companion username2',
          location: {
            value: 'location',
            private: false,
          },
          public_profile_pic: './assets/images/Header-Icon-User.png',
          details: [
            {
              id: 1,
              order: 1,
              label: 'First Name',
              value: 'John',
              private: false,
            },
            {
              id: 2,
              order: 2,
              label: 'Last Name',
              value: 'Doe',
              private: false,
            },
          ],
        }
      ],
      overlay: {
        isVisible: false,
        id: '',
        private: false,
        label: '',
        value: '',
      }
    }

    this.generateDot = this.generateDot.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.hideOverlay = this.hideOverlay.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }


  scrollX = new Animated.Value(0);

  handleClick(e, data) {
    this.setState({
      overlay: {
        isVisible: !this.state.overlay.isVisible,
        private: data.private,
        label: data.label,
        value: data.value,
        id: data.id,
      }
    });
  }
  handleSelectChange(index) {
    this.setState({
      overlay: {
        ...this.state.overlay,
        private: !index,
      }
    });
  }
  handleEdit() {
    var details = this.state.user.details;
    var index = details.findIndex((obj => obj.id == this.state.overlay.id));
    details[index].label = this.state.overlay.label;
    details[index].value = this.state.overlay.value;
    details[index].private = this.state.overlay.private;
    this.setState({
      user: {
        ...this.state.user,
        details,
      },
      overlay: {
        ...this.state.overlay,
        isVisible: false,
      }
    });
  }
  hideOverlay() {
    this.setState({
      overlay: {
        ...this.state.overlay,
        isVisible: false,
      }
    });
  }
  userCard(user) {
      return (
        <View key={user.id} style={styles.cardContainer}>
          <Header
            placement="left"
            centerComponent={{ text: user.username, style: { color: '#fff' } }}
          />
          <View style={{flexDirection: 'row'}}>
            <Image
              style={{width: 100, height: 100}}
              source={require('./assets/images/Header-Icon-User.png')}
              PlaceholderContent={<ActivityIndicator />}
            />
            <View>
              <Text>Current Location</Text>
              <Text>{user.location.value}</Text>
              <Text>{user.location.private?'Private':'Public'}</Text>
            </View>
          </View>

          <Text style={styles.header}>Details</Text>
          <View style={styles.userDetailsContainer}>
            <View style={styles.userDetails}>
              {user.details.map((v, i) => (
                <ListItem
                  key={v.id}
                  order={v.order}
                  title={v.label}
                  rightTitle={v.value}
                  subtitle={v.private?'Private':'Public'}
                  onPress={e => this.handleClick(e, {label: v.label, value: v.value, private: v.private, id: v.id})}
                />
              ))}
            </View>
            <View style={styles.customUserDetails}>
              {
                user.custom_details?user.custom_details.map((v, i) => (
                  <ListItem
                    key={v.id}
                    order={v.order}
                    title={v.label}
                    rightTitle={v.value}
                    subtitle={v.private?'Private':'Public'}
                  />
                )):false
              }
            </View>
            <Overlay
              isVisible={this.state.overlay.isVisible}
              windowBackgroundColor="rgba(120, 120, 120, .8)"
              overlayStyle={{ borderWidth: 1, borderStyle: 'solid', borderColor: '#c7c7cc'}}
              borderRadius={5}
              width={width*.8}
              height="auto"
              onBackdropPress={this.hideOverlay}
            >
              <View>
                <Text>Edit Details</Text>
                <Input
                  label={this.state.overlay.label}
                  value={this.state.overlay.value}
                  onChangeText={text => this.setState({overlay: {...this.state.overlay, value: text}})}
                />
                <PrivacyChoice
                  onSelectChange={this.handleSelectChange}
                  private={this.state.overlay.private}
                />
                <Button
                  title='Edit'
                  onPress={this.handleEdit}
                />
              </View>
            </Overlay>
          </View>
        </View>
      );

  }
  generateDot(times) {
    if (times === 1) {
      return;
    }
    let position = Animated.divide(this.scrollX, width);
    let dots = [];
    for (let i=0; i<times; i++) {
      let opacity = position.interpolate({
        inputRange: [i - 1, i, i + 1],
        outputRange: [0.3, 1, 0.3],
        extrapolate: 'clamp'
      });
      dots.push(
        <Animated.View
          key={i}
          style={{ opacity, height: 10, width: 10, backgroundColor: '#595959', margin: 8, borderRadius: 5 }}
        />
      );
    }
    return dots;

  }
  render() {
    return (
      <View style={styles.wrapper}>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: this.scrollX } } }]
          )}
          scrollEventThrottle={16}
        >
          {this.userCard(this.state.user)}
          {this.state.companions.map(c => (this.userCard(c)))}
        </ScrollView>
        <View style={{ flexDirection: 'row' }}>
          {this.generateDot(this.state.companions.length+1)}
        </View>
        <View>
          <Button
            icon={
              <Icon
                name="calendar"
                type='font-awesome'
                size={15}
                color="white"
              />
            }
            onPress={() => this.props.navigation.navigate('CalendarView')}
          />
          <Button
            icon={
              <Icon
                name="plus-square"
                type='font-awesome'
                size={15}
                color="white"
              />
            }

          />
          <Notify />
        </View>
      </View>
    );
  }
}




const RootStack = createStackNavigator(
  {
    LoginView: LoginForm,
    UserView: UserDetailView,
    CalendarView: Calendar,
  },
  {
    initialRouteName: 'LoginView',
  }
);

const AppContainer = createAppContainer(RootStack);
class App extends Component {

  render() {
    return (
      <AppContainer />
    );
  }
}



const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 40,
  },
  container: {
    marginTop: 25,
    padding: 10
  },
  cardContainer: {
    width,
  },
  header: {
    fontSize: 60,
     textAlign: 'center',
     color: '#A7383D',
     fontWeight: 'bold',
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
