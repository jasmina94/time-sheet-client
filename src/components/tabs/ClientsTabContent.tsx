import { useState } from 'react';
import '../../assets/css/Styles.css';
import { NewItemForm } from '../forms/NewItemForm';
import { AlphabetPanel } from '../AlphabetPanel';
import { useEffect } from 'react';

export const ClientsTabContent = () => {
	const [newItem, setNewItem] = useState(false);
	const [clients, setClients] = useState([]);

	const handleNewMember = (e: any) => {
		e.preventDefault();
		setNewItem(!newItem);
	}

	useEffect(() => {
		console.log('Call when clients change ... ');
	}, [clients]);


	return (
		<section className="content">
			<h2><i className="ico clients"></i>Clients</h2>
			<div className="grey-box-wrap reports">
				<a href="#new-member" className="link new-member-popup" onClick={handleNewMember}>Create new client</a>
				<div className="search-page">
					<input type="search" name="search-clients" className="in-search" />
				</div>
			</div>
			{newItem && (<NewItemForm formType='client'/>)}
			<AlphabetPanel active='k' disabled='m'/>
			<div className="accordion-wrap clients">
				<div className="item">
					<div className="heading">
						<span>ADAM Software NV</span>
						<i>+</i>
					</div>
					<div className="details">
						<ul className="form">
							<li>
								<label>Client name:</label>
								<input type="text" className="in-text" />
							</li>
							<li>
								<label>Zip/Postal code:</label>
								<input type="text" className="in-text" />
							</li>
						</ul>
						<ul className="form">
							<li>
								<label>Address:</label>
								<input type="text" className="in-text" />
							</li>
							<li>
								<label>Country:</label>
								<select>
									<option>Select country</option>
								</select>
							</li>
						</ul>
						<ul className="form last">
							<li>
								<label>City:</label>
								<input type="text" className="in-text" />
							</li>
						</ul>
						<div className="buttons">
							<div className="inner">
								<a href=" " className="btn green">Save</a>
								<a href=" " className="btn red">Delete</a>
							</div>
						</div>
					</div>
				</div>
				<div className="item">
					<div className="heading">
						<span>Clockwork</span>
						<i>+</i>
					</div>
					<div className="details">
						<ul className="form">
							<li>
								<label>Client name:</label>
								<input type="text" className="in-text" />
							</li>
							<li>
								<label>Zip/Postal code:</label>
								<input type="text" className="in-text" />
							</li>
						</ul>
						<ul className="form">
							<li>
								<label>Address:</label>
								<input type="text" className="in-text" />
							</li>
							<li>
								<label>Country:</label>
								<select>
									<option>Select country</option>
								</select>
							</li>
						</ul>
						<ul className="form last">
							<li>
								<label>City:</label>
								<input type="text" className="in-text" />
							</li>
						</ul>
						<div className="buttons">
							<div className="inner">
								<a href=" " className="btn green">Save</a>
								<a href=" " className="btn red">Delete</a>
							</div>
						</div>
					</div>
				</div>
				<div className="item">
					<div className="heading">
						<span>Emperor Design</span>
						<i>+</i>
					</div>
					<div className="details">
						<ul className="form">
							<li>
								<label>Client name:</label>
								<input type="text" className="in-text" />
							</li>
							<li>
								<label>Zip/Postal code:</label>
								<input type="text" className="in-text" />
							</li>
						</ul>
						<ul className="form">
							<li>
								<label>Address:</label>
								<input type="text" className="in-text" />
							</li>
							<li>
								<label>Country:</label>
								<select>
									<option>Select country</option>
								</select>
							</li>
						</ul>
						<ul className="form last">
							<li>
								<label>City:</label>
								<input type="text" className="in-text" />
							</li>
						</ul>
						<div className="buttons">
							<div className="inner">
								<a href=" " className="btn green">Save</a>
								<a href=" " className="btn red">Delete</a>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="pagination">
				<ul>
					<li>
						<a href=" ">1</a>
					</li>
					<li>
						<a href=" ">2</a>
					</li>
					<li>
						<a href=" ">3</a>
					</li>
					<li className="last">
						<a href=" ">Next</a>
					</li>
				</ul>
			</div>
		</section>
	);
}