// DateRangePicker.js
import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import '../styles/dateRangePicker.css'
import zIndex from '@mui/material/styles/zIndex';

const DateRangePicker = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);

    // If both start and end dates are selected, close the date picker.
    if (start && end) {
      setShowDatePicker(false);
    }
  };

  return (
    <div className="date-range-picker position-relative">
      <div className="input-container">
        <input
          type="text"
          placeholder="Select Date Range"
          className='form-control border-0 rounded bg-transparent text-white'
          value={startDate && endDate ? `${startDate.toDateString()} - ${endDate.toDateString()}` : ''}
          onClick={() => setShowDatePicker(!showDatePicker)}
        />
        <button className="calendar-icon bg-transparent border-0 text-white" onClick={() => setShowDatePicker(!showDatePicker)}>
          <CalendarMonthIcon />
        </button>
      </div>
      <div className='position-absolute' style={{zIndex:1}}>
      {showDatePicker && (
        <DatePicker
          selected={startDate}          
          onChange={handleDateChange}
          startDate={startDate}
          endDate={endDate}
          selectsRange
          inline
        />
      )}
      </div>
      
    </div>
  );
};

export default DateRangePicker;
