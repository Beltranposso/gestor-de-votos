import React from 'react';



export function MultipleChoice({
  title,
  options,
  onTitleChange,
  onOptionsChange,
  onDelete,
}) {
  const addOption = () => {
    onOptionsChange([...options, '']);
  };

  const removeOption = (index) => {
    onOptionsChange(options.filter((_, i) => i !== index));
  };

  const updateOption = (index, value) => {
    const newOptions = [...options];
    newOptions[index] = value;
    onOptionsChange(newOptions);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mt-4">
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          placeholder="Nueva Propuesta"
          className="flex-grow border rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
        />
        <button className="p-2 text-gray-500 hover:text-gray-700">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
          </svg>
        </button>
        <button 
          onClick={onDelete}
          className="p-2 text-gray-500 hover:text-gray-700"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
          </svg>
        </button>
      </div>

      <div className="space-y-3">
        {options.map((option, index) => (
          <div key={index} className="flex items-center gap-2">
            <input
              type="radio"
              name={`option-${title}`}
              className="form-radio text-blue-600"
              disabled
            />
            <input
              type="text"
              className="flex-grow border rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder={`Opción ${index + 1}`}
              value={option}
              onChange={(e) => updateOption(index, e.target.value)}
            />
            <button
              onClick={() => removeOption(index)}
              className="p-1 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <button
        onClick={addOption}
        className="mt-3 text-blue-600 hover:text-blue-700 font-medium"
      >
        Añadir Otro
      </button>

   
    </div>
  );
}