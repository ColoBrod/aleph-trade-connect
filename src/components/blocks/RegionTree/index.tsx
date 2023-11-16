import React, { ChangeEvent } from 'react';
import CheckboxTree, { OnCheckNode, OnExpandNode, Node } from 'react-checkbox-tree';
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
    filterText: '',
    filteredNodes: nodes,
  };
  

  constructor(props: Props) {
    super(props);
    this.onCheck = this.onCheck.bind(this);
    this.onExpand = this.onExpand.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.filterTree = this.filterTree.bind(this);
    this.filterNodes = this.filterNodes.bind(this);
  }

  render() {
    const { checked, expanded, filterText, filteredNodes } = this.state;

    return (
      <>
        <SearchInput onChange={this.onFilterChange} />
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
            nodes={filteredNodes}
            checked={checked}
            expanded={expanded}
            onCheck={this.onCheck}
            onExpand={this.onExpand}
          />
        </div>
      </>
    );
  }

  onCheck(checked: string[]): void {
    this.setState({ checked });
  }

  onExpand(expanded: string[]): void {
    this.setState({ expanded }, () => console.log(this.state.expanded));
  }

  filterTree() {
    const { filterText } = this.state;

    // Reset nodes back to unfiltered state
    if (!filterText) {
      this.setState({ filteredNodes: nodes });
      return;
    }

    this.setState({ filteredNodes: nodes.reduce(this.filterNodes, []) });
  }

  onFilterChange(e: ChangeEvent<HTMLInputElement>) {
    this.setState({ filterText: e.target.value }, this.filterTree);
  }

  filterNodes(filtered: Node[], node: Node) {
    const { filterText } = this.state;
    const children = (node.children || []).reduce(this.filterNodes, []);

    if (typeof node.label !== 'string') throw new Error("Label React Checkbox Tree должен быть строкой!")
    if (
      // Node's label matches the search string
      node.label.toLocaleLowerCase().indexOf(filterText.toLocaleLowerCase()) > -1 ||
      // Or a children has a matching node
      children.length
    ) {
      filtered.push({ ...node, children });
    }

    return filtered;
  }

  // private filter(e: React.ChangeEvent<HTMLInputElement>): any[] {
  //   const substring = e.target.value;
  //   this.setState({ substring: substring });
  //   // @ts-ignore
  //   const filtered = [];
  //   filterNodes(nodes);
  //   // @ts-ignore
  //   console.log(filtered);

  //   // @ts-ignore
  //   function filterNodes(n) {

  //     // @ts-ignore
  //     n.forEach(node => {
  //       const { label, value, children } = node;
  //       console.log(label, value, children);
  //       if (label.includes(substring)) filtered.push({ value, label });
  //       if (children && children.length > 0) children.forEach(filterNodes(children))
  //       else return;
  //     })
  //   }


  //   return [];

  //   // const filteredNodes = [];
  //   // for (const node of nodes) {
  //   //   const filteredNode = {
  //   //     ...node,
  //   //     children: [],
  //   //   };

  //   //   if (node.label.includes(value)) {
  //   //     filteredNodes.push(filteredNode)
  //   //   }

  //   //   if (node.children) {
  //   //     // @ts-ignore
  //   //     filteredNode.children = this.filter(node.children, value);
  //   //   }

  //   //   if (filteredNode.children.length > 0 || filteredNode.label.includes(value)) {
  //   //     filteredNodes.push(filteredNode);
  //   //   }

  //   // }

  //   // console.log(filteredNodes);
  //   // return filteredNodes;
  // }
}

export default RegionTree;