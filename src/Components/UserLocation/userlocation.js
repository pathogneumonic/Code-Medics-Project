import React, { useState, useEffect, useContext } from 'react';
import GoogleMapReact from 'google-map-react'
import axios from "axios";
import LocationContext from "../Contexts/locationContext";
import Ambulance from "../Icons/ambulance";
import './userlocation.css';


const LocationPin = (props) => (
    <figure>
        <svg width="232" height="278" viewBox="0 0 232 278" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Group 7">
                <circle id="Ellipse 1" cx="92.5" cy="138.5" r="10.5" fill="#9A19BA" />
                <path id="Subtract" fillRule="evenodd" clipRule="evenodd" d="M93 177C113.987 177 131 159.987 131 139C131 118.013 113.987 101 93 101C72.0132 101 55 118.013 55 139C55 159.987 72.0132 177 93 177ZM93 172.306C111.394 172.306 126.306 157.394 126.306 139C126.306 120.606 111.394 105.694 93 105.694C74.6057 105.694 59.6941 120.606 59.6941 139C59.6941 157.394 74.6057 172.306 93 172.306Z" fill="#9A19BA" fillOpacity="0.7" />
                <path id="Subtract_2" fillRule="evenodd" clipRule="evenodd" d="M93 207C130.555 207 161 176.555 161 139C161 101.445 130.555 71 93 71C55.4446 71 25 101.445 25 139C25 176.555 55.4446 207 93 207ZM93 198.6C125.916 198.6 152.6 171.916 152.6 139C152.6 106.084 125.916 79.4 93 79.4C60.0838 79.4 33.4 106.084 33.4 139C33.4 171.916 60.0838 198.6 93 198.6Z" fill="#9A19BA" fillOpacity="0.5" />
                <path id="Subtract_3" fillRule="evenodd" clipRule="evenodd" d="M93 238C147.676 238 192 193.676 192 139C192 84.3238 147.676 40 93 40C38.3238 40 -6 84.3238 -6 139C-6 193.676 38.3238 238 93 238ZM93 225.771C140.922 225.771 179.771 186.922 179.771 139C179.771 91.0779 140.922 52.2294 93 52.2294C45.0779 52.2294 6.22941 91.0779 6.22941 139C6.22941 186.922 45.0779 225.771 93 225.771Z" fill="#9A19BA" fillOpacity="0.3" />
                <path id="Subtract_4" fillRule="evenodd" clipRule="evenodd" d="M93 278C169.768 278 232 215.768 232 139C232 62.2324 169.768 0 93 0C16.2324 0 -46 62.2324 -46 139C-46 215.768 16.2324 278 93 278ZM93 270C165.349 270 224 211.349 224 139C224 66.6507 165.349 8 93 8C20.6507 8 -38 66.6507 -38 139C-38 211.349 20.6507 270 93 270Z" fill="#9A19BA" fillOpacity="0.2" />
            </g>
        </svg>
    </figure>
)

const Location = (location, zoomLevel) => {
    const values = useContext(LocationContext);
    location = values.coordinates;
    zoomLevel = 8;

    const [help] = values.service;
    const [providers, setProviders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [accepter, setAccepter] = useState({});

    useEffect(() => {
        const arr = []
        let statusId;

        const findHospitals = () => {
            let findUrl = "https://code-medics.herokuapp.com/public/hospital/find";

            axios.get(findUrl, {
                params: {
                    lat: location.latitude,
                    long: location.longitude,
                    service: help,
                    return: 5
                }
            })
                .then((res) => {
                    const data = res.data
                    for (const i of data.data) {
                        arr.push(i)
                    }
                })
        }

        const fetchInfo = () => {
            const getUrl = "https://code-medics.herokuapp.com/ambulance/request/add";
            const idArray = [];
            const responseArray = [];

            axios.get(getUrl, {
                params: {
                    lat: location.latitude,
                    long: location.longitude,
                    count: 5,
                    contact: +2348127955759,
                }
            })
                .then((res) => {
                    const data = res.data
                    for (const i of data.data) {
                        let reqId = i.pivot.ambulance_request_id
                        idArray.push(reqId)
                    }
                })
                .then(() => {

                    for (const i of idArray) {
                        statusId = i
                        const statusUrl = `https://code-medics.herokuapp.com/ambulance/request/${statusId}/query`

                        axios.get(statusUrl)
                            .then((res) => {
                                let response = res.data
                                responseArray.push(response)

                                if (response.data.status === "success") {
                                    setAccepter(response.data.ambulances[0])
                                }
                                else {
                                    //wait, then check again
                                    setAccepter(response.data.ambulances[0])
                                }
                            })
                    }
                })
                .then(findHospitals())
                .then(() => {
                    setProviders(arr)
                })
                .then(() => {
                    setIsLoading(false)
                })
                .catch((err) => {
                    console.log(err)
                });
        }

        fetchInfo();
    }, [help, location.latitude, location.longitude]);


    const Responder = () => (
        <div className="flex provider-info">
            <Ambulance />
            <div className="info">
                <p id="no-margin">Help is on the way from</p>
                <h2>{accepter.name}.</h2>
                <p>{accepter.address}</p>
                <p>{accepter.eta}</p>
                <a className="btn" href={`tel:${accepter.contact}`}>Call</a>
            </div>
        </div>
    )

    const RenderLists = () => (
        providers.map(provider => (
            <div key={provider.id} className="flex provider-info">
                <Ambulance />
                <div className="info">
                    <h2>{provider.name}</h2>
                    <p>{provider.address}</p>
                    <p>{provider.eta}</p>
                    <a className="btn" href={`tel:${provider.contact}`}>Call</a>
                </div>
            </div>
        ))
    )

    return isLoading === true ? (
        <div className="location-page">
            <div className="google-map">
                <GoogleMapReact
                    bootstrapURLKeys={{ key: process.env.REACT_APP_API_KEY }}
                    center={[location.latitude, location.longitude]}
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
                    <a href="/emergency" aria-label="previous page" className="previous__response">
                        <svg width="11" height="17" viewBox="0 0 11 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M0.840796 8.31066L8.53067 16.1413L10.3743 14.3333L4.48849 8.34374L10.4819 2.46315L8.67269 0.620804L0.840796 8.31066Z" fill="#1D3354" />
                        </svg>
                    </a>
                    <h1 className="heading__response">Hospitals close by:</h1 >
                </div>
                <Responder />
                <div className="contacted border-bottom">
                    <p>
                        If you do not receive an ambulance in record
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
//send alert to medics>>>
//get response>>>
//render response page once it's successful >>>

//send out request to nearest hospitals>>>
//.then call function to query status. Loop through reponses to first call
//if status is pending, repeat call after 5 seconds. End process after 1 minute
//if status still pending, return 'No response, callone of the following'. if response,
//display details and ETA. nearest hospitals container constant>>>
