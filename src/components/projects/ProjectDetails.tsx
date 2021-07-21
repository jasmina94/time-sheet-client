import { useState, useEffect } from "react";
import { userService } from '../../services/api/userService';
import { clientService } from '../../services/api/clientService';
import { selectOptionService } from '../../services/selectOptionService';

export const ProjectDetails = (props: any) => {
    const [leadOptions, setLeadOptions] = useState([]);
    const [clientOptions, setClientOptions] = useState([]);

    const [state, setState] = useState({
        id: props.project.id,
        name: props.project.name,
        customer: props.project.customer.name,
        description: props.project.description,
        lead: props.project.lead.id,
        status: props.project.status,
        toggleDetails: false,
        clientLoaded: false,
        leadLoaded: false
    });

    useEffect(() => {
        console.log('UseEffect - 1');
        let isMounted = true;

        clientService.read()
            .then(response => {
                if (isMounted) {
                    if (response.success) {
                        const clients = selectOptionService.getClients(response.data);
                        setState({ ...state, clientLoaded: true});
                        setClientOptions(clients);
                    } else {
                        setState({ ...state, clientLoaded: false });
                    }
                }
            })
        userService.getAll()
            .then(users => {
                console.log(users);
                if (isMounted) {
                    if (users && users.length !== 0) {
                        const leads = selectOptionService.getLeads(users);
                        setState({ ...state, leadLoaded: true })
                        setLeadOptions(leads);
                    } else {
                        setState({ ...state, leadLoaded: false });
                    }
                }
            })
        return () => { isMounted = false };
    }, [])

    const handleToggleDetails = (e: any) => {
        e.preventDefault();
        setState({ ...state, toggleDetails: true });
    }

    const saveProject = () => {
        console.log('save');
    }

    const deleteProject = () => {
        console.log('delete');
    }

    return (
        <div className="item">
            <div className="heading" onClick={handleToggleDetails}>
                <span>{state.name}</span> <span><em>({state.customer})</em></span>
                <i>+</i>
            </div>
            {state.toggleDetails && (
                <div className="details">
                    <ul className="form">
                        <li>
                            <label>Project name:</label>
                            <input type="text" name="name" className="in-text" value={state.name} onChange={(e) => { setState({ ...state, name: e.target.value }) }} />
                        </li>
                        <li>
                            <label>Lead:</label>
                            <select name="lead" value={state.lead} onChange={(e) => { setState({ ...state, lead: e.target.value }) }}>
                                {state.leadLoaded && leadOptions != null && leadOptions.map((item: any) =>
                                    <option value={item.value} key={item.value}>{item.label}</option>
                                )}
                            </select>
                        </li>
                    </ul>
                    <ul className="form">
                        <li>
                            <label>Description:</label>
                            <input type="text" name="description" className="in-text" value={state.description} onChange={(e) => { setState({ ...state, description: e.target.value }) }} />
                        </li>

                    </ul>
                    <ul className="form last">
                        <li>
                            <label>Customer:</label>
                            <select name="customer" onChange={(e) => { setState({ ...state, customer: e.target.value }) }}>
                                {state.clientLoaded && clientOptions.map((item: any) =>
                                    <option value={item.value} key={item.value}>{item.label}</option>
                                )}
                            </select>
                        </li>
                        <li className="inline">
                            <label style={{ width: "100%" }}>Status:</label>
                            <span className="radio" style={{ width: "33%" }}>
                                <label htmlFor="active">Inactive:</label>
                                <input type="radio" value="0" name="status" />
                            </span>
                            <span className="radio" style={{ width: "33%" }}>
                                <label htmlFor="inactive">Active:</label>
                                <input type="radio" value="1" name="status" />
                            </span>
                            <span className="radio" style={{ width: "33%" }}>
                                <label htmlFor="active">Archive:</label>
                                <input type="radio" value="2" name="status" />
                            </span>
                        </li>
                    </ul>
                    <div className="buttons">
                        <div className="inner">
                            <a href=" " className="btn green" onClick={saveProject}>Save</a>
                            <a href=" " className="btn red" onClick={deleteProject}>Delete</a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}