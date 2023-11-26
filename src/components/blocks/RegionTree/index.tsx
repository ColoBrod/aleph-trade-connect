import React, { useState, ChangeEvent } from 'react';
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
import { useAppDispatch } from '~/hooks';
import { IFiltersBusinessUnits } from '~/interfaces/filters';

// checkModel - Specifies which checked nodes should be stored in the checked array. Accepts 'leaf' or 'all'.

interface Props {
  items: IBusinessUnit[];
  selector: IFiltersBusinessUnits['businessUnits'];
  actions: {
    businessUnitsSet: Function;
    businessUnitsExpanded: Function;
    businessUnitsFilterChanged: Function;
  };
}

const RegionTree = (props: Props) => {
  const { selector, actions } = props;
  const { checked, expanded, filterText, filteredNodes } = selector
  const dispatch = useAppDispatch();
  const nodes = buildTree(props.items);

  const onFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch(actions.businessUnitsFilterChanged(e.target.value));
  }

  const onCheck = (checked: string[], node: OnCheckNode): void => {
    dispatch(actions.businessUnitsSet(checked));
  }

  const onExpand = (expanded: string[]) => {
    dispatch(actions.businessUnitsExpanded(expanded));
  }

  return (
    <>
      <SearchInput onChange={onFilterChange} />
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
          nodes={nodes} // filteredNodes
          checked={checked}
          expanded={expanded}
          onCheck={onCheck}
          onExpand={onExpand}
        />
      </div>
    </>
  );
}

function buildTree(data: IBusinessUnit[], parentId = 0): Node[] {
  const tree: Node[] = [];
  data.forEach((item: IBusinessUnit) => {
    if (item.parentId === parentId) {
      const children = buildTree(data, item.id);
      const node: Node = {
        value: item.id.toString(),
        label: item.name,
        children: children.length > 0 ? children : undefined
      };
      tree.push(node);
    }
  });
  return tree;
}

export default RegionTree;