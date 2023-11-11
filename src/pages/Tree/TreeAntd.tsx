import React, { useState } from "react";
import { Tree } from "antd";

const data = [
  {
    id: 1,
    name: "Root",
    type: "folder",
    children: [
      {
        id: 2,
        name: "Child 1",
        type: "folder",
        children: [
          {
            id: 3,
            name: "Grand Child",
            type: "file",
          },
        ],
      },
      {
        id: 4,
        name: "Child 2",
        type: "folder",
        children: [
          {
            id: 5,
            name: "Grand Child",
            type: "folder",
            children: [
              {
                id: 6,
                name: "Great Grand Child 1",
                type: "file",
              },
              {
                id: 7,
                name: "Great Grand Child 2",
                type: "file",
              },
            ],
          },
        ],
      },
      {
        id: 8,
        name: "Child 3",
        type: "file",
      },
    ],
  },
];

const convertDataToTree = (data) => {
  return data.map((item) => {
    if (item.children) {
      return {
        title: item.name,
        key: String(item.id),
        children: convertDataToTree(item.children),
      };
    } else {
      return {
        title: item.name,
        key: String(item.id),
      };
    }
  });
};

const TreeAntd = () => {
  const [treeData, setTreeData] = useState(convertDataToTree(data));
  const [expandedKeys, setExpandedKeys] = useState([]);

  const onDragEnter = (info) => {
    // You can implement logic here if needed
    console.log(info);
  };

  const onDrop = (info) => {
    const dragKey = info.dragNode.key;
    const dropKey = info.node.key;
    const dropPos = info.dropPosition - Number(info.node.pos.split("-").pop());

    const loop = (data, key, callback) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          callback(item, index, arr);
          return;
        }
        if (item.children) {
          loop(item.children, key, callback);
        }
      });
    };

    const data = [...treeData];
    let dragObj;

    loop(data, dragKey, (item) => {
      dragObj = item;
    });

    const dropObj = { ...info.node.props };
    const index = info.dropToGap
      ? Number(dropObj.pos.split("-").pop())
      : dropObj.children.length;

    loop(data, dropKey, (item) => {
      item.children = item.children || [];
      item.children.splice(index, 0, dragObj);
    });

    setTreeData(data);
    setExpandedKeys([...expandedKeys, dropKey]);
  };

  const onExpand = (expandedKeysValue) => {
    setExpandedKeys(expandedKeysValue);
  };

  return (
    <Tree
      className="draggable-tree"
      defaultExpandedKeys={expandedKeys}
      draggable
      blockNode
      onDragEnter={onDragEnter}
      onDrop={onDrop}
      onExpand={onExpand}
      treeData={treeData}
    />
  );
};

export default TreeAntd;
