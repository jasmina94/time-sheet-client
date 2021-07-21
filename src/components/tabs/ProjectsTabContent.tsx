import '../../assets/css/Styles.css';
import '../../assets/css/Styles.css';
import { useState, useEffect } from 'react';
import { projectService } from '../../services/api/projectService';
import { NewItemForm } from '../forms/NewItemForm';
import { Pagination } from '../shared/Pagination';
import { AlphabetPanel } from '../shared/AlphabetPanel';
import { LoadingComponent } from '../shared/LoadingComponent';
import { ProjectDetailsList } from '../projects/ProjectDetailsList';

export const ProjectsTabContent = () => {
	const [data, setData] = useState(projectService.projectsValue);
	const [dataLoaded, setDataLoaded] = useState(false);
	const [toggleNewItem, setToggleNewItem] = useState(false);

	const handleNewMember = (e: any) => {
		e.preventDefault();
		setToggleNewItem(!toggleNewItem);
	}

	useEffect(() => {
		let isMounted = true;
		projectService.read()
			.then(response => {
				if (isMounted) {
					if (response.success) {
						setDataLoaded(true);
						setData(response.data);
					} else {
						setDataLoaded(false);
					}
				}
			})

		projectService.projects.subscribe(x => setData(x));

		return () => { isMounted = false };
	}, [])

	return (
		<section className="content">
			<h2><i className="ico projects"></i>Projects</h2>
			<div className="grey-box-wrap reports">
				<a href="#new-member" className="link new-member-popup" onClick={handleNewMember}>Create new project</a>
				<div className="search-page">
					<input type="search" name="search-clients" className="in-search" />
				</div>
			</div>
			{toggleNewItem && (<NewItemForm formType='project' />)}

			<AlphabetPanel active='m' />

			{!dataLoaded && <LoadingComponent />}

			{dataLoaded && <ProjectDetailsList projects={data} />}

			<Pagination />
		</section>
	);
}