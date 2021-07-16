import '../../assets/css/Styles.css';

export const TeamMembersTabContent = () => {
    return (
        <section className="content">
            <h2><i className="ico team-member"></i>Team members</h2>
            <div className="grey-box-wrap reports ico-member">
                <a href="#new-member" className="link new-member-popup test">
                    <span>Create new member</span>
                </a>
            </div>
            <div className="new-member-wrap">
                <div id="new-member" className="new-member-inner">
                    <h2>Create new team member</h2>
                    <ul className="form">
                        <li>
                            <label>Name:</label>
                            <input type="text" className="in-text" />
                        </li>
                        <li>
                            <label>Hours per week:</label>
                            <input type="text" className="in-text" />
                        </li>
                        <li>
                            <label>Username:</label>
                            <input type="text" className="in-text" />
                        </li>
                        <li>
                            <label>Email:</label>
                            <input type="text" className="in-text" />
                        </li>
                        <li className="inline">
                            <label>Status:</label>
                            <span className="radio">
                                <label htmlFor="inactive">Inactive:</label>
                                <input type="radio" value="1" name="status" id="inactive" />
                            </span>
                            <span className="radio">
                                <label htmlFor="active">Active:</label>
                                <input type="radio" value="2" name="status" id="active" />
                            </span>
                        </li>
                        <li className="inline">
                            <label>Role:</label>
                            <span className="radio">
                                <label htmlFor="admin">Admin:</label>
                                <input type="radio" value="1" name="status" id="admin" />
                            </span>
                            <span className="radio">
                                <label htmlFor="worker">Worker:</label>
                                <input type="radio" value="2" name="status" id="worker" />
                            </span>
                        </li>
                    </ul>
                    <div className="buttons">
                        <div className="inner">
                            <a href=" " className="btn green">Invite team member</a>
                        </div>
                    </div>
                </div>
            </div>
            <div className="accordion-wrap">
                <div className="item">
                    <div className="heading">
                        <span>Sladjana Miljanovic</span>
                        <i>+</i>
                    </div>
                    <div className="details">
                        <ul className="form">
                            <li>
                                <label>Name:</label>
                                <input type="text" className="in-text" />
                            </li>
                            <li>
                                <label>Hours per week:</label>
                                <input type="text" className="in-text" />
                            </li>
                        </ul>
                        <ul className="form">
                            <li>
                                <label>Username:</label>
                                <input type="text" className="in-text" />
                            </li>
                            <li>
                                <label>Email:</label>
                                <input type="text" className="in-text" />
                            </li>
                        </ul>
                        <ul className="form last">
                            <li>
                                <label>Status:</label>
                                <span className="radio">
                                    <label htmlFor="inactive">Inactive:</label>
                                    <input type="radio" value="1" name="status" id="inactive" />
                                </span>
                                <span className="radio">
                                    <label htmlFor="active">Active:</label>
                                    <input type="radio" value="2" name="status" id="active" />
                                </span>
                            </li>
                            <li>
                                <label>Role:</label>
                                <span className="radio">
                                    <label htmlFor="admin">Admin:</label>
                                    <input type="radio" value="1" name="status" id="admin" />
                                </span>
                                <span className="radio">
                                    <label htmlFor="worker">Worker:</label>
                                    <input type="radio" value="2" name="status" id="worker" />
                                </span>
                            </li>
                        </ul>
                        <div className="buttons">
                            <div className="inner">
                                <a href=" " className="btn green">Save</a>
                                <a href=" " className="btn red">Delete</a>
                                <a href=" " className="btn blue">Reset Password</a>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="item">
                    <div className="heading">
                        <span>Sladjana Miljanovic</span>
                        <i>+</i>
                    </div>
                    <div className="details">
                        <ul className="form">
                            <li>
                                <label>Name:</label>
                                <input type="text" className="in-text" />
                            </li>
                            <li>
                                <label>Hours per week:</label>
                                <input type="text" className="in-text" />
                            </li>
                        </ul>
                        <ul className="form">
                            <li>
                                <label>Username:</label>
                                <input type="text" className="in-text" />
                            </li>
                            <li>
                                <label>Email:</label>
                                <input type="text" className="in-text" />
                            </li>
                        </ul>
                        <ul className="form last">
                            <li>
                                <label>Status:</label>
                                <span className="radio">
                                    <label htmlFor="inactive">Inactive:</label>
                                    <input type="radio" value="1" name="status" id="inactive" />
                                </span>
                                <span className="radio">
                                    <label htmlFor="active">Active:</label>
                                    <input type="radio" value="2" name="status" id="active" />
                                </span>
                            </li>
                            <li>
                                <label>Role:</label>
                                <span className="radio">
                                    <label htmlFor="admin">Admin:</label>
                                    <input type="radio" value="1" name="status" id="admin" />
                                </span>
                                <span className="radio">
                                    <label htmlFor="worker">Worker:</label>
                                    <input type="radio" value="2" name="status" id="worker" />
                                </span>
                            </li>
                        </ul>
                        <div className="buttons">
                            <div className="inner">
                                <a href=" " className="btn green">Save</a>
                                <a href=" " className="btn red">Delete</a>
                                <a href=" " className="btn blue">Reset Password</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pagination">
                <ul>
                    <li>
                        <a href=" ">1</a>
                    </li>
                    <li>
                        <a href=" ">2</a>
                    </li>
                    <li>
                        <a href=" ">3</a>
                    </li>
                    <li className="last">
                        <a href=" ">Next</a>
                    </li>
                </ul>
            </div>
        </section>
    );
}