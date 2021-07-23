import '../../assets/css/Styles.css';
import '../../assets/css/Styles.css';
import { useState, useEffect } from 'react';
import { projectService } from '../../services/api/projectService';
import { NewItemForm } from '../forms/NewItemForm';
import { Pagination } from '../shared/Pagination';
import { AlphabetPanel } from '../shared/AlphabetPanel';
import { LoadingComponent } from '../shared/LoadingComponent';
import { ProjectDetailsList } from '../projects/ProjectDetailsList';
import { Project } from '../../model/Model';
import { SearchControl } from '../shared/SearchControl';

export const ProjectsTabContent = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [dataPerPage] = useState(2);
	const [data, setData] = useState(projectService.projectsValue);
	const [dataLoaded, setDataLoaded] = useState(false);
	const [toggleNewItem, setToggleNewItem] = useState(false);
	const [activeLetter, setActiveLetter] = useState('');

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

	const handleNewMember = (e: any) => {
		setToggleNewItem(!toggleNewItem);
	}

	const refresh = () => {
		projectService.read()
			.then(response => {
				if (response.success) {
					setDataLoaded(true);
					setData(response.data);
					setToggleNewItem(false);
				} else {
					setDataLoaded(false);
				}
			});
		projectService.projects.subscribe(x => setData(x));
	}


	const filterClient = (project: Project, term: string): boolean => {
		let match = false;
		term = term.toLocaleLowerCase();

		if (project.name.toLowerCase().indexOf(term) !== -1
			|| project.description.toLocaleLowerCase().indexOf(term) !== -1) {
			match = true;
		}

		return match;
	}

	const searchProject = (e: any) => {
		const term = e.target.value;
		if (term !== '' && term !== undefined) {
			let filteredData = data.filter(x => filterClient(x, term));
			setData(filteredData);
		} else {
			refresh();
		}
	}

	const searchByLetter = (letter: string) => {
		if (activeLetter === letter) {
			setActiveLetter('');
			refresh();
		} else {
			setActiveLetter(letter);
			let filtered = data.filter(x => x.name.toLowerCase().startsWith(letter));
			if (filtered.length != 0) {
				setData(filtered);
			}
		}
	}

	const indexOfLastPost = currentPage * dataPerPage;
	const indexOfFirstPost = indexOfLastPost - dataPerPage;
	const currentProjects = data.slice(indexOfFirstPost, indexOfLastPost);

	const changePage = (pageNum: number) => {
		setCurrentPage(pageNum);
	}

	return (
		<section className="content">
			<h2><i className="ico projects"></i>Projects</h2>
			<div className="grey-box-wrap reports">
				<a href="#new-member" className="link new-member-popup" onClick={handleNewMember}>Create new project</a>
				<SearchControl name="search-project" searchAction={searchProject} />
			</div>
			{toggleNewItem && (<NewItemForm formType='project' handleToUpdate={refresh} />)}

			<AlphabetPanel disabled='a' alphabetSearch={searchByLetter} />

			{!dataLoaded && <LoadingComponent />}

			{dataLoaded && <ProjectDetailsList projects={currentProjects} handleToUpdate={refresh} />}

			<Pagination activePage={currentPage} perPage={dataPerPage} total={data.length} paginate={changePage} />

		</section>
	);
}