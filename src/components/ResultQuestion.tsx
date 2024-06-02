import { useSelector } from "react-redux";

const ResultQuestion = () => {
  const { perQuestionResponse } = useSelector((state: any) => state.cofactor);
  console.log('perQuestionResponse', perQuestionResponse)
  return (
    <div className="flex flex-col gap-4">
        <h2 className="text-xl font-bold text-center">Question Based Insights</h2>
      {perQuestionResponse?.map((item: any, index: number) => (
        <div key={index}>
          <h3 className="text-lg font-bold">{item.question}</h3>
          <ol className="list-decimal list-inside pl-6 flex flex-col gap-2">
            {item.insights.map((insight: string, insightIndex: number) => (
              <li key={insightIndex}>{insight}</li>
            ))}
          </ol>
        </div>
      ))}
    </div>
  );
};

export default ResultQuestion;