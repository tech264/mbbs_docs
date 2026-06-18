import { useState, useEffect } from 'react'
import './App.css'

const API = 'https://api.drexpertedu.com/neet-exam/api'

/* Country codes — all countries except Pakistan */
const COUNTRY_CODES = [
  { code: '+91', name: 'India 🇮🇳' },
  { code: '+93', name: 'Afghanistan 🇦🇫' },
  { code: '+355', name: 'Albania 🇦🇱' },
  { code: '+213', name: 'Algeria 🇩🇿' },
  { code: '+376', name: 'Andorra 🇦🇩' },
  { code: '+244', name: 'Angola 🇦🇴' },
  { code: '+54', name: 'Argentina 🇦🇷' },
  { code: '+374', name: 'Armenia 🇦🇲' },
  { code: '+61', name: 'Australia 🇦🇺' },
  { code: '+43', name: 'Austria 🇦🇹' },
  { code: '+994', name: 'Azerbaijan 🇦🇿' },
  { code: '+973', name: 'Bahrain 🇧🇭' },
  { code: '+880', name: 'Bangladesh 🇧🇩' },
  { code: '+375', name: 'Belarus 🇧🇾' },
  { code: '+32', name: 'Belgium 🇧🇪' },
  { code: '+501', name: 'Belize 🇧🇿' },
  { code: '+229', name: 'Benin 🇧🇯' },
  { code: '+975', name: 'Bhutan 🇧🇹' },
  { code: '+591', name: 'Bolivia 🇧🇴' },
  { code: '+387', name: 'Bosnia & Herzegovina 🇧🇦' },
  { code: '+267', name: 'Botswana 🇧🇼' },
  { code: '+55', name: 'Brazil 🇧🇷' },
  { code: '+673', name: 'Brunei 🇧🇳' },
  { code: '+359', name: 'Bulgaria 🇧🇬' },
  { code: '+226', name: 'Burkina Faso 🇧🇫' },
  { code: '+257', name: 'Burundi 🇧🇮' },
  { code: '+855', name: 'Cambodia 🇰🇭' },
  { code: '+237', name: 'Cameroon 🇨🇲' },
  { code: '+1', name: 'Canada 🇨🇦' },
  { code: '+238', name: 'Cape Verde 🇨🇻' },
  { code: '+236', name: 'Central African Republic 🇨🇫' },
  { code: '+235', name: 'Chad 🇹🇩' },
  { code: '+56', name: 'Chile 🇨🇱' },
  { code: '+86', name: 'China 🇨🇳' },
  { code: '+57', name: 'Colombia 🇨🇴' },
  { code: '+269', name: 'Comoros 🇰🇲' },
  { code: '+242', name: 'Congo 🇨🇬' },
  { code: '+506', name: 'Costa Rica 🇨🇷' },
  { code: '+385', name: 'Croatia 🇭🇷' },
  { code: '+53', name: 'Cuba 🇨🇺' },
  { code: '+357', name: 'Cyprus 🇨🇾' },
  { code: '+420', name: 'Czech Republic 🇨🇿' },
  { code: '+45', name: 'Denmark 🇩🇰' },
  { code: '+253', name: 'Djibouti 🇩🇯' },
  { code: '+1', name: 'Dominican Republic 🇩🇴' },
  { code: '+593', name: 'Ecuador 🇪🇨' },
  { code: '+20', name: 'Egypt 🇪🇬' },
  { code: '+503', name: 'El Salvador 🇸🇻' },
  { code: '+240', name: 'Equatorial Guinea 🇬🇶' },
  { code: '+291', name: 'Eritrea 🇪🇷' },
  { code: '+372', name: 'Estonia 🇪🇪' },
  { code: '+268', name: 'Eswatini 🇸🇿' },
  { code: '+251', name: 'Ethiopia 🇪🇹' },
  { code: '+679', name: 'Fiji 🇫🇯' },
  { code: '+358', name: 'Finland 🇫🇮' },
  { code: '+33', name: 'France 🇫🇷' },
  { code: '+241', name: 'Gabon 🇬🇦' },
  { code: '+220', name: 'Gambia 🇬🇲' },
  { code: '+995', name: 'Georgia 🇬🇪' },
  { code: '+49', name: 'Germany 🇩🇪' },
  { code: '+233', name: 'Ghana 🇬🇭' },
  { code: '+30', name: 'Greece 🇬🇷' },
  { code: '+502', name: 'Guatemala 🇬🇹' },
  { code: '+224', name: 'Guinea 🇬🇳' },
  { code: '+245', name: 'Guinea-Bissau 🇬🇼' },
  { code: '+592', name: 'Guyana 🇬🇾' },
  { code: '+509', name: 'Haiti 🇭🇹' },
  { code: '+504', name: 'Honduras 🇭🇳' },
  { code: '+36', name: 'Hungary 🇭🇺' },
  { code: '+354', name: 'Iceland 🇮🇸' },
  { code: '+62', name: 'Indonesia 🇮🇩' },
  { code: '+98', name: 'Iran 🇮🇷' },
  { code: '+964', name: 'Iraq 🇮🇶' },
  { code: '+353', name: 'Ireland 🇮🇪' },
  { code: '+972', name: 'Israel 🇮🇱' },
  { code: '+39', name: 'Italy 🇮🇹' },
  { code: '+225', name: 'Ivory Coast 🇨🇮' },
  { code: '+1', name: 'Jamaica 🇯🇲' },
  { code: '+81', name: 'Japan 🇯🇵' },
  { code: '+962', name: 'Jordan 🇯🇴' },
  { code: '+7', name: 'Kazakhstan 🇰🇿' },
  { code: '+254', name: 'Kenya 🇰🇪' },
  { code: '+965', name: 'Kuwait 🇰🇼' },
  { code: '+996', name: 'Kyrgyzstan 🇰🇬' },
  { code: '+856', name: 'Laos 🇱🇦' },
  { code: '+371', name: 'Latvia 🇱🇻' },
  { code: '+961', name: 'Lebanon 🇱🇧' },
  { code: '+266', name: 'Lesotho 🇱🇸' },
  { code: '+231', name: 'Liberia 🇱🇷' },
  { code: '+218', name: 'Libya 🇱🇾' },
  { code: '+423', name: 'Liechtenstein 🇱🇮' },
  { code: '+370', name: 'Lithuania 🇱🇹' },
  { code: '+352', name: 'Luxembourg 🇱🇺' },
  { code: '+261', name: 'Madagascar 🇲🇬' },
  { code: '+265', name: 'Malawi 🇲🇼' },
  { code: '+60', name: 'Malaysia 🇲🇾' },
  { code: '+960', name: 'Maldives 🇲🇻' },
  { code: '+223', name: 'Mali 🇲🇱' },
  { code: '+356', name: 'Malta 🇲🇹' },
  { code: '+222', name: 'Mauritania 🇲🇷' },
  { code: '+230', name: 'Mauritius 🇲🇺' },
  { code: '+52', name: 'Mexico 🇲🇽' },
  { code: '+373', name: 'Moldova 🇲🇩' },
  { code: '+976', name: 'Mongolia 🇲🇳' },
  { code: '+382', name: 'Montenegro 🇲🇪' },
  { code: '+212', name: 'Morocco 🇲🇦' },
  { code: '+258', name: 'Mozambique 🇲🇿' },
  { code: '+95', name: 'Myanmar 🇲🇲' },
  { code: '+264', name: 'Namibia 🇳🇦' },
  { code: '+977', name: 'Nepal 🇳🇵' },
  { code: '+31', name: 'Netherlands 🇳🇱' },
  { code: '+64', name: 'New Zealand 🇳🇿' },
  { code: '+505', name: 'Nicaragua 🇳🇮' },
  { code: '+227', name: 'Niger 🇳🇪' },
  { code: '+234', name: 'Nigeria 🇳🇬' },
  { code: '+47', name: 'Norway 🇳🇴' },
  { code: '+968', name: 'Oman 🇴🇲' },
  { code: '+507', name: 'Panama 🇵🇦' },
  { code: '+675', name: 'Papua New Guinea 🇵🇬' },
  { code: '+595', name: 'Paraguay 🇵🇾' },
  { code: '+51', name: 'Peru 🇵🇪' },
  { code: '+63', name: 'Philippines 🇵🇭' },
  { code: '+48', name: 'Poland 🇵🇱' },
  { code: '+351', name: 'Portugal 🇵🇹' },
  { code: '+974', name: 'Qatar 🇶🇦' },
  { code: '+40', name: 'Romania 🇷🇴' },
  { code: '+7', name: 'Russia 🇷🇺' },
  { code: '+250', name: 'Rwanda 🇷🇼' },
  { code: '+966', name: 'Saudi Arabia 🇸🇦' },
  { code: '+221', name: 'Senegal 🇸🇳' },
  { code: '+381', name: 'Serbia 🇷🇸' },
  { code: '+232', name: 'Sierra Leone 🇸🇱' },
  { code: '+65', name: 'Singapore 🇸🇬' },
  { code: '+421', name: 'Slovakia 🇸🇰' },
  { code: '+386', name: 'Slovenia 🇸🇮' },
  { code: '+252', name: 'Somalia 🇸🇴' },
  { code: '+27', name: 'South Africa 🇿🇦' },
  { code: '+82', name: 'South Korea 🇰🇷' },
  { code: '+211', name: 'South Sudan 🇸🇸' },
  { code: '+34', name: 'Spain 🇪🇸' },
  { code: '+94', name: 'Sri Lanka 🇱🇰' },
  { code: '+249', name: 'Sudan 🇸🇩' },
  { code: '+597', name: 'Suriname 🇸🇷' },
  { code: '+46', name: 'Sweden 🇸🇪' },
  { code: '+41', name: 'Switzerland 🇨🇭' },
  { code: '+963', name: 'Syria 🇸🇾' },
  { code: '+886', name: 'Taiwan 🇹🇼' },
  { code: '+992', name: 'Tajikistan 🇹🇯' },
  { code: '+255', name: 'Tanzania 🇹🇿' },
  { code: '+66', name: 'Thailand 🇹🇭' },
  { code: '+228', name: 'Togo 🇹🇬' },
  { code: '+1', name: 'Trinidad & Tobago 🇹🇹' },
  { code: '+216', name: 'Tunisia 🇹🇳' },
  { code: '+90', name: 'Turkey 🇹🇷' },
  { code: '+993', name: 'Turkmenistan 🇹🇲' },
  { code: '+256', name: 'Uganda 🇺🇬' },
  { code: '+380', name: 'Ukraine 🇺🇦' },
  { code: '+971', name: 'UAE 🇦🇪' },
  { code: '+44', name: 'United Kingdom 🇬🇧' },
  { code: '+1', name: 'USA 🇺🇸' },
  { code: '+598', name: 'Uruguay 🇺🇾' },
  { code: '+998', name: 'Uzbekistan 🇺🇿' },
  { code: '+58', name: 'Venezuela 🇻🇪' },
  { code: '+84', name: 'Vietnam 🇻🇳' },
  { code: '+967', name: 'Yemen 🇾🇪' },
  { code: '+260', name: 'Zambia 🇿🇲' },
  { code: '+263', name: 'Zimbabwe 🇿🇼' },
]

/* ─────────────────────────────────────────────────────────── */
/* LEAD GATE — Single-page form with inline OTP                 */
/* ─────────────────────────────────────────────────────────── */

function LeadGate({ onVerified }) {
  const [form, setForm] = useState({ name: '', email: '', dialCode: '+91', phone: '', dob: '' })
  const [stage, setStage] = useState('form') // 'form' | 'otp'
  const [regId, setRegId] = useState(null)
  const [otp, setOtp] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const sendOtp = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    const fullPhone = form.dialCode + form.phone.replace(/^0+/, '')
    try {
      const res = await fetch(`${API}/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, phone: fullPhone, dob: form.dob }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        const msg = data.errors ? data.errors.map(e => e.msg).join(', ') : (data.message || 'Something went wrong')
        setError(msg)
      } else {
        setRegId(data.data.id)
        setStage('otp')
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const verifyOtp = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const res = await fetch(`${API}/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ registrationId: regId, otp, remark: 'MBBS Abroad Guide' }),
      })
      const data = await res.json()
      if (!res.ok || !data.success) {
        setError(data.message || 'OTP verification failed. Please try again.')
      } else {
        localStorage.setItem('drexpert_verified', '1')
        onVerified()
      }
    } catch {
      setError('Network error. Please check your connection and try again.')
    } finally {
      setLoading(false)
    }
  }

  const fullPhone = form.dialCode + form.phone.replace(/^0+/, '')

  return (
    <div className="gate-wrap">
      <div className="gate-card">
        <img src={LOGO} alt="Dr Expert Edulinks" className="gate-logo" />
        <h1 className="gate-title">MBBS Abroad Guide</h1>
        <p className="gate-subtitle">
          {stage === 'form'
            ? 'Enter your details to access the complete guide. An OTP will be sent to your WhatsApp.'
            : <>OTP sent to <strong>{fullPhone}</strong> on WhatsApp. Enter it below.</>}
        </p>

        {stage === 'form' ? (
          <form className="gate-form" onSubmit={sendOtp}>
            <div className="gate-field">
              <label className="gate-label">Full Name</label>
              <input className="gate-input" type="text" placeholder="Your full name" value={form.name} onChange={set('name')} required />
            </div>
            <div className="gate-field">
              <label className="gate-label">Email Address</label>
              <input className="gate-input" type="email" placeholder="your@email.com" value={form.email} onChange={set('email')} required />
            </div>
            <div className="gate-field">
              <label className="gate-label">WhatsApp Number</label>
              <div className="gate-phone-row">
                <select className="gate-input gate-dial-select" value={form.dialCode} onChange={set('dialCode')}>
                  {COUNTRY_CODES.map((c, i) => (
                    <option key={i} value={c.code}>{c.name} ({c.code})</option>
                  ))}
                </select>
                <input
                  className="gate-input gate-phone-num"
                  type="tel"
                  placeholder="9876543210"
                  value={form.phone}
                  onChange={set('phone')}
                  required
                />
              </div>
            </div>
            <div className="gate-field">
              <label className="gate-label">Date of Birth</label>
              <input className="gate-input" type="date" value={form.dob} onChange={set('dob')} required />
            </div>
            {error && <div className="gate-error">{error}</div>}
            <button className="gate-btn" type="submit" disabled={loading}>
              {loading ? 'Sending OTP…' : 'Send OTP to WhatsApp →'}
            </button>
          </form>
        ) : (
          <form className="gate-form" onSubmit={verifyOtp}>
            <div className="gate-field">
              <label className="gate-label">Enter OTP</label>
              <input
                className="gate-input gate-otp-input"
                type="text"
                inputMode="numeric"
                placeholder="e.g. 123456"
                maxLength={8}
                value={otp}
                onChange={e => setOtp(e.target.value)}
                autoFocus
                required
              />
            </div>
            {error && <div className="gate-error">{error}</div>}
            <button className="gate-btn" type="submit" disabled={loading}>
              {loading ? 'Verifying…' : 'Verify & Access Guide →'}
            </button>
            <button type="button" className="gate-back-btn" onClick={() => { setStage('form'); setError(''); setOtp('') }}>
              ← Edit details / resend OTP
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

const LOGO = 'https://www.drexpertedu.com/_next/image/?url=%2Fimages%2Flogo.png&w=256&q=75'

/* ─────────────────────────────────────────────────────────── */
/* CONTENT DATA                                                 */
/* ─────────────────────────────────────────────────────────── */

const SECTIONS = [
  { id: 'cover', title: 'MBBS Abroad Guide', short: 'Cover' },
  { id: 'toc', title: 'Table of Contents', short: 'Contents' },
  { id: 'p1_intro', title: 'Part 1: Indian Regulatory Framework', short: 'Regulations' },
  { id: 'p1_1', title: '1.1 NEET-UG is Mandatory', short: 'NEET-UG' },
  { id: 'p1_2', title: '1.2 NMC Regulations 2021', short: 'NMC Rules' },
  { id: 'p1_3', title: '1.3 FMGE vs NExT', short: 'FMGE/NExT' },
  { id: 'p1_4', title: '1.4 Eligibility Criteria', short: 'Eligibility' },
  { id: 'p2', title: 'Part 2: Verify a University & Avoid Scams', short: 'Avoid Scams' },
  { id: 'p2b', title: 'Part 2B: Countries Requiring Extra Caution', short: 'Caution' },
  { id: 'p3_intro', title: 'Part 3: Country-by-Country Profiles', short: 'Countries Intro' },
  { id: 'p3_uz', title: '3.1 Uzbekistan', short: 'Uzbekistan' },
  { id: 'p3_ge', title: '3.2 Georgia', short: 'Georgia' },
  { id: 'p3_bu', title: '3.3 Bulgaria', short: 'Bulgaria' },
  { id: 'p3_eg', title: '3.4 Egypt', short: 'Egypt' },
  { id: 'p3_ro', title: '3.5 Romania', short: 'Romania' },
  { id: 'p4', title: 'Part 4: Side-by-Side Comparison', short: 'Comparison' },
  { id: 'p5', title: 'Part 5: Admission, Documents & Visa', short: 'Admission' },
  { id: 'p6', title: 'Part 6: Life Abroad', short: 'Life Abroad' },
  { id: 'p7', title: 'Part 7: After You Graduate', short: 'After Grad' },
  { id: 'p8', title: 'Part 8: Final Checklist', short: 'Checklist' },
  { id: 'p9', title: 'Part 9: Where to Verify', short: 'Verify' },
  { id: 'disclaimer', title: 'Disclaimer', short: 'Disclaimer' },
]

/* ─────────────────────────────────────────────────────────── */
/* SECTION COMPONENTS                                           */
/* ─────────────────────────────────────────────────────────── */

function Cover() {
  return (
    <div className="section-page">
      <div className="cover-logo-wrap">
        <img src={LOGO} alt="Dr Expert Edulinks" className="cover-logo" />
      </div>
      <div className="cover-badge">Complete Student Guide</div>
      <h1 className="cover-title">MBBS ABROAD</h1>
      <p className="cover-subtitle">A Complete Guide for Indian Students and Parents</p>
      <p className="cover-desc">
        Everything you must understand before taking admission to a foreign medical (MBBS) programme.
      </p>
      <div className="cover-countries">
        <span className="country-pill">🇺🇿 Uzbekistan</span>
        <span className="country-pill">🇬🇪 Georgia</span>
        <span className="country-pill">🇧🇬 Bulgaria</span>
        <span className="country-pill">🇪🇬 Egypt</span>
        <span className="country-pill">🇷🇴 Romania</span>
      </div>
      <div className="cover-meta">
        <p>Prepared June 2026</p>
        <p>Compiled and presented by <strong>Dr Expert Edu</strong> (www.drexpertedu.com)</p>
      </div>
      <div className="notice-box">
        <strong>Important Notice:</strong> This guide is for general educational and informational purposes. Rules issued by the National Medical Commission (NMC), embassies and universities change frequently. Always verify the latest position on the official NMC website (nmc.org.in) before making any decision.
      </div>
    </div>
  )
}

function TOC({ onJump }) {
  const items = [
    { label: 'Part 1: The Indian Regulatory Framework (Read This First)', id: 'p1_intro' },
    { label: '1.1 NEET-UG is Mandatory: No Exceptions', id: 'p1_1', indent: true },
    { label: '1.2 The NMC (Foreign Medical Graduate Licentiate) Regulations, 2021', id: 'p1_2', indent: true },
    { label: '1.3 FMGE vs NExT: Current Status (as of mid-2026)', id: 'p1_3', indent: true },
    { label: '1.4 Eligibility Criteria Common to (Almost) All Countries', id: 'p1_4', indent: true },
    { label: 'Part 2: How to Verify a University and Avoid Scams', id: 'p2' },
    { label: 'Part 2B: Countries That Require Extra Caution', id: 'p2b' },
    { label: 'Part 3: Country-by-Country Profiles', id: 'p3_uz' },
    { label: '3.1 Uzbekistan', id: 'p3_uz', indent: true },
    { label: '3.2 Georgia', id: 'p3_ge', indent: true },
    { label: '3.3 Bulgaria', id: 'p3_bu', indent: true },
    { label: '3.4 Egypt', id: 'p3_eg', indent: true },
    { label: '3.5 Romania', id: 'p3_ro', indent: true },
    { label: 'Part 4: Side-by-Side Comparison', id: 'p4' },
    { label: 'Part 5: Admission Process, Documents and Visa', id: 'p5' },
    { label: 'Part 6: What Life Abroad Is Really Like', id: 'p6' },
    { label: 'Part 7: The Road Back (After You Graduate)', id: 'p7' },
    { label: 'Part 8: Final Checklist Before You Sign Anything', id: 'p8' },
    { label: 'Part 9: Where to Verify Information / Further Reading', id: 'p9' },
  ]
  return (
    <div className="section-page">
      <h2 className="section-heading">Table of Contents</h2>
      <div className="toc-list">
        {items.map((item, i) => (
          <button key={i} className={`toc-item ${item.indent ? 'toc-indent' : 'toc-part'}`} onClick={() => onJump(item.id)}>
            {item.label}
            <span className="toc-arrow">→</span>
          </button>
        ))}
      </div>
    </div>
  )
}

function P1Intro() {
  return (
    <div className="section-page">
      <div className="part-badge">Part 1</div>
      <h2 className="section-heading">The Indian Regulatory Framework</h2>
      <div className="read-first-banner">⚠ Read This First</div>
      <p className="body-text">
        Before looking at any country, university or consultancy brochure, every Indian student and parent must understand one thing clearly: <strong>a medical degree earned outside India does not automatically allow you to practise medicine in India.</strong>
      </p>
      <p className="body-text">
        Whether your foreign MBBS/MD degree is useful to you afterwards depends entirely on whether it satisfies the rules laid down by India's National Medical Commission (NMC). Everything else — fees, university ranking, climate, food — is secondary to this single fact.
      </p>
      <p className="body-text">This section explains the rules as they stand in 2026.</p>
    </div>
  )
}

function P1_1() {
  return (
    <div className="section-page">
      <div className="part-badge">1.1</div>
      <h2 className="section-heading">NEET-UG is Mandatory: No Exceptions</h2>
      <p className="body-text">
        Since 2018, the National Eligibility-cum-Entrance Test for Undergraduates (NEET-UG) has been made compulsory for every Indian citizen who wants to pursue a primary medical qualification (MBBS or equivalent) from any institution outside India, if that student ever intends to practise medicine in India or appear for any Indian licensing exam.
      </p>
      <p className="body-text">
        This is <strong>not</strong> a competitive cut-off requirement. There is no minimum rank or percentile needed for MBBS-abroad admission. You only need a qualifying score in NEET-UG.
      </p>
      <div className="alert-box alert-danger">
        <h3 className="alert-title">⚠ Consequence of Skipping NEET</h3>
        <p>If you take admission abroad <strong>without</strong> a valid NEET-UG qualifying score for the relevant academic year:</p>
        <ul className="content-list">
          <li>You cannot appear for the FMGE or NExT exam in India.</li>
          <li>You cannot register with the NMC or any State Medical Council.</li>
          <li>You cannot legally practise medicine anywhere in India, regardless of how good your foreign degree is.</li>
          <li>Your degree remains valid only in the country where you studied.</li>
        </ul>
      </div>
      <div className="notice-box">
        Many agents quietly gloss over this point because some countries do not require NEET for their own admission process. Do not be misled: the NEET requirement is an <strong>Indian rule</strong> that applies regardless of what the foreign university asks for.
      </div>
    </div>
  )
}

function P1_2() {
  return (
    <div className="section-page">
      <div className="part-badge">1.2</div>
      <h2 className="section-heading">The NMC (Foreign Medical Graduate Licentiate) Regulations, 2021</h2>
      <p className="body-text">
        These regulations, notified on <strong>18 November 2021</strong>, are the master rulebook governing every Indian student who studies medicine abroad and wants to return and practise in India. The key requirements are:
      </p>
      <div className="rule-list">
        <div className="rule-item">
          <div className="rule-num">01</div>
          <div>
            <strong>Minimum course duration:</strong> The foreign medical degree programme must be at least 54 months (4.5 years) of academic study.
          </div>
        </div>
        <div className="rule-item">
          <div className="rule-num">02</div>
          <div>
            <strong>Compulsory foreign internship:</strong> A minimum 12-month internship must be completed in the same foreign institution/country as part of the degree. Together, this typically makes the full programme roughly 5.5 to 6 years.
          </div>
        </div>
        <div className="rule-item">
          <div className="rule-num">03</div>
          <div>
            <strong>Medium of instruction:</strong> The entire MBBS programme must be conducted in English. Programmes taught primarily in the local language (with only "translation support") do not meet this requirement.
          </div>
        </div>
        <div className="rule-item">
          <div className="rule-num">04</div>
          <div>
            <strong>Curriculum equivalence:</strong> The subjects studied must be broadly equivalent to the Indian MBBS syllabus — including anatomy, physiology, biochemistry, pathology, pharmacology, microbiology, forensic medicine, community medicine, medicine, surgery, obstetrics & gynaecology, paediatrics, ophthalmology, ENT, orthopaedics, dermatology, psychiatry, anaesthesia, radiology, and so on.
          </div>
        </div>
        <div className="rule-item">
          <div className="rule-num">05</div>
          <div>
            <strong>Local registration / licence:</strong> The student must register with, or obtain a valid medical licence from, the regulatory body of the country where they studied.
          </div>
        </div>
        <div className="rule-item">
          <div className="rule-num">06</div>
          <div>
            <strong>Screening/licensing exam:</strong> On return to India, the graduate must clear the National Exit Test (NExT), or the FMGE until NExT is fully implemented.
          </div>
        </div>
        <div className="rule-item">
          <div className="rule-num">07</div>
          <div>
            <strong>Indian internship:</strong> After clearing the screening exam, the graduate must complete a further 12-month supervised internship in India before being granted permanent registration to practise.
          </div>
        </div>
      </div>
      <div className="highlight-box">
        <strong>In simple terms:</strong> Studying MBBS abroad does NOT save you from doing an internship. Most students end up doing one internship abroad (mandatory for the foreign degree) and a second one in India (mandatory for Indian registration). Factor this extra year into your total timeline and budget.
      </div>
    </div>
  )
}

function P1_3() {
  return (
    <div className="section-page">
      <div className="part-badge">1.3</div>
      <h2 className="section-heading">FMGE vs NExT: Current Status (as of mid-2026)</h2>
      <p className="body-text">
        The National Exit Test (NExT) was announced as a single licensing exam intended to eventually replace both the FMGE (for foreign graduates) and NEET-PG (for Indian graduates). However, full implementation of NExT has been repeatedly delayed and, as of early-to-mid 2026, is still expected to take a further few years to be rolled out completely. For now, the <strong>Foreign Medical Graduate Examination (FMGE)</strong>, conducted twice a year by NBEMS, remains the operative screening test.
      </p>
      <div className="alert-box alert-warning">
        <h3 className="alert-title">⚠ FMGE Pass Rates Are Low</h3>
        <p>FMGE is widely regarded as a difficult exam. Overall pass rates in recent sessions:</p>
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-val">20.9%</div>
            <div className="stat-label">June 2024</div>
          </div>
          <div className="stat-card">
            <div className="stat-val">29.6%</div>
            <div className="stat-label">Dec 2024</div>
          </div>
          <div className="stat-card">
            <div className="stat-val">18.6%</div>
            <div className="stat-label">June 2025</div>
          </div>
          <div className="stat-card">
            <div className="stat-val">23.4%</div>
            <div className="stat-label">Dec 2025</div>
          </div>
        </div>
        <p>This means roughly <strong>7 to 8 out of every 10</strong> foreign medical graduates who attempt FMGE FAIL on a given attempt (though many pass on subsequent attempts).</p>
      </div>
      <h3 className="sub-heading">Country-Specific FMGE Pass Rates</h3>
      <div className="fmge-table">
        {[
          { country: '🇺🇿 Uzbekistan', rate: '~40%', status: 'good', note: 'Above average — one of the better performers' },
          { country: '🇬🇪 Georgia', rate: '27–32%', status: 'ok', note: 'Above national average; varies by university' },
          { country: '🇧🇬 Bulgaria', rate: '23–33%', status: 'ok', note: 'Improving trend; below national average' },
          { country: '🇪🇬 Egypt', rate: '0–5%', status: 'bad', note: '⚠ Among the lowest of any major destination' },
          { country: '🇷🇴 Romania', rate: '~5%', status: 'bad', note: 'Limited data (very few Indian graduates so far)' },
        ].map((row, i) => (
          <div key={i} className={`fmge-row fmge-${row.status}`}>
            <div className="fmge-country">{row.country}</div>
            <div className="fmge-rate">{row.rate}</div>
            <div className="fmge-note">{row.note}</div>
          </div>
        ))}
      </div>
      <p className="body-text caption-text">
        This single statistic should shape your entire decision-making process. The country and university you choose has a real, measurable effect on your odds of ever being allowed to practise in India.
      </p>
    </div>
  )
}

function P1_4() {
  return (
    <div className="section-page">
      <div className="part-badge">1.4</div>
      <h2 className="section-heading">Eligibility Criteria Common to (Almost) All Countries</h2>
      <p className="body-text">Regardless of which country you choose, the baseline eligibility framework recognised by NMC for MBBS-abroad aspirants is broadly as follows:</p>
      <div className="criteria-list">
        {[
          {
            icon: '📚', title: 'Academic Qualification',
            body: 'Pass in Class 12 (or equivalent) with Physics, Chemistry and Biology (PCB), securing at least 50% aggregate marks in these three subjects for general category candidates (a relaxed 40% applies for SC/ST/OBC and other reserved categories, in line with NEET eligibility norms).'
          },
          {
            icon: '🎂', title: 'Age',
            body: 'A minimum age of 17 years at the time of admission (to be completed by 31 December of the admission year). Some consultancies cite an informal upper age guideline (commonly around 25), though this is more a practical/visa consideration than a hard NMC rule.'
          },
          {
            icon: '📝', title: 'NEET-UG',
            body: 'A qualifying (non-zero, above cut-off) score in NEET-UG. NEET scores are generally usable for admission within a limited window of up to 3 years, so long gap years can create complications; always confirm the current validity rule before planning a gap year.'
          },
          {
            icon: '📅', title: 'Gap after Class 12',
            body: 'Many universities and consultancies prefer no more than a 1–2 year gap between Class 12 and joining the foreign MBBS programme; longer gaps can sometimes raise questions during document verification. Note: some countries such as Egypt may impose a fine on students with longer gap years. Always confirm the current gap-year policy before applying.'
          },
          {
            icon: '🛂', title: 'Passport',
            body: 'A valid passport (ideally with at least 12 months validity remaining), since the entire process — visa, embassy attestation, travel — depends on it. Students should apply for a passport early if they don\'t already have one.'
          },
        ].map((c, i) => (
          <div key={i} className="criteria-card">
            <div className="criteria-icon">{c.icon}</div>
            <div>
              <h4 className="criteria-title">{c.title}</h4>
              <p className="body-text small-text">{c.body}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="drexpert-cta">
        Confused about NEET eligibility, NMC rules or which countries actually suit your profile? <strong>Dr Expert Edu offers free one-on-one counselling sessions</strong> to help Indian students plan their MBBS abroad journey correctly from day one.
      </div>
    </div>
  )
}

function Accordion({ title, children }) {
  const [open, setOpen] = useState(false)
  return (
    <div className={`accordion-block ${open ? 'acc-open' : ''}`}>
      <button className="acc-toggle" onClick={() => setOpen(o => !o)}>
        <span>{title}</span>
        <span className="acc-chevron">{open ? '▲' : '▼'}</span>
      </button>
      {open && <div className="acc-content">{children}</div>}
    </div>
  )
}

function P2() {
  return (
    <div className="section-page">
      <div className="part-badge">Part 2</div>
      <h2 className="section-heading">How to Verify a University and Avoid Scams</h2>
      <p className="body-text">
        The MBBS-abroad industry in India is heavily driven by education consultancies and "agents", many of whom are reputable, but the sector also attracts a significant amount of fraud. Because the financial and time stakes are so high (lakhs of rupees and 6+ years of your life), this section deserves as much attention as the country comparisons themselves.
      </p>

      <Accordion title="2.1 The Single Most Important Check: WDOMS Website">
        <p className="body-text">
          The single most important step before paying any fee or signing anything is to verify the university on the <strong>WHO World Directory of Medical Schools (WDOMS)</strong> at <strong>wdoms.org</strong>. This is the globally recognised official directory of medical schools and the primary reference for confirming whether a foreign degree will be valid for FMGE/NExT and subsequent registration in India.
        </p>
        <h4 className="sub-heading">Before you sign anything or pay any fee:</h4>
        <ul className="content-list">
          <li>Go directly to <strong>wdoms.org</strong> yourself and search for the exact, full legal name of the university you are being offered. Do not rely on a screenshot, PDF, or list provided by an agent, as these can be outdated, edited, or fabricated.</li>
          <li>Use the university's full official name, not a short form, English translation, or "campus" name that may differ from the officially registered institution.</li>
          <li>Confirm the listing shows the correct country, programme type (medicine), and that the institution is active. An institution not listed on WDOMS is a hard red flag.</li>
          <li>Look up the institution's FMGE pass-rate history on the NBEMS website (natboard.edu.in). NBEMS periodically publishes country/university-wise FMGE results.</li>
          <li>If the agent cannot or will not let you do this verification yourself before paying any money, treat that as a major warning sign.</li>
        </ul>
      </Accordion>

      <Accordion title="2.2 Common Red Flags and Scam Patterns">
        <div className="redflags-list">
          {[
            { flag: '"100% guaranteed admission, no entrance test, no NEET needed"', detail: 'While it is true many countries don\'t require their own entrance test, an agent telling you NEET is "not needed at all" is misleading you about the Indian-side requirement.' },
            { flag: 'Communication only via WhatsApp/Telegram', detail: 'Official offer letters and admission confirmations should come on the university\'s letterhead, ideally also visible on the university\'s own portal/email domain, not only as forwarded images on chat apps.' },
            { flag: 'Vague answers about FMGE/NExT pass rates', detail: 'A genuine consultant should be able to discuss the specific university\'s recent FMGE results. If they dodge the question or only talk about "the country" in general terms, dig deeper.' },
            { flag: 'Fake or edited recognition documents', detail: 'Always verify independently on wdoms.org rather than trusting a PDF "certificate" or screenshot shown to you by an agent.' },
            { flag: 'Hidden costs revealed only after you commit', detail: 'Get a complete, itemised, written breakdown of tuition, hostel, mess/food, visa, insurance, and any "service" or "processing" charges before paying anything.' },
          ].map((item, i) => (
            <div key={i} className="redflag-item">
              <span className="redflag-icon">🚩</span>
              <div>
                <p className="redflag-title">{item.flag}</p>
                <p className="body-text small-text">{item.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </Accordion>

      <Accordion title="2.3 Questions to Ask Before You Pay Any Money">
        <ul className="content-list numbered-list">
          <li>Is this exact university (full legal name) listed on the WDOMS website (wdoms.org)?</li>
          <li>What was this specific university's FMGE/NExT pass percentage in the last 2–3 sessions (not just the country average)?</li>
          <li>Is the entire MBBS/MD programme, including clinical years, taught in English, or only the early years?</li>
          <li>What exactly is included in the quoted fee: tuition only, or also hostel, food, insurance, visa support, and exam fees?</li>
          <li>Can I speak to current Indian students or recent graduates of this specific university (not just "the country")?</li>
          <li>What is the university's policy if the political, currency, or visa situation changes mid-course?</li>
          <li>Does the consultancy charge me any fee, and is that fee refundable if my visa or admission is rejected?</li>
        </ul>
      </Accordion>

      <div className="drexpert-cta">
        Not sure how to verify a university's WDOMS listing or spot a scam before paying any fee? <strong>Dr Expert Edu independently verifies university recognition and FMGE track records</strong> for students before they commit any money.
      </div>
    </div>
  )
}

function P2B() {
  return (
    <div className="section-page">
      <div className="part-badge">Part 2B</div>
      <h2 className="section-heading">Countries That Require Extra Caution</h2>
      <p className="body-text">
        While there are many countries where Indian students pursue MBBS, three destinations carry well-documented structural risks that any student or parent must understand before considering them. These are not blanket bans, but the risks are significant enough to require explicit discussion.
      </p>

      <div className="caution-card">
        <h3 className="caution-title">🇰🇿 Kazakhstan</h3>
        <p className="body-text">Kazakhstan has a number of medical universities listed on WDOMS and is an active destination for Indian students. However, it carries two serious regulatory risks:</p>
        <div className="problem-block">
          <div className="problem-label">Problem 1 — NMC India Eligibility Certificate</div>
          <p className="body-text small-text">India's NMC issued a formal advisory in 2024 stating that Indian students must obtain an NMC Eligibility Certificate before enrolling in any Kazakh medical university. Students who enrol without first obtaining this certificate risk being permanently ineligible to appear for the FMGE or NExT exam in India, regardless of how good their degree is.</p>
        </div>
        <div className="problem-block">
          <div className="problem-label">Problem 2 — GMC UK Non-Acceptance</div>
          <p className="body-text small-text">The General Medical Council UK (GMC UK) does not maintain a blanket approved list of overseas institutions. In practice, a significant number of Kazakhstan medical universities do not meet GMC UK's acceptability criteria, meaning graduates cannot sit the PLAB test and cannot register to practise in the UK.</p>
          <p className="body-text small-text">The GMC UK itself warns students not to rely on assurances from agents, medical education consultants, or even the university that a qualification is "GMC recognised" or "UK compliant". The only safe approach is to contact the GMC directly at <strong>pmq-queries@gmc-uk.org</strong> before enrolling.</p>
        </div>
        <div className="notice-box">
          <strong>Practical Advice:</strong> If considering Kazakhstan, verify each specific university on wdoms.org, apply for the NMC Eligibility Certificate before paying any admission fee, AND contact the GMC UK directly. Do not rely solely on an agent's assurance.
        </div>
      </div>

      <div className="caution-card">
        <h3 className="caution-title">🇨🇳 China</h3>
        <p className="body-text">MBBS programmes in China are marketed heavily to Indian students as English-medium and affordable. However, there are two critical structural problems:</p>
        <div className="problem-block">
          <div className="problem-label">Problem 1 — Chinese Language Requirement</div>
          <p className="body-text small-text">The Chinese Medical Licence, which is required before you can apply for FMGE/NExT in India, is obtained through Chinese-language clinical examinations. Students must develop functional Chinese language skills to complete clinical training and obtain this licence. Programmes are not as straightforwardly English-medium as advertised for the full duration.</p>
        </div>
        <div className="problem-block">
          <div className="problem-label">Problem 2 — Low FMGE Pass Rates</div>
          <p className="body-text small-text">FMGE pass rates for China-trained graduates are consistently around <strong>18–20%</strong>, meaning roughly 8 out of every 10 China-trained graduates fail the FMGE on each attempt.</p>
        </div>
      </div>

      <div className="caution-card">
        <h3 className="caution-title">🇷🇺 Russia</h3>
        <p className="body-text">Russia is one of the oldest MBBS-abroad destinations for Indian students and many of its universities are WDOMS-listed. However, there is a structural language issue consistently underreported by consultancies:</p>
        <ul className="content-list">
          <li>According to the Indian Embassy in Russia, around <strong>80% of Russian universities</strong> that offer MBBS to international students run bilingual programmes.</li>
          <li>The first three years cover pre-clinical theoretical subjects and are typically in English.</li>
          <li>From <strong>year four onwards</strong>, as students move into clinical rotations in Russian hospitals, teaching shifts substantially to Russian. Patients speak Russian, hospital staff communicate in Russian, and clinical instruction increasingly happens in Russian.</li>
          <li>While Russian language is taught as a compulsory subject in years 1–3, the level reached by year four is often insufficient for effective clinical learning.</li>
        </ul>
        <div className="notice-box">
          Any consultant promoting Russia as a fully English-medium destination should be questioned carefully on this point.
        </div>
      </div>
    </div>
  )
}

function CountryProfile({ flag, name, facts, universities, why, caution, cta }) {
  return (
    <div className="section-page">
      <div className="part-badge">Country Profile</div>
      <h2 className="section-heading">{flag} {name}</h2>

      <h3 className="sub-heading">Quick Facts</h3>
      <div className="facts-table">
        {facts.map((f, i) => (
          <div key={i} className="facts-row">
            <div className="facts-label">{f[0]}</div>
            <div className="facts-value">{f[1]}</div>
          </div>
        ))}
      </div>

      {universities && (
        <>
          <h3 className="sub-heading">{universities.title}</h3>
          {universities.intro && <p className="body-text">{universities.intro}</p>}
          <ul className="content-list">
            {universities.list.map((u, i) => <li key={i}>{u}</li>)}
          </ul>
        </>
      )}

      <h3 className="sub-heading">Why Students Choose {name}</h3>
      <ul className="content-list check-list">
        {why.map((w, i) => <li key={i}>{w}</li>)}
      </ul>

      <h3 className="sub-heading">Points of Caution</h3>
      <ul className="content-list caution-list">
        {caution.map((c, i) => <li key={i}>{c}</li>)}
      </ul>

      {cta && <div className="drexpert-cta">{cta}</div>}
    </div>
  )
}

function P3Intro() {
  return (
    <div className="section-page">
      <div className="part-badge">Part 3</div>
      <h2 className="section-heading">Country-by-Country Profiles</h2>
      <p className="body-text">
        This section covers the five countries in detail: Uzbekistan, Georgia, Bulgaria, Egypt and Romania, which are among the most commonly chosen MBBS destinations for Indian students. For each country, this guide provides a snapshot of key facts, an overview of the admission landscape, and an honest assessment of the pros and cons.
      </p>
    </div>
  )
}

function P3_UZ() {
  return <CountryProfile
    flag="🇺🇿" name="Uzbekistan"
    facts={[
      ['Course duration', '6 years (5 years academic + 1 year internship)'],
      ['Medium of instruction', 'English (most NMC-recognised universities)'],
      ['Annual tuition fee', 'Approx. USD 3,000 – 3,500 per year'],
      ['Approx. total cost (6 yrs incl. hostel)', 'Roughly ₹25 – 35 lakh'],
      ['Living cost', 'Approx. ₹10,000 – 15,000 per month (incl. accommodation)'],
      ['Climate', 'Continental, with cold winters (down to about -1.5°C) and hot summers (up to about 35–36°C); spring and autumn are the most comfortable'],
      ['FMGE pass rate', 'Approximately 40% in recent sessions, one of the better performers; verify per university on NBEMS'],
    ]}
    universities={{
      title: 'Top NMC-Approved Universities',
      intro: 'The following universities are among the key institutions verified on WDOMS for Uzbekistan. Always re-confirm current listing status on wdoms.org before enrolling, as recognition can change:',
      list: [
        'Tashkent State Medical University',
        'Samarkand State Medical University',
        'Bukhara State Medical Institute',
        'Andijan State Medical Institute',
        'Fergana Medical Institute of Public Health',
        'Tashkent Pediatric Medical Institute',
      ]
    }}
    why={[
      'Among the most affordable options on this list, with relatively low tuition and very low living costs.',
      'English-medium teaching at most recognised universities, often supported by experienced Indian-origin faculty members in some institutions.',
      'Curriculum broadly aligned with the Indian MBBS structure, which can ease FMGE preparation compared to countries with very different systems.',
      'Generally regarded as a safe, peaceful environment with a rich cultural backdrop (Tashkent, Samarkand, Bukhara).',
    ]}
    caution={[
      'Winters can be quite cold (well below freezing), which can be a significant adjustment for students from tropical parts of India; appropriate winter clothing and heating arrangements matter.',
      'Not every medical university in Uzbekistan is NMC-recognised. There has been rapid growth in the number of institutions admitting Indian students, so individual verification is essential.',
      'Limited large Indian diaspora outside the main university cities; research the specific city\'s community before committing.',
    ]}
  />
}

function P3_GE() {
  return <CountryProfile
    flag="🇬🇪" name="Georgia"
    facts={[
      ['Course duration', '6 years (5 years academic + 1 year internship)'],
      ['Medium of instruction', 'English'],
      ['Annual tuition fee', 'Approx. USD 5,000 – 7,000 per year'],
      ['Approx. total cost (6 yrs)', 'Roughly ₹40 – 60 lakh depending on university and lifestyle'],
      ['Living cost', 'Indian food and communities available in Tbilisi and Batumi'],
      ['Climate', 'Similar to northern India in parts, but can feel harsher/colder than countries like Bulgaria for some students'],
      ['FMGE pass rate', 'Approximately 27–32% in recent sessions, above the national average; verify per university on NBEMS'],
    ]}
    universities={{
      title: 'Admission Landscape',
      intro: 'Georgia has historically been popular due to merit-based admission with no donation/capitation requirements. However, a significant recent development is that several Georgian state (government) universities have stopped or restricted admitting foreign students, meaning Indian applicants are now largely directed toward private universities. It is essential to verify any specific private university on WDOMS (wdoms.org) before enrolling, as not all private medical universities in Georgia are listed there.',
      list: []
    }}
    why={[
      'English-medium instruction with faculty generally considered to communicate well in English.',
      'Comparatively low cost of living and tuition versus many European destinations.',
      'Above-average FMGE pass rates compared to several other foreign destinations.',
      'Purely merit-based admission with minimal hidden costs at reputable institutions.',
    ]}
    caution={[
      'Georgian is the dominant local language outside the university/clinical environment, which can make day-to-day life and even some clinical postings more challenging.',
      'Clinical patient exposure can be limited at some institutions compared to high-patient-volume countries like India.',
      'As a long (6-year) commitment, homesickness and attrition (students returning mid-course) have been reported, particularly given the smaller Indian community in Georgia compared to more established destinations.',
    ]}
  />
}

function P3_BU() {
  return <CountryProfile
    flag="🇧🇬" name="Bulgaria"
    facts={[
      ['Course duration', '6 years (5 years academic + 1 year internship), ECTS credit system'],
      ['Medium of instruction', 'English (with optional Bulgarian language classes for clinical communication)'],
      ['Annual tuition fee', 'Approx. EUR 8,000 – 10,000 per year'],
      ['Approx. total cost (6 yrs)', 'Roughly ₹70 – 90 lakh'],
      ['Living cost', 'Approx. EUR 300 – 400 per month'],
      ['Climate', 'Temperate continental, with cold, snowy winters and warm summers; generally milder than Central Asia'],
      ['FMGE pass rate', 'Approximately 23–33% in recent sessions (between 23.53% and 33.33%); showing an improving trend; verify per university on NBEMS'],
    ]}
    universities={{
      title: 'Top Universities Commonly Cited',
      intro: "Bulgaria's medical education system is anchored around state medical universities including the Medical University of Sofia, Medical University of Plovdiv, and Medical University of Pleven, among others. Degrees are accredited under the European Credit Transfer and Accumulation System (ECTS), giving graduates a degree recognised across the EU. Always verify the specific university on WDOMS (wdoms.org) before enrolling.",
      list: []
    }}
    why={[
      'EU-accredited degree with cross-border recognition within Europe, useful if you may want options beyond India.',
      'No donation/capitation fee structure at the established state universities.',
      'English-medium teaching with strong theoretical grounding and access to optional local-language classes for patient communication.',
      'A genuinely international, multicultural student environment.',
    ]}
    caution={[
      'Very short inter-semester breaks (often cited as only around two weeks) can make trips home and rest periods difficult to plan.',
      'Higher cost of living than Uzbekistan or Egypt, and adapting to European living costs and culture is a real adjustment.',
      'Smaller Indian student community compared to Romania or Georgia in some university towns.',
    ]}
  />
}

function P3_EG() {
  return (
    <div className="section-page">
      <div className="part-badge">Country Profile</div>
      <h2 className="section-heading">🇪🇬 Egypt</h2>
      <h3 className="sub-heading">Quick Facts</h3>
      <div className="facts-table">
        {[
          ['Course duration', '7 years (5 years academic + 24-month internship)'],
          ['Medium of instruction', 'English (note: the country\'s official language is Arabic, but recognised medical programmes for international students are taught in English)'],
          ['Annual tuition fee', 'Approx. ₹4.2 – 10 lakh per year depending on the university'],
          ['Approx. total cost (full programme)', 'Roughly ₹50 – 60 lakh'],
          ['Living cost', 'Relatively comparable to Indian living costs, among the more affordable destinations on a day-to-day basis'],
          ['Climate', 'Hot desert climate, with very hot, dry summers and mild winters; minimal rainfall'],
          ['FMGE pass rate', 'Approximately 0–5% in recent assessments; students must plan extensive FMGE/NExT coaching from the early years of the programme'],
        ].map((f, i) => (
          <div key={i} className="facts-row">
            <div className="facts-label">{f[0]}</div>
            <div className="facts-value">{f[1]}</div>
          </div>
        ))}
      </div>
      <h3 className="sub-heading">Universities Commonly Cited</h3>
      <p className="body-text">
        Government universities such as Cairo University, Ain Shams University, Alexandria University, and Mansoura University, as well as institutions like Al-Azhar University (one of the oldest universities in the world), are often mentioned for international/Indian admissions. Always verify the specific faculty/campus on WDOMS (wdoms.org) before enrolling. Recognition is not automatically extended to every faculty or every admission route within a large university.
      </p>
      <h3 className="sub-heading">Why Students Consider Egypt</h3>
      <ul className="content-list check-list">
        <li>Comparatively low day-to-day living costs, similar to India, which eases the financial burden beyond tuition.</li>
        <li>Long-established, historically prestigious universities with large teaching hospitals.</li>
        <li>English-medium programmes designed for international students at several institutions.</li>
      </ul>
      <h3 className="sub-heading">Important Cautions</h3>
      <ul className="content-list caution-list">
        <li>The programme runs for 7 years including a 24-month internship, which is longer than most other destinations. Factor this carefully into your total timeline and financial plan.</li>
        <li>A comparatively small Indian student community in Egypt means less peer support than in other destinations; research the specific campus community before committing.</li>
        <li>Given the very low FMGE pass rates for Egypt-trained graduates, students choosing Egypt must budget significant time and money for dedicated FMGE/NExT coaching, ideally starting from the early years of the course rather than just the final year.</li>
      </ul>
    </div>
  )
}

function P3_RO() {
  return <CountryProfile
    flag="🇷🇴" name="Romania"
    facts={[
      ['Course duration', '6 years (5 years academic + 1 year internship), ECTS credit system'],
      ['Medium of instruction', 'English (with Romanian language classes for clinical patient communication)'],
      ['Annual tuition fee', 'Approx. EUR 5,000 – 11,000 per year depending on the university'],
      ['Approx. total cost (6 yrs incl. living)', 'Roughly ₹60 – 70 lakh depending on university and city'],
      ['Living cost', 'Approx. EUR 400 – 600 per month depending on city'],
      ['Climate', 'Temperate continental: cold winters (can reach -10°C to -15°C) and warm summers; similar to Bulgaria'],
      ['FMGE pass rate', 'Approximately 5% based on current data; Indian graduate numbers are still limited so this figure may shift as more graduates appear for FMGE in coming years'],
    ]}
    universities={{
      title: 'Top Universities Commonly Cited',
      intro: 'Romania has several well-established medical universities listed on WDOMS with English-medium programmes for international students. The most prominent include:',
      list: [
        'Carol Davila University of Medicine and Pharmacy (Bucharest) — Romania\'s most prestigious medical institution, founded in 1857',
        'Iuliu Hațieganu University of Medicine and Pharmacy (Cluj-Napoca)',
        'Grigore T. Popa University of Medicine and Pharmacy (Iași)',
        'Victor Babeș University of Medicine and Pharmacy (Timișoara)',
        'Ovidius University (Constanța)',
        'University of Oradea — Faculty of Medicine and Pharmacy (Oradea)',
      ]
    }}
    why={[
      'EU-accredited MBBS degree: Romania is an EU member state, so graduates hold a degree recognised across the European Union, opening pathways to practice or postgraduate study in other EU countries.',
      'English-medium programmes available at all major medical universities, designed for international students.',
      'No donation or capitation fee structure at the established state universities.',
      'A genuinely international, multicultural student environment.',
    ]}
    caution={[
      'FMGE pass rate data for Romania is currently limited due to the small number of Indian graduates so far. The available figure (~5%) is low, though it will become clearer as more Indian graduates complete the programme and appear for FMGE in coming years.',
      'Romanian language is required for patient interaction during clinical rotations, as most patients in Romanian hospitals speak Romanian. Students should be prepared for this language dimension even though classroom instruction is in English.',
      'Higher cost of living compared to Uzbekistan, Georgia, or Egypt, and adapting to European living costs is a real adjustment.',
      'Smaller current Indian student community compared to more established destinations; peer support networks are still developing.',
    ]}
    cta="Still weighing Uzbekistan, Georgia, Bulgaria, Egypt and Romania against each other? Dr Expert Edu can match you to the country and university that best fits your budget, NEET score and career goals, based on current FMGE outcomes."
  />
}

function P4() {
  const rows = [
    { label: 'Course length', vals: ['6 yrs', '6 yrs', '6 yrs', '7 yrs', '6 yrs'] },
    { label: 'Medium', vals: ['English', 'English', 'English', 'English', 'English'] },
    { label: 'Approx. tuition/yr', vals: ['$3,000–3,500', '$5,000–7,000', '€8,000–10,000', '₹4–10L', '€5,000–11,000'] },
    { label: 'Approx. total cost', vals: ['₹25–35L', '₹40–60L', '₹70–90L', '₹50–60L', '₹60–70L'] },
    { label: 'Climate fit for Indians', vals: ['Hot summers, very cold winters', 'Moderate; can feel harsh', 'Cold winters, milder than C. Asia', 'Hot desert, mild winters', 'Cold winters, warm summers'] },
    { label: 'FMGE pass-rate trend', vals: ['~40% (above average)', '35% (above average)', '23–33% (improving)', 'Low — 0–5%', '~5% (limited data)'] },
    { label: 'Indian community size', vals: ['Moderate', 'Moderate', 'Smaller', 'Small', 'Very small (growing)'] },
  ]
  const countries = ['Uzbekistan 🇺🇿', 'Georgia 🇬🇪', 'Bulgaria 🇧🇬', 'Egypt 🇪🇬', 'Romania 🇷🇴']

  return (
    <div className="section-page">
      <div className="part-badge">Part 4</div>
      <h2 className="section-heading">Side-by-Side Comparison</h2>
      <p className="body-text">
        The table below summarises the headline numbers for quick comparison. Treat these as indicative ranges only; always request a current, itemised fee structure in writing from the specific university.
      </p>
      <div className="comparison-scroll">
        <table className="comparison-table">
          <thead>
            <tr>
              <th>Factor</th>
              {countries.map(c => <th key={c}>{c}</th>)}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, i) => (
              <tr key={i}>
                <td className="factor-col">{row.label}</td>
                {row.vals.map((v, j) => (
                  <td key={j} className={row.label === 'FMGE pass-rate trend' ? (j <= 1 ? 'td-good' : j === 2 ? 'td-ok' : 'td-bad') : ''}>{v}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="notice-box">
        <strong>A note on interpreting FMGE pass rates:</strong> These figures reflect outcomes for past batches of students from each country and can vary significantly by individual university, by year, and by how well-prepared the student was; they are not a guarantee of your personal outcome. However, persistently low country-wide or university-wide pass rates are a meaningful signal about curriculum alignment with the Indian exam pattern, and should weigh heavily in your decision alongside cost and comfort factors.
      </div>
    </div>
  )
}

function P5() {
  return (
    <div className="section-page">
      <div className="part-badge">Part 5</div>
      <h2 className="section-heading">Admission Process, Documents and Visa</h2>

      <h3 className="sub-heading">5.1 Typical Step-by-Step Admission Process</h3>
      <div className="steps-list">
        {[
          { step: 6, text: 'Take NEET-UG and obtain a qualifying score (mandatory for every Indian student, regardless of the foreign country\'s own requirements).' },
          { step: 7, text: 'Shortlist universities only after verifying each on the WDOMS website (wdoms.org) for your target country. Verify each institution by its full legal name.' },
          { step: 8, text: 'Apply directly to the university (or through a verified consultancy) with academic records, passport copy, NEET scorecard, and photographs.' },
          { step: 9, text: 'Receive a provisional/conditional offer letter from the university; verify this is issued on official letterhead and, where possible, confirm directly with the university\'s admissions office (via official email/portal, not only the agent).' },
          { step: 10, text: 'Pay the first instalment of tuition (and any genuinely required registration fee) only after verifying the offer and the university\'s bank details independently.' },
          { step: 11, text: 'Apply for the student visa for the destination country, submitting the admission letter, financial proof, accommodation proof, and (where required) medical fitness and health insurance documents.' },
          { step: 12, text: 'Get all relevant educational certificates apostilled/attested as required by the destination country\'s regulations (procedures vary by country and sometimes by Indian state).' },
          { step: 13, text: 'Travel, complete local registration/enrolment formalities, and register with the host country\'s medical regulatory body as required.' },
        ].map((s) => (
          <div key={s.step} className="step-item">
            <div className="step-num">{s.step}</div>
            <div className="step-text">{s.text}</div>
          </div>
        ))}
      </div>

      <h3 className="sub-heading">5.2 Document Checklist</h3>
      <ul className="content-list check-list">
        <li>Original and photocopies of Class 10 and Class 12 mark sheets and certificates</li>
        <li>Birth certificate (proof of age)</li>
        <li>Valid passport (check minimum validity requirements for your destination, often 6–12 months)</li>
        <li>Passport-size photographs (carry extra; specifications vary by country)</li>
        <li>NEET-UG scorecard / admit card</li>
        <li>University offer/admission letter</li>
        <li>Government ID proof (Aadhaar, PAN, etc.)</li>
        <li>Medical fitness certificate (if required by the university/embassy)</li>
        <li>Bank statements / financial proof showing ability to cover fees and living costs</li>
        <li>Proof of health/travel insurance (often mandatory for student visas)</li>
        <li>Apostilled/attested copies of academic certificates, as required by the destination country</li>
      </ul>
      <div className="highlight-box">
        It is wise to carry <strong>10–15 photocopies</strong> of every key document, plus scanned digital copies stored securely (e.g., in cloud storage accessible from abroad), since originals can be needed unexpectedly for local registrations, bank account opening, or SIM card purchases abroad.
      </div>

      <h3 className="sub-heading">5.3 Visa Considerations</h3>
      <p className="body-text">
        Student visa timelines vary considerably by country. Egypt, for example, can take two months or more after document submission, while some other countries can be comparatively quicker. Build in a generous buffer (often 2–3 months) before your intake date, and avoid booking non-refundable flights until your visa is actually approved.
      </p>
      <p className="body-text">
        Health/medical insurance is commonly a mandatory visa requirement; check whether the university provides this as part of the fee or whether you must arrange it separately.
      </p>
      <div className="drexpert-cta">
        Need help collecting, attesting and submitting your documents, or filing your student visa application correctly? <strong>Dr Expert Edu guides students through the entire documentation and visa process step by step</strong>, reducing delays and rejections.
      </div>
    </div>
  )
}

function P6() {
  return (
    <div className="section-page">
      <div className="part-badge">Part 6</div>
      <h2 className="section-heading">What Life Abroad Is Really Like</h2>

      <h3 className="sub-heading">6.1 Climate and Health Adjustment</h3>
      <p className="body-text">
        Climate is often underestimated in decision-making but has a real effect on a 6-year experience. Students moving from tropical India to Uzbekistan, Bulgaria, or Georgia will face genuinely cold winters (sometimes well below 0°C) for the first time; this requires proper winter clothing, heating-equipped accommodation, and an adjustment period that can affect health and mood (including seasonal low mood, which is a recognised and common experience for students moving to colder climates). By contrast, Egypt's hot, dry climate is generally closer to what many Indian students from hotter regions are accustomed to.
      </p>

      <h3 className="sub-heading">6.2 Food, Accommodation and Community</h3>
      <p className="body-text">
        Most universities offer hostel/dormitory accommodation, and larger student hubs (e.g., Tbilisi and Batumi in Georgia, Bucharest and Cluj-Napoca in Romania, and university towns in Uzbekistan) typically have access to Indian grocery stores, restaurants, and informal community networks of Indian students.
      </p>
      <p className="body-text">
        Smaller or newer destinations may have far fewer such support systems; ask specifically about the size of the existing Indian student community at your chosen campus, not just the country as a whole.
      </p>

      <h3 className="sub-heading">6.3 Homesickness, Attrition and Mental Health</h3>
      <p className="body-text">
        A 6-year (or longer) commitment abroad, often starting at age 17–18, is a major life transition. It is common, and not a sign of failure, for some students to struggle with homesickness, especially in the first year. Some students do discontinue and return to India partway through.
      </p>
      <p className="body-text">
        Before departure, it is worth discussing realistic expectations as a family, identifying support contacts (seniors, alumni groups, university counsellors) at the destination, and planning realistic visit-home schedules around academic breaks (noting that some countries, like Bulgaria, offer only short inter-semester breaks).
      </p>
    </div>
  )
}

function P7() {
  return (
    <div className="section-page">
      <div className="part-badge">Part 7</div>
      <h2 className="section-heading">The Road Back (What Happens After You Graduate)</h2>

      <h3 className="sub-heading">7.1 The Return Pathway to Practise in India</h3>
      <div className="steps-list">
        {[
          { step: 14, text: 'Complete the foreign degree, including its mandatory 12-month internship in the country of study.' },
          { step: 15, text: 'Register (where applicable) with that country\'s medical regulatory authority.' },
          { step: 16, text: 'Return to India and register for, then attempt, the FMGE (or NExT once fully implemented) conducted by NBEMS.' },
          { step: 17, text: 'Clear the screening exam (note the historically low overall pass rates discussed earlier); many candidates need multiple attempts.' },
          { step: 18, text: 'Complete a further 12-month supervised internship in India.' },
          { step: 19, text: 'Apply for permanent registration with the relevant State Medical Council / NMC to legally practise medicine in India.' },
        ].map(s => (
          <div key={s.step} className="step-item">
            <div className="step-num">{s.step}</div>
            <div className="step-text">{s.text}</div>
          </div>
        ))}
      </div>
      <div className="alert-box alert-warning">
        <strong>Realistic Timeline:</strong> The full journey from joining an MBBS-abroad programme to being legally able to practise independently in India can take <strong>7–9 years or more</strong> once you account for the foreign course, the foreign internship, FMGE/NExT preparation and (often) multiple attempts, and the Indian internship. This is significantly longer than the nominal "6 years" quoted by many consultancies, and should be factored into both financial planning and personal expectations.
      </div>

      <h3 className="sub-heading">Choosing Your Country Based on Your Career Goal</h3>
      <p className="body-text">One of the most important and most overlooked questions is: <strong>where do you ultimately want to work?</strong> Your answer should directly influence which country you study in. Here is a practical framework:</p>
      <div className="career-grid">
        {[
          { goal: 'Practise in India (FMGE/NExT route)', rec: 'Uzbekistan or Georgia', detail: 'Both have above-average FMGE outcomes, English-medium instruction throughout, and curriculum structures that align reasonably well with the Indian exam pattern.' },
          { goal: 'Work in GCC countries (UAE, Saudi Arabia, Qatar, etc.)', rec: 'Egypt', detail: 'Proximity to the Gulf, regional recognition of Egyptian medical degrees, and familiarity with the broader Arab healthcare environment can be practical advantages.' },
          { goal: 'Work in Europe or pursue European postgraduate study', rec: 'Bulgaria or Romania', detail: 'Both are EU member states with EU-accredited degrees under the ECTS system. This opens pathways to practice in other EU countries.' },
          { goal: 'Pursue US licensing (USMLE) or UK licensing (PLAB)', rec: 'Georgia', detail: 'Some Georgian universities have curricula and clinical exposure that align better with international exam preparation. Discuss this specifically with the university before enrolling.' },
        ].map((item, i) => (
          <div key={i} className="career-card">
            <div className="career-goal">🎯 {item.goal}</div>
            <div className="career-rec">→ {item.rec}</div>
            <p className="body-text small-text">{item.detail}</p>
          </div>
        ))}
      </div>

      <h3 className="sub-heading">7.2 Other Career Paths</h3>
      <p className="body-text">
        Not every graduate plans to return and practise in India immediately. Some graduates pursue further licensing exams abroad (for example, the USMLE in the United States or PLAB in the United Kingdom), or pursue postgraduate study in the country where they graduated (especially relevant for EU-recognised Bulgarian and Romanian degrees, which carry broader recognition across Europe).
      </p>
      <p className="body-text">
        If this is part of your plan, research the specific additional exams, costs, and visa pathways involved well in advance; they are entirely separate processes from the Indian FMGE/NExT route.
      </p>
      <div className="drexpert-cta">
        Planning ahead for FMGE/NExT, or thinking about your career path after graduating? <strong>Dr Expert Edu offers structured guidance and coaching referrals</strong> so you can prepare for the screening exam well before your final year.
      </div>
    </div>
  )
}

function P8() {
  const items = [
    'I have personally verified the exact university name on WDOMS (wdoms.org) using the university\'s full legal name.',
    'I have a qualifying NEET-UG score for the relevant admission cycle (or understand the score-validity rules if using a previous year\'s score).',
    'I have checked the specific university\'s (not just the country\'s) recent FMGE/NExT pass rate.',
    'I have confirmed that the entire programme, including clinical years, is taught in English.',
    'I have an itemised, written breakdown of ALL costs: tuition, hostel, food, insurance, visa, exam fees, and any agent/service charges.',
    'I understand the realistic total duration: foreign course + foreign internship + FMGE/NExT prep (possibly multiple attempts) + Indian internship.',
    'I have spoken to, or read verifiable accounts from, current students or recent graduates of this specific university.',
    'I understand the climate, food, language, and community situation at the specific campus (not just the country).',
    'I have a plan and budget for dedicated FMGE/NExT coaching, ideally starting well before the final year.',
    'I have NOT been pressured into paying before independently verifying recognition status, and any consultancy fees I pay are documented with clear refund terms.',
  ]
  const [checked, setChecked] = useState([])
  const toggle = i => setChecked(p => p.includes(i) ? p.filter(x => x !== i) : [...p, i])
  const allDone = checked.length === items.length

  return (
    <div className="section-page">
      <div className="part-badge">Part 8</div>
      <h2 className="section-heading">Final Checklist Before You Sign Anything</h2>
      <p className="body-text">Use this as a final go/no-go checklist before paying any fee or signing any agreement. Tap each item to mark it done.</p>
      <div className="final-checklist">
        {items.map((item, i) => (
          <div key={i} className={`final-check-item ${checked.includes(i) ? 'final-checked' : ''}`} onClick={() => toggle(i)}>
            <div className={`final-box ${checked.includes(i) ? 'final-box-done' : ''}`}>{checked.includes(i) ? '✓' : ''}</div>
            <p className="body-text small-text">{item}</p>
          </div>
        ))}
      </div>
      {allDone && (
        <div className="eligible-banner">
          ✅ All boxes checked. You are ready to make an informed decision.
        </div>
      )}
      {!allDone && (
        <p className="body-text caption-text" style={{ textAlign: 'center', marginTop: 12 }}>
          {checked.length}/{items.length} completed
        </p>
      )}
    </div>
  )
}

function P9() {
  return (
    <div className="section-page">
      <div className="part-badge">Part 9</div>
      <h2 className="section-heading">Where to Verify Information / Further Reading</h2>
      <p className="body-text">
        This guide was compiled using publicly available information current as of June 2026. Because fees, recognition status, and regulations change frequently, always cross-check against these primary and official sources before making any decision:
      </p>

      <h3 className="sub-heading">Primary / Official Sources</h3>
      <div className="source-list">
        {[
          { name: 'WHO World Directory of Medical Schools (WDOMS)', url: 'wdoms.org', desc: 'The definitive international directory for verifying whether a medical university is recognised. Check every institution here before paying any fee.' },
          { name: 'National Medical Commission (NMC)', url: 'nmc.org.in', desc: "India's regulatory body for medical education; official regulations including FMGL Regulations 2021 are published here." },
          { name: 'National Board of Examinations in Medical Sciences (NBEMS)', url: 'natboard.edu.in', desc: 'Official FMGE/NExT results, including country-wise and university-wise pass rates.' },
        ].map((s, i) => (
          <div key={i} className="source-card">
            <h4 className="source-name">{s.name}</h4>
            <p className="source-url">🔗 {s.url}</p>
            <p className="body-text small-text">{s.desc}</p>
          </div>
        ))}
      </div>

      <h3 className="sub-heading">Indian Embassies / High Commissions</h3>
      <p className="body-text">Indian embassies in each destination country periodically publish advisories about universities, visa rules, and student issues. Always check the relevant embassy website before enrolling:</p>
      <ul className="content-list">
        <li>Indian Embassy in Uzbekistan (Tashkent)</li>
        <li>Indian Embassy in Georgia (Tbilisi)</li>
        <li>High Commission of India in Bulgaria (Sofia)</li>
        <li>Indian Embassy in Egypt (Cairo)</li>
        <li>Indian Embassy in Romania (Bucharest)</li>
      </ul>

      <h3 className="sub-heading">Secondary Sources Consulted</h3>
      <ul className="content-list small-text">
        <li>SCC Online: NMC (Foreign Medical Graduate Licentiate) Regulations, 2021</li>
        <li>Careers360: FMGE Pass Percentage Country Wise 2025</li>
        <li>CareerMarg: FMGE 2024 Country-Wise Success Rates</li>
        <li>SelectYourUniversity: MBBS in Uzbekistan</li>
        <li>LeapScholar: MBBS in Georgia for Indian Students</li>
        <li>UpGrad: MBBS in Bulgaria 2026</li>
        <li>Leap Scholar: MBBS in Egypt - Fees, Universities and NMC Rules</li>
        <li>University Insights: FMGE Pass Trend for Egyptian Graduates</li>
        <li>MBBS in Romania 2026: Top Universities and Fees</li>
        <li>CareerMarg: NMC Advisory on Unauthorised Medical Colleges and Fake MBBS Abroad Programs</li>
      </ul>

      <div className="final-cta">
        <img src={LOGO} alt="Dr Expert Edulinks" className="final-cta-logo" />
        <p className="body-text" style={{ textAlign: 'center' }}>
          Ready to take the next step? Speak to an expert at Dr Expert Edu before making any decision.
        </p>
        <a
          href="https://wa.me/918075558222?text=I%20read%20the%20MBBS%20Abroad%20Guide%20and%20want%20free%20counselling"
          target="_blank"
          rel="noreferrer"
          className="btn-wa"
        >
          <svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.121.554 4.112 1.523 5.847L.057 23.5l5.797-1.52A11.934 11.934 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.818 9.818 0 01-5.007-1.372l-.359-.213-3.44.902.917-3.347-.234-.374A9.818 9.818 0 1112 21.818z"/></svg>
          Get Free Counselling on WhatsApp
        </a>
      </div>
    </div>
  )
}

function Disclaimer() {
  return (
    <div className="section-page">
      <div className="part-badge">Disclaimer</div>
      <h2 className="section-heading">Disclaimer</h2>
      <p className="body-text">
        This document is an informational guide compiled from publicly available sources for general planning purposes. It is not legal, financial, or admissions advice. Fees, exchange rates, NMC recognition lists, visa rules, and FMGE/NExT pass rates change over time. Always verify current details directly with the National Medical Commission, the specific university, and your embassy/consulate before making any commitment.
      </p>
    </div>
  )
}

/* ─────────────────────────────────────────────────────────── */
/* SECTION RENDERER                                             */
/* ─────────────────────────────────────────────────────────── */

function renderSection(id, onJump) {
  switch (id) {
    case 'cover': return <Cover />
    case 'toc': return <TOC onJump={onJump} />
    case 'p1_intro': return <P1Intro />
    case 'p1_1': return <P1_1 />
    case 'p1_2': return <P1_2 />
    case 'p1_3': return <P1_3 />
    case 'p1_4': return <P1_4 />
    case 'p2': return <P2 />
    case 'p2b': return <P2B />
    case 'p3_intro': return <P3Intro />
    case 'p3_uz': return <P3_UZ />
    case 'p3_ge': return <P3_GE />
    case 'p3_bu': return <P3_BU />
    case 'p3_eg': return <P3_EG />
    case 'p3_ro': return <P3_RO />
    case 'p4': return <P4 />
    case 'p5': return <P5 />
    case 'p6': return <P6 />
    case 'p7': return <P7 />
    case 'p8': return <P8 />
    case 'p9': return <P9 />
    case 'disclaimer': return <Disclaimer />
    default: return null
  }
}

/* ─────────────────────────────────────────────────────────── */
/* APP SHELL                                                    */
/* ─────────────────────────────────────────────────────────── */

export default function App() {
  const [verified, setVerified] = useState(() => localStorage.getItem('drexpert_verified') === '1')
  const [idx, setIdx] = useState(0)
  const [menuOpen, setMenuOpen] = useState(false)

  if (!verified) {
    return <LeadGate onVerified={() => setVerified(true)} />
  }

  const goTo = (id) => {
    const i = SECTIONS.findIndex(s => s.id === id)
    if (i >= 0) { setIdx(i); setMenuOpen(false) }
  }
  const goNext = () => { if (idx < SECTIONS.length - 1) setIdx(i => i + 1); window.scrollTo(0, 0) }
  const goPrev = () => { if (idx > 0) setIdx(i => i - 1); window.scrollTo(0, 0) }

  const pct = Math.round(((idx + 1) / SECTIONS.length) * 100)

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <img src={LOGO} alt="Dr Expert Edulinks" className="header-logo" />
        <button className="menu-btn" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          {menuOpen ? '✕' : '☰'}
        </button>
      </header>

      {/* Side Menu */}
      {menuOpen && (
        <div className="menu-overlay" onClick={() => setMenuOpen(false)}>
          <div className="menu-panel" onClick={e => e.stopPropagation()}>
            <p className="menu-heading">All Sections</p>
            {SECTIONS.map((s, i) => (
              <button
                key={s.id}
                className={`menu-item ${i === idx ? 'menu-active' : ''} ${i < idx ? 'menu-done' : ''}`}
                onClick={() => { setIdx(i); setMenuOpen(false); window.scrollTo(0,0) }}
              >
                {i < idx ? '✓ ' : ''}{s.short}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Progress */}
      <div className="progress-wrap">
        <div className="progress-track">
          <div className="progress-fill" style={{ width: pct + '%' }} />
        </div>
        <span className="progress-label">{idx + 1}/{SECTIONS.length}</span>
      </div>

      {/* Current section title strip */}
      <div className="section-strip">
        <span className="section-strip-text">{SECTIONS[idx].title}</span>
      </div>

      {/* Content */}
      <main className="main">
        {renderSection(SECTIONS[idx].id, goTo)}
      </main>

      {/* Bottom Nav */}
      <nav className="bottom-nav">
        <button className="nav-btn" onClick={goPrev} disabled={idx === 0}>← Back</button>
        <div className="nav-center">
          <span className="nav-label">{SECTIONS[idx].short}</span>
        </div>
        <button className="nav-btn nav-btn-next" onClick={goNext} disabled={idx === SECTIONS.length - 1}>
          {idx === SECTIONS.length - 1 ? 'Done' : 'Next →'}
        </button>
      </nav>
    </div>
  )
}
