import { useSelector } from "react-redux";

const SurveyRevealComponent: React.FC = () => {

    const { surveyResponse } = useSelector((state: any) => state.cofactor);
    console.log('surveyResponse', surveyResponse)
    return <div className="flex flex-col gap-4">
        <h1 className="text-xl font-bold">Survery Questions</h1>
        {
           surveyResponse && surveyResponse?.map((survey: any) => {
                return (
                    <div>
                        <h2 className="text-md font-bold">{survey.section}</h2>
                        <ul>
                            {
                                survey.questions.map((question: any) => {
                                    return <li key={question}>{question}</li>
                                })
                            }
                        </ul>
                    </div>
                )
            })
        }
    </div>;
}

export default SurveyRevealComponent