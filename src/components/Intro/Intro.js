import './Intro.scss';
import { Link } from "react-router-dom";
/*
* Intro component. AKA 'hero'
*/
function Intro() {
    return (
        <section className="intro">
            <div className="container">
                <div className="block primary">
                    <h1>BuyIn</h1>
                    <div>
                        <p>Create a pot, invite your friends. When everyone has signed up, your pot is good to go.
                        <span className="text-v1"> Your money can only be released when you have a unanimous decision.</span> 
                        <span className="text-v2"> If you cannot all agree, your money will be returned to each participant.</span></p> 
                    </div>
                    <Link className="btn" to="/login">Get started</Link>
                </div>
                <div className="block secondary">
                    {/* placeholder */}
                </div>
            </div>
        </section>
    )
}

export default Intro;