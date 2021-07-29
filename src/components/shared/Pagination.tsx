export const PaginationDefaultCongif = {
	page: 1,
	limit: 3,
	numOfPages: 0,
	perPageOptions: [3, 5, 10, 20]
}

export const Pagination = (props: any) => {
	const options = props.options ?? PaginationDefaultCongif.perPageOptions;
	const pageNumbers = [];
	for (let i = 1; i <= props.total; i++) {
		pageNumbers.push(i);
	}

	const handleChangePage = (e: any) => {
		e.preventDefault();
		const page = e.target.id;
		props.paginate(parseInt(page));
	}	

	return (
		<div className='pagination'>
			<ul>
				{pageNumbers.map(number => (
					<li key={number} className={number === props.activePage ? 'active-page' : ''}>
						<a href='!#' onClick={handleChangePage} id={number.toString()}>
							{number}
						</a>
					</li>
				))}
			</ul>
			
			{props.noResults && <p>No results</p>}

			<select className='pagination-select' value={props.perPage} onChange={(e) => props.changeLimit(e.target.value)}>
				{options.map((itemPerPage:number) => (
					<option value={itemPerPage} key={itemPerPage}>{itemPerPage}</option>	
				))}				
			</select>
		</div>
	)
}