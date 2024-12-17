
import React from 'react';
import { MultipleChoice } from './Multiplechoice';




export function Proposal({ proposal, onUpdate, onDelete }) {
  const handleTitleChange = (title) => {
    onUpdate({ ...proposal, title });
  };

  const handleOptionsChange = (options) => {
    onUpdate({ ...proposal, options });
  };

  const handleRequiredChange = (isRequired) => {
    onUpdate({ ...proposal, isRequired });
  };

  return (
    <MultipleChoice
      title={proposal.title}
      options={proposal.options}
      isRequired={proposal.isRequired}
      onTitleChange={handleTitleChange}
      onOptionsChange={handleOptionsChange}
      onRequiredChange={handleRequiredChange}
      onDelete={onDelete}
    />
  );
}