import { Component } from 'react';
import '../css/dashboard.css';
import { BASEURL, callApi, getSession, setSession } from '../api';
import MenuBar from './MenuBar';
import JobSearching from './JobSearching.jsx';
import JobPosting from './JobPosting.jsx';
import Profile from './Profile.jsx';


export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = { fullname: '', isCollapsed: false };
    this.showFullname = this.showFullname.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);
    this.loadComponent = this.loadComponent.bind(this);

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

  loadComponent(mid){
    let components = {
      "1":<JobPosting/>,
      "2":<JobSearching/>,
      "3":<Profile/>
    };
    this.setState({activeComponent:components[mid]});
}

  render() {
    const { fullname , activeComponent} = this.state;
    return (
        <div className='dashboard'>
        <div className='header'>
          <img className='logo' src='./images/logo1.png' alt='no' />
          <div className='header-right'>
            <label>{fullname}</label>
            <img className='logout' onClick={()=>this.logout()} src='./images/logout.png' alt='no' />
          </div>
        </div>
      <div className='menu'><MenuBar onMenuClick={this.loadComponent}/></div>
      <div className='outlet'>{activeComponent}</div>
      </div>
  );
  }
}
