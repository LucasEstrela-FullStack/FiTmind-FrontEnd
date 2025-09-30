export interface DietData{
  nome: string;
  idade: number;
  altura_cm: number;
  peso_kg: number;
  sexo: "masculino" | "feminino";
  objetivo: "perda_de_peso" | "hipertrofia" | "manter_massa_muscular";
  nivel_atividade: "sedentário" | "2x_semana" | "4x_semana";
}
