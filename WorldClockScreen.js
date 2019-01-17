import React from 'react';
import { TouchableHighlight,StyleSheet, Text, View,Button,ActivityIndicator ,Image,ListView,Alert,TextInput,FlatList,ScrollView} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import {List, ListItem } from 'react-native-elements'
import _ from 'lodash';
import Geocoder from 'react-native-geocoding';
import moment from 'moment';
import moment1 from 'moment-timezone';
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




class WorldClockMain extends React.Component{

  constructor(props){
  super(props);
  this.state ={
   text:""
  }
}

  render(){
  const {navigate} = this.props.navigation;
  return(
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Button
        title="Go to Jane's profile"
        onPress={() => navigate('WorldClockScreen', {name: 'Jane'})}
        />  
    </View>
    );
  }
}





class WorldClockScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        isLoading: true,
        clonedMovies: [],
        fulldata:[],
        text:''
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
            var standardDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

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
 
 getlocation = (text)=>
 {
  Geocoder.init('AIzaSyBLV2i0Gpw0IYKCKVwf4nfVLaVHEw2vXT0');

   Geocoder.getFromLocation(text).then(
     json => {
     var location =json.results[0].geometry.location;
    alert (location.lat + ", "+ location.lng);
     },
     error => {
       alert(error);

     }
   );
    
 }

