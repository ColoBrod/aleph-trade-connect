import React from 'react';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import nodes from './data';

// Центральный, Северо-Западный, Южный, Приволжский, Уральский, Сибирский, Дальневосточный, Северо-Кавказский
import imgBeverage from './img/beverage.png';

class RegionTree extends React.Component {
  state = {
    checked: [],
    expanded: [],
  };

  render() {
    return (
      <CheckboxTree
        iconsClass="fa4"
        icons={{
          leaf: <img src={imgBeverage} />
        }}
        nodes={nodes}
        checked={this.state.checked}
        expanded={this.state.expanded}
        onCheck={checked => this.setState({ checked })}
        onExpand={expanded => this.setState({ expanded })}
      />
    );
  }
}

export default RegionTree;