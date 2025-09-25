import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

function Detalle() {
  const { depto, municipio } = useParams();
  const [municipioData, setMunicipioData] = useState(null);

  useEffect(() => {
    if (!depto || !municipio) return;

    const url = `https://gist.githubusercontent.com/diaztibata/fe3d238ee6b59ef71c8001654441a9f6/raw/225cef5e16b3997317e205a08a64985c9903f3c7/municipios-${encodeURIComponent(depto)}.json`;

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error: ${response.status}`);

        const data = await response.json(); // data.mun es el array

        const encontrado = data.mun.find((item) => item.id === municipio);

        if (!encontrado) {
          console.warn(`Municipio con id "${municipio}" no encontrado.`);
        }

        setMunicipioData(encontrado);
      } catch (error) {
        console.error("Error al cargar el JSON:", error);
      }
    };

    fetchData();
  }, [depto, municipio]);

  if (!municipioData) return <p>Cargando municipio...</p>;

  return (
    <div>
      <h1>{municipioData.nm}</h1>
      <p>ID: {municipioData.id}</p>
      <p>TVN: {municipioData.tvn}</p>
      <p>PVN: {municipioData.pvn}</p>
      <p>VNM: {municipioData.vnm}</p>
    </div>
  );
}

export default Detalle;
