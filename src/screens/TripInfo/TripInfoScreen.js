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
    FlatList
} from "react-native";

import { translate} from "helpers/utils";
import R from "res/R";

export default class TripInfoScreen extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            travel: [{
                id: "1", title: "flight",img: R.images. airplane_Lightblue,description:"#123456"
            },
            {
                id: "2", title: "Airport Pickup",img: R.images.car_,description:"8th October 15:00h"
            },],
            perks:[],
            reservations:[],
            token: "",
            isLoading: false,
        };
    }

    
    componentDidMount() {
    }

    keyExtractorTravel = (item) => {
        return 'travel-' + item.id;
      }

    renderItemTravel = ({ item }) => {
        return (
            <View style={styles.item}>
            <View style={{ backgroundColor: "#48D52C", width: 4, height:'100%' }} />
            <Image style={{ color:  R.colors.blue, height: '100%', width: 30, resizeMode:"contain"}} source={item.img} />
          <View style={{}} >
            <Text style={{ color:  R.colors.blue, fontWeight: "bold",textTransform: 'uppercase' }}>
           { translate(item.title)}  
             </Text>
             <Text style={{ color: "gray", }}>
           { translate(item.description)}  
        </Text>
      </View>


      <TouchableOpacity onPress={() => { this.showInfo(item.idDocument) }}>
      <Image source={R.images.caret_right} style={styles.sectionLinkImage} />
      </TouchableOpacity>
    </View>
    
        )
      }
    render() {
        // const place = this.state.place;
        // const image = { uri: place.ImageReference };
        return (
         <ScrollView style={styles.container}>
         
         
            {/* ------------------------   travel section   -------------------------*/}
            
            <Text style={styles.sectionTitle}>    { translate('Travel')}  </Text>
            <View style={styles.container}>
                 {this.state.isLoading ? <ActivityIndicator size="large" color="blue" />
                     :
                    <FlatList
                      data={this.state.travel}
                    renderItem={this.renderItemTravel}
                    
                       getItemLayout={(data, index) => (
                      { length: 60, offset: 60 * index, index }
                    )}
                 />
              }
          </View>
         
        </ScrollView>
         
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

    sectionTitle:{
        paddingBottom: 10,
        paddingTop: 15,
        textTransform: "uppercase",
        color:  R.colors.lightBlue,
        fontWeight:"bold",
        fontSize: 15
    },
    Screentitle:{
    
        backgroundColor: R.colors.blue,
        color:"white",
        height: 80,
        
      paddingTop: 40,
      textAlign:"center",
      fontSize:20,
      fontWeight: "bold"
    },
      item: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: "white",
        justifyContent: 'space-between',
        height: 60,
        marginBottom: 0,
        alignItems:'center'
      },
      icon: {
        width: 10,
        margin:10
      },
      sectionLinkImage: {
        width: 15,
        height: 15,
        marginStart: "auto",
        marginEnd:10,
        resizeMode:'contain'
    }
});