import { useState } from 'react';
import '../../assets/css/Styles.css';
import { NewItemForm } from '../forms/NewItemForm';
import { Pagination } from '../shared/Pagination';
import { ClientDetailsList } from '../clients/ClientDetailsList';
import { LoadingComponent } from '../shared/LoadingComponent';
import { AlphabetPanel } from '../shared/AlphabetPanel';
import { useEffect } from 'react';
import { clientService } from '../../services/clientService';

export const ClientsTabContent = () => {
	const [data, setData] = useState(clientService.clientsValue);
	const [dataLoaded, setDataLoaded] = useState(false);
	const [toggleNewItem, setToggleNewItem] = useState(false);

	const handleNewMember = (e: any) => {
		e.preventDefault();
		setToggleNewItem(!toggleNewItem);
	}

	const refresh = () => {
		console.log('Update - ClientsTabContent...');
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

	return (
		<section className="content">
			<h2><i className="ico clients"></i>Clients</h2>
			<div className="grey-box-wrap reports">
				<a href="#new-member" className="link new-member-popup" onClick={handleNewMember}>Create new client</a>
				<div className="search-page">
					<input type="search" name="search-clients" className="in-search" />
				</div>
			</div>

			{toggleNewItem && (<NewItemForm formType='client' handleToUpdate={refresh}/>)}

			<AlphabetPanel active='k' disabled='m' />

			{!dataLoaded && <LoadingComponent />}

			{dataLoaded && <ClientDetailsList clients={data} handleToUpdate={refresh}/>}

			<Pagination />
		</section>
	);
}