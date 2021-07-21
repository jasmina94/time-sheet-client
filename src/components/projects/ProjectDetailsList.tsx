import { useState, useEffect } from 'react';
import { Project } from '../../model/Model';
import { ProjectDetails } from './ProjectDetails';

export const ProjectDetailsList = (props: any) => {
    const [state, setState ] = useState({
        clientOptions: [],
        clientLoaded: false,
        leadOptions: [],
        leadLoaded: false
    });
    
    return (
        <div className="accordion-wrap projects">
            {props.projects.map((item: Project) =>
                <ProjectDetails key={item.id} 
                    project={item} 
                    handleToUpdate={props.handleToUpdate} 
                    leadOptions={state.leadOptions}
                    clientOptions={state.clientOptions}/>
            )}
        </div>
    )
}