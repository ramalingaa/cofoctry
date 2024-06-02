import { createSlice } from '@reduxjs/toolkit';
import sampleData from "./sampleresponse.json";
interface InitialState {
    ideaEssenceResponse: string;
    surveyResponse: any[];  
    personaResponse: any;
    personaSurveyResponse: any[];
    overallResponse: any;
    perQuestionResponse: any[];
}
const initialState: InitialState = {
    ideaEssenceResponse: '',
    surveyResponse: sampleData.surveryResponse,
    personaResponse: sampleData.personaDetails,
    personaSurveyResponse: [],
    overallResponse: sampleData.overallResponse,
    perQuestionResponse: sampleData.perQuestionResponse,
}

const cofactorReducer = createSlice({
  name: 'cofactorreducer',
  initialState: initialState,
  reducers: {
    updateIdeaEssenceResponse: (state, action) => {
      state.ideaEssenceResponse = action.payload;
    },
    updateSurveyResponse: (state, action) => {
      state.surveyResponse = action.payload;
    },
    updatePersonaResponse: (state, action) => {
      state.personaResponse = action.payload;
    },
    updatePersonaSurveyResponse: (state, action) => {
      state.personaSurveyResponse = action.payload;
    },
    updateOverallResponse: (state, action) => {
      state.overallResponse = action.payload;
    },
    updatePerQuestionResponse: (state, action) => {
      state.perQuestionResponse = action.payload;
    },
  },
});


export const { updateIdeaEssenceResponse, updateSurveyResponse, updatePersonaResponse, updatePersonaSurveyResponse, updateOverallResponse, updatePerQuestionResponse } = cofactorReducer.actions;

export default cofactorReducer.reducer;

