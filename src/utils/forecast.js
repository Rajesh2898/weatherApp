const request=require('request');

const forecast = (latitue,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=771c8a0d84821dc46bfeb7cadf1ded96&query='+encodeURI(latitue)+','+encodeURI(longitude);
    
    request({url,json:true},(error,{ body })=>{
        if(error){
            callback("Unable to connect with network");
        }else if(body.error){
            callback("Unable to find the location");
        } else {
            callback(undefined,body.current.weather_descriptions[0]+", The temperature is "+body.current.temperature +",it feels like "+body.current.feelslike+'. There is '+body.current.precip+"% chance for rain");
        }
    })
}

module.exports=forecast;