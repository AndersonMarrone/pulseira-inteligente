import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './UserDashboard.css'

function UserDashboard() {
  const [userData, setUserData] = useState({
    name: "Maria Silva",
    email: "maria@email.com",
    plan: "Premium",
    currentTemp: 38.2,
    heartRate: 78,
    nextMeds: "Losartana 50mg",
    nextMedsTime: "20:00",
    alerts: 1
  })
  
  const [activeNav, setActiveNav] = useState('Dashboard')

  useEffect(() => {
    const interval = setInterval(() => {
      setUserData(prev => {
        const variation = (Math.random() - 0.5) * 0.1
        return {
          ...prev,
          currentTemp: Math.max(36.0, Math.min(39.0, prev.currentTemp + variation)),
          heartRate: Math.floor(70 + Math.random() * 20)
        }
      })
    }, 120000)
    return () => clearInterval(interval)
  }, [])

  const navItems = [
    { icon: 'fa-tachometer-alt', label: 'Dashboard' },
    { icon: 'fa-thermometer-half', label: 'Temperatura' },
    { icon: 'fa-heartbeat', label: 'Saúde' },
    { icon: 'fa-pills', label: 'Medicação' },
    { icon: 'fa-allergies', label: 'Alergias' },
    { icon: 'fa-file-medical', label: 'Exames' },
    { icon: 'fa-users', label: 'Familiares' },
    { icon: 'fa-cog', label: 'Configurações' },
    { icon: 'fa-question-circle', label: 'Ajuda' }
  ]

  const allergies = [
    { name: 'Penicilina', reaction: 'Reação: Anafilaxia • Crítica' },
    { name: 'Iodo', reaction: 'Reação: Dermatite Grave' },
    { name: 'Castanha', reaction: 'Reação: Inchaço Facial' }
  ]

  const medications = [
    { name: 'Metformina 850mg', schedule: '2x ao dia • Próxima: 20:00', taken: true },
    { name: 'Losartana 50mg', schedule: '1x ao dia • Próxima: 20:00', taken: false },
    { name: 'AAS 100mg', schedule: '1x ao dia • Tomada: 08:00', taken: true }
  ]

  const conditions = [
    { name: 'Diabetes Tipo 2', desc: 'Diagnosticado: 2010 • Controlado', icon: 'fa-heartbeat' },
    { name: 'Hipertensão', desc: 'Controlada com medicação', icon: 'fa-heartbeat' },
    { name: 'Artrite Reumatoide', desc: 'Em remissão', icon: 'fa-bone' }
  ]

  return (
    <div className="user-dashboard">
      {/* Navbar */}
      <nav className="dash-navbar">
        <Link to="/" className="dash-logo">
          <i className="fas fa-heartbeat"></i>
          Vida<span>ID</span>
        </Link>
        
        <div className="user-menu">
          <div className="user-avatar">MS</div>
          <div>
            <div className="user-name">{userData.name}</div>
            <div className="user-plan">Conta {userData.plan}</div>
          </div>
        </div>
      </nav>
      
      {/* Main Container */}
      <div className="dash-container">
        {/* Sidebar */}
        <aside className="dash-sidebar">
          <ul className="nav-menu">
            {navItems.map(item => (
              <li 
                key={item.label}
                className={`nav-item ${activeNav === item.label ? 'active' : ''}`}
                onClick={() => setActiveNav(item.label)}
              >
                <i className={`fas ${item.icon}`}></i>
                <span>{item.label}</span>
              </li>
            ))}
          </ul>
        </aside>
        
        {/* Main Content */}
        <main className="dash-main">
          {/* Page Header */}
          <div className="page-header fade-in">
            <h1>Meu Painel de Saúde</h1>
            <p>Monitoramento em tempo real dos seus dados de saúde</p>
          </div>
          
          {/* Status Cards */}
          <div className="status-cards fade-in">
            <div className="status-card temp">
              <div className="card-header">
                <div className="card-title">TEMPERATURA ATUAL</div>
                <div className="card-icon temp-icon">
                  <i className="fas fa-thermometer-full"></i>
                </div>
              </div>
              <div className="card-value">{userData.currentTemp.toFixed(1)}°C</div>
              <div className="card-trend trend-up">
                <i className="fas fa-arrow-up"></i>
                <span>+0.5°C desde ontem</span>
              </div>
            </div>
            
            <div className="status-card heart">
              <div className="card-header">
                <div className="card-title">FREQUÊNCIA CARDÍACA</div>
                <div className="card-icon heart-icon">
                  <i className="fas fa-heartbeat"></i>
                </div>
              </div>
              <div className="card-value">{userData.heartRate} BPM</div>
              <div className="card-trend trend-down">
                <i className="fas fa-arrow-down"></i>
                <span>Normal</span>
              </div>
            </div>
            
            <div className="status-card meds">
              <div className="card-header">
                <div className="card-title">PRÓXIMA MEDICAÇÃO</div>
                <div className="card-icon meds-icon">
                  <i className="fas fa-pills"></i>
                </div>
              </div>
              <div className="card-value">2 horas</div>
              <div className="card-trend">
                <i className="fas fa-clock"></i>
                <span>{userData.nextMeds}</span>
              </div>
            </div>
            
            <div className="status-card alerts">
              <div className="card-header">
                <div className="card-title">ALERTAS ATIVOS</div>
                <div className="card-icon alerts-icon">
                  <i className="fas fa-exclamation-triangle"></i>
                </div>
              </div>
              <div className="card-value">{userData.alerts}</div>
              <div className="card-trend">
                <i className="fas fa-info-circle"></i>
                <span>Febre detectada</span>
              </div>
            </div>
          </div>
          
          {/* Charts Container */}
          <div className="charts-container fade-in">
            <div className="chart-card">
              <div className="chart-header">
                <h3>Histórico de Temperatura (24h)</h3>
              </div>
              <div className="chart-placeholder">
                <i className="fas fa-chart-line"></i>
                Gráfico de temperatura será exibido aqui
              </div>
            </div>
            
            <div className="chart-card">
              <div className="chart-header">
                <h3>Status de Saúde</h3>
              </div>
              <div className="chart-placeholder">
                <i className="fas fa-heart"></i>
                Indicadores de saúde
              </div>
            </div>
          </div>
          
          {/* Lists Container */}
          <div className="lists-container fade-in">
            {/* Allergies */}
            <div className="list-card">
              <div className="list-header">
                <h3>Alergias Graves</h3>
                <button className="add-btn">
                  <i className="fas fa-plus"></i>
                </button>
              </div>
              <ul className="list-items">
                {allergies.map(allergy => (
                  <li key={allergy.name} className="list-item">
                    <div className="item-icon allergy">
                      <i className="fas fa-allergies"></i>
                    </div>
                    <div className="item-content">
                      <div className="item-title">{allergy.name}</div>
                      <div className="item-desc">{allergy.reaction}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Medications */}
            <div className="list-card">
              <div className="list-header">
                <h3>Medicação Atual</h3>
                <button className="add-btn">
                  <i className="fas fa-plus"></i>
                </button>
              </div>
              <ul className="list-items">
                {medications.map(med => (
                  <li key={med.name} className="list-item">
                    <div className="item-icon medication">
                      <i className="fas fa-pills"></i>
                    </div>
                    <div className="item-content">
                      <div className="item-title">{med.name}</div>
                      <div className="item-desc">{med.schedule}</div>
                    </div>
                    {med.taken && (
                      <div className="item-check">
                        <i className="fas fa-check-circle"></i>
                      </div>
                    )}
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Conditions */}
            <div className="list-card">
              <div className="list-header">
                <h3>Condições Médicas</h3>
                <button className="add-btn">
                  <i className="fas fa-plus"></i>
                </button>
              </div>
              <ul className="list-items">
                {conditions.map(condition => (
                  <li key={condition.name} className="list-item">
                    <div className="item-icon condition">
                      <i className={`fas ${condition.icon}`}></i>
                    </div>
                    <div className="item-content">
                      <div className="item-title">{condition.name}</div>
                      <div className="item-desc">{condition.desc}</div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          {/* QR Code Section */}
          <div className="qr-section fade-in">
            <div className="qr-card">
              <h3>Seu QR Code de Emergência</h3>
              <p>
                Este QR Code contém todas as suas informações médicas críticas.
                Em caso de emergência, paramédicos podem escanear para acessar seus dados.
              </p>
              
              <div className="qr-code">
                <div className="qr-placeholder">
                  <i className="fas fa-qrcode"></i>
                  <div>VID123456</div>
                </div>
              </div>
              
              <div className="qr-actions">
                <button className="download-btn">
                  <i className="fas fa-print"></i>
                  Imprimir QR Code
                </button>
                <button className="download-btn secondary">
                  <i className="fas fa-share-alt"></i>
                  Compartilhar
                </button>
              </div>
              
              <div className="qr-info">
                <i className="fas fa-info-circle"></i>
                Atualizado automaticamente quando seus dados mudam
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default UserDashboard

