import NotFound from "../components/NotFound";
import Contact from "../components/frontend/Contact";
import Home from "../components/frontend/Home";
import DemoProperties from "../components/frontend/collections/Demo_properties";
import Properties from "../components/frontend/collections/Properties";




const routeFrontent = [
    { path: '*', exact: true, name: '*', component: NotFound },
    { path: '/', exact: true, name: 'Home', component: Home },
    { path: '/contact', exact: true, name: 'Contact', component: Contact },
    { path: '/view_property/:id', exact: true, name: 'DeomProperties', component: DemoProperties},

    { path: '/all-property', exact: true, name: 'Property', component: Properties },
    { path: '/property/:id/:name', exact: true, name: 'Property', component: Properties },
    // { path: '/for-buy', exact: true, name: 'Property', component: Properties },
    // { path: '/for-sale', exact: true, name: 'Property', component: Properties },


    ];
    
    
    export default routeFrontent;