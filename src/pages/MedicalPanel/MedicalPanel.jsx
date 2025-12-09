import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './MedicalPanel.css'

function MedicalPanel() {
  const [patients, setPatients] = useState({
    1: {
      id: "VID123456",
      name: "Maria da Silva Santos",
      initials: "MS",
      age: 68,
      conditions: ["Diabetes Tipo 2", "Hipertensão", "Artrite Reumatoide"],
      allergies: ["Penicilina", "Iodo", "Castanha"],
      currentTemp: 38.2,
      bloodPressure: "120/80",
      glucose: 180,
      details: "68 anos • Diabetes, Hipertensão"
    },
    2: {
      id: "VID234567",
      name: "José Rodrigues",
      initials: "JR",
      age: 72,
      conditions: ["Cardiopatia", "Hipertensão"],
      allergies: [],
      currentTemp: 36.8,
      bloodPressure: "130/85",
      glucose: 110,
      details: "72 anos • Cardíaco"
    },
    3: {
      id: "VID345678",
      name: "Ana Souza",
      initials: "AS",
      age: 45,
      conditions: ["Asma Grave"],
      allergies: ["Poeira", "Ácaros"],
      currentTemp: 37.9,
      bloodPressure: "115/75",
      glucose: 95,
      details: "45 anos • Asma Grave"
    }
  })
  
  const [activePatient, setActivePatient] = useState(1)
  const [activeTab, setActiveTab] = useState('overview')
  const [searchTerm, setSearchTerm] = useState('')
  const [activeFilter, setActiveFilter] = useState('Todos')

  const tabs = ['overview', 'history', 'medication', 'exams', 'notes']
  const tabLabels = {
    overview: 'Visão Geral',
    history: 'Histórico',
    medication: 'Medicação',
    exams: 'Exames',
    notes: 'Anotações'
  }

  const filters = ['Todos', 'Com Febre', 'Críticos', 'Hoje']

  const patient = patients[activePatient]

  const filteredPatients = Object.entries(patients).filter(([id, p]) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         p.details.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const historyData = [
    { time: '15/03 14:30', temp: 38.2, status: 'Febre Alta', statusClass: 'fever', note: 'Paciente relata mal-estar' },
    { time: '15/03 14:00', temp: 37.8, status: 'Febre Moderada', statusClass: 'moderate', note: '-' },
    { time: '15/03 12:00', temp: 36.8, status: 'Normal', statusClass: 'normal', note: '-' },
    { time: '14/03 20:00', temp: 36.5, status: 'Normal', statusClass: 'normal', note: 'Paciente bem' }
  ]

  const medicationData = [
    { name: 'Metformina', dosage: '850mg', frequency: '2x ao dia', next: 'Hoje 20:00', active: true },
    { name: 'Losartana', dosage: '50mg', frequency: '1x ao dia', next: 'Hoje 20:00', active: true },
    { name: 'Ácido Acetilsalicílico', dosage: '100mg', frequency: '1x ao dia', next: 'Amanhã 08:00', active: true }
  ]

  const examsData = [
    { date: '10/03/2024', name: 'Glicemia em Jejum', result: '180 mg/dL', status: 'Alterado', statusClass: 'warning' },
    { date: '05/03/2024', name: 'Hemograma Completo', result: 'Normal', status: 'Normal', statusClass: 'normal' },
    { date: '01/03/2024', name: 'Pressão Arterial 24h', result: '120/80 mmHg', status: 'Normal', statusClass: 'normal' }
  ]

  const notes = [
    { doctor: 'Dr. Carlos Alberto', date: '10/03/2024 14:30', text: 'Paciente apresenta febre de origem indeterminada. Solicitar hemograma e PCR. Manter Metformina e Losartana. Observar evolução da temperatura.' },
    { doctor: 'Dr. Carlos Alberto', date: '05/03/2024 10:15', text: 'Paciente estável. Glicemia controlada. Manter medicação atual. Retorno em 30 dias ou se apresentar sintomas.' }
  ]

  return (
    <div className="medical-panel">
      {/* Header */}
      <header className="medical-header">
        <div className="header-top">
          <Link to="/" className="medical-logo">
            <i className="fas fa-stethoscope"></i>
            <h1>Vida<span>ID</span> <small>| Painel Médico</small></h1>
          </Link>
          
          <div className="doctor-info">
            <div className="doctor-badge">
              <i className="fas fa-user-md"></i> Dr. Carlos Alberto
            </div>
            <div className="doctor-crm">CRM: 123456/SP</div>
          </div>
        </div>
        
        {/* Filters */}
        <div className="filters-bar">
          <div className="search-box">
            <input 
              type="text" 
              className="search-input" 
              placeholder="Buscar paciente por nome, ID ou condição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <i className="fas fa-search search-icon"></i>
          </div>
          
          {filters.map(filter => (
            <button 
              key={filter}
              className={`filter-btn ${activeFilter === filter ? 'active' : ''}`}
              onClick={() => setActiveFilter(filter)}
            >
              <i className={`fas ${
                filter === 'Todos' ? 'fa-filter' :
                filter === 'Com Febre' ? 'fa-thermometer-full' :
                filter === 'Críticos' ? 'fa-exclamation-triangle' :
                'fa-clock'
              }`}></i>
              {filter}
            </button>
          ))}
        </div>
      </header>
      
      {/* Dashboard */}
      <div className="medical-dashboard">
        {/* Patients Panel */}
        <aside className="patients-panel">
          <div className="panel-header">
            <h2>Meus Pacientes <span className="patient-count">({Object.keys(patients).length})</span></h2>
          </div>
          
          <ul className="patients-list">
            {filteredPatients.map(([id, p]) => (
              <li 
                key={id}
                className={`patient-item ${activePatient === parseInt(id) ? 'active' : ''}`}
                onClick={() => setActivePatient(parseInt(id))}
              >
                <div className="patient-avatar">{p.initials}</div>
                <div className="patient-info">
                  <div className="patient-name">{p.name.split(' ').slice(0, 2).join(' ')}</div>
                  <div className="patient-details">{p.details}</div>
                </div>
                <div className={`patient-temp ${p.currentTemp >= 37.8 ? 'temp-fever' : 'temp-normal'}`}>
                  {p.currentTemp}°C
                </div>
              </li>
            ))}
          </ul>
        </aside>
        
        {/* Patient Detail */}
        <main className="patient-detail">
          {/* Header */}
          <div className="detail-header">
            <div className="detail-title">
              <h2>{patient.name}</h2>
              <div className="patient-id">{patient.id}</div>
            </div>
            
            <div className="detail-actions">
              <button className="action-btn">
                <i className="fas fa-print"></i> Imprimir
              </button>
              <button className="action-btn">
                <i className="fas fa-share-alt"></i> Compartilhar
              </button>
              <button className="action-btn">
                <i className="fas fa-history"></i> Histórico
              </button>
              <button className="action-btn primary" onClick={() => setActiveTab('notes')}>
                <i className="fas fa-plus"></i> Nova Anotação
              </button>
            </div>
          </div>
          
          {/* Health Cards */}
          <div className="health-cards">
            <div className="health-card critical">
              <div className="card-label">TEMPERATURA ATUAL</div>
              <div className="card-value">{patient.currentTemp}°C</div>
              <div className="card-trend">
                <i className={`fas fa-arrow-${patient.currentTemp >= 37.8 ? 'up' : 'check'}`} 
                   style={{ color: patient.currentTemp >= 37.8 ? 'var(--medical-red)' : 'var(--medical-green)' }}></i>
                <span style={{ color: patient.currentTemp >= 37.8 ? 'var(--medical-red)' : 'var(--medical-green)' }}>
                  {patient.currentTemp >= 37.8 ? 'Febre alta' : 'Normal'}
                </span>
              </div>
            </div>
            
            <div className="health-card normal">
              <div className="card-label">PRESSÃO ARTERIAL</div>
              <div className="card-value">{patient.bloodPressure}</div>
              <div className="card-trend">
                <i className="fas fa-check" style={{ color: 'var(--medical-green)' }}></i>
                <span style={{ color: 'var(--medical-green)' }}>Normal</span>
              </div>
            </div>
            
            <div className="health-card warning">
              <div className="card-label">GLICEMIA</div>
              <div className="card-value">{patient.glucose} mg/dL</div>
              <div className="card-trend">
                <i className="fas fa-exclamation-triangle" style={{ color: 'var(--medical-yellow)' }}></i>
                <span style={{ color: 'var(--medical-yellow)' }}>Elevada</span>
              </div>
            </div>
            
            <div className="health-card info">
              <div className="card-label">ÚLTIMA CONSULTA</div>
              <div className="card-value">10/03</div>
              <div className="card-trend">
                <i className="fas fa-calendar"></i>
                <span>Há 5 dias</span>
              </div>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="tabs">
            {tabs.map(tab => (
              <div 
                key={tab}
                className={`tab ${activeTab === tab ? 'active' : ''}`}
                onClick={() => setActiveTab(tab)}
              >
                {tabLabels[tab]}
              </div>
            ))}
          </div>
          
          {/* Tab Content */}
          <div className="tab-content-wrapper">
            {/* Overview Tab */}
            {activeTab === 'overview' && (
              <div className="tab-content active">
                <div className="overview-grid">
                  <div className="overview-main">
                    <h3>Informações do Paciente</h3>
                    <table className="data-table">
                      <tbody>
                        <tr>
                          <td className="label-cell">Data de Nascimento</td>
                          <td>15/03/1955 ({patient.age} anos)</td>
                        </tr>
                        <tr>
                          <td className="label-cell">Tipo Sanguíneo</td>
                          <td><strong className="blood-type">O+</strong></td>
                        </tr>
                        <tr>
                          <td className="label-cell">Contato de Emergência</td>
                          <td>João Silva (Filho) - (11) 98888-7777</td>
                        </tr>
                        <tr>
                          <td className="label-cell">Plano de Saúde</td>
                          <td>Unimed • Nº 987654321</td>
                        </tr>
                        <tr>
                          <td className="label-cell">Médico Responsável</td>
                          <td>Dr. Carlos Alberto (CRM 123456/SP)</td>
                        </tr>
                      </tbody>
                    </table>
                    
                    <h3 className="section-title">Alergias Graves</h3>
                    <div className="allergy-card critical">
                      <div className="allergy-name">
                        <i className="fas fa-exclamation-triangle"></i> PENICILINA
                      </div>
                      <div className="allergy-desc">
                        Reação: Anafilaxia • Crítica • Evitar qualquer medicamento da família das penicilinas
                      </div>
                    </div>
                    
                    <div className="allergy-card warning">
                      <div className="allergy-name warning-text">
                        <i className="fas fa-exclamation-circle"></i> IODO
                      </div>
                      <div className="allergy-desc">
                        Reação: Dermatite Grave • Contraindicado em contrastes
                      </div>
                    </div>
                  </div>
                  
                  <div className="overview-side">
                    <h3>Condições Médicas</h3>
                    <div className="conditions-card">
                      {patient.conditions.map((condition, idx) => (
                        <div key={idx} className="condition-item">
                          <div className={`condition-name ${idx < 2 ? 'critical' : 'info'}`}>
                            {condition}
                          </div>
                          <div className="condition-desc">
                            {idx === 0 ? 'Diagnosticado: 2010 • Controlado com Metformina' :
                             idx === 1 ? 'Controlada com Losartana 50mg/dia' :
                             'Em remissão • Última crise: 2022'}
                          </div>
                        </div>
                      ))}
                    </div>
                    
                    <div className="qr-box">
                      <div className="qr-title">
                        <i className="fas fa-qrcode"></i> QR Code de Emergência
                      </div>
                      <div className="qr-placeholder">
                        <i className="fas fa-qrcode"></i>
                      </div>
                      <div className="qr-id">ID: {patient.id}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* History Tab */}
            {activeTab === 'history' && (
              <div className="tab-content active">
                <h3>Histórico de Temperatura</h3>
                <table className="data-table full">
                  <thead>
                    <tr>
                      <th>Data/Hora</th>
                      <th>Temperatura</th>
                      <th>Status</th>
                      <th>Observações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {historyData.map((item, idx) => (
                      <tr key={idx}>
                        <td>{item.time}</td>
                        <td>
                          <strong className={item.statusClass === 'fever' ? 'temp-critical' : 
                                            item.statusClass === 'moderate' ? 'temp-warning' : ''}>
                            {item.temp}°C
                          </strong>
                        </td>
                        <td>
                          <span className={`status-badge ${item.statusClass}`}>
                            {item.status}
                          </span>
                        </td>
                        <td>{item.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {/* Medication Tab */}
            {activeTab === 'medication' && (
              <div className="tab-content active">
                <div className="tab-header">
                  <h3>Medicação Atual</h3>
                  <button className="btn btn-primary">
                    <i className="fas fa-plus"></i> Prescrever Medicamento
                  </button>
                </div>
                <table className="data-table full">
                  <thead>
                    <tr>
                      <th>Medicamento</th>
                      <th>Dosagem</th>
                      <th>Frequência</th>
                      <th>Próxima Dose</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {medicationData.map((med, idx) => (
                      <tr key={idx}>
                        <td>{med.name}</td>
                        <td>{med.dosage}</td>
                        <td>{med.frequency}</td>
                        <td>{med.next}</td>
                        <td>
                          <span className="status-active">
                            <i className="fas fa-check-circle"></i> Em uso
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {/* Exams Tab */}
            {activeTab === 'exams' && (
              <div className="tab-content active">
                <div className="tab-header">
                  <h3>Exames Recentes</h3>
                  <button className="btn btn-primary">
                    <i className="fas fa-upload"></i> Adicionar Exame
                  </button>
                </div>
                <table className="data-table full">
                  <thead>
                    <tr>
                      <th>Data</th>
                      <th>Exame</th>
                      <th>Resultado</th>
                      <th>Status</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {examsData.map((exam, idx) => (
                      <tr key={idx}>
                        <td>{exam.date}</td>
                        <td>{exam.name}</td>
                        <td>{exam.result}</td>
                        <td>
                          <span className={`status-text ${exam.statusClass}`}>
                            {exam.status}
                          </span>
                        </td>
                        <td>
                          <button className="action-btn-sm">
                            <i className="fas fa-eye"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
            
            {/* Notes Tab */}
            {activeTab === 'notes' && (
              <div className="tab-content active">
                <div className="medical-form">
                  <div className="form-group">
                    <label className="form-label">Nova Anotação</label>
                    <textarea 
                      className="form-control" 
                      rows="4" 
                      placeholder="Digite suas observações sobre o paciente..."
                    ></textarea>
                  </div>
                  <div className="form-actions">
                    <button className="btn btn-secondary">Cancelar</button>
                    <button className="btn btn-primary">Salvar Anotação</button>
                  </div>
                </div>
                
                <h3 className="section-title">Anotações Anteriores</h3>
                {notes.map((note, idx) => (
                  <div key={idx} className="note-card">
                    <div className="note-header">
                      <div className="note-author">{note.doctor}</div>
                      <div className="note-date">{note.date}</div>
                    </div>
                    <div className="note-text">{note.text}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}

export default MedicalPanel

