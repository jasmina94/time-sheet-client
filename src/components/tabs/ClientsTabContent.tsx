import { useState, useEffect } from 'react';
import '../../assets/css/Styles.css';
import { NewItemForm } from '../forms/NewItemForm';
import { AlphabetPanel } from '../shared/AlphabetPanel';
import { SearchControl } from '../shared/SearchControl';
import { LoadingComponent } from '../shared/LoadingComponent';
import { ClientDetailsList } from '../clients/ClientDetailsList';
import { clientService } from '../../services/api/clientService';
import { getPerPagePaginationOptions, Pagination, PaginationDefaultCongif } from '../shared/Pagination';
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
	const [paginationOptions, setPaginationOptions] = useState(PaginationDefaultCongif.perPageOptions);

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
						setPaginationOptions(getPerPagePaginationOptions(response.data.total));
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
						setPaginationOptions(getPerPagePaginationOptions(response.data.total));
					} else {
						setDataLoaded(false);
					}
				});
		}

		if (toggleNewItem)
			setToggleNewItem(!toggleNewItem);
	}

	const reset = () => {
		setCurrentPage(1);
		setDataPerPage(3);
	}

	const searchReset = () => {
		setSearchTerm('');
		reset();
	}

	const searchLetterReset = () => {
		setActiveLetter('');
		reset();
	}

	const searchByTermInProgress = () => {
		setActiveLetter('');
		setDataLoaded(false)
	}

	const searchByTerm = (searchTerm: string) => {
		setSearchTerm(searchTerm);
		setActiveLetter('');
		reset();
	}

	const searchByLetter = (letter: string) => {
		setActiveLetter(letter);
		reset();
	}

	const changePage = (pageNum: number) => { setCurrentPage(pageNum); }

	const changeLimit = (dataPerPage: number) => {
		setDataPerPage(dataPerPage);
		setCurrentPage(1);
	}

	return (
		<section className='content'>
			<h2><i className='ico clients'></i>Clients</h2>

			<div className='grey-box-wrap reports'>
				<a href='#new-member' className='link new-member-popup' onClick={() => setToggleNewItem(!toggleNewItem)}>Create new client</a>
				<SearchControl name='search-client'
					search={searchByTerm}
					searchReset={searchReset}
					searchInProgress={searchByTermInProgress} />
			</div>

			{toggleNewItem && (<NewItemForm formType='client' handleToUpdate={loadData} />)}

			<AlphabetPanel active={activeLetter} disabled='k'
				page={currentPage} perPage={dataPerPage} 
				search={searchByLetter}
				searchInProgress={() => setDataLoaded(false)}
				searchReset={searchLetterReset} />

			{dataLoaded
				? <>
					<ClientDetailsList clients={data} handleToUpdate={loadData} />

					<Pagination activePage={currentPage} dataLength={data.length}
						perPage={dataPerPage} totalNumOfPages={numOfPages}
						paginate={changePage} changeLimit={changeLimit}
						options={paginationOptions} />
				</>
				: <LoadingComponent />}
		</section>
	);
}