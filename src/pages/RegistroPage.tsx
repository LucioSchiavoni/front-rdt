import TelefonoForm from '@/components/form/TelefonoForm'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react';

const RegistroPage = () => {
  return (
    <div className='' >
        <Link to='/dashboard' className='absolute top-10 left-10 rounded-md  border px-3 py-1 shadow-xl'>
        <ArrowLeft/>
        </Link>
        <article className='flex items-center py-24'>
            <TelefonoForm/> 
        </article>
       
        </div>
  )
}

export default RegistroPage