import React, { useState, useEffect } from 'react';
import GoogleMapReact from 'google-map-react'
import axios from "axios";
import ProviderInstance from './response';
import LocationContext from "../Emergency/locationContext";
import './userlocation.css';


const LocationPin = (props) => (
    <figure>
        <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10.5" cy="10.5" r="10.5" fill="#9A19BA" />
        </svg>
    </figure>
)

const Location = (location, zoomLevel) => {
    location = React.useContext(LocationContext);
    zoomLevel = 8;

    const [providers, setProviders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    let sentRequest = false;
    if (sentRequest === true) { setIsLoading(false) };

    useEffect(() => {
        const fetchInfo = () => {
            let url = "http://domain-name/hospital/find";

            axios.get(url, {
                params: {
                    lat: location.latitude,
                    long: location.longitude,
                    //service: help,
                    return: 5
                }
            })
                .then((res) => {
                    console.log('posted')
                    res.json()
                })
                .then((data) => {
                    const arr = []
                    for (const i of data) {
                        arr.push(i)
                    }
                    setProviders(arr)
                })
                .then(() => sentRequest = true)
                .catch((err) => {
                    console.log(err)
                });
        }

        fetchInfo()
    }, []);

    const RenderLists = () => {
        for (const i of providers) {
            return (
                <ProviderInstance data={i} />
            )
        }
    }

    return isLoading === true ? (
        <div className="location-page">
            <div className="google-map">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: '' }}
                    center={location}
                    zoom={zoomLevel}
                >
                    <a href="/emergency" aria-label="previous page" className="previous">
                        <svg width="11" height="17" viewBox="0 0 11 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.840796 8.31066L8.53067 16.1413L10.3743 14.3333L4.48849 8.34374L10.4819 2.46315L8.67269 0.620804L0.840796 8.31066Z" fill="#1D3354" />
                        </svg>
                    </a>
                    <h1 className="heading__location">Please hold on while we find and contact hospitals near you.</h1 >

                    <LocationPin
                        lat={location.latitude}
                        lng={location.longitude}
                    />
                </GoogleMapReact>
            </div>
        </div>
    ) :
        (
            <div className="response-page">
                <div className="head border-bottom">
                    <a href="/emergency" aria-label="previous page" className="previous">
                        <svg width="11" height="17" viewBox="0 0 11 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.840796 8.31066L8.53067 16.1413L10.3743 14.3333L4.48849 8.34374L10.4819 2.46315L8.67269 0.620804L0.840796 8.31066Z" fill="#1D3354" />
                        </svg>
                    </a>
                    <h1 className="heading__location">Hospitals close by:</h1 >
                </div>
                <div className="border-bottom">
                    <p>
                        Help is on the way. If you do not recieve an ambulance in record
                        time, please call any of the hospitals below.
                    </p>
                </div>
                <div className="providers">
                    <RenderLists />
                </div>
            </div>
        )
}


export default Location;

//compare ETA via distance API
//send alert to medics
//get status of ambulance response
//render response page once it's successful

//send out request to nearest hospitals
//.then call function to query status. Loop through reponses to first call
//if status is pending, repeat call after 5 seconds. End process after 1 minute
//if status still pending, return 'No response, callone of the following'. if response,
//display details and ETA. nearest hospitals container constant