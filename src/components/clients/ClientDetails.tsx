import { useState, useMemo } from 'react';
import { clientService } from '../../services/api/clientService';
import countryList from 'react-select-country-list';

export const ClientDetails = (props: any) => {
    const  countries = useMemo(() => countryList().getData(), []);

    const [state, setState] = useState({
        id: props.client.id,
        name: props.client.name,
        address: props.client.address,
        city: props.client.city,
        zip: props.client.zip,
        country: props.client.country,
        error: '',
        showDetails: false
    });

    const toggleDetails = (e: any) => {
        e.preventDefault();
        setState({...state, showDetails: !state.showDetails});
    }

    const saveClient = (e: any) => {
        e.preventDefault();
        clientService.update({id: state.id, name: state.name, address: state.address, city: state.city, zip: state.zip, country: state.country})
            .then(response => {
                if (!response.success) {
                    setState({...state, error: response.error});
                } else {
                    const updated = response.data;
                    setState({...state, id: updated.id, name: updated.name, address: updated.address, city: updated.city, zip: updated.zip, country: updated.country, showDetails: false});
                    props.handleToUpdate();
                }
            });
    }

    const deleteClient = (e: any) => {
        e.preventDefault();
        clientService.remove(state.id)
            .then(response => {
                if (!response.success) {
                    setState({...state, error: response.error});
                }
            })
    }


    const renderCountryOptions = (): any[] => {
        let options: any[] = [];
        countries.forEach(item => {
            options.push(
                <option value={item.value}>{item.label}</option>
            );
        });

        return options;
    }

    return (
        <div className='item'>
            <div className='heading' onClick={toggleDetails}>
                <span>{props.client.name}</span>
                <i>+</i>
            </div>
            {state.showDetails && (
                <div className='details'>
                    <ul className='form'>
                        <li>
                            <label>Client name:</label>
                            <input type='text' name='name' className='in-text' value={state.name} onChange={(e) => {setState({...state, name: e.target.value})}}/>
                        </li>
                        <li>
                            <label>Zip/Postal code:</label>
                            <input type='text' name='zip' className='in-text' value={state.zip} onChange={(e) => {setState({...state, zip: e.target.value})}}/>
                        </li>
                    </ul>
                    <ul className='form'>
                        <li>
                            <label>Address:</label>
                            <input type='text' name='address' className='in-text' value={state.address} onChange={(e) => {setState({...state, address: e.target.value})}}/>
                        </li>
                        <li>
                            <label>Country:</label>
                            <select name='country' value={state.country} onChange={(e) => {setState({...state, country: e.target.value})}}>
                                <option>Select country</option>
                                {renderCountryOptions()}
                            </select>
                        </li>
                    </ul>
                    <ul className='form last'>
                        <li>
                            <label>City:</label>
                            <input type='text' name='city' className='in-text' value={state.city} onChange={(e) => {setState({...state, city: e.target.value})}}/>
                        </li>
                    </ul>
                    <label className='error-label'>{state.error}</label>
                    <div className='buttons'>
                        <div className='inner'>
                            <a href=' ' className='btn green' onClick={saveClient}>Save</a>
                            <a href=' ' className='btn red' onClick={deleteClient}>Delete</a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
};