import {useSearchParams} from "react-router";

export interface CardParams {
  name: string;
  job: string;
  company: string;
  companyWebsite: string;
  phone: string;
  email: string;
  linkedin: string;
}

export function useCardParams(): CardParams {
  const [searchParams] = useSearchParams();

  return {
    name: searchParams.get('name') || '',
    job: searchParams.get('job') || '',
    company: searchParams.get('company') || '',
    companyWebsite: searchParams.get('companyWebsite') || '',
    phone: searchParams.get('phone') || '',
    email: searchParams.get('email') || '',
    linkedin: searchParams.get('linkedin') || '',
  };
}