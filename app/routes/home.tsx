import type {Route} from "./+types/home";

import React from "react";
import {PrimeReactProvider} from "primereact/api";
import {useSearchParams} from "react-router";
import {Scene} from "~/components/scene";

export function meta({}: Route.MetaArgs) {
  const [searchParams] = useSearchParams();
  const name = searchParams.get('name') || '';
  return [
    {title: "Business Card " + name},
    {name: "description", content: "A pep.digital service"},
  ];
}

export default function Home() {
  return <PrimeReactProvider>
    <Scene/>
  </PrimeReactProvider>
}
