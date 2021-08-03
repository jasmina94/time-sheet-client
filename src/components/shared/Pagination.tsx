export const PaginationDefaultCongif = {
	page: 1,
	limit: 3,
	numOfPages: 0,
	perPageOptions: [3, 5, 10, 20]
}

export const getPerPagePaginationOptions = (dataLength: number) => {
	let perPage: number[] = [];
	let perPageOptions = PaginationDefaultCongif.perPageOptions;

	[...perPageOptions].forEach(x => {
		fillPerPage(perPage, x, dataLength);
	})

	if (perPage.length === 0) {
		perPage.push(3);
	}

	return perPage;
}

function fillPerPage (array: number[], limit: number, dataLength: number) {
	if (limit <= dataLength) {
		array.push(limit);
	} else {
		let res = limit / dataLength;
		if (res < 2) {
			array.push(limit);
		} 
	}
}

export const Pagination = (props: any) => {
	const next = '>';
	const previous = '<';
	const IDLE_PAGE = 'of';
	const PAGE_LIMIT = 3;
	const options = props.options ?? PaginationDefaultCongif.perPageOptions;
	const page = props.activePage;

	let pageNums = [];
	let startIndex = 1;

	if (props.totalNumOfPages > 0) {
		if (props.totalNumOfPages > PAGE_LIMIT) {
			if (page <= PAGE_LIMIT) {
				for (let i = startIndex; i < startIndex + PAGE_LIMIT; i++) {
					pageNums.push(i);
				}
			} else {
				startIndex = page + 1 - PAGE_LIMIT;
				for (let i = startIndex; i < startIndex + PAGE_LIMIT; i++) {
					pageNums.push(i);
				}
			}

		} else {
			for (let i = 1; i <= props.totalNumOfPages; i++) {
				pageNums.push(i);
			}
		}

	}

	const handlePreviousPage = (e: any) => {
		e.preventDefault();
		const newPage = page - 1;
		props.paginate(newPage);
	}

	const handleNextPage = (e: any) => {
		e.preventDefault();
		const newPage = page + 1;
		props.paginate(newPage);
	}

	const handleChangePage = (e: any) => {
		e.preventDefault();
		const newPage = parseInt(e.target.id);
		props.paginate(newPage);
	}

	return (
		<div className='pagination'>
			{props.dataLength === 0
				? <p>No results</p>
				: <>
					<ul>
						{props.totalNumOfPages > PAGE_LIMIT
							? <>
								<li className={page === 1 ? 'disabled-page-link' : ''}>
									<a href=' ' onClick={handlePreviousPage}>
										{previous}
									</a>
								</li>

								{pageNums.map((pageNum: number) => (
									<li key={pageNum} className={pageNum === page ? 'active-page' : ''}>
										<a href=' ' onClick={handleChangePage} id={pageNum.toString()}>
											{pageNum}
										</a>
									</li>
								))}

								<li key='IDLE' style={{ 'width': '30px' }}>{IDLE_PAGE}</li>
								<li key={props.totalNumOfPages} className={page === props.totalNumOfPages ? 'disabled-page-link' : ''}>
									<a href=' ' onClick={handleChangePage} id={props.totalNumOfPages.toString()}>{props.totalNumOfPages}</a>
								</li>
								<li className={page === props.totalNumOfPages ? 'disabled-page-link' : ''}>
									<a href=' ' onClick={handleNextPage}>
										{next}
									</a>
								</li>
							</>
							: <>
								{pageNums.map((pageNum: number) => (
									<li key={pageNum} className={pageNum === page ? 'active-page' : ''}>
										<a href=' ' onClick={handleChangePage} id={pageNum.toString()}>
											{pageNum}
										</a>
									</li>
								))}
							</>
						}
					</ul>
					<select className='pagination-select' value={props.perPage} onChange={(e) => props.changeLimit(e.target.value)}>
						{options.map((itemPerPage: number) => (
							<option value={itemPerPage} key={itemPerPage}>{itemPerPage}</option>
						))}
					</select>
				</>}
		</div>
	)
}