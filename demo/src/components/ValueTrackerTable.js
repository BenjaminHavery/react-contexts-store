
import React, { useRef } from 'react'


const ValueTrackerTable = ({ rows = [] }) => !!rows.length && (
  <table>
    <tbody>
      <tr>
        <th>Store location</th>
        <th>Value</th>
        <th>Render count</th>
      </tr>
      { rows.map(([name, useValue], key) => <TrackedRow {...{ name, useValue, key }}/> )}
    </tbody>
  </table>
);

const TrackedRow = ({ name, useValue }) => {
  const val = useValue(); // Subscribe to value via hook
  const renderCount = useRef(0); // Init row render count
  renderCount.current += 1; // Increment row render count
  return (
    <tr>
      <td>{name}</td>
      <td>{JSON.stringify(val)}</td>
      <td>{renderCount.current}</td>
    </tr>
  )
};

export default ValueTrackerTable;
