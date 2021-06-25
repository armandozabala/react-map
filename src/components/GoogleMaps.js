import React, { useEffect, useState } from 'react'
import { withGoogleMap, GoogleMap, withScriptjs, Marker } from "react-google-maps"
import { useLocation } from '../hooks/useLocation';
import { Loading } from './Loading';


const GoogleMaps = () => {

    const { hasLocation, markers, setMarkers, sendPosition, addMarker } = useLocation();

    useEffect(() => {

        console.log("Total",markers.length)
        console.log(markers)

    },[])

    if (!hasLocation)  return <Loading /> 


    const addMarkers = (lat, lng) => {
        let loc = {
            latitude: lat,
            longitude: lng
        }
        setMarkers([...markers, loc])
        addMarker(lat,lng)

    }

    const sendCoords = (lat, lng, index) => {
        //markers[index] = { latitude: lat, longitude: lng }
        //sendPosition(lat, lng)
  
        
    }


    return (
        <>
        <Map
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDw5Hm1y6CwPFFlDjT3aXXEdai9eTdFdXA"
                containerElement={<div style={{ height: '100vh' }} />}
                mapElement={<div style={{ height: `100%` }} />}
                loadingElement={<div style={{ height: `100%` }} />}
                latitude={markers[0].latitude}
                longitude={markers[0].longitude}
                sendPosition={sendPosition}
                markers={markers}
                addMarkers={addMarkers}
                sendCoords={sendCoords}
            >
            </Map>
            <p>{ markers.length }</p>
      </>
    )
}

export default GoogleMaps;


const Map = withScriptjs(
    withGoogleMap( props =>
          <GoogleMap
            defaultZoom={15}
            onClick={({latLng}) => props.addMarkers(latLng.lat(), latLng.lng(), props)}
             defaultCenter={{ lat: props.latitude, lng: props.longitude }}
        >
           
            {

                props.markers.map((mar, index) => (
                    <Marker
                            key={index}
                            position={{ lat: mar.latitude, lng: mar.longitude }}
                            draggable
                            onClick={() => console.log("ok")}
                            onDrag={({latLng}) => props.sendCoords(latLng.lat(), latLng.lng(), index)}
                   />
                ))
            }
    
                        
         </GoogleMap>
          
    )
)