handleSearch = text=> {
    
    return fetch("http://api.geonames.org/countryInfoJSON?&username=saleos")
    .then((response) => response.json())
    .then((responseJson) => {
        var standardDataSource = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

        this.setState({
            isLoading: false,
            clonedMovies: standardDataSource.cloneWithRows(responseJson.geonames.filter(x => x.capital.startsWith(text)||x.countryName.startsWith(text))),

         }
        );
    })
    

}

  render(){
 
    const {navigate} = this.props.navigation;

    if(this.state.isLoading) {
      return (   
          <View>
              <ActivityIndicator />
          </View>
      );
  }
  return (
    <View style={{flex:1}}> 
     <View style ={{height:80,backgroundColor:'#c45653',justifyContent:'center',paddingHorizontal:5}}>
        <View style ={{height: 50,backgroundColor:'white',flexDirection:'row',padding:5,alignItems:'center'}}>
        <Ionicons name= 'ios-search' style = {{fontSize:24}}/>
        <TextInput placeholder="Search" style = {{fontSize:24,marginLeft:15}}
        onChangeText={(text)=>this.handleSearch(text)}/>

 
        </View>
     </View>

     <ListView
            dataSource={this.state.clonedMovies}
            renderSeparator= {this.ListViewItemSeparatorLine}
            renderRow={
            (rowData) => <Text style={{padding:20,fontSize:20}}
            onPress={()=>{/*this.getlocation(rowData.capital);*/navigate('CountryInformation', {capital : rowData.countryName, city :rowData.capital} )}}>{rowData.capital} ({rowData.countryName})</Text>
            }>
        </ListView>
    </View>
  
);
    }
  }

  class CountryInformation extends React.Component {


    constructor(props){
      super(props);
      this.state={
        isLoading : true,
          capital : this.props.navigation.state.params.capital,
          city: this.props.navigation.state.params.city,
          daten:[],
            }
    
  }
  
  
  
  getItemList = () => {
    var country = this.state.capital;
    for(var i = 0;i<data.length;i++) {
      var obj = data[i];
      if(obj.country == country){
      return i;
      }
    }
  }
  
  showInformation = (text) => {
  
    if(text == this.state.uri[0].name){
      return (
        <View>
        <Text>This is a test to see what happens</Text>
      </View>
      );
    
    
      // Alert.alert(this.state.daten[this.getItemList()].countryInformation+"");
    }
  
  }
  
    componentDidMount(){
      this.setState({daten:data,isLoading:false,uri:list});
  
    }
    
    
  
      render() {
        const {navigate} = this.props.navigation;

       
        if(this.state.isLoading){
          return(
            <View style={{flex: 1, padding: 20}}>
              <ActivityIndicator/>
            </View>
          )
        }    
        return (
          
          <ScrollView>
          <View>
            <Image
              style={{width:"100%",height: 200}}
              source={{uri:this.state.daten[this.getItemList()].picture}}
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
                  onPress={()=>navigate('DetailsScreen',{city: this.state.city,item: item.name, capital:this.state.capital })}
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
      constructor(props){
        super(props);
        this.state={
          capital:this.props.navigation.state.params.capital,
          daten: [],
          isLoading: true,
          uri:[],
          city: this.props.navigation.state.params.city,
          item: this.props.navigation.state.params.item,
        }
      }

      componentDidMount(){
        this.setState({daten:data,isLoading:false,uri:list});
    
      }
      getItemList = () => {
        var country = this.state.capital;
        for(var i = 0;i<data.length;i++) {
          var obj = data[i];
          if(obj.country == country){
          return i;
          }
        }
      }

      getWeatherdata = () => {
        this.getlocation(this.state.city);

        fetch('https://api.darksky.net/forecast/0ec0969177cad38274e16129efe15524/'+this.state.lat+","+this.state.long+"," + moment().unix())
        .then((response) => response.json())
        .then((responseJson) => {
          this.setState({dataSource: responseJson.currently})
          this.setState({summary: responseJson.currently.summary})
          this.setState({timezone: responseJson.timezone})
          this.setState({time: responseJson.currently.time})
          console.log(this.state.dataSource)
          console.log(this.state.summary)
          console.log(this.state.timezone)
          console.log(this.state.time)
          // var myDate = new Date( this.state.time *1000);
          // console.log(myDate.toGMTString());
          // console.log(myDate.toLocaleString())
    
          // console.log(moment().unix())
          // console.log(moment().format('MMMM Do YYYY, h:mm:ss a'))
    
          var converted = moment.tz(this.state.time*1000, this.state.timezone);
          console.log(converted.format('MMMM Do YYYY, h:mm:ss a'))
          console.log(converted.format())
        })
        .catch((error) => {
          console.error(error);
        });
      }
    
      getlocation = (text)=>
 {
  Geocoder.init('AIzaSyBLV2i0Gpw0IYKCKVwf4nfVLaVHEw2vXT0');
  var abc="";
   Geocoder.getFromLocation(text).then(
     json => {
     var location =json.results[0].geometry.location;
        this.setState({lat :location.lat,  long:location.lng})
    },
     error => {
       alert(error);
     }
   );
  }  
      

      showInformation = (text) => {
  
        if(text == this.state.uri[0].name){
            var information = this.state.daten[this.getItemList()].countryInformation;
            return information;        
        }
        if(text == this.state.uri[1].name){
          var information = this.state.daten[this.getItemList()].Visa;
          return information;        
      }
      if(text == this.state.uri[2].name){
        var information = this.state.daten[this.getItemList()].cost;
        return information;        
    }
    if(text == this.state.uri[3].name){
      var information = this.state.daten[this.getItemList()].Climate;
      return information;        
  }
  if(text == this.state.uri[4].name){
    var information = this.state.daten[this.getItemList()].Job;
    return information;        
}
if(text == this.state.uri[5].name){
  var information = this.state.daten[this.getItemList()].healthcover;
  return information;        
}
if(text == this.state.uri[6].name){
  var information = this.state.daten[this.getItemList()].safety;
  return information;        
}
if(text == this.state.uri[7].name){
  var information = this.state.daten[this.getItemList()].safety;
  return information;        
}

if(text == this.state.uri[8].name){
  return information;        
}


  
      }

      render() {
        if(this.state.isLoading){
          return(
            <View style={{flex: 1, padding: 20}}>
              <ActivityIndicator/>
            </View>
          )
        } 
        return (
          <ScrollView>
            <Image
            style={{width:"100%",height: 200}}
            source={{uri:this.state.daten[this.getItemList()].picture}}
          />

            <Text>{this.getWeatherdata()} </Text>
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
    },
    CountryInformation: {
      screen: CountryInformation,
    },
    DetailsScreen: {
      screen: DetailsScreen,
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
       fontSize: 23,
       textAlign: 'center',
       color: '#000',
    },
   
    rowViewContainer: 
    {
   
      fontSize: 18,
      paddingRight: 10,
      paddingTop: 10,
      paddingBottom: 10,
      marginTop: 3
   
    },input: {
        margin: 15,
        height: 40,
        borderColor: 'grey',
        borderWidth: 1
     }
  });
  
  export default createAppContainer(AppNavigator);