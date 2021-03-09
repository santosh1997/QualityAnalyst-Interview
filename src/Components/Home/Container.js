import React from "react";
import TabContent from "./TabContent";
import Tab from "./Tab";

class Container extends React.Component {
  constructor(props) {
    super(props);
    this.state = { tabs: [{ id: 1 }, { id: 2 }, { id: 3 }], activeTab: 1 };
    this.draggedIndex = 0;
    this.overIndex = 0;
  }

  closeTab = (e, id) => {
    e.stopPropagation();
    let tabsArr = this.state.tabs;
    for (let t = 0; t < tabsArr.length; t++) {
      if (tabsArr[t].id === id) {
        tabsArr.splice(t, 1);
        break;
      }
    }
    this.setState({ tabs: tabsArr });
    this.scrollTabs();
  };

  addNewTab = () => {
    let tabsArr = this.state.tabs;
    tabsArr.push({ id: tabsArr[this.state.tabs.length - 1].id + 1 });
    this.setState({ tabs: tabsArr });
    if (this.refs.tabList.scrollWidth > this.refs.tabList.offsetWidth) {
      this.refs.right.classList.remove("none");
    }
    this.scrollTabs();
  };

  changeTab = (id) => {
    for (let i = 0; i < this.refs.tabList.children.length; i++) {
      this.refs.tabList.children[i].classList.contains("tab-active");
      console.log(this.refs.tabList.children[i]);
      this.refs.tabList.children[i].classList.remove("tab-active");
    }
    this.refs.tabList.children[this.findIndex(id)].classList.add("tab-active");
    this.setState({ activeTab: id });
  };

  findIndex = (id) => {
    let tabsArr = this.state.tabs;
    for (let t = 0; t < tabsArr.length; t++) {
      if (tabsArr[t].id === id) {
        return t;
      }
    }
  };

  dragOver = (e, id) => {
    e.stopPropagation();
    console.log(id);
    e.preventDefault();
    this.overIndex = this.findIndex(id);
  };

  dragging = (id) => {
    this.draggedIndex = this.findIndex(id);
  };

  dropped = () => {
    let tabsArr = this.state.tabs;
    if (this.draggedIndex !== undefined && this.overIndex !== undefined) {
      let temp = tabsArr[this.overIndex];
      tabsArr[this.overIndex] = tabsArr[this.draggedIndex];
      tabsArr[this.draggedIndex] = temp;
      this.setState({ tabs: tabsArr });
    }
  };

  parseTabs = (count) => {
    return this.state.tabs.map((t) => (
      <Tab
        activeTab={this.state.activeTab}
        dragOver={this.dragOver}
        dragging={this.dragging}
        closeTab={this.closeTab}
        id={t.id}
        changeTab={this.changeTab}
      />
    ));
  };

  scrollTabs = (delta) => {
    this.refs.tabList.scrollLeft += delta;

    if (this.refs.tabList.scrollWidth > this.refs.tabList.offsetWidth) {
      this.refs.right.classList.remove("none");
    }

    if (this.refs.tabList.scrollLeft === 0) {
      this.refs.left.classList.add("none");
    } else {
      if (
        this.refs.tabList.scrollWidth - this.refs.tabList.offsetWidth ===
        this.refs.tabList.scrollLeft
      ) {
        this.refs.right.classList.add("none");
      }
      this.refs.left.classList.remove("none");
    }
  };

  render() {
    return (
      <div className="align-left">
        <div className="heading hor-ver-padding">Demo Container</div>
        <div className="flex" style={{ background: "#efeeee" }}>
          <div className="col-5 inline ver-padding align-center">
            <img
              alt="some image"
              style={{ transform: "rotate(180deg)" }}
              ref="left"
              src="QualityAnalyst-Interview/arrow.svg"
              className="icon pointer none"
              onClick={() => this.scrollTabs(-200)}
            />
          </div>
          <ul
            style={{ overflow: "hidden", whiteSpace: "nowrap" }}
            ref="tabList"
            onDragOver={(e) => this.dragOver(e, this.props.id)}
            onDrop={() => this.dropped()}
            className="align-left inline col-100"
          >
            {this.parseTabs(this.state.tabsCount)}
          </ul>
          <div className="col-5 inline ver-padding align-center">
            <img
              alt="some image"
              ref="right"
              src="QualityAnalyst-Interview/arrow.svg"
              className="icon none pointer"
              style={{ verticalAlign: "bottom", height: "15px" }}
              onClick={() => this.scrollTabs(200)}
            />
          </div>
          <button className="col-5 inline">
            <img
              alt="some image"
              className="icon pointer"
              src="QualityAnalyst-Interview/add.svg"
              onClick={() => this.addNewTab()}
            />
          </button>
        </div>
        <TabContent activeTab={this.state.activeTab} />
      </div>
    );
  }
}

export default Container;
