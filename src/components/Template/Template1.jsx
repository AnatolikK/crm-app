import React from 'react';

const Template1 = ({ content, onChangeContent }) => {
  return (
    <div>
      <h1>{content.title}</h1>
      <p>{content.body}</p>
      <input
        type="text"
        value={content.title}
        onChange={(e) => onChangeContent({ ...content, title: e.target.value })}
      />
      <textarea
        value={content.body}
        onChange={(e) => onChangeContent({ ...content, body: e.target.value })}
      />
    </div>
  );
};

export default Template1;
