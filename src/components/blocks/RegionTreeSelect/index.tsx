import React, { ReactElement, ReactNode } from 'react';
import { useAppDispatch, useAppSelector } from '~/hooks';
import { IBusinessUnit } from '~/interfaces/entities';
import './style.css';
import { businessUnitSet } from '~/store/pages/administration/company-structure';

interface RegionNodeProps {
  id: string;
  text: string;
  children: ReactElement<RegionNodeProps>[];
  depth: number;
  type: string;
}


const RegionNode = ({ id, text, children, depth, type }: RegionNodeProps) => {
  const dispatch = useAppDispatch();
  const { businessUnitId: activeId } = useAppSelector(
    state => state.pages.administration.companyStructure
  );
  const handleClick = (e: React.MouseEvent) => {
    const { id } = e.currentTarget;
    if (id) dispatch(businessUnitSet(id));
  }
  const paddingLeft = depth === 0 ? '10px' : '30px';
  if (type === '1') return (
    <div 
      id={id}
      onClick={handleClick}
      className={`region-tree-select__restaurant ${activeId === id ? 'active' : ''}`} 
      style={{ paddingLeft }}
    >{text}</div>
  );
  else return (
    <details 
      id={id}
      onClick={handleClick}
      className={`region-tree-select__node ${activeId === id ? 'active' : ''}`} 
      style={{ paddingLeft }}>
      <summary className="region-tree-select__node-name">
        {text}
      </summary>
      {children as ReactNode}
    </details>
  );
}

const RegionTreeSelect = () => {
  const { businessUnits } = useAppSelector(state => state.entities.data);
  const businessUnitsCopy = [...businessUnits];
  const tree = buildTree(businessUnitsCopy);

  return (
    <div className="region-tree-select">
      {tree}
    </div>
  );
}

function buildTree(
  data: IBusinessUnit[], 
  parentId: string | null = null,
  depth: number = 0
): ReactElement<RegionNodeProps>[] 
{
  const tree: ReactElement<RegionNodeProps>[] = [];
  data.forEach((item: IBusinessUnit, i) => {
    if (item.parentId === parentId) {
      delete data[i];
      const children = buildTree(data, item.id, depth + 1);
      const node: ReactElement<RegionNodeProps> = <RegionNode 
        key={item.id} 
        id={item.id}
        text={item.name} 
        depth={depth}
        type={item.type}
        children={children} />
      tree.push(node);
    }
  });
  return tree;
}

export default RegionTreeSelect;
