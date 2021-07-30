import { useEffect, useState } from 'react';
import { searchService } from '../../services/api/searchService';

export const SearchControl = (props: any) => {
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        if (searchTerm) {

            props.searchInProgress();

            const delay = setTimeout(() => {
                searchService.searchFor(props.type, searchTerm)
                    .then(response => {
                        console.log(response.data);
                        if (response.success) {
                            console.log('success search for term: ' + searchTerm);
                            props.searchSuccess(response.data, searchTerm);
                        } else {
                            console.log(response);
                        }
                    });
            }, 3000);

            return () => clearTimeout(delay);
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