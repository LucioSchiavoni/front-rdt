import  { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createTelefono } from '@/api/telefonos'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useNavigate } from 'react-router-dom'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select'

const formSchema = z.object({
  ip: z.string().min(1, { message: "IP es requerida" }),
  unidad: z.string().min(1, { message: "Unidad es requerida" }),
  usuario: z.string().min(1, { message: "Usuario es requerido" }),
  rack: z.string().min(1, { message: "Rack es requerido" }),
  boca: z.string().min(1, { message: "Boca es requerida" }),
  anterior: z.string().min(1, { message: "Anterior es requerido" }),
  estado: z.string().min(1, { message: "Estado es requerido" }),
  piso: z.number().int().positive(),
  area: z.string().min(1, { message: "Área es requerida" }),
  lugar: z.number().int().positive().nullable(),
  ter: z.number().int().positive().nullable(),
  ue: z.number().int().positive().nullable(),
})

type FormData = z.infer<typeof formSchema>

export default function TelefonoForm() {
  const [step, setStep] = useState(1)
  const { register, handleSubmit, formState: { errors }, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

  const {toast} = useToast()

  const queryClient = useQueryClient()
  const navigate = useNavigate()

  const mutation = useMutation({
    mutationFn: createTelefono, 
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['telefonos'] })
      toast({
        title: data.success,
        description: "Teléfono creado correctamente",
        duration: 3000,
      })
      navigate("/dashboard")
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: error.error || "Hubo un error al crear el teléfono",
        duration: 5000,
        variant: "destructive",
      })
    }
  })

  const onSubmit = (data:any) => {
    const formattedData = {
      ...data,
      piso: Number(data.piso),
      internos: {
        create: {
          lugar: data.lugar ? Number(data.lugar) : null,
          ter: data.ter ? Number(data.ter) : null,
          ue: data.ue ? Number(data.ue) : null,
        }
      }
    }
    mutation.mutate(formattedData)
  }

  const nextStep = () => setStep(2)
  const prevStep = () => setStep(1)

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Formulario de Registro de Teléfono</CardTitle>
      </CardHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: -100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 100 }}
              transition={{ duration: 0.3 }}
            >
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="ip">IP</Label>
                  <Input id="ip" {...register('ip')} />
                  {errors.ip && <p className="text-red-500 text-sm mt-1">{errors.ip.message}</p>}
                </div>
                <div>
                  <Label htmlFor="unidad">Unidad</Label>
                  <Input id="unidad" {...register('unidad')} />
                  {errors.unidad && <p className="text-red-500 text-sm mt-1">{errors.unidad.message}</p>}
                </div>
                <div>
                  <Label htmlFor="usuario">Usuario</Label>
                  <Input id="usuario" {...register('usuario')} />
                  {errors.usuario && <p className="text-red-500 text-sm mt-1">{errors.usuario.message}</p>}
                </div>
                <div>
                  <Label htmlFor="rack">Rack</Label>
                  <Input id="rack" {...register('rack')} />
                  {errors.rack && <p className="text-red-500 text-sm mt-1">{errors.rack.message}</p>}
                </div>
                <div>
                  <Label htmlFor="boca">Boca</Label>
                  <Input id="boca" {...register('boca')} />
                  {errors.boca && <p className="text-red-500 text-sm mt-1">{errors.boca.message}</p>}
                </div>
              </CardContent>
              <CardFooter>
                <Button type="button" onClick={nextStep} className="w-full">Siguiente</Button>
              </CardFooter>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="anterior">Anterior</Label>
                  <Input id="anterior" {...register('anterior')} />
                  {errors.anterior && <p className="text-red-500 text-sm mt-1">{errors.anterior.message}</p>}
                </div>
                <div>
                  <Label htmlFor="estado">Estado</Label>
                  <Select onValueChange={(value) => setValue('estado', value)} defaultValue={watch('estado')}>
                    <SelectTrigger>
                      <SelectValue placeholder="Seleccione un estado" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ACTIVO">Activo</SelectItem>
                      <SelectItem value="INACTIVO">Inactivo</SelectItem>
                    </SelectContent>
                  </Select>
                  {errors.estado && <p className="text-red-500 text-sm mt-1">{errors.estado.message}</p>}
                </div>
                <div>
                  <Label htmlFor="piso">Piso</Label>
                  <Input id="piso" type="number" {...register('piso', { valueAsNumber: true })} />
                  {errors.piso && <p className="text-red-500 text-sm mt-1">{errors.piso.message}</p>}
                </div>
                <div>
                  <Label htmlFor="area">Área</Label>
                  <Input id="area" {...register('area')} />
                  {errors.area && <p className="text-red-500 text-sm mt-1">{errors.area.message}</p>}
                </div>
                <div>
                  <Label htmlFor="lugar">Lugar</Label>
                  <Input id="lugar" type="number" {...register('lugar', { valueAsNumber: true })} />
                  {errors.lugar && <p className="text-red-500 text-sm mt-1">{errors.lugar.message}</p>}
                </div>
                <div>
                  <Label htmlFor="ter">TER</Label>
                  <Input id="ter" type="number" {...register('ter', { valueAsNumber: true })} />
                  {errors.ter && <p className="text-red-500 text-sm mt-1">{errors.ter.message}</p>}
                </div>
                <div>
                  <Label htmlFor="ue">UE</Label>
                  <Input id="ue" type="number" {...register('ue', { valueAsNumber: true })} />
                  {errors.ue && <p className="text-red-500 text-sm mt-1">{errors.ue.message}</p>}
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button type="button" onClick={prevStep} variant="outline">Anterior</Button>
                <Button type="submit" disabled={mutation.status === 'pending'}>
                  {mutation.status === 'pending' ? 'Enviando...' : 'Enviar'}
                </Button>
              </CardFooter>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </Card>
  )
}