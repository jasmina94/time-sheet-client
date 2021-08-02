import { useState, useEffect } from 'react';
import '../../assets/css/Styles.css';
import { NewItemForm } from '../forms/NewItemForm';
import { AlphabetPanel } from '../shared/AlphabetPanel';
import { SearchControl } from '../shared/SearchControl';
import { LoadingComponent } from '../shared/LoadingComponent';
import { ClientDetailsList } from '../clients/ClientDetailsList';
import { clientService } from '../../services/api/clientService';
import { Pagination, PaginationDefaultCongif } from '../shared/Pagination';
import { searchService } from '../../services/api/searchService';

export const ClientsTabContent = () => {
	const [searchTerm, setSearchTerm] = useState('');
	const [dataLoaded, setDataLoaded] = useState(false);
	const [activeLetter, setActiveLetter] = useState('');
	const [toggleNewItem, setToggleNewItem] = useState(false);
	const [data, setData] = useState(clientService.clientsValue ?? []);
	const [currentPage, setCurrentPage] = useState(PaginationDefaultCongif.page);
	const [dataPerPage, setDataPerPage] = useState(PaginationDefaultCongif.limit);
	const [numOfPages, setNumOfPages] = useState(PaginationDefaultCongif.numOfPages);

	useEffect(() => {
		loadData();
	}, [currentPage, dataPerPage, activeLetter, searchTerm]);

	const loadData = () => {
		if (activeLetter) {
			searchService.searchByLetter(currentPage, dataPerPage, 'clients', activeLetter)
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
			clientService.read(currentPage, dataPerPage, searchTerm)
				.then(response => {
					if (response.success) {
						setDataLoaded(true);
						setData(response.data.clients);
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

	const searchCallback = (data: any, searchTerm: string) => {
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
		setCurrentPage(1);
	}

	return (
		<section className='content'>
			<h2><i className='ico clients'></i>Clients</h2>

			<div className='grey-box-wrap reports'>
				<a href='#new-member' className='link new-member-popup' onClick={() => setToggleNewItem(!toggleNewItem)}>Create new client</a>
				<SearchControl name='search-client' type='clients'
					searchReset={searchReset}
					searchSuccess={searchCallback}
					searchInProgress={searchByTermInProgress} />
			</div>

			{toggleNewItem && (<NewItemForm formType='client' handleToUpdate={loadData} />)}

			<AlphabetPanel active={activeLetter} disabled='k' type='clients' 
				page={currentPage} perPage={dataPerPage}
				searchInProgress={() => setDataLoaded(false)}
				searchSuccess={searchLetterCallback}
				searchReset={searchLetterReset} />

			{dataLoaded
				? <>
					<ClientDetailsList clients={data} handleToUpdate={loadData} />
					<Pagination activePage={currentPage} noResults={data.length === 0}
						perPage={dataPerPage} total={numOfPages}
						paginate={changePage} changeLimit={changeLimit} />
				</>
				: <LoadingComponent />}
		</section>
	);
}