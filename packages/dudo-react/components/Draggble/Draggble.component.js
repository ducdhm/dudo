import React, {useEffect, useRef, useState} from 'react'

const Draggable = ({children, ...props}) => {
  const cursorSize = {
    width: 18,
    height: 56,
  }

  const [isTouch, setIsTouch] = useState(false)

  const [state, setStateUI] = useState({
    top: 0,
    left: 0,
    zIndex: 0,
    position: 'static',
    className: 'sleep',
    pointerEvents: 'auto',
  })

  const setState = (newState) => {
    setStateUI({
      ...state,
      ...newState,
    })
  }

  const ele = useRef(null)

  useEffect(() => {
    ele.current.addEventListener('mousedown', onStart)
    ele.current.addEventListener('touchstart', onStart)

    return () => {
      ele.current.removeEventListener('mousedown', onStart)
      ele.current.removeEventListener('touchstart', onStart)
    }
  }, [])


  const onStart = (evt) => {
    evt.stopPropagation()

    if (evt.touches) {
      setIsTouch(true)
      evt = evt.changedTouches[0]
    }

    if (evt.button !== 2 && evt.which !== 3) {
      if (props.onStart) {
        props.onStart.call(ele.current, evt)
      }

      setState({
        zIndex: 9999,
        top: evt.clientY - cursorSize.width,
        left: evt.clientX - cursorSize.height,

        pointerEvents: 'none',
      })

      document.addEventListener('mouseup', onDrop)
      document.addEventListener('touchend', onDrop)

      document.addEventListener('mousemove', onDrag)
      document.addEventListener('touchmove', onDrag)
    }

    return false
  }

  const onDrag = (evt) => {
    if (isTouch) {
      evt = evt.changedTouches[0]
    }

    setState({
      top: evt.clientY - cursorSize.width,
      left: evt.clientX - cursorSize.height,
      zIndex: 9999,
      position: 'fixed',
      className: 'moving',
      pointerEvents: 'none',
    })

    if (props.onDrag) {
      props.onDrag.call(ele.current, evt)
    }

    return false
  }

  const onDrop = (evt) => {
    if (isTouch) {
      evt = evt.changedTouches[0]
    }

    setState({
      top: 0,
      left: 0,
      zIndex: 0,
      position: 'static',
      className: 'sleep',
      pointerEvents: 'auto',
    })

    if (props.onDrop) {
      props.onDrop.call(ele.current, evt)
    }

    document.removeEventListener('mouseup', onDrop)
    document.removeEventListener('touchend', onDrop)

    document.removeEventListener('touchmove', onDrag)
    document.removeEventListener('mousemove', onDrag)

    return false
  }

  const dynamicStyle = {
    top: state.top,
    left: state.left,
    zIndex: state.zIndex,
    position: state.position,
    className: state.className,
    pointerEvents: state.pointerEvents,
  }

  return (
    <div style={dynamicStyle} ref={ele} className={state.className}>
      {children}
    </div>
  )
}

export default Draggable
