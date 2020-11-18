import React from 'react';
import './KittyForm.scss';

/*
* form for creating a new Kitty
*/
class KittyForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            kittyName: '',
            buyInAmount: '',
            numberOfParticipents: undefined
        };

        this.handleKittyNameChange = this.handleKittyNameChange.bind(this);
        this.handleKittyBuyInAmountChange = this.handleKittyBuyInAmountChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleKittyNameChange(event) {
        this.setState({ kittyName: event.target.value});
    }

    handleKittyBuyInAmountChange(event) {
        this.setState({ buyInAmount: event.target.value});
    }
    
    handleSubmit(event) {
        event.preventDefault();
        console.log(this.state);
    }

    render() {
        return (
            <section>
                <h1>Kitty Form</h1>    
                <form onSubmit={this.handleSubmit}>
                    <div className="text-input">
                        <label htmlFor="kitty-name">Kitty Name</label>
                        <input id="kitty-name"type="text" value={this.state.kittyName} onChange={this.handleKittyNameChange}/>
                    </div>
    
                    <div className="number-input">
                        <label htmlFor="buyInAmount">Buy in amount</label>
                        <input id="buyInAmount" type="number" value={this.state.buyInAmount} onChange={this.handleKittyBuyInAmountChange}/>
                    </div>
    
                    <p>Participants</p>
    
                    {/* <div className="text-input">
                        <label htmlFor="participent-name">Name</label>
                        <input id="participent-name" type="text" value={this.state.numberOfParticipents} onChange={this.handleChange}/>
                    </div> */}
    
                    <button className="btn" type="submit">Save</button>
    
                </form>
            </section>
        );
    }
}

export default KittyForm;
