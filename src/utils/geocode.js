const request=require('request');

const geoCode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURI(address)+'.json?access_token=pk.eyJ1IjoicmFqZXNoMzIiLCJhIjoiY2wyZWtsN3h6MDFrMTNjbXJteGFnYTc3cyJ9.fSNF4vPdQto_KQM8Y-idMQ&limit=1';

    request({url,json:true},(error,{body})=>{
        if(error){
            callback("Unable to connect with network");
        }else if(body.features.length === 0){
            callback("Unable to find the location");
        } else { 
            const longitude = body.features[0].center[0];
            const latitude = body.features[0].center[1];
            const location = body.features[0].place_name;
            callback(undefined,{
                    'longitude':longitude,
                    'latitude':latitude,
                    'location':location
                });
        }
    });
};

module.exports = geoCode;