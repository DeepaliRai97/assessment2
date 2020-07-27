import React, { Component } from 'react';
import { View, Text, Button, TouchableOpacity, Dimensions, StyleSheet, Platform, TextInput } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { Feather } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';

const SignUp = ({ navigation }) => {
const [data, setData] = React.useState({
    name: '',
    email: '',
    password: '',

    check_textInputChange: false,
    secureTextEntry: true,
    check_nameInputChange: false,

  });
  const nameInputChange = (val) => {
    if (val.length !== 0) {
      setData({
        ...data,
        name: val,
        check_nameInputChange: true
      });
    } else {
      setData({
        ...data,
        name: val,
        check_nameInputChange: false
      });

    }
  }
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
  const onPressSubmit = async () => {
    console.log('hy');
    if (data.name.length == 0) return alert("Please enter name first");
    if (data.email.length == 0) return alert("Please enter email first");
    if (data.password.length == 0) return alert("Please enter password first");

    const dataTosent = {
      name: data.name,
      email: data.email,
      password: data.password
    }
    await AsyncStorage.setItem('name', data.name)
    const storedEmail = await AsyncStorage.getItem('email')
    console.log(storedEmail);

    await AsyncStorage.setItem('email', data.email)
    await AsyncStorage.setItem('password', data.password)
    navigation.navigate('Dash')
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.text_header}>Register Now!</Text>
      </View>
      <View style={styles.footer}>
        <Text style={styles.text_footer}>Name</Text>
        <View style={styles.action}>
          <FontAwesome
            name="user-o"
            color="#05375a"
            size={20} />

          <TextInput placeholder="name"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => nameInputChange(val)}

          />
          {data.check_textInputChange ?
            <Feather name="check-circle"
              color="green"
              size={20} />
            : null}
        </View>
        <Text style={styles.text_footer}>Email</Text>
        <View style={styles.action}>
          <FontAwesome
            name="user-o"
            color="#05375a"
            size={20} />

          <TextInput placeholder="email"
            style={styles.textInput}
            autoCapitalize="none"
            onChangeText={(val) => textInputChange(val)}
          />
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
            onChangeText={(val) => handlePasswordChange(val)}
          />
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
          <TouchableOpacity onPress={onPressSubmit}
            style={styles.signIn}>
            <Text style={styles.textSign}>Sign Up</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('Sign')}
            style={styles.signIn}>
            <Text style={styles.textSign}>Sign In</Text>

          </TouchableOpacity>

        </View>
      </View>
    </View>
  )
}

export default SignUp;

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
