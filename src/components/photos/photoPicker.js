import React from 'react';
import { connect } from 'react-redux';
import { StyleSheet, View, KeyboardAvoidingView, ScrollView } from 'react-native';
import { login, setEmail, setPreferences } from '../../redux/userStore';
import { emailValidator } from '../../services/validation/user-validation-service';
import Theme from '../../styles/theme';
import Layout from '../../styles/global';
import { post, get } from '../../services/http/http-service';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';
// import CheckBox from '@react-native-community/checkbox';
import { Checkbox, RadioButton, Text, TextInput, Button } from 'react-native-paper';
import { BodyTypesArray, Preferences, PreferencesArray, Sexes } from '../../config/userConfig';
import ImagePicker from 'react-native-image-crop-picker';


class PhotoPicker extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount() {
  }

  button = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true
    }).then(image => {
      console.log(image);
    });
  }

  render() {
    return (
      <View>
        <Button
          onPress={()=>{this.button()}}
        >Upload Photo</Button>
      </View>
    );
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

export default connect(mapStateToProps)(PhotoPicker);