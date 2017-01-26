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
  KeyboardAvoidingView,
  TouchableHighlight,
  View,
} from 'react-native';
import { Ionicons } from '@exponent/vector-icons';
import { MonoText } from '../components/StyledText';

import { fetchWeather } from '../api/weather'

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const icons = {
  '01n': 'http://res.cloudinary.com/dggatqn4v/image/upload/v1485394906/weather-app/moon_viee5j.png',
  '02n': 'http://res.cloudinary.com/dggatqn4v/image/upload/v1485394907/weather-app/cloudonly_bugzvu.png',
  '03n': 'http://res.cloudinary.com/dggatqn4v/image/upload/v1485394907/weather-app/cloudonly_bugzvu.png',
  '04n': 'http://res.cloudinary.com/dggatqn4v/image/upload/v1485394907/weather-app/stormnight_f6phey.png',
  '10n': 'http://res.cloudinary.com/dggatqn4v/image/upload/v1485394907/weather-app/stormnight_f6phey.png',
  '09n': 'http://res.cloudinary.com/dggatqn4v/image/upload/v1485394906/weather-app/raindrops_ooshhv.png',
  '11n': 'http://res.cloudinary.com/dggatqn4v/image/upload/v1485394907/weather-app/stormnight_f6phey.png',
  '12n': 'http://res.cloudinary.com/dggatqn4v/image/upload/v1485394907/weather-app/stormnight_f6phey.png',

  '01d': 'http://res.cloudinary.com/dggatqn4v/image/upload/v1485394907/weather-app/summer_asywmh.png',
  '02d': 'http://res.cloudinary.com/dggatqn4v/image/upload/v1485394906/weather-app/cloudsandsun_f1krgr.png',
  '03d': 'http://res.cloudinary.com/dggatqn4v/image/upload/v1485394907/weather-app/clouds_em9fox.png',
  '04d': 'http://res.cloudinary.com/dggatqn4v/image/upload/v1485394907/weather-app/summerRain_gyejhj.png',
  '10d': 'http://res.cloudinary.com/dggatqn4v/image/upload/v1485394907/weather-app/sunStorm_v87mpc.png',
  '09d': 'http://res.cloudinary.com/dggatqn4v/image/upload/v1485394907/weather-app/storm_qpiwt1.png',
  '11d': 'http://res.cloudinary.com/dggatqn4v/image/upload/v1485394907/weather-app/storm_qpiwt1.png',
  '12d': 'http://res.cloudinary.com/dggatqn4v/image/upload/v1485394906/weather-app/raindrops_ooshhv.png',
}

const backgroundColorConditions = {
  '01n': '#E8EAF6',
  '02n': '#C5CAE9',
  '03n': '#9FA8DA',
  '04n': '#7986CB',
  '05n': '#5C6BC0',
  '06n': '#3F51B5',
  '07n': '#3949AB',
  '08n': '#303F9F',
  '09n': '#283593',
  '10n': '#8C9EFF',
  '11n': '#536DFE',
  '12n': '#3D5AFE',

  '01d': '#BBDEFB',
  '02d': '#BBDEFB',
  '03d': '#90CAF9',
  '04d': '#64B5F6',
  '05d': '#42A5F5',
  '06d': '#2196F3',
  '07d': '#1E88E5',
  '08d': '#1976D2',
  '09d': '#1565C0',
  '10d': '#0D47A1',
  '11d': '#82B1FF',
  '12d': '#448AFF',
}

export default class HomeScreen extends React.Component {
  static route = {
    navigationBar: {
      visible: false,
    },
  }

  constructor(props) {
    super(props);
    this.state = {
      city: '',
      realCity: '',
      isLoading: false,
      showInfo: false,
      current: {
        weatherType: '',
        description: '',
        temperature: 0,
        temp_min: 0,
        temp_max: 0,
      },
    }
    this.onChangeText = this.onChangeText.bind(this);
    this.getWeather = this.getWeather.bind(this);
  }

  onChangeText(text) {
    this.setState({
      city: text,
    })
  }

  getWeather() {
    this.setState({isLoading: true});
    fetchWeather(this.state.city)
    .then((response) => {
      const result = response.list[0];
      const weather = result.weather[0];

      this.setState({
        isLoading: false,
        showInfo: true,
        realCity: result.name,
        current: {
          temperature: result.main.temp,
          weatherType: weather.main,
          description: weather.description,
          temp_min: result.main.temp_min,
          temp_max: result.main.temp_max,
          iconCode: weather.icon,
        }
      });
      console.log(this.state);
    })
  }

  render() {

    const { current: { iconCode } } = this.state;
    const backgroundColor = (this.state.showInfo) ? backgroundColorConditions[iconCode] : '#BBDEFB'


    return (
      <View style={[styles.outerContainer]}>
        <KeyboardAvoidingView
          behavior={'padding'}
          style={[styles.container, { backgroundColor: backgroundColor }]}>
          { !this.state.showInfo ? (
            <View>
              <Image
                style={styles.logo}

                source={require('../assets/images/illust.png')}
                resizeMode={Image.resizeMode.center} />
              <Text style={styles.header}>React Native</Text>
              <Text style={[styles.header,styles.subtitle]}>Simple Weather</Text>
            </View>
          ) : null }

          { this.state.showInfo ? (
            <View style={styles.result}>

                <Image
                  style={styles.icon}
                  source={{ uri: icons[iconCode] }}
                  resizeMode={Image.resizeMode.cover} />

              <Text style={styles.cityName}>{ this.state.realCity.toUpperCase() }</Text>
              <View style={styles.row}>
                <Text style={styles.weaterTemperature}>
                  { `${Math.round(this.state.current.temperature)}C°` }
                </Text>
                <Text style={styles.weatherType}>
                  { `${this.state.current.description}` }
                </Text>

              </View>
            </View>
          ) : null }


          <View style={styles.form}>
            <TextInput
              onChangeText={ this.onChangeText }
              style={styles.input}
              value={this.state.city}
              clearButtonMode={"always"}
              clearTextOnFocus={true}
              autoCorrect={false}
              onSubmitEditing={this.getWeather}
              placeholder={"Enter your city"}
              underlineColorAndroid='transparent'
              enablesReturnKeyAutomatically={true}
              returnKeyType={"search"}/>

            <TouchableHighlight
              style={styles.button}
              onPress={ this.getWeather.bind(this) }
              underlayColor='#FFB300'
              color="#FFC107"
              >
              <Text style={styles.buttonText}>
                { (this.state.isLoading) ? 'Loading..' : 'GO GO GO' }
              </Text>

            </TouchableHighlight>
          </View>
        </KeyboardAvoidingView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  outerContainer: {
    flex:1
  },
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
  weatherImage: {
    width: windowWidth,
    alignSelf: 'flex-end',
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
    borderRadius: 8,
    elevation: 1,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  result: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width:100,
    height: 100,
  },
  cityName: {
    fontSize:14,
    fontWeight: '300',
    backgroundColor: 'rgba(0,0,0,0.2)',
    padding: 6,
    color: 'rgba(255,255,255,0.5)',
    transform: [
      {rotate: '3deg'},
      {scale:1.2},
    ]
  },
  weaterTemperature: {
    fontSize: 98,
    fontWeight: '200',
    color: 'rgba(255,255,255,0.5)',
    lineHeight: 98,
  },
  weatherType: {
    fontSize:18,
    alignItems: 'center',
    textAlign: 'center',
  },
  row: {
  }
});
