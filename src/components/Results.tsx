import { useSelector } from "react-redux";

const ResultsComponent = () => {
    const { overallResponse } = useSelector((state: any) => state.cofactor);
    console.log('personaResponse', overallResponse)
    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold text-center">Overall Insights</h2>
            <div>
                 <h2 className="text-md font-bold">Key Insights:</h2>
                <ol className="list-decimal list-inside pl-6 flex flex-col gap-2 pt-2">
                {overallResponse && overallResponse.keyinsights && overallResponse.keyinsights.map((insight: string, index: number) => (
                    <li key={insight}>{ insight}</li>
                ))}
                </ol>
            </div>
            <div>
                {overallResponse && overallResponse.pmfviabilityscore && <div>
                    <p className="text-md font-bold mb-4">PMF Viability Score: {overallResponse.pmfviabilityscore.score}</p>
                    <p className="text-md "><b>Reasoning:</b> {overallResponse.pmfviabilityscore.reasoning}</p>
                </div>}
            </div>
            <div>
                {overallResponse && overallResponse.strengths && <div>
                    <h2 className="text-md font-bold">Strengths</h2>
                    <ul>
                        {overallResponse.strengths.map((strength: string) => (
                            <li key={strength}>{strength}</li>
                        ))}
                    </ul>
                </div>}
            </div>
            <div>
                {overallResponse && overallResponse.weaknesses && <div>
                    <h2 className="text-md font-bold">Weaknesses</h2>
                    <ul>
                        {overallResponse.weaknesses.map((weakness: string) => (
                            <li key={weakness}>{weakness}</li>
                        ))}
                    </ul>
                </div>}
            </div>
            <div>
                {overallResponse && overallResponse.enhancements && <div>
                    <h2 className="text-md font-bold">Enhancements</h2>
                    <ul>
                        {overallResponse.enhancements.map((enhancement: string) => (
                            <li key={enhancement}>{enhancement}</li>
                        ))}
                    </ul>
            </div>}
            </div>
        </div>
    );

}

export default ResultsComponent