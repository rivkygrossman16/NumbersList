import React from 'react';

class SelectedRow extends React.Component {

    render() {
        const { onLockClick, onUnlockClick, isLocked } = this.props;
        const { numberString, id } = this.props.number;

        return (
            <li className='list-group-item'>{numberString}     <button className='btn btn-primary' onClick={isLocked ? onUnlockClick : onLockClick}>
                    {isLocked ? 'Unlock' : 'Lock'}
                    </button>
            </li>
        )
    }
}

export default SelectedRow;