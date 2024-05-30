import React from 'react';
import { Table as BootstrapTable } from 'react-bootstrap';

const Table = ({ title, columns, data }) => (
    <div className="">
      <div className='title'>
        <span>{title}</span>
      </div>
      <table>
        <thead>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

export default Table;
