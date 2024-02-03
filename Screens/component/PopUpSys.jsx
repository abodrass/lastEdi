
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput,StyleSheet,TouchableOpacity } from 'react-native';
import { usePageContext } from '../../PageProvider'
import axios from 'react-native-axios';
import { url } from '../../APIURLS';
import  DateTimePicker  from '@react-native-community/datetimepicker';
const PopUpSys = (props) => {
    const {showDelete, setShowDelete}= usePageContext();
    const {appotmentId,setappotmentId}= usePageContext();
    const {darkMood,setDarkMood}= usePageContext();
    const {tokenFlag, setTokenFlag}= usePageContext();
    const {showEdit, setEdit}= usePageContext();
    const {token,setToken}= usePageContext();
    const {language,setLanguage}= usePageContext();
    const [placeHolder,setPlaceHolder]=useState();
    const [data,setData]=useState();
    const [time ,setTime]=useState(new Date());
    const [date,setDate]=useState( new Date());
    const [oldDate,setOldDate]=useState();
    const [showDateBox,setShowDateBox]=useState(false);
    const [showTimeBox,setShowTimeBox]=useState(false);
    let dateChangeFlag=false;
    useEffect(() => {
        const fetchData = async () => {
            console.log("Bearer " + token.replace(/"/g, ''));
            const headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Origin': 'http://localhost:19006',
                'Authorization': "Bearer " + token.replace(/"/g, ''),
            };
            try {
                const response = await axios.get(`${url.GetAppointmentById}/${appotmentId}`, {
                    headers: headers,
                });
                if (response.status === 200) {
                    setData(response.data);
                    setPlaceHolder(response.data.dentistDescription);
                    setOldDate(response.data.date);
                }
            } catch (error) {
                console.error("delet faild with status:", response);   
                // Handle unexpected errors
            } finally {
                // Hide loading indicator or enable the login button here
                console.error("delet faild with status:", response);   
            }
        };
    
   
            fetchData();
       
        
    }, []);


    const onDateChange = (event, selectedDate) => {
        // Call persist to remove the synthetic event from the pool   
        const {
            type,
            nativeEvent: { timestamp, utcOffset },
        } = event;
       // Handle the date change or dismissal here
        if (type === 'set') {
           // User selected a date
            console.log('Selected Date:', selectedDate);
            setDate(selectedDate);
            dateChangeFlag=true;
            console.log('UTC Offset:', utcOffset);
            setShowDateBox(false); 
            event.persist();
            
        } else if (type === 'dismissed') {
           // User dismissed the picker
            console.log('Picker Dismissed');
            setShowDateBox(false);  // Assuming setShowDateBox is defined elsewhere
            event.persist();
        } else if (type === 'neutralButtonPressed') {
           // This is only available on Android when a neutral button is pressed
            setShowDateBox(false);  // Assuming setShowDateBox is defined elsewhere
            console.log('Neutral Button Pressed');
            event.persist();
            }
    };

    const onTimeChange = (event, selectedDate) => {
        // Call persist to remove the synthetic event from the pool   
        const {
            type,
            nativeEvent: { timestamp, utcOffset },
        } = event;
       // Handle the date change or dismissal here
        if (type === 'set') {
           // User selected a date
            console.log('Selected Date:', selectedDate);
            date.setHours(selectedDate.getHours());
            date.setMinutes(selectedDate.getMinutes());
            // Assuming setDate is defined elsewhere
             // Assuming setShowDateBox is defined elsewhere
            dateChangeFlag=true;
            console.log('UTC Offset:', utcOffset);
            setShowTimeBox(false); 
            event.persist();
            
        } else if (type === 'dismissed') {
           // User dismissed the picker
            console.log('Picker Dismissed');
            setShowTimeBox(false);  // Assuming setShowDateBox is defined elsewhere
            event.persist();
        } else if (type === 'neutralButtonPressed') {
           // This is only available on Android when a neutral button is pressed
           setShowTimeBox(false);  // Assuming setShowDateBox is defined elsewhere
            console.log('Neutral Button Pressed');
            event.persist();
            }
    };


    const handelCancelPress=()=>{
        setEdit(false);
        setShowDelete(false);
        setappotmentId(null);
        return;
    }


  const handelEditPress=async()=>{
        console.log("Bearer "+token.replace(/"/g, ''));
                // Your asynchronous code here
                console.log("Bearer "+token.replace(/"/g, ''));
                const headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Origin': 'http://localhost:19006',
                    'Authorization': "Bearer "+token.replace(/"/g, ''),
                };

                const requestBody={
                    date: oldDate,
                    dentistDescription: placeHolder
                }
                try {
                  // Display loading indicator or disable the login button here
                    const response = await axios.put(`http://192.168.1.241:5126/AppointmentAPI/UpdateAppointment/${appotmentId}`,requestBody, {
                    headers: headers,
                    });
                if (response.status === 200) {
                    setShowDelete(false);
                    setEdit(false);
                    setappotmentId(null);
                    return;
                    // Navigate to the next screen or perform other actions
                } else {
                    console.error("delet faild with status:", response);   
                    
                    // Handle specific error cases based on response status or content
                }
                } catch (error) {
                    console.error("An error occurred", error);
                  // Handle unexpected errors
                } finally {
                  // Hide loading indicator or enable the login button here
                }
    }
    const handelDeletePress=async()=>{
        
                console.log("Bearer "+token.replace(/"/g, ''));
                // Your asynchronous code here
                console.log("Bearer "+token.replace(/"/g, ''));
                const headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    'Origin': 'http://localhost:19006',
                    'Authorization': "Bearer "+token.replace(/"/g, ''),
                };
                try {
                  // Display loading indicator or disable the login button here
                    const response = await axios.delete(url.AppointmentDelete+`?appointmentId=${appotmentId}`, {
                    headers: headers,
                    });
                if (response.status === 200) {
                    setShowDelete(false);
                    setappotmentId(null);
                    return;
                    // Navigate to the next screen or perform other actions
                } else {
                    console.error("delet faild with status:", response);   
                    
                    // Handle specific error cases based on response status or content
                }
                } catch (error) {
                    console.error("An error occurred", error);
                  // Handle unexpected errors
                } finally {
                  // Hide loading indicator or enable the login button here
                }
            };



            const handelDatePress=()=>{
                setShowDateBox(true);
            }
            const handelTimePress=()=>{
                setShowTimeBox(true);
            }
            const handelDesChange=(des)=>{
                setPlaceHolder(des);
            }







    if(props.type=="edit"){
        return (
            <View style={styles.container}>
                <View style={darkMood?styles.incontainer:styles.incontainerDark}>
                <TextInput 
                    style={darkMood?styles.des:styles.desBlack}
                    placeholderTextColor={darkMood?"#161616":"#fff"}
                    placeholder={language?"اكتب الوصف الذي تريده"  :'Description|'}
                    value={placeHolder}
                    onChangeText={handelDesChange}
                    ></TextInput>

            <TouchableOpacity style={styles.Date} onPress={handelDatePress} >
                    <Text style={styles.PostInButtonText}>{!language?"edit the date" :"عدل التاريخ"}</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.Date} onPress={handelTimePress} >
                    <Text style={styles.PostInButtonText}>{!language?"edit the Time" :"عدل الوقت"}</Text>
                </TouchableOpacity>

                {showDateBox&&
                <DateTimePicker
                value={date}
                onChange={onDateChange}
                ></DateTimePicker>
            }
            {showTimeBox&&
                <DateTimePicker
                value={time}
                onChange={onTimeChange}
                mode='time'
                ></DateTimePicker>
            }
            
                    <TouchableOpacity style={styles.cancelBo1} onPress={handelCancelPress}>
                        <Text style={styles.PostInButtonText}>{!language?"Cancel":"الغاء"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.editBo} onPress={handelEditPress}>
                        <Text style={styles.PostInButtonText}>{!language?"edit":"تعديل"}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
    else{
    return (
        <View style={styles.container}>
            <View style={styles.incontainer}>
                <Text style={styles.text}>{!language?"Are You sure You Want to Delete the Appointment":"هل انت متاكد من حذف الموعد"}</Text>
                <TouchableOpacity style={styles.cancelBo} onPress={handelCancelPress}>
                    <Text style={styles.PostInButtonText}>{!language?"Cancel":"الغاء"}</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteBo} onPress={handelDeletePress}>
                    <Text style={styles.PostInButtonText}>{!language?"delete":"حذف"}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
}

const styles = StyleSheet.create({
    container:{
        
        alignItems:"center",
        justifyContent:"center",
        width:'100%',
        height:700,
        backgroundColor:'#ffffff00'
    },
    incontainer: {
        width:"80%",
        height:"70%",
        position:'relative',
        backgroundColor:'white',
        borderRadius:30,
        padding:30
    },
    incontainerDark:{
        width:"80%",
        height:"70%",
        position:'relative',
        backgroundColor:'#161616',
        borderRadius:30,
        padding:30
    },
    text: {
        position:'absolute',
        top:'10%',
        left:'10%',
        fontSize: 18,
        color:'red',
    },
    editBo:{
        position:"absolute",
        backgroundColor:"green",
        top:"100%",
        left:"10%",
        alignItems:'center',
        justifyContent:'center',
        width:"30%",
        height:35,
        borderRadius:20,
        color:"red"
    },
  
    picker: {
        width: 150,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
      
    },
    selectedGender: {
        marginTop: 20,
        fontSize: 16,
    },
    cancelBo:{
        position:"absolute",
        backgroundColor:"#4cb5f9",
        top:"90%",
        left:"80%",
        alignItems:'center',
        justifyContent:'center',
        width:"30%",
        height:35,
        borderRadius:20,
        color:"#fff"
    },
    cancelBo1:{
        position:"absolute",
        backgroundColor:"#4cb5f9",
        top:"100%",
        left:"80%",
        alignItems:'center',
        justifyContent:'center',
        width:"30%",
        height:35,
        borderRadius:20,
        color:"#fff"
    },
    PostInButtonText: {
        color: 'white',
        fontWeight: '800',
    },
    deleteBo:{
        position:"absolute",
        backgroundColor:"red",
        top:"90%",
        left:"10%",
        alignItems:'center',
        justifyContent:'center',
        width:"30%",
        height:35,
        borderRadius:20,
        color:"red"
    },
    PostInButtonText: {
        color: 'white',
        fontWeight: '800',
    },

    des:{

        width:"100%",
        height:140,
        paddingLeft:15,
        paddingRight:20,
        color:"black",
        fontSize:18,
    },
    desBlack:{
        width:"100%",
        height:140,
        paddingLeft:15,
        paddingRight:20,
        color:"white",
        fontSize:18,
    },
    Date:{
        alignSelf:'center',
        justifyContent:'center',
        width:"30%",
        height:70,
        backgroundColor:"#4cb5f9",
        color:"white",
        borderRadius:10,
        marginTop:30,
        justifyContent:'center',
        alignItems:"center",
        padding:15,
        margin:10
    },

    catagory:{
        borderStyle:"solid",
        width:'26%',
        height:26,
        backgroundColor:"#4cb5f9",
        borderRadius:10,
        position: 'absolute',
        bottom: 9,
        left: 50,
        right: 0,
        alignItems:"center",
        justifyContent:"center"
    },
    DateValue:{
        borderStyle:"solid",
        width:'26%',
        height:26,
        backgroundColor:"#4cb5f9",
        borderRadius:10,
        position: 'absolute',
        bottom: 9,
        left: 170,
        right: 0,
        flexDirection:"row",
        alignItems:"center",
        justifyContent:"center",

    },
    TimeValue:{
        borderStyle:"solid",
        width:'26%',
        height:26,
        backgroundColor:"#4cb5f9",
        borderRadius:10,
        position: 'absolute',
        bottom: 9,
        left: 290,
        right: 0,
        alignItems:"center",
        justifyContent:"center",
        flexDirection:"row",
    },

    photo:{
        alignSelf:'center',
        width:"90%",
        height:300,
        borderRadius:25,
        justifyContent:'center',
        alignItems:"center",
        padding:15,
        left:5,
        overflow:'hidden'
    },
    uploadText:{
        alignSelf:"flex-start",
        bottom:30,
        
    },
    uploadTextAr:{
        alignSelf:"flex-end",
        bottom:10,
        color:"rgba(182, 181, 181, 0.549)"
    },
    uploadIcon:{
        bottom:5,
        
    },

    postbo:{
        position:"absolute",
        backgroundColor:"#4cb5f9",
        left:"80%",
        width:"20%",
        height:35,
        borderRadius:20,
        justifyContent:'center',
        alignItems:"center",
        color:"#fff"
    },
    PostInButtonText: {
        color: 'white',
        fontWeight: '800',
    },
    box: {
        width: '42%', // Adjust width as needed, leaving some space for margin
        height: 200,
        backgroundColor: 'rgba(71, 69, 69,.7)',
        marginLeft:'6.5%',
        marginTop:'10%',
        borderRadius:21,
        overflow:'hidden'
    
    },
    pickers:{
        width:"100%",
        flexDirection:'row',
        alignItems:"center",
        justifyContent:'center'
    },
    pic:{

        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 0,
    },
    boxDark: {
        width: '42%', // Adjust width as needed, leaving some space for margin
        height: 200,
        backgroundColor: 'rgba(255, 255, 255, 0.727)',
        marginLeft:'6.5%',
        marginTop:'10%',
        borderRadius:21,
        overflow:'hidden' 
        },
        allview:{
            flex:1
        }
  });

export default PopUpSys