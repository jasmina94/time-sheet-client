export const AlphabetPanel = (props: any) => {
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const elements: any[] = [];

    const handleClick = (e: any)  => {
        e.preventDefault();
        const searchLetter = e.target.closest('a').getAttribute('href');
        if (props.disabled !== searchLetter) {
            props.alphabetSearch(searchLetter);
        }
    }

    alphabet.forEach((item: string) => {
        let attr = '';
        if (props.active !== '' && item === props.active) {
            attr = 'active';
        } else if (props.disabled !== '' && item === props.disabled) {
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
        <div className="alpha">
            <ul>
                {elements}
            </ul>
        </div>
    )
}