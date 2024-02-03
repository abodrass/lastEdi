import React from 'react'
import { LinearGradient } from 'expo-linear-gradient';
import { usePageContext } from "../../../PageProvider";
import { styles } from '../../ScreensStyles/dashbordStyles';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator , CardStyleInterpolators} from '@react-navigation/stack';
import { StyleSheet, ScrollView,Text, View, Image, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform,TouchableWithoutFeedback,  Keyboard } from 'react-native';
import { boxData } from './boxData';
import Boxs from './Boxs';
import DocPost from './doctorPost/DocPost';
import Ashbord from './Ashbord';
import MainPostNav from './patientPost/mainNav';
import { useFocusEffect } from '@react-navigation/native';
const Dashbord = () => {
    const Stack = createStackNavigator();
    const {darkMood,setDarkMood}= usePageContext();
    const {language,setLanguage}= usePageContext();
    const {headerTitel,setHeaderTitel}= usePageContext();
    useFocusEffect(()=>{
        setHeaderTitel(language?"الصفحة الرئيسية":"main page");
    });
    return (
        <NavigationContainer independent={true} >
            <Stack.Navigator
                initialRouteName="Asborde"
                screenOptions={{
                    headerShown: false,
                    tabBarVisible: false,
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
                }}>
                <Stack.Screen name="Asborde" component={Ashbord} options={{ headerShown: false, tabBarVisible: false }} />
                <Stack.Screen name="DocPost" component={DocPost} options={{ headerShown: false, tabBarVisible: false }} />
                <Stack.Screen name="MainPostNav" component={MainPostNav} options={{ headerShown: false, tabBarVisible: false }} />
            </Stack.Navigator>
        </NavigationContainer> 
    )
}

export default Dashbord;