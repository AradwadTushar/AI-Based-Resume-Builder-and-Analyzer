import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../components/FormSection';
import ResumePreview from '../../components/ResumePreview';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';
import dummy from '@/data/dummy';
import GlobalApi from './../../../../../service/GlobalApi';

const EditResume = () => {
    const params=useParams();
    const [resumeInfo,setResumeInfo]= useState(dummy);

    useEffect(() =>{
        setResumeInfo(dummy);
        // GetResumeInfo();
    },[])

  //   const GetResumeInfo=()=>{
  //     GlobalApi.GetResumeById(resumeId).then(resp=>{
  //       console.log(resp.data.data);
  //       setResumeInfo(resp.data.data);
  //     })
  // }
  return (
    <ResumeInfoContext.Provider value={{resumeInfo,setResumeInfo}}>
    <div className='grid grid-cols-1 md:grid-cols-2 p-10 gap-10'>
      {/* { Form Section} */}
      <FormSection/>

      {/* preview Section */}
      <ResumePreview/>
    </div>
    </ResumeInfoContext.Provider>
  )
}

export default EditResume
