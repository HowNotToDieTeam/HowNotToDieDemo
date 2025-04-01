// file path: how-not-to-die/client/src/pages/SurvivalGuide.jsx
// Display safety and exploration tips

import React, { use } from 'react';
import { Link } from 'react-router-dom';
import styles from '../assets/css/survival-guide/SurvivalGuide.module.css';
import AnimatedVeraQuote from '../components/vera-quotes/AnimatedVeraQuote';

const SurvivalGuide = () => {
  const [planets, setPlanets] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPlanets = async () => {
      try {
        const response = await fetch('/api/planets');
        if (!response.ok) {
          throw new Error('No planets, no go');
        }
        const data = await response.json();
        setPlanets(data);
      } catch (error) {
        setError(err.message);
      }
    };

    fetchPlanets();
  }, []);

  return (
    <div className={styles.container}>
      <h2>Survival Guide</h2>

      {/* animated VERA quote */}
      <AnimatedVeraQuote quote="Reading these logs may help you survive. Or at least die in a more interesting way." />

      <p>Everything you need to stay alive on this alien rock...</p>

      <ul className={styles.tips}>
        <li>Always scan the atmosphere before removing your helmet.</li>
        <li>If it glows, don't touch it. If it moves, definitely don't touch it.</li>
        <li>Keep personal logs updated. Posthumous documentation earns extra hazard pay.</li>
        <li>Never trust a plant with teeth. This should be obvious.</li>
        <li>Recharge your suit before nightfall. Nightfall is... bad.</li>
      </ul>
      {/* Display planets dynamically */}
      <ul className={styles.tips}>
        {planets.map((planet) => (
          <li key={planet.id}>
            <strong>{planet.name}</strong>: {planet.description || 'Data Corrupted.'}
          </li>
        ))}
      </ul>
      <ul className={styles.tips}>
        {planets.map((landingspot) => (
          <li key={landingspot.id}>
            <strong>{landingspot.name}</strong>: {landingspot.description || 'No Corrupted available.'}
          </li>
        ))}
      </ul>
      <ul className={styles.tips}>
        {planets.map((flora) => (
          <li key={flora.id}>
            <strong>{flora.name}</strong>: {flora.description || 'No Corrupted available.'}
          </li>
        ))}
      </ul>
      <ul className={styles.tips}>
        {planets.map((fauna) => (
          <li key={fauna.id}>
            <strong>{fauna.name}</strong>: {fauna.description || 'No description available.'}
          </li>
        ))}
      </ul>
      <ul className={styles.tips}>
        {planets.map((unexplained) => (
          <li key={unexplained.id}>
            <strong>{unexxplained.name}</strong>: {unexplained.description || 'No description available.'}
          </li>
        ))}
      </ul>

      <div className={styles.logButtons}>
        <Link to="/personallogs" className={styles.logButton}>Access Personal Logs</Link>
        <Link to="/publiclogvoting" className={styles.logButton}>Review Public Log Submissions</Link>
      </div>
    </div>
  );
};

export default SurvivalGuide;
