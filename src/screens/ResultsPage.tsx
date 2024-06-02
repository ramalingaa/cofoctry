import ResultQuestion from "../components/ResultQuestion"
import ResultsComponent from "../components/Results"



const ResultsPage = () => {

    return <div className="flex flex-col items-center justify-center w-full h-full p-4 gap-4">
        <ResultsComponent />
        <ResultQuestion />
    </div>

}

export default ResultsPage