import { StyleSheet } from 'react-native';

const mutedColor = "gray";
export default StyleSheet.create({

  //Text
  bold:{
    fontWeight:"bold"
  },
  tinyFont:{
    fontSize:14,
    fontWeight:"400"
  },
  smallFont:{
    fontSize:16,
    fontWeight:"500"
  },
  mediumFont:{
    fontSize:20,
    fontWeight:"600"
  },

  textErrorColor: {
    color: 'red'
  },
  textDanger: {
    color: 'red'
  },

  mutedColor:{
    color:mutedColor
  }

});