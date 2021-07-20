import '../../assets/css/Styles.css';
import logoImage from '../../assets/images/logo.png';

const MainLogo = (props: any) => {
    return (
        <div className="logo-wrap">
            <button className="link action-link inner" onClick={props.clickHandler}>
                <img src={logoImage} alt={props.altImg} />
            </button>
        </div>
    )

};

export default MainLogo;