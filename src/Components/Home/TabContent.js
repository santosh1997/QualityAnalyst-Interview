import React from "react";

class Tab extends React.Component {
  render() {
    return (
      <div className="align-left" style={{ padding: "3%" }}>
        <div className="x-large bold">Tab{this.props.activeTab} Contents</div>
      </div>
    );
  }
}

export default Tab;
