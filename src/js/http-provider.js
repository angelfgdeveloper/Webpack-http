
const jokeUrl     = 'https://api.chucknorris.io/jokes/random';
const urlUsuarios = 'https://reqres.in/api/users?page=2';

// Cloudinary -- (Cl0ud1n4ry10)
const cloudPreset = 'al6pq22d';
const cloudUrl    = 'https://api.cloudinary.com/v1_1/dzixfhqqa/upload';

// fetch( jokeUrl ).then( resp => {
//   resp.json().then( ({ id, value }) => {
//     console.log( id );
//     console.log( value );
//   });
// });


// fetch( jokeUrl )
//     .then( resp => resp.json() )
//     .then( ({ id, value }) => {
//       console.log(id, value);
//     });


const obtenerChiste = async() => {

  try {
    const resp = await fetch( jokeUrl );
    if ( !resp.ok ) throw 'No se pudo realizar la peticion';
    // const chiste = await resp.json();

    const { icon_url, id, value } = await resp.json();

    // return await resp.json();
    return { icon_url, id, value };

  } catch (err) {
    throw err;
  }
  
}

const obtenerUsuarios = async() => {

  try {
    
    const resp = await fetch( urlUsuarios );
    const { data: usuarios } = await resp.json();
    
    return usuarios;

  } catch (err) {
    throw err;
  }

}

// ArchivoSubir :: File
const subirImagen = async( archivoSubir ) => {

  const formData = new FormData();
  formData.append('upload_preset', cloudPreset );
  formData.append('file', archivoSubir );

  try {

    const resp = await fetch( cloudUrl, {
      method: 'POST',
      body: formData
    });

    if ( resp.ok ) {
      const cloudResp = await resp.json();
      // console.log(cloudResp);
      return cloudResp.secure_url;
    } else {
      throw await resp.json();
    }
    
  } catch (err) {
    throw err;
  }

}


export {
  obtenerChiste,
  obtenerUsuarios,
  subirImagen
}