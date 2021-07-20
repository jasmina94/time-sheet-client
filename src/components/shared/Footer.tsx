import '../../assets/css/Styles.css'

const Footer = () => {
    return (
        <footer>
        <div className="wrapper">
          <ul>
            <li>
              <span>Copyright @ 2021. Emakina All rights reserved</span>
            </li>
          </ul>
          <ul className="right">
            <li>
              <a href=" ">Terms of service</a>
            </li>
            <li>
              <a href=" " className="last">Privacy policy</a>
            </li>
          </ul>
        </div>
      </footer>
    );
}

export default Footer;