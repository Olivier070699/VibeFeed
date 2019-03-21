import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'


export default class Settings extends React.Component {

// Logout
logout = () => {
    firebase.auth().signOut();
}


  render() {
    return (
      <Container style={styles.container}>
        <Button><Text>Change email</Text></Button>
        <Button><Text>Change password</Text></Button>
        
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
