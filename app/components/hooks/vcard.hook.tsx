import type {CardParams} from "~/components/hooks/card-params.hook";
import VCard from "vcard-creator";
import {useMemo} from "react";

export function useVCard(params: CardParams): string {
  return useMemo(() => {
    const card = new VCard();
    card.addName(params.name);
    card.addJobtitle(params.job);
    card.addCompany(params.company);
    card.addEmail(params.email);
    if (params.companyWebsite) card.addURL(params.companyWebsite, "Website");
    if (params.phone) card.addPhoneNumber(params.phone);
    if (params.linkedin) card.addSocial(params.linkedin, "LinkedIn");
    return card.toString();
  }, [params.name, params.job, params.company, params.email, params.linkedin, params.phone, params.companyWebsite]);
}