import React from 'react';

const EditableBlock = ({ block, onClick }) => {
  return (
    <div
      className="editable-block"
      style={{
        backgroundColor: block.backgroundColor,
        width: block.width,
        height: block.height,
        fontSize: block.fontSize,
      }}
      onClick={onClick}
    >
      {block.content}
    </div>
  );
};

export default EditableBlock;
