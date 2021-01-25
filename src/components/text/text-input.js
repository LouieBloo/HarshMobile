import React from 'react'
import { View, StyleSheet, Text,TextInput } from 'react-native'
// import { theme } from '../core/theme'

const AppTextInput = ({ errorText, description, ...props }) => (
  <View style={styles.container}>
    <TextInput
      style={styles.input}
      selectionColor={theme.colors.primary}
      underlineColor="transparent"
      mode="outlined"
      {...props}
    />
    {description && !errorText ? (
      <Text style={styles.description}>{description}</Text>
    ) : null}
    {errorText ? <Text style={styles.error}>{errorText}</Text> : null}
  </View>
)

const styles = StyleSheet.create({
  container: {
    width: '100%',
    marginVertical: 12,
  },
  
  description: {
    fontSize: 13,
    color: "blue",
    paddingTop: 8,
  },
  error: {
    fontSize: 13,
    color: "red",
    paddingTop: 8,
  },
})

export default AppTextInput