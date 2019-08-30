# helloNaviTab

a react component, a horizontally scroll tab

## Install

```bash
npm install hello-navi-tab
```

## Usage

pass `this` to `<hello-navi-tab />`, it will inject functions to parant component.

call `addTab` to add tabs. `addTab` accept a object as param, such as

```
this.addTab({
  title: `tab1`,
  body: <div>I'm div1</div>
});
```

unique tabs can be add, which can only be add once, add again will active it. `title` prop is uesd as the key to mark a tab. `title` prop should not be repeated.

```
this.addTab({
  title: "tab-unique",
  unique: true, // notice this
  body: (
    <div>
      <input type="text" />
    </div>
  )
});
```

call `gotoTabByTitle` to locate and active a tab, `gotoTabByTitle` accept `title` as param.

an example as below

```jsx
import React, { Component } from "react";

import Tabs from "hello-navi-tab";

class App extends Component {
  render() {
    return (
      <div>
        <button
          onClick={() => {
            this.addTab({
              title: `tab${cnt++}`,
              body: <div>I'm div {cnt}</div>
            });
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            this.addTab({
              title: "tab-unique",
              unique: true,
              body: (
                <div>
                  <input type="text" />
                </div>
              )
            });
          }}
        >
          +unique
        </button>
        <button
          onClick={() => {
            this.gotoTabByTitle("tab5");
          }}
        >
          +locate
        </button>

        <Tabs parent={this} />
      </div>
    );
  }
}
```
