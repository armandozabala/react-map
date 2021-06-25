import { useEffect, useState, useRef } from "react"
import socketIOClient from "socket.io-client";
const SOCKET_SERVER_URL = "https://react-mapas-server.herokuapp.com";

export const useLocation = () => {
    
    const [hasLocation, setHasLocation] = useState(false);

    const [markers, setMarkers] = useState([])

    const socketRef = useRef();
    const roomId = useRef("Room");
    let mar = []
  
    useEffect(() => {

        socketRef.current = socketIOClient(SOCKET_SERVER_URL, {
            query: {
                mapRoom: roomId.current
            },
        });

        socketRef.current.on("connect", () => {
           console.log(socketRef.current.id);
        });

         socketRef.current.on("points", (res) => {
               let punticos = res.map(r => ({
                 
                     latitude: r.latitude,
                     longitude: r.longitude
                 
             }))
           
        
         });    
        
        /* socketRef.current.on("add", (res) => {
             console.log(res);
             mar.push(res);
            // addMarker(res.latitude, res.longitude);
             setMarkers([...mar]);
        });*/

    

    }, [])

    useEffect(() => {

        navigator.geolocation.getCurrentPosition((res) => {

    
            setMarkers([{
                latitude: res.coords.latitude,
                longitude: res.coords.longitude
            }]);
        
            setHasLocation(true);
            
        })

     
    }, [])
    
    const addMarker = (lat, lng) => {
        let data = {
            latitude: lat,
            longitude: lng
        }

        socketRef.current.emit('add', { data } )
    }

    const sendPosition = (lat, lng) => {
        let data = {
            latitude: lat,
            longitude: lng
        }
        socketRef.current.emit('position', { data } )
    }
    
    return {
        markers,
        setMarkers,
        hasLocation,
        sendPosition,
        addMarker
    }
}
