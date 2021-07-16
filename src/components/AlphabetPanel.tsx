export const AlphabetPanel = (props: any) => {
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
    const elements: any[] = [];

    alphabet.map((item: string) => {
        let attr = '';
        if (item === props.active) {
            attr = 'active';
        } else if (item === props.disabled) {
            attr = 'disabled';
        }
        if (item === 'z') {
            attr += ' last';
        }

        elements.push(
            <li className={attr}>
                <a href=" ">{item}</a>
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