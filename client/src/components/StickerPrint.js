import React, { useState, useEffect } from 'react';
import '../style.css';
import { useLocation } from 'react-router-dom';
import WarrantySticker from './WarrantySticker'
import axios from 'axios';

const StickerPrint = () => {
  const location = useLocation();
  const [serials, setSerials] = useState([]);
  const [lowerLimit, setLowerLimit] = useState(0);
  const [upperLimit, setUpperLimit] = useState(0); 
  const [brand, setBrand] = useState('');
  const [error, setError] = useState('');
  const [amount, setAmount] = useState(0);

  const { companyName, upLimit, brandName} = location.state || {};
  
  useEffect(() => {
    if (upLimit !== undefined) {
      setLowerLimit(upLimit);
    }
    if (brandName) {
      setBrand(brandName);
    }
  }, [upLimit, brandName]);
 

  const generateSerials = () => {
    const serialsSet = new Set();

    if (lowerLimit.toString().length !== 6 || upperLimit.toString().length !== 6) {
      setError('Both limits must be exactly six digits.');
      return [];
    }
    
    if (lowerLimit >= upperLimit) {
      setError("The lower limit must be less than the upper limit.");
      return [];
    }

    setError('');

    while (serialsSet.size < amount) {
      const randomValue = Math.floor(Math.random() * (upperLimit - lowerLimit + 1)) + lowerLimit;
      serialsSet.add(randomValue); 
    }

    return Array.from(serialsSet); 
  };

  const handleGenerate = () => {
    setSerials(generateSerials());
  };


  const handlePrint = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:5000/limit/update', {
        companyName,
        upperLimit,
      });

      console.log('Data sent successfully:', response.data);

      window.print();
    } catch (error) {
      console.error('Error sending data to backend:', error.response?.data || error.message);
    }
  };


  return (
    <div className="wrapper">
      <div className="range-inputs">
        <div className='lower-limit'>
          <label>Min Limit</label>
          <input
            className='text-input'
            type="number"
            value={lowerLimit}
            onChange={(e) => setLowerLimit(parseInt(e.target.value, 10))}
            placeholder="Lower Limit"
          />
        </div>
        <div className='upper-limit'>
          <label>Max Limit</label>
          <input
            className='text-input'
            type="number"
            value={upperLimit}
            onChange={(e) => setUpperLimit(parseInt(e.target.value, 10))}
            placeholder="Upper Limit"
          />
        </div>
        <div className='upper-limit'>
          <label>Company</label>
          <input
            className='text-input'
            type="text"
            value={companyName}
            disabled
          />
        </div>
        <div className='upper-limit'>
          <label>Brand Name</label>
          <input
            className='text-input'
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            required
          />
        </div>
        <div className='upper-limit'>
          <label>Sticker Amount</label>
          <input
            className='text-input'
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className='buttons'>
        <button className="generate-btn" onClick={handleGenerate}>
          Generate Serial Numbers
        </button>
        <button className="print-btn" onClick={handlePrint}>
          Print Stickers
        </button>
      </div>
      
      <div className="grid">
        {serials.map((serial, index) => (
          <WarrantySticker key={index} serialNumber={serial} brandName={brand}/>
        ))}
      </div>
    </div>
    
  );
};

export default StickerPrint;
