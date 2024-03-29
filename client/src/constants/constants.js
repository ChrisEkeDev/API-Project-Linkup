import { TbUser, TbLogin2, TbUserPlus } from 'react-icons/tb'
import * as ROUTES from '../constants/routes'

export const PLAYER_AUTHORIZED = 'authorized';
export const PLAYER_NOT_AUTHORIZED = 'unauthorized';

export const appOptions = {
    theme: "dark",
    sortBy: "happeningSoon",
}

export const navMenuLinks = {
    unauthorized: {
        signIn: {
            name: 'Sign In',
            path: ROUTES.SIGN_IN,
            icon: <TbLogin2/>
        },
        signUp: {
            name: 'Sign Up',
            path: ROUTES.SIGN_UP,
            icon: <TbUserPlus/>
        },
    },
    authorized: {
        myAccount: {
            name: 'My Account',
            path: '/coming-soon',
            icon: <TbUser/>
        }
    }

}

export const appThemes = {
    light: {
        name: "Light",
        mapId: "fc1ef067cfa808f9"
    },
    dark: {
        name: "Dark",
        mapId: "147b32231f3ba7c1"
    }
}

export const sessionSortValues = {
    startDate: 'Happening Soon',
    checkIns: 'Most Players',
    createdAt: "Newest"
}

export const teamSortValues = {
    members: 'Most Members',
    createdAt: "Newest"
}

export const viewValues = {
    list: 'List View',
    calendar: 'Calendar View'
}

export const sortFunctions = {
    happeningSoon: (a, b) => {
        return new Date(a?.startDate) - new Date(b?.startDate);
    },
    mostPlayers: (a, b) => {
        return b?.CheckIns?.length - a?.CheckIns?.length;
    },
    newest: (a, b) => {
        return new Date(b?.createdAt) - new Date(a?.createdAt);
    },
}


export const timeFormatOptions = {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
}


export const statusOrderMembership = {
    'host': 1,
    'co-host': 2,
    'member': 3,
    'pending': 4
}

export const statusOrderAttendance = {
    'attending': 1,
    'pending': 2
}
