import React from 'react'

export const Thead =({children})=>{
    return(
        <thead className="table-header">
        <tr>
            {children}
        </tr>
      </thead>
    )
}

export const Tbody =({children})=>{
    return(
        <tbody className="table-body">
            {children}
        </tbody>
    )
}
const BmsTables = () => {
  return (
    <div className="table-wrapper">
    <table className="table">
     <Thead>
          <th>Header 1</th>
          <th>Header 2</th>
          <th>Header 3</th>
          <th>Header 4</th>
     </Thead>
     <Tbody>
        <tr>
          <td className="text-gray-900">Data 1</td>
          <td className="text-gray-500">Data 2</td>
          <td className="text-gray-500">Data 3</td>
          <td className="text-gray-500">Data 4</td>
        </tr>
        <tr>
          <td className="text-gray-900">Data 5</td>
          <td className="text-gray-500">Data 6</td>
          <td className="text-gray-500">Data 7</td>
          <td className="text-gray-500">Data 8</td>
        </tr>
        </Tbody>
    </table>
  </div>
  )
}

export default BmsTables