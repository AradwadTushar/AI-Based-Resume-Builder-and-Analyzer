import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import React, { useContext, useEffect, useState } from 'react'
import GlobalApi from './../../../../../service/GlobalApi'
import { useParams } from 'react-router-dom'
import { Brain, LoaderCircle } from 'lucide-react'
import { toast } from 'sonner'
import { AIChatSession } from './../../../../../service/AiModel'

const prompt = "Job Title : {jobTitle}, Depending on job title give me summary for my resume within 4-5 lines in JSON format with field experience level and Summary with Experience level for Fresher ,Mid-Level , Experienced  "
const Summary = ({ enableNext }) => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [summary, setSummary] = useState();
    const [loading, setLoading] = useState(false);
    const params = useParams();
    const [aiGeneratedSummaryList, setAiGeneratedSummaryList] = useState();
  
    useEffect(() => {
      summary &&
        setResumeInfo({
          ...resumeInfo,
          summary: summary,
        });
    }, [summary]);
  
    const GenerateSummaryFromAi = async () => {
      setLoading(true);
      const PROMPT = prompt.replace('{jobTitle}', resumeInfo.jobTitle);
      console.log(PROMPT);
  
      try {
        const result = await AIChatSession.sendMessage(PROMPT);
        console.log(result.response.text()); // Debug the raw response
        const parsedResponse = JSON.parse(result.response.text());
  
        // Extract the Summaries array
        setAiGeneratedSummaryList(parsedResponse.Summaries || []);
      } catch (error) {
        console.error('Error generating summary:', error);
        toast.error('Failed to generate summary.');
      } finally {
        setLoading(false);
      }
    };
  
    const onSave = (e) => {
      e.preventDefault();
      setLoading(true);
  
      const data = {
        data: {
          summary: summary,
        },
      };
  
      GlobalApi.UpdateResumeDetail(params?.resumeId, data).then(
        (resp) => {
          console.log(resp);
          enableNext(true);
          setLoading(false);
          toast('Details updated');
        },
        (error) => {
          setLoading(false);
        }
      );
    };
  
    return (
      <div>
        <div className="p-5 shadow-lg rounded-lg border-t-primary border-t-4 mt-10">
          <h2 className="font-bold text-lg"> Summary </h2>
          <p> Add summary for your job title </p>
  
          <form className="mt-7" onSubmit={onSave}>
            <div className="flex justify-between items-end">
              <label>Add Summary</label>
              <Button
                type="button"
                onClick={() => GenerateSummaryFromAi()}
                variant="outline"
                size="sm"
                className="border-primary text-primary flex gap-2"
              >
                <Brain className="h-4 w-4" />
                Generate From AI
              </Button>
            </div>
            <Textarea
              className="mt-5"
              required
              onChange={(e) => setSummary(e.target.value)}
            />
            <div className="mt-2 flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  'save'
                )}
              </Button>
            </div>
          </form>
        </div>
        {aiGeneratedSummaryList && (
          <div>
            <h2 className="font-bold text-lg">Suggestions</h2>
            {aiGeneratedSummaryList.map((item, index) => (
              <div key={index}
              onClick={()=>setSummary(item?.summary)}
              className='p-5 shadow-lg my-4 rounded-lg cursor-pointer'>
                <h2 className="font-bold my-1">Level: {item?.ExperienceLevel}</h2>
                <p>{item?.Summary}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };
  
  export default Summary;
  
