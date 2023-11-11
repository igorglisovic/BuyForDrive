import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Container from './Container'
import { faCarSide } from '@fortawesome/free-solid-svg-icons'
import { useLoadingBarContext } from '@app/store/loading-bar'
import { usePostCarContext } from '@app/store/post-car'

const LoadingBar = () => {
  const { loadingBar } = useLoadingBarContext()
  const { headerInView } = usePostCarContext()

  return (
    <div
      className={`py-7 static bg-hero-pattern shadow-lg ${
        headerInView ? 'static' : 'fixed min-w-full left-0 top-0 z-50'
      }`}
    >
      <Container>
        <div className="flex gap-4 ">
          <FontAwesomeIcon width={30} className="text-2xl" icon={faCarSide} />
          <div className="w-full relative">
            <div className="bottom-[50%] translate-y-[50%] w-full max-w-full h-2.5 bg-gradient-light-gray rounded-full"></div>
            <div
              className={`top-[50%] max-w-full translate-y-[-50%] h-2.5 bg-green-400 rounded-s-full ${
                loadingBar === 100 && 'rounded-e-full'
              }`}
              style={{
                width: `${loadingBar.toString()}%`,
                transition: 'all 1s',
              }}
            ></div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default LoadingBar
