import DesktopShell from './components/DesktopShell'
import MobileHome from './components/MobileHome'
import { useMediaQuery } from './hooks/useMediaQuery'

export default function App() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  return isMobile ? <MobileHome /> : <DesktopShell />
}
