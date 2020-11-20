import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
//import AppSQL from './AppSQL.js';
import Money from './Money.js';
import Weather from './weather.js';



export default function App(){

  let [data,setData]=useState('');
  let location=data.components? JSON.stringify(data.components.county):"";
  const [ErrorMsg,setErrorMsg]=useState(null);
  
  function useCoords() {
    const [coords, setCoords] = useState({
      latitude: null,
      longitude: null
    });
    
    let geoId;
  
  
  useEffect(() => {
    (async () =>{
      let {status}=await geoId.requestPermissionAsync();
      if(status !== 'granted'){
        setErrorMsg ('Permission to access location was denied');
      }
      geoId = window.navigator.geolocation.watchPosition(position => {
        setCoords({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude, 
        })
      })
        return () => {
          navigator.geolocation.clearWatch(geoId)
        }    
      })
      
      return coords
    })
  }
  
  
  function useData(){
    const coords = useCoords();
    //fetch location
    useEffect(()=>{
      
      (async()=>{
        try{
          
          let response=await fetch(
            // 'https://api.opencagedata.com/geocode/v1/json?q='+coordenades.latitude+'+'+coordenades.longitude+'&key=742050ffe3dc4bbc9c854947bc9764ad'
            `https://api.opencagedata.com/geocode/v1/json?q=${coords.latitude}+${coords.longitude}&key=742050ffe3dc4bbc9c854947bc9764ad`,
            );
            let {results}=await response.json();
            setData(results[0]);
            
          } catch(error){
            //console.log(error)
          }
        })();
      },[coords]);
    }
    
    useData();
    console.log(location);
    console.log(data);
    
  
    return(
      <View style={styles.container}>
      <Text style={{textAlign:'center',color:'white',backgroundColor:'green',marginTop:50,marginLeft:50,marginRight:50,fontSize:50}}>Welcome</Text> 
      <Text style={{textAlign:'center',color:'white',backgroundColor:'green',marginBottom:50,marginLeft:50,marginRight:50,fontSize:50}}>is nice to see you here</Text>
      <Text style={{color:'green',fontSize:10,fontStyle:'italic',margin:10}}>You are in</Text> 
      <Text>{data.components? JSON.stringify(data.components.county):""}</Text>
      <Text style={{color:'green',fontSize:10,fontStyle:'italic',margin:10}}>The temperature is:</Text>
      <Weather data={data}/>
      <Text style={{color:'green',fontSize:10,fontStyle:'italic',margin:10}}>If you require currency exchange rate here is a converter</Text>
      <Money data={data}/>
      </View>
      );
}
    
    const styles=StyleSheet.create({
      container: {
        flex:1,
        backgroundColor: '#fff',
        alignItems:'center',
        justifyContent:'center',
      },
    });
