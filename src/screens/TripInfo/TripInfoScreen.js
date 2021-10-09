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
            backgroundColorTravel:"#48D52C",
            travel: [{
                id: "1", title: "flight",img: R.images. airplaneLightblue,description:"#123456"
            },
            {
                id: "2", title: "Airport Pickup",img: R.images. carLightblue,description:"8th October 15:00h"
            },
            {
                id: "3", title: "Hotel reservation",img: R.images. hotelLightblue,description:"Hotel Gran de Barcelona"
            },
            {
                id: "4", title: "Game trickets",img: R.images. carLightblue,description:"9 Oct Camp Nou Stadium"
            }],

            perks:[{
                id: "1", title: "flight",img: R.images. airplaneLightblue,description:"#123456"
            },
            {
                id: "2", title: "Game trickets",img: R.images. carLightblue,description:"9 Oct Camp Nou Stadium"
            }
           ],
           reservations:[ {
            id: "1", title: "Hotel reservation",img: R.images. hotelLightblue,description:"Hotel Gran de Barcelona"
        },],

            isEmptyPerks:false,
            isEmptyTravel:false,
            isEmptyReservations:false,
            isLoading: false,
        };
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

      navigateTo=()=>{
        this.props.navigation.navigate('MyFlightsScreen');
      }


    keyExtractorTravel = (item) => {
        return 'travel-' + item.id;
    }
    keyExtractorPerks = (item) => {
        return 'perk-' + item.id;
    }
    keyExtractorReservations = (item) => {
        return 'reservation-' + item.id;
    }


// Render All travels 
    renderTravel=()=>{
            return ( 
                <View style={styles.container}>
                    {this.state.isEmptyTravel  ? <View/>
                    :  <Text style={styles.sectionTitle}>    { translate('Travel')}  </Text>}
                    {this.state.isLoading ? <ActivityIndicator size="large" color="blue" />
                    :
                    <View style={{flex: 1, flexDirection: "row", width:"100%"}} >
                    <View style={{ backgroundColor: "#48D52C", width: 4, height:'100%' }} />
                    <View>
                   <FlatList
                     data={this.state.travel}
                      renderItem={this.renderItem}
                      keyExtractor={this.keyExtractorTravel}
                      getItemLayout={(data, index) => (
                     { length: 60, offset: 60 * index, index }
                   )}
                />
                </View>
                </View>
                      }
             
         </View>) 
    }


//   Render All travels 
    renderPerks=()=>{
        return ( 
            <View style={styles.container}>
                {this.state.isEmptyPerks  ? <View/>
                :  <Text style={styles.sectionTitle}>    { translate('Perks')}  </Text>}
                {this.state.isLoading ? <ActivityIndicator size="large" color="blue" />
                :
                <View style={{flex: 1, flexDirection: "row", width:"100%"}} >
                <View style={{ backgroundColor: "#031892", width: 4, height:'100%' }} />
                <View>
               <FlatList
                 data={this.state.perks}
                  renderItem={this.renderItem}
                    keyExtractor={this.keyExtractorPerks}
                  getItemLayout={(data, index) => (
                 { length: 60, offset: 60 * index, index }
               )}
            />
            </View>
            </View>
                  }
         
     </View>) 
}

//  Render All Reservations
   renderReservations=()=>{
    return ( 
        <View style={styles.container}>
            {this.state.isEmptyReservations  ? <View/>
            :  <Text style={styles.sectionTitle}>    { translate('Reservations')}  </Text>}
            {this.state.isLoading ? <ActivityIndicator size="large" color="blue" />
            :
            <View style={{flex: 1, flexDirection: "row", width:"100%"}} >
            <View style={{ backgroundColor: "#DA353D", width: 4, height:'100%' }} />
            <View>
           <FlatList
             data={this.state.reservations}
              renderItem={this.renderItem}
                keyExtractor={this.keyExtractorReservations}
              getItemLayout={(data, index) => (
             { length: 60, offset: 60 * index, index }
           )}
        />
        </View>
        </View>
              }
     
 </View>) 
}

// render item
    renderItem = ({ item }) => {
        return (   
        <TouchableOpacity style={{width:"100%", backgroundColor: "white",flex:1 ,flexDirection:"row",justifyContent:"space-between"}} onPress={() => { this.navigateTo() }}>
            <View style={styles.item}>
            <Image style={{ color:  R.colors.blue, height: '100%', width: 40, margin:10, resizeMode:"contain"}} source={item.img} />
          <View  >
            <Text style={{ color:  R.colors.blue, fontWeight: "bold",textTransform: 'uppercase' }}>
           { translate(item.title)}
             </Text>
             <Text style={{ color: "gray" }}>
           { translate(item.description)}  
        </Text>
       </View>
    </View>
    <View>
      <Image source={R.images.caret_right} style={styles.sectionLinkImage} />
    </View>
</TouchableOpacity>
)}

    
    render() {
        return (
         <ScrollView style={styles.container}>
             {/*=== Travel section === */}
            <View>
            {this.renderTravel()}
          </View>
             {/*=== Perks section === */}
          <View>
            {this.renderPerks()}
          </View>
          {/*=== Reservations section === */}
          <View>
            {this.renderReservations()}
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

      item: {
        flex:1,
        width: "100%",
        flexDirection: 'row',
        backgroundColor: "white",
        height: 60,
        justifyContent:"flex-start",
        alignItems:'center'
      },
    
      sectionLinkImage: {
        width: 15,
        height: 15,
        marginHorizontal:10,
        marginVertical:20,
        resizeMode:'contain'
    }
});