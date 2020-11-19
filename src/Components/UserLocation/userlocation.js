import React from 'react';
import GoogleMapReact from 'google-map-react'
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

    return (
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
    )
}

export default Location;