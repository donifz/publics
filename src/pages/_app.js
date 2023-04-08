import '@/styles/globals.css'
import 'react-datetime-picker/dist/DateTimePicker.css';
import 'react-calendar/dist/Calendar.css';
import 'react-clock/dist/Clock.css';

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
