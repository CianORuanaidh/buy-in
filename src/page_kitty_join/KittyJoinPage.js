import { useParams } from "react-router-dom";
import './KittyJoinPage.scss';

/*
* KittyJoinPage Page
*/
const KittyJoinPage = (props) => {

    let { kittyInviteId } = useParams();

    console.log(kittyInviteId)
    
    const userNameName = 'Big William';
    const kittyName = 'BURGERE';
    const buyInAmount = 12;

    return (
        <div>
            {/* <p>{kittyInviteId}</p> */}
            <h1>Want in?</h1>
            <p>{userNameName} has invited you to join { kittyName }.</p>
            <p>Buy in for { kittyName } is { buyInAmount }.</p>
            <p>You want in?</p>
            <button className='btn'>Yes!</button>
            <button className='btn btn-secondary'>Na</button>
        </div>
    )
}

export default KittyJoinPage;