import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

export function DietGenerator(){
  return(
    <div className="min-h-screen flex flex-col items-center justify-center p-4">
       <Card className="w-full max-w-4xl border-0 p-4 md:p-6">

          <div className="flex justify-center gap-4">
            <Button className="cursor-pointer gap-2" size="lg">
              <Sparkles name="w-6 h-6" />
              Gerar Dieta.
            </Button>
          </div>


          <div className="bg-card rounded-lg p-6 border border-border max-h-[500px] overflow-y-auto">
            <div className="prose prose-sm max-w-none">
                ....Todo Gerado estará aqui....
            </div>
          </div>

       </Card>
    </div>
  )
}