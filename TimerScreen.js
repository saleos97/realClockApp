import React, { Component } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert, Platform, ImageBackground } from 'react-native';
import Geocoder from 'react-native-geocoding';
import moment from 'moment';
import moment1 from 'moment-timezone';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      name: 'Test12',
      language: 'vn',
      city: [],
      country: [],
      latitude: null,
      longitude: null,
      error: null,
      dataSource: null,
      summary: null,
      timezone: null,
      time: null,
      convertedtime: null,
      currentTime: null,
      currentDay: null
    }
    this.daysArray = ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
  }

  getTime() {
    fetch('https://api.darksky.net/forecast/d9df22cc5095c3dd8c9a10c8d35f22ac/' + this.state.latitude + ',' + this.state.longitude + ',' + moment().unix())
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({ dataSource: responseJson.currently })
        console.log(this.state.dataSource)
        this.setState({ summary: responseJson.currently.summary })
        console.log(this.state.summary)
        this.setState({ timezone: responseJson.timezone })
        console.log(this.state.timezone)
        this.setState({ time: responseJson.currently.time })
        console.log(this.state.time)
        // var myDate = new Date( this.state.time *1000);
        // console.log(myDate.toGMTString());
        // console.log(myDate.toLocaleString())

        // console.log(moment().unix())
        // console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))

        this.setState({ convertedtime: moment.tz(this.state.time * 1000, this.state.timezone) });
        console.log(this.state.convertedtime.format())
        console.log(this.state.convertedtime.hour())
        console.log(this.state.convertedtime.hours())
        console.log(this.state.convertedtime.minute())
        console.log(this.state.convertedtime.minutes())
        console.log(this.state.convertedtime.seconds())
        console.log(this.state.convertedtime.second())

      })
      .catch((error) => {
        console.error(error);
      });
  }

  componentWillMount() {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
        console.log(this.state.latitude)
        console.log(this.state.longitude)
        this.getTime();
        this.getCurrentTime();
        this.getData();
      },
      (error) => this.setState({ error: error.message }),
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    );



    // Call getCurrentTime function before render method is executed.
  }

  getCurrentTime = () => {
    let hour = moment.tz(moment().unix() * 1000, this.state.timezone).hour();
    let minutes = moment.tz(moment().unix() * 1000, this.state.timezone).minute();
    let seconds = moment.tz(moment().unix() * 1000, this.state.timezone).second();
    let am_pm = 'pm';

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    if (seconds < 10) {
      seconds = '0' + seconds;
    }

    if (hour > 12) {
      hour = hour - 12;
    }

    if (hour == 0) {
      hour = 12;
    }

    if (moment.tz(moment().unix() * 1000, this.state.timezone).hour() < 12) {
      am_pm = 'am';
    }

    this.setState({ currentTime: hour + ':' + minutes + ':' + seconds + ' ' + am_pm });

    // this.daysArray.map(( item, key ) =>
    // {
    //     if( key == new Date().getDay() )
    //     {
    //         this.setState({ currentDay: item.toUpperCase() });
    //     }
    // })        
    // Code to get the current system time and day.
  }

  componentWillUnmount() {
    clearInterval(this.timer);
    // Clear Interval.
  }

  componentDidMount() {
    this.timer = setInterval(() => {
      this.getCurrentTime();
    }, 1000);




  }

  getData() {
    Geocoder.setApiKey("AIzaSyBLV2i0Gpw0IYKCKVwf4nfVLaVHEw2vXT0");
    Geocoder.from(this.state.latitude, this.state.longitude)
      .then(json => {

        this.setState({ city: json.results[0].address_components })
        // this.setState({country: json.results[0].address_components[]})
        this.setState({ latitude: json.results[0].geometry.location.lat })
        this.setState({ longitude: json.results[0].geometry.location.lng })
        console.log("Hallo" + this.state.dataSource)
        var city = json.results[0].address_components;
        for (i = 0; i < city.length; i++) {

          var obj = city[i];
          var typess = obj.types;
          for (j = 0; j < typess.length; j++) {
            var abc = typess[j];
            if (abc == "country") {
              this.setState({ country: obj.long_name })
            }
            if (abc == "administrative_area_level_1") {
              this.setState({ city: obj.long_name })

            }
          }


        }
        console.log(this.state.city);
        console.log(this.state.country);
        console.log(this.state.latitude)
        console.log(this.state.longitude)

        
      })
      .catch(error => console.warn(error));
  }
  render() {
    return (
      <ImageBackground source={require('../realClockApp/assets/map1.jpg')}
        style={styles.container}>
        <Text style={{fontSize:50, color:'white', justifyContent: 'center', marginTop: 100}}>{this.state.currentTime}</Text>
        <View style={styles.inner}>
          
          <Text style={styles.textContainer}>Your current Location:</Text>
          
          <Text style={styles.textContainer}>{this.state.city + ""} / {this.state.country + ""}</Text>
          <Text style={styles.textContainer}>Weather</Text>
          <Text style={ {fontSize: 20, color: 'white', marginBottom: 80}}>{this.state.summary}</Text>
        
          {this.state.error ? <Text>Error: {this.state.error}</Text> : null}
        
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inner: {
    justifyContent:'flex-end',
    width: '80%',
    height: '80%',
  
  },
  textContainer:{
    fontSize:20, 
    color: 'white'
    
  }
});