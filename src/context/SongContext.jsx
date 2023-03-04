import { useState, useEffect, createContext, useContext } from 'react'
import canciones from '@/assets/listaCanciones'
// CONTEXT tiene que ver con el manejo de estados globales en React
// Es decir, para poder compartir LA MISMA informacion entre diferentes niveles de componentes.

// Para usar Context, necesitamos seguir una serie de pasos

// #1 creacion del contexto

const SongContext = createContext()

// #2 Creacion del provedor del contexto
// Es decir, maneja de donde se obtiene y como se pasa la info

function SongProvider (props) {
  const [list, setList] = useState([])// data de la API
  const [loading, setLoading] = useState(true)// nos indica cuando los datos esten disponibles

  const [selectedSong, setSelectedSong] = useState({}) // nos dira que cancion esta seleccionada

  // Simulo la llamada a la API
  useEffect(() => {
    setTimeout(() => {
      setList(canciones)
      setLoading(false)
    }, 2000)
  }, [])

  // Tenemos que indicar al provider, que datos debe proveer
  // estos datos son publicos para que todos los componentes
  const values = {
    list,
    loading,
    selectedSong,
    setSelectedSong
  }

  return (
    // Siempre se llama VALUE el prop cdel Prvider con la data
    // value es un objeto que indica que datos son globales
    <SongContext.Provider value={values} {...props} />
  )
}

// #3 Consumidor del contexto
// brinda acceso a la data del componente
const useSongContext = () => {
  const context = useContext(SongContext)
  return context
}

// #4 exportar las funciones del Provider y el Consumer
export {
  SongProvider,
  useSongContext
}

/* USO DE CONTEXT */
// #5 Ahora debemos ir a un componente de orden superior (por ejemplo App) o en nuestro caso Home y envolver a los compornentes que haran uso del Provider, con la etiqueta de <SongProvider>
