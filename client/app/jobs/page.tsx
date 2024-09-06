"use client"
import React, { useState } from 'react';
import {  
  Button, 
  Card, 
  CardContent, 
  IconButton,
  Tab,
  Tabs
} from '@mui/material';
import { BookmarkBorder, Tune } from '@mui/icons-material';
import Header from '@/components/Header';
import FilterPanel from '@/components/FilterPanel';
import JobCard from '@/components/JobCard';

const Jobs = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className="min-h-screen bg-gray-100">
      <Header page="home"/>
      <main className="container mx-auto mt-4 px-4">
        <div className='flex justify-center'>
          <Tabs value={0} className="mb-4 ">
            <Tab label="Jobs" />
          </Tabs>
        </div>

        <div className='flex gap-5'>
          <div>
            <div className="flex items-center mb-4">
              <IconButton onClick={() => setOpen(!open)}>
                <Tune className="text-blue-600" />
              </IconButton>
              <h6 className='text-2xl font-semibold ml-3'>Filters</h6>
            </div>

            {
              open && <FilterPanel />
            }
            <JobCard />
          </div>
          <div>
            <Card className="mb-4">
              <CardContent>
                <div className="flex justify-between items-start">
                  <div className="flex items-start flex-col">
                    <h1 className="text-2xl font-bold">
                      Limpiadora de casas profesional
                    </h1>
                    <p className="text-gray-500">
                      Dracut, MA
                    </p>
                    <p className="mt-2">
                      Empieza el nuevo año con una nueva carrera<br />
                      Lo que más le gusta a nuestro equipo: <a href="https://www.youtube.com/watch?v=asFSbDbAw" className="text-blue-500 underline">Ver Video</a><br />
                      Tarifa mínima garantizada por hora $16
                    </p>
                    <ul className="list-disc list-inside mt-2">
                      <li>Gane más de $22 Promedio de pago por hora basado en la eficiencia, más propinas, más bonos</li>
                      <li>Premiamiento</li>
                      <li>Capacitación pagada, vacaciones pagadas, paga semanal</li>
                      <li>Sin noches, sin fines de semana, sin vacaciones</li>
                      <li>Tiempo libre pagado y plan de jubilación</li>
                      <li>Lunes-Viernes 20 a 40 horas y Horarios Flexibles disponibles</li>
                      <li>Equipo, suministros y camisas cómodas y secas proporcionadas.</li>
                    </ul>
                  </div>
                  <div className="flex flex-col items-end">
                    <IconButton>
                      <BookmarkBorder />
                    </IconButton>
                    <Button variant="contained" color="primary" className="mt-2">
                      Apply
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <h2 className="text-lg font-semibold">
                  Base pay range
                </h2>
                <h3 className="text-xl font-bold text-blue-500">
                  $16.00 - $24.00/hr
                </h3>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Jobs;
