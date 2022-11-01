// React
import React from 'react'
// Components
import Carousel from '../Carousel/Carousel'
import Form from '../Form/Form'
// Contexts
import FormsContext from '../../contexts/FormsContext'
import TokenContext from '../../contexts/TokenContext'
// CSS
import styles from './Content.module.css'


const Content = () => {
  // Context
  const [token, setToken] = React.useState({
    TokenSymbol: "AVAX",
    TokenAddress: "0x2C89bbc92BD86F8075d1DEcc58C7F4E0107f286b"
  })
  const [validated, setValidated] = React.useState(false)
  return (
    <section className={`${styles.content} row d-flex justify-content-center`}>
      <div className={`${styles.content__left} col-lg-6 d-lg-block d-none`}>
        <h1 className={styles.content__left__title}>CryptoPix</h1>
        <p className={styles.content__left__text}>
          A maneira mais fácil de converter o seu <br />
          dinheiro em criptomoedas.
        </p>
        <Carousel />
      </div>
      <div className={`${styles.content__right} col-lg-6`}>
        <TokenContext.Provider value={{ token, setToken }}>
          <FormsContext.Provider value={{ validated, setValidated }}>
            <Form />
          </FormsContext.Provider>
        </TokenContext.Provider>
      </div>
    </section>
  )
}

export default Content