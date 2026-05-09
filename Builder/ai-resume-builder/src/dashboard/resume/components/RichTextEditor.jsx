import { Button } from '@/components/ui/button';
import { Brain, LoaderCircle } from 'lucide-react';
import React, { useContext, useState } from 'react';
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  Editor,
  EditorProvider,
  Separator,
  Toolbar,
} from 'react-simple-wysiwyg';
import { AIChatSession } from './../../../../service/AiModel';
import { toast } from 'sonner';
import { ResumeInfoContext } from '@/context/ResumeInfoContext';

const PROMPT =
  'position title: {positionTitle}, Based on the position title, provide 5-7 bullet points for my experience in a resume. Return the result in HTML format.';

const RichTextEditor = ({ onRichTextEditorChange, index, defaultValue }) => {
  const [value, setValue] = useState(defaultValue || '');
  const { resumeInfo } = useContext(ResumeInfoContext);
  const [loading, setLoading] = useState(false);

  const GenerateSummaryFromAI = async () => {
    const positionTitle = resumeInfo?.experience?.[index]?.title;
    if (!positionTitle) {
      toast.error('PLEASE ADD POSITION TITLE');
      return;
    }

    setLoading(true);
    try {
      // Generate prompt and fetch response
      const prompt = PROMPT.replace('{positionTitle}', positionTitle);
      const result = await AIChatSession.sendMessage(prompt);

      // Extract response text
      const responseText = await result.response.text();
      console.log('Raw AI Response:', responseText); // Debugging log

      let bulletPoints;

      try {
        // Attempt to parse as JSON
        const responseData = JSON.parse(responseText);
        
        // Check for 'bulletPoints' key in the AI response
        bulletPoints = responseData['bulletPoints'] || responseData['bullet points'] || responseData['bulletPoint'] || responseData['bullet_points'] || responseData['bullet_Points']; 
      } catch (err) {
        console.warn('Response is not JSON, falling back to plain text parsing.');
        // Handle non-JSON response (fallback for plain text)
        bulletPoints = responseText.match(/<li>(.*?)<\/li>/g)?.map((item) =>
          item.replace(/<\/?li>/g, '')
        );
      }

      if (!bulletPoints || bulletPoints.length === 0) {
        toast.error('No bullet points were generated. Please try again.');
      } else {
        // Convert bullet points to HTML format
        const formattedHTML = `<ul>${bulletPoints
          .map((point) => `<li>${point}</li>`)
          .join('')}</ul>`;
        setValue(formattedHTML); // Update editor value
      }
    } catch (error) {
      console.error('Error generating summary:', error);
      toast.error('Failed to generate AI summary. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex justify-between my-2">
        <label className="text-xs">Summary</label>
        <Button
          variant="outline"
          size="sm"
          onClick={GenerateSummaryFromAI}
          disabled={loading}
          className="flex gap-2 border-primary text-primary"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" />
          ) : (
            <>
              <Brain className="h-4 w-4" />
              Generate From AI
            </>
          )}
        </Button>
      </div>

      <EditorProvider>
        <Editor
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
            onRichTextEditorChange(e);
          }}
        >
          <Toolbar>
            <BtnUndo />
            <BtnRedo />
            <Separator />
            <BtnBold />
            <BtnItalic />
            <BtnUnderline />
            <BtnStrikeThrough />
            <Separator />
            <BtnNumberedList />
            <BtnBulletList />
            <Separator />
            <BtnLink />
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RichTextEditor;
