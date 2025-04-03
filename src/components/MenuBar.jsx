import { Component } from 'react'
import PropTypes from 'prop-types'
import { BASEURL, callApi, getSession } from '../api';
import '../css/Menubar.css'

export class Menubar extends Component {
  constructor(props){
    super(props);
    this.state = {menuItems : []};
    this.loadMenu = this.loadMenu.bind(this);
  }

  componentDidMount(){
    let csr = getSession("csrid");
    let data = JSON.stringify({csrid:csr})
    callApi("POST", BASEURL + "menus/getmenusbyrole", data, this.loadMenu)
  }

  loadMenu(response){
    let data = JSON.parse(response);
    this.setState({menuItems : data});
  }

  render() {
    const {menuItems} = this.state;

    return (
      <div className='menubar'>
        <div className='menuheader'>MENU <img src='/icons/menu.png' alt='Menu' /></div>
        <div className='menulist'>
        <ul>
          {menuItems.map((row, index) =>(
            <li key={row.id || index} onClick={() => this.props.onMenuClick(row.mid)}>
              {row.menu} <img src={row.icon} alt={row.menu} />
            </li>
           ))}
         </ul>    
        </div>        
      </div>
    )
  }
}

Menubar.propTypes = {
  onMenuClick: PropTypes.func.isRequired
}

export default Menubar