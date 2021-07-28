import { useState, useEffect } from 'react';
import { Project } from '../../model/Model';
import { clientService } from '../../services/api/clientService';
import { selectOptionService } from '../../services/selectOptionService';
import { userService } from '../../services/api/userService';
import { ProjectDetails } from './ProjectDetails';

export const ProjectDetailsList = (props: any) => {
    const [leadOptions, setLeadOptions] = useState([]);
    const [customerOptions, setCustomerOptions] = useState([]);
    
    useEffect(() => {
        clientService.readAll()
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

    
    return (
        <div className="accordion-wrap projects">
            {props.projects.map((item: Project) =>
                <ProjectDetails key={item.id} 
                    project={item} 
                    handleToUpdate={props.handleToUpdate} 
                    leadOptions={leadOptions}
                    customerOptions={customerOptions}/>
            )}
        </div>
    )
}