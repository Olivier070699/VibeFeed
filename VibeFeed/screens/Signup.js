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


export default class Signup extends React.Component {
  

constructor(props) {
    super(props)

    this.state = ({
        email: "",
        password: "",
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



  render() {
    return (
        <Container style={styles.container}>
            
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

          <Button full primary onPress={()=>this.signUpUser(this.state.email,this.state.password)}>
            <Text>Sign Up</Text>
          </Button>
            </Form>
            
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
