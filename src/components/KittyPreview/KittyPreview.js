import './KittyPreview.scss';
import {
    // BrowserRouter as Router,
    // Switch,
    // Route,
    Link
  } from "react-router-dom";

import KittyForm from '../KittyForm/KittyForm';

/*
* Component to preview user Kitties on Dashboard.
*/


function KittyPreview(props) {
    const { kitty } = props;
    
    const handleEditClick = (e) => {
        console.log('HANDLE EDIT CLICK')
        console.log(kitty)
    }

    return (
        <div className="kitty-preview">
            <div className="">
                <div>{kitty.name}: { kitty.buyInAmount }</div>
            </div>
            <div className="controls">

                {/* <button className="btn btn-sm" onClick={handleEditClick}>edit</button> */}
                {/* <Link to="/kitty" className="btn btn-sm">edit</Link> */}
                <Link to={`/kitty/${kitty._id}`} className="btn btn-sm">view</Link>

            </div>

        </div>
    )
}

export default KittyPreview;