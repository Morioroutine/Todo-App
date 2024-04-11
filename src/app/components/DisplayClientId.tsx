import {useEffect, useState} from 'react';

export default function DisplayClientId () {
    const [clientId, setClientId] = useState<string>("Loading...")

    useEffect(() => {
        fetch('/api/get-client-reference-id')
        .then((res) => {
          if (!res.ok) {
            throw new Error(`Error: ${res.status}`);
          }
          return res.json();
        })
        .then((data) => {
          setClientId(data.clientReferenceId);
        })
        .catch((error) => {
          console.error('Fetching client ID failed:', error);
          setClientId('Error fetching data');
        });
    }, []);

    return <div>{clientId}</div>;

}
