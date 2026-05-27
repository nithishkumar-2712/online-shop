// import axios from '@/Config/axios';
// import React, { useState } from 'react'
//  function Usepost() {
//  const[Loading,SetLoading]=useState(false);
//  const[Error,Seterror]=useState(null);
//  const postmethod=async(url,payload)=>{
//     console.log(url);
//     console.log(payload);
//     try {
//         const {data}=await axios.post(url,payload)
//         console.log(data.message)
//             return data
//     } catch (error) {
//         Seterror(error.message)
        
//     }finally{
//         SetLoading(false);
//     }
//  }

//  return{postmethod,Loading,Error}
// }
// export default Usepost