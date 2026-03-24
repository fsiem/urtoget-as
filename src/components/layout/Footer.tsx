import React from 'react'
import { Link } from 'react-router-dom'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <h3 className={styles.brandName}>HOROLOGICAL<br/>ATELIER</h3>
          <p className={styles.brandDesc}>
            Verdens ledende destinasjon for sertifiserte autentiske luksusur. Etablert 1924. Manufacture en Suisse.
          </p>
        </div>
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Utforsk</h4>
          <ul className={styles.colLinks}>
            <li><Link to="/kolleksjoner">Kolleksjoner</Link></li>
            <li><Link to="/sok">Søk</Link></li>
            <li><Link to="/sammenligning">Sammenligning</Link></li>
          </ul>
        </div>
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Concierge</h4>
          <ul className={styles.colLinks}>
            <li><a href="#">Kontakt Oss</a></li>
            <li><a href="#">Frakt og Retur</a></li>
            <li><a href="#">Personvern</a></li>
          </ul>
        </div>
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Lokasjon</h4>
          <p className={styles.brandDesc}>
            Rue du Rhône 12, 1204 Genève, Sveits<br />
            contact@horologicalatelier.ch
          </p>
          <div className={styles.social}>
            <a href="#" aria-label="Globalt"><GlobeIcon /></a>
            <a href="#" aria-label="RSS"><RssIcon /></a>
          </div>
        </div>
        <div className={styles.col}>
          <h4 className={styles.colTitle}>Nyhetsbrev</h4>
          <form className={styles.newsletter} onSubmit={e => e.preventDefault()}>
            <input type="email" placeholder="Din e-post" className={styles.input} />
            <button type="submit" className={styles.subscribeBtn}>Abonner</button>
          </form>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© 2024 Horological Atelier. Manufacture en Suisse.</span>
        <div className={styles.bottomLinks}>
          <a href="#">Instagram</a>
          <a href="#">RSS</a>
        </div>
      </div>
    </footer>
  )
}

const GlobeIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10"/>
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
  </svg>
)
const RssIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M4 11a9 9 0 0 1 9 9"/><path d="M4 4a16 16 0 0 1 16 16"/>
    <circle cx="5" cy="19" r="1" fill="currentColor"/>
  </svg>
)
