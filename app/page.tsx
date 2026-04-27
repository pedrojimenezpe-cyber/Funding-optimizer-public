import React, { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Home, Calculator, Briefcase, ListChecks, FileText, Lightbulb, Factory, Landmark, Percent, Zap, ArrowRight, CheckCircle2 } from 'lucide-react';

const opportunities = [
  {
    id: 1,
    nombre: 'CDTI Proyectos de I+D',
    organismo: 'Administración del Estado',
    tipo: 'Subvención + préstamo',
    intensidad: '25% - 50%',
    fit: 'Alto',
    cierre: 'Abierta permanente',
    detalle: 'Financia proyectos empresariales de investigación y desarrollo con alto componente tecnológico.',
  },
  {
    id: 2,
    nombre: 'PERTE Descarbonización Industrial',
    organismo: 'Administración del Estado',
    tipo: 'Subvención',
    intensidad: '30% - 50%',
    fit: 'Alto',
    cierre: '31/12/2026',
    detalle: 'Apoya actuaciones industriales vinculadas a eficiencia, electrificación y reducción de emisiones.',
  },
  {
    id: 3,
    nombre: 'ENISA Crecimiento',
    organismo: 'Otros Órganos',
    tipo: 'Préstamo participativo',
    intensidad: 'Hasta 75%',
    fit: 'Medio',
    cierre: 'Abierta',
    detalle: 'Instrumento útil para acompañar crecimiento y complementar ayudas públicas en proyectos innovadores.',
  },
  {
    id: 4,
    nombre: 'CAEs por eficiencia energética',
    organismo: 'Mercado / Gestores habilitados',
    tipo: 'CAES',
    intensidad: 'Variable',
    fit: 'Medio',
    cierre: 'Continuo',
    detalle: 'Permite monetizar ahorros energéticos certificados cuando hay medidas elegibles de eficiencia.',
  },
];

function Sidebar({ section, setSection }) {
  const items = [
    { key: 'dashboard', label: 'Dashboard', icon: Home },
    { key: 'calculadora', label: 'Calculadora', icon: Calculator },
    { key: 'oportunidades', label: 'Oportunidades', icon: Briefcase },
    { key: 'proyecto', label: 'Proyecto', icon: ListChecks },
  ];

  return (
    <aside className="w-72 min-h-screen bg-slate-950 text-white p-5 flex flex-col justify-between">
      <div>
        <div className="mb-8">
          <div className="text-3xl font-bold tracking-tight">Funding Optimizer</div>
          <div className="text-sm text-slate-300 mt-1">Uso interno · Español</div>
        </div>
        <nav className="space-y-2">
          {items.map((item) => {
            const Icon = item.icon;
            const active = section === item.key;
            return (
              <button
                key={item.key}
                onClick={() => setSection(item.key)}
                className={`w-full flex items-center gap-3 rounded-2xl px-4 py-3 text-left transition ${
                  active ? 'bg-teal-600 text-white shadow-lg' : 'text-slate-200 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
      <Card className="bg-slate-900 border-slate-800 text-white rounded-2xl">
        <CardContent className="p-4 space-y-3">
          <div className="font-semibold">¿Necesitas apoyo?</div>
          <div className="text-sm text-slate-300">Este prototipo simula una plataforma interna para priorizar financiación pública y fiscal.</div>
          <Button className="w-full rounded-xl">Contactar con estrategia</Button>
        </CardContent>
      </Card>
    </aside>
  );
}

function Kpi({ title, value, subtitle }) {
  return (
    <Card className="rounded-2xl shadow-sm">
      <CardContent className="p-5">
        <div className="text-sm text-slate-500">{title}</div>
        <div className="text-3xl font-bold mt-2">{value}</div>
        <div className="text-sm text-slate-500 mt-1">{subtitle}</div>
      </CardContent>
    </Card>
  );
}

export default function FundingOptimizerPrototype() {
  const [section, setSection] = useState('dashboard');
  const [selectedOpp, setSelectedOpp] = useState(opportunities[0]);
  const [empresa, setEmpresa] = useState('Gran empresa');
  const [tipoProyecto, setTipoProyecto] = useState('I+D+i');
  const [presupuesto, setPresupuesto] = useState(300000);
  const [sector, setSector] = useState('Industria');
  const [ccaa, setCcaa] = useState('Cataluña');
  const [organo, setOrgano] = useState('Administración del Estado');
  const [eficiencia, setEficiencia] = useState('Sí');

  const numbers = useMemo(() => {
    const p = Number(presupuesto) || 0;
    const intensidadSubv = empresa === 'Gran empresa' && tipoProyecto === 'I+D+i' ? 0.35 : empresa === 'PYME' ? 0.5 : 0.6;
    const subvencion = p * intensidadSubv;
    const prestamo = p * (empresa === 'Gran empresa' ? 0.4 : 0.5);
    const deduccion = tipoProyecto === 'I+D+i' ? p * 0.15 : p * 0.05;
    const caes = eficiencia === 'Sí' ? p * 0.07 : 0;
    const total = subvencion + deduccion + caes;
    const cobertura = p > 0 ? Math.min(100, Math.round((total / p) * 100)) : 0;
    return { subvencion, prestamo, deduccion, caes, total, cobertura };
  }, [empresa, tipoProyecto, presupuesto, eficiencia]);

  const euros = (n) => new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(n || 0);

  const renderDashboard = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Funding Optimizer</h1>
        <p className="text-slate-500 mt-2">Motor interno para estimar subvenciones, préstamos, deducciones fiscales y CAES.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Kpi title="Financiación no reembolsable estimada" value={euros(numbers.total)} subtitle={`${numbers.cobertura}% del presupuesto del proyecto`} />
        <Kpi title="Subvención estimada" value={euros(numbers.subvencion)} subtitle="Escenario medio" />
        <Kpi title="Préstamo público potencial" value={euros(numbers.prestamo)} subtitle="Instrumento complementario" />
        <Kpi title="Deducción fiscal + CAES" value={euros(numbers.deduccion + numbers.caes)} subtitle="Optimización adicional" />
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <Card className="rounded-2xl xl:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle>Distribución del stack de financiación</CardTitle>
          </CardHeader>
          <CardContent className="space-y-5">
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2"><span>Subvenciones</span><span>{euros(numbers.subvencion)}</span></div>
                <Progress value={(numbers.subvencion / Math.max(1, presupuesto)) * 100} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2"><span>Préstamos públicos</span><span>{euros(numbers.prestamo)}</span></div>
                <Progress value={(numbers.prestamo / Math.max(1, presupuesto)) * 100} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2"><span>Deducciones fiscales</span><span>{euros(numbers.deduccion)}</span></div>
                <Progress value={(numbers.deduccion / Math.max(1, presupuesto)) * 100} className="h-3" />
              </div>
              <div>
                <div className="flex justify-between text-sm mb-2"><span>CAES</span><span>{euros(numbers.caes)}</span></div>
                <Progress value={(numbers.caes / Math.max(1, presupuesto)) * 100} className="h-3" />
              </div>
            </div>
            <div className="grid md:grid-cols-4 gap-4">
              <Card className="rounded-2xl bg-emerald-50 border-emerald-100"><CardContent className="p-4"><div className="text-sm text-slate-500">Subvención</div><div className="text-2xl font-bold mt-2">{euros(numbers.subvencion)}</div></CardContent></Card>
              <Card className="rounded-2xl bg-blue-50 border-blue-100"><CardContent className="p-4"><div className="text-sm text-slate-500">Préstamo</div><div className="text-2xl font-bold mt-2">{euros(numbers.prestamo)}</div></CardContent></Card>
              <Card className="rounded-2xl bg-violet-50 border-violet-100"><CardContent className="p-4"><div className="text-sm text-slate-500">Fiscal</div><div className="text-2xl font-bold mt-2">{euros(numbers.deduccion)}</div></CardContent></Card>
              <Card className="rounded-2xl bg-amber-50 border-amber-100"><CardContent className="p-4"><div className="text-sm text-slate-500">CAES</div><div className="text-2xl font-bold mt-2">{euros(numbers.caes)}</div></CardContent></Card>
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Resumen del proyecto</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex justify-between"><span>Empresa</span><span className="font-medium">{empresa}</span></div>
            <div className="flex justify-between"><span>Proyecto</span><span className="font-medium">{tipoProyecto}</span></div>
            <div className="flex justify-between"><span>Presupuesto</span><span className="font-medium">{euros(presupuesto)}</span></div>
            <div className="flex justify-between"><span>Sector</span><span className="font-medium">{sector}</span></div>
            <div className="flex justify-between"><span>Ubicación</span><span className="font-medium">{ccaa}</span></div>
            <div className="flex justify-between"><span>Órgano prioritario</span><span className="font-medium">{organo}</span></div>
            <div className="flex justify-between"><span>Potencial CAES</span><span className="font-medium">{eficiencia}</span></div>
            <Button onClick={() => setSection('calculadora')} className="w-full rounded-xl mt-2">Editar parámetros</Button>
          </CardContent>
        </Card>
      </div>

      <div className="grid xl:grid-cols-3 gap-6">
        <Card className="rounded-2xl xl:col-span-2 shadow-sm">
          <CardHeader>
            <CardTitle>Oportunidades recomendadas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {opportunities.map((opp) => (
              <button
                key={opp.id}
                onClick={() => {
                  setSelectedOpp(opp);
                  setSection('oportunidades');
                }}
                className="w-full rounded-2xl border p-4 text-left hover:bg-slate-50 transition"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <div className="font-semibold">{opp.nombre}</div>
                    <div className="text-sm text-slate-500 mt-1">{opp.organismo} · {opp.tipo}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{opp.fit}</Badge>
                    <ArrowRight className="w-4 h-4 text-slate-400" />
                  </div>
                </div>
              </button>
            ))}
          </CardContent>
        </Card>

        <Card className="rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle>Insights clave</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" /><span>Para gran empresa + I+D+i, la intensidad media de subvención se sitúa en torno al 35% en este modelo.</span></div>
            <div className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" /><span>La combinación subvención + préstamo + deducción fiscal puede mejorar de forma relevante la rentabilidad del proyecto.</span></div>
            <div className="flex gap-3"><CheckCircle2 className="w-5 h-5 text-emerald-600 mt-0.5" /><span>Si el proyecto incorpora medidas de eficiencia energética, conviene valorar monetización vía CAES.</span></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderCalculadora = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Calculadora</h1>
        <p className="text-slate-500 mt-2">Configura el proyecto y obtén una estimación rápida del stack de financiación.</p>
      </div>
      <div className="grid xl:grid-cols-3 gap-6">
        <Card className="rounded-2xl shadow-sm xl:col-span-1">
          <CardHeader><CardTitle>Inputs del proyecto</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo de empresa</label>
              <Select value={empresa} onValueChange={setEmpresa}>
                <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Gran empresa">Gran empresa</SelectItem>
                  <SelectItem value="PYME">PYME</SelectItem>
                  <SelectItem value="Start-up">Start-up</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Tipo de proyecto</label>
              <Select value={tipoProyecto} onValueChange={setTipoProyecto}>
                <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="I+D+i">I+D+i</SelectItem>
                  <SelectItem value="Inversión">Inversión</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Presupuesto</label>
              <Input className="rounded-xl" type="number" value={presupuesto} onChange={(e) => setPresupuesto(Number(e.target.value))} />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Sector</label>
              <Select value={sector} onValueChange={setSector}>
                <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Industria">Industria</SelectItem>
                  <SelectItem value="Energía">Energía</SelectItem>
                  <SelectItem value="Sostenibilidad">Sostenibilidad</SelectItem>
                  <SelectItem value="Digitalización">Digitalización</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Comunidad Autónoma</label>
              <Select value={ccaa} onValueChange={setCcaa}>
                <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Cataluña">Cataluña</SelectItem>
                  <SelectItem value="Madrid">Madrid</SelectItem>
                  <SelectItem value="Andalucía">Andalucía</SelectItem>
                  <SelectItem value="País Vasco">País Vasco</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Órgano convocante prioritario</label>
              <Select value={organo} onValueChange={setOrgano}>
                <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Administración del Estado">Administración del Estado</SelectItem>
                  <SelectItem value="Comunidades Autónomas">Comunidades Autónomas</SelectItem>
                  <SelectItem value="Entidades locales">Entidades locales</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">¿Hay componente de eficiencia energética?</label>
              <Select value={eficiencia} onValueChange={setEficiencia}>
                <SelectTrigger className="rounded-xl"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="Sí">Sí</SelectItem>
                  <SelectItem value="No">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button className="w-full rounded-xl" onClick={() => setSection('dashboard')}>Calcular y volver al dashboard</Button>
          </CardContent>
        </Card>

        <div className="xl:col-span-2 grid gap-6">
          <Card className="rounded-2xl shadow-sm">
            <CardHeader><CardTitle>Resultado estimado</CardTitle></CardHeader>
            <CardContent className="grid md:grid-cols-4 gap-4">
              <Card className="rounded-2xl bg-emerald-50"><CardContent className="p-5"><div className="text-sm text-slate-500">Subvención</div><div className="text-2xl font-bold mt-2">{euros(numbers.subvencion)}</div></CardContent></Card>
              <Card className="rounded-2xl bg-blue-50"><CardContent className="p-5"><div className="text-sm text-slate-500">Préstamo</div><div className="text-2xl font-bold mt-2">{euros(numbers.prestamo)}</div></CardContent></Card>
              <Card className="rounded-2xl bg-violet-50"><CardContent className="p-5"><div className="text-sm text-slate-500">Fiscal</div><div className="text-2xl font-bold mt-2">{euros(numbers.deduccion)}</div></CardContent></Card>
              <Card className="rounded-2xl bg-amber-50"><CardContent className="p-5"><div className="text-sm text-slate-500">CAES</div><div className="text-2xl font-bold mt-2">{euros(numbers.caes)}</div></CardContent></Card>
            </CardContent>
          </Card>
          <Card className="rounded-2xl shadow-sm">
            <CardHeader><CardTitle>Estrategia recomendada</CardTitle></CardHeader>
            <CardContent className="space-y-4 text-sm">
              <div className="flex gap-3"><Landmark className="w-5 h-5 text-blue-600 mt-0.5" /><span>Combinar subvención principal con instrumento de préstamo público para ampliar capacidad financiera.</span></div>
              <div className="flex gap-3"><Percent className="w-5 h-5 text-violet-600 mt-0.5" /><span>Activar revisión fiscal para capturar deducciones de I+D+i cuando el proyecto lo permita.</span></div>
              <div className="flex gap-3"><Zap className="w-5 h-5 text-amber-600 mt-0.5" /><span>Si el proyecto reduce consumo energético, estudiar monetización adicional vía CAES.</span></div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );

  const renderOportunidades = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Oportunidades</h1>
        <p className="text-slate-500 mt-2">Explora ayudas y abre su ficha de detalle para evaluar encaje.</p>
      </div>
      <div className="grid xl:grid-cols-3 gap-6">
        <Card className="rounded-2xl shadow-sm xl:col-span-2">
          <CardHeader><CardTitle>Listado recomendado</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {opportunities.map((opp) => (
              <div key={opp.id} className={`rounded-2xl border p-4 cursor-pointer transition ${selectedOpp.id === opp.id ? 'border-teal-500 bg-teal-50' : 'hover:bg-slate-50'}`} onClick={() => setSelectedOpp(opp)}>
                <div className="flex justify-between gap-4">
                  <div>
                    <div className="font-semibold">{opp.nombre}</div>
                    <div className="text-sm text-slate-500 mt-1">{opp.organismo} · {opp.tipo} · {opp.intensidad}</div>
                  </div>
                  <Badge variant="secondary">{opp.fit}</Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-sm">
          <CardHeader><CardTitle>Detalle de la ayuda</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="text-xl font-semibold">{selectedOpp.nombre}</div>
            <div><span className="text-slate-500">Organismo:</span> <span className="font-medium">{selectedOpp.organismo}</span></div>
            <div><span className="text-slate-500">Tipo:</span> <span className="font-medium">{selectedOpp.tipo}</span></div>
            <div><span className="text-slate-500">Intensidad:</span> <span className="font-medium">{selectedOpp.intensidad}</span></div>
            <div><span className="text-slate-500">Cierre:</span> <span className="font-medium">{selectedOpp.cierre}</span></div>
            <p className="text-slate-600 leading-6">{selectedOpp.detalle}</p>
            <Button className="w-full rounded-xl">Marcar como prioritaria</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const renderProyecto = () => (
    <div className="space-y-6">
      <div>
        <h1 className="text-4xl font-bold tracking-tight">Proyecto</h1>
        <p className="text-slate-500 mt-2">Vista ejecutiva para seguimiento interno del caso.</p>
      </div>
      <div className="grid lg:grid-cols-3 gap-6">
        <Card className="rounded-2xl shadow-sm lg:col-span-2">
          <CardHeader><CardTitle>Resumen ejecutivo</CardTitle></CardHeader>
          <CardContent className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="rounded-2xl border p-4"><div className="text-slate-500">Empresa</div><div className="font-semibold mt-1">{empresa}</div></div>
            <div className="rounded-2xl border p-4"><div className="text-slate-500">Proyecto</div><div className="font-semibold mt-1">{tipoProyecto}</div></div>
            <div className="rounded-2xl border p-4"><div className="text-slate-500">Presupuesto</div><div className="font-semibold mt-1">{euros(presupuesto)}</div></div>
            <div className="rounded-2xl border p-4"><div className="text-slate-500">Cobertura estimada</div><div className="font-semibold mt-1">{numbers.cobertura}%</div></div>
          </CardContent>
        </Card>
        <Card className="rounded-2xl shadow-sm">
          <CardHeader><CardTitle>Próximos pasos</CardTitle></CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex gap-3"><FileText className="w-5 h-5 text-slate-500 mt-0.5" /><span>Validar elegibilidad documental de las 3 ayudas prioritarias.</span></div>
            <div className="flex gap-3"><Lightbulb className="w-5 h-5 text-slate-500 mt-0.5" /><span>Confirmar si el gasto es elegible como I+D o innovación tecnológica.</span></div>
            <div className="flex gap-3"><Factory className="w-5 h-5 text-slate-500 mt-0.5" /><span>Cuantificar ahorros energéticos si se quiere activar palanca CAES.</span></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex">
      <Sidebar section={section} setSection={setSection} />
      <main className="flex-1 p-8">
        {section === 'dashboard' && renderDashboard()}
        {section === 'calculadora' && renderCalculadora()}
        {section === 'oportunidades' && renderOportunidades()}
        {section === 'proyecto' && renderProyecto()}
      </main>
    </div>
  );
}
