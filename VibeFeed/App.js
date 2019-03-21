import React from 'react';
import { StyleSheet, Text, View, AsyncStorage } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'

export default class App extends React.Component {


render() {
    return (
      <Container style={styles.container}>
        
        <Button full onPress={() => this.goToScreen('/screens/Signin')}><Text>Sign in</Text></Button>
        <Button full onPress={() => this.goToScreen('/screens/Signup')}><Text>Sign up</Text></Button>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  }
});
