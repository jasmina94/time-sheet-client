import { useState, useEffect } from 'react';
import '../../assets/css/Styles.css';
import { NewItemForm } from '../forms/NewItemForm';
import { AlphabetPanel } from '../shared/AlphabetPanel';
import { SearchControl } from '../shared/SearchControl';
import { LoadingComponent } from '../shared/LoadingComponent';
import { ClientDetailsList } from '../clients/ClientDetailsList';
import { clientService } from '../../services/api/clientService';
import { Pagination, PaginationDefaultCongif } from '../shared/Pagination';

export const ClientsTabContent = () => {
	const [dataLoaded, setDataLoaded] = useState(false);
	const [activeLetter, setActiveLetter] = useState('');
	const [toggleNewItem, setToggleNewItem] = useState(false);
	const [data, setData] = useState(clientService.clientsValue ?? []);
	const [currentPage, setCurrentPage] = useState(PaginationDefaultCongif.page);
	const [dataPerPage, setDataPerPage] = useState(PaginationDefaultCongif.limit);
	const [numOfPages, setNumOfPages] = useState(PaginationDefaultCongif.numOfPages);

	useEffect(() => {
		loadData();
		console.log('clients: use effect');
	}, [currentPage, dataPerPage]);

	const loadData = () => {
		clientService.read(currentPage, dataPerPage)
			.then(response => {
				if (response.success) {
					setDataLoaded(true);
					setData(response.data.clients);
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
			<h2><i className='ico clients'></i>Clients</h2>

			<div className='grey-box-wrap reports'>
				<a href='#new-member' className='link new-member-popup' onClick={handleNewMember}>Create new client</a>
				<SearchControl name='search-client' type='clients'
					searchReset={loadData}
					searchSuccess={searchCallback}
					searchInProgress={searchInProgress} />
			</div>

			{toggleNewItem && (<NewItemForm formType='client' handleToUpdate={loadData} />)}

			<AlphabetPanel active={activeLetter} disabled='k' alphabetSearch={searchByLetter} />

			{dataLoaded
				? 	<>
						<ClientDetailsList clients={data} handleToUpdate={loadData} />
						<Pagination activePage={currentPage} noResults={data.length === 0}
							perPage={dataPerPage} total={numOfPages} 
							paginate={changePage} changeLimit={changeLimit} />
					</>
				:	<LoadingComponent />}
		</section>
	);
}