import PropTypes from 'prop-types'

const Button = ({ color, text, onClick }) => {
    
    // const onClick = () => {alert('ello there mate')}

    return (
        <div
            className="btn"
            style={{ backgroundColor: color }}
            onClick={onClick}
        >
            {text}
        </div>

    )
}

Button.defaultProps = {
    color: 'steelblue',
    text: '+'
}

Button.propTypes = {
    text: PropTypes.string,
    color: PropTypes.string,
    onClick: PropTypes.func
}

export default Button