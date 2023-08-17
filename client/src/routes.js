import Admin from "./pages/Admin";
import {NOT_FOUND, EDIT_EVENT, PROFILE_EVENTS, OTHER_PROFILE, EDIT_PROFILE, ADD_EVENT, NEW_PROFILE_ROUTE, LOGIN_ROUTE, REGISTRATION_ROUTE, ALL_EVENTS_ROUTE, PROFILE_ROUTE, REQUESTS_ROUTE, ONE_EVENT_ROUTE, MY_EVENRS_ROUTE} from "./utils/consts";
import Auth from "./pages/Auth";
import All_events from "./pages/All_events";
import My_events from "./pages/My_events";
import One_Event from "./pages/One_event";
import Profile from "./pages/Profile";
import Requests from "./pages/Requests";
import NewProfile from "./pages/NewProfile";
import NewEvent from "./pages/Add_new_event";
import EditProfile from "./pages/EditProfile";
import Other_profile from "./pages/Other_profile";
import Other_events from "./pages/Other_events";
import Edit_event from "./pages/Edit_event";
import PageNotFound from "./pages/PageNotFound";

export const authRoutes = [
    
    {
        path: ONE_EVENT_ROUTE + '/:idEvent',
        Component: One_Event
    },
    {
        path: ALL_EVENTS_ROUTE,
        Component: All_events
    },
    {
        path: PROFILE_ROUTE,
        Component: Profile
    },
    {
        path: REQUESTS_ROUTE,
        Component: Requests
    },
    {
        path: MY_EVENRS_ROUTE,
        Component: My_events
    },
    {
        path: NEW_PROFILE_ROUTE,
        Component: NewProfile
    },
    {
        path: ADD_EVENT,
        Component: NewEvent
    },
    {
        path: EDIT_PROFILE,
        Component: EditProfile
    },
    {
        path: OTHER_PROFILE + '/:idUser',
        Component: Other_profile
    },
    {
        path: PROFILE_EVENTS + '/:idUser',
        Component: Other_events
    },
    {
        path: EDIT_EVENT + '/:idEvent',
        Component: Edit_event
    },
    {
        path: NOT_FOUND ,
        Component: PageNotFound
    },
   

]

export const publicRoutes = [
    
    {
        path: LOGIN_ROUTE,
        Component: Auth
    },
    {
        path: REGISTRATION_ROUTE,
        Component: Auth
    },
]
