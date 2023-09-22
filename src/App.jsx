import React, {useState} from 'react'
import axios from 'axios'

const App = () => {

  const [data, setData] = useState('')
  const [userLink, setUserLink] = useState('')
  const [loading, setLoading] = useState(false)
  const [selectedUrl, setSelectedUrl] = useState(null)


  const fetchData = async () => {
    setLoading(true);
    
    const options = {
      method: 'GET',
      url: 'https://youtube-audio-video-download.p.rapidapi.com/geturl',
      params: {
        video_url: userLink,
      },
      headers: {
        'X-RapidAPI-Key': import.meta.env.VITE_RAPID_API_KEY,
        'X-RapidAPI-Host': 'youtube-audio-video-download.p.rapidapi.com',
      },
    };

    try {
      const response = await axios.request(options);
      setData(response.data);
      console.log(response.data)
    }catch(err){
      console.log(err)
    }finally{
      setLoading(false)
    }
  };


  return (
    <main>
      
      <div className='flex items-center justify-center mt-3'>
        <input type="text" onChange={(e)=> setUserLink(e.target.value)} value={userLink} placeholder="Inserisci qui il link" className="input input-bordered input-secondary w-full max-w-xs" />
        <button onClick={fetchData} className="btn btn-outline btn-info ms-3">Search</button>
      </div>

      {loading ? 
        <div className='flex items-center justify-center w-screen h-screen'>
          <span className="loading loading-spinner text-primary"></span>
        </div> : 
        
        data.title ? 
      
        <div className='flex justify-center items-center mt-14'>
          <div className="card w-[350px] md:w-[650px] bg-base-100 shadow-xl h-auto">
            <figure><img src={data.thumbnail} alt="Thumbnail" /></figure>
            <div className="card-body">
              <h2 className="card-title text-blue-500">
                {data.title}
                <div className="badge badge-secondary"><span className='mr-1'>Views:</span>{data.view_count}</div>
              </h2>
              <h3 className='text-2xl text-green-500'>Description:</h3>
              <p className='break-words text-white'>{data.description}</p>
              <div className="card-actions justify-end mt-6">
                {data.tags.map((element,index)=>(
                  <div className='badge text-orange-400' key={index}>{element}</div>
                ))}
              </div>
              <div className='flex items-center justify-center'>
                  <select onChange={(e) => setSelectedUrl(data.formats[e.target.selectedIndex - 1].url)} className="select select-secondary w-full max-w-xs mt-6">
                  <option disabled selected>Download Option</option>
                  {data.formats.map((element,index)=>(
                    <option key={index}>{element.ext} {element.format_note} {element.protocol} - {element.audio_channels ? `Audio Channel: ${element.audio_channels}` : ""}</option>
                  ))}
                </select>
                <button className='ms-4 mt-4'>
                    <a href={selectedUrl} download="video.mp4" className="btn btn-primary mt-2" disabled={!selectedUrl}>Scarica</a>
                </button>
              </div>
            </div>
          </div>
        </div>
  
          : 
        
        <h3 className='text-center mt-12 text-red-500 font-bold'>"Something Wrong, Retry!"</h3>
      }
    </main>
  )
}

export default App