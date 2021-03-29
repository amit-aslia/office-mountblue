import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Container, Item, Form, Input, Button, Label } from 'native-base';
class Login extends Component {
  state = {};
  render() {
    return (
      <Container>
        <Form>
          <Item floatingLabel>
            <Label>Email</Label>
            <Input autoCapitalize="none" autoCorrect={false}></Input>
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntery={true}
              autoCapitalize="none"
              autoCorrect={false}
            ></Input>
          </Item>
          <Button full rounded success>
            <Text>Login</Text>
          </Button>
          <Button full rounded success style={{ marginTop: 20 }}>
            <Text>SignUp</Text>
          </Button>
        </Form>
      </Container>
    );
  }
}

export default Login;
