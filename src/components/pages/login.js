import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button, TextInput, KeyboardAvoidingView } from 'react-native';
import { setEmail } from '../../redux/userStore';
import { emailValidator } from '../../services/validation/user-validation-service';
import themeStyles from '../../styles/theme';
import { post } from '../../services/http/http-service';
import AsyncStorage from '@react-native-async-storage/async-storage';


class Login extends React.Component {


    constructor(props) {
      super(props);
      this.state = {
        errors: {
          email: null
        }
      };
    }

    componentDidMount(){
      this.getEmailOnDisc();
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
              onChangeText={text => this.setState({password:text})}
              secureTextEntry={true}
              placeholder="Enter password"
            />
          </View>

          <View style={styles.submitButtonView}>
            <View style={styles.inner}>
              <Button
                onPress={this.login}
                title="Login"
                accessibilityLabel="Learn more about this purple button"
              />
            </View>
          </View>

        </KeyboardAvoidingView>

      );
    }

    login = () => {
      let emailError = emailValidator(this.props.user.email);

      if (!emailError) {
        this.saveEmailOnDisc(this.props.user.email);

        post('/users/login',null,{email:this.props.user.email,password:this.state.password},false).then(response=>{
          console.log(response.data)
        }).catch(error=>{

        })
      }

      this.setState({ errors: { email: emailError } })
    }

    saveEmailOnDisc = async(email)=>{
      await AsyncStorage.setItem('userEmail', email)
    }

    getEmailOnDisc = async()=>{
      let email = await AsyncStorage.getItem('userEmail')
      console.log(email)
      if(email){
        this.props.dispatch(setEmail(email))
      }
      return email;
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