import React from 'react';
import { produce } from 'immer';
import { v4 as uuidv4 } from 'uuid';
import NumberRow from './NumberRow';
import SelectedRow from './SelectedRow';


class NumberTable extends React.Component {
    state = {
        number: {
            id: uuidv4(),
            numberString: Math.random()
},

        numbers: [],
        selectedNumbers: [],
        lockedNumbers:[]
    }
   
    onAddClick = () => {
        const { numbers, number } = this.state;
        const randomNumber = Math.random();
        this.setState({ number: { numberString: randomNumber, id: uuidv4() }});
        const copy = [...numbers, number];
        this.setState({ numbers: copy });

    };

    onSelectClick = p => {

        const newState = produce(this.state, draftState => {
            draftState.selectedNumbers.push(p);
        });

        this.setState(newState);
    }

    onUnselectClick = p => {
        const selectedNumbers = this.state.selectedNumbers.filter(pe => p.id !== pe.id);
        this.setState({ selectedNumbers });
    }

    isSelected = p => {
        const { selectedNumbers } = this.state;
        return selectedNumbers.some(s => s.id === p.id);
    }

    onLockClick = p => {

        const newState = produce(this.state, draftState => {
            draftState.lockedNumbers.push(p);
        });

        this.setState(newState);
    }

    onUnlockClick = p => {
        const lockedNumbers = this.state.lockedNumbers.filter(pe => p.id !== pe.id);
        this.setState({ lockedNumbers });
    }

    isLocked = p => {
        const { lockedNumbers } = this.state;
        return lockedNumbers.some(s => s.id === p.id);
    }

    render() {
        const { number, numbers, selectedNumbers, lockedNumbers } = this.state;
        return (
            <div className='container mt-5'>
                <div className='row'>
                    <div className='col-md-12'>
                        <button className="btn btn-success btn-lg btn-block" onClick={this.onAddClick}>Add</button>
                    </div>
                </div>
            <div>
                <table className="table table-hover table-striped table-bordered">
                    <thead>
                        <tr>
                            <th>Number</th>
                            <th>Add/Remove</th>
                            </tr>
                        </thead>
                        <tbody>

                            {numbers.map((n, i) => {
                                return <NumberRow
                                    isLocked={this.isLocked(n)}
                                    onSelectClick={() => this.onSelectClick(n)}
                                    onUnselectClick={() => this.onUnselectClick(n)}
                                    number={n}
                                    isSelected={this.isSelected(n)}
                                    key={i} />
                            })
                            }
                     </tbody>
                    </table>
                </div>
                <div className="row jumbotron">
                    <div className="col-md-6 col-md-offset-3"><h3>Selected Numbers </h3>
                        <ul className="list-group">

                            {selectedNumbers.map((n, i) => {
                                return <SelectedRow
                                    onLockClick={() => this.onLockClick(n)}
                                    onUnlockClick={() => this.onUnlockClick(n)}
                                    number={n}
                                    isLocked={this.isLocked(n)}
                                    key={i} />
                            })
                            }
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
}

export default NumberTable;