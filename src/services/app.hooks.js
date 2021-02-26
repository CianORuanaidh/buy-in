
import { useState, useEffect } from 'react';
import { getUserWithToken } from './api.services';

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