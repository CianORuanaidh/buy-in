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
            numberOfParticipents: undefined,
            participants: [1]
        };


        this.handleAddParticipant = this.handleAddParticipant.bind(this);
        this.handleKittyNameChange = this.handleKittyNameChange.bind(this);
        this.handleKittyBuyInAmountChange = this.handleKittyBuyInAmountChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleAddParticipant() {
        this.setState((state) => {
            const newIndex = state.participants.length + 1;
            const updatedParticipants = state.participants.slice();
            updatedParticipants.push(newIndex);
            return {participants: updatedParticipants}
          });
    }

    handleKittyNameChange(event) {
        this.setState({ kittyName: event.target.value});
    }

    handleKittyBuyInAmountChange(event) {
        this.setState({ buyInAmount: event.target.value});
    }
    
    handleSubmit(event) {
        event.preventDefault();
    }


    functionTest(a,b) {
        return a + b;
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit} className="kitty-form">

                    <div className="block block-1">
                        <div className="text-input">
                            <label className="form-label" htmlFor="kitty-name">Name</label>
                            <input className="form-input" id="kitty-name"type="text" value={this.state.kittyName} onChange={this.handleKittyNameChange} placeholder="New Pot name"/>
                        </div>
        
                        <div className="number-input">
                            <label className="form-label" htmlFor="buyInAmount">Buy in amount</label>
                            <input className="form-input" id="buyInAmount" type="number" value={this.state.buyInAmount} onChange={this.handleKittyBuyInAmountChange}/>
                        </div>
                    </div>
    
                    <div className="block block-2">
                        {this.state.participants.map(i => {
                            return (
                                <div className="form-row" key={i}>
                                    <div className="input text-input">
                                        <label className="form-label" htmlFor="participent-name">Participant name</label>
                                        <input className="form-input" id="participent-name" type="text" value={this.state.numberOfParticipents} onChange={this.handleChange}/>
                                    </div>
                                    <div className="input text-input">
                                        <label className="form-label" htmlFor="participent-email">Participant email</label>
                                        <input className="form-input" id="participent-email" type="text" value={this.state.numberOfParticipents} onChange={this.handleChange}/>
                                    </div>                    
                                </div>
                            );
                        })}
                        <div className="form-row">
                            <button className="btn add-participant" type="button" onClick={this.handleAddParticipant}>Add another participant</button>
                        </div>
                    </div>
                    <div className="form-controls">
                        <button className="btn" type="submit">Save</button>
                    </div>                    
                </form>
            </div>
        );
    }
}

export default KittyForm;
