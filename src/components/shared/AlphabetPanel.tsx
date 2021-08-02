import { useEffect, useState } from 'react';
import { searchService } from '../../services/api/searchService';

export const AlphabetPanel = (props: any) => {
    const [searchLetter, setSearhLetter] = useState('');
    const [active, setActive] = useState(props.active);
    const [disabled, setDisabled] = useState(props.disabled);
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const elements: any[] = [];

    useEffect(() => {
        if (searchLetter) {
            searchService.searchByLetter(props.page, props.perPage, props.type, searchLetter)
                .then(response => {
                    if (response.success) {
                        props.searchSuccess(response.data, searchLetter);
                        setActive(searchLetter);
                    } else {
                        props.searchReset();
                    }
                });
        }
    }, [searchLetter])

    const handleClick = (e: any) => {
        e.preventDefault();
        const letter = e.target.closest('a').getAttribute('href');
        if (props.disabled !== letter) {
            if (searchLetter !== letter) {
                setSearhLetter(letter);
            } else {
                setActive('');
                setSearhLetter('');
                props.searchReset();
            }
        }
    }

    alphabet.forEach((item: string) => {
        let attr = '';
        if (active !== '' && active === item) {
            attr = 'active';
        } else if (disabled !== '' && disabled === item) {
            attr = 'disabled';
        }
        if (item === 'z') {
            attr += ' last';
        }
        elements.push(
            <li className={attr} key={item}>
                <a href={item} onClick={handleClick}>{item}</a>
            </li>
        );
    });

    return (
        <div className='alpha'>
            <ul>
                {elements}
            </ul>
        </div>
    )
}