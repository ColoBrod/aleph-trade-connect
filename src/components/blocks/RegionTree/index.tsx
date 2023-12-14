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
import { Filters } from '~/store/filters/initial';
import { useAppDispatch } from '~/hooks';
import { IFiltersBusinessUnits } from '~/interfaces/filters';
import Checkbox from '~/components/ui/Checkbox';
import memory from '~/store/memory';

// checkModel - Specifies which checked nodes should be stored in the checked array. Accepts 'leaf' or 'all'.

interface Props {
  path?: keyof Filters;
  items: IBusinessUnit[];
  selector: IFiltersBusinessUnits['businessUnits'];
  actions: {
    businessUnitsSet: Function;
    businessUnitsExpanded: Function;
    businessUnitsFilterChanged: Function;
    businessUnitsSelectedAll: Function;
  };
}

const RegionTree = (props: Props) => {
  const { path, items, selector, actions } = props;
  const [filterText, setFilterText] = useState("");
  const { checked, expanded, /*filterText,*/ filteredNodes } = selector
  const dispatch = useAppDispatch();
  const nodes = buildTree(props.items);

  const onFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFilterText(e.target.value);
    // dispatch(actions.businessUnitsFilterChanged(e.target.value));
  }

  const onCheck = (checked: string[], node: OnCheckNode): void => {
    dispatch(actions.businessUnitsSet(checked));
    // if (path) {
    //   const saved = memory.get(path) as IFiltersBusinessUnits;
    //   console.log("PATH:", path, saved);
    //   saved.businessUnits.checked = checked;
    //   memory.set(path, saved);
    // }
  }

  const onExpand = (expanded: string[]) => {
    dispatch(actions.businessUnitsExpanded(expanded));
  }

  const renderCheckbox = () => {
    let n: 0 | 1 | 2;
    const ids = items.filter(item => item.type === 0).map(item => item.id);
    if (ids.length === checked.length) n = 1;
    else if (checked.length === 0) n = 0;
    else n = 2;
    return (
      <Checkbox 
        id={"region-tree-select-all"} 
        label='Выбрать все' 
        checked={n}  
        onChange={() => {
          // console.log(actions.businessUnitsSelectedAll)
          dispatch(actions.businessUnitsSelectedAll(ids))
        }}
        />
    )
  }

  const renderTree = () => (
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
  );

  const renderFiltered = () => {
    const copy = [...items];
    const filtered = copy.filter(item => item.name.includes(filterText) && item.type === 0);
    console.log("Copy of all filtered elements: ", filtered);
    return filtered.map(({ id, name }) => {
      const isChecked = checked.find(item => item === String(id))
        ? true
        : false;
      return (
        <Checkbox 
          id={String(id)} 
          checked={isChecked} 
          label={name} 
          onChange={(e) => {
            const checkbox = e.target;
            const checkedCopy = [...checked];
            if (e.target.checked) {
              const index = checkedCopy.indexOf(checkbox.id);
              if (index !== -1) checkedCopy.splice(index, 1);
            } 
            else {
              checkedCopy.push(checkbox.id);
            }
            dispatch(actions.businessUnitsSet(checkedCopy))
          }}
          />
      );
    })
  };

  return (
    <>
      <SearchInput onChange={onFilterChange} />
      { nodes.length >= 2 && filterText === "" ? renderCheckbox() : null}
      <div className="searchbox-tree-wrapper">
        {
          filterText === "" 
            ? renderTree()
            : renderFiltered()
        }
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