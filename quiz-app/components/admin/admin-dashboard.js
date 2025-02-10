'use client';
import { useTrivia } from '../../context/QuizContext';
import { Button } from '../ui/button';
import { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Label } from '../ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { useToast } from '../../hooks/use-toast';

const AdminDashboard = () => {
  const { adminSettings, updateAdminSettings } = useTrivia(),
    [numOfQuestions, setNumOfQuestions] = useState(
      adminSettings.numOfQuestions
    ),
    [questionType, setQuestionType] = useState(adminSettings.questionType),
    { toast } = useToast();

  useEffect(() => {
    setNumOfQuestions(adminSettings.numOfQuestions);
    setQuestionType(adminSettings.questionType);
  }, [adminSettings]);

  const handleSaveSettings = () => {
    updateAdminSettings({
      numOfQuestions: Number(numOfQuestions),
      questionType,
    });

    toast({
      description: 'Settings saved successfully!',
    });
  };

  return (
    <div className='flex justify-center '>
      <main className='flex flex-col   min-h-screen w-80 gap-5'>
        <h1 className='text-3xl font-bold mb-6 text-center'>Admin Settings</h1>
        <Card className='text-center flex flex-col'>
          <CardHeader>
            <CardTitle className='h2-bold'>Current Settings</CardTitle>
          </CardHeader>
          <CardContent className='mb-4 flex flex-col gap-4'>
            <div>
              <Label>Number of Questions: </Label>
              <span className='font-bold'>{adminSettings.numOfQuestions}</span>
            </div>
            <div>
              <Label>Question Type: </Label>
              <span className='font-bold'>
                {adminSettings.questionType.charAt(0).toUpperCase() +
                  adminSettings.questionType.slice(1)}
              </span>
            </div>
          </CardContent>
        </Card>
        <div className='mb-4'>
          <Label className='font-medium mb-1'>Number of Questions:</Label>
          <Input
            type='number'
            value={numOfQuestions}
            onChange={(e) => setNumOfQuestions(e.target.value)}
            min='1'
            max='50'
          />
        </div>
        <div className='mb-4'>
          <Label className='font-medium mb-1'>Question Type:</Label>
          <Select value={questionType} onValueChange={setQuestionType}>
            <SelectTrigger>
              <SelectValue placeholder='Select Question Type' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='multiple'>Multiple Choice</SelectItem>
              <SelectItem value='boolean'>True / False</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button onClick={handleSaveSettings}>Save Settings</Button>
        <Button
          variant='destructive'
          onClick={() => {
            localStorage.removeItem('isAuthenticated');
            window.location.href = '/';
          }}
        >
          Sign Out
        </Button>
      </main>
    </div>
  );
};

export default AdminDashboard;
