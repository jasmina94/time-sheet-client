import { useState } from 'react';
import '../../assets/css/Styles.css';
import { NewItemForm } from '../forms/NewItemForm';
import { Pagination } from '../shared/Pagination';
import { ClientDetailsList } from '../clients/ClientDetailsList';
import { LoadingComponent } from '../shared/LoadingComponent';
import { AlphabetPanel } from '../shared/AlphabetPanel';
import { SearchControl } from '../shared/SearchControl';
import { useEffect } from 'react';
import { clientService } from '../../services/clientService';
import { Client } from '../../model/Model';

export const ClientsTabContent = () => {
	const [data, setData] = useState(clientService.clientsValue);
	const [dataLoaded, setDataLoaded] = useState(false);
	const [toggleNewItem, setToggleNewItem] = useState(false);

	const handleNewMember = (e: any) => {
		e.preventDefault();
		setToggleNewItem(!toggleNewItem);
	}

	const refresh = () => {
		clientService.read()
			.then(response => {
				if (response.success) {
					setDataLoaded(true);
					setData(response.data);
					setToggleNewItem(false);
				} else {
					setDataLoaded(false);
				}
			});
		clientService.clients.subscribe(x => setData(x));
	}

	useEffect(() => {
		let isMounted = true;
		clientService.read()
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
		clientService.clients.subscribe(x => setData(x));
		return () => { isMounted = false };
	}, []);

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
			refresh();
		}
	}

	return (
		<section className="content">
			<h2><i className="ico clients"></i>Clients</h2>
			<div className="grey-box-wrap reports">
				<a href="#new-member" className="link new-member-popup" onClick={handleNewMember}>Create new client</a>
				<SearchControl name="search-client" searchAction={searchClient}/>
			</div>

			{toggleNewItem && (<NewItemForm formType='client' handleToUpdate={refresh} />)}

			<AlphabetPanel active='k' disabled='m' />

			{!dataLoaded && <LoadingComponent />}

			{dataLoaded && <ClientDetailsList clients={data} handleToUpdate={refresh} />}

			<Pagination />
		</section>
	);
}