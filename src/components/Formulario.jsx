import {useState, useEffect} from 'react';
import Error from './Error'

const Formulario = ({ pacientes, setPacientes, paciente, setPaciente }) => {

  const [nombre, setNombre] = useState('');
  const [propetario, setPropetario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');

  const [error, setError] = useState(false);

  useEffect(() => {
    if (Object.keys(paciente).length > 0) {
      setNombre(paciente.nombre);
      setPropetario(paciente.propetario);
      setEmail(paciente.email);
      setFecha(paciente.fecha);
      setSintomas(paciente.sintomas);
    }
  }, [paciente])

  const generarId = () => {
    const random = Math.random().toString(36).substr(2);
    const fecha = Date.now().toString(36);

    return fecha + random;
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    if ([nombre, propetario, email, fecha, sintomas].includes('')) {
      console.log('Todos los datos son obligatorios')
      setError(true);
      return;
    }

    setError(false);

    //objeto paciente
    const objetoPaciente = {
      nombre, 
      propetario, 
      email, 
      fecha, 
      sintomas,
      id: generarId()
    }

    if (paciente.id) {
      //Edit
      objetoPaciente.id = paciente.id

      const pacientesActualizados = pacientes.map( pacienteState => 
        pacienteState.id === paciente.id ? objetoPaciente : pacienteState)

        setPacientes(pacientesActualizados)
        setPaciente({})
    } else {
      // New register
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);
    }

    // reinicia
    setNombre('');
    setPropetario('');
    setEmail('');
    setFecha('');
    setSintomas('');
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-center text-3xl">Seguimiento Pacientes</h2>
      <p className="text-lg mt-5 text-center mb-10">
        Anade Pacientes y {''}
        <span className="text-indigo-600 font-bold">Administralos</span>
      </p>

      <form className="bg-white shadow-md rounded-lg py-5 px-5 mb-10" onSubmit={handleSubmit}>
        {error && <Error>Todos los campos son Obligatorios</Error>}
        <div className="mb-5">
          <label htmlFor="mascota" className="block text-gray-700 uppercase font-bold">Nombre Mascota</label>
          <input
            id="mascota"
            type="text"
            placeholder="Nombre de la Mascota"
            className="border-2 w-full p-2 mt-2 placeholder-gray-40 rounded-md"
            value={nombre}
            onChange={(e) => setNombre(e.currentTarget.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="propetario" className="block text-gray-700 uppercase font-bold">Nombre Propetario</label>
          <input
            id="propetario"
            type="text"
            placeholder="Nombre del propetario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-40 rounded-md"
            value={propetario}
            onChange={(e) => setPropetario(e.currentTarget.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="email" className="block text-gray-700 uppercase font-bold">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Email Contacto Propetario"
            className="border-2 w-full p-2 mt-2 placeholder-gray-40 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.currentTarget.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="alta" className="block text-gray-700 uppercase font-bold">Fecha de Alta</label>
          <input
            id="alta"
            type="date"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            value={fecha}
            onChange={(e) => setFecha(e.currentTarget.value)}
          />
        </div>
        <div className="mb-5">
          <label htmlFor="sintomas" className="block text-gray-700 uppercase font-bold">Fecha de Alta</label>
          <textarea 
            id="sintomas"
            className="border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md"
            placeholder="Describe los sintomas"
            value={sintomas}
            onChange={(e) => setSintomas(e.currentTarget.value)}
          />
        </div>

        <input 
          type="submit"
          value={paciente.id ? 'Editar Paciente' : 'Agregar Paciente'}
          className="bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-all"
        />
      </form>
    </div>
  )
}

export default Formulario
