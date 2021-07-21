import { useState } from "react";
import { clientService } from "../../services/api/clientService";
import countryList from "react-select-country-list";
import { useMemo } from "react";

export const ClientForm = (props: any) => {
    const  countries = useMemo(() => countryList().getData(), []);

    const [client, setClient] = useState({
        name: '',
        address: '',
        city: '',
        zip: '',
        country: ''
    });

    const [error, setError] = useState('');

    const handleInputChange = (e: any) => {
        const name = e.target.name;
        const value = e.target.value;
        setError('');
        setClient({ ...client, [name]: value });
    }

    const isValid = (): boolean => {
        let valid = true;

        if (client.name === undefined || client.name === '') {
            setError('Name is required!');
            return false;
        }

        if (client.address === undefined || client.address === '') {
            setError('Address is required!');
            return false;
        }
        if (client.city === undefined || client.city === '') {
            setError('City is required!');
            return false;
        }

        if (client.zip === undefined || client.zip === '') {
            setError('Zip is required!');
            return false;
        }

        if (client.country === undefined || client.country === '') {
            setError('Country is required!');
            return false;
        }

        return valid;
    }

    const handleSave = (e: any) => {
        e.preventDefault();
        if (isValid()) {
            clientService.create({ ...client, id: '' })
                .then(response => {
                    if (!response.success) {
                        setError(response.error);
                    } else {
                        props.handleToUpdate();
                    }
                });
        }
    }

    const renderCountryOptions = (): any[] => {
        let options: any[] = [];
        countries.forEach(item => {
            options.push(
                <option value={item.value} key={item.value}>{item.label}</option>
            );
        });

        return options;
    }

    return (
        <>
            <h2>Create new client</h2>
            <ul className="form">
                <li>
                    <label>Client name:</label>
                    <input type="text" name="name" className="in-text" value={client.name} onChange={handleInputChange} />
                </li>
                <li>
                    <label>Address:</label>
                    <input type="text" name="address" className="in-text" value={client.address} onChange={handleInputChange} />
                </li>
                <li>
                    <label>City:</label>
                    <input type="text" name="city" className="in-text" value={client.city} onChange={handleInputChange} />
                </li>
                <li>
                    <label>Zip/Postal code:</label>
                    <input type="text" name="zip" className="in-text" value={client.zip} onChange={handleInputChange} />
                </li>
                <li>
                    <label>Country:</label>
                     <select name="country" onChange={handleInputChange} value={client.country}>
                        <option>Select country</option>
                        {renderCountryOptions()}
                    </select>
                </li>
                <li className="error-label">{error}</li>
            </ul>
            <div className="buttons">
                <div className="inner">
                    <a href=" " className="btn green" onClick={handleSave}>Save</a>
                </div>
            </div>
        </>
    );
}