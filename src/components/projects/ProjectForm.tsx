import { clientService } from "../../services/api/clientService";
import { selectOptionService } from "../../services/selectOptionService";
import { userService } from "../../services/api/userService";
import { useState, useEffect } from "react";
import { projectService } from "../../services/api/projectService";

export const ProjectForm = (props: any) => {
    const [error, setError] = useState('');
    const [leadOptions, setLeadOptions] = useState([]);
    const [customerOptions, setCustomerOptions] = useState([]);
    const [project, setProject] = useState({
        name: '',
        description: '',
        status: 0,
        customer: 0,
        lead: 0
    });

    useEffect(() => {
        clientService.readAll()
            .then(response => {
                if (response.success) {
                    const clients = selectOptionService.getClients(response.data, true);
                    setCustomerOptions(clients);
                }
            })
        userService.getAll()
            .then(users => {
                if (users && users.length !== 0) {
                    const leads = selectOptionService.getLeads(users, true);
                    setLeadOptions(leads);
                }
            })
    }, [])

    const isValid = (): boolean => {
        let valid = true;
        if (project.name === undefined || project.name === '') {
            setError('Name is required!');
            return false;
        }
        if (project.status === undefined) {
            setError('Status is required!');
            return false;
        }
        if (project.customer === undefined || project.customer === 0) {
            setError('Customer is required!');
            return false;
        }
        if (project.lead === undefined || project.lead === 0) {
            setError('Lead is required!');
            return false;
        }

        return valid;
    }

    const handleSave = (e: any) => {
        e.preventDefault();
        if (isValid()) {
            projectService.create({ ...project, id: '' })
                .then(response => {
                    if (!response.success) {
                        setError(response.error);
                    } else {
                        props.handleToUpdate();
                    }
                })
        }
    }

    const handleInputChange = (e: any) => {
        const { name, value } = e.target;
        setError('');
        setProject({ ...project, [name]: value });
    }

    return (
        <>
            <div className="new-member-wrap">
                <div id="new-member" className="new-member-inner">
                    <h2>Create new project</h2>
                    <ul className="form">
                        <li>
                            <label>Project name:</label>
                            <input type="text" className="in-text" name="name" value={project.name} onChange={handleInputChange} />
                        </li>
                        <li>
                            <label>Description:</label>
                            <input type="text" className="in-text" name="description" value={project.description} onChange={handleInputChange}/>
                        </li>
                        <li>
                            <label>Customer:</label>
                            <select name="customer" value={project.customer} onChange={handleInputChange}>
                                {customerOptions.map((item: any) =>
                                    <option value={item.value} key={item.value}>{item.label}</option>
                                )}
                            </select>
                        </li>
                        <li>
                            <label>Lead:</label>
                            <select name="lead" value={project.lead} onChange={handleInputChange}>
                                {leadOptions.map((item: any) =>
                                    <option value={item.value} key={item.value}>{item.label}</option>
                                )}
                            </select>
                        </li>
                        <li className="error-label">{error}</li>
                    </ul>
                    <div className="buttons">
                        <div className="inner">
                            <a href=" " className="btn green" onClick={handleSave}>Save</a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}