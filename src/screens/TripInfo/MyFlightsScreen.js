import React from "react";
import {
    StyleSheet,
    Text,
    ActivityIndicator,
    View,
    ScrollView,
    TouchableOpacity,
    Pressable,
    ImageBackground,
    Image,
    FlatList, SafeAreaView
} from "react-native";

import { Card } from 'react-native-elements'

import { translate} from "helpers/utils";
import R from "res/R";

export default class MyFlightsScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
    
           
    }
    }
    
    componentDidMount() {
        try {
            this.init();
          }
          catch (error) { alert(error) }

    }

    init = () => {
    //    fetshing data 
      }

    //   navigateTo=()=>{
    //     this.props.navigation.navigate('MyFlightsScreen');
    //   }






    
    render() {
        return (
     <View>
         <Card style={{height:"100%"}}>
  <Card.Title style={{textAlign:"left",color:"#374BBF",textTransform:"uppercase"}}>booking details</Card.Title>
  <Card.Divider />

            <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                <Text style={{textTransform:"uppercase", fontSize:"17", color:R.colors.grey}}>Referance</Text>
            <Text>hello</Text>
                </View>
        {/* <View style={styles.user}>
          <Image
            style={styles.image}
            resizeMode="cover"
            source={R.images. airplaneLightblue}
          />
          <Text style={styles.name}>hello</Text>
        </View> */}
 

</Card>
     </View>
        )
    }
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: '100%',
        width: '100%',
        backgroundColor: "#eee",
    },

 
});