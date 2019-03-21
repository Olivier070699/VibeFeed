import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'
import * as firebase from 'firebase';


// Initialize Firebase
const config = {
  apiKey: "AIzaSyAx2xnpKzD6yOG1X5gENVi9LWWUg3eYDI4",
  authDomain: "vibefeed-a1f33.firebaseapp.com",
  databaseURL: "https://vibefeed-a1f33.firebaseio.com",
  projectId: "vibefeed-a1f33",
  storageBucket: "vibefeed-a1f33.appspot.com",
  messagingSenderId: "681887007137"
};
firebase.initializeApp(config);


export default class Addquote extends React.Component {

constructor(props) {
super(props)

this.state = ({
        email: "",
        password: "",
        newPassword: "",
        currentPassword: "",
        newEmail: "",
    })
}


// Chance Password
reauthenticate = (currentPassword) => {
    let user = firebase.auth().currentUser
    let cred = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
    return user.reauthenticateWithCredential(cred);
    }


    onChangePasswordPress = () => {

    this.reauthenticate(this.state.currentPassword).then(() => {

    let user = firebase.auth().currentUser;
    user.updatePassword(this.state.newPassword).then(() => {
    alert.alert("Password was changed");
    }).catch((error) => {
    alert.alert(error.message);
    }) 

    }).catch((error) => {
    alert.alert(error.message);
    })

}

  render() {
    return (
      <Container style={styles.container}>
        
        <Input value={this.state.newPassword}
          placeholder="New Password"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(text) => {this.setState({newPassword: text})}}
        />

        <Input value={this.state.currentPassword}
          placeholder="currentPassword"
          autoCapitalize="none"
          secureTextEntry={true}
          onChangeText={(text) => {this.setState({currentPassword: text})}}
        />

        <Button onPress={this.onChangePasswordPress}>
          <Text>Change Password</Text>
        </Button>
            
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});
