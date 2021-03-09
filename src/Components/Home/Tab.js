import React from "react";

class TabContent extends React.Component {
  tabActive = (target, id) => {
    this.props.changeTab(id);
  };
  componentDidMount;
  componentDidUpdate(prevProps) {}

  render() {
    return (
      <li
        onDragOver={(e) => this.props.dragOver(e, this.props.id)}
        id={this.props.id}
        className={
          (this.props.activeTab === this.props.id ? "tab-active" : null) +
          " col-20 align-center medium bold inline hor-ver-padding"
        }
        draggable={true}
        onDrag={() => this.props.dragging(this.props.id)}
        onClick={(e) => this.tabActive(e.target, this.props.id)}
      >
        <span style={{ verticalAlign: "middle" }}>Tab{this.props.id}</span>
        <img
          alt="some image"
          src="QualityAnalyst-Interview/close.svg"
          className="icon float-right"
          onClick={(e) => this.props.closeTab(e, this.props.id)}
        />
      </li>
    );
  }
}

export default TabContent;
