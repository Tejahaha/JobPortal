import { Component } from "react"
import "../css/JobPosting.css"
import { BASEURL, callApi } from '../api'

export class JobPosting extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      jobList: [],
      showForm: false,
      isEditing: false,
      newJob: {
        id: null,
        title: "",
        company: "",
        location: "",
        jobType: "",
        salary: "",
        description: "",
      }
    }
    this.readResponse = this.readResponse.bind(this);
    this.saveResponse = this.saveResponse.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.saveJob = this.saveJob.bind(this);
    this.showPopup = this.showPopup.bind(this);
    this.closePopup = this.closePopup.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
    this.updateResponse = this.updateResponse.bind(this);
    this.updateData = this.updateData.bind(this);
  }
  
  componentDidMount() {
    callApi("GET", BASEURL + "Jobs/getjobs", "", this.readResponse);
  }

  toggleForm() {
    this.setState(prevState => ({
      showForm: !prevState.showForm
    }))
  }
  
  readResponse(response) {
    if(response.includes("404::")){
      alert(response.split("::")[1]);
      return;
    }
    let data = JSON.parse(response);
    this.setState({jobList: data, jobs: data});
  }
  
  showPopup() {
    document.getElementById('jppopup').style.display = "block";
  }
  
  closePopup() {
    document.getElementById('jppopup').style.display = "none";
  }
  
  saveJob() {
    let data = JSON.stringify(this.state.newJob);
    const endpoint = this.state.isEditing ? "Jobs/update" : "Jobs/create";
    const method = this.state.isEditing ? "PUT" : "POST";
    callApi(method, BASEURL + endpoint, data, this.saveResponse);
  }
  
  saveResponse(response) {
    // Check if response contains error
    if(response.includes("404::")){
      alert(response.split("::")[1]);
      return;
    }
    
    // Show success popup
    this.showPopup();
    
    // Refresh job list after saving
    callApi("GET", BASEURL + "Jobs/getjobs", "", this.readResponse);
    
    // Reset form fields and state
    this.setState({
      showForm: false,
      isEditing: false,
      newJob: {
        id: null,
        title: "",
        company: "",
        location: "",
        jobType: "",
        salary: "",
        description: "",
      }
    });
  }

  updateData(id) {
    callApi("GET", BASEURL + "Jobs/getdata/" + id, "", this.updateResponse);
  }

  updateResponse(response) {
    if(response.includes("404::")) {
      alert(response.split("::")[1]);
      return;
    }
    let data = JSON.parse(response);
    this.setState({
      showForm: true,
      isEditing: true,
      newJob: {
        id: data.id,
        title: data.title,
        company: data.company,
        location: data.location,
        jobType: data.jobType,
        salary: data.salary,
        description: data.description
      }
    });
  }
  deleteData(id)
  {
    let resp = confirm("Click OK to confirm the deletion");
    if(resp === false)
        return ;
    callApi("DELETE", BASEURL + "Jobs/delete/" + id, "", this.saveResponse);
  }

  handleInputChange(e) {
    const { name, value } = e.target
    this.setState(prevState => ({
      newJob: {
        ...prevState.newJob,
        [name]: value
      }
    }))
  }

  handleSubmit(e) {
    e.preventDefault()
    this.saveJob();
  }

  render() {
    const { jobList, newJob, showForm } = this.state
    return (
      <div className="job-posting-container">
        <div id="jppopup" style={{display: "none"}} className="popup-overlay">
          <div className="popup-content">
            <span className="close-btn" onClick={this.closePopup}>&times;</span>
            <h2>Job Action</h2>
            <p>Operation completed successfully!</p>
          </div>
        </div>
        
        <button onClick={this.toggleForm} className="post-job-button">
          {showForm ? 'Close Form' : 'Post Jobs'}
        </button>

        {jobList.length === 0 && !showForm && (
          <div className="no-jobs-container">
            <img 
              src="https://media.giphy.com/media/3o7TKSjRrfIPjeiVyM/giphy.gif" 
              alt="No jobs available" 
              className="no-jobs-gif"
            />
            <h2>No jobs at the moment!</h2>
            <p>Be the first to post an amazing opportunity!</p>
          </div>
        )}

        {showForm && (
          <form className="job-form" onSubmit={this.handleSubmit}>

            <h3 className="form-section-heading">Basic Information</h3>
            <div className="form-group">
              <label htmlFor="title">Job Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={newJob.title}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="company">Company Name:</label>
              <input
                type="text"
                id="company"
                name="company"
                value={newJob.company}
                onChange={this.handleInputChange}
                required
              />
            </div>
            
            <h3 className="form-section-heading">Job Details</h3>
            <div className="form-group">
              <label htmlFor="location">Location:</label>
              <input
                type="text"
                id="location"
                name="location"
                value={newJob.location}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="jobType">Job Type:</label>
              <select
                id="jobType"
                name="jobType"
                value={newJob.jobType}
                onChange={this.handleInputChange}
                required
              >
                <option value="">Select Job Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Freelance">Freelance</option>
                <option value="Internship">Internship</option>
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="salary">Salary Range:</label>
              <input
                type="text"
                id="salary"
                name="salary"
                value={newJob.salary}
                onChange={this.handleInputChange}
                required
              />
            </div>
            
            <h3 className="form-section-heading">Job Description & Requirements</h3>
            <div className="form-group">
              <label htmlFor="description">Job Description:</label>
              <textarea
                id="description"
                name="description"
                value={newJob.description}
                onChange={this.handleInputChange}
                required
              />
            </div>
            <button type="submit" className="submit-button">Post Job</button>
          </form>
        )}

        <div className="jobs-grid">
          {jobList.map((job, index) => (
            <div key={index} className="job-card">
              <h2 className="job-title">{job.title}</h2>
              <p className="job-company">{job.company}</p>
              <p className="job-location">{job.location}</p>
              <p className="job-salary">{job.salary}</p>
              <p className="job-description">{job.description}</p>
              <div className="job-card-actions">
                <button 
                  className="edit-button" 
                  onClick={() => this.updateData(job.id)}
                >
                  Edit
                </button>
                <button 
                  className="delete-button" 
                  onClick={() => this.deleteData(job.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default JobPosting
