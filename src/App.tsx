import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/layout/Layout'
import { About } from './pages/About'
import { CoaLookup } from './pages/CoaLookup'
import { Contact } from './pages/Contact'
import { Faq } from './pages/Faq'
import { Home } from './pages/Home'
import { HowItWorks } from './pages/HowItWorks'
import { InfoPage } from './pages/InfoPage'
import { NotFound } from './pages/NotFound'
import { RequestTesting } from './pages/RequestTesting'
import { Services } from './pages/Services'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/coa-lookup" element={<CoaLookup />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/request-testing" element={<RequestTesting />} />
          <Route path="/terms" element={<InfoPage slug="terms" />} />
          <Route path="/privacy" element={<InfoPage slug="privacy" />} />
          <Route path="/methodology" element={<InfoPage slug="methodology" />} />
          <Route path="/compliance" element={<InfoPage slug="compliance" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
