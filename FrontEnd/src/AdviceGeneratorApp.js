import { useEffect, useState } from 'react'
import axios from 'axios'
import './AdviceGeneratorApp.scss'
import SignupModal from './AGAcomponents/SignupModal'
import LoginModal from './AGAcomponents/LoginModal'
import FavoritesModal from './AGAcomponents/FavoritesModal'

function AdviceGeneratorApp () {
  const [adviceId, setAdviceId] = useState('')
  const [advice, setAdvice] = useState('')
  const [openSignupModal, setOpenSignupModal] = useState(false)
  const [openLoginModal, setOpenLoginModal] = useState(false)
  const [openFavoritesModal, setOpenFavoritesModal] = useState(false)
  const [profile, setProfile] = useState(false)
  const [user, setUser] = useState('')
  const [favorites, setFavorites] = useState('')
  const [getAdvices, setGetAdvices] = useState('')

  useEffect(() => {
    getAdvice()
  }, [])

  const getAdvice = () => {
    axios
      .get(`https://api.adviceslip.com/advice`)
      .then(({ data }) => {
        setAdvice(data.slip.advice)
        setAdviceId(data.slip.id)
      })
      .catch(err => console.error('Error:', err))
  }

  useEffect(() => {
    if (localStorage.getItem('token')) {
      axios
        .post('http://localhost:8000/user/verify', {
          token: localStorage.getItem('token')
        })
        .then(({ data }) => {
          setUser(data)
        })
        .catch(err => console.error('Error:', err))
    }
  }, [user])

  useEffect(() => {
    axios
      .get('http://localhost:8000/advice')
      .then(({ data }) => {
        setGetAdvices(data)
      })
      .catch(err => console.error('Error:', err))
  }, [getAdvices])

  const saveAdvice = () => {
    axios
      .post('http://localhost:8000/advice/', {
        advice: favorites,
        owner: user._id
      })
      .catch(err => console.error('Error:', err))
  }

  const deleteAdvice = async id => {
    const data = await fetch('http://localhost:8000/advice/' + id, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .catch(err => console.error('Error:', err))

    setGetAdvices(getAdvices =>
      getAdvices.filter(getAdvice => getAdvice._id !== data._id)
    )
  }

  return (
    <div className='App'>
      {profile ? (
        <div id='navBar'>
          <h1 className='user-name'>{user.username}</h1>

          <a
            onClick={() => {
              setFavorites(advice)
            }}
          >
            like
          </a>
          <a
            onClick={() => {
              saveAdvice()

              setOpenFavoritesModal(true)
            }}
          >
            My favorite
          </a>
        </div>
      ) : (
        <div id='navBar'>
          <a
            onClick={() => {
              setOpenSignupModal(true)
            }}
          >
            Signup
          </a>
          <a
            onClick={() => {
              setOpenLoginModal(true)
            }}
          >
            Login
          </a>
        </div>
      )}

      <SignupModal
        setOpenSignupModal={setOpenSignupModal}
        setOpenLoginModal={setOpenLoginModal}
        open={openSignupModal}
        onClose={() => {
          setOpenSignupModal(false)
        }}
      />
      <LoginModal
        setProfile={setProfile}
        open={openLoginModal}
        onClose={() => {
          setOpenLoginModal(false)
        }}
      />
      <FavoritesModal
        getAdvices={getAdvices}
        deleteAdvice={deleteAdvice}
        open={openFavoritesModal}
        onClose={() => {
          setOpenFavoritesModal(false)
        }}
      />

      <div id='container'>
        <div id='advArea'>
          <h4 class='advId'>{adviceId}</h4>
          <h1 class='adv'>{advice}</h1>
        </div>
        <div id='theLines'>
          <hr class='line' />
          <hr class='dotes' />
          <hr class='dotes' />
          <hr class='line' />
        </div>
        <div id='button'>
          <button
            onClick={() => {
              getAdvice()
            }}
            class='btn'
          >
            <svg width='24' height='24' xmlns='http://www.w3.org/2000/svg'>
              <path
                d='M20 0H4a4.005 4.005 0 0 0-4 4v16a4.005 4.005 0 0 0 4 4h16a4.005 4.005 0 0 0 4-4V4a4.005 4.005 0 0 0-4-4ZM7.5 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm4.5 4.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Zm0-9a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3Z'
                fill='#202733'
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  )
}

export default AdviceGeneratorApp
