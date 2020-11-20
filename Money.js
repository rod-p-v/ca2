import React, {useEffect, useState} from 'react';
import { Text,Button,TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';

export default function Money({data}) {

    let [currency,setCurrency]=useState('');
    let iso = data.currency?JSON.stringify(data.currency.iso_code):"";
    let quotes=currency && currency.quotes;
    //let conversion=currency.currency?JSON.stringify(currency.currency.quotes):"";
    let conversion=quotes && quotes[Object.keys(quotes)[0]]; //indice 46
    const [total,setTotal]=useState('');
    const [amount,setAmount]=useState('');

    useEffect(()=>{
        (async()=>{
          let response=await fetch(
            `http://api.currencylayer.com/live?access_key=bf8dba22be78b921be3e117de693bfbc&currencies=${iso}&source=USD&format=1`,
            );
            let results=await response.json();
            //console.log(results)
            setCurrency(results);
          })();
        },[iso]);
        
        const convert=(amount)=>{
          let total = amount*conversion;
          let n = 0;
          if(total === n){
            setTotal(n);
          }else{
            setTotal(total);
          }
        };

        console.log(iso);
        console.log(conversion);
        console.log(currency);
        
        return(
        <>
          <Text>{iso}</Text>
          <Text>{conversion}</Text>
          <StatusBar style="auto"/>
          
          <TextInput
          onChangeText={(amount)=>setAmount(amount)}
          style={{height:50,borderStyle:'solid',borderColor:'black',borderStartWidth:2}}
          />
          <Button 
          color ="green"
          title="convert"
          onPress={()=>convert(amount)}
          style={{color:'green'}} 
          />
          <Text>{total && total ? total:'Type the amount that you would like to convert'}</Text>
         </> 
          );




}


