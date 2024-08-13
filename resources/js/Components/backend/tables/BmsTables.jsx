import { Cached, Search } from '@mui/icons-material'
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

export const SelectBox =({className,placeholder="Select",options=[],name="",setValue,value})=>{
  const handleChange =(e)=>{
    setValue(e.target.value);
  }
  return(
    <select name={name} className={`h-10 rounded-md min-w-44 text-[0.8rem] text-slate-500 ${className}`} onChange={handleChange} value={value}>
      <option disabled value="">{placeholder}</option>
      {options.map((item,index)=>(
        <option value={item} className='capitalize'>{item}</option>
      ))}
    </select>
  )
}

export const SearchBox =({children,searchTerm,setSearchTerm,handleSearchClick,handleRefreshBtn,name="",search=true})=>{
  return(
    <div className="search_input">
    {children}
    {search && <><input
      type="search"
      name={name}
      className='h-10 rounded-md text-[0.8rem] mb-2'
      placeholder="Search.."
      onChange={(e) => setSearchTerm(e.target.value)}
      value={searchTerm}
    />
    <button className="bg-heart-red h-10 text-white w-10 rounded-md ml-1" onClick={handleSearchClick}>
      <Search />
    </button></>}
    <button type='button' className="bg-heart-red h-10 text-white w-10 rounded-md ml-1" onClick={handleRefreshBtn}>
      <Cached />
    </button>
  </div>
  )
}

export const FilterBox =({children,onSubmit})=>{
  return(
    <form className='flex justify-between' onSubmit={onSubmit}>
      {children}
    </form>
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