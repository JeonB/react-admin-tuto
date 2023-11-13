import React, { useState } from "react";
import { Tree } from "antd";

const x: number = 3;
const y: number = 2;
const z: number = 1;
const defaultData: any[] = [];

// 이 부분이 OBP 내부 데이터 호출하는 로직 필요
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

generateData(5);
const TestTree = () => {
  const [gData, setGData] = useState(defaultData);

  // 데이터 드래그 & 드랍 로직
  const onDrop = (info: any) => {
    const dropKey = info.node.key;
    const dragKey = info.dragNode.key;
    const dropPos = info.node.pos.split("-");
    const dropPosition =
      info.dropPosition - Number(dropPos[dropPos.length - 1]);
    console.log(info.dragNode);
    const loop = (
      data: any,
      key: string,
      callback: (item: any, index: number, arr: any[]) => void
    ) => {
      for (let i = 0; i < data.length; i++) {
        if (data[i].key === key) {
          return callback(data[i], i, data);
        }
        if (data[i].children) {
          loop(data[i].children, key, callback);
        }
      }
    };

    const data = [...gData];
    let dragObj: any;

    // Find dragObject
    loop(data, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!info.dropToGap) {
      // Drop on the content
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else if (
      (info.node.props.children || []).length > 0 &&
      info.node.props.expanded &&
      dropPosition === 1
    ) {
      loop(data, dropKey, (item) => {
        item.children = item.children || [];
        item.children.unshift(dragObj);
      });
    } else {
      let ar: any[] = [];
      let i: number;
      loop(data, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });
      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj);
      } else {
        ar.splice(i + 1, 0, dragObj);
      }
    }
    setGData(data);
  };

  return (
    <Tree
      // className="draggable-tree"
      // defaultExpandedKeys={expandedKeys}
      draggable
      blockNode
      //   onDragEnter={onDragEnter}
      onDrop={onDrop}
      treeData={gData}
      autoExpandParent={true}
    />
  );
};

export default TestTree;
