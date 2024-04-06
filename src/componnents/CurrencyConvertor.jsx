import React, { useEffect, useState } from 'react'
import DropDown from './DropDown'
import { HiArrowsRightLeft } from 'react-icons/hi2'

export default function CurrencyConvertor() {
   const [currencies,setCurrencies]=useState([])
   const[amount,setAmount]=useState(null)
   const[fromCurrency,setFromCurrency]=useState('USD')
   const[toCurrency,setToCurrency]=useState('CAD')
   const [convertedAmount, setConvertedAmount] = useState(null)
   const [converting, setConverting] = useState(false)
   
   const fetchdata= async()=>{
      try {
         const res=await fetch('https://api.frankfurter.app/currencies')
         const data=await res.json()
         setCurrencies(Object.keys(data))
      } catch (error) {
         console.error('Error Fetching',error)
      }
   }
   
   useEffect(()=>{
      fetchdata()
   },[])
   

 
   //api -> https://api.frankfurter.app/latest?amount=1&from=USD$to=CAD
   const CurrencyConvert= async()=>{
      if(!amount)return
      setConverting(true)
      try {
         const res=await fetch(`https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`)
         const data=await res.json()
         setConvertedAmount(data.rates[toCurrency]+ " " + toCurrency)
      } catch (error) {
         console.error('Error Fetching',error)
      }finally{
         setConverting(false)
      }
   }

   const swap=()=>{
      setFromCurrency(toCurrency)
      setToCurrency(fromCurrency)
   }

   useEffect(()=>{
      CurrencyConvert()
   },[fromCurrency,toCurrency,amount])

  return (
    //api -> https://api.frankfurter.app/currencies
   

    <div className='max-w-xl mx-auto my-10 p-5 bg-white rounded-lg shadow-md'>
        <h2 className='mb-5 text-2xl font-semibold text-gray-700 flex flex-wrap'>Currency Convertor</h2>
         
         <div className='grid grid-cols-1 sm:grid-cols-3 gap-4 items-end'>
            <DropDown currencies={currencies} title='From:' currency={fromCurrency} setCurrency={setFromCurrency} />
            <div className='flex justify-center -mb-5 sm:mb-0'>
               <button onClick={swap} className='p-2 bg-gray-200 rounded-full cursor-pointer hover:bg-gray-300'>
                  <HiArrowsRightLeft className='text-xl text-gray-700'/>
               </button>
            </div>
            <DropDown currencies={currencies} title='To:'  currency={toCurrency} setCurrency={setToCurrency} />
         </div>
    
         <div className='mt-7'>
            <input value={amount}  placeholder='Enter Amount' onChange={(e)=>setAmount(e.target.value)} type="number" className='w-full p-2 border-gray-100 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500'/>
         </div>
         {convertedAmount && 
         <div className='mt-7 text-lg font-medium text-center '>
            {amount} {fromCurrency} = {convertedAmount}
         </div>
         }
    </div>
  )
}
