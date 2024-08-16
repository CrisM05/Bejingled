import React, { useContext, useEffect } from 'react';
import boardContext from '../contexts/BoardContext';
import { fetchHandler, getBearHeader } from '../utils';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const {userData, setUserData} = useContext(boardContext);
  const navigate = useNavigate();

  const goBack = () => {
    sessionStorage.setItem("token", "");
    navigate("/signIn");
  }

  const logOut = async () => {
    sessionStorage.setItem("token","");
    setUserData({});
    navigate('/');
  }
  
  useEffect(() => {
    const getData = async () => {
      const [idObj,er] = await fetchHandler("/api/users/me", getBearHeader());
      if (er) {
        goBack();
        return;
      }
      const [data,error] = await fetchHandler(`/api/users/${idObj.id}`, getBearHeader());
      if (error) {
        goBack();
        return;
      }
      setUserData(data);
    };
    getData();
  },[])
  
  return (
   <main>
    <h1>{userData.displayName}</h1>
    <h2>{userData.score}</h2>
    {userData && <button onClick={logOut}>Log Out</button>}
   </main>
  );
}

export default ProfilePage;
