import getElement from './getElement'

const calculateOffset = (target, top: number = 0, left: number = 0): { top: number, left: number } => {
  let offsetTop = target.offsetTop + top
  let offsetLeft = target.offsetLeft + left

  if (target.offsetParent) {
    const offsetParent = calculateOffset(target.offsetParent, offsetTop, offsetLeft)
    offsetTop = offsetParent.top
    offsetLeft = offsetParent.left
  }

  return {
    top: offsetTop,
    left: offsetLeft,
  }
}

export default function getOffset(target: string | HTMLElement) {
  let element = getElement(target)

  if (!element) {
    return {}
  }

  let {top, left} = calculateOffset(element)
  let width = element.clientWidth
  let height = element.clientHeight

  return {
    top,
    left,
    right: left + width,
    bottom: top + height,
    width,
    height,
  }
};
