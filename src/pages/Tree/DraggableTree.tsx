import { Tree } from "react-arborist";
const data = [
  { id: "1", name: "Unread" },
  { id: "2", name: "Threads" },
  {
    id: "3",
    name: "Chat Rooms",
    children: [
      { id: "c1", name: "General" },
      { id: "c2", name: "Random" },
      { id: "c3", name: "Open Source Projects" },
    ],
  },
  {
    id: "4",
    name: "Direct Messages",
    children: [
      { id: "d1", name: "Alice" },
      { id: "d2", name: "Bob" },
      { id: "d3", name: "Charlie" },
    ],
  },
];

export const DraggableTree = () => {
  const Node = ({ node, style, dragHandle }) => {
    /* This node instance can do many things. See the API reference. */
    return (
      <div style={style} ref={dragHandle}>
        {node.isLeaf ? "🍁" : "🗀"}
        {node.data.name}
      </div>
    );
  };
  const onCreate = ({ parentId, index, type }) => {};
  const onRename = ({ id, name }) => {};
  const onMove = ({ dragIds, parentId, index }) => {};

  const onDelete = ({ ids }) => {
    const indexToDelete = data.findIndex((node) => node.id === "d1");

    // If the node with id "d1" is found, remove it from the data array
    if (indexToDelete !== -1) {
      const updatedData = [...data];
      updatedData.splice(indexToDelete, 1);
    }
  };
  return (
    <Tree
      data={data}
      openByDefault={false}
      width={600}
      height={1000}
      indent={24}
      rowHeight={36}
      overscanCount={1}
      paddingTop={30}
      paddingBottom={10}
      padding={25 /* sets both */}
      onRename={onRename}
      onMove={onDelete}
    />
  );
};
