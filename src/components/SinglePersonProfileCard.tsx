import { Avatar } from '@nextui-org/react';
import React from 'react';

type personaProps = {
    personaData: any
}

const SinglePersonProfileCard: React.FC<personaProps> = ({ personaData }) => {
    const { userpersona, surveyresponse } = personaData || {};
    console.log('surveyresponse in component', surveyresponse)
    return (
        <div className='flex flex-col gap-4'>
            
<div className='flex flex-col gap-4'>
  <div className='flex justify-center'>
  <Avatar name={userpersona?.name} size='lg'/>
  </div>
  <h2>Name: {userpersona?.name ?? 'N/A'}</h2>
  <p>Age: {userpersona?.age ?? 'N/A'}</p>
  <p>Gender: {userpersona?.gender ?? 'N/A'}</p>
  <p>Occupation: {userpersona?.occupation ?? 'N/A'}</p>
  <p>Income: {userpersona?.income ?? 'N/A'}</p>
  <p>Location: {userpersona?.location ?? 'N/A'}</p>
  <p>Interests: {userpersona?.interests?.join(', ') ?? 'N/A'}</p>
  <p>Goals: {userpersona?.goals?.join(', ') ?? 'N/A'}</p>
  <p>Challenges: {userpersona?.challenges?.join(', ') ?? 'N/A'}</p>
  <p>How Product Helps: {userpersona?.howProductHelps?.join(', ') ?? 'N/A'}</p>
  <p>Why Choose Product: {userpersona?.whyChooseProduct?.join(', ') ?? 'N/A'}</p>
</div>
            <div className='flex flex-col gap-4'>
            <h2 className='text-xl font-bold text-center'>Survey Response</h2>
            {surveyresponse?.map((response: { [key: string]: string }, index: number) => (
                <div key={index} >
                    <p>Q: {Object.keys(response)[0]}: </p> 
                    <p>A: {Object.values(response)[0]}</p>
                </div>
            ))}
            </div>
        </div>
    );
}

export default SinglePersonProfileCard;