import React, { Component } from "react";
import { StyleSheet, Text, View, ActivityIndicator, ScrollView, AppRegistry, Dimensions, Animated } from "react-native";
import { NativeRouter, Route, Link, Redirect, withRouter } from "react-router-native";
import { CheckBox, Input, Image, ListItem, Header, Button, Avatar, ButtonGroup, Overlay } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import SetCustomText  from 'react-native-global-props';
import LinearGradient from 'react-native-linear-gradient';
import { Calendar} from 'react-native-calendars';

const { width } = Dimensions.get('window');
const { height} = Dimensions.get('window');


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
      },
      custom_details: {
        hair_color: 'brown',
        eye_color: 'blue',
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
      this.setState({ userLoggedIn: true });

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
      return <UserDetailView username={this.state.username} />
    }
    return (
      <View style={styles.container}>
          <Image  style={styles.logo}
                  resizeMode={'contain'}
                  source={require('./assets/images/witway-logo.png')}
                  />
       <View style={styles.loginContainer}>
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


          <View style={styles.loginButtonContainer}>
            <View style={styles.spacer}></View>
            <View style={styles.spacer2}>
              <Button
                title="Login"
                accessibilityLabel="Login Now"
                onPress={this.login}
                buttonStyle={{backgroundColor: '#255E69'}}
              />
            </View>
            <View style={styles.spacer}></View>
          </View>


        </View>
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
    this.setState({selectedIndex})
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
        username: 'LeeJen',
        location: {
          value: 'Birmingham, AL',
          private: false,
        },
        public_profile_pic: './assets/images/Header-Icon-User.png',
        details: [
          {
            id: 1,
            order: 1,
            label: 'First Name',
            value: 'Leeroy',
            private: false,
          },
          {
            id: 2,
            order: 2,
            label: 'Last Name',
            value: 'Jenkins',
            private: false,
          },
          {
            id: 3,
            order: 3,
            label: 'Occupation',
            value: 'Graphic Designer',
            private: false,
          },
          {
            id: 4,
            order: 4,
            label: 'Address',
            value: '125 Main Street',
            private: true,
          },
          {
            id: 5,
            order: 5,
            label: 'Email',
            value: 'leeeeeeroy@gmail.com',
            private: true,
          },
        ],
        custom_details: [
          {
            id: 1,
            order: 1,
            label: 'Favorite Color',
            value: 'Teal',
            private: false,
          },
        ],
      },
      companions:
      [
        {
          id: 1,
          username: 'Companion #1',
          location: {
            value: 'Birmingham, AL',
            private: false,
          },
          public_profile_pic: './assets/images/user-red.png',
          details: [
            {
              id: 1,
              order: 1,
              label: 'First Name',
              value: 'Juan',
              private: false,
            },
            {
              id: 2,
              order: 2,
              label: 'Last Name',
              value: 'Henrique',
              private: false,
            },
            {
              id: 3,
              order: 3,
              label: 'Occupation',
              value: 'Developer',
              private: false,
            },
          ],
        },
        {
          id: 2,
          username: 'Companion #2',
          location: {
            value: 'Tokyo, Japan',
            private: false,
          },
          public_profile_pic: './assets/images/user-red.png',
          details: [
            {
              id: 1,
              order: 1,
              label: 'First Name',
              value: 'Alice',
              private: false,
            },
            {
              id: 2,
              order: 2,
              label: 'Last Name',
              value: 'Walker',
              private: false,
            },
            {
              id: 3,
              order: 3,
              label: 'Email',
              value: 'awalker@reed.edu',
              private: false,
            },
          ],
        }
      ],
      overlay: {
        isVisible: false,
        private: false,
        label: '',
        value: '',
      }
    }

    this.generateDot = this.generateDot.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.hideOverlay = this.hideOverlay.bind(this);
  }


  scrollX = new Animated.Value(0);

  handleClick(e, data) {
    this.setState({
      overlay: {
        isVisible: !this.state.overlay.isVisible,
        private: data.private,
        label: data.label,
        value: data.value,
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
              <Text style={styles.currentLocation}>Current Location:</Text>
                <Text style={styles.location}>{user.location.value}</Text>
                <Text>{user.location.private?'Private':'Public'}</Text>


            </View>
          </View>
          <ScrollView>
            <Text style={styles.detailsHeader}>Details</Text>
            <View style={styles.userDetailsContainer}>
              <View style={styles.userDetails}>
                {user.details.map((v, i) => (
                  <ListItem
                    titleStyle={styles.profilePublicTitle}
                    rightTitleStyle={styles.profilePublicRightTitle}
                    rightTitle={user.details.occupation}
                    containerStyle={v.private?styles.profilePrivateContentContainer:styles.profilePublicContainer}
                    contentContainerStyle={styles.profileContentContainer}
                    rightContentContainerStyle={styles.profileRightContainer}
                    subtitleStyle={styles.profileSubtitleStyle}
                    key={v.id}
                    order={v.order}
                    title={v.label}
                    rightTitle={v.value}
                    subtitle={v.private?'Private':'Public'}
                    onPress={e => this.handleClick(e, {label: v.label, value: v.value, private: v.private})}
                  />
                ))}
                {
                  user.custom_details?user.custom_details.map((v, i) => (
                    <ListItem
                      titleStyle={styles.profilePublicTitle}
                      rightTitleStyle={styles.profilePublicRightTitle}
                      rightTitle={user.details.occupation}
                      containerStyle={styles.profilePublicContainer}
                      contentContainerStyle={styles.profileContentContainer}
                      rightContentContainerStyle={styles.profileRightContainer}
                      subtitleStyle={styles.profileSubtitleStyle}
                      key={v.id}
                      order={v.order}
                      title={v.label}
                      rightTitle={v.value}
                      subtitle={v.private?'Private':'Public'}
                    />
                  )):false
                }
                <View style={styles.detailButtonView}>
                  <View style={{flex: 1}}/>
                  <Button
                  style={{ flex: 1, padding: 3 }}
                  title="Add Detail &nbsp;"
                  containerStyle={styles.detailButtonContainer}
                  buttonStyle={styles.bottomButton}
                  iconRight
                    icon={
                      <Icon
                        name="plus-square"
                        type='font-awesome'
                        size={25}
                        color= '#6A959D'
                        iconStyle={styles.iconContainer}
                      />
                     }
                    />
                  <View style={{flex: 1}}/>
                </View>
              </View>


            <Overlay
              isVisible={this.state.overlay.isVisible}
              windowBackgroundColor="rgba(255, 255, 255, .5)"
              width={width*.8}
              height="auto"
              onBackdropPress={this.hideOverlay}
            >
              <View>
                <Text>Edit Details</Text>
                <Input
                  label={this.state.overlay.label}
                  value={this.state.overlay.value}
                />
                <PrivacyChoice private={this.state.overlay.private} />
                <Button
                  title='Edit'
                />
              </View>
            </Overlay>
            </View>


          </ScrollView>


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

            <View style={styles.buttonPanel}>
              <Button
                style={{ flex: 1 }}
                containerStyle={styles.bottomButtonContainer}
                buttonStyle={styles.bottomButton}
                iconRight
                title="Feed &nbsp; "
                icon={
                    <Icon
                      name="rss"
                      type='font-awesome'
                      color= '#6A959D'
                      size={25}
                      containerStyle={styles.iconContainer}
                     />
                   }
                 />
              <Button
                style={{ flex: 1 }}
                containerStyle={styles.bottomButtonContainer}
                buttonStyle={styles.bottomButton}
                iconRight
                disabled
                title="Calendar &nbsp; "
                icon={
                    <Icon
                      name="calendar"
                      type='font-awesome'
                      color= '#6A959D'
                      size={25}
                      containerStyle={styles.iconContainer}
                     />
                   }
                 />
                 <Button
                 style={{ flex: 1 }}
                 title="Profile &nbsp;"
                 disabled
                 containerStyle={styles.bottomButtonContainer}
                 buttonStyle={styles.bottomButton}
                 iconRight
                   icon={
                     <Icon
                       name="user"
                       type='font-awesome'
                       size={25}
                       color= '#6A959D'
                       containerStyle={styles.iconContainer}
                     />
                    }
                   />
                 <Button
                   style={{ flex: 1 }}
                   containerStyle={styles.bottomButtonContainer}
                   buttonStyle={styles.bottomButton}
                   iconRight
                   disabled
                   title="Friends &nbsp; "
                   icon={
                       <Icon
                         name="users"
                         type='font-awesome'
                         color= '#6A959D'
                         size={25}
                         containerStyle={styles.iconContainer}
                        />
                      }
                    />
            </View>
      </View>
    );
  }
}


class App extends Component {

  render() {
    return (
      <LoginForm />
    );
  }
}



const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: 0,
  },
  container: {
    marginTop: 0,
    padding: 0,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  loginContainer: {
    flex: 3,
    justifyContent: 'flex-end',
    paddingBottom: 15
  },
  loginButtonContainer: {
    flexDirection: 'row',
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
  detailsHeader: {
     marginTop: 20,
     fontSize: 25,
     textAlign: 'center',
     backgroundColor: '#255E69',
     color: 'white',
     fontWeight: 'bold',
     textAlignVertical: 'center',

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
    textAlign: 'center',
    fontWeight: 'bold'
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
  profileSubtitleStyle: {
      textAlign: 'center',
      color: '#fff',
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
  profilePrivateContentContainer: {
    marginLeft: 20,
    marginRight: 20,
    paddingTop: 3,
    paddingBottom: 3,
    borderColor: '#A7383D',
    backgroundColor: '#D1686E',
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
  },
  currentLocation:{
    fontWeight: "bold", paddingTop: 7
  },
  location:{
    fontWeight: "bold",
    fontSize: 25,
  },
  buttonPanel:{
    alignItems: 'center',
    justifyContent: "space-around",
    height: 50,
    flexDirection: "row",
    paddingBottom: 3,
    width
  },
  bottomButton:{
    backgroundColor: "#012C34"
  },
  detailButtonView:{
    marginTop: 5,
    flexDirection: "row",
    justifyContent: "center",
  },
  detailButtonContainer:{
    width: 150,
    flex: 1
  },
  bottomButtonContainer:{
    backgroundColor: '#012C34',
    borderRadius: 4
  },
  iconContainer:{
    marginLeft: 5,
    paddingLeft: 5
  },
  spacer:{
    flex: 1
  },
  spacer2:{
    flex: 2
  }

});

export default App;
