import { useEffect } from "react";
import { useState } from "react";

export const PaginationDefaultCongif = {
	page: 1,
	limit: 3,
	numOfPages: 0,
	perPageOptions: [3, 5, 10, 20]
}

const initialPages: number[] = [];

export const Pagination = (props: any) => {
	const next = '>';
	const previous = '<';
	const IDLE_PAGE = 'of';
	const PAGE_LIMIT = 3;
	const [pages, setPages] = useState(initialPages);
	const [activePage, setActivePage] = useState(props.activePage);

	const options = props.options ?? PaginationDefaultCongif.perPageOptions;

	useEffect(() => {
		callPaginate();
	}, [activePage])

	useEffect(() => {
		let pageNums = [];
		let startIndex = 1;

		if (props.total > PAGE_LIMIT) {
			if (activePage <= PAGE_LIMIT) {
				for (let i = startIndex; i < startIndex + PAGE_LIMIT; i++) {  // 1, 2, 3 of 9
					pageNums.push(i);
				}
			} else {
				startIndex = activePage + 1 - PAGE_LIMIT;
				for (let i = startIndex; i < startIndex + PAGE_LIMIT; i++) {
					pageNums.push(i);
				}
			}

		} else {
			for (let i = 1; i <= props.total; i++) { // 1, 2, 3
				pageNums.push(i);
			}
		}

		setPages(pageNums);

	}, [pages])

	const handlePreviousPage = (e: any) => {
		e.preventDefault();
		const page = activePage - 1;
		setActivePage(page);
	}

	const handleNextPage = (e: any) => {
		e.preventDefault();
		const page = activePage + 1;
		setActivePage(page);
	}

	const handleChangePage = (e: any) => {
		e.preventDefault();
		const page = parseInt(e.target.id);
		setActivePage(page);
	}

	const callPaginate = () => {
		props.paginate(activePage);
	}

	const changePageLimit = (e: any) => {
		props.changeLimit(e.target.value);
	}

	return (
		<div className='pagination'>
			{props.noResults
				? <p>No results</p>
				: <>
					<ul>
						{props.total > PAGE_LIMIT
							? <>
								<li className={activePage === 1 ? 'disabled-page-link' : ''}>
									<a href=' ' onClick={handlePreviousPage}>
										{previous}
									</a>
								</li>
								{pages.map(number => (
									<li key={number} className={number === activePage ? 'active-page' : ''}>
										<a href=' ' onClick={handleChangePage} id={number.toString()}>
											{number}
										</a>
									</li>
								))}
								<li key='IDLE' style={{ 'width': '30px' }}>{IDLE_PAGE}</li>
								<li key={props.total} className={activePage === props.total ? 'disabled-page-link' : ''}>
									<a href=' ' onClick={handleChangePage} id={props.total.toString()}>{props.total}</a>
								</li>
								<li className={activePage === props.total ? 'disabled-page-link' : ''}>
									<a href=' ' onClick={handleNextPage}>
										{next}
									</a>
								</li>
							</>
							: <></>
						}
					</ul>
					<select className='pagination-select' value={props.perPage} onChange={(e) => changePageLimit(e)}>
						{options.map((itemPerPage: number) => (
							<option value={itemPerPage} key={itemPerPage}>{itemPerPage}</option>
						))}
					</select>
				</>}
		</div>
	)
}