import React, { useEffect, useRef } from "react";
import Script from "next/script";

import Papa from "papaparse";


const MAP_CENTER_POS = {
  lat: 46.51131,
  lng: -84.332507, 
}
const HEADQUARTERS_POS = {
  latitude: 43.0895131,
  longitude: -80.1060917, 
}

function MapExample() {
  const mapRef = useRef();
  const [myMap, setMyMap] = React.useState(null);
  const [posWatcher, setPosWatcher] = React.useState(null);
  const [myPos, setMyPos] = React.useState(null)
  const [driverMarker, setDriverMarker] = React.useState(null);

  
  function handleGoogleMapsInit() {

    /* Position watcher */
    const watchId = navigator.geolocation.watchPosition(
      position => {
        setMyPos(position);

      }
    );
    setPosWatcher(watchId);

    /* Map Init */
    let google = window.google;
    
    const mapOptions = {
      zoom: 6,
      center: MAP_CENTER_POS,
      scrollwheel: true,
      zoomControl: true,
      styles: [
        {
          featureType: "administrative",
          elementType: "labels.text.fill",
          stylers: [{ color: "#444444" }],
        },
        {
          featureType: "landscape",
          elementType: "all",
          stylers: [{ color: "#f2f2f2" }],
        },
        {
          featureType: "poi",
          elementType: "all",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "road",
          elementType: "all",
          stylers: [{ saturation: -100 }, { lightness: 45 }],
        },
        {
          featureType: "road.highway",
          elementType: "all",
          stylers: [{ visibility: "simplified" }],
        },
        {
          featureType: "road.arterial",
          elementType: "labels.icon",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "transit",
          elementType: "all",
          stylers: [{ visibility: "off" }],
        },
        {
          featureType: "water",
          elementType: "all",
          stylers: [{ color: "#cbd5e0" }, { visibility: "on" }],
        },
      ],
    };

    const newMap = new google.maps.Map(mapRef.current, mapOptions);

    setMyMap(newMap)

    const title = `Grand River Enterprises`;
    const contentString =
      '<div class="info-window-content"><h2>Grand River Enterprises</h2>' +
      "<p>Main headquarters</p></div>";
    
    createMyMarker(newMap, HEADQUARTERS_POS, title, contentString)

  }


  function createMyMarker(map, pos, title, contentString) {
    console.log("[CreateMyMarker]", {
      map,
      pos,
      title,
      contentString
    })
    let google = window.google;

    const marker = new google.maps.Marker({
      position: new google.maps.LatLng(pos.latitude, pos.longitude),
      map,
      animation: google.maps.Animation.DROP,
      title,
    });

   
    const infowindow = new google.maps.InfoWindow({
      content: contentString,
    });

    google.maps.event.addListener(marker, "click", function () {
      infowindow.open(map, marker);
    });
    return marker;
  }

  function handlePosUpdate(pos) {
    if(!driverMarker) {
      const title = `MyDriver`;
      const contentString =
      '<div class="info-window-content"><h2>My Whip</h2>' +
      "<p>Cruising</p></div>";

      setDriverMarker( createMyMarker(myMap, pos.coords, title, contentString) );

    } else {
      driverMarker.setPosition({ lat:pos.coords.latitude, lng: pos.coords.longitude})
    }
  }



  useEffect(()=>{
    if(myPos) handlePosUpdate(myPos)
  }, [myPos]);

  useEffect(()=>{
    return ()=>{
      console.log("Clearing GPS watcher");
      if(posWatcher) navigator.geolocation.clearWatch(posWatcher);
    }
  }, [])
  return (
    <>
    <Script src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_API_KEY}`}
        onLoad={handleGoogleMapsInit}
      />
      <div className="relative w-full h-full rounded">
        <div className="rounded h-full" ref={mapRef}/>
      </div>
    </>
  );
}

export default MapExample;
