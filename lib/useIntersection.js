import { useInView } from 'react-intersection-observer'

export default function useIntersection(options = {}) {
  const [ref, inView] = useInView(options)
  return { ref, inView }
}
