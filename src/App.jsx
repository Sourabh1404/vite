import React, { Component } from 'react';
import './App.css';
import CandidateCard from './CandidateCard';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      candidatesData: [],
      isDarkMode: false, // Add a state variable for mode
      fetchTime: null,
    };
  }

  componentDidMount() {
    // Replace 'API_URL' with your actual API endpoint.
    const API_URL = 'https://run.mocky.io/v3/ae511409-8c0e-40ed-9336-aebcb602823d';
    const startTime = new Date().getTime();
    
    axios.get(API_URL)
    .then(response => {
        const endTime = new Date().getTime();
        const timeTaken = endTime - startTime;
        this.setState({ candidatesData: response.data.data, fetchTime: timeTaken });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  // Function to toggle light/dark mode
  toggleMode = () => {
    this.setState(prevState => {
      // Toggle the dark mode class on the body element
      document.body.classList.toggle('dark-mode', !prevState.isDarkMode);
  
      return {
        isDarkMode: !prevState.isDarkMode,
      };
    });
  };

  render() {
    const { candidatesData, isDarkMode } = this.state;

    // Organize candidates by status
    const organizedCandidates = {
      Applied: [],
      Accepted: [],
      Rejected: [],
    };

    candidatesData.forEach(candidate => {
      organizedCandidates[candidate.status].push(candidate);
    });

    return (
      <div className={`App ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
        
        <div className="flex items-center justify-end mb-4 pr-4 pt-6"> {/* Move button to the right */}
          <label className="switch">
            <input type="checkbox" onChange={this.toggleMode} className="hidden" />
            <span className="slider round"></span>
          </label>
        </div>
        <div className="flex flex-wrap">
  <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 pt-4 pr-10 pl-10 ">
    <h2 className="text-4xl font-semibold mb-2 text-left pb-4  fontnew ">Applied</h2>
    <div className="space-y-4">
      {organizedCandidates.Applied.map(candidate => (
        <div key={candidate.id} className={`bg-white custom-shadow p-4 rounded-lg text-left ${isDarkMode ? 'text-black' : ''}`}>
          <CandidateCard candidate={candidate} />
        </div>
      ))}
    </div>
  </div>
  <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-4 pr-10 pl-10">
    <h2 className="text-4xl font-semibold mb-2 text-left pb-4 fontnew ">Accepted</h2>
    <div className="space-y-4">
      {organizedCandidates.Accepted.map(candidate => (
        <div key={candidate.id} className={`bg-white custom-shadow p-4 rounded-lg text-left ${isDarkMode ? 'text-black' : ''}`} >
          <CandidateCard candidate={candidate} />
        </div>
      ))}
    </div>
  </div>
  <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3 p-4  pl-10">
    <h2 className="text-4xl font-semibold mb-2 text-left pb-4 fontnew">Rejected</h2>
    <div className="space-y-4">
      {organizedCandidates.Rejected.map(candidate => (
        <div key={candidate.id} className={`bg-white custom-shadow p-4 rounded-lg text-left ${isDarkMode ? 'text-black' : ''}`}>
          <CandidateCard candidate={candidate} />
        </div>
      ))}
    </div>
  </div>
</div>
<footer className='sticky bottom-0'>
{this.state.fetchTime !== null && (
      <div className={`text-${isDarkMode ? 'white' : 'black'} fontnew`}>
        Data fetched in: {this.state.fetchTime} milliseconds
      </div>
    )}
    </footer>
  </div>
);


  }
}

export default App;
