import React,{useEffect,useState} from "react";
import { CssBaseline, Grid } from "@material-ui/core";
import Header from "./component/Header/Header";
import Lists from "./component/List/Lists";
import Map from "./component/Map/Map";

import { getPlacesData } from "./Api";

const App=()=>{
    const [places, setPlaces] = useState([])
    const [ChildClick, setChildClick] = useState(null)
    const [coordinates, setCoordinates] = useState({lat:0,lng:0})
    const [bounds, setBounds] = useState({})
    const [isLoading, setIsLoading] = useState(false)
    const [type, setType] = useState('attractions')
  const [rating, setRating] = useState('')
  const [filteredPlaces, setFilteredPlaces] = useState([])

    useEffect(()=>{
        navigator.geolocation.getCurrentPosition(({coords:{latitude,longitude}})=>{
                setCoordinates({lat:latitude,lng:longitude})
        })
    },[])
    useEffect(()=>{
        const filteredPlaces=places.filter((place)=>place.rating>rating)
        setFilteredPlaces(filteredPlaces)
        
    },[rating])
    useEffect(()=>{
            setIsLoading(true)
        getPlacesData(type,bounds.sw,bounds.ne).then((data) => {
            
            setPlaces(data);
            setIsLoading(false)
        });
        
    },[coordinates,bounds])
    return(
        <>
            <CssBaseline/>
            <Header/>
            <Grid container item xs={12} style={{width:'100%'}}>
                <Grid item xs={12} md={4}>
                    <Lists places={filteredPlaces.length? filteredPlaces : places} ChildClick={ChildClick} isLoading={isLoading} type={type} setType={setType} rating={rating} setRating={setRating}/>
                </Grid>
                <Grid item xs={12} md={8}>
                    <Map setCoordinates={setCoordinates} setBounds={setBounds} coordinates={coordinates} places={filteredPlaces.length? filteredPlaces : places} setChildClick={setChildClick}/>
                </Grid>
            </Grid>

        </>
    )
}

export default App