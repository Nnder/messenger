import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

export default function PageLoader() {
  gsap.registerPlugin(useGSAP);
  useGSAP(() => {
    gsap.to('.loader', { rotation: '+=360', repeat: -1, duration: 5 });
  }, { scope: '.container' }); // <-- scope is for selector text (optional)

  return (
    <div className="container">
      <img className="loader" src="loader.svg" alt="..." />
    </div>
  );
}
