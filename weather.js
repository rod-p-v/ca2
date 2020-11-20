import React, { useEffect, useState } from 'react';
import { Text,Button,TextInput } from 'react-native';
import App from './App'

export default function Weather({data}){
    let [weather,setWeather]= useState();
    let lat = data.geometry?JSON.stringify(data.geometry.lat):"";
    let lng = data.geometry?JSON.stringify(data.geometry.lng):"";
 
   

    function getW(key){
        (async()=>{
            let response=await fetch(
              `http://dataservice.accuweather.com/currentconditions/v1/${key}?apikey=viDOyrOX9jUjgQsqJrIZGRj21IG3LfA9`
              );
              let results=await response.json();
              //console.log(JSON.parse(results[0].Temperature.Metric.Value)+ ' ' +JSON.parse(results[0].Temperature.Metric.Unit))
              setWeather(results[0].Temperature.Metric.Value + ' ' + results[0].Temperature.Metric.Unit);
            })();
          

    }

    useEffect(()=>{
      (async()=>{
        
        let response=await fetch(
        // 'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?q='+lat+'+'+lng+'&apikey=viDOyrOX9jUjgQsqJrIZGRj21IG3LfA9'
         `http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=viDOyrOX9jUjgQsqJrIZGRj21IG3LfA9c&q=${lat},${lng}`
        //'http://dataservice.accuweather.com/locations/v1/cities/geoposition/search?apikey=viDOyrOX9jUjgQsqJrIZGRj21IG3LfA9&q=53.33306%2C-6.24889',
          );
          let results=await response.json();
          console.log(data)
          console.log(results.Key)
          getW(results.Key)
          //setWeather(results);
          
        })();
      },[]);


console.log(lat);
console.log(lng);
    return (
    <Text>{weather}</Text>
    )
}


//Weather  apikey=  	viDOyrOX9jUjgQsqJrIZGRj21IG3LfA9
//207931