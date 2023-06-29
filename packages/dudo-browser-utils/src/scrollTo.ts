import getOffset from './getOffset'

export default function scrollTo(target: string | HTMLElement, offset: number = 0) {
  let elementY = getOffset(target).top + offset

  window.scrollTo({top: elementY, behavior: 'smooth'})
};
