import React, { useState } from 'react'
import { TbMoon, TbSun, TbUser, TbMapPinOff, TbMapPin, TbPlus, TbLogout, TbLogin, TbUserPlus, TbCode, TbAB } from 'react-icons/tb';
import { appRoutes  } from "../constants/routes";
import { useApp } from '../App/Context/AppContext';
import { signOutAlerts } from '../constants/alerts';
import { thunkSignOutPlayer } from '../Store/auth';
import { useDispatch, useSelector } from 'react-redux';
import NavigationMenuLink from './NavigationMenuLink';

function MainMenu() {
  const player = useSelector(state => state.auth.player)
  const { locationServices, handleLocationServices, theme, handleTheme } = useApp();
  const { signOutFailure, signOutSuccess } = signOutAlerts;
  const { signInPage } = appRoutes;
  const { handleAlerts, setLoading, navigate } = useApp();
  const dispatch = useDispatch();

  const submitSignOutPlayer = async (e) => {
      setLoading(true);
      e.preventDefault();
      try {
        dispatch(thunkSignOutPlayer());
        handleAlerts(signOutSuccess);
        navigate(signInPage);
      } catch(error) {
        handleAlerts(signOutFailure);
      } finally {
        setLoading(false)
      }
  }


  return (
    <div className='menu_modal_wrapper'>
        <div className='menu_modal_mobile'>
            <NavigationMenuLink
              label={`${theme} Mode`}
              icon={theme === "dark" ? <TbMoon/> : <TbSun/> }
              action={handleTheme}
            />
            <NavigationMenuLink
              label={`Locations ${locationServices ? 'Enabled' : 'Disabled'}`}
              icon={locationServices ? <TbMapPin/> : <TbMapPinOff/> }
              action={handleLocationServices}
            />
        </div>
        { player ?
          <>
          <NavigationMenuLink
            label="View Player Stats"
            icon={<TbUser/>}
            action={() => alert("Coming Soon")}
          />
          <NavigationMenuLink
            label="Create Team"
            icon={<TbPlus/>}
            action={() => alert("Coming Soon")}
          />

            <NavigationMenuLink
              label="Sign Out"
              icon={<TbLogout/>}
              action={submitSignOutPlayer}
            />
          </> :
          <>
            <NavigationMenuLink
              label="Sign In"
              icon={<TbLogin/>}
              action={() => navigate('/sign-in')}
            />
            <NavigationMenuLink
              label="Sign Up"
              icon={<TbUserPlus/>}
              action={() => navigate('/sign-up')}
            />
          </>

        }
        <NavigationMenuLink
              label="Test"
              icon={<TbAB />}
              action={() => handleAlerts(signOutFailure)}
            />
    </div>
  )
}

export default MainMenu
