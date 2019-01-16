import React from 'react';
import { StyleSheet, Text, View,Button,ActivityIndicator ,ListView,Alert,TextInput,FlatList} from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';
import _ from 'lodash';
import Geocoder from 'react-native-geocoding';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import CountryInformation from './CountryInformation'
import data from './data/capital.json';
class WorldClockMain extends React.Component{
constructor(props){
  super(props);
  this.state ={
   text:""

  }
}


getJson=()=>{
  
 
  this.setState({
    
    someData: data.cities,
 }
);
var abc = this.state.someData;
console.log(abc+"");
 
      
  

}

  render(){
    const {navigate} = this.props.navigation;
    return(
<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
<Button
        title="Go to Jane's profile"
        onPress={() => navigate('WorldClockScreen', {name: 'Jane'})}

      />
      <Button title ="Test Json" onPress={ () =>this.getJson()}></Button>
      <FlatList></FlatList>
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


getWeather (){
  return fetch('https://facebook.github.io/react-native/movies.json')
  .then((response) => response.json())
  .then((responseJson) => {

    this.setState({
      fulldata: responseJson.movies,
    }, function(){

    });

  })
  .catch((error) =>{
    console.error(error);
  });

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
            onPress={()=>{/*this.getlocation(rowData.capital);*/navigate('CountryInformation', {capital : rowData.countryName} )}}>{rowData.capital} ({rowData.countryName})</Text>
            }>
        </ListView>
    </View>
  
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