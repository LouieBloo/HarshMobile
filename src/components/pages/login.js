import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View,KeyboardAvoidingView } from 'react-native';
import {Text,TextInput,Button} from 'react-native-paper';
import { login, setEmail, welcome } from '../../redux/userStore';
import { emailValidator } from '../../services/validation/user-validation-service';
import themeStyles from '../../styles/theme';
import { post } from '../../services/http/http-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

class Login extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      errors: {
        email: null
      }
    };
  }

  componentDidMount() {
    this.startup();
  }

  render() {
    return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <Text style={styles.header}>Harsh</Text>

        <View style={styles.inputView}>
          <TextInput
            style={styles.inputs}
            value={this.props.user && this.props.user.email}
            onChangeText={text => this.props.dispatch(setEmail(text))}
            autoCapitalize="none"
            autoCompleteType="email"
            textContentType="emailAddress"
            keyboardType="email-address"
            placeholder="Enter email"
          />
          {this.state.errors && this.state.errors.email && (
            <Text style={themeStyles.textErrorColor}>{this.state.errors.email}</Text>
          )}
          <TextInput
            style={styles.inputs}
            onChangeText={text => this.setState({ password: text })}
            secureTextEntry={true}
            placeholder="Enter password"
            value={this.state.password}
          />
        </View>

        <View style={styles.submitButtonView}>
          <View style={styles.inner}>
            <Button
            icon="login" mode="contained"
              onPress={this.login}
              
              accessibilityLabel="Learn more about this purple button"
            >Login</Button>
          </View>
        </View>

      </KeyboardAvoidingView>

    );
  }

  startup = async () => {
    await this.getEmailOnDisc();
    await this.getPasswordOnDisc();

    if(this.props.user.email && this.state.password){
      await this.login();
    }
  }

  login = async () => {
    let emailError = emailValidator(this.props.user.email);
    if (!emailError) {
      await post('/users/login', null, { email: this.props.user.email, password: this.state.password }, false).then(async (response) => {
        this.saveEmailOnDisc(this.props.user.email);
        this.savePasswordOnDisc(this.state.password);
        await this.props.dispatch(login({ _id: response.data._id }));
        await this.saveTokenToDisc(response.data.token);
        await this.getUserAndContinue();
      }).catch(error => {
        console.log(error)
      })
    }

    this.setState({ errors: { email: emailError } })
  }

  saveTokenToDisc = async (token) => {
    await AsyncStorage.setItem('token', token)
  }

  getUserAndContinue = async () => {
    await post('/users/home/welcome').then(response => {
      this.props.dispatch(welcome(response.data))
      this.props.navigation.navigate('Profile Settings');
    }).catch(err => {
      console.log("here/l: ", err)
    })
  }

  saveEmailOnDisc = async (email) => {
    await AsyncStorage.setItem('userEmail', email)
  }

  getEmailOnDisc = async () => {
    let email = await AsyncStorage.getItem('userEmail')
    if (email) {
      this.props.dispatch(setEmail(email))
    }
    return email;
  }

  savePasswordOnDisc = async (password) => {
    await AsyncStorage.setItem('userPass', password)
  }

  getPasswordOnDisc = async () => {
    let pass = await AsyncStorage.getItem('userPass')
    this.setState({ password: pass })
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  header: {
    fontSize: 36,
    textAlign: "center",
    marginTop: -40
  },
  inputView: {
    alignItems: "center",
    marginTop: 10
  },
  inputs: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1
  },
  submitButtonView: {
    alignItems: 'center',
  },
  inner: {// marginHorizontal:200,
    width: 300,
    // alignItems: 'center',
    // marginVertical: 30,
    justifyContent: 'center'
  },
  title: {
    textAlign: 'center',
    marginVertical: 8,
  },
  fixToText: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  separator: {
    marginVertical: 8,
    borderBottomColor: '#737373',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
};

export default connect(mapStateToProps)(Login);