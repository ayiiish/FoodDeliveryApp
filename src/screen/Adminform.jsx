import React, { useState } from 'react';
import axios from 'axios';

function FormComponent({ onSubmit }) {
   
        const [categoryName, setCategoryName] = useState('');
        const [itemName, setItemName] = useState('');
        const [itemImg, setItemImg] = useState('');
        const [smallPrice, setSmallPrice] = useState('');
        const [mediumPrice, setMediumPrice] = useState('');
        const [largePrice, setLargePrice] = useState('');
        const [itemDescription, setItemDescription] = useState('');
      
        const handleSubmit = (e) => {
          e.preventDefault();
      
          const newItem = {
            CategoryName: categoryName,
            name: itemName,
            img: itemImg,
            options: [
              {
                small: smallPrice,
                medium: mediumPrice,
                large: largePrice,
              }
            ],
            description: itemDescription,
          };
          
      
          onSubmit(newItem);
          // Reset form fields here
          setCategoryName('');
          setItemName('');
          setItemImg('');
          setSmallPrice('');
          setMediumPrice('');
          setLargePrice('');
          setItemDescription('');
        };
      
        const renderOptions = () => {
          if (categoryName === 'Pizza') {
            return (
              <>
                <label>Small Price:</label>
                <input type="text" value={smallPrice} onChange={(e) => setSmallPrice(e.target.value)} required />
      
                <label>Medium Price:</label>
                <input type="text" value={mediumPrice} onChange={(e) => setMediumPrice(e.target.value)} required />
      
                <label>Large Price:</label>
                <input type="text" value={largePrice} onChange={(e) => setLargePrice(e.target.value)} required />
              </>
            );
          } else {
            return (
              <>
                <label>Half Price:</label>
                <input type="text" value={smallPrice} onChange={(e) => setSmallPrice(e.target.value)} required />
      
                <label>Full Price:</label>
                <input type="text" value={mediumPrice} onChange={(e) => setMediumPrice(e.target.value)} required />
              </>
            );
          }
        };
  // ... FormComponent code ...

  return (
    <div>
      {/* ... FormComponent JSX ... */}
      <div>
      <h2>Add New Menu Item</h2>
      <form onSubmit={handleSubmit}>
        <label>Category Name:</label>
        <select value={categoryName} onChange={(e) => setCategoryName(e.target.value)} required>
          <option value="">Select Category</option>
          <option value="Biryani/Rice">Biryani/Rice</option>
          <option value="Fast Food">Fast Food</option>
          <option value="Pizza">Pizza</option>
        </select>

        <label>Item Name:</label>
        <input type="text" value={itemName} onChange={(e) => setItemName(e.target.value)} required />

       <label>Choose Picture:</label>
        <input type="file" accept="image/*" onChange={(e) => setItemImg(e.target.value)} required />

        {renderOptions()} {/* Call the renderOptions function to render appropriate input fields */}

        <label>Item Description:</label>
        <textarea value={itemDescription} onChange={(e) => setItemDescription(e.target.value)} required />

        <button type="submit">Add Item</button>
      </form>
    </div>
    </div>
  );
}

function AdminForm() {
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

export default AdminForm;
