import { Component } from 'react'
import axios from 'axios'

export class Profile extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fullname: '',
      email: '',
      role: '',
      loading: true,
      error: null
    }
  }

  componentDidMount() {
    const token = localStorage.getItem('jwtToken')
    if (!token) {
      this.setState({ error: 'Please login first', loading: false })
      return
    }

    axios.post('http://localhost:8080/users/getfullname', { csrid: token })
      .then(response => {
        if (response.data.startsWith('401')) {
          this.setState({ error: 'Session expired. Please login again', loading: false })
          return
        }
        this.setState({ 
          fullname: response.data,
          loading: false 
        })
      })
      .catch(error => {
        console.error('Error fetching profile data:', error)
        this.setState({ 
          error: 'Error fetching profile data', 
          loading: false 
        })
      })
  }

  render() {
    const { fullname, loading, error } = this.state

    if (loading) return <div>Loading...</div>
    if (error) return <div className="error">{error}</div>

    return (
      <div className="profile-container">
        <h1>Your Profile</h1>
        <div className="profile-details">
          <h2>Welcome, {fullname}!</h2>
        </div>
        <div className="profile-settings">
          <h3>Settings</h3>
          <div className="theme-toggle">
            <label htmlFor="themeSwitch">Dark Mode:</label>
            <input type="checkbox" id="themeSwitch" onChange={this.toggleTheme} />
          </div>
          <button className="logout-btn" onClick={this.handleLogout}>Logout</button>
        </div>
      </div>
    )
  }

  toggleTheme = () => {
    const currentTheme = document.body.classList.contains('dark-mode');
    if (currentTheme) {
      document.body.classList.remove('dark-mode');
      localStorage.setItem('theme', 'light');
    } else {
      document.body.classList.add('dark-mode');
      localStorage.setItem('theme', 'dark');
    }
  }

  handleLogout = () => {
    localStorage.removeItem('jwtToken');
    window.location.replace('/');
  }
}

export default Profile
