import React from 'react'
import styles from './InputCoin.module.css'
import Chevron from '../../../assets/chevron.png'
import TokenSelector from './TokenSelector/TokenSelector'
import TokenContext from '../../../contexts/TokenContext'
import SelectorContext from '../../../contexts/SelectorContext'

const InputCoin = (props) => {
    const { token } = React.useContext(TokenContext)
    const { isOpen, setIsOpen } = React.useContext(SelectorContext)

    const handleClick = () => {
        setIsOpen(!isOpen)
    }

    return (
        <div className={styles.input} style={{ marginTop: props.distance }}>
            <label
                className={styles.input__label}
                htmlFor={props.name}>
                {props.label}
            </label>
            <div className={styles.input__field}>
                <div className={styles.input__field__coin} onClick={handleClick}>
                    <img className={styles.input__field__coin__icon} src={token.TokenLogo} alt="Coin icon" />
                    <span className={styles.input__field__coin__tag}>{token.TokenSymbol}</span>
                    <img className={styles.input__field__coin__arrow} src={Chevron} alt="Arrow icon" />
                </div>
                <div className={styles.input__field__selector}>
                    <TokenSelector state={isOpen} />
                </div>
                <input
                    id={props.name}
                    name={props.name}
                    className={styles.input__field__item}
                    value={props.value}
                    autoComplete="off"
                    type="text"
                    readOnly
                    required
                />
            </div>
        </div>
    )
}

export default InputCoin