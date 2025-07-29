import React, { useState, useEffect } from 'react';
import '../style.css';
import WarrantySticker from './WarrantySticker';
import axios from 'axios';
import '../panel.css';

const StickerPrint = () => {
  const [serials, setSerials] = useState([]);
  const [lowerLimit, setLowerLimit] = useState(0);
  const [brand, setBrand] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [companiesData, setCompaniesData] = useState([]);
  const [error, setError] = useState('');
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    axios.get('http://127.0.0.1:5000/customer/fetch')
      .then((response) => {
        setCompaniesData(response.data);
      })
      .catch((err) => {
        console.error('Error fetching companies:', err);
      });
  }, []);

  useEffect(() => {
    const selectedCompany = companiesData.find(c => c.companyName === companyName);
    if (selectedCompany) {
      setBrand(selectedCompany.brandName);
      setLowerLimit(parseInt(selectedCompany.upperLimit) || 0); 
    }
  }, [companyName, companiesData]);

  const generateSerials = () => {
    const lower = parseInt(lowerLimit);
    const amt = parseInt(amount);

    if (isNaN(lower) || isNaN(amt)) {
      setError('Lower limit and amount must be valid numbers.');
      return [];
    }

    if (amt <= 0) {
      setError("Amount must be greater than 0.");
      return [];
    }

    setError('');
    const serials = [];
    for (let i = 0; i < amt; i++) {
      serials.push((lower + i).toString().padStart(6, '0'));
    }

    return serials;
  };

  const handleGenerate = () => {
    const generated = generateSerials();
    setSerials(generated);
  };

  const handlePrint = async () => {
    try {
      const newUpperLimit = lowerLimit + amount;
      const response = await axios.put('https://warranty-app-ei1t.onrender.com/customer/update', {
        companyName,
        upperLimit: newUpperLimit
      });
      console.log('Data sent successfully:', response.data);
      window.print();
      window.location.reload();
    } catch (error) {
      console.error('Error sending data to backend:', error.response?.data || error.message);
    }
  };

  return (
    <div className="wrapper">
      <div className="print-header">
        <h2>E-ZONE Technologies (Pvt).Ltd</h2>
      </div>

      <div className="range-inputs">
        <div className="upper-limit">
          <label>Company</label>
          <select
            className="text-input"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
          >
            <option value="">-- Select Company --</option>
            {companiesData.map((company) => (
              <option key={company.id} value={company.companyName}>
                {company.companyName}
              </option>
            ))}
          </select>
        </div>

        <div className="upper-limit">
          <label>Brand Name</label>
          <input
            className="text-input"
            type="text"
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
          />
        </div>

        <div className="lower-limit">
          <label>Min Limit</label>
          <input
            className="text-input"
            type="text"
            value={lowerLimit.toString().padStart(6, '0')}
            disabled
          />
        </div>

        <div className="upper-limit">
          <label>Sticker Amount</label>
          <input
            className="text-input"
            type="number"
            value={amount}
            onChange={(e) => setAmount(parseInt(e.target.value, 10))}
            required
          />
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="buttons">
        <button className="generate-btn" onClick={handleGenerate}>
          Generate Serial Numbers
        </button>
        <button className="print-btn" onClick={handlePrint}>
          Print Stickers
        </button>
      </div>

      <div className="grid">
        {serials.map((serial, index) => (
          <WarrantySticker key={index} serialNumber={serial} brandName={brand} />
        ))}
      </div>
    </div>
  );
};

export default StickerPrint;
