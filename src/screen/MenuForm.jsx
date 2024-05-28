import React from 'react';
import axios from 'axios';
import FormComponent from './FormComponent';

function MenuForm() {
  const handleSubmit = async (newItem) => {
    try {
      await axios.post('/api/addData', newItem);
      console.log('Menu item added successfully');
      // Reset form fields or perform any other actions as needed
    } catch (error) {
      console.error('Error adding menu item:', error);
    }
  };

  return (
    <div>
      <FormComponent onSubmit={handleSubmit} />
    </div>
  );
}

export default MenuForm;
