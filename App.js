import React, { Component } from "react";
import { StyleSheet, Text, View, Button, ActivityIndicator, ScrollView, AppRegistry, Dimensions, Animated } from "react-native";
import { NativeRouter, Route, Link, Redirect, withRouter } from "react-router-native";
import { CheckBox, Input, Image, ListItem, Header } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');
const { height} = Dimensions.get('window');

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

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

class LoginView extends React.Component {
  state = {
    checked: false,
    userLoggedIn: false,
  };

  login = () => {
    fakeAuth.authenticate(() => {
      this.setState({ userLoggedIn: true });
    });
  };


  render() {
    //const { from } = this.props.location.state || { from: { pathname: "/" } };
    const { userLoggedIn } = this.state;

    if (userLoggedIn) {
      return <UserDetailView />;
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
          title="Create"
          color="#841584"
          accessibilityLabel="Create a new user now"
          onPress={this.login}
        />
      </View>
    );
  }
}


class UserDetailView extends React.Component {
  state = {
    users: [
      {
        id: '1',
        username: 'Your User Name',
        location: 'London, UK',
        location_status: 'private',
        details: {
          first_name: 'John',
          last_name: 'Doe',
          email: 'example@example.com',
          address: '1200 Pennsylvania Ave',
          ocupation: '-',
          note: '-',
        },
        custom_details: [
          {
            id: '123',
            label: 'custom1',
            value: 'value1',
          },
          {
            id: '456',
            label: 'custom2',
            value: 'value2',
          },
        ]
      },
      {
        id: '2',
        username: 'Companion User Name',
        location: 'NYC, NY',
        location_status: 'Public',
        details: {
          first_name: 'Alice',
          last_name: 'Lee',
          email: 'example@example.com',
          address: '1200 Pennsylvania Ave',
          ocupation: '-',
          note: '-',
        },
        custom_details: [
          {
            id: '790',
            label: 'custom1',
            value: 'value1',
          },
          {
            id: '333',
            label: 'custom2',
            value: 'value2',
          },
        ]
      }
    ],
  };
  scrollX = new Animated.Value(0);

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
              <Text>{user.location}</Text>
              <Text>{user.location_status}</Text>
            </View>
          </View>
          <View>
            <Text style={styles.header}>Details</Text>
            <View>
              <ListItem key='1' title='First Name' rightTitle={user.details.first_name} />
              <ListItem key='2' title='Last Name' rightTitle={user.details.last_name} />
              <ListItem key='3' title='Email' rightTitle={user.details.email} />
              <ListItem key='4' title='Address' rightTitle={user.details.address} />
              <ListItem key='5' title='Ocupation' rightTitle={user.details.ocupation} />
              <ListItem key='6' title='Note' rightTitle={user.details.note} />
            </View>
            {user.custom_details.map((detail, i) => (
              <ListItem
                key={detail.id}
                title={detail.label}
                rightTitle={detail.value}
              />
            ))}
          </View>
        </View>
      );

  }
  render() {
    let position = Animated.divide(this.scrollX, width);
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
          {this.state.users.map(item => (this.userCard(item)))}
        </ScrollView>
        <View style={{ flexDirection: 'row' }}>
          {this.state.users.map((_, i) => {
            let opacity = position.interpolate({
              inputRange: [i - 1, i, i + 1],
              outputRange: [0.3, 1, 0.3],
              extrapolate: 'clamp' // this will prevent the opacity of the dots from going outside of the outputRange (i.e. opacity will not be less than 0.3)
            });
            return (
              <Animated.View
                key={i}
                style={{ opacity, height: 10, width: 10, backgroundColor: '#595959', margin: 8, borderRadius: 5 }}
              />
            );

          })}
        </View>
      </View>
    );
  }
}


class App extends Component {

  render() {
    return (
      <LoginView />
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
