import { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import './EmergencyPage.css'

function EmergencyPage() {
  const { patientId } = useParams()
  
  const [patientData, setPatientData] = useState({
    id: "VID123456",
    name: "Maria da Silva Santos",
    birthDate: "1955-03-15",
    age: 68,
    bloodType: "O+",
    conditions: [
      { name: "Diabetes Tipo 2", critical: true, since: "2010" },
      { name: "Hipertensão Arterial", critical: true, status: "Controlada" },
      { name: "Artrite Reumatoide", critical: false, status: "Em remissão" }
    ],
    allergies: [
      { name: "Penicilina", reaction: "Anafilaxia", critical: true },
      { name: "Iodo", reaction: "Dermatite Grave", critical: true },
      { name: "Castanha", reaction: "Inchaço Facial", critical: false }
    ],
    medications: [
      { name: "Metformina", dosage: "850mg", frequency: "2x ao dia", last: "12:00" },
      { name: "Losartana", dosage: "50mg", frequency: "1x ao dia", next: "20:00" },
      { name: "Ácido Acetilsalicílico", dosage: "100mg", frequency: "1x ao dia" }
    ],
    contacts: [
      { name: "João Silva (Filho)", phone: "(11) 98888-7777", relation: "Familiar" },
      { name: "Dra. Carla Mendes", phone: "(11) 3333-4444", relation: "Médica" }
    ],
    currentTemp: 38.2,
    tempHistory: [
      { time: "08:00", temp: 36.5 },
      { time: "10:00", temp: 36.8 },
      { time: "12:00", temp: 36.8 },
      { time: "14:00", temp: 37.8 },
      { time: "14:30", temp: 38.2 }
    ],
    lastUpdate: new Date().toISOString()
  })

  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [emergencyTimer, setEmergencyTimer] = useState(0)

  useEffect(() => {
    // Online/Offline detection
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    // Emergency timer
    const timerInterval = setInterval(() => {
      setEmergencyTimer(prev => prev + 1)
    }, 1000)
    
    // Temperature update simulation
    const tempInterval = setInterval(() => {
      setPatientData(prev => ({
        ...prev,
        currentTemp: Math.max(36.0, Math.min(39.5, prev.currentTemp + (Math.random() - 0.5) * 0.2)),
        lastUpdate: new Date().toISOString()
      }))
    }, 300000)
    
    // Save to localStorage for offline access
    localStorage.setItem('vidaid_patient_data', JSON.stringify(patientData))
    
    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      clearInterval(timerInterval)
      clearInterval(tempInterval)
    }
  }, [])

  const getTempStatus = (temp) => {
    if (temp >= 37.8) return { status: "FEBRE ALTA", color: "#dc3545", bg: "rgba(220, 53, 69, 0.2)" }
    if (temp >= 37.3) return { status: "FEBRE MODERADA", color: "#ffc107", bg: "rgba(255, 193, 7, 0.2)" }
    if (temp >= 36.0) return { status: "NORMAL", color: "#28a745", bg: "rgba(40, 167, 69, 0.2)" }
    return { status: "HIPOTERMIA", color: "#17a2b8", bg: "rgba(23, 162, 184, 0.2)" }
  }

  const formatDateTime = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('pt-BR') + ' ' + date.toLocaleTimeString('pt-BR', { 
      hour: '2-digit', 
      minute: '2-digit' 
    })
  }

  const shareLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          const mapsUrl = `https://www.google.com/maps?q=${latitude},${longitude}`
          const message = `📍 EMERGÊNCIA MÉDICA\nLocalização: ${mapsUrl}\nPaciente: ${patientData.name}\nTemperatura: ${patientData.currentTemp.toFixed(1)}°C`
          
          const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`
          window.open(whatsappUrl, '_blank')
          
          navigator.clipboard.writeText(mapsUrl)
          alert('Localização copiada!')
        },
        () => {
          alert('Não foi possível obter a localização. Ative o GPS.')
        }
      )
    }
  }

  const callFamily = () => {
    const contact = patientData.contacts[0]
    if (contact) {
      const confirm = window.confirm(`Ligar para ${contact.name}?\n${contact.phone}`)
      if (confirm) {
        window.location.href = `tel:${contact.phone.replace(/\D/g, '')}`
      }
    }
  }

  const tempStatus = getTempStatus(patientData.currentTemp)
  const timerMinutes = Math.floor(emergencyTimer / 60)

  const timeline = [
    { time: '14:30', event: 'Temperatura medida:', value: '38.2°C', status: 'Febre alta detectada', statusClass: 'critical' },
    { time: '14:00', event: 'Temperatura medida:', value: '37.8°C', status: 'Febre moderada', statusClass: 'warning' },
    { time: '13:30', event: 'Temperatura medida:', value: '37.2°C', status: 'Temperatura normal', statusClass: '' },
    { time: '12:45', event: 'Medicação registrada:', value: 'Metformina 850mg', status: '', statusClass: '' },
    { time: '12:00', event: 'Temperatura medida:', value: '36.8°C', status: 'Temperatura normal', statusClass: '' }
  ]

  return (
    <div className="emergency-page">
      {/* Online Status */}
      <div className={`online-status ${isOnline ? 'online' : 'offline'}`}>
        <i className={`fas ${isOnline ? 'fa-wifi' : 'fa-wifi-slash'}`}></i>
        <span>{isOnline ? 'Online' : 'Offline'}</span>
      </div>
      
      {/* Offline Alert */}
      {!isOnline && (
        <div className="offline-alert">
          <i className="fas fa-wifi-slash"></i> MODO OFFLINE - Dados podem não estar atualizados
        </div>
      )}
      
      <div className="emergency-container">
        {/* Emergency Header */}
        <div className="emergency-header fade-in">
          <h1>
            <i className="fas fa-crosshairs"></i>
            EMERGÊNCIA MÉDICA
            <i className="fas fa-heartbeat"></i>
          </h1>
          <div className="alert-badge">
            <i className="fas fa-exclamation-triangle"></i> 
            {timerMinutes > 0 ? `EMERGÊNCIA • ${timerMinutes} min` : 'DADOS CRÍTICOS DO PACIENTE'}
          </div>
          <p>
            <i className="fas fa-bracelet"></i> Pulseira VidaID • 
            Atualizado: {formatDateTime(patientData.lastUpdate)}
          </p>
        </div>
        
        {/* Temperature Card */}
        <div className="temp-card fade-in">
          <div className="temp-header">
            <div>
              <h2>
                <i className="fas fa-thermometer-half"></i> TEMPERATURA CORPORAL
              </h2>
              <div className="temp-value">{patientData.currentTemp.toFixed(1)}°C</div>
            </div>
            <div className="temp-status" style={{ background: tempStatus.bg }}>
              {tempStatus.status}
            </div>
          </div>
          <div className="temp-details">
            <div className="temp-info-grid">
              <div>
                <div className="info-label">ÚLTIMA MEDIÇÃO</div>
                <div className="info-value">14:30 (há 15 minutos)</div>
              </div>
              <div>
                <div className="info-label">PRÓXIMA MEDIÇÃO</div>
                <div className="info-value">14:45 (em 15 minutos)</div>
              </div>
            </div>
            
            <div className="temp-trend trend-up">
              <i className="fas fa-chart-line"></i>
              <span>Tendência: Subindo (+0.5°C/hora)</span>
            </div>
            
            <div className="temp-history">
              <div className="history-header">
                <div className="info-label">HISTÓRICO DAS ÚLTIMAS 6H</div>
                <div className="history-info">
                  <i className="fas fa-info-circle"></i> Atualiza a cada 30 min
                </div>
              </div>
              <div className="temp-chart">
                {patientData.tempHistory.map((point, idx) => (
                  <div key={idx} className="chart-point-container">
                    <div 
                      className="chart-bar"
                      style={{ 
                        height: `${((point.temp - 35) / 5) * 100}%`,
                        background: getTempStatus(point.temp).color
                      }}
                    ></div>
                    <div className="chart-label">{point.time}</div>
                    <div className="chart-value">{point.temp}°C</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        
        {/* Info Grid */}
        <div className="info-grid">
          {/* Identification */}
          <div className="info-card fade-in">
            <h3><i className="fas fa-user-md"></i> IDENTIFICAÇÃO</h3>
            <div className="info-item">
              <div className="info-label">NOME COMPLETO</div>
              <div className="info-value">{patientData.name}</div>
            </div>
            <div className="info-item">
              <div className="info-label">DATA DE NASCIMENTO</div>
              <div className="info-value">15/03/1955 ({patientData.age} anos)</div>
            </div>
            <div className="info-item">
              <div className="info-label">IDENTIFICAÇÃO</div>
              <div className="info-value">{patientData.id}</div>
            </div>
            <div className="info-item">
              <div className="info-label">TIPO SANGUÍNEO</div>
              <div className="info-value blood-type">{patientData.bloodType}</div>
            </div>
          </div>
          
          {/* Conditions */}
          <div className="info-card fade-in">
            <h3><i className="fas fa-heartbeat"></i> CONDIÇÕES MÉDICAS</h3>
            {patientData.conditions.map((condition, idx) => (
              <div key={idx} className="info-item">
                <div className="info-value">
                  <span className={condition.critical ? 'text-critical' : ''}>
                    • {condition.name}
                  </span>
                  <br />
                  <small className="text-muted">
                    {condition.since ? `Diagnosticado: ${condition.since}` : condition.status}
                  </small>
                </div>
              </div>
            ))}
          </div>
          
          {/* Allergies */}
          <div className="info-card critical fade-in">
            <h3><i className="fas fa-allergies"></i> ALERGIAS GRAVES</h3>
            {patientData.allergies.map((allergy, idx) => (
              <div key={idx} className="info-item">
                <div className="info-value">
                  <span className={allergy.critical ? 'allergy-critical' : 'allergy-warning'}>
                    {allergy.critical ? '⚠️' : '•'} {allergy.name}
                  </span>
                  <br />
                  <small>Reação: {allergy.reaction}</small>
                </div>
              </div>
            ))}
          </div>
          
          {/* Medications */}
          <div className="info-card fade-in">
            <h3><i className="fas fa-pills"></i> MEDICAÇÃO ATUAL</h3>
            {patientData.medications.map((med, idx) => (
              <div key={idx} className="info-item">
                <div className="info-value">
                  <strong>{med.name}</strong> {med.dosage}
                  <br />
                  <small className="text-muted">
                    {med.frequency} • {med.last ? `Última dose: ${med.last}` : `Próxima dose: ${med.next}`}
                  </small>
                </div>
              </div>
            ))}
          </div>
          
          {/* Contacts */}
          <div className="info-card fade-in">
            <h3><i className="fas fa-phone-alt"></i> CONTATOS DE EMERGÊNCIA</h3>
            <div className="info-item">
              <div className="info-label">PRINCIPAL</div>
              <div className="info-value">
                <i className="fas fa-user"></i> {patientData.contacts[0].name}
                <br />
                <a href={`tel:${patientData.contacts[0].phone.replace(/\D/g, '')}`} className="phone-link">
                  <i className="fas fa-phone"></i> {patientData.contacts[0].phone}
                </a>
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">MÉDICO</div>
              <div className="info-value">
                <i className="fas fa-user-md"></i> {patientData.contacts[1].name}
                <br />
                <a href={`tel:${patientData.contacts[1].phone.replace(/\D/g, '')}`} className="phone-link">
                  <i className="fas fa-phone"></i> {patientData.contacts[1].phone}
                </a>
              </div>
            </div>
            <div className="info-item">
              <div className="info-label">HOSPITAL PREFERENCIAL</div>
              <div className="info-value">
                <i className="fas fa-hospital"></i> Hospital Albert Einstein
                <br />
                <small>Tel: (11) 2151-1233</small>
              </div>
            </div>
          </div>
          
          {/* Additional Info */}
          <div className="info-card fade-in">
            <h3><i className="fas fa-info-circle"></i> INFORMAÇÕES ADICIONAIS</h3>
            <div className="info-item">
              <div className="info-label">MÉDICO RESPONSÁVEL</div>
              <div className="info-value">Dr. Carlos Alberto - CRM 123456/SP</div>
            </div>
            <div className="info-item">
              <div className="info-label">PLANO DE SAÚDE</div>
              <div className="info-value">Unimed • Nº 987654321</div>
            </div>
            <div className="info-item">
              <div className="info-label">ÚLTIMA CONSULTA</div>
              <div className="info-value">10/03/2024</div>
            </div>
            <div className="info-item">
              <div className="info-label">PRÓXIMA CONSULTA</div>
              <div className="info-value">15/04/2024</div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="action-buttons fade-in">
          <a href="tel:192" className="btn btn-call">
            <i className="fas fa-ambulance"></i>
            <span>CHAMAR SAMU (192)</span>
          </a>
          
          <button className="btn btn-location" onClick={shareLocation}>
            <i className="fas fa-map-marker-alt"></i>
            <span>COMPARTILHAR LOCALIZAÇÃO</span>
          </button>
          
          <a 
            href="https://www.google.com/maps/search/hospital+de+emergência/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-hospital"
          >
            <i className="fas fa-hospital"></i>
            <span>HOSPITAL MAIS PRÓXIMO</span>
          </a>
          
          <button className="btn btn-family" onClick={callFamily}>
            <i className="fas fa-users"></i>
            <span>CHAMAR FAMILIAR</span>
          </button>
        </div>
        
        {/* Timeline */}
        <div className="timeline fade-in">
          <h3>
            <i className="fas fa-history"></i> HISTÓRICO RECENTE
          </h3>
          {timeline.map((item, idx) => (
            <div key={idx} className="timeline-item">
              <div className="timeline-time">{item.time}</div>
              <div className="timeline-event">
                <strong>{item.event}</strong> {item.value}
                {item.status && (
                  <>
                    <br />
                    <small className={item.statusClass}>{item.status}</small>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
        
        {/* Footer */}
        <div className="emergency-footer fade-in">
          <p>
            <i className="fas fa-shield-alt"></i> 
            <strong>SISTEMA VIDAID</strong> • Dados protegidos por LGPD
          </p>
          <p className="disclaimer">
            Este sistema é apenas para uso em emergências médicas.<br />
            Uso não autorizado é crime. Mantenha a confidencialidade dos dados.
          </p>
          <p className="contact-info">
            <i className="fas fa-phone"></i> Atendimento: 0800-VIDAID • 
            <i className="fas fa-globe"></i> www.vidaid.com.br • 
            <i className="fas fa-envelope"></i> contato@vidaid.com.br
          </p>
        </div>
      </div>
    </div>
  )
}

export default EmergencyPage

