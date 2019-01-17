import React from 'react';
import {TouchableHighlight,FlatList, StyleSheet, Text, View,Image,ScrollView,Alert,ActivityIndicator} from 'react-native';
import {List, ListItem } from 'react-native-elements'
import { createStackNavigator, createAppContainer } from 'react-navigation';
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


class CountryInformation extends React.Component {


  constructor(props){
    super(props);
    this.state={
      isLoading : true,
        capital : this.props.navigation.state.params.capital,
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

                onPress={()=>subtitle="abc"}
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
    render() {
      return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Text>Details Screen</Text>
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const RootStack = createStackNavigator(
    {
      Home: CountryInformation,
      Details: DetailsScreen,
    },
  );


  
  export default createAppContainer(RootStack);