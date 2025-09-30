import { z } from "zod";
import { Card } from "@/components/ui/card";

const dietSchema = z.object({
   nome : z.string().min(2, "O nome é obrigatório"),
   idade: z.number().int().positive(),
   altura_cm: z.number().positive(),
   peso_kg: z.number().positive(),
   sexo: z.enum(["masculino", "feminino"], { error: "Selecione o Sexo"}),
   nivel_atividade: z.enum(["sedentário", "2x_semana", "4x_semana"], {error: "Selecione o Nível de Atividade"}),
   objetivo: z.enum(["perda_de_peso", "hipertrofia", "manter_massa_muscular"], {error: "Selecione o Objetivo"}),
});

type DietSchemaFormData = z.infer<typeof dietSchema>;

interface DietFormProps{
  onSubmit: (data: DietSchemaFormData) => void;
}

export function DietForm({ onSubmit }: DietFormProps){
  
  return(
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card>
          <h1>Teste</h1>
      </Card>
    </div>
  );
}