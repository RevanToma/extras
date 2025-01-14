import { FaExclamationCircle, FaInfoCircle } from 'react-icons/fa';
import './App.css';
import BaseAlert from './components/BaseComponents/BaseAlert';
import BaseButton from './components/BaseComponents/BaseButton';
import BaseBadge from './components/BaseComponents/BaseBadge';
import BaseCard from './components/BaseComponents/BaseCard';
import ReactLogo from './assets/logo.png';
import BaseModal from './components/BaseComponents/BaseModal';

import { useState } from 'react';

function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <div className='component-container'>
      <h1>Hello</h1>
      <BaseButton size='medium' color='#fff' disabled={false}>
        Click me
      </BaseButton>
      <BaseAlert color='info' icon={FaExclamationCircle}>
        This is an informational alert with an SVG icon.
      </BaseAlert>
      <BaseBadge color='info' size='sm' icon={FaInfoCircle}>
        Info Badge
      </BaseBadge>
      <h2>React Logo</h2>
      <BaseCard
        href='/assets/react.svg'
        imgAlt='React Logo'
        imgSrc={ReactLogo}
      ></BaseCard>

      <button onClick={() => setIsModalVisible(true)}>Open Modal</button>
      <BaseModal
        show={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        size='lg'
        header={<h5>Terms of Service</h5>}
        footer={
          <>
            <button
              onClick={() => setIsModalVisible(false)}
              className='accept-btn'
            >
              I Accept
            </button>
            <button onClick={() => setIsModalVisible(false)}>Decline</button>
          </>
        }
      >
        <p>
          With less than a month to go before the European Union enacts new
          consumer privacy laws for its citizens, companies around the world are
          updating their terms of service agreements to comply.
        </p>
        <p>
          The European Union’s General Data Protection Regulation (G.D.P.R.)
          goes into effect on May 25 and is meant to ensure a common set of data
          rights in the European Union. It requires organizations to notify
          users as soon as possible of high-risk data breaches that could
          personally affect them.
        </p>
      </BaseModal>
    </div>
  );
}

export default App;
