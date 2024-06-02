import React from 'react';
import { Routes, Route, } from 'react-router-dom';
import IdeaEntry from './components/IdeaEntry';
import SurveyReveal from './screens/SurveyReveal';
import PersonaRevealPage from './screens/PersonaRevealPage';
import ResultsPage from './screens/ResultsPage';


const App: React.FC = () => {
  return (
    <Routes>
     
        <Route path="/"  element={<IdeaEntry />} />
        <Route path="/surveyreveal" element={<SurveyReveal />} />
        <Route path="/personadetails" element={<PersonaRevealPage />} />
        <Route path="/results" element={<ResultsPage />} />
    </Routes>
  );
};

export default App;
