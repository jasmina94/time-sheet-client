import '../../assets/css/Styles.css';
import { useState, useEffect } from 'react';
import { projectService } from '../../services/api/projectService';
import { NewItemForm } from '../forms/NewItemForm';
import { Pagination, PaginationDefaultCongif } from '../shared/Pagination';
import { AlphabetPanel } from '../shared/AlphabetPanel';
import { LoadingComponent } from '../shared/LoadingComponent';
import { ProjectDetailsList } from '../projects/ProjectDetailsList';
import { SearchControl } from '../shared/SearchControl';
import { searchService } from '../../services/api/searchService';

export const ProjectsTabContent = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [dataLoaded, setDataLoaded] = useState(false);
	const [activeLetter, setActiveLetter] = useState('');
	const [toggleNewItem, setToggleNewItem] = useState(false);
	const [data, setData] = useState(projectService.projectsValue ?? []);
	const [currentPage, setCurrentPage] = useState(PaginationDefaultCongif.page);
	const [dataPerPage, setDataPerPage] = useState(PaginationDefaultCongif.limit);
	const [numOfPages, setNumOfPages] = useState(PaginationDefaultCongif.numOfPages);


	useEffect(() => {
		loadData();
	}, [currentPage, dataPerPage, activeLetter, searchTerm])

	const loadData = () => {
		if (activeLetter) {
			searchService.searchByLetter(currentPage, dataPerPage, 'projects', activeLetter)
				.then(response => {
					if (response.success) {
						setDataLoaded(true);
						setData(response.data.entities);
						setNumOfPages(response.data.numOfPages);
					} else {
						setDataLoaded(false);
					}
				});
		} else {
			projectService.read(currentPage, dataPerPage)
				.then(response => {
					if (response.success) {
						setDataLoaded(true);
						setData(response.data.projects);
						setNumOfPages(response.data.numOfPages);
					} else {
						setDataLoaded(false);
					}
				});
		}

		if (toggleNewItem)
			setToggleNewItem(!toggleNewItem);
	}

	const searchReset = () => {
		setSearchTerm('');
		setCurrentPage(1);
		setDataPerPage(3);
	}

	const searchLetterReset = () => {
		setActiveLetter('');
		setCurrentPage(1);
		setDataPerPage(3);
	}

	const searchCallback = (data: any) => {
		setDataLoaded(true);
		setData(data.entities);
		setNumOfPages(data.numOfPages);
		setSearchTerm(searchTerm);
	}

	const searchByTermInProgress = () => {
		setActiveLetter('');
		setDataLoaded(false)
	}

	const searchLetterCallback = (data: any, letter: string) => {
		setDataLoaded(true);
		setData(data.entities);
		setNumOfPages(data.numOfPages);
		setActiveLetter(letter);
	}

	const changePage = (pageNum: number) => {
		setCurrentPage(pageNum);
	}

	const changeLimit = (dataPerPage: number) => {
		setDataPerPage(dataPerPage);
		setCurrentPage(PaginationDefaultCongif.page);
	}

	return (
		<section className='content'>
			<h2><i className='ico projects'></i>Projects</h2>
			<div className='grey-box-wrap reports'>
				<a href='#new-member' className='link new-member-popup' onClick={() => setToggleNewItem(!toggleNewItem)}>Create new project</a>
				<SearchControl name='search-project' type='projects'
					searchReset={searchReset}
					searchSuccess={searchCallback}
					searchInProgress={searchByTermInProgress} />
			</div>

			{toggleNewItem && (<NewItemForm formType='project' handleToUpdate={loadData} />)}

			<AlphabetPanel active={activeLetter} type='projects' 
				page={currentPage} perPage={dataPerPage}
				searchInProgress={() => setDataLoaded(false)}
				searchSuccess={searchLetterCallback}
				searchReset={searchLetterReset} />

			{dataLoaded
				? <>
					<ProjectDetailsList projects={data} handleToUpdate={loadData} />
					<Pagination activePage={currentPage} noResults={data.length === 0}
						perPage={dataPerPage} total={numOfPages}
						paginate={changePage} changeLimit={changeLimit} />
				</>
				: <LoadingComponent />}
		</section>
	);
}