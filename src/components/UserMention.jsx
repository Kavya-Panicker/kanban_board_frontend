import React, { useState } from 'react';

const mockUsers = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
];

const UserMention = ({ onSelect }) => {
  const [query, setQuery] = useState('');
  const filtered = mockUsers.filter(u => u.name.toLowerCase().includes(query.toLowerCase()));
  return (
    <div>
      <input
        type="text"
        placeholder="@mention user"
        value={query}
        onChange={e => setQuery(e.target.value)}
      />
      {query && (
        <ul>
          {filtered.map(user => (
            <li key={user.id} onClick={() => onSelect(user)}>
              @{user.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default UserMention; 