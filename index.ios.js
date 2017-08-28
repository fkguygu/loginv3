/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

// import React, { Component } from 'react';
// import {
//   AppRegistry,
//   StyleSheet,
//   Text,
//   View
// } from 'react-native';
//
// export default class loginv3 extends Component {
//   render() {
//     return (
//       <View style={styles.container}>
//         <Text style={styles.welcome}>
//           Welcome to React Native!
//         </Text>
//         <Text style={styles.instructions}>
//           To get started!, edit index.ios.js
//         </Text>
//         <Text style={styles.instructions}>
//           Press Cmd+R to reload,{'\n'}
//           Cmd+D or shake for dev menu
//         </Text>
//       </View>
//     );
//   }
// }
//
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   },
//   welcome: {
//     fontSize: 20,
//     textAlign: 'center',
//     margin: 10,
//   },
//   instructions: {
//     textAlign: 'center',
//     color: '#333333',
//     marginBottom: 5,
//   },
// });
//
// AppRegistry.registerComponent('loginv3', () => loginv3);


import React from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView
} from 'react-native';

  import {
    AuthenticationDetails,
    CognitoUser,
    CognitoUserPool,
    CognitoUserAttribute
  } from 'react-native-aws-cognito-js';

  import {
    Config,
    CognitoIdentityCredentials
  } from 'aws-sdk-react-native-core';

  import Container from './components/Container';
  import Button from './components/Button';
  import Label from './components/Label';


  const appConfig = {
    region: 'us-east-1',
    IdentityPoolId: 'us-east-1:20c0331b-1145-4fae-854d-2c47d4ccdee0',
    UserPoolId: 'us-east-1_RE3WYwEJ9',
    ClientId: 'q1b07dj94s3i7u5d2us6klucc',
  }

export default class loginv3 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }

  handleUserNameChange = (text) => {
    this.setState({
      username: text
    });
  }

  handlePasswordChange = (text) => {
    this.setState({
      password: text
    });
  }

  handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const userToken = await this.login();
      alert("usertoken: " + userToken);
    }
    catch(e) {
      alert("e: " + e);
    }
  }

  login = () => {
    const { username, password } = this.state;
    //alert("un: " + username+ ",pass: " + password);
    const authenticationData = {
      Username: username,
      Password: password,
    };
    const authenticationDetails = new AuthenticationDetails(authenticationData);
    const poolData = {
      UserPoolId: appConfig.UserPoolId,
      ClientId: appConfig.ClientId
    };
    const userPool = new CognitoUserPool(poolData);
    const userData = {
      Username: username,
      Pool: userPool
    };
    const cognitoUser = new CognitoUser(userData);
    cognitoUser.authenticateUser(authenticationDetails, {
      onSuccess: (result) => {
        alert('access token + ' + result.getAccessToken().getJwtToken())
        console.log('access token + ' + result.getAccessToken().getJwtToken());
        // Config.credentials = new CognitoIdentityCredentials({
        //   IdentityPoolId: appConfig.IdentityPoolId,
        //   Logins: {
        //     [`cognito-idp.${appConfig.region}.amazonaws.com/${appConfig.UserPoolId}`]: result.getIdToken().getJwtToken()
        //   }
        // });
        alert('Success');
        //console.log(Config.credentials);
      },
      onFailure: (err) => {
        alert("err: " + err);
      },
      // newPasswordRequired: function(userAttributes, requiredAttributes) {
      //   newPassword="P@ssw0rd1"
      //   alert("requiredAttributes: "+requiredAttributes)
      //   const attributesData = {};
      //   cognitoUser.completeNewPasswordChallenge(newPassword, attributesData, this)
      // },
    });
  }

  press (){}

  render(){
    return (
      <ScrollView style={styles.scroll}>
        {/* <Container>
          <Button
            label="Forgot Login/Pass"
            styles={{button: styles.alignRight, label:styles.label}}
            onPress={this.press.bind(this)} />
        </Container> */}

        <Container controlId="username">
          <Label text={this.state.username}></Label>
          <Label text="User Name" />
          <TextInput  autoFocus
                      autoCapitalize = 'none'
                      style={styles.TextInput}
                      onChangeText={this.handleUserNameChange}/>
        </Container>
        <Container>
          <Label text={this.state.password}></Label>
          <Label text="Password" />
          <TextInput
                      style={styles.TextInput}
                      onChangeText={this.handlePasswordChange}/>
        </Container>
        <Container>
            <Button styles={{button: styles.transparentButton}}
                    onPress={this.press.bind(this)}>
                <View style={styles.inline}>
                    {/* <Icon name="facebook-official" size={30} color="#3B5699" /> */}
                    <Text style={[styles.buttonBlueText, styles.buttonBigText]}>  Connect </Text>
                    <Text style={styles.buttonBlueText}>with Facebook</Text>
                </View>
            </Button>
        </Container>
        <View style={styles.footer}>
          <Container>
              <Button
                  label="Sign In"
                  styles={{button: styles.primaryButton, label: styles.buttonWhiteText}}
                  onPress={this.handleSubmit.bind(this)} />
          </Container>
          <Container>
              <Button
                  label="CANCEL"
                  styles={{label: styles.buttonBlackText}}
                  onPress={this.press.bind(this)} />
          </Container>
        </View>
      </ScrollView>

    )
  }

}

const styles = StyleSheet.create({
  scroll:{
    backgroundColor:'#E1D7D8',
    padding: 30,
    flexDirection: 'column'
  },
  label:{
    color:'#0d8898',
    fontSize: 20
  },
  alignRight:{
    alignSelf:'flex-end'
  },
  textInput:{
    height: 80,
    fontSize: 30,
    backgroundColor: '#FFF'
  },
  transparentButton:{
    marginTop: 30,
    borderColor: '#3B5699',
    borderWidth: 2
  },
  buttonBlueText:{
    fontSize: 20,
    color: '#3B5699'
  },
  buttonBigText:{
    fontSize: 20,
    fontWeight: 'bold'
  },
  inline: {
    flexDirection: 'row'
  },
  buttonWhiteText: {
    fontSize: 20,
    color: '#FFF',
  },
  buttonBlackText: {
      fontSize: 20,
      color: '#595856'
  },
  primaryButton: {
      backgroundColor: '#34A853'
  },
  footer: {
     marginTop: 20
  }
});

AppRegistry.registerComponent('loginv3', () => loginv3);
