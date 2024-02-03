import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { usePageContext } from '../../../PageProvider'; // Import your page context as needed
import MapView , { Marker } from 'react-native-maps';
const Location = () => {
    const { darkMood, language } = usePageContext();

    const firstLocation = {
        latitude: 32.537289,
        longitude: 35.858417,
    };
    const secLocation={
        latitude: 32.499387,
        longitude: 35.993322,
    }
    return (
        <View style={{ alignItems: 'center', paddingTop: 20, width: '100%', height: '100%', backgroundColor: darkMood ? "#161616" : "#fff" }}>
            
            <View style={{ alignItems: 'center', width: '100%', height: '50%' ,top:'2%', backgroundColor: darkMood ? "#161616" : "#fff"  }}>
                <Text style={{color:!darkMood ? "#161616" : "#fff", bottom:10 ,fontSize:16}}>{language ? 
            
                "الموقع الاول : اربد مقابل مدينة الحسن الرياضية في شارع الدفاع" : "first location : irbid  Opposite Al-Hasan Sport City"}
                </Text>
                <View style={{width:'90%' ,height:'80%' ,borderRadius:25 ,overflow:'hidden' }}>
                <MapView
                    style={{width:'110%' ,height:'110%' }}
                    initialRegion={{
                    latitude: firstLocation.latitude,
                    longitude: firstLocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    }}
                >
                    <Marker coordinate={firstLocation} title="Your Location" />
                </MapView>
                </View>
        </View>
<Text style={{color:!darkMood ? "#161616" : "#fff", bottom:10 ,fontSize:16}}>{language ? 
            
            "الموقع الثاني :جامعة العلوم والتكنولوجيا في المباني الطبيه D" : "The second location :Jordan University of Science and Technology in the Medical Buildings D."}
            </Text>

            <View style={{width:'90%' ,height:'45%' ,borderRadius:25 ,overflow:'hidden' }}>
                <MapView
                    style={{width:'110%' ,height:'105%' }}
                    initialRegion={{
                    latitude: secLocation.latitude,
                    longitude: secLocation.longitude,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                    }}
                >
                    <Marker coordinate={secLocation} title="Your Location" />
                </MapView>
                </View>
        </View>
    );
};

export default Location;