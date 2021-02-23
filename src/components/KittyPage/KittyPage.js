import { useParams } from "react-router-dom";

// import GetKittyData from './GetKittyData';

// API call, get data, display on page
// onClick of button, PAI call again, get new data
// with Hooks

// can also use arrow function here
function KittyPage() {
    
    // const urlWithId = 'http://localhost:4000/api/kitty/5fb33db2d15e500a2d96266d';
    // const urlAll = 'http://localhost:4000/api/kitty/';

    // const [allKittys] = GetKittyData(urlAll);
    
    // console.log('kittyPage') 
    // console.log(allKittys)

    let { kittyId } = useParams();

    console.log(useParams())
    console.log('ID: ', kittyId)

    return (
        <div>
            <h3>Kitty page</h3>
            <p>{kittyId}</p>
        </div>
    )
}

export default KittyPage; 