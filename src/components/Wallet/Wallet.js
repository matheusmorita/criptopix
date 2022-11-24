import React from "react";
import { ethers } from "ethers";
import Jazzicon, { jsNumberForAddress } from "react-jazzicon";
// CSS
import styles from "./Wallet.module.css";
// Contexts
import WalletContext from "../../contexts/WalletContext";
import UserContext from "../../contexts/UserContext";
// Routes
import { Link } from "react-router-dom";
import { isMobile } from "react-device-detect";

const Wallet = () => {
  // Context
  const { user, setUser } = React.useContext(UserContext);
  const { connected, setConnected } = React.useContext(WalletContext);
  // States
  const [metamask, setMetamask] = React.useState("");
  const [dropdown, setDropdown] = React.useState(false);
  const [requested, setRequested] = React.useState(false);

  // Refs
  const walletInfo = React.useRef(null);

  // Effects
  React.useEffect(() => {
    window.ethereum ? setMetamask(true) : setMetamask(false);
  }, []);

  // Functions
  const handleDropdown = () => {
    setDropdown(!dropdown);
  };

  const handleDisconnect = () => {
    setUser({});
    setConnected(false);
    setRequested(false);
    localStorage.clear();
  };

  // Returns
  if (metamask) {
    // If the wallet is connected
    // EthersJS
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    // Functions
    const minimizeAddress = (address) => {
      const sliceOne = address.slice(0, 8);
      const sliceTwo = address.slice(-4);
      return `${sliceOne}...${sliceTwo}`;
    };

    const handleConnectWallet = async () => {
      waitingExtensionResponse();
      await provider.send("eth_requestAccounts", []);
      const address = await signer.getAddress();
      localStorage.setItem("Address", address);
      setTimeout(() => {
        setConnected(true);
      }, 1000);
    };

    const waitingExtensionResponse = () => {
      setRequested(true);
      setTimeout(() => {
        setRequested(false);
      }, 15000);
    };

    if (connected) {
      return (
        <div
          ref={walletInfo}
          className={styles.header__menu__wallet}
          data-enabled={dropdown}
          onClick={handleDropdown}
        >
          <span className={styles.header__menu__wallet__name}>
            {minimizeAddress(localStorage.getItem("Address") || user.Address)}
          </span>
          <Jazzicon
            diameter="30"
            seed={jsNumberForAddress(
              localStorage.getItem("Address") || user.Address
            )}
          />
          <div className={styles.header__menu__wallet__dropdown}>
            <ul className={styles.header__menu__wallet__dropdown__list}>
              <Link to="../profile">
                <li
                  className={styles.header__menu__wallet__dropdown__list__item}
                >
                  Minha carteira
                </li>
              </Link>
              <li
                className={styles.header__menu__wallet__dropdown__list__item}
                onClick={handleDisconnect}
              >
                Desconectar
              </li>
            </ul>
          </div>
        </div>
      );
    } else {
      return (
        <div
          className={styles.header__menu__button}
          onClick={handleDropdown}
          data-enabled={dropdown}
        >
          {requested === true ? "Aguardando extensão" : "Conectar carteira"}
          <div className={styles.header__menu__wallet__dropdown}>
            <ul className={styles.header__menu__wallet__dropdown__list}>
              <li
                onClick={handleConnectWallet}
                className={styles.header__menu__wallet__dropdown__list__item}
              >
                Usar metamask
              </li>
              <Link to="../login">
                <li
                  className={styles.header__menu__wallet__dropdown__list__item}
                >
                  Login Blocklize
                </li>
              </Link>
              <Link to="../register">
                <li
                  className={styles.dropdown__button}
                >
                  Cadastre-se
                </li>
              </Link>
            </ul>
          </div>
        </div>
      );
    }
  } else {
    const metamaskLink = "https://metamask.io/";
    const getMetamaskExtension = () => {
      window.open(metamaskLink);
    };
    if (!isMobile) {
      return (
        <div
          className={styles.header__menu__button}
          onClick={handleDropdown}
          data-enabled={dropdown}
        >
          {requested === true ? "Aguardando extensão" : "Conectar carteira"}
          <div className={styles.header__menu__wallet__dropdown}>
            <ul className={styles.header__menu__wallet__dropdown__list}>
              <li
                onClick={getMetamaskExtension}
                className={styles.header__menu__wallet__dropdown__list__item}
              >
                Instalar metamask
              </li>
              <Link to="../login">
                <li
                  className={styles.header__menu__wallet__dropdown__list__item}
                >
                  Login Blocklize
                </li>
              </Link>
              <Link to="../register">
                <li
                  className={styles.dropdown__button}
                >
                  Cadastre-se
                </li>
              </Link>
            </ul>
          </div>
        </div>
      );
    } else {
      return (
        <Link to="../login">
          <button className={styles.header__menu__button}>Fazer login</button>
        </Link>
      );
    }
  }
};

export default Wallet;
