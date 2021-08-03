import { useEffect, useState } from 'react';

export const SearchControl = (props: any) => {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (searchTerm) {
            props.searchInProgress();
            if (searchTerm.length > 1) {
                const delay = setTimeout(() => {
                    props.search(searchTerm);
                }, 3000);

                return () => clearTimeout(delay);
            }
        }
    }, [searchTerm]);

    const handleResetSearch = (e: any) => {
        if (e.which === 13 || e.keyCode === 13) {
            console.log(searchTerm);
            if (searchTerm === '') {
                props.searchReset();
            }
        }
    }

    return (
        <div className='search-page'>
            <input type='search' name={props.name} className='in-search'
                placeholder="Search..."
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyPress={(e) => handleResetSearch(e)} />
        </div>
    )
}