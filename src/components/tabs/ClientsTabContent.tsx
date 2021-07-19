import { useState } from 'react';
import '../../assets/css/Styles.css';
import { NewItemForm } from '../forms/NewItemForm';
import { Pagination } from '../Pagination';
import { ClientDetailsList } from '../ClientDetailsList';
import { LoadingComponent } from '../LoadingComponent';
import { AlphabetPanel } from '../AlphabetPanel';
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

	useEffect(() => {
		clientService.getAll()
			.then(response => {
				if (response.success) {
					setDataLoaded(true);
					setData(response.data);
				} else {
					setDataLoaded(false);
				}
			})

		clientService.clients.subscribe(x => setData(x));
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
			
			{toggleNewItem && (<NewItemForm formType='client' />)}

			<AlphabetPanel active='k' disabled='m' />
			
			{!dataLoaded && <LoadingComponent />}
			
			{dataLoaded && <ClientDetailsList clients={data}/>}
			
			<Pagination />
		</section>
	);
}