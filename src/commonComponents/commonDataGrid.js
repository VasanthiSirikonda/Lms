import React from 'react';
import { DataGrid } from '@mui/x-data-grid';

const CommonDataGrid = ({ columns, rows, ...otherProps }) => {
  return (
    <div style={{ height: 500, width: '100%' }} className='commonDataGrid'>
      <DataGrid columns={columns} rows={rows} {...otherProps} />
    </div>
  );
};

export default CommonDataGrid;
