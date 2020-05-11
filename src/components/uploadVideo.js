import React from 'react';
import './App.css';
import Select from "./VideoUploader/select";
import Files from "./VideoUploader/files";
import Progress from "./VideoUploader/progress";

class App extends React.Component {
  render() {
    return (
      <div>
        <h3>Upload AMV</h3>
        <div className="main-body">

          <Select />
          <Files />
          <Progress />

        </div>
      </div>
    )
  }
}

export default App;
