import React from 'react';

class NumberRow extends React.Component {

    render() {
        const { onSelectClick, onUnselectClick, isSelected, isLocked } = this.props;
        const { numberString, id } = this.props.number;

        return (
            <tr>
                <td>{numberString}</td>
                <td>
                    <button className={`btn btn-${isSelected ? 'danger' : 'primary'}`} disabled={isLocked} onClick={isSelected ? onUnselectClick : onSelectClick}>
                        {isSelected ? 'Remove From Selected' : 'Add To Selected'}
                    </button>
                </td>
            </tr>
        )
    }
}

export default NumberRow;