import {useState, createContext, useEffect} from "react"


const Context = createContext()

function ContextProvider({children}) {
    // const [veggie, setVeggie] = useState([])
    
    // const [cuisine, setCuisine] = useState([]) 
    // const [details, setDetails] = useState({})
    const [searchedShows, setSearchedShows] = useState([]) 
    const [showInfo, setShowInfo] = useState([]) 
    const [castInfo, setCastInfo] = useState([]) 
    const [episodes, setEpisodes] = useState([]) 
    const [actorInfo, setActorInfo] = useState([])
    const [actorCredits, setActorCredits] = useState([])
    const [watchlist, setWatchlist] = useState([])
    const [list, setList] = useState(() => JSON.parse(localStorage.getItem("myShows")) || [])
    const [schedule, setSchedule] = useState([])
    

    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '3819d4d7e1mshb60c35661a89497p1aa61djsnc8a15ba96b17',
        'X-RapidAPI-Host': 'unogs-unogs-v1.p.rapidapi.com'
      }
    };
    
      const getSchedule = async() => {
        const popularCheck = localStorage.getItem('popularTV')
       if(popularCheck) {
          setSchedule(JSON.parse(popularCheck))
            } else {
        const scheduleData = await fetch('https://unogs-unogs-v1.p.rapidapi.com/search/titles?start_year=2023&type=series&order_by=date', options)
        const scheduleDataShows = await scheduleData.json()
        localStorage.setItem('popularTV', JSON.stringify(scheduleDataShows.results))
        setSchedule(scheduleDataShows.results)
          }
    }

      const getSearched = async(name) => {
        const searchedData = await fetch(`https://api.tvmaze.com/search/shows?q=${name}`)
        const searchedShowsData = await searchedData.json()
        setSearchedShows(searchedShowsData.slice(0,10))
        
    }

    //   const findProgramme = async(name) => {
    //     console.log(name)
    //     const programmeData = await fetch(`https://api.tvmaze.com/lookup/shows?thetvdb=${name}`)
    //     const foundProgrammeData = await programmeData.json()
    //     setShowInfo(foundProgrammeData)  
    // }
      function findProgramme(name) {
         fetch(`https://api.tvmaze.com/lookup/shows?thetvdb=${name}`)
        .then(res => res.json())
        .then(data => setShowInfo(data)   )    
    }

      const findCast = async(id) => {
        const CastData = await fetch(`https://api.tvmaze.com/shows/${id}/cast`)
        const foundCastData = await CastData.json()
        setCastInfo(foundCastData)
      }

      const findEpisodes = async(id) => {
        const EpisodeData = await fetch(`https://api.tvmaze.com/shows/${id}?embed=episodes`)
        const foundEpisodeData = await EpisodeData.json()
        setEpisodes(foundEpisodeData)
      }

      const findActor = async(id) => {
        const ActorData = await fetch(`https://api.tvmaze.com/people/${id}?embed=castcredits`)
        const foundActorData = await ActorData.json()
        setActorInfo(foundActorData)
      }
      
      const findActorCredits = async(id) => {
        const ActorCreditData = await fetch(`https://api.tvmaze.com/people/${id}/castcredits?embed=show`)
        const foundActorCreditData = await ActorCreditData.json()
        setActorCredits(foundActorCreditData)
      }

      function addToWatchList(newItem) {
        setWatchlist(prevItems => [...prevItems, newItem])
        setList(prevItems => [...prevItems, newItem]) 
        // localStorage.setItem('myShows', JSON.stringify(watchlist))
        console.log(newItem)
    }

    function getWatchList()  {
      const check = localStorage.getItem('myShows')
     if(check) {
        setList(JSON.parse(check))
         console.log(list?.length)
      } else {
        console.log("No list")
      }
    }

    function removeFromList(id) {
      setList(prevItems => prevItems.filter(item => item.id !== id))
      console.log(list)

  }

  useEffect(() => {
    localStorage.setItem('myShows', JSON.stringify(list))
  }, [list])
    // useEffect(() => {
    //   localStorage.setItem('myShows', JSON.stringify(watchlist))
    // }, [])

    


    
    return (
        <Context.Provider value={{
            schedule,
            getSchedule,
            searchedShows,
            getSearched,
            showInfo,
            findProgramme,
            castInfo,
            findCast,
            episodes,
            findEpisodes,
            actorInfo,
            findActor,  
            actorCredits,
            findActorCredits,
            watchlist,
            addToWatchList,
            list,
            getWatchList,
            removeFromList
            
          }}>
            {children}
        </Context.Provider>
    )
}

export {ContextProvider, Context}