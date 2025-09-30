"use client";

import { z } from "zod";
import { Card } from "@/components/ui/card";
import { Utensils } from "lucide-react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

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
  const form = useForm<DietSchemaFormData>({
    resolver: zodResolver(dietSchema),
    defaultValues: {
      nome: "",
      idade: undefined,
      altura_cm: undefined,
      peso_kg: undefined,
      sexo: undefined,
      nivel_atividade: undefined,
      objetivo: undefined,
    },
  });
  
  return(
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl border-0">
          <div className="p-8">

              <div className="text-center mb-8">
                  <div className="flex items-center justify-center mb-4 mx-auto ">
                    <Utensils className="w-14 h-14 text-green-500" />
                  </div>
                  <h1 className="text-3xl font-bold text-green-500 mb-2">Calcule sua Dieta.</h1>
              </div>

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                   <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                        Dados Pessoais
                      </h3>

                      {/* Campos Nome e Idade */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField 
                          control={form.control}
                          name="nome"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nome</FormLabel>
                              <FormControl>
                                <Input
                                {...field}
                                placeholder="Digite seu nome..."
                                />
                              </FormControl>
                            </FormItem>
                          )}
                          />

                          <FormField 
                          control={form.control}
                          name="idade"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Idade</FormLabel>
                              <FormControl>
                                <Input
                                type="number"
                                step="any"
                                {...form.register("idade", {
                                  setValueAs: (value) => value === "" ? undefined : Number(value),
                                })}
                                placeholder="Ex: 19"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                          />
                      </div>
                      
                      {/* Campos Sexo, Pesso e Altura */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          <FormField 
                          control={form.control}
                          name="peso_kg"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Peso em KG</FormLabel>
                              <FormControl>
                                <Input
                                type="number"
                                step="any"
                                {...form.register("peso_kg", {
                                  setValueAs: (value) => value === "" ? undefined : parseFloat(value),
                                })}
                                placeholder="Ex: 68"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                          />

                          <FormField 
                          control={form.control}
                          name="altura_cm"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Altura em cm</FormLabel>
                              <FormControl>
                                <Input
                                type="number"
                                step="any"
                                {...form.register("altura_cm", {
                                  setValueAs: (value) => value === "" ? undefined : Number(value),
                                })}
                                placeholder="Ex: 1.79"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                          />

                          <FormField 
                          control={form.control}
                          name="sexo"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Sexo</FormLabel>
                              <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione o seu Sexo." />
                                  </SelectTrigger>
                                </FormControl>

                                <SelectContent>
                                  <SelectItem value="masculino">Masculino</SelectItem>
                                  <SelectItem value="feminino">Feminino</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                          />
                      </div>

                      {/* Campos Nível Atividade e Objetivo */}
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

                          <FormField 
                          control={form.control}
                          name="nivel_atividade"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Nível de Atividade</FormLabel>
                              <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione o nível de atividade." />
                                  </SelectTrigger>
                                </FormControl>

                                <SelectContent>
                                  <SelectItem value="sedentário">Sedentário</SelectItem>
                                  <SelectItem value="2x_semana">2x por Semana</SelectItem>
                                  <SelectItem value="4x_semana">4x por Semana</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                          />

                          <FormField 
                          control={form.control}
                          name="objetivo"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Objetivo.</FormLabel>
                              <Select
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione o seu bBjetivo." />
                                  </SelectTrigger>
                                </FormControl>

                                <SelectContent>
                                  <SelectItem value="perda_de_peso">Perda de Peso</SelectItem>
                                  <SelectItem value="hipertrofia">Hipertrofia</SelectItem>
                                  <SelectItem value="manter_massa_muscular">Manter a massa muscular</SelectItem>
                                </SelectContent>
                              </Select>
                            </FormItem>
                          )}
                          />
                      </div>
                   </div>

                   <Button className="w-full mt-6 hover:opacity-90 cursro-pointer">
                    Gerar minha Dieta
                   </Button>

                </form>

              </Form>

          </div>
      </Card>
    </div>
  );
}