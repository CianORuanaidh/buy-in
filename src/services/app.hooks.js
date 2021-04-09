
import { useState, useEffect } from 'react';
import { getUserWithToken } from './api/api.services';
import { getKittyFromInviteId } from './api/api.services';

export function GetUserData() {
    const [userData, setUserData] = useState(null);

    useEffect(async () => {

        try {

            const { data: user } = await getUserWithToken();
            setUserData(user);
      
          } catch (err) {
            setUserData(undefined);
          }

    }, []);

    return userData;
};

// get specific kitty by invite id
export function GetKittyDataFromInviteId(inviteId) {
  const [kittyData, setKittyData] = useState(null)

  useEffect(() => {

      const fetchData = async () => {

          const response = await getKittyFromInviteId(inviteId);
          
          setKittyData(response.data)
      }

      fetchData().catch(error => setKittyData({ error }));
      
  }, []);

  return kittyData;
}