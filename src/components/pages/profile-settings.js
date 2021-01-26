import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, Text, View, Button, TextInput, KeyboardAvoidingView, ScrollView } from 'react-native';
import { login, setEmail, setPreferences } from '../../redux/userStore';
import { emailValidator } from '../../services/validation/user-validation-service';
import themeStyles from '../../styles/theme';
import { post, get } from '../../services/http/http-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
import CheckBox from '@react-native-community/checkbox';

class ProfileSettings extends React.Component {


  constructor(props) {
    super(props);
    this.state = {

    };
  }

  componentDidMount() {
    this.getUserPreferenes();
  }

  render() {
    return (
      <ScrollView>
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }} behavior="padding" enabled keyboardVerticalOffset={100}>
          <ScrollView>
            <Text style={styles.header}>Profile & Preferences</Text>
            <Text >Changing these will effect who you see when you are dating & who sees you when they are dating</Text>

            <CheckBox
              disabled={false}
              value={true}
              onValueChange={(newValue) => console.log(newValue)}
            />
            <TextInput
              style={styles.inputs}
              onChangeText={text => this.setState({ password: text })}
              placeholder="Enter password"
            />

          </ScrollView>
        </KeyboardAvoidingView>
        {/* <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
        </KeyboardAvoidingView> */}
      </ScrollView>
    );
  }

  getUserPreferenes = async () => {
    let preferences = await get('/users/profiles/mine').then(response => {
      this.props.dispatch(setPreferences(response.data));
      console.log("user: ", this.props.user)
    });
  }


}

const styles = StyleSheet.create({
  inputs: {
    height: 40,
    width: 300,
    borderColor: 'gray',
    borderWidth: 1
  },
  header: {
    fontSize:34
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

export default connect(mapStateToProps)(ProfileSettings);