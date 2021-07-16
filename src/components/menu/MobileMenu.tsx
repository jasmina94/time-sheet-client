import { useState } from 'react';
import '../../assets/css/Styles.css';
import { MenuItem as MenuItemInterface } from '../../model/Model';
import MenuItem from './MenuItem';

export const MobileMenu = (props: any) => {
    const [openMenu, setOpenMenu] = useState(false);

    const handleMenu = (e: any) => {
        e.preventDefault();
        setOpenMenu(!openMenu);
    }
    
    return (
        <div className="mobile-menu">
            <a href=" " className="menu-btn" onClick={handleMenu}>
                <span>mobile menu</span>
            </a>
            {openMenu && (
                <ul>
                    {props.menuItems.map((item: MenuItemInterface) =>
                        <MenuItem key={item.id}
                            id={item.id} name={item.name}
                            href={item.href} displayName={item.displayName}
                            handleTabClick={props.handleTabClick}
                            activeTab={props.activeTab} />
                    )}
                </ul>
            )}
        </div>
    )
};