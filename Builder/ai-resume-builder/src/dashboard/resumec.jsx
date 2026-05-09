import React, { useEffect } from 'react'
import AddResume from './components/AddResume'
import GlobalApi from './../../service/GlobalApi';
import { useUser } from '@clerk/clerk-react';
import ResumeCardItem from './components/ResumeCardItem';
import { useState } from 'react';

function ResumeCreator ()  {
  const {user} = useUser();
  const [resumeList,setResumeList] = useState([]);
  useEffect(() => {
    user&&GetResumesList(); // Call the function to fetch resumes when component mounts.
  },[user])

  /**
   * Used to get users resume list
   */
  const GetResumesList = () =>{
       GlobalApi.GetUserResume(user?.primaryEmailAddress?.emailAddress)
       .then(resp=> {

        setResumeList(resp.data.data);
       })
  }
  return (
    <div className='p-10 md:px-20 lg:px-32'>
      <h2 className='font-bold text-3xl'>My Resume</h2>
      <p>Start Creating Resume For Your Next Job</p>
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mt-10 gap-5'>
        <AddResume></AddResume>
        {resumeList.length>0&&resumeList.map((resume,index) =>(
          <ResumeCardItem resume={resume} key={index}/>
        ))}
      </div>
    </div>
  )
}

export default ResumeCreator
