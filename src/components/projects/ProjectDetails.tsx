import { useState, useEffect } from "react";
import { userService } from '../../services/api/userService';
import { clientService } from '../../services/api/clientService';
import { selectOptionService } from '../../services/selectOptionService';
import { ProjectStatus } from "../../model/Model";

export const ProjectDetails = (props: any) => {
    const [leadOptions, setLeadOptions] = useState([]);
    const [customerOptions, setCustomerOptions] = useState([]);
    const [toggleDetails, setToggleDetails] = useState(false);

    const [state, setState] = useState({
        id: props.project.id,
        name: props.project.name,
        customerId: props.project.customer.id,
        customerName: props.project.customer.name,
        description: props.project.description,
        lead: props.project.lead.id,
        status: props.project.status,
    });

    console.log(state);

    useEffect(() => {
        clientService.read()
            .then(response => {
                if (response.success) {
                    const clients = selectOptionService.getClients(response.data);
                    setCustomerOptions(clients);
                }
            })
        userService.getAll()
            .then(users => {
                if (users && users.length !== 0) {
                    const leads = selectOptionService.getLeads(users);
                    setLeadOptions(leads);
                }
            })
    }, [])

    const handleToggleDetails = (e: any) => {
        e.preventDefault();
        setToggleDetails(!toggleDetails);
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
                <span>{state.name}</span> <span><em>({state.customerName})</em></span>
                <i>+</i>
            </div>
            {toggleDetails && (
                <div className="details">
                    <ul className="form">
                        <li>
                            <label>Project name:</label>
                            <input type="text" name="name" className="in-text" value={state.name} onChange={(e) => { setState({ ...state, name: e.target.value }) }} />
                        </li>
                        <li>
                            <label>Lead:</label>
                            <select name="lead" value={state.lead} onChange={(e) => { setState({ ...state, lead: e.target.value }) }}>
                                {leadOptions.map((item: any) =>
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
                            <select name="customer" value={state.customerId} onChange={(e) => { setState({ ...state, customerId: e.target.value }) }}>
                                {customerOptions.map((item: any) =>
                                    <option value={item.value} key={item.value}>{item.label}</option>
                                )}
                            </select>
                        </li>
                        <li className="inline">
                            <label style={{ width: "100%" }}>Status:</label>
                            <span className="radio" style={{ width: "33%" }}>
                                <label htmlFor="active">Inactive:</label>
                                <input type="radio" value="0" name="status" 
                                    checked={state.status === ProjectStatus.INACTIVE.valueOf()} onChange={() => setState({...state, status: ProjectStatus.INACTIVE.valueOf()})} />
                            </span>
                            <span className="radio" style={{ width: "33%" }}>
                                <label htmlFor="inactive">Active:</label>
                                <input type="radio" value="1" name="status" 
                                    checked={state.status === ProjectStatus.ACTIVE.valueOf()} onChange={() => setState({...state, status: ProjectStatus.ACTIVE.valueOf()})} />
                            </span>
                            <span className="radio" style={{ width: "33%" }}>
                                <label htmlFor="active">Archive:</label>
                                <input type="radio" value="2" name="status" 
                                    checked={state.status === ProjectStatus.ARCHIVE.valueOf()} onChange={() => setState({...state, status: ProjectStatus.ARCHIVE.valueOf()})} />
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