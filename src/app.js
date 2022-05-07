const express = require('express');
const path = require('path');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast=require('./utils/forecast');


const app = express();
const staticDirectory=path.join(__dirname,'../public')
const viewsDirectory= path.join(__dirname,'../templates/views');
const partialsDirectory=path.join(__dirname,'../templates/partials');

app.use(express.static(staticDirectory));
hbs.registerPartials(partialsDirectory);
app.set('view engine','hbs');
app.set('views',viewsDirectory);
 
app.get('',(req,res)=>{
    res.render('index',{ 
        title:'Weather',
        name:'Rajesh'
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{ 
        title:'About',
        name:'Rajesh'
    });
});

app.get('/help',(req,res)=>{
    res.render('help',{ 
        helpText:'This is for help',
        title:'help',
        name:'Rajesh'
    });
});



app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'Please provide address query'
        });
    }geocode(req.query.address,(error,{location,latitude,longitude}={})=>{
        if(error){
            return res.send({error});
        } forecast(latitude,longitude,(forError,forData)=>{
            if(forError){
                return res.send({error:forError});
            }res.send({ forecast:forData, location,address:req.query.address})
        })
    })
    ;
});

app.get('/help/*',(req,res)=>{
    res.render('404',{
        data:'Help Article not found',
        title:'404',
        name:'Rajesh'
    });
})

app.get('*',(req,res)=>{
    res.render('404',{
        data:'Page not found',
        title:'404',
        name:'Rajesh'
    });
})



app.listen(3000,()=>{
    console.log("Node is running on port 3000");
});