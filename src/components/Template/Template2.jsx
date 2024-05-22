import React from 'react';

const Template2 = ({ content, onChangeContent }) => {
  return (
    <div style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f0f0f0' }}>
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

export default Template2;
