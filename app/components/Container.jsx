const Container = ({ children, className }) => {
  return (
    <div className={className ? className : 'app-container'}>{children}</div>
  )
}

export default Container
