import './NewKitty.scss';
import KittyForm from '../KittyForm/KittyForm';

/*
* Component to create a new Kitty.
*/
function NewKitty() {
    return (
        <section className="new-kitty">
            <div className="container">

                <h2>New Kitty</h2>
                <p>Create a new kitty using the form below.</p>

                <div className="form-holder">
                    <KittyForm></KittyForm>
                </div>

            </div>
        </section>
    )
}

export default NewKitty;