import React, {useState} from 'react'
import styles from './InstallAction.module.css'

const InstallAction = ({packageName}) => {
  const yarnCommand = `yarn add ${packageName}`;
  const npmCommand = `npm install ${packageName}`;
  const [copy, setCopy] = useState(false);

  return (
    <div>
      <div className={styles.buttonContainer}>
        <button onClick={() => navigator.clipboard.writeText(yarnCommand)
          .then(() => setCopy(true))}>yarn
        </button>
        <button onClick={() => navigator.clipboard.writeText(npmCommand)
          .then(() => setCopy(true))}>npm
        </button>
      </div>
      {copy && <div className={styles.textContainer}>Copied!</div>}
    </div>
  )
};

export default InstallAction