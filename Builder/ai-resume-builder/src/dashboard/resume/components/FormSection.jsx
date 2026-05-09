import React, { useState } from 'react'
import PersonalDetails from './forms/PersonalDetails'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'
import Summary from './forms/Summary'
import Experience from './forms/Experience'
import Education from './forms/Education'
import Skills from './forms/Skills'

const FormSection = () => {

    const [activeFormIndex, setActiveFormIndex] = useState(1);
    const [enableNext, setEnableNext] = useState(false);
  return (
    <div>
        <div className='flex justify-between items-center'>
            <Button variant="outline" size="sm" 
            className="flex gap-2"> <LayoutGrid/> Theme</Button>
            <div className='flex gap-2'>
                {activeFormIndex > 1 
                && <Button size ="sm" 
                onClick = {() => setActiveFormIndex(activeFormIndex-1)}>
                    <ArrowLeft/></Button>}
                <Button 
                disabled={!enableNext}
                className="flex gap-2" size="sm"
                onClick = {() => setActiveFormIndex(activeFormIndex+1)}> Next 
                    <ArrowRight/></Button>
            </div>
        </div>
      {/* Personal Detail */}
      {activeFormIndex == 1? <PersonalDetails enableNext={(v) => setEnableNext(v)}/>
      :null}
    
      {/* Summary */}
      {activeFormIndex == 2? <Summary enableNext={(v) => setEnableNext(v)}/> : null}
      

      {/* Experience */}
      {activeFormIndex == 3? <Experience enableNext={(v) => setEnableNext(v)}/> : null}

      {/* Education   */}
      {activeFormIndex == 4? <Education enableNext={(v) => setEnableNext(v)}/> : null}

      {/* skills  */}
      {activeFormIndex == 5? <Skills enableNext={(v) => setEnableNext(v)}/> : null}
    </div>
  )
}

export default FormSection
