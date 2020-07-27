import React, { Component, useEffect } from 'react';
import { View, Text, Button, TouchableOpacity, Dimensions, StyleSheet, Platform, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Feather } from '@expo/vector-icons';
import SignUp from './SignUp';
import 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';

const SignIn = ({ navigation }) => {
 const [data, setData] = React.useState({
    email: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true
  });
  const textInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        email: val,
        check_textInputChange: true
      });
    } else {
      setData({
        ...data,
        email: val,
        check_textInputChange: false
      });

    }
  }
  const handlePasswordChange = (val) => {
    setData({
      ...data,
      password: val,
    });

  }
  const updateSecureTextEntry = () => {
    setData({
      ...data,
      secureTextEntry: !data.secureTextEntry
    })
  }
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Welcome</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <FontAwesome
            name="user-o"
            color="#05375a"
            size={20} />
          <TextInput placeholder="email"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)} />
          {data.check_textInputChange ?
            <Feather name="check-circle"
              color="green"
              size={20} />
            : null}
        </View>
        <Text style={styles.text_footer}>Password</Text>
        <View style={styles.action}>
          <FontAwesome
            name="lock"
            color="#05375a"
            size={20} />
          <TextInput placeholder="password"
            secureTextEntry={data.secureTextEntry ? true : false}
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => handlePasswordChange(val)} />
          <TouchableOpacity onPress={updateSecureTextEntry}>
            {data.secureTextEntry ?
              <Feather name="eye-off"
                color="grey"
                size={20} /> : <Feather name="eye"
                  color="grey"
                  size={20} />}
          </TouchableOpacity>
          </View>
          <View style={styles.button}>
          <TouchableOpacity onPress={async () => {
            const storedEmail = await AsyncStorage.getItem('email');
            const storedpassword = await AsyncStorage.getItem('password');
            if (data.email === storedEmail && data.password === storedpassword)
              navigation.navigate('Dash');
            else
              alert("Don't Have an Account Let's SignUp");
          }}
            style={styles.signIn}>
            <Text style={styles.textSign}>Sign In</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => { navigation.navigate("SiUp") }}
            style={styles.signIn} >
            <Text style={styles.textSign}>Sign Up</Text>

          </TouchableOpacity>

        </View>
      </View>
    </View>
  )
}

export default SignIn;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#003366'
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 3,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  text_header: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
  text_footer: {
    color: '#05375a',
    fontSize: 18,
    marginTop: 35
  },
  action: {
    flexDirection: 'row',
    marginTop: 10,
  },
  textInput: {
    flex: 1,
    marginTop: Platform.OS === 'ios' ? 0 : -12,
    paddingLeft: 10,
    color: '#05375a'
  },
  button: {
    alignItems: 'center',
    marginTop: 50,
  },
  signIn: {
    borderWidth: 40,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    borderColor: '#003366',
    marginTop: 15
  },
  textSign: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#fff'
  }


})
