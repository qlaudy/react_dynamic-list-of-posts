import React, { useEffect, useState } from 'react';
import { User } from '../types/User';

interface Props {
  users: User[];
  selectedUserId: number | null;
  onChange: (id: number) => void;
}

export const UserSelector: React.FC<Props> = ({
  users,
  selectedUserId,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const closeDropdown = () => {
      setIsOpen(false);
    };

    document.addEventListener('click', closeDropdown);

    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={`dropdown ${isOpen ? 'is-active' : ''}`}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={event => {
            event.stopPropagation();
            setIsOpen(prev => !prev);
          }}
        >
          <span>
            {users.find(u => u.id === selectedUserId)?.name ?? 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              href={`#user-${user.id}`}
              className={`dropdown-item ${user.id === selectedUserId ? 'is-active' : ''}`}
              key={user.id}
              onClick={event => {
                event.preventDefault();
                onChange(user.id);
                setIsOpen(false);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
