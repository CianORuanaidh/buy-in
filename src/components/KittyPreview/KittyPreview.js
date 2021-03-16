import './KittyPreview.scss';
import {
    // BrowserRouter as Router,
    // Switch,
    // Route,
    Link
  } from "react-router-dom";

import KittyForm from '../KittyForm/KittyForm';
import { withRouter } from "react-router-dom";


/*
* Component to preview user Kitties on Dashboard.
*/


function KittyPreview(props) {
    const { kitty } = props;
    
    const handleKittyClicked = (kittyId) => {
        console.log('handleKittyClicked')
        console.log(kittyId)

        props.history.push(`/kitty/${kittyId}`);

    }

    const isClosed = Math.random() > 0.4; //  TO DO BUILD OUT THIS LIGIC

    return (
        <div className="kitty-preview" onClick={() => handleKittyClicked(kitty._id)}>
            <div className="">
                {/* <div>{kitty.name}: { kitty.buyInAmount }</div> */}

                <p>Name: {kitty.name}</p>
                <p>Buy In Amount: {kitty.buyInAmount}</p>
                <p>Total pot: {kitty.buyInAmount * 3}</p>
                <p>Created: _some date_</p>

                {/* { Math.random() } */}

                { isClosed < 0.5 && 
                    <p><strong>closed</strong></p>
                }

            </div>
            {/* <div className="controls">
                <Link to={`/kitty/${kitty._id}`} className="btn btn-sm">view</Link>
            </div> */}
        </div>
    )
}

export default withRouter(KittyPreview);