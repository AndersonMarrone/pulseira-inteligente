import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Navbar from '../../components/Navbar/Navbar'
import './LandingPage.css'

function LandingPage() {
  const [temperature, setTemperature] = useState(38.2)

  useEffect(() => {
    const interval = setInterval(() => {
      setTemperature(prev => {
        const variation = (Math.random() - 0.5) * 0.3
        let newTemp = prev + variation
        return Math.max(36.0, Math.min(39.0, newTemp))
      })
    }, 10000)
    return () => clearInterval(interval)
  }, [])

  const getTempColor = (temp) => {
    if (temp >= 37.8) return 'var(--primary)'
    if (temp >= 37.3) return 'var(--accent)'
    return 'var(--success)'
  }

  return (
    <div className="landing-page">
      <Navbar />
      
      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-content">
          <div className="hero-text animate">
            <h1>Sua Saúde em Primeiro Lugar, <span>Sempre à Mão</span></h1>
            <p>A primeira pulseira médica inteligente com monitoramento de temperatura em tempo real. Em emergências, salva vidas. No dia a dia, dá tranquilidade.</p>
            
            <div className="hero-buttons">
              <a href="#pricing" className="btn btn-primary">
                <i className="fas fa-shopping-cart"></i>
                Comprar Agora
              </a>
              <a href="#features" className="btn btn-secondary">
                <i className="fas fa-play-circle"></i>
                Ver Demonstração
              </a>
            </div>
            
            <div className="hero-stats">
              <div>
                <div className="stat-value">50.000+</div>
                <div className="stat-label">Vidas Salvas</div>
              </div>
              <div>
                <div className="stat-value">1M+</div>
                <div className="stat-label">Usuários</div>
              </div>
              <div>
                <div className="stat-value">24/7</div>
                <div className="stat-label">Monitoramento</div>
              </div>
            </div>
          </div>
          
          <div className="hero-visual animate">
            <div className="pulseira-hero">
              <div className="pulseira-content">
                <div className="pulseira-title">
                  <i className="fas fa-bracelet"></i> VidaID PRO
                </div>
                <div className="temp-display" style={{ color: getTempColor(temperature) }}>
                  {temperature.toFixed(1)}°C
                </div>
                <div className="fever-alert">
                  <i className="fas fa-exclamation-triangle"></i> FEBRE DETECTADA
                </div>
                <div className="pulseira-info">
                  QR Code de Emergência • À prova d'água • Bateria 2 anos
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section id="features" className="features">
        <div className="section-title animate">
          <h2>Tecnologia que Salva Vidas</h2>
          <p>Mais que uma pulseira, um sistema completo de monitoramento de saúde</p>
        </div>
        
        <div className="features-grid">
          <div className="feature-card animate">
            <div className="feature-icon">
              <i className="fas fa-thermometer-half"></i>
            </div>
            <h3>Temperatura em Tempo Real</h3>
            <p>Medição contínua a cada 30 minutos. Alertas instantâneos para febre ou hipotermia.</p>
          </div>
          
          <div className="feature-card animate">
            <div className="feature-icon">
              <i className="fas fa-qrcode"></i>
            </div>
            <h3>QR Code de Emergência</h3>
            <p>Qualquer smartphone escaneia e acessa seus dados médicos críticos em segundos.</p>
          </div>
          
          <div className="feature-card animate">
            <div className="feature-icon">
              <i className="fas fa-shield-alt"></i>
            </div>
            <h3>Privacidade Garantida</h3>
            <p>Dados criptografados. Você controla quem acessa suas informações. 100% LGPD.</p>
          </div>
          
          <div className="feature-card animate">
            <div className="feature-icon">
              <i className="fas fa-bell"></i>
            </div>
            <h3>Alertas Inteligentes</h3>
            <p>Notifica familiares e serviços de emergência automaticamente em situações críticas.</p>
          </div>
          
          <div className="feature-card animate">
            <div className="feature-icon">
              <i className="fas fa-mobile-alt"></i>
            </div>
            <h3>App Completo</h3>
            <p>Dashboard com histórico de saúde, lembretes de medicação e telemedicina integrada.</p>
          </div>
          
          <div className="feature-card animate">
            <div className="feature-icon">
              <i className="fas fa-heartbeat"></i>
            </div>
            <h3>Para Toda a Família</h3>
            <p>Crianças, adultos, idosos, atletas. Perfis personalizados para cada necessidade.</p>
          </div>
        </div>
      </section>
      
      {/* How It Works */}
      <section id="how-it-works" className="how-it-works">
        <div className="section-title animate">
          <h2>Como Funciona</h2>
          <p>Simples, rápido e eficiente em 3 passos</p>
        </div>
        
        <div className="steps">
          <div className="step animate">
            <div className="step-number">1</div>
            <div className="step-content">
              <h3>Use a Pulseira</h3>
              <p>Coloque a pulseira VidaID no pulso. Ela começa automaticamente a medir sua temperatura e monitorar sua saúde.</p>
            </div>
          </div>
          
          <div className="step animate">
            <div className="step-number">2</div>
            <div className="step-content">
              <h3>Configure pelo App</h3>
              <p>Baixe o app, cadastre suas informações médicas, alergias, medicações e contatos de emergência.</p>
            </div>
          </div>
          
          <div className="step animate">
            <div className="step-number">3</div>
            <div className="step-content">
              <h3>Viva com Tranquilidade</h3>
              <p>Em caso de emergência, qualquer pessoa escaneia o QR Code e acessa suas informações vitais em segundos.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Pricing */}
      <section id="pricing" className="pricing">
        <div className="section-title animate">
          <h2>Escolha seu Plano</h2>
          <p>Saúde acessível para todos</p>
        </div>
        
        <div className="pricing-cards">
          <div className="pricing-card animate">
            <h3>Básico</h3>
            <div className="price">Grátis</div>
            <ul className="pricing-features">
              <li>Pulseira com QR Code</li>
              <li>Dados emergenciais básicos</li>
              <li>Funciona offline</li>
              <li>Sem mensalidade</li>
              <li>Suporte por email</li>
            </ul>
            <Link to="/dashboard" className="btn btn-secondary full-width">
              Começar Grátis
            </Link>
          </div>
          
          <div className="pricing-card popular animate">
            <div className="popular-badge">MAIS POPULAR</div>
            <h3>Premium</h3>
            <div className="price">R$19,90<span>/mês</span></div>
            <ul className="pricing-features">
              <li>Tudo do Básico +</li>
              <li>Monitoramento de temperatura</li>
              <li>App com dashboard completo</li>
              <li>Alertas para familiares</li>
              <li>Telemedicina inclusa</li>
              <li>Suporte 24/7</li>
            </ul>
            <Link to="/dashboard" className="btn btn-primary full-width inverted">
              <i className="fas fa-crown"></i>
              Assinar Agora
            </Link>
          </div>
          
          <div className="pricing-card animate">
            <h3>Família</h3>
            <div className="price">R$49,90<span>/mês</span></div>
            <ul className="pricing-features">
              <li>Até 5 pulseiras</li>
              <li>Tudo do Premium</li>
              <li>Dashboard familiar</li>
              <li>Monitoramento coletivo</li>
              <li>Desconto em hospitais</li>
              <li>Prioridade no suporte</li>
            </ul>
            <Link to="/dashboard" className="btn btn-secondary full-width">
              Proteger Família
            </Link>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="testimonials">
        <div className="section-title animate">
          <h2>Histórias Reais</h2>
          <p>O que nossos usuários dizem</p>
        </div>
        
        <div className="testimonial-slider animate">
          <div className="testimonial">
            <div className="testimonial-text">
              "Minha mãe tem Alzheimer e se perdeu na rua. Graças à pulseira VidaID, a polícia identificou ela em minutos e nos ligou. Hoje não vivo sem essa segurança."
            </div>
            <div className="testimonial-author">
              <div className="author-avatar">CR</div>
              <div>
                <div className="author-name">Carlos Rodrigues</div>
                <div className="author-role">Filho de usuária</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="cta-section">
        <div className="animate">
          <h2>Proteja Quem Você Ama</h2>
          <p>Junte-se a mais de 1 milhão de brasileiros que já transformaram sua saúde com a VidaID</p>
          <a href="#pricing" className="btn btn-cta">
            <i className="fas fa-shield-alt"></i>
            Começar Agora
          </a>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-brand">
            <div className="logo footer-logo">
              <i className="fas fa-heartbeat"></i>
              Vida<span>ID</span>
            </div>
            <p>Tecnologia que salva vidas, todos os dias.</p>
            <div className="social-links">
              <a href="#"><i className="fab fa-facebook"></i></a>
              <a href="#"><i className="fab fa-instagram"></i></a>
              <a href="#"><i className="fab fa-twitter"></i></a>
              <a href="#"><i className="fab fa-youtube"></i></a>
            </div>
          </div>
          
          <div className="footer-column">
            <h3>Produto</h3>
            <ul className="footer-links">
              <li><a href="#">Funcionalidades</a></li>
              <li><a href="#">Planos e Preços</a></li>
              <li><a href="#">App</a></li>
              <li><a href="#">Para Empresas</a></li>
              <li><a href="#">Para Hospitais</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Recursos</h3>
            <ul className="footer-links">
              <li><a href="#">Blog</a></li>
              <li><a href="#">Tutoriais</a></li>
              <li><a href="#">FAQ</a></li>
              <li><a href="#">Política de Privacidade</a></li>
              <li><a href="#">Termos de Uso</a></li>
            </ul>
          </div>
          
          <div className="footer-column">
            <h3>Contato</h3>
            <ul className="footer-links">
              <li><i className="fas fa-phone"></i> 0800-VIDAID</li>
              <li><i className="fas fa-envelope"></i> contato@vidaid.com.br</li>
              <li><i className="fas fa-map-marker-alt"></i> São Paulo - SP</li>
              <li><i className="fas fa-clock"></i> Seg-Sex: 8h-18h</li>
            </ul>
          </div>
        </div>
        
        <div className="copyright">
          © 2024 VidaID. Todos os direitos reservados.
        </div>
      </footer>
      
      {/* Quick Links */}
      <div className="demo-links">
        <Link to="/dashboard" className="demo-link">
          <i className="fas fa-user"></i> Dashboard
        </Link>
        <Link to="/medico" className="demo-link">
          <i className="fas fa-user-md"></i> Médico
        </Link>
        <Link to="/emergencia" className="demo-link emergency">
          <i className="fas fa-ambulance"></i> Emergência
        </Link>
      </div>
    </div>
  )
}

export default LandingPage

