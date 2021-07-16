import '../../assets/css/Styles.css';

const MenuItem = (props: any) => {
    const getTabClassNameFor = (tabName: string): string => {
        let className: string = 'btn nav';
        if (props.activeTab === tabName) {
            className += ' active';
        }

        return className;
    }

    return (
        <li>
            <a href={props.href} id={props.id} className={getTabClassNameFor(props.name)} onClick={props.handleTabClick}>
                {props.displayName}
            </a>
        </li>
    );
}

export default MenuItem;