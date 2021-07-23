export const Pagination = (props: any) => {

	const pageNumbers = [];
	for (let i = 1; i <= Math.ceil(props.total / props.perPage); i++) {
		pageNumbers.push(i);
	}

	const handleChangePage = (e: any) => {
		e.preventDefault();
		const page = e.target.id;
		props.paginate(parseInt(page));
	}

	return (
		<div className="pagination">
			<ul>
				{pageNumbers.map(number => (
					<li key={number} className={number === props.activePage ? 'active-page' : ''}>
						<a href='!#' onClick={handleChangePage} id={number.toString()}>
							{number}
						</a>
					</li>
				))}
			</ul>
		</div>
	)
}