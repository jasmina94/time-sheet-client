import '../../assets/css/Styles.css';
import '../../assets/css/Styles.css';
import { useState, useEffect } from 'react';
import { projectService } from '../../services/api/projectService';
import { NewItemForm } from '../forms/NewItemForm';
import { Pagination, PaginationDefaultCongif } from '../shared/Pagination';
import { AlphabetPanel } from '../shared/AlphabetPanel';
import { LoadingComponent } from '../shared/LoadingComponent';
import { ProjectDetailsList } from '../projects/ProjectDetailsList';
import { SearchControl } from '../shared/SearchControl';

export const ProjectsTabContent = () => {
	const [dataLoaded, setDataLoaded] = useState(false);
	const [activeLetter, setActiveLetter] = useState('');
	const [toggleNewItem, setToggleNewItem] = useState(false);
	const [data, setData] = useState(projectService.projectsValue ?? []);
	const [currentPage, setCurrentPage] = useState(PaginationDefaultCongif.page);
	const [dataPerPage, setDataPerPage] = useState(PaginationDefaultCongif.limit);
	const [numOfPages, setNumOfPages] = useState(PaginationDefaultCongif.numOfPages);


	useEffect(() => {
		loadData();
	}, [currentPage, dataPerPage])

	const loadData = () => {
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

		if (toggleNewItem)
			setToggleNewItem(!toggleNewItem);
	}

	const handleNewMember = (e: any) => {
		setToggleNewItem(!toggleNewItem);
	}

	const searchCallback = (data: any) => {
		setDataLoaded(true);
		setData(data.entities);
		setNumOfPages(data.numOfPages);
	}

	const searchInProgress = () => {
		console.log('in progress');
		setDataLoaded(false);
	}

	const searchByLetter = (letter: string) => {
		if (activeLetter === letter) {
			setActiveLetter('');
			loadData();
		} else {
			setActiveLetter(letter);
			let filtered = data.filter(x => x.name.toLowerCase().startsWith(letter));
			if (filtered.length !== 0) {
				setData(filtered);
			}
		}
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
				<a href='#new-member' className='link new-member-popup' onClick={handleNewMember}>Create new project</a>
				<SearchControl name='search-project' type='projects'
					searchReset={loadData}
					searchSuccess={searchCallback}
					searchInProgress={searchInProgress} />
			</div>

			{toggleNewItem && (<NewItemForm formType='project' handleToUpdate={loadData} />)}

			<AlphabetPanel disabled='a' alphabetSearch={searchByLetter} />

			{dataLoaded
				?	<>
						<ProjectDetailsList projects={data} handleToUpdate={loadData} />
						<Pagination activePage={currentPage} noResults={data.length === 0}
							perPage={dataPerPage} total={numOfPages}
							paginate={changePage} changeLimit={changeLimit} />
					</>
				:	<LoadingComponent />}
		</section>
	);
}