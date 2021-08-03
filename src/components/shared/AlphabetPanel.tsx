import { useState } from 'react';

export const AlphabetPanel = (props: any) => {
    const [searchLetter, setSearhLetter] = useState('');
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const elements: any[] = [];

    const handleClick = (e: any) => {
        e.preventDefault();
        const letter = e.target.closest('a').getAttribute('href');
        if (props.disabled !== letter) {
            if (searchLetter !== letter) {
                setSearhLetter(letter);
                props.search(letter);
            } else {
                setSearhLetter('');
                props.searchReset();
            }
        }
    }

    alphabet.forEach((item: string) => {
        let attr = '';
        if (props.active !== '' && props.active === item) {
            attr = 'active';
        } else if (props.disabled !== '' && props.disabled === item) {
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