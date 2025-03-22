import { Component } from 'react';
import '../css/dashboard.css';
import { BASEURL, callApi, getSession, setSession } from '../api';
import MenuBar from './MenuBar';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { fullname: '', isCollapsed: false };
    this.showFullname = this.showFullname.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
  }

  componentDidMount() {
    let csr = getSession("csrid");
    if (csr === "") this.logout();
    let data = JSON.stringify({ csrid: csr });
    callApi("POST", BASEURL + "users/getfullname", data, this.showFullname);
  }

  showFullname(response) {
    this.setState({ fullname: response });
  }

  logout() {
    setSession("csrid", "", -1);
    window.location.replace("/");
  }

  toggleSidebar() {
    this.setState(prevState => ({ isCollapsed: !prevState.isCollapsed }));
  }

  render() {
    const { fullname, isCollapsed } = this.state;

    return (
      <div className={`dashboard ${isCollapsed ? 'collapsed' : ''}`}>
        <div className='header'>
          <img className='logout' onClick={() => this.logout()} src='./images/logout.png' alt='logout' />
          <label>{fullname}</label>
        </div>
        <div className='menu'>
          <MenuBar isCollapsed={isCollapsed} toggleSidebar={this.toggleSidebar}  username={fullname}/>
        </div>
        <div className='outlet'>OUTLET</div>
      </div>
    );
  }
}
