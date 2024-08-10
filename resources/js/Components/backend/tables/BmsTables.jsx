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
export const MainBmsTable = ({children}) => {
  return (
    <div className="table-wrapper">
    <table className="table">
      {children}
    </table>
  </div>
  )
}