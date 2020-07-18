const request = require('request')
const forcast=(latitude,longitude,callback)=>{
    const url='http://api.weatherstack.com/current?access_key=7cc3246aec29a572d32c18685153ae53&query='+latitude+','+longitude+'&units=m'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to connent to service!',undefined)
         }else if(body.error){
             callback('Unable to find location,try again!',undefined)
            }else{
                callback(undefined,body.current.weather_descriptions[0]+', The current degree is '+ body.current.temperature +' out.')
            }
    })
}
module.exports=forcast