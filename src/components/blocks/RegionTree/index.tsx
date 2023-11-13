import React from 'react';
import CheckboxTree from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';
import nodes from './data';

// Центральный, Северо-Западный, Южный, Приволжский, Уральский, Сибирский, Дальневосточный, Северо-Кавказский
// import imgBeverage from './img/beverage.png';
import SearchInput from '~/components/ui/SearchInput';
import imgUnchecked from './img/unchecked.png';
import imgChecked from './img/checked.png';
import imgHalfChecked from './img/half-checked.png';
import imgArrowDown from './img/arrow-down.svg';
import imgArrowRight from './img/arrow-right.svg';


import './style.css';

interface Props {

}

class RegionTree extends React.Component<Props> {
  state = {
    checked: [],
    expanded: [],
  };

  constructor(props: Props) {
    super(props);
    this.filter = this.filter.bind(this);
  }

  // icons={{
  //   leaf: <img src={imgBeverage} />
  // }}

  render() {
    return (
      <>
        <SearchInput onChange={this.filter} />
        <div className="searchbox-tree-wrapper">
          <CheckboxTree
            iconsClass="fa4"
            icons={{
              uncheck: <img src={imgUnchecked} />,
              check: <img src={imgChecked} />,
              halfCheck: <img src={imgHalfChecked} />,
              expandOpen: <img src={imgArrowDown} />,
              expandClose: <img src={imgArrowRight} />,
              parentClose: null,
              parentOpen: null,
              leaf: null,
            }}
            nodes={nodes}
            checked={this.state.checked}
            expanded={this.state.expanded}
            onCheck={checked => this.setState({ checked })}
            onExpand={expanded => this.setState({ expanded })}
          />
        </div>
      </>
    );
  }

  private filter(e: React.ChangeEvent<HTMLInputElement>): any[] {
    
    const value = e.target.value;
    const filteredNodes = [];
    for (const node of nodes) {
      const filteredNode = {
        ...node,
        children: [],
      };

      if (node.label.includes(value)) {
        filteredNodes.push(filteredNode)
      }

      if (node.children) {
        // @ts-ignore
        filteredNode.children = this.filter(node.children, value);
      }

      if (filteredNode.children.length > 0 || filteredNode.label.includes(value)) {
        filteredNodes.push(filteredNode);
      }

    }

    console.log(filteredNodes);
    return filteredNodes;
  }
}

export default RegionTree;