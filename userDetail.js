import React, {Component} from "react";
import { StyleSheet, Text, View, Button, ActivityIndicator, AppRegistry } from "react-native";
import { NativeRouter, Route, Link } from "react-router-native";
import { CheckBox, Input, Image, ListItem, Header, ScrollView } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

class UserDetailView extends React.Component {
  state = {
    users: [
      {
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

  userCard(user) {
      return (

        <View style={styles.container}>
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
    return (
      <View>
        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={true}
        >
          {this.state.users.map(item => (this.userCard(item)))}
        </ScrollView>
      </View>
    );
  }
}

export default UserDetailView;
