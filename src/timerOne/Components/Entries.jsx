import React from 'react'


const Entries = (props) => {

    const onClickFunction = () => {
        props.store.mainButton()
    }

    const onChangeFunction = (event) => {
        props.store.changeNumber(event.currentTarget.value)
    }

    return <div>
        <input placeholder="Seconds" type="number" onChange={onChangeFunction} />
        <button onClick={onClickFunction} value={props.store._state.timer} disabled={props.store.mainButtonDisabled}>Start T1</button>
        <br />
        <br />
        <span>{props.store._state.hours}:{props.store._state.minutes}:{props.store._state.seconds}</span>
    </div>
}

export default Entries;