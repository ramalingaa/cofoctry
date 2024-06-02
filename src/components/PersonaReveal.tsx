import { useSelector } from "react-redux";
import { Tab, Tabs } from "@nextui-org/react";
import { useState } from "react";
import SinglePersonProfileCard from "./SinglePersonProfileCard";


const PersonaRevealComponent: React.FC = () => {
    const [activeTab, setActiveTab] = useState(0);
    const handleTabChange = ( key: any) => {
        console.log('selected tab', key)
        setActiveTab(key);
      };
    const { personaSurveyResponse: personaResponse } = useSelector((state: any) => state.cofactor);
    console.log('personaResponse', personaResponse)
    return (
        <div className="flex flex-wrap gap-4">
        
         <Tabs key={'size'} size={'sm'} aria-label="Tabs sizes" onSelectionChange={(key) => handleTabChange(key)} color="primary">
            {personaResponse.map((size: any, index: number) => (
                <Tab key={index} title={size?.userpersona?.name}/>
            ))}
          </Tabs>
          <SinglePersonProfileCard  personaData={personaResponse[activeTab]}/>
      </div>
      );
}

export default PersonaRevealComponent