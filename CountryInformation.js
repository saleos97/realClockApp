import React from 'react';
import {TouchableHighlight,FlatList, StyleSheet, Text, View,Image,Button,Alert,ActivityIndicator} from 'react-native';
import {List, ListItem } from 'react-native-elements'

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




 /* getData(){
    const data = require('./information.json'); 
    this.setState({daten:data,isLoading:false});

*/

  /*  for(var i = 0; i < data.length; i++) {
      var obj = data[i];
      this.setState({daten:data[i]});
    }*/
  
  
  
  componentDidMount(){
    const data = require('./information.json'); 
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
        <View>
        <View>
          <Image
            style={{width:"100%",height: 100}}
            source={require('./JPG/Tokyo.jpg')}
          />
</View>
<View >
        <List>
          <FlatList
            data={this.state.uri}
            keyExtractor={(x, i) => i.toString()}
            renderItem={({ item }) =>
            <TouchableHighlight
            underlayColor='#006400'>

              <ListItem 
                title={`${item.name}`}
                onPress={()=>Alert.alert("Hallo")}
              />
              </TouchableHighlight>}
          />
        </List>
        </View>
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
  
  export default CountryInformation;