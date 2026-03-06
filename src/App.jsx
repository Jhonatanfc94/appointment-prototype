import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Clock4, 
  PlayCircle, 
  Eye, 
  UserCheck, 
  Baby, 
  HeartPulse, 
  Stethoscope 
} from 'lucide-react';

const App = () => {
  // --- CONFIGURACIÓN DE COLORES BRANDING FIVGO ---
  const colors = {
    cyan: '#2cc2d1',
    orange: '#f2711c',
    purple: '#8e7cc3',
    gray: '#94a3b8',
    lightCyan: '#eaf9fa',
    lightOrange: '#fff4ed',
    lightPurple: '#f5f3ff'
  };

  // --- ESTADO Y DATOS SIMULADOS ---
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('TODOS');

  const STATUS_PRIORITY = {
    'EN_ESPERA': 1,
    'PENDIENTE': 2,
    'EN_CONSULTA': 3,
    'FINALIZADO': 4,
    'CANCELADO': 5
  };

  const [appointments, setAppointments] = useState([
    { id: 1, patient: "Laura Méndez", dni: "12345678A", time: "08:30", date: "2026-03-03", status: "FINALIZADO", reason: "Primera Consulta Fertilidad", doctor: "Dr. Gutierrez" },
    { id: 2, patient: "Jimena Soto", dni: "87654321B", time: "09:30", date: "2026-03-03", status: "EN_ESPERA", reason: "Control Estimulación", doctor: "Dra. Ramos" },
    { id: 3, patient: "Patricia Luna", dni: "45678912C", time: "10:00", date: "2026-03-03", status: "PENDIENTE", reason: "Transferencia Embrionaria", doctor: "Dr. Gutierrez" },
    { id: 4, patient: "Carla Espinoza", dni: "23456789D", time: "11:15", date: "2026-03-03", status: "PENDIENTE", reason: "Ecografía Fetal", doctor: "Dra. Ramos" },
    { id: 5, patient: "Sofía Vaca", dni: "34567890E", time: "11:45", date: "2026-03-03", status: "EN_ESPERA", reason: "Consulta Resultados Beta", doctor: "Dr. Gutierrez" },
    { id: 6, patient: "Lucía Ortiz", dni: "56789012F", time: "09:00", date: "2026-03-04", status: "PENDIENTE", reason: "Inseminación Intrauterina", doctor: "Dra. Ramos" },
  ]);

  // --- LÓGICA DE FILTRADO Y ORDENAMIENTO ---
  const filteredAppointments = useMemo(() => {
    return appointments
      .filter(app => {
        const matchesDate = app.date === selectedDate;
        const matchesSearch = app.patient.toLowerCase().includes(searchTerm.toLowerCase()) || 
                             app.dni.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = activeFilter === 'TODOS' || app.status === activeFilter;
        return matchesDate && matchesSearch && matchesStatus;
      })
      .sort((a, b) => {
        if (STATUS_PRIORITY[a.status] !== STATUS_PRIORITY[b.status]) {
          return STATUS_PRIORITY[a.status] - STATUS_PRIORITY[b.status];
        }
        return a.time.localeCompare(b.time);
      });
  }, [appointments, selectedDate, searchTerm, activeFilter]);

  const updateStatus = (id, newStatus) => {
    setAppointments(prev => prev.map(app => 
      app.id === id ? { ...app, status: newStatus } : app
    ));
  };

  // --- ESTILOS DINÁMICOS POR ESTADO ---
  const getStatusStyle = (status) => {
    switch (status) {
      case 'EN_ESPERA': return `bg-[#fff4ed] text-[#f2711c] border-[#f2711c]/30`;
      case 'PENDIENTE': return `bg-[#f5f3ff] text-[#8e7cc3] border-[#8e7cc3]/30`;
      case 'EN_CONSULTA': return `bg-[#eaf9fa] text-[#2cc2d1] border-[#2cc2d1]/30`;
      case 'FINALIZADO': return `bg-slate-100 text-[#94a3b8] border-slate-200`;
      default: return 'bg-gray-50 text-gray-500';
    }
  };

  const isToday = selectedDate === new Date().toISOString().split('T')[0];

  return (
    <div className="min-h-screen bg-[#fcfdfe] p-4 md:p-8 font-sans text-slate-800">
      <div className="max-w-6xl mx-auto">
        
        {/* CABECERA CON BRANDING */}
        <header className="mb-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center p-2">
               <div className="relative">
                 <div className="w-8 h-8 rounded-full border-4 border-[#f2711c] border-t-[#8e7cc3]"></div>
                 <div className="absolute inset-0 flex items-center justify-center">
                    <Baby size={16} className="text-[#2cc2d1]" />
                 </div>
               </div>
            </div>
            <div>
              <h1 className="text-2xl font-black tracking-tight" style={{ color: colors.cyan }}>
                CENTRO VIDA <span style={{ color: colors.orange }}>FIVGO</span>
              </h1>
              <p className="text-slate-400 text-sm font-medium uppercase tracking-widest">Reproducción Asistida</p>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-xs font-bold text-slate-400 uppercase ml-1">Fecha de Agenda</label>
            <div className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow-sm border border-slate-200 focus-within:border-[#2cc2d1] transition-colors">
              <Calendar style={{ color: colors.cyan }} size={18} />
              <input 
                type="date" 
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="border-none focus:ring-0 text-slate-700 font-bold cursor-pointer bg-transparent outline-none"
              />
            </div>
          </div>
        </header>

        {/* TARJETAS DE RESUMEN */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.lightOrange }}>
                    <UserCheck style={{ color: colors.orange }} />
                </div>
                <div>
                    <p className="text-2xl font-bold">{appointments.filter(a => a.status === 'EN_ESPERA' && a.date === selectedDate).length}</p>
                    <p className="text-xs text-slate-500 font-bold uppercase">En Sala de Espera</p>
                </div>
            </div>
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex items-center gap-4 hover:shadow-md transition-shadow">
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: colors.lightPurple }}>
                    <Clock4 style={{ color: colors.purple }} />
                </div>
                <div>
                    <p className="text-2xl font-bold">{appointments.filter(a => a.status === 'PENDIENTE' && a.date === selectedDate).length}</p>
                    <p className="text-xs text-slate-500 font-bold uppercase">Citas Pendientes</p>
                </div>
            </div>
            <div className="bg-gradient-to-br from-[#2cc2d1] to-[#8e7cc3] p-5 rounded-2xl shadow-md text-white flex items-center gap-4 relative overflow-hidden">
                <Baby className="absolute -right-2 -bottom-2 opacity-20 w-24 h-24 rotate-12" />
                <div className="relative z-10">
                    <p className="text-sm font-medium opacity-90 italic">"En el inicio de la vida y después..."</p>
                    <p className="text-xs mt-1 font-bold uppercase tracking-wider">Centro Vida FIVGO SRL</p>
                </div>
            </div>
        </div>

        {/* BUSCADOR Y FILTROS */}
        <div className="flex flex-col lg:flex-row gap-4 mb-6">
          <div className="flex-grow relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input 
              type="text"
              placeholder="Buscar paciente por nombre o DNI..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 focus:border-[#2cc2d1] focus:ring-4 focus:ring-[#2cc2d1]/10 transition-all outline-none bg-white shadow-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide items-center">
            {['TODOS', 'EN_ESPERA', 'PENDIENTE', 'EN_CONSULTA'].map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-3 md:py-2 rounded-xl whitespace-nowrap text-sm font-bold transition-all border ${
                  activeFilter === f 
                  ? `bg-[#2cc2d1] text-white border-[#2cc2d1] shadow-lg shadow-[#2cc2d1]/20` 
                  : 'bg-white text-slate-500 border-slate-200 hover:bg-slate-50'
                }`}
              >
                {f === 'EN_ESPERA' ? 'SALA DE ESPERA' : f.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* TABLA PRINCIPAL DE CITAS */}
        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/40 border border-slate-100 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-100 text-[#2cc2d1]">
                  <th className="px-8 py-5 text-xs font-black uppercase tracking-widest">Horario</th>
                  <th className="px-8 py-5 text-xs font-black uppercase tracking-widest">Paciente</th>
                  <th className="px-8 py-5 text-xs font-black uppercase tracking-widest">Motivo / Doctor</th>
                  <th className="px-8 py-5 text-xs font-black uppercase tracking-widest">Estado</th>
                  <th className="px-8 py-5 text-xs font-black uppercase tracking-widest text-right">Acciones</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filteredAppointments.length > 0 ? (
                  filteredAppointments.map((app) => (
                    <tr 
                      key={app.id} 
                      className={`transition-all hover:bg-slate-50/80 ${
                        app.status === 'EN_ESPERA' ? 'bg-[#fff4ed]/40' : 
                        app.status === 'PENDIENTE' ? 'bg-[#f5f3ff]/40' : 
                        app.status === 'EN_CONSULTA' ? 'bg-[#eaf9fa]/60' : ''
                      }`}
                    >
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-xl transition-all duration-300 ${
                            app.status === 'EN_ESPERA' ? 'bg-[#f2711c] text-white shadow-md shadow-orange-100' : 
                            app.status === 'PENDIENTE' ? 'bg-[#f5f3ff] text-[#8e7cc3]' : 
                            app.status === 'EN_CONSULTA' ? 'bg-[#eaf9fa] text-[#2cc2d1]' :
                            'bg-slate-100 text-[#94a3b8]'
                          }`}>
                            {app.status === 'FINALIZADO' ? <CheckCircle2 size={16} /> : <Clock size={16} />}
                          </div>
                          <span className={`font-black text-lg ${app.status === 'FINALIZADO' ? 'text-slate-300 line-through decoration-2' : 'text-slate-700'}`}>
                            {app.time}
                          </span>
                        </div>
                      </td>
                      
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                          <span className={`font-bold text-base leading-tight ${app.status === 'FINALIZADO' ? 'text-slate-400' : 'text-slate-800'}`}>
                            {app.patient}
                          </span>
                          <span className="text-[10px] text-slate-400 font-bold tracking-wider mt-1">DNI: {app.dni}</span>
                        </div>
                      </td>
                      
                      <td className="px-8 py-6">
                        <div className="flex flex-col">
                           <span className={`text-sm font-semibold flex items-center gap-1.5 ${app.status === 'FINALIZADO' ? 'text-slate-400' : 'text-slate-600'}`}>
                             <HeartPulse size={14} style={{ color: app.status === 'FINALIZADO' ? '#cbd5e1' : (app.status === 'PENDIENTE' ? colors.purple : colors.cyan) }} />
                             {app.reason}
                           </span>
                           <span className="text-xs text-slate-400 mt-1.5 flex items-center gap-1 font-medium">
                             <Stethoscope size={12} /> {app.doctor}
                           </span>
                        </div>
                      </td>
                      
                      <td className="px-8 py-6">
                        <span className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[10px] font-black tracking-widest border uppercase ${getStatusStyle(app.status)}`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${app.status === 'EN_ESPERA' ? 'animate-pulse bg-[#f2711c]' : app.status === 'EN_CONSULTA' ? 'animate-pulse bg-[#2cc2d1]' : 'bg-current'}`}></span>
                          {app.status.replace('_', ' ')}
                        </span>
                      </td>
                      
                      {/* ACCIONES - AHORA SIEMPRE VISIBLES */}
                      <td className="px-8 py-6 text-right">
                        <div className="flex justify-end gap-2">
                          
                          {/* Botón: Pendiente -> En Espera */}
                          {app.status === 'PENDIENTE' && (
                            <button 
                              onClick={() => updateStatus(app.id, 'EN_ESPERA')}
                              className="flex items-center gap-2 px-3 py-2 text-[#f2711c] bg-white hover:bg-[#fff4ed] border border-orange-200 rounded-xl transition-all shadow-sm font-bold text-xs"
                              title="Registrar llegada a sala"
                            >
                              <UserCheck size={16} />
                              LLEGÓ
                            </button>
                          )}
                          
                          {/* Botón: En Espera -> En Consulta */}
                          {app.status === 'EN_ESPERA' && (
                            <button 
                              onClick={() => updateStatus(app.id, 'EN_CONSULTA')}
                              className="flex items-center gap-2 px-3 py-2 text-white bg-[#2cc2d1] hover:bg-[#25a5b2] border border-[#2cc2d1] rounded-xl transition-all shadow-md font-bold text-xs"
                              title="Iniciar consulta"
                            >
                              <PlayCircle size={16} />
                              ATENDER
                            </button>
                          )}
                          
                          {/* Botón: En Consulta -> Finalizado */}
                          {app.status === 'EN_CONSULTA' && (
                            <button 
                              onClick={() => updateStatus(app.id, 'FINALIZADO')}
                              className="flex items-center gap-2 px-3 py-2 text-green-600 bg-white hover:bg-green-50 border border-green-200 rounded-xl transition-all shadow-sm font-bold text-xs"
                              title="Finalizar atención"
                            >
                              <CheckCircle2 size={16} />
                              FINALIZAR
                            </button>
                          )}
                          
                          {/* Botón siempre visible: Ver Ficha */}
                          <button 
                            className="p-2 text-slate-400 bg-white border border-slate-200 hover:text-[#2cc2d1] hover:bg-cyan-50 hover:border-cyan-200 rounded-xl transition-all shadow-sm"
                            title="Ver detalles de la ficha"
                          >
                            <Eye size={18} />
                          </button>
                          
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-8 py-32 text-center">
                      <div className="flex flex-col items-center justify-center gap-3">
                        <Calendar size={48} className="text-slate-200" />
                        <span className="text-slate-400 font-bold uppercase tracking-widest text-sm">No se encontraron citas</span>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* FOOTER */}
        <footer className="mt-8 flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] px-2">
            <span>© Centro Vida FIVGO SRL</span>
            <span className="hidden md:inline italic normal-case text-slate-300">
                Unidad de Reproducción Asistida y Fertilidad
            </span>
        </footer>
      </div>
    </div>
  );
};

export default App;