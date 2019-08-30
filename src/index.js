import React from "react";
import "./style.scss";

let tabCnt = 0;
let closeAllDiv = null;

class Tabs extends React.Component {
  constructor(props) {
    super(props);
    this.parent = props.parent;
    this.parent.addTab = this.addTab;
    this.parent.gotoTabByTitle = this.gotoTabByTitle;
    // 只允许一个的tab
    this.uniqueTabs = [];
  }

  state = {
    activeTabId: -1,
    tabs: []
  };

  closeAll = () => {
    this.setState({ tabs: [], activeTabId: -1 });
    this.uniqueTabs = [];
  };

  hideCloseBtn = () => {
    closeAllDiv.style.display = "none";
  };

  componentDidMount() {
    closeAllDiv = document.createElement("div");
    closeAllDiv.className = "close-all-tabs";
    closeAllDiv.innerText = "关闭所有tab";
    closeAllDiv.addEventListener("click", this.closeAll);
    document.body.appendChild(closeAllDiv);

    document.addEventListener("click", this.hideCloseBtn);
  }

  componentWillUnmount() {
    closeAllDiv.removeEventListener("click", this.closeAll);
    document.body.removeChild(closeAllDiv);
    closeAllDiv = null;

    document.removeEventListener("click", this.hideCloseBtn);
  }

  gotoTabByTitle = title => {
    const { activeTabId, tabs } = this.state;
    const index = tabs.findIndex(v => v.title === title);
    this.gotoTab(index);
    if (tabs[index].tabId === activeTabId) {
      return;
    }
    this.setState({ activeTabId: tabs[index].tabId });
  };

  gotoTab = index => {
    const header = document.querySelector(".hello-navi-tab .tabs");
    const eles = document.querySelectorAll(`.hello-navi-tab .tab-item`);

    const rectHeader = header.getBoundingClientRect();
    const rectEle = eles[index].getBoundingClientRect();

    if (rectEle.right >= rectHeader.right) {
      header.scrollLeft += rectEle.right - rectHeader.right;
    }
    if (rectEle.left <= rectHeader.left) {
      header.scrollLeft -= rectHeader.left - rectEle.left;
    }
  };

  addTab = tab => {
    const { activeTabId, tabs } = this.state;

    if (this.uniqueTabs.includes(tab.title)) {
      const index = tabs.findIndex(v => v.title === tab.title);
      this.gotoTab(index);
      this.setState({ activeTabId: tabs[index].tabId });
    } else {
      tab.tabId = tabCnt++;
      const index = tabs.findIndex(v => v.tabId === activeTabId);
      const arr = tabs.slice();
      arr.splice(index + 1, 0, tab);
      if (tab.unique) {
        this.uniqueTabs.push(tab.title);
      }
      this.setState({ tabs: arr, activeTabId: tab.tabId }, () => {
        this.gotoTab(index + 1);
      });
    }
  };

  deleteTab = (tab, e) => {
    e.stopPropagation();
    const { tabs, activeTabId } = this.state;

    const index = tabs.findIndex(v => v.tabId === tab.tabId);
    let id = activeTabId;
    // 如果删除的tab是激活的，才需要将activeTabId改变
    if (id === tab.tabId && tabs.length > 1) {
      if (index === 0) {
        id = tabs[1].tabId;
      } else {
        id = tabs[index - 1].tabId;
      }
    }

    const arr = tabs.filter(v => v.tabId !== tab.tabId);
    this.setState({ tabs: arr, activeTabId: id });
  };

  render() {
    const { activeTabId, tabs } = this.state;
    const { deleteTab } = this;
    const activeItem = tabs.find(v => v.tabId === activeTabId);

    return (
      <div className="hello-navi-tab">
        <div
          className="tabs"
          onContextMenu={e => e.preventDefault()}
          onMouseUp={e => {
            if (!e) {
              e = window.event;
            }
            if (e.button === 2) {
              closeAllDiv.style.left = e.clientX + "px";
              closeAllDiv.style.top = e.clientY + "px";
              closeAllDiv.style.display = "block";
            }
          }}
        >
          {tabs.map((v, k) => {
            return (
              <div
                key={k}
                className={`tab-item ${activeTabId === v.tabId ? 'active-tab' : ''}`}
                onClick={() => {
                  this.setState({ activeTabId: v.tabId });
                }}
              >
                {v.title}
                <span
                  className="close-icon"
                  onClick={deleteTab.bind(this, v)}
                />
              </div>
            );
          })}
        </div>
        {
          tabs.map((v, k) => {
            return <div key={k} className={`body ${activeItem.tabId === v.tabId ? 'active-body' : ''}`}>{v.body}</div>
          })
        }
      </div>
    );
  }
}

export default Tabs;
