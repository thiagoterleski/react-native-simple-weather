import React from 'react';
import {
  Image,
  Linking,
  Platform,
  Dimensions,
  ScrollView,
  Button,
  StyleSheet,
  Text,
  TextInput,
  TouchableHighlight,
  View,
} from 'react-native';
import { Ionicons } from '@exponent/vector-icons';
import { MonoText } from '../components/StyledText';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  }

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Image
            style={styles.logo}
            source={require('../assets/images/illust.png')}
            resizeMode={Image.resizeMode.center} />
        </View>
        <Text style={styles.header}>React Native</Text>
        <Text style={[styles.header,styles.subtitle]}>Simple Wheater</Text>
        <View style={styles.form}>
          <TextInput
            style={styles.input}
            clearButtonMode={"always"}
            clearTextOnFocus={true}
            autoCorrect={false}
            placeholder={"Enter your city"}
            underlineColorAndroid='transparent'
            enablesReturnKeyAutomatically={true}
            returnKeyType={"search"}/>
          <TouchableHighlight
            style={styles.button}
            color="#FFC107"
          ><Text>Learn More</Text></TouchableHighlight>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#BBDEFB',
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    textAlign: 'center',
    fontSize: 32,
    fontWeight: '700'
  },
  subtitle: {
    fontSize: 22,
    fontWeight: '300'
  },
  logo: {
    width: 250,
    height: 250,
  },
  form: {
    width: windowWidth,
    flexDirection: 'column',
    padding: 20,
  },
  input: {
    height: 52,
    marginVertical: 20,
    paddingHorizontal: 18,
    textAlign: 'center',
    fontSize: 16,
    backgroundColor: 'white',
    borderRadius: 4,
  },
  button: {
    backgroundColor: '#FFCA28',
    height: 52,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
