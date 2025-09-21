
import './App.css'
import { createTheme,ThemeProvider } from '@mui/material'
import Typography from '@mui/material/Typography';
import CloudIcon from '@mui/icons-material/Cloud';
import Button from '@mui/material/Button';
import axios from 'axios';
import { useEffect,useState } from 'react';
import moment from 'moment';
import "moment/dist/locale/ar";
import { useTranslation } from 'react-i18next';

moment.locale("ar")
const theme=createTheme({
  typography:{
    fontFamily:["IBM"]
  }
})

let cancelaxios=null
console.log(moment.locale());
function App() {
 const { t, i18n } = useTranslation();

  const [dateandtime,setdateandtime]=useState("")
const [temp,settemp]=useState({
  Number:null,
  description:"",
  min:"",
  max:"",
  icon:null
}
)
const [local,setlocal]=useState("ar")
function handelchange(){
if(local==="en"){
  setlocal("ar")
  i18n.changeLanguage("ar")
  moment.locale("ar")
}else{
  setlocal("en")
  i18n.changeLanguage("en")
  moment.locale("en")

}
  setdateandtime(moment().format('MMMM Do YYYY, h:mm:ss a'))

}

useEffect(()=>{
  i18n.changeLanguage(local)
},[])

useEffect(()=>{

  setdateandtime(moment().format('MMMM Do YYYY, h:mm:ss a'))
axios.get('https://api.openweathermap.org/data/2.5/weather?lat=30.033333&lon=30.033333&appid=63c5c7c93a349280767c56843a9b5a04',
  {
    cancelToken:new axios.CancelToken((c)=>{
      cancelaxios=c
    })
  }
)
  .then(function (response) {
    // handle success
    const responsetemp=Math.round(response.data.main.temp - 272.15)
    const min=Math.round(response.data.main.temp_min-272.15)
    const max=Math.round(response.data.main.temp_max-272.15)
    const description=response.data.weather[0].description
    const responseicon=response.data.weather[0].icon
    settemp({Number:responsetemp,min:min,max:max,description:description,icon:`https://openweathermap.org/img/wn/${responseicon}@2x.png`})
    console.log(response)
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  })
return()=>{
    cancelaxios();
  
}

},[])

  return (
    <>
    <ThemeProvider  theme={theme}>
    {/* card */}
    <div dir={local==="ar"?"rtl":"ltr"}
    style={{
      
      width:"100%",
      background:"rgb(28 52 91 /36%)",
      padding:"10px",
      borderRadius:"15px",
      boxShadow:"0 11px 1px rgba(0,0,0,0.05)"}} >

{/* content */}
<div>

</div>
{/* end content */}
   
     {/* city & time */}
     <div  style={{display:"flex",justifyContent:"flex-start",alignItems:"end"}}>
 <Typography variant="h1" style={{marginRight:"20px"}}>
        {t("Egypt")}
      </Typography>
 <Typography variant="h5" style={{marginRight:"20px"}} >
       {dateandtime}
      </Typography>
     </div>
     {/* city & time */}
     <hr></hr>
<div 
style={{display:"flex",justifyContent:"space-around"}}>

     {/* degree */}

     <div>
      {/* Temp */}
      <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
        <Typography variant="h1" style={{textAlign:"right"}}>
      {temp.Number}
      </Typography>
      <img src={temp.icon}/>
      </div>
      {/* === Temp ===*/}
        <Typography variant="h6" style={{}}>
      {t(temp.description)}
      </Typography>
        {/* min &max */}
        <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}> 
          <h5>{t("min")} :{temp.min}</h5>
          <h2 style={{margin:"0 10px"}}>|</h2>
          <h5>{t("max")} :{temp.max}</h5>
        </div>
        {/* min &max */}
     </div>

     {/* degree */}
     <CloudIcon style={{
      fontSize:"200px",
      color:"white"
     }} />
     </div>
       </div >
     {/*end card */}
           <Button  sx={{textTransform:"none"}} style={{margin:"20px",fontSize:"20px",color:"white",display:'flex',justifyContent:"start",outline:"none"}} variant="text" onClick={handelchange}>
            {local==="en"?" Arabic":"انجليزي"}
           </Button>
     </ThemeProvider>
    </>
  )
}

export default App
