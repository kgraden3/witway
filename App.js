import React, { Component } from "react";
import { StyleSheet, Text, View, Button, ActivityIndicator, ScrollView, AppRegistry, Dimensions, Animated } from "react-native";
import { NativeRouter, Route, Link, Redirect, withRouter } from "react-router-native";
import { CheckBox, Input, Image, ListItem, Header, Avatar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import SetCustomText  from 'react-native-global-props';
import LinearGradient from 'react-native-linear-gradient';
import { Calendar} from 'react-native-calendars';

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

const CustomTextProps = {
  style: {
    fontSize: 16,
    fontFamily: 'Roboto',
    color: 'black'
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

          <Image  style={styles.logo}
                  resizeMode={'contain'}
                  source={require('./assets/images/witway-logo.png')} />


        <View style={styles.loginContainer}>
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
            color="#255E69"
            accessibilityLabel="Create a new user now"
            onPress={this.login}
          />
        </View>
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
          email: 'joedoe@gmail.com',
          address: '1200 Pennsylvania Ave, 22041',
          occupation: 'Writer',
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
          email: 'alice@alicelee.com',
          address: '123 Main Street, 54203',
          occupation: 'Graphic Designer',
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
            containerStyle={{height: 40, marginTop: 0, paddingTop: 0, backgroundColor: '#255E69'}}
            placement="center"
            centerComponent={{ text: user.username, style: {fontSize:25,  paddingBottom: 3, textAlign: 'center', fontWeight: 'bold', color: '#fff' } }}
          />
          <View style={{flexDirection: 'row', padding: 10, borderBottomWidth: 2, borderBottomColor: '#255E69'}}>
            <Image
              style={{width: 100, height: 100}}
              source={require('./assets/images/user-blue.png')}
              PlaceholderContent={<ActivityIndicator />}
            />
            <View style={{padding: 5, paddingLeft: 15}}>
              <Text style={{fontWeight: "bold", paddingTop: 7}}>Current Location:</Text>
              <Text  style={{fontSize: 25}}>{user.location} [{user.location_status}]</Text>
            </View>
          </View>
          <ScrollView >
            <Text style={styles.publicHeader}>Public Details</Text>
            <View styles={styles.profileListView}>

              <ListItem
                title="First Name"
                titleStyle={styles.profilePublicTitle}
                rightTitleStyle={styles.profilePublicRightTitle}
                rightTitle={user.details.first_name}
                containerStyle={styles.profilePublicContainer}
                rightContentContainerStyle={styles.profileRightContainer}
                contentContainerStyle={styles.profileContentContainer}
                key='1'
                leftAvatar={<Avatar
                                 icon={{name: 'bars', color: '#012C34', type: 'font-awesome'}}
                                 size="small"
                                 overlayContainerStyle={{backgroundColor: '#6A959D'}}
                                 onPress={() => console.log("Works!")}
                                 activeOpacity={0.7}
                                 rounded
                />}
              />
              <ListItem
                title="Last Name"
                titleStyle={styles.profilePublicTitle}
                rightTitleStyle={styles.profilePublicRightTitle}
                rightTitle={user.details.last_name}
                containerStyle={styles.profilePublicContainer}
                rightContentContainerStyle={styles.profileRightContainer}
                contentContainerStyle={styles.profileContentContainer}
                key='2'
                leftAvatar={<Avatar
                                 icon={{name: 'bars', color: '#012C34', type: 'font-awesome'}}
                                 size="small"
                                 overlayContainerStyle={{backgroundColor: '#6A959D'}}
                                 onPress={() => console.log("Works!")}
                                 activeOpacity={0.7}
                                 rounded
                />}
              />
              <ListItem
                title="Occupation"
                titleStyle={styles.profilePublicTitle}
                rightTitleStyle={styles.profilePublicRightTitle}
                rightTitle={user.details.occupation}
                containerStyle={styles.profilePublicContainer}
                contentContainerStyle={styles.profileContentContainer}
                rightContentContainerStyle={styles.profileRightContainer}
                key='5'
                leftAvatar={<Avatar
                                 icon={{name: 'bars', color: '#012C34', type: 'font-awesome'}}
                                 size="small"
                                 overlayContainerStyle={{backgroundColor: '#6A959D'}}
                                 onPress={() => console.log("Works!")}
                                 activeOpacity={0.7}
                                 rounded
                />}
              />

          </View>
            <Text style={styles.privateHeader}>Private Details</Text>
            <View styles={styles.profileListView}>
            <ListItem
              title="Address"
              titleStyle={styles.profileTitle}
              rightTitleStyle={styles.profileRightTitle}
              rightTitle={user.details.address}
              containerStyle={styles.profilePrivateContainer}
              contentContainerStyle={styles.profileContentContainer}
              rightContentContainerStyle={styles.profileRightContainer}
              key='4'
              leftAvatar={<Avatar
                               icon={{name: 'bars', color: '#540004', type: 'font-awesome'}}
                               size="small"
                               overlayContainerStyle={{backgroundColor: '#F8A7AB'}}
                               onPress={() => console.log("Works!")}
                               activeOpacity={0.7}
                               rounded
              />}
            />
            <ListItem
              title="Email"
              titleStyle={styles.profileTitle}
              rightTitleStyle={styles.profileRightTitle}
              rightTitle={user.details.email}
              containerStyle={styles.profilePrivateContainer}
              contentContainerStyle={styles.profileContentContainer}
              rightContentContainerStyle={styles.profileRightContainer}
              key='3'
              leftAvatar={<Avatar
                               icon={{name: 'bars', color: '#540004', type: 'font-awesome'}}
                               size="small"
                               overlayContainerStyle={{backgroundColor: '#F8A7AB'}}
                               onPress={() => console.log("Dragging!")}
                               activeOpacity={0.7}
                               rounded
              />}
            />



            <Calendar
              current={Date()}
              minDate={Date()}
              onDayPress={(day) => {console.log('selected day', day)}}
            />

            </View>
            {user.custom_details.map((detail, i) => (
              <ListItem
                key={detail.id}
                title={detail.label}
                rightTitle={detail.value}
              />
            ))}
          </ScrollView>
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
        <View style={{ flexDirection: 'row'}}>
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
    marginTop: 0,
    padding: 0,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  logoContainer: {
    backgroundColor: 'black',
    paddingTop: 0,
    marginTop: 0,
    flex: 2,
    justifyContent: 'flex-start'
  },
  loginContainer: {
    flex: 3,
    justifyContent: 'flex-end'
  },
  cardContainer: {
    borderColor: '#255E69',
    borderWidth: 5,
    flex: 1,
    justifyContent: 'space-between',
    width,
  },
  header: {
    fontSize: 60,
     textAlign: 'center',
     color: '#A7383D',
     fontWeight: 'bold',
     fontFamily: 'Roboto',
  },
  publicHeader: {
     marginTop: 20,
     fontSize: 25,
     textAlign: 'center',
     backgroundColor: '#255E69',
     color: 'white',
     fontWeight: 'bold',
     textAlignVertical: 'center',
     paddingTop: 0,
     marginTop: 0,
     marginLeft: 20,
     marginRight: 20,
     borderTopLeftRadius: 7,
     borderTopRightRadius: 7,
     borderColor: '#012C34',
     borderWidth: 2,
      fontFamily: 'Roboto',
  },
  privateHeader: {
     fontSize: 25,
     textAlign: 'center',
     color: 'white',
     backgroundColor: '#A7383D',
     fontWeight: 'bold',
     textAlignVertical: 'center',
     marginTop: 20,
     marginLeft: 20,
     marginRight: 20,
     borderTopLeftRadius: 10,
     borderTopRightRadius: 10,
     borderColor: '#540004',
     borderWidth: 2,
     fontFamily: 'Roboto',

  },
  headerWords: {
    fontSize: 25,
    textAlign: 'center',
    fontFamily: 'Roboto',
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
  },
  profileListView: {
    backgroundColor: '#012C34',
    borderColor: '#012C34',
    borderWidth: 10

  },
  profilePublicTitle: {
    color: '#fff',
    fontSize: 15,
    textAlign: 'center'
  },
  profileTitle: {
    color: '#540004',
    fontSize: 15,
    textAlign: 'center',
  },
  profileRightTitle: {
    color: '#540004',
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',

  },
  profilePublicRightTitle: {
    color: '#fff',
    fontSize: 19,
    fontWeight: 'bold',
    textAlign: 'center',

  },
  profilePublicContainer: {
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderWidth: 2,
    borderColor: '#255E69',
    backgroundColor: '#6A959D'

  },
  profilePrivateContainer: {
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 3,
    paddingBottom: 3,
    borderColor: '#A7383D',
    backgroundColor: '#F8A7AB',
    borderWidth: 2,
    borderColor: '#A7383D',
  },
  profileContentContainer: {
    flex: 1
  },
  profileRightContainer: {
    flex: 2
  },
  logo:{
    top: -50,
    width: width,
    marginTop: 0,
    paddingTop: 0,
  }

});

export default App;
