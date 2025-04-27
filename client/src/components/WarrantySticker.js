import React from 'react';
import '../style.css';

const WarrantySticker = ({ serialNumber, brandName }) => {
  const years = ['26', '27', '28', '29'];
  const months = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'];

  return (
    <div className="sticker">
      <div className="header">
        <div className="company">{brandName}</div>
        <div className="code">SL</div>
      </div>
      <div className="section">
        <div className="label">Warranty Valid Until</div>
        
        <div className="year-row">
          <div className="year-group">
            <span className="year-label">Year:</span>
            {years.map((year, index) => (
              <div key={index} className="year-box">{year}</div>
            ))}
          </div>
          <div className="extra-boxes">
            <div className="empty-box"></div>
            <div className="empty-box"></div>
          </div>
        </div>

        <div className="month-grid">
          {months.map((month, index) => (
            <div key={index} className="month-box">{month}</div>
          ))}
        </div>
      </div>
      <div className="serial">{serialNumber}</div>
    </div>
  );
};

export default WarrantySticker;
