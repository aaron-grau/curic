import React from 'react';

export default function ErrorList({ errors }) {
  if (errors.length === 0) return null;
  const errorItems = errors.map(error => <li key={ error }>{ error }</li>)

  return (
    <ul className="error-list">
      { errorItems }
    </ul>
  )
}
