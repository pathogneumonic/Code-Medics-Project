import React from 'react';

const ProviderInstance = (props) => {
    const callUrl = `tel:${props.data.contact}`;
    return (
        <div className="provider-info">
            <div key={props.data.id} className="info">
                <h2>props.data.name</h2>
                <p>props.data.address</p>
                <p>props.data.eta</p>
            </div>
            <a className="btn" href={callUrl}>Call</a>
        </div>
    )
}

export default ProviderInstance;
