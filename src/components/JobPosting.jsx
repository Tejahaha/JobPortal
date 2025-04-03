import { Component } from "react"
import "../css/JobPosting.css"

export class JobPosting extends Component {
  state = {
    jobs: [],
    newJob: {
      title: "",
      company: "",
      location: "",
      salary: "",
      description: "",
      requirements: ""
    }
  }

  handleInputChange = (e) => {
    const { name, value } = e.target
    this.setState(prevState => ({
      newJob: {
        ...prevState.newJob,
        [name]: value
      }
    }))
  }

  handleSubmit = (e) => {
    e.preventDefault()
    this.setState(prevState => ({
      jobs: [...prevState.jobs, prevState.newJob],
      newJob: {
        title: "",
        company: "",
        location: "",
        salary: "",
        description: "",
        requirements: ""
      }
    }))
  }

  render() {
    const { jobs, newJob } = this.state
    return (
      <div className="job-posting-container">
        <form className="job-form" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <label htmlFor="title">Job Title</label>
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
            <label htmlFor="company">Company Name</label>
            <input
              type="text"
              id="company"
              name="company"
              value={newJob.company}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="location">Location</label>
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
            <label htmlFor="salary">Salary Range</label>
            <input
              type="text"
              id="salary"
              name="salary"
              value={newJob.salary}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Job Description</label>
            <textarea
              id="description"
              name="description"
              value={newJob.description}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="requirements">Requirements</label>
            <textarea
              id="requirements"
              name="requirements"
              value={newJob.requirements}
              onChange={this.handleInputChange}
              required
            />
          </div>
          <button type="submit" className="submit-button">Post Job</button>
        </form>

        <div className="jobs-grid">
          {jobs.map((job, index) => (
            <div key={index} className="job-card">
              <h2 className="job-title">{job.title}</h2>
              <p className="job-company">{job.company}</p>
              <p className="job-location">{job.location}</p>
              <p className="job-salary">{job.salary}</p>
              <p className="job-description">{job.description}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }
}

export default JobPosting
