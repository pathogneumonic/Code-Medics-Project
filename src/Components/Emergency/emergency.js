import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import axios from "axios";
import LocationContext from "./locationContext";
import Button from "../Button/button";
import './emergency.css'

const Emergency = () => {
    const [help, setHelp] = useState('');
    const coordinates = React.useContext(LocationContext);
    let history = useHistory();
    const url = 'https://nothingyet.com';

    const getHelp = (e) => {
        console.log('clicked!');
        setHelp(e.target.props.service);

        axios.post(url, {
            emergencyType: help,
            userLocation: coordinates
        })
            .then(
                console.log('posted')
            )
            .then(redirect())
            .catch((err) => {
                console.log(err)
            });
    }

    const redirect = () => {
        history.push('/location')
    }

    return (
        <div>
            <div className="option option__head">
                <a href="/">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10.8408 16.3107L18.5307 24.1413L20.3743 22.3333L14.4885 16.3437L20.4819 10.4631L18.6727 8.6208L10.8408 16.3107Z" fill="#1D3354" />
                    </svg>
                </a>
                <h1 className="heading__home">What is the nature of your emergency?</h1>
                <p>This will help us narrow down the search for specialist hospitals.</p>
            </div>

            <div className="option">
                <h2>Surgical</h2>
                <p>Examples are accidents, burns etc.</p>
                <Button text="Get surgical help" service="obstetrics" onClick={getHelp} />
            </div>

            <div className="option">
                <h2>Medical</h2>
                <p>Examples are sudden pain, collapse etc.</p>
                <Button text="Get medical help" service="obstetrics" onClick={getHelp} />
            </div>

            <div className="option">
                <h2>Obstetric</h2>
                <p>Get help for pregnant women and women in labour.</p>
                <Button text="Get obstetric help" service="obstetrics" onClick={()=> {
                    console.log('clicked');
                    getHelp();
                }} />
            </div>
        </div>
    );
}

export default Emergency

//on click, post user location and required service to server>>>
//which means, html5 geolocation, then post request>>>
//do this via state >>>
//redirect to interim page>>>, retain location info
//use info with Google Maps API