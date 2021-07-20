import { useMemo, useState } from "react";
import { Client } from "../../model/Model";
import { clientService } from '../../services/clientService';

const fetchLeads = () => {
    console.log('fetch leads...');
    return [
        {
            label: 'Sasa Popovic',
            value: 1
        },
        {
            label: 'Milica Popovic',
            value: 2
        },
        {
            label: 'Zeljko Obradovic',
            value: 3
        }
    ]
}

const fetchCustomers = () => {
    let customers: any[] = [];
    console.log('fetch customers...');
    clientService.read()
        .then(response => {
            if (response.success) {
                const clients = response.data;
                clients.forEach((item: Client) => {
                    customers.push({ label: item.name, value: item.id });
                })
            }
        });
    return customers;
}

export const ProjectDetails = (props: any) => {
    const leads = useMemo(() => fetchLeads(), []);
    const customers = useMemo(() => fetchCustomers(), []);

    const [state, setState] = useState({
        id: props.project.id,
        name: props.project.name,
        customer: props.project.client.name,
        description: props.project.description,
        lead: props.project.lead,
        status: props.project.status
    });

    const renderOptions = (items: any[]) => {
        let options: any[] = [];
        items.forEach(item => {
            options.push(<option value={item.value}>{item.label}</option>)
        });

        return options;
    }

    const saveProject = () => {
        console.log('save');
    }

    const deleteProject = () => {
        console.log('delete');
    }

    return (
        <div className="item">
            <div className="heading">
                <span>{state.name}</span> <span><em>({state.customer})</em></span>
                <i>+</i>
            </div>
            <div className="details">
                <ul className="form">
                    <li>
                        <label>Project name:</label>
                        <input type="text" name="name" className="in-text" value={state.name} />
                    </li>
                    <li>
                        <label>Lead:</label>
                        <select name="lead" value={state.lead}>
                            <option>Select lead</option>
                            {renderOptions(leads)}
                        </select>
                    </li>
                </ul>
                <ul className="form">
                    <li>
                        <label>Description:</label>
                        <input type="text" name="description" className="in-text" value={state.description} />
                    </li>

                </ul>
                <ul className="form last">
                    <li>
                        <label>Customer:</label>
                        <select>
                            <option>Select customer</option>
                            {renderOptions(customers)}
                        </select>
                    </li>
                    <li className="inline">
                        <label>Status:</label>
                        <span className="radio">
                            <label htmlFor="active">Inactive:</label>
                            <input type="radio" value="0" name="status" />
                        </span>
                        <span className="radio">
                            <label htmlFor="inactive">Active:</label>
                            <input type="radio" value="1" name="status" />
                        </span>
                        <span className="radio">
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
        </div>
    )
}