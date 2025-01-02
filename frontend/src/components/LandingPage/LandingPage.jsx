
// import styles from './LandingPage.module.css';

// function LandingPage() {
//   return (


//     <div className={styles.landingContainer}>
//       <div className={styles.titleContainer}>
//         <h1 className={styles.landingTitle}>
//           <span className={styles.letter} data-index="1">W</span>
//           <span className={styles.letter} data-index="2">o</span>
//           <span className={styles.letter} data-index="3">r</span>
//           <span className={styles.letter} data-index="4">d</span>
//           &nbsp;
//           <span className={styles.letter} data-index="5">P</span>
//           <span className={styles.letter} data-index="6">a</span>
//           <span className={styles.letter} data-index="7">l</span>
//           <span className={styles.letter} data-index="8">l</span>
//           <span className={styles.letter} data-index="9">e</span>
//           <span className={styles.letter} data-index="10">t</span>
//           <span className={styles.letter} data-index="11">e</span>
//         </h1>
//         <p className={styles.landingText}>Color Your World with Language.</p>
//       </div>
//     </div>
//   );
// }

// export default LandingPage;

// import styles from './LandingPage.module.css';

// function LandingPage() {
//   return (
//     <div className={styles.landingContainer}>
//       {/* Matrix Effect Background */}
//       <div id="text-output" className={styles.matrixEffect}>
//         <div id="cp-bg"></div>
//       </div>

//       {/* Main Content */}
//       <div className={styles.titleContainer}>
//         <h1 className={styles.landingTitle}>
//           <span className={styles.letter} data-index="1">W</span>
//           <span className={styles.letter} data-index="2">o</span>
//           <span className={styles.letter} data-index="3">r</span>
//           <span className={styles.letter} data-index="4">d</span>
//           &nbsp;
//           <span className={styles.letter} data-index="5">P</span>
//           <span className={styles.letter} data-index="6">a</span>
//           <span className={styles.letter} data-index="7">l</span>
//           <span className={styles.letter} data-index="8">l</span>
//           <span className={styles.letter} data-index="9">e</span>
//           <span className={styles.letter} data-index="10">t</span>
//           <span className={styles.letter} data-index="11">e</span>
//         </h1>
//         <p className={styles.landingText}>Color Your World with Language.</p>
//       </div>
//     </div>
//   );
// }

// export default LandingPage;

import { useEffect } from 'react';
import styles from './LandingPage.module.css';

function LandingPage() {
    useEffect(() => {
        const chars = [
            // English
            "Hello", "World", "Language", "Hi",
            // Spanish
            "Hola", "Mundo", "Idioma", "¡Hola!",
            // French
            "Bonjour", "Monde", "Langue", "Salut",
            // Japanese
            "こんにちは", "世界", "言語", "やあ",
            // German
            "Hallo", "Welt", "Sprache", "Hi",
            // Italian
            "Ciao", "Mondo", "Lingua", "Ehi",
            // Korean
            "안녕하세요", "세계", "언어", "안녕"
          ];

      const colors = ['#0066FF', '#FF0000', '#5F00B8', '#FFD500', '#4AE056'];
      const minStringDelay = 100;
      const maxStringDelay = 300;
      const minStringLength = 4;
      const maxStringLength = 10; // Reduced length for cleaner display
      const minStringSpeed = 0.5;
      const maxStringSpeed = 1;

      const MAX_LINES = 0; // Maximum number of active lines
      let activeLines = 0; // Counter to track active lines

      const matrixString = () => {
        if (activeLines >= MAX_LINES) {
          setTimeout(matrixString, minStringDelay); // Wait and retry if the limit is reached
          return;
        }

        activeLines++; // Increment active line counter

        const ranTime = Math.floor(Math.random() * (maxStringDelay - minStringDelay) + minStringDelay);
        const ranLen = Math.floor(Math.random() * (maxStringLength - minStringLength) + minStringLength);
        const leftPos = Math.floor(Math.random() * window.innerWidth);

        // Create a new div for the stream
        const div = document.createElement('div');
        div.className = styles.matrixString;
        div.style.left = `${leftPos}px`;
        div.style.top = '-50px';

        // Randomly select words or characters for the stream
        for (let i = 0; i < ranLen; i++) {
          const word = chars[Math.floor(Math.random() * chars.length)];
          const span = document.createElement('span');
          span.innerText = word; // Each word is separate
          span.style.display = 'block'; // Stack vertically
          span.style.marginBottom = '5px'; // Add space between words
          div.appendChild(span);
        }

        // Randomly select a color and apply glow
        const color = colors[Math.floor(Math.random() * colors.length)];
        div.style.color = color;
        div.style.textShadow = `0px 0px 15px ${color}, 0px 0px 10px ${color}, 0px 0px 5px ${color}`;

        document.getElementById('text-output').appendChild(div);

        const speed = Math.random() * (maxStringSpeed - minStringSpeed) + minStringSpeed;

        const animate = () => {
          const top = parseFloat(div.style.top.replace('px', ''));
          if (top > window.innerHeight) {
            div.remove();
            activeLines--; // Decrement the active line counter when a line is removed
          } else {
            div.style.top = `${top + speed}px`;
            requestAnimationFrame(animate);
          }
        };

        animate();

        setTimeout(matrixString, ranTime);
      };

      matrixString();

      return () => {
        document.getElementById('text-output').innerHTML = '';
        activeLines = 0; // Reset active line counter
      };
    }, []);


    return (
      <div className={styles.landingContainer}>
        <div id="text-output" className={styles.matrixEffect}></div>
        <div className={styles.titleContainer}>
          <h1 className={styles.landingTitle}>
            <span className={styles.word} data-index="1">Word</span>
            &nbsp;
            <span className={styles.word} data-index="2">Pallete</span>
          </h1>
          <p className={styles.landingText}>
            <span className={styles.highlightedWord}>Color</span> your world with language
            <span className={`${styles.highlightedPeriod}`}>.</span>
          </p>
        </div>
      </div>
    );

}

export default LandingPage;
