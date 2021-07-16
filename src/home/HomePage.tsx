import '../assets/css/Styles.css'
import { useState } from 'react';
import Footer from '../components/Footer';
import UserMenu from '../components/UserMenu';
import { MenuItem } from '../model/Model';
import {
  ClientsTabContent, TimeSheetTabContent,
  ReportsTabContent, ProjectsTabContent,
  CategoriesTabContent, TeamMembersTabContent
} from '../components/tabs';
import { Menu, MobileMenu } from '../components/menu';
import { authenticationService } from '../services/authenticationService';


const HomePage = (props: any) => {
  const [openProfile, setOpenProfile] = useState(false);
  const [activeTab, setActiveTab] = useState('timesheet');

  const logout = (e: any) => {
    e.preventDefault();
    authenticationService.logout();
  }

  const handleProfileLink = (e: any) => {
    e.preventDefault();
    setOpenProfile(!openProfile);
  }

  const handleTabClick = (e: any) => {
    e.preventDefault();
    const id = e.target.id;
    setActiveTab(id);
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case 'timesheet':
        return <TimeSheetTabContent />
      case 'clients':
        return <ClientsTabContent />
      case 'projects':
        return <ProjectsTabContent />
      case 'categories':
        return <CategoriesTabContent />
      case 'team-memebers':
        return <TeamMembersTabContent />
      case 'reports':
        return <ReportsTabContent />
      default:
        return <TimeSheetTabContent />
    }
  }

  const menuItems: MenuItem[] = [
    {
      id: 'timesheet',
      name: 'timesheet',
      href: ' ',
      displayName: 'TimeSheet'
    },
    {
      id: 'clients',
      name: 'clients',
      href: ' ',
      displayName: 'Clients'
    },
    {
      id: 'projects',
      name: 'projects',
      href: ' ',
      displayName: 'Projects'
    },
    {
      id: 'categories',
      name: 'categories',
      href: ' ',
      displayName: 'Categories'
    },
    {
      id: 'team-memebers',
      name: 'team-memebers',
      href: ' ',
      displayName: 'Team memebers'
    },
    {
      id: 'reports',
      name: 'reports',
      href: ' ',
      displayName: 'Reports'
    },
  ];

  return (
    <div className="container">
      <header>
        <div className="top-bar"></div>
        <div className="wrapper">
          <a href="index.html" className="logo">
            <img src="logo.png" alt="Emakina Timesheet" />
          </a>
          <ul className="user right">
            <li>
              <a href=" " onClick={handleProfileLink}>{props.userInfo.firstname} {props.userInfo.lastname}</a>
              <div className="invisible"></div>
              {openProfile && (<UserMenu />)}
            </li>
            <li className="last">
              <a href="" onClick={logout}>Logout</a>
            </li>
          </ul>
          <nav>
            <Menu activeTab={activeTab} handleTabClick={handleTabClick} menuItems={menuItems}/>
            <MobileMenu activeTab={activeTab} handleTabClick={handleTabClick} menuItems={menuItems}/>
            <span className="line"></span>
          </nav>
        </div>
      </header>
      <div className="wrapper">
        {renderTabContent()}
      </div>
      <Footer />
    </div>

  );
}

export default HomePage;
