import React from 'react';
import {
  StyleSheet, Text, View, Button, ActivityIndicator, Image, ListView, Alert,
  TouchableHighlight, TextInput, ImageBackground,
  FlatList, ScrollView, TouchableOpacity
} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import { List, ListItem } from 'react-native-elements'
import _ from 'lodash';
import Geocoder from 'react-native-geocoding';
import moment from 'moment';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
const data = require('./information.json');
const list = [
  {
    name: 'About Country',

  },
  {
    name: 'Visa'
  },
  {
    name: 'Cost of Living'
  },
  {
    name: 'Climate'
  },
  {
    name: 'Job Prospect/Part-time Job'
  },
  {
    name: 'International Health Cover'
  },
  {
    name: 'Safety/Emergency Contact'
  },
  {
    name: 'Weather'
  }
]




class WorldClockMain extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: ""
    }
  }

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ImageBackground style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between', alignItems: 'center' }}
        source={require("../realClockApp/assets/loginBackground.jpg")}>
        <View style={{marginTop:50,flexDirection: 'column', justifyContent: 'center', alignItems:'center' }}>
          <Text style={{ fontSize: 40, fontStyle: 'italic', color: 'red' }}>TravelNow!</Text>
          <Text style={{ fontSize: 10, color: 'skyblue' }}>Project for Assignment 3</Text>
        </View>
        <View style={{flexDirection: 'column', marginBottom:20 }}>
          <View>
            <TextInput style={styles.inputLogin}
              placeholder="Enter username/email"
              placeholderTextColor='white'
              keyboardType='email-address'
              returnKeyType='next'
              autoCorrect={false}
              onSubmitEditing={() => this.refs.txtPassword.focus()}
            />
            <TextInput style={styles.inputLogin}
              placeholder='Enter password'
              placeholderTextColor='white'
              returnKeyType='go'
              secureTextEntry
              autoCorrect={false}
              ref={'txtPassword'}
            />
          </View>


          <Button
            title="Log in"
            onPress={() => navigate('WorldClockScreen', { name: 'Jane' })}
          />
        </View>
      </ImageBackground>
    );
  }
}





class WorldClockScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      clonedMovies: [],
      fulldata: [],
      text: ''
    }
  }



  ListViewItemSeparatorLine = () => {
    return (
      <View
        style={{
          height: .5,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }

  componentDidMount() {
    return fetch("http://api.geonames.org/countryInfoJSON?&username=saleos")
      .then((response) => response.json())
      .then((responseJson) => {
        var standardDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.setState({
          isLoading: false,
          clonedMovies: standardDataSource.cloneWithRows(responseJson.geonames),

        }
        );
      })
  }
  ListViewItemSeparatorLine = () => {
    return (
      <View
        style={{
          height: .5,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }

  getlocation = (text) => {
    Geocoder.init('AIzaSyBLV2i0Gpw0IYKCKVwf4nfVLaVHEw2vXT0');

    Geocoder.getFromLocation(text).then(
      json => {
        var location = json.results[0].geometry.location;
        alert(location.lat + ", " + location.lng);
      },
      error => {
        alert(error);

      }
    );

  }

  handleSearch = text => {

    return fetch("http://api.geonames.org/countryInfoJSON?&username=saleos")
      .then((response) => response.json())
      .then((responseJson) => {
        var standardDataSource = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

        this.setState({
          isLoading: false,
          clonedMovies: standardDataSource.cloneWithRows(responseJson.geonames.filter(x => x.capital.startsWith(text) || x.countryName.startsWith(text))),

        }
        );
      })


  }

  render() {

    const { navigate } = this.props.navigation;

    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    }
    return (
      <View style={{ flex: 1 }}>
        <View style={{ height: 80, backgroundColor: 'skyblue', justifyContent: 'center', paddingHorizontal: 5 }}>
          <View style={{ height: 50, backgroundColor: 'white', flexDirection: 'row', padding: 5, alignItems: 'center' }}>
            <Ionicons name='ios-search' style={{ fontSize: 24 }} />
            <TextInput placeholder="Search" style={{ fontSize: 24, marginLeft: 15 }}
              onChangeText={(text) => this.handleSearch(text)} />


          </View>
        </View>

        <ListView
          dataSource={this.state.clonedMovies}
          renderSeparator={this.ListViewItemSeparatorLine}
          renderRow={
            (rowData) => <Text style={{ padding: 20, fontSize: 20 }}
              onPress={() => {navigate('CountryInformation', { capital: rowData.countryName, city: rowData.capital }) }}>{rowData.capital} ({rowData.countryName})</Text>
          }>
        </ListView>
      </View>

    );
  }
}

class CountryInformation extends React.Component {


  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      capital: this.props.navigation.state.params.capital,
      city: this.props.navigation.state.params.city,
      daten: [],
    }

  }



  getItemList = () => {
    var country = this.state.capital;
    for (var i = 0; i < data.length; i++) {
      var obj = data[i];
      if (obj.country == country) {
        return i;
      }
    }
  }



  componentDidMount() {
    this.setState({ daten: data, isLoading: false, uri: list });

  }



  render() {
    const { navigate } = this.props.navigation;


    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }
    return (

      <ScrollView>
        <View>
          <Image
            style={{ width: "100%", height: 200 }}
            source={{ uri: this.state.daten[this.getItemList()].picture }}
          />
        </View>
        <View>

          <List>
            <FlatList
              data={this.state.uri}
              keyExtractor={(x, i) => i.toString()}
              renderItem={({ item }) =>
                <TouchableHighlight
                  underlayColor='#006400'>

                  <ListItem
                    title={`${item.name}`}
                    onPress={() => navigate('DetailsScreen', { city: this.state.city, item: item.name, capital: this.state.capital })}
                  />
                </TouchableHighlight>}
            />
          </List>
        </View>
      </ScrollView>
    );
  }
}

class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      capital: this.props.navigation.state.params.capital,
      daten: [],
      isLoading: true,
      uri: [],
      city: this.props.navigation.state.params.city,
      item: this.props.navigation.state.params.item,
      dataSource: null, summary: null, timezone: null, time: null, temperature: "",
      isWeather: true,
      isTest: true,
    }
  }
  

  componentDidMount() {
    this.getlocation(this.state.city);
    this.setState({ daten: data, isLoading: false, uri: list });

  }
  getItemList = () => {
    var country = this.state.capital;
    for (var i = 0; i < data.length; i++) {
      var obj = data[i];
      if (obj.country == country) {
        return i;
      }
    }
    return 4;
  }

  getWeatherdata = () => {
    console.log("start to get location")
    console.log("start to get weather")
    console.log(this.state.lat + "," + this.state.long)
    if (this.state.isTest == false)
      if (this.state.isWeather) {
        fetch('https://api.darksky.net/forecast/d9df22cc5095c3dd8c9a10c8d35f22ac/' + this.state.lat + ',' + this.state.long + ',' + moment().unix())
          .then((response) => response.json())
          .then((responseJson) => {
            this.setState({ dataSource: responseJson.currently })
            this.setState({ summary: responseJson.currently.summary })
            this.setState({ timezone: responseJson.timezone })
            this.setState({ time: responseJson.currently.time })
            this.setState({ temperature: responseJson.currently.temperature })
            this.setState({ isWeather: false })
            console.log(this.state.dataSource)
            console.log(this.state.summary)
            console.log(this.state.timezone)
            console.log(this.state.time)
          })
          .catch((error) => {
            console.error(error);
          });
      }
  }

  getlocation = (text) => {
    Geocoder.init('AIzaSyBLV2i0Gpw0IYKCKVwf4nfVLaVHEw2vXT0');
    var abc = "";
    Geocoder.getFromLocation(text).then(
      json => {
        var location = json.results[0].geometry.location;
        this.setState({ lat: location.lat, long: location.lng, isTest: false })
      },
      error => {
        alert(error);
      }
    );
  }



  showInformation = (text) => {

    if (text == this.state.uri[0].name) {
      var information = this.state.daten[this.getItemList()].countryInformation;
      return information;
    }
    if (text == this.state.uri[1].name) {
      var information = this.state.daten[this.getItemList()].Visa;
      return information;
    }
    if (text == this.state.uri[2].name) {
      var information = this.state.daten[this.getItemList()].cost;
      return information;
    }
    if (text == this.state.uri[3].name) {
      var information = this.state.daten[this.getItemList()].Climate;
      return information;
    }
    if (text == this.state.uri[4].name) {
      var information = this.state.daten[this.getItemList()].Job;
      return information;
    }
    if (text == this.state.uri[5].name) {
      var information = this.state.daten[this.getItemList()].healthcover;
      return information;
    }
    if (text == this.state.uri[6].name) {
      var information = this.state.daten[this.getItemList()].safety;
      return information;
    }
    if (text == this.state.uri[7].name) {
      this.getWeatherdata();
      var information = "weather" + this.state.temperature
      return information;
    }



  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </View>
      )
    }
    return (
      <ScrollView>
        <Image
          style={{ width: "100%", height: 200 }}
          source={{ uri: this.state.daten[this.getItemList()].picture }}
        />

        <Text style={styles.TextStyle}>{this.showInformation(this.state.item)}</Text>

      </ScrollView>
    );
  }
}

const AppNavigator = createStackNavigator({
  WorldClockMain: {
    screen: WorldClockMain,
  },
  WorldClockScreen: {
    screen: WorldClockScreen,
    navigationOptions: () => ({
      title: `Country Information`,
    }),
  },
  CountryInformation: {
    screen: CountryInformation,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.capital}`,
    }),
  },
  DetailsScreen: {
    screen: DetailsScreen,
    navigationOptions: ({ navigation }) => ({
      title: `${navigation.state.params.item}`,
    }),
  }

});

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  TextStyle:
  {
    fontSize: 16,
    color: '#000',
    marginTop:10,
  },

  rowViewContainer:
  {

    fontSize: 18,
    paddingRight: 10,
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 3

  }, input: {
    margin: 15,
    height: 40,
    borderColor: 'grey',
    borderWidth: 1
  },
   inputLogin: {
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.3)',
    color: 'white',
    marginBottom:20,
    paddingHorizontal:10
  }
});

export default createAppContainer(AppNavigator);


