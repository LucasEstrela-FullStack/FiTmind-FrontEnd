"use client";

import { useState } from "react";
import { DietForm } from "./_components/diet-form";
import { DietGenerator } from "./_components/diet_generator";

interface DietData{
  nome: string;
  idade: number;
  altura_cm: number;
  peso_kg: number;
  sexo: "masculino" | "feminino";
  objetivo: "perda_de_peso" | "hipertrofia" | "manter_massa_muscular";
  nivel_atividade: "sedentário" | "2x_semana" | "4x_semana";
}

export default function Home() {
  const [data, setData] = useState<DietData | null>(null)

  function handleSubmit(userInfo: DietData){
    setData(userInfo)
  }

  return (
    <>
     {!data ? (
      <DietForm onSubmit={handleSubmit}/>
     ): (
       <DietGenerator />
     )}
     </>
  );
}
