// import styles from './LandingPage.module.css';

// function LandingPage() {
//     return (
//         <div className={styles.landingContainer}>
//             <h1 className={styles.landingTitle}>Word Pallete</h1>
//             <p className={styles.landingText}> Color Your World with Language. </p>
//         </div>

//     );
// }

// export default LandingPage;

// import styles from './LandingPage.module.css';

// function LandingPage() {
//   return (
//     <div className={styles.landingContainer}>
//       <h1 className={styles.landingTitle}>
//         <span className={styles.letter}>W</span>
//         <span className={styles.letter}>o</span>
//         <span className={styles.letter}>r</span>
//         <span className={styles.letter}>d</span>
//         &nbsp;
//         <span className={styles.letter}>P</span>
//         <span className={styles.letter}>a</span>
//         <span className={styles.letter}>l</span>
//         <span className={styles.letter}>l</span>
//         <span className={styles.letter}>e</span>
//         <span className={styles.letter}>t</span>
//         <span className={styles.letter}>e</span>
//       </h1>
//       <p className={styles.landingText}>Color Your World with Language.</p>
//     </div>
//   );
// }

// export default LandingPage;

// import styles from './LandingPage.module.css';

// function LandingPage() {
//   return (
//     <div className={styles.landingContainer}>
//       <h1 className={styles.landingTitle}>
//         <span className={styles.letter} data-index="1">W</span>
//         <span className={styles.letter} data-index="2">o</span>
//         <span className={styles.letter} data-index="3">r</span>
//         <span className={styles.letter} data-index="4">d</span>
//         &nbsp;
//         <span className={styles.letter} data-index="5">P</span>
//         <span className={styles.letter} data-index="6">a</span>
//         <span className={styles.letter} data-index="7">l</span>
//         <span className={styles.letter} data-index="8">l</span>
//         <span className={styles.letter} data-index="9">e</span>
//         <span className={styles.letter} data-index="10">t</span>
//         <span className={styles.letter} data-index="11">e</span>
//       </h1>
//       <p className={styles.landingText}>Color Your World with Language.</p>
//     </div>
//   );
// }

// export default LandingPage;

import styles from './LandingPage.module.css';

function LandingPage() {
  return (
    <div className={styles.landingContainer}>
      <div className={styles.titleContainer}>
        <h1 className={styles.landingTitle}>
          <span className={styles.letter} data-index="1">W</span>
          <span className={styles.letter} data-index="2">o</span>
          <span className={styles.letter} data-index="3">r</span>
          <span className={styles.letter} data-index="4">d</span>
          &nbsp;
          <span className={styles.letter} data-index="5">P</span>
          <span className={styles.letter} data-index="6">a</span>
          <span className={styles.letter} data-index="7">l</span>
          <span className={styles.letter} data-index="8">l</span>
          <span className={styles.letter} data-index="9">e</span>
          <span className={styles.letter} data-index="10">t</span>
          <span className={styles.letter} data-index="11">e</span>
        </h1>
        <p className={styles.landingText}>Color Your World with Language.</p>
      </div>
    </div>
  );
}

export default LandingPage;
