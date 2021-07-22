import { useState } from "react";
import { ProjectStatus } from "../../model/Model";
import { projectService } from "../../services/api/projectService";

export const ProjectDetails = (props: any) => {
    const ACTIVE_STATUS = ProjectStatus.ACTIVE.valueOf();
    const INACTIVE_STATUS = ProjectStatus.INACTIVE.valueOf();
    const ARCHIVE_STATUS = ProjectStatus.ARCHIVE.valueOf();

    const [toggleDetails, setToggleDetails] = useState(false);
    const [state, setState] = useState({
        id: props.project.id,
        name: props.project.name,
        customerId: props.project.customer.id,
        customerName: props.project.customer.name,
        description: props.project.description,
        lead: props.project.lead.id,
        status: props.project.status,
        error: ''
    });

    const handleToggleDetails = (e: any) => {
        e.preventDefault();
        setToggleDetails(!toggleDetails);
    }

    const handleStatusChange = (e: any) => {
        setState({ ...state, status: parseInt(e.target.value) })
    }

    const saveProject = (e: any) => {
        e.preventDefault();
        projectService.update({
            id: state.id, name: state.name, description: state.description,
            status: parseInt(state.status), customer: parseInt(state.customerId), lead: parseInt(state.lead)
        })
            .then(response => {
                if (!response.success) {
                    setState({ ...state, error: response.error });
                } else {
                    const updated = response.data;
                    setState({ ...state, id: updated.id, name: updated.name, });
                    setToggleDetails(false);
                    props.handleToUpdate();
                }
            });
    }

    const deleteProject = (e: any) => {
        e.preventDefault();
        projectService.remove(state.id)
            .then(response => {
                if (response === "") {
                    props.handleToUpdate();
                } else {
                    setState({ ...state, error: response.error });
                }
            });
    }

    return (
        <div className="item">
            <div className="heading" onClick={handleToggleDetails}>
                <span>{props.project.name}</span> <span><em>({state.customerName})</em></span>
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
                                {props.leadOptions.map((item: any) =>
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
                                {props.customerOptions.map((item: any) =>
                                    <option value={item.value} key={item.value}>{item.label}</option>
                                )}
                            </select>
                        </li>
                        <li className="inline">
                            <label style={{ width: "100%" }}>Status:</label>
                            <span className="radio" style={{ width: "33%" }}>
                                <label htmlFor="active">Inactive:</label>
                                <input type="radio" value="0" name={state.id + '-name'}
                                    checked={state.status === INACTIVE_STATUS} onChange={handleStatusChange} />
                            </span>
                            <span className="radio" style={{ width: "33%" }}>
                                <label htmlFor="inactive">Active:</label>
                                <input type="radio" value="1" name={state.id + '-name'}
                                    checked={state.status === ACTIVE_STATUS} onChange={handleStatusChange} />
                            </span>
                            <span className="radio" style={{ width: "33%" }}>
                                <label htmlFor="active">Archive:</label>
                                <input type="radio" value="2" name={state.id + '-name'}
                                    checked={state.status === ARCHIVE_STATUS} onChange={handleStatusChange} />
                            </span>
                        </li>
                    </ul>
                    <label className="error-label">{state.error}</label>
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