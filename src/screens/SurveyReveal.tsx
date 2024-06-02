import { useNavigate } from "react-router-dom";
import SurveyRevealComponent from "../components/SurveyReveal";

const SurveyReveal: React.FC = () => {

    const navigate = useNavigate();
    return <div className="flex flex-col items-center justify-center mt-4 w-full h-screen gap-4">
        <SurveyRevealComponent />
        <button onClick={() => navigate('/personadetails')} className="px-4 py-2 rounded bg-blue-500 text-white">Go to Personas</button>
     </div>;
}

export default SurveyReveal