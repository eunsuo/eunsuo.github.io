import React, { useState } from 'react';

export default function EstimateWComponent() {
  const [name, setName] = useState('');

  return (
    <div>
      <label>이름: </label>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
      <p>입력된 이름: {name}</p>
    </div>
  );
}
