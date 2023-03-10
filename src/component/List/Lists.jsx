import React,{useState,useEffect,createRef} from 'react'
import {CircularProgress,Grid,Typography,InputLabel,MenuItem,FormControl,Select} from '@material-ui/core'
import useStyles from './styles'
import PalceDetails from '../PlaceDetails/PalceDetails'

function Lists({places,ChildClick,isLoading,setRating,rating,type,setType}) {
  const classes=useStyles()
  
  const [elRefs,setElRefs]=useState([])
  
  
 
  //   useEffect(() => {
  //   const refs = Array(places.length).fill().map((_, i) => refs[i] || createRef());
  //   setElRefs(refs)
  // }, [places]);

  return (
    <div className={classes.container}>
        <Typography variant='h4'>Restaurents, Hotels and attraction around you</Typography>
        {isLoading? (
          <div>
            <CircularProgress size='5rem'/>
          </div>
        ) : (  
          <>
        <FormControl className={classes.formControl}>
           <InputLabel>Type</InputLabel>
          <Select value={type} onChange={(e)=>setType(e.target.value)}>
            <MenuItem value='restaurants'>Restaurants</MenuItem>
            <MenuItem value='hotels'>Hotels</MenuItem>
            <MenuItem value='attractions'>Attractions</MenuItem>
          </Select>
        </FormControl>
        <FormControl className={classes.formControl}>
          <InputLabel>Rating</InputLabel>
          <Select value={rating} onChange={(e)=>setRating(e.target.value)}>
            <MenuItem value={0}>All</MenuItem>
            <MenuItem value={3}>Above 3</MenuItem>
            <MenuItem value={4}>Above 4</MenuItem>
            <MenuItem value={4.5}>Above 4.5</MenuItem>
          </Select>
        </FormControl>
        <Grid container spacing={3} className={classes.list}>
          {places?.map((place,i)=>(
            <Grid  item key={i} xs={12}>
              <PalceDetails selected={Number(ChildClick) === i} refProp={elRefs[i]} place={place}/>
            </Grid>
          ))}
        </Grid>
        </>
        )}
    </div>
  )
}

export default Lists