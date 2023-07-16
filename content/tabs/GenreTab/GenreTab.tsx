import { useEffect, useState } from 'react';
import { Building } from '../Building';

function GenreTab() {
  const [testText, setTestText] = useState('');
  useEffect(() => {
    console.log('hi');
    chrome.runtime.onMessage.addListener(function (request) {
      if (request.message === 'Hello') {
        console.log('success');
        setTestText('Success');
      }
    });
  }, []);

  return (
    <>
      <Building />
      {testText}
    </>
  );
}

export { GenreTab };
