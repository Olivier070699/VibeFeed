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


export default class App extends React.Component {
  
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


  // Sign user up
  signUpUser = (email, password) => {
    
    try {
      if (this.state.password.length < 6) {
        alert("Password is to short")
        return;
      }

      firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch (error) {
      console.log(error.toString())
    }
  }



  // Log user in
  loginUser = (email, password) => {
    
    try {
      
      firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
        alert('you are logged in')
      })
    } catch (error) {
        console.log(error.toString())
    }
  }


  // Add quote to firebase
  addQuote = (quote) => {
    firebase.database().ref('quotes/').push({
      likes: 0,
      quotes: quote,
      userMail: "olivier.decock1@hotmail.com",
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

  // Chance email
  onChangeEmailPress = () => {

    this.reauthenticate(this.state.currentPassword).then(() => {

      let user = firebase.auth().currentUser;
      user.updateEmail(this.state.newEmail).then(() => {
        alert.alert("Email was changed");
      }).catch((error) => {
        alert.alert(error.message);
      }) 

    }).catch((error) => {
      alert.alert(error.message);
    })
    
  }

  // Logout
  logout = () => {
    firebase.auth().signOut();
  }
  
  render() {
    return (
      <Container style={styles.container}>
        
        {/* LOGIN & Registreer */}
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCorrect={false}
              au toCapitalize="none"
              onChangeText={(email) => this.setState({email})}
            />
          </Item>

          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(password) => this.setState({password})}
            />
          </Item>

          <Button full success onPress={()=>this.loginUser(this.state.email,this.state.password)}>
            <Text>Login</Text>
          </Button>

          <Button full primary onPress={()=>this.signUpUser(this.state.email,this.state.password)}>
            <Text>Sign Up</Text>
          </Button>
        </Form>

        
        {/* ADD QUOTE TO FIREBASE */}
        <Form>
          <Item floatingLabel>
            <Label>Add Quote</Label>
            <Input
              autoCorrect={false}
              autoCapitalize="none"
              onChangeText={(quote) => this.setState({quote})}
            />
          </Item>
            
          <Button full onPress={()=>this.addQuote(this.state.quote)}>
            <Text>Add quote</Text>
          </Button>
        </Form>

        {/* RESET PASSWORD */}
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

        {/* CHANCE EMAIL */}
        <Input value={this.state.newEmail}
          placeholder="newEmail"
          autoCapitalize="none"
          keyboardType="email-address"
          onChangeText={(text) => {this.setState({newEmail: text})}}
        />

        <Button onPress={this.onChangeEmailPress}>
          <Text>Change email</Text>
        </Button>

        {/* Logout */}
        <Button onPress={this.logout()}>
          <Text>Logout</Text>
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
