import '../assets/css/Styles.css'
import { authenticationService } from '../services/authenticationService';
import { useState } from 'react';
import UserMenu from '../components/UserMenu';
import { useHistory } from 'react-router-dom';


const HomePage = (props: any) => {
  const tabClass = 'btn nav';
  const activeTabClass = 'btn nav active';

  const history = useHistory();
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

  const getTabClassNameFor = (tabName: string): string => {
    let className: string = 'btn nav';
    if (activeTab === tabName) {
      className += ' active';
    }

    return className;
  }

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
            <ul className="menu">
              <li>
                <a href=" " id='timesheet' className={getTabClassNameFor('timesheet')} onClick={handleTabClick}>TimeSheet</a>
              </li>
              <li>
                <a href=" " id='clients' className={getTabClassNameFor('clients')} onClick={handleTabClick}>Clients</a>
              </li>
              <li>
                <a href=" " id='projects' className={getTabClassNameFor('projects')} onClick={handleTabClick}>Projects</a>
              </li>
              <li>
                <a href=" " id='categories' className={getTabClassNameFor('categories')} onClick={handleTabClick}>Categories</a>
              </li>
              <li>
                <a href=" " id='team-memebers' className={getTabClassNameFor('team-memebers')} onClick={handleTabClick}>Team members</a>
              </li>
              <li className="last">
                <a href=" " id='reports' className={getTabClassNameFor('reports')} onClick={handleTabClick}>Reports</a>
              </li>
            </ul>
            <div className="mobile-menu">
              <a href=" " className="menu-btn">
                <span>mobile menu</span>
              </a>
              <ul>
                <li>
                  <a href=" ">TimeSheet</a>
                </li>
                <li>
                  <a href=" ">Clients</a>
                </li>
                <li>
                  <a href=" ">Projects</a>
                </li>
                <li>
                  <a href=" ">Categories</a>
                </li>
                <li>
                  <a href=" ">Team members</a>
                </li>
                <li className="last">
                  <a href=" ">Reports</a>
                </li>
              </ul>
            </div>
            <span className="line"></span>
          </nav>
        </div>
      </header>
      <div className="wrapper">
        <section className="content">
          <h2><i className="ico timesheet"></i>TimeSheet</h2>
          <div className="grey-box-wrap">
            <div className="top">
              <a href=" " className="prev"><i></i>previous month</a>
              <span className="center">February, 2021</span>
              <a href=" " className="next">next month<i></i></a>
            </div>
            <div className="bottom">

            </div>
          </div>
          <table className="month-table">
            <thead>
              <tr className="head">
                <th><span>monday</span></th>
                <th>tuesday</th>
                <th>wednesday</th>
                <th>thursday</th>
                <th>friday</th>
                <th>saturday</th>
                <th>sunday</th>
              </tr>
              <tr className="mobile-head">
                <th>mon</th>
                <th>tue</th>
                <th>wed</th>
                <th>thu</th>
                <th>fri</th>
                <th>sat</th>
                <th>sun</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="positive previous">
                  <div className="date">
                    <span>28.</span>
                  </div>
                  <div className="hours">
                    <a href="days.html">
                      Hours: <span>7.5</span>
                    </a>
                  </div>
                </td>
                <td className="positive previous">
                  <div className="date">
                    <span>29.</span>
                  </div>
                  <div className="hours">
                    <a href="days.html">
                      Hours: <span>7.5</span>
                    </a>
                  </div>
                </td>
                <td className="positive previous">
                  <div className="date">
                    <span>30.</span>
                  </div>
                  <div className="hours">
                    <a href="days.html">
                      Hours: <span>7.5</span>
                    </a>
                  </div>
                </td>
                <td className="positive previous">
                  <div className="date">
                    <span>31.</span>
                  </div>
                  <div className="hours">
                    <a href="days.html">
                      Hours: <span>7.5</span>
                    </a>
                  </div>
                </td>
                <td className="positive">
                  <div className="date">
                    <span>1.</span>
                  </div>
                  <div className="hours">
                    <a href="days.html">
                      Hours: <span>7.5</span>
                    </a>
                  </div>
                </td>
                <td>
                  <div className="date">
                    <span>2.</span>
                  </div>
                  <div className="hours">
                    <a href="days.html">
                      Hours: <span>0</span>
                    </a>
                  </div>
                </td>
                <td>
                  <div className="date">
                    <span>3.</span>
                  </div>
                  <div className="hours">
                    <a href="days.html">
                      Hours: <span>0</span>
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="positive">
                  <div className="date">
                    <span>4.</span>
                  </div>
                  <div className="hours">
                    <a href="days.html">
                      Hours: <span>7.5</span>
                    </a>
                  </div>
                </td>
                <td className="positive">
                  <div className="date">
                    <span>5.</span>
                  </div>
                  <div className="hours">
                    <a href="days.html">
                      Hours: <span>7.5</span>
                    </a>
                  </div>
                </td>
                <td className="positive">
                  <div className="date">
                    <span>6.</span>
                  </div>
                  <div className="hours">
                    <a href="days.html">
                      Hours: <span>7.5</span>
                    </a>
                  </div>
                </td>
                <td className="positive">
                  <div className="date">
                    <span>7.</span>
                  </div>
                  <div className="hours">
                    <a href="days.html">
                      Hours: <span>7.5</span>
                    </a>
                  </div>
                </td>
                <td className="positive">
                  <div className="date">
                    <span>8.</span>
                  </div>
                  <div className="hours">
                    <a href="days.html">
                      Hours: <span>7.5</span>
                    </a>
                  </div>
                </td>
                <td>
                  <div className="date">
                    <span>9.</span>
                  </div>
                  <div className="hours">
                    <a href="days.html">
                      Hours: <span>0</span>
                    </a>
                  </div>
                </td>
                <td>
                  <div className="date">
                    <span>10.</span>
                  </div>
                  <div className="hours">
                    <a href="days.html">
                      Hours: <span>0</span>
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="positive">
                  <div className="date">
                    <span>11.</span>
                  </div>
                  <div className="hours">
                    <a href="days.html">
                      Hours: <span>7.5</span>
                    </a>
                  </div>
                </td>
                <td className="positive">
                  <div className="date">
                    <span>12.</span>
                  </div>
                  <div className="hours">
                    <a href="days.html">
                      Hours: <span>7.5</span>
                    </a>
                  </div>
                </td>
                <td className="positive">
                  <div className="date">
                    <span>13.</span>
                  </div>
                  <div className="hours">
                    <a href="days.html">
                      Hours: <span>7.5</span>
                    </a>
                  </div>
                </td>
                <td className="positive">
                  <div className="date">
                    <span>14.</span>
                  </div>
                  <div className="hours">
                    <a href="days.html">
                      Hours: <span>7.5</span>
                    </a>
                  </div>
                </td>
                <td className="positive">
                  <div className="date">
                    <span>15.</span>
                  </div>
                  <div className="hours">
                    <a href="days.html">
                      Hours: <span>7.5</span>
                    </a>
                  </div>
                </td>
                <td>
                  <div className="date">
                    <span>16.</span>
                  </div>
                  <div className="hours">
                    <a href="days.html">
                      Hours: <span>0</span>
                    </a>
                  </div>
                </td>
                <td>
                  <div className="date">
                    <span>17.</span>
                  </div>
                  <div className="hours">
                    <a href="days.html">
                      Hours: <span>0</span>
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="negative">
                  <div className="date">
                    <span>18.</span>
                  </div>
                  <div className="hours">
                    <a href="days.html">
                      Hours: <span>4</span>
                    </a>
                  </div>
                </td>
                <td>
                  <div className="date">
                    <span>19.</span>
                  </div>
                  <div className="hours">
                    <a href="days.html">
                      Hours: <span>0</span>
                    </a>
                  </div>
                </td>
                <td className="positive">
                  <div className="date">
                    <span>20.</span>
                  </div>
                  <div className="hours">
                    <a href="days.html">
                      Hours: <span>7.5</span>
                    </a>
                  </div>
                </td>
                <td>
                  <div className="date">
                    <span>21.</span>
                  </div>
                  <div className="hours">
                    <a href="days.html">
                      Hours: <span>0</span>
                    </a>
                  </div>
                </td>
                <td className="disable">
                  <div className="date">
                    <span>22.</span>
                  </div>
                  <div className="hours">
                    <a href="days.html">
                      Hours: <span>0</span>
                    </a>
                  </div>
                </td>
                <td className="disable">
                  <div className="date">
                    <span>23.</span>
                  </div>
                  <div className="hours">
                    <a href="days.html">
                      Hours: <span>0</span>
                    </a>
                  </div>
                </td>
                <td className="disable">
                  <div className="date">
                    <span>24.</span>
                  </div>
                  <div className="hours">
                    <a href="days.html">
                      Hours: <span>0</span>
                    </a>
                  </div>
                </td>
              </tr>
              <tr>
                <td className="disable">
                  <div className="date">
                    <span>25.</span>
                  </div>
                  <div className="hours">
                    <a href="days.html">
                      Hours: <span>0</span>
                    </a>
                  </div>
                </td>
                <td className="disable">
                  <div className="date">
                    <span>26.</span>
                  </div>
                  <div className="hours">
                    <a href="days.html">
                      Hours: <span>0</span>
                    </a>
                  </div>
                </td>
                <td className="disable">
                  <div className="date">
                    <span>27.</span>
                  </div>
                  <div className="hours">
                    <a href="days.html">
                      Hours: <span>0</span>
                    </a>
                  </div>
                </td>
                <td className="disable">
                  <div className="date">
                    <span>28.</span>
                  </div>
                  <div className="hours">
                    <a href="days.html">
                      Hours: <span>0</span>
                    </a>
                  </div>
                </td>
                <td className="disable">
                  <div className="date">
                    <span>1.</span>
                  </div>
                  <div className="hours">
                    <a href="days.html">
                      Hours: <span>0</span>
                    </a>
                  </div>
                </td>
                <td className="disable">
                  <div className="date">
                    <span>2.</span>
                  </div>
                  <div className="hours">
                    <a href="days.html">
                      Hours: <span>0</span>
                    </a>
                  </div>
                </td>
                <td className="disable">
                  <div className="date">
                    <span>3.</span>
                  </div>
                  <div className="hours">
                    <a href="days.html">
                      Hours: <span>0</span>
                    </a>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
          <div className="total">
            <span>Total hours: <em>90</em></span>
          </div>
        </section>
      </div>
      <footer>
        <div className="wrapper">
          <ul>
            <li>
              <span>Copyright @ 2021. Emakina All rights reserved</span>
            </li>
          </ul>
          <ul className="right">
            <li>
              <a href=" ">Terms of service</a>
            </li>
            <li>
              <a href=" " className="last">Privacy policy</a>
            </li>
          </ul>
        </div>
      </footer>
    </div>

  );
}

export default HomePage;
