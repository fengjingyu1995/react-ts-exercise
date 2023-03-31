import React from 'react';
import { transformDisplayName } from '../../../utils/transformDisplayName';
import { UserFormData } from '../userForm.model';

interface ReviewPageProps {
  userFormData: UserFormData;
  title: string;
}

function ReviewPage({ userFormData, title }: ReviewPageProps) {
  return (
    <div className="mt-10">
      <h1 className="mb-5 text-3xl text-center">{title}</h1>
      {Object.entries(userFormData)
        .filter(([name]) => name !== 'selectedPokemonType')
        .map(([name, value]) => (
          <div className="flex justify-between my-5 text-lg" key={name}>
            <span className="font-bold">{transformDisplayName(name)}:</span>
            <span>{value}</span>
          </div>
        ))}
    </div>
  );
}

export default ReviewPage;
