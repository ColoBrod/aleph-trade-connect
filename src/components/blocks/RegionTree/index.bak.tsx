import React, { ChangeEvent } from 'react';
import CheckboxTree, { OnCheckNode, OnExpandNode, Node } from 'react-checkbox-tree';
import 'react-checkbox-tree/lib/react-checkbox-tree.css';

import SearchInput from '~/components/ui/SearchInput';
import imgUnchecked from './img/unchecked.png';
import imgChecked from './img/checked.png';
import imgHalfChecked from './img/half-checked.png';
import imgArrowDown from './img/arrow-down.svg';
import imgArrowRight from './img/arrow-right.svg';

import './style.css';
import { IBusinessUnit } from '~/interfaces/entities';

interface Props {
  items: IBusinessUnit[];
  onCheck: (checked: string[]) => void;
}

interface State {
  checked: (string|undefined)[];
  expanded: string[];
  filterText: string;
  filteredNodes: Node[];
}

class RegionTree extends React.Component<Props, State> {
  state = {
    checked: ["1001"],
    expanded: [],
    filterText: '',
    filteredNodes: [],
  };

  constructor(props: Props) {
    super(props);
    this.onCheck = this.onCheck.bind(this);
    this.onExpand = this.onExpand.bind(this);
    this.onFilterChange = this.onFilterChange.bind(this);
    this.filterTree = this.filterTree.bind(this);
    this.filterNodes = this.filterNodes.bind(this);

    // This checks all deeply nested business units
    // this.state.checked = this.props.items.map(unit => unit.id.toString())
  }

  render() {
    const { items } = this.props;
    const { checked, expanded, filterText, filteredNodes } = this.state;
    if (items.length === 0) {
      console.log("It's happenning...");
      return null;
    }

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
            nodes={filteredNodes} // filteredNodes
            checked={checked}
            expanded={expanded}
            onCheck={this.onCheck}
            onExpand={this.onExpand}
          />
        </div>
      </>
    );
  }

  componentDidUpdate(prevProps: Readonly<Props>, prevState: Readonly<{}>, snapshot?: any): void {
    // if (prevProps.items.length === this.props.items.length) return;
    // const { items } = this.props;
    // const filteredNodes = this.buildTree(items);
    // const checked = items.map(unit => {
    //   if (unit.type === 0) return unit.id.toString();
    // })
    // this.setState({ checked, filteredNodes });
  }

  componentDidMount(): void {
    const { items } = this.props;
    console.log("Items:", items);
    const filteredNodes = this.buildTree(items);
    console.log("Items:", items);
    console.log("filteredNodes:", filteredNodes);
    const checked = items.map(unit => {
      if (unit.type === 0) return unit.id.toString();
    })
    this.setState({ checked, filteredNodes });
    // console.log("Items:", items);
    // const nodes = this.buildTree(items);
    // console.log("Nodes:", nodes);
    // this.setState({ filterNodes: nodes }, () => console.log("State:", this.state));
  }

  onCheck(checked: string[], node: OnCheckNode): void {
    const { onCheck: handler } = this.props;
    // console.log(checked);
    this.setState({ checked });
    handler(checked);
  }

  onExpand(expanded: string[]): void {
    this.setState({ expanded }, () => console.log(this.state.expanded));
  }

  private buildTree(data: IBusinessUnit[], parentId = 0): Node[] {
    const tree: Node[] = [];
    data.forEach((item: IBusinessUnit) => {
      if (item.parentId === parentId) {
        const children = this.buildTree(data, item.id);
        const node: Node = {
          value: item.id.toString(),
          label: item.name,
          children: children.length > 0 ? children : []
        };
        tree.push(node);
      }
    });
    return tree;
  }

  // TODO: Adjust this method
  filterTree() {
    const { filterText } = this.state;

    // Reset nodes back to unfiltered state
    if (!filterText) {
      // this.setState({ filteredNodes: nodes });
      return;
    }

    // this.setState({ filteredNodes: nodes.reduce(this.filterNodes, []) });
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