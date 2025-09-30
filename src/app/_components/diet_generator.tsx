"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { DietData } from "@/types/diet-data";
import { Loader, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import ReactMarkDown from "react-markdown";

export function DietGenerator({ data}: {data: DietData }){
  const [output, setOutput] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const controllerRef = useRef<AbortController | null>(null);

  async function startStreaming(){

    const controller = new AbortController();
    controllerRef.current = controller;

    setOutput("");
    setIsStreaming(true);

    try {
      
      const response = await fetch("http://localhost:3333/plan", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          nome: data.nome,
          idade: data.idade,
          altura_cm: data.altura_cm,
          peso_kg: data.peso_kg,
          sexo: data.sexo,
          objetivo: data.objetivo,
          nivel_atividade: data.nivel_atividade,
        }),
        signal: controller.signal // Permite cancelar a requisição a qualquer momento
      });

      const reader = response.body?.getReader(); // Pega a requisição que estamos enviando em string
      const decoder = new TextDecoder("uft-8"); // Decodifica a string em texto normal

      while(true){
        const { done , value} = await reader!.read(); // Lê o valor da requisição enviada pelo backend
        if(done) break; // Se estiver tudo pronto, sai do loop

        setOutput(prev => prev + decoder.decode(value)); // Depois de decodificar, adiciona o valor ao output ex: oi oi tudo bem oi tudo bem legal
      }

    } catch (err: any) {
      if(err.name === "AbortError"){
        console.log("Requisição abortada pelo usuário");
        return;
      }

      console.log(err);
    }finally{
      setIsStreaming(false);
      controllerRef.current = null;
    }

  }
  async function handleGenerate() {
    if(isStreaming){
      controllerRef.current?.abort();
      controllerRef.current = null;
      setIsStreaming(false);
      return
    }

    await startStreaming();
  }

  return(
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
       <Card className="w-full max-w-4xl border-0 p-4 md:p-6">

          <div className="flex justify-center gap-4">
            <Button className="cursor-pointer gap-2" size="lg"
            onClick={handleGenerate}
            >
              {isStreaming ? <Loader name="animate-spin" /> : <Sparkles name="w-6 h-6" />}
              {isStreaming ? "Parar" : "Gerar Dieta"}
            </Button>
          </div>

          {output && (
            <div className="bg-card rounded-lg p-6 border border-border max-h-[500px] overflow-y-auto">
            <div className="prose prose-sm max-w-none">
                <ReactMarkDown 
                components={{
                  h2: ({ node, ...props }) => (
                    <h2
                      className="text-xl font-bold text-green-600 my-1"
                      {...props}
                    />
                  ),
                  h1: ({ node, ...props }) => (
                    <h1
                      className="text-2xl font-bold text-zinc-900 mb-1"
                      {...props}
                    />
                  ),
                }}
                >
                  {output}
                </ReactMarkDown>
            </div>
          </div>
          )}
          

       </Card>
    </div>
  );
}