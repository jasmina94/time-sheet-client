import '../../assets/css/Styles.css';
import { MenuItem as MenuItemInterface } from '../../model/Model';
import MenuItem from './MenuItem';

export const Menu = (props: any) => {
    return (
        <ul className="menu">
            {props.menuItems.map((item: MenuItemInterface) =>
                <MenuItem key={item.id}
                    id={item.id} name={item.name}
                    href={item.href} displayName={item.displayName}
                    handleTabClick={props.handleTabClick}
                    activeTab={props.activeTab} />
            )}
        </ul>
    );
};