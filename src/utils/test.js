const request = require('request')

    const url='http://api.weatherstack.com/current?access_key=7cc3246aec29a572d32c18685153ae53&query=New%20York'
    request({url:url,json:true},(error,response)=>{
        
                console.log(response.body.current.temperature)
            
    })
