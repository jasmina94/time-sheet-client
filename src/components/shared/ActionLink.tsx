import '../../assets/css/Styles.css';
import '../../assets/css/CustomStyles.css';

const ActionLink = (props: any) => {
    let className = 'link action-link';
    if (props.specialStyle) {
        className += ' ' + props.specialStyle;
    }

    return (
        <button
            className={className}
            onClick={props.action}>
            {props.content}
        </button>
    )
};

export default ActionLink;