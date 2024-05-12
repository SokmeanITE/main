import Agent from "../components/admin/Agent";
import Area from "../components/admin/Area";
import Category from "../components/admin/Category";
import Dashboard from "../components/admin/Dashboard";
import EditArea from "../components/admin/Edit_Area";
import EditCategories from "../components/admin/Edit_Categories";
import Edit_Properties from "../components/admin/Edit_Properties";
import Profile from "../components/admin/Profile";
import Properties from "../components/admin/Properties";
import ViewAgent from "../components/admin/View_Agent";
import ViewArea from "../components/admin/View_Area";
import ViewCategories from "../components/admin/View_Categories";
import View_Properties from "../components/admin/View_Properties";
 

const routes = [
    { path: '/', exact: true, name: 'Admin' },
    { path: '/dashboard', exact: true, name: 'Dashboard', component: Dashboard},
    // { path: '/properties', exact: true, name: 'Properties', component: Properties},
    { path: '/add-categories', exact: true, name: 'Categorties', component: Category},
    { path: '/view-categories', exact: true, name: 'ViewCategories', component: ViewCategories},
    { path: '/edit-category/:id', exact: true, name: 'EditCategories', component: EditCategories},

    { path: '/add-area', exact: true, name: 'Area', component: Area},
    { path: '/view-area', exact: true, name: 'ViewArea', component: ViewArea},
    { path: '/edit-area/:id', exact: true, name: 'EditArea', component: EditArea},

    // Property
    { path: '/properties', exact: true, name: 'Properties', component: Properties},
    { path: '/view-property', exact: true, name: 'ViewProperties', component: View_Properties},
    { path: '/edit-property/:id', exact: true, name: 'EditProperties', component: Edit_Properties},

    // Agent
    { path: '/add-agent', exact: true, name: 'Agent', component: Agent},
    { path: '/view-agent', exact: true, name: 'ViewAgent', component: ViewAgent},
    // { path: '/edit-property/:id', exact: true, name: 'EditProperties', component: Edit_Properties},

    { path: '/profile', exact: true, name: 'Profile', component: Profile},
    
    ];
    
    
    export default routes;