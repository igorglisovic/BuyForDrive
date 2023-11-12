const Container = ({ children, className, style }) => {
  return (
    <div className={className ? className : 'app-container'} style={style}>
      {children}
    </div>
  )
}

export default Container
