import React from 'react';

// PUBLIC_INTERFACE
/**
 * Info component for providing educational content about the BOLT test
 */
const Info = () => {
  return (
    <div className="info-container">
      <h2>About the BOLT Test</h2>
      
      <section className="info-section">
        <h3>What is the BOLT?</h3>
        <p>
          The Body Oxygen Level Test (BOLT) was developed by Patrick McKeown, author of "The Oxygen Advantage." 
          It's a simple self-assessment that measures your body's tolerance to reduced oxygen and increased carbon dioxide.
        </p>
        <p>
          Your BOLT score reflects the length of time you can comfortably hold your breath after a normal exhalation. 
          It serves as an indicator of your breathing efficiency and can help track improvements in your respiratory health.
        </p>
      </section>
      
      <section className="info-section">
        <h3>How to Interpret Your Score</h3>
        <div className="interpretation-table">
          <div className="table-row header">
            <div className="table-cell">BOLT Score</div>
            <div className="table-cell">Interpretation</div>
          </div>
          <div className="table-row">
            <div className="table-cell">Less than 10 seconds</div>
            <div className="table-cell">
              Poor breathing efficiency. This may indicate chronic overbreathing and could be associated with various symptoms including breathlessness, fatigue, and poor sleep.
            </div>
          </div>
          <div className="table-row">
            <div className="table-cell">10-20 seconds</div>
            <div className="table-cell">
              Moderate breathing efficiency. This is common among the general population but indicates room for improvement.
            </div>
          </div>
          <div className="table-row">
            <div className="table-cell">20-30 seconds</div>
            <div className="table-cell">
              Good breathing efficiency. You're likely experiencing few breathing-related symptoms in daily life.
            </div>
          </div>
          <div className="table-row">
            <div className="table-cell">30-40 seconds</div>
            <div className="table-cell">
              Very good breathing efficiency, typically found in those who practice regular breath work or athletes.
            </div>
          </div>
          <div className="table-row">
            <div className="table-cell">Over 40 seconds</div>
            <div className="table-cell">
              Excellent breathing efficiency, usually achieved through consistent breathing practice.
            </div>
          </div>
        </div>
      </section>
      
      <section className="info-section">
        <h3>Tips to Improve Your BOLT Score</h3>
        <ol>
          <li>
            <strong>Nasal Breathing:</strong> Practice breathing through your nose instead of your mouth, both during the day and while sleeping.
          </li>
          <li>
            <strong>Breath Awareness:</strong> Regularly check if your breathing is calm, gentle, and slow. Avoid sighing or taking large breaths.
          </li>
          <li>
            <strong>Breath-Hold Practice:</strong> Regularly perform breath holds after a normal exhalation, multiple times a day.
          </li>
          <li>
            <strong>Reduced Breathing:</strong> Practice taking slightly smaller breaths than usual for 5-10 minutes daily.
          </li>
          <li>
            <strong>Physical Activity:</strong> Exercise regularly, but maintain nasal breathing throughout your workouts.
          </li>
        </ol>
      </section>
      
      <section className="info-section">
        <h3>Why Improve Breathing?</h3>
        <p>Improving your breathing efficiency can have numerous benefits:</p>
        <ul>
          <li>Reduced breathlessness during exercise</li>
          <li>Improved sleep quality</li>
          <li>Better concentration and mental clarity</li>
          <li>Reduced anxiety and stress</li>
          <li>Improved respiratory health</li>
          <li>Enhanced sports performance</li>
          <li>Better management of conditions like asthma</li>
        </ul>
      </section>
      
      <section className="info-section">
        <h3>Additional Resources</h3>
        <p>To learn more about breathing techniques and the science behind the BOLT test, consider exploring:</p>
        <ul>
          <li>"The Oxygen Advantage" by Patrick McKeown</li>
          <li>"Breath" by James Nestor</li>
          <li>"Breathing Cure" by Patrick McKeown</li>
        </ul>
      </section>
    </div>
  );
};

export default Info;
