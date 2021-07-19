import { useState } from "react";

export const ClientDetails = (props: any) => {
    const [client, setClient] = useState(props.client);
    const [showDetails, setShowDetails] = useState(false);

    const toggleDetails = (e: any) => {
        e.preventDefault();
        setShowDetails(!showDetails);
    }

    const saveClient = (e: any) => {
        console.log('Save: ' + props.client);
    }

    const deleteClient = (e: any) => {
        console.log('Delete: ' + props.client);
    }

    const handleFormInputChange = (e: any) => {
        e.preventDefault();
        const _client = client;
        const name = e.target.name;
        const value = e.target.value;
        
        _client[name] = value;

        setClient(_client);
    }


    return (
        <div className="item">
            <div className="heading" onClick={toggleDetails}>
                <span>{props.client.name}</span>
                <i>+</i>
            </div>
            {showDetails && (
                <div className="details">
                    <ul className="form">
                        <li>
                            <label>Client name:</label>
                            <input type="text" name="name" className="in-text" value={client.name} onChange={handleFormInputChange} />
                        </li>
                        <li>
                            <label>Zip/Postal code:</label>
                            <input type="text" name="zip" className="in-text" value={client.zip} onChange={handleFormInputChange} />
                        </li>
                    </ul>
                    <ul className="form">
                        <li>
                            <label>Address:</label>
                            <input type="text" name="address" className="in-text" value={client.address} onChange={handleFormInputChange} />
                        </li>
                        <li>
                            <label>Country:</label>
                            <select name="country" onChange={handleFormInputChange}>
                                <option>Select country</option>
                            </select>
                        </li>
                    </ul>
                    <ul className="form last">
                        <li>
                            <label>City:</label>
                            <input type="text" name="city" className="in-text" value={client.city} onChange={handleFormInputChange} />
                        </li>
                    </ul>
                    <div className="buttons">
                        <div className="inner">
                            <a href=" " className="btn green" onClick={saveClient}>Save</a>
                            <a href=" " className="btn red" onClick={deleteClient}>Delete</a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};