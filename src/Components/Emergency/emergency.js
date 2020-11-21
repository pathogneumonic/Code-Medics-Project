import React, { useContext } from "react";
import { useHistory } from 'react-router-dom';
import HelpContext from "../Contexts/locationContext";
import LocationContext from "../Contexts/locationContext";
import Button from "../Button/button";
import './emergency.css'

const Emergency = () => {
    const location = useContext(LocationContext);
    console.log(location);

    const value = useContext(HelpContext);
    let history = useHistory();
    console.log(value);

    const getHelp = (service) => {
        const [help, setHelp] = value;
        setHelp(service);
        console.log(help);

        redirect();
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
                <Button text="Get surgical help" click={(e) => { getHelp('medical') }} />
            </div>

            <div className="option">
                <h2>Medical</h2>
                <p>Examples are sudden pain, collapse etc.</p>
                <Button text="Get medical help" click={(e) => { getHelp('medical') }} />
            </div>

            <div className="option">
                <h2>Obstetric</h2>
                <p>Get help for pregnant women and women in labour.</p>
                <Button text="Get obstetric help" click={(e) => { getHelp('medical') }} />
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

//context currently returns empty object
//could be because of nestig. Fix.