/* Global Variables */

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.toDateString();

const baseUrl='https://api.openweathermap.org/data/2.5/weather?zip=';
const apiKey=',&appid=94574b95dd28c966279545fa31c0f38d&units=imperial';

const server='http://127.0.0.1:4000';

const getData=()=>{
    const zip=document.getElementById('zip').value;
    const feelings=document.getElementById('feelings').value;

    getWeatherData(zip).then((data)=>{
        if(data){
            const{
                main: {temp},
                name: city,
                weather:[{description}],
            }=data;
        

        const info={
            newDate,
            city,
            temp:Math.round(temp),
            description,
            feelings,
        };

        postData(server+'/add',info);
        updateUI();
    }
    });
    
};


const getWeatherData=async (zip)=>{
    
    
    try{
        const res=await fetch(baseUrl+zip+apiKey);
        const data=await res.json();
        if (data.cod!=200)
        throw `${data.message}`;
        
        return data;
    }catch(error){
        console.log(error);
    }
};

document.getElementById('generate').addEventListener('click',getData);

const postData=async (url='',data={})=>{
    const res=await fetch(url,{
        method:'POST',
        headers:{
            'Content-Type':'application/json',
        },
        body: JSON.stringify(data),
    });

    try{
        const newData= await res.json();
        return newData;
    }catch(error){
        console.log(error);
    }
};


const updateUI=async()=>{
const res= await fetch(server+'/all');

try{
    const savedData=await res.json();
    document.getElementById('date').innerHTML='Date: '+ savedData.newDate;
    document.getElementById('temp').innerHTML='Temp: '+ savedData.temp+'&degC';
    document.getElementById('city').innerHTML='City: '+savedData.city;
    document.getElementById('description').innerHTML='Weather: '+savedData.description;
    document.getElementById('content').innerHTML='Feelings: '+savedData.feelings;
    
}catch(error){
console.log(error);
}

};