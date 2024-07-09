import { useEffect, useState } from 'react'
import Amster from './icons/Amster'
import { levelPoints, levelNames } from './constants'

const calcProgress = (index: number, points: number) => {
  if (index >= levelNames.length - 1) {
    return 100
  }
  const currentLevel = levelPoints[index]
  const nextLevel = levelPoints[index + 1]
  const progress = ((points - currentLevel) / (nextLevel - currentLevel)) * 100
  return Math.min(progress, 100)
}
function App() {
  const [levelIndex, setLevelIndex] = useState(5)
  const [points, setPoints] = useState(20000000)
  const [clicks, setClicks] = useState<{ id: number; x: number; y: number }[]>(
    []
  )
  const pointsToAdd = 11

  const handleCoinClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    card.style.transform = `perspective(1000px) rotateX(${
      -y / 10
    }deg) rotateY(${x / 10}deg)`
    setTimeout(() => {
      card.style.transform = ''
    }, 100)

    setPoints(points + pointsToAdd)
    setClicks([...clicks, { id: Date.now(), x: e.pageX, y: e.pageY }])
  }
  const handleAnimationEnd = (id: number) => {
    setClicks(prevClicks => prevClicks.filter(click => click.id !== id))
  }
  useEffect(() => {
    const currentLevelMin = levelPoints[levelIndex]
    const nextLevelMin = levelPoints[levelIndex + 1]
    if (points >= nextLevelMin && levelIndex < levelNames.length - 1) {
      setLevelIndex(levelIndex + 1)
    } else if (points < currentLevelMin && levelIndex > 0) {
      setLevelIndex(levelIndex - 1)
    }
  }, [points, levelIndex])

  return (
    <>
      <div className='bg-black flex justify-center h-full'>
        <div className='w-full bg-black text-white h-screen font-bold flex flex-col max-w-xl'>
          <div className='px-4 z-10'>
            <div className='flex items-center space-x-2 pt-4'>
              <div className='p-1 rounded-lg bg-[#1d2025]'>
                <Amster size={24} className='text-[#d4d4d4]' />
              </div>
              <div>
                <p className='text-sm'>Boss (CEO)</p>
              </div>
            </div>
            <div className='flex items-center justify-between space-x-4 mt-1'>
              <div className='flex items-center w-1/3'>
                <div className='w-full'>
                  <div className='flex justify-between'>
                    <p className='text-sm'>{levelNames[levelIndex]}</p>
                    <p className='text-sm'>
                      {levelIndex + 1}{' '}
                      <span className='text-[#95908a]'>
                        / {levelNames.length}
                      </span>
                    </p>
                  </div>
                  <div className='flex items-center mt-1 border-2 border-[#43433b] rounded-full'>
                    <div className='w-full h-2 bg-[#43433b]/[0.6] rounded-full'>
                      <div
                        className='progress-gradient h-2 rounded-full'
                        style={{
                          width: `${calcProgress(levelIndex, points)}%`,
                        }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className='flex-grow mt-4 bg-[#f3ba2f] rounded-t-[48px] relative top-glow z-0'>
            <div className='absolute top-[2px] left-0 right-0 bottom-0 bg-[#1d2025] rounded-t-[46px]'>
              <div className='px-4 mt-4 flex justify-center'>
                <div className='px-4 py-2 flex items-center space-x-2'>
                  <img
                    src='/dollar-coin.png'
                    alt='Dollar Coin'
                    className='w-10 h-10'
                  />
                  <p className='text-4xl text-white'>
                    {points.toLocaleString()}
                  </p>
                </div>
              </div>

              <div className='px-4 mt-4 flex justify-center'>
                <div
                  className='w-80 h-80 p-4 rounded-full circle-out'
                  onClick={handleCoinClick}
                >
                  <div className='w-full h-full rounded-full circle-in'>
                    <img
                      src='/main-character.png'
                      alt='Main Character'
                      className='w-full h-full'
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {clicks.map(click => (
          <div
            key={click.id}
            className='absolute text-5xl font-bold opacity-0 text-white pointer-events-none'
            style={{
              top: `${click.y - 42}px`,
              left: `${click.x - 28}px`,
              animation: `float 1s ease-out`,
            }}
            onAnimationEnd={() => handleAnimationEnd(click.id)}
          >
            {pointsToAdd}
          </div>
        ))}
      </div>
    </>
  )
}

export default App
