import { Component } from 'react'
import { BASEURL, callApi } from '../api'

export class JobSearching extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: []
    };
    this.readResponse = this.readResponse.bind(this);
  }

  componentDidMount() {
    callApi("GET", BASEURL + "Jobs/getjobs", "", this.readResponse);
  }

  readResponse(response) {
    if(response.includes("404::")){
      alert(response.split("::"[1]));
      return;
    }
    let data = JSON.parse(response);
    this.setState({jobs: data});
  }

  render() {
    return (
      <div>
        <h1>welcome to JobSearching</h1>
        <div style={{marginTop: '2rem'}}>
          {this.state.jobs.length === 0 ? (
            <p>No jobs found.</p>
          ) : (
            <div style={{display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem'}}>
              {this.state.jobs.map((job, idx) => (
                <div key={idx} style={{border: '1px solid #e5e7eb', borderRadius: '12px', padding: '1.5rem', background: '#fff', boxShadow: '0 4px 12px rgba(0,0,0,0.05)'}}>
                  <h2 style={{margin: 0, color: '#4f46e5'}}>{job.title}</h2>
                  <p style={{margin: '0.5rem 0', color: '#64748b'}}>{job.company}</p>
                  <p style={{margin: '0.5rem 0', color: '#64748b'}}>{job.location}</p>
                  <p style={{margin: '0.5rem 0', color: '#1e293b'}}>{job.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default JobSearching
