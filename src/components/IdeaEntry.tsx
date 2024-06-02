import axios from 'axios';
import React, { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateIdeaEssenceResponse, updateOverallResponse, updatePerQuestionResponse, updatePersonaResponse, updatePersonaSurveyResponse, updateSurveyResponse } from '../store/apiResponseReducer';
import { useNavigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';

type IdeaEntryProps = {};

const IdeaEntry: FC<IdeaEntryProps> = () => {
  const [idea, setIdea] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string>('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleNext = async () => {
    if (!idea) return;
    setLoading(true);
    // Call Prompt One to generate the idea essence
    setLoadingText('Generating Idea Essence...');
    const ideaEssence = await generateIdeaEssence(idea);
    dispatch(updateIdeaEssenceResponse(ideaEssence))
    console.log('ideaEssence response1', ideaEssence)
    // Call Prompt Two to generate the survey
    setLoadingText('Generating Survey...');
    const survey = await generateSurvey(ideaEssence);
    dispatch(updateSurveyResponse(survey))

    console.log('survey response2', survey)
    // Call Prompts Three and Four to generate personas
    setLoadingText('Generating Personas...');
    const initialPersona = await generatePersonas(ideaEssence);
    console.log('initialPersona response3', survey)

    const personaList = []
    personaList.push(initialPersona)
    console.log('initialPersona', initialPersona)
    for(let i = 0; i < 4; i++){
        const personas:any = await generateIdeaEssenceActualPay(ideaEssence, JSON.stringify(personaList));
        personaList.push(personas)
    }
    console.log('personaList', personaList)
    console.log('generateIdeaEssenceActualPay response4', personaList)
    dispatch(updatePersonaResponse(personaList))

    const personaSurveyResponseList = []
    // Call Prompt Five to fill out the survey for each persona
    setLoadingText('Filling out Surveys for Personas...');
    for(let i = 0; i < personaList.length; i++){
        const responses = await fillOutSurvey(personaList[i], survey);
        personaSurveyResponseList.push(responses)
    }
    console.log('personaSurveyResponse response5', personaSurveyResponseList)

    dispatch(updatePersonaSurveyResponse(personaSurveyResponseList))

    // // Call Prompts Six and Seven to aggregate results
    setLoadingText('Aggregating Results...');
    const overallResults = await aggregateOverallResults(personaSurveyResponseList);
    console.log('overallResults response6', overallResults)
    dispatch(updateOverallResponse(overallResults))
    setLoadingText('Aggregating Per Question Results...');
    const perQuestionResults = await aggregatePerQuestionResults(personaSurveyResponseList);
    console.log('perQuestionResults response7', perQuestionResults)
    dispatch(updatePerQuestionResponse(perQuestionResults))

    setLoading(false);
    setLoadingText('')
    navigate('/surveyreveal');
    // Store results and navigate to the next screen
  };



  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Enter your business idea</h1>
      <textarea
        className="w-full p-2 border rounded"
        rows={5}
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="Enter your idea here..."
      />
  
      <Button onPress={handleNext} isDisabled={loading} className={`mt-4 px-4 py-2 rounded bg-blue-500 text-white ${
          !idea && 'opacity-50 cursor-not-allowed'
        }`} size='sm' variant='solid' isLoading={loading}>
        Next
      </Button>
      {loading && <p>{loadingText}</p>}
    </div>
  );
};


const generateIdeaEssence = async (idea: string) => {
    console.log('iside api generateIdeaEssence', idea)
    try {
        const response = await axios.post('https://pt8v8iwybk.execute-api.ap-south-1.amazonaws.com/cofactory-develop/cofactory', { user_message: idea });
        const apiResponse = transformJSON(response)
        return apiResponse
    } catch (error) {
      console.error(error);
    }
  };
  const generatePersonas = async (ideaEssence: string) => {
    console.log('iside api generatePersonas', ideaEssence)
    try {
        const response = await axios.patch('https://pt8v8iwybk.execute-api.ap-south-1.amazonaws.com/cofactory-develop/cofactory', { user_message: ideaEssence });
        const apiResponse = transformJSON(response)
        return apiResponse
    } catch (error) {
      console.error(error);
    }
  };
  const generateIdeaEssenceActualPay = async (ideaEssence: string, initialPersona: any) => {
    console.log('iside api generateIdeaEssenceActualPay', ideaEssence, initialPersona)
    try {
        const response = await axios.post('https://mqan7bo8c7.execute-api.ap-south-1.amazonaws.com/cofactory-dev2/cofactory2', { user_message: ideaEssence, last_persona: initialPersona});
        const apiResponse = transformJSON(response)
        return apiResponse
    } catch (error) {
      console.error(error);
    }
  };




  const generateSurvey = async (ideaEssence: string) => {
    console.log('iside api generateSurvey', ideaEssence)
    try {
        const response = await axios.put('https://pt8v8iwybk.execute-api.ap-south-1.amazonaws.com/cofactory-develop/cofactory', { user_message: ideaEssence });
        const apiResponse = transformJSON(response)
        return apiResponse
    } catch (error) {
      console.error(error);
    }
  };

const fillOutSurvey = async (personas: any[], survey: any) => {
  // Call Prompt Five API for each persona
  console.log('iside api fillOutSurvey', personas, survey)  
  try {
      const response = await axios.put('https://mqan7bo8c7.execute-api.ap-south-1.amazonaws.com/cofactory-dev2/cofactory2', { user_persona: personas, idea_survey: survey });
      const apiResponse = transformJSON(response)
      return apiResponse
  } catch (error) {
    console.error(error);
  }
};

const aggregateOverallResults = async (responses: any[]) => {
  // Call Prompt Six API
  console.log('iside api aggregateOverallResults', responses)  
  try {
      const response = await axios.patch('https://mqan7bo8c7.execute-api.ap-south-1.amazonaws.com/cofactory-dev2/cofactory2', { persona_responses: responses });
      const apiResponse = transformJSON(response)
      return apiResponse
  } catch (error) {
    console.error(error);
  }
};

const aggregatePerQuestionResults = async (responses: any[]) => {
  // Call Prompt Seven API
  console.log('iside api aggregatePerQuestionResults', responses)  
  try {
      const response = await axios.post('https://xd2yeont3c.execute-api.ap-south-1.amazonaws.com/cofactory3-development/cofactory3', { persona_responses: responses });
      const apiResponse = transformJSON(response)
      return apiResponse
  } catch (error) {
    console.error(error);
  }
};

const transformJSON = (response: any) => {
  try {
    return JSON.parse(JSON.parse(response.data.body).assistant_reply)
  } catch (error) {
    console.error(error);
    alert('Error transforming JSON')
  }
}

export default IdeaEntry;


