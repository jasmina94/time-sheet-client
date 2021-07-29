import { useState, useEffect } from 'react';
import '../../assets/css/Styles.css';
import { NewItemForm } from '../forms/NewItemForm';
import { Pagination, PaginationDefaultCongif } from '../shared/Pagination';
import { ClientDetailsList } from '../clients/ClientDetailsList';
import { LoadingComponent } from '../shared/LoadingComponent';
import { AlphabetPanel } from '../shared/AlphabetPanel';
import { SearchControl } from '../shared/SearchControl';
import { clientService } from '../../services/api/clientService';
import { Client } from '../../model/Model';

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

	const filterClient = (client: Client, term: string): boolean => {
		let match = false;
		term = term.toLocaleLowerCase();

		if (client.name.toLowerCase().indexOf(term) !== -1
			|| client.zip.toLowerCase().indexOf(term) !== -1
			|| client.address.toLowerCase().indexOf(term) !== -1
			|| client.city.toLowerCase().indexOf(term) !== -1
			|| client.country.toLowerCase().indexOf(term) !== -1) {
			match = true;
		}

		return match;
	}

	const searchClient = (e: any) => {
		const term = e.target.value;
		if (term !== '' && term !== undefined) {
			let filteredData = data.filter(x => filterClient(x, term));
			setData(filteredData);
		} else {
			loadData();
		}
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
				<SearchControl name='search-client' searchAction={searchClient} />
			</div>

			{toggleNewItem && (<NewItemForm formType='client' handleToUpdate={loadData} />)}

			<AlphabetPanel active={activeLetter} disabled='k' alphabetSearch={searchByLetter} />

			{!dataLoaded && <LoadingComponent />}

			{dataLoaded && <ClientDetailsList clients={data} handleToUpdate={loadData} />}

			<Pagination activePage={currentPage} perPage={dataPerPage}
				total={numOfPages} paginate={changePage} changeLimit={changeLimit} />

		</section>
	);
}