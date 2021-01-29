import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, Button, KeyboardAvoidingView, ScrollView } from 'react-native';
import { login, setEmail, setPreferences } from '../../redux/userStore';
import { emailValidator } from '../../services/validation/user-validation-service';
import Theme from '../../styles/theme';
import Layout from '../../styles/global';
import { post, get } from '../../services/http/http-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
// import CheckBox from '@react-native-community/checkbox';
import { Checkbox, RadioButton, Text, TextInput } from 'react-native-paper';
import { BodyTypesArray, Preferences, PreferencesArray, Sexes } from '../../config/userConfig';
import PhotoPicker  from '../photos/photoPicker';


class ProfileSettings extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      preference: Sexes.Male,
      bodyTypePreference: BodyTypesArray.map((x) => { return x }),
      bio: null
    };
  }

  componentDidMount() {
    this.getUserPreferenes();
  }

  hasBodyTypePreference(preference) {
    return this.state.bodyTypePreference.includes(preference)
  }

  toggleBodyTypePreference(preference) {
    let btp = this.state.bodyTypePreference;
    if (!btp.includes(preference)) {
      btp.push(preference);
    } else {
      btp.splice(btp.indexOf(preference), 1);
    }

    this.setState({ bodyTypePreference: btp });
  }

  render() {
    console.log(this.state)
    return (
      <ScrollView>
        <KeyboardAvoidingView style={{ flex: 1, flexDirection: 'column', justifyContent: 'center', }} behavior="padding" enabled keyboardVerticalOffset={100}>
          <ScrollView style={[Layout.pt_2]}>
            <View style={[Layout.pl_2, Layout.pr_2]}>
              <Text style={[styles.header]}>Preferences</Text>
              <Text style={[Layout.mb_2, Layout.mt_1]}>Changing these will effect who you see when you are dating & who sees you when they are dating</Text>

              <View style={[Layout.flexRow, Layout.mt_2]}>
                <View style={Layout.flex_1}>
                  <Text style={[Theme.mediumFont]}>Their Sex:</Text>
                  <RadioButton.Group onValueChange={(newValue) => this.setState({ preference: newValue })} value={this.state.preference}>
                    {PreferencesArray.map((preference) => {
                      return (
                        <View key={preference} >
                          <RadioButton.Item
                            label={preference}
                            value={preference}
                          />
                        </View>

                      )
                    })}
                  </RadioButton.Group>
                </View>

                <View style={Layout.flex_1}>
                  <Text style={[Theme.mediumFont]}>Their Body Type:</Text>
                  {BodyTypesArray.map(bodyType => {
                    return (
                      <Checkbox.Item
                        key={bodyType}
                        label={bodyType}
                        status={this.hasBodyTypePreference(bodyType) ? 'checked' : 'unchecked'}
                        onPress={() => {
                          this.toggleBodyTypePreference(bodyType);
                        }}
                      />
                    )
                  })}
                </View>
              </View>
            </View>
            <View>
              <View style={[Layout.pl_2, Layout.pr_2]}>
                <View>
                  <PhotoPicker />
                </View>
                <Text style={[styles.header]}>Profile</Text>
                <Text style={[Theme.mediumFont]}>My Bio:</Text>
              </View>

              <View>
                <TextInput
                  style={styles.inputs}
                  onChangeText={text => this.setState({ bio: text })}
                  label={"Max 1000 characters:"}
                  multiline={true}
                />
              </View>
            </View>

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
    });
  }


}

const styles = StyleSheet.create({
  inputs: {
  },
  header: {
    fontSize: 34
  },

  sexView: {
    flexDirection: "row",
    alignItems: 'center'
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