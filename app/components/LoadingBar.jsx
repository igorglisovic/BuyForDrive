import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Container from './Container'
import {
  faCar,
  faCarOn,
  faCarSide,
  faLeftLong,
} from '@fortawesome/free-solid-svg-icons'

const LoadingBar = ({ loadingState }) => {
  return (
    <div className="py-7 bg-hero-pattern shadow-lg">
      <Container>
        <div className="flex gap-4 ">
          <FontAwesomeIcon width={35} className="text-2xl" icon={faCarSide} />
          <div className="w-full relative">
            <div className="absulute bottom-[50%] translate-y-[50%] w-full h-2.5 bg-gradient-light-gray rounded-full"></div>
            <div
              className={`absulute bottom-[50%] translate-y-[-50%] h-2.5 bg-green-400 rounded-s-full`}
              style={{ width: `${loadingState.toString()}%` }}
            ></div>
          </div>
        </div>
      </Container>
    </div>
  )
}

export default LoadingBar
