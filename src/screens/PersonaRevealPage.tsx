import { useNavigate } from "react-router-dom";
import PersonaRevealComponent from "../components/PersonaReveal";

const PersonaRevealPage: React.FC = () => {

    const navigate = useNavigate();

    return <div className="flex flex-col items-center justify-center w-full h-full p-4 gap-4">
            <h1 className="text-xl font-bold">Persona Details</h1>
        <PersonaRevealComponent />
        <button onClick={() => navigate('/results')} className="px-4 py-2 rounded bg-blue-500 text-white">Go to Results</button>

    </div>;
}

export default PersonaRevealPage