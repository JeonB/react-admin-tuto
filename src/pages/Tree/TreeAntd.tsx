import React, { useState } from "react";
import ReactDOM from "react-dom";
import { Tree } from "antd";

// const { createRoot } = ReactDOM;

const x: number = 3;
const y: number = 2;
const z: number = 1;
const defaultData: any[] = [];

const generateData = (_level: number, _preKey?: string, _tns?: any[]) => {
  const preKey: string = _preKey || "0";
  const tns: any[] = _tns || defaultData;
  const children: string[] = [];

  for (let i = 0; i < x; i++) {
    const key = `${preKey}-${i}`;
    tns.push({
      title: key,
      key,
    });
    if (i < y) {
      children.push(key);
    }
  }

  if (_level < 0) {
    return tns;
  }

  const level = _level - 1;
  children.forEach((key, index) => {
    tns[index].children = [];
    return generateData(level, key, tns[index].children);
  });
};

generateData(z);

const TreeAntd = () => {
  const [gData, setGData] = useState(defaultData); //데이터 호출?
  const expandedKeys: string[] = ["0-0", "0-0-0", "0-0-0-0"];

  const onDragEnter = (info: any) => {
    console.log(info);
    // expandedKeys, set it when controlled is needed
    // setExpandedKeys(info.expandedKeys)
  };

  const onDrop = (info: any) => {
    console.log(info);
    // ... (rest of your onDrop function remains unchanged)
  };

  return (
    <Tree
      className="draggable-tree"
      defaultExpandedKeys={expandedKeys}
      draggable
      blockNode
      onDragEnter={onDragEnter}
      onDrop={onDrop}
      treeData={gData}
    />
  );
};

export default TreeAntd;
