import React, { PropTypes, Component } from 'react'
import ReactDom from 'react-dom'
import classnames from 'classnames'
import Radium from 'radium';

const scrollTo = (element, to, duration) => {
    const requestAnimationFrame = window.requestAnimationFrame ||
        function requestAnimationFrameTimeout() {
            return setTimeout(arguments[0], 10)
        }
    // jump to target if duration zero
    if (duration <= 0) {
        element.scrollTop = to
        return
    }
    const difference = to - element.scrollTop
    const perTick = difference / duration * 10

    requestAnimationFrame(() => {
        element.scrollTop = element.scrollTop + perTick
        if (element.scrollTop === to)
            return
        scrollTo(element, to, duration - 10)
    })
}


class Select extends Component {
    static propTypes: {
        prefixCls: PropTypes.string,
        options: PropTypes.array,
        selectedIndex: PropTypes.number,
        type: PropTypes.string,
        onSelect: PropTypes.func,
        onMouseEnter: PropTypes.func
    };

    componentDidMount() {
        // jump to selected option
        this.scrollToSelected(0)
    }

    componentDidUpdate(prevProps) {
        // smooth scroll to selected option
        if (prevProps.selectedIndex !== this.props.selectedIndex) {
            this.scrollToSelected(120)
        }
    }

    onSelect(value) {
        const {onSelect, type} = this.props
        onSelect(type, value)
    }

    getOptions() {
        const {
            options,
            selectedIndex,
            prefixCls,
            style
        } = this.props

        const { li: liStyle } = style

        const {
            selected : selectedStyle,
            disabled : disabledStyle,
            ...normalStyle
        } = liStyle

        return options.map((item, index) => {
            const selected = selectedIndex === index
            const { disabled } = item
            const cls = classnames({
                [`${prefixCls}-select-option-selected`]: selected,
                [`${prefixCls}-select-option-disabled`]: disabled
            })
            let onclick = null
            if (!disabled) {
                onclick = this.onSelect.bind(this, + item.value)
            }
            const optionStyle = {
                ...normalStyle,
                ...(selected ? selectedStyle : {}),
                ...(disabled ? disabledStyle : {})
            }
            return (
                <li
                    className={cls}
                    key={index}
                    onClick={onclick}
                    disabled={disabled}
                    style={optionStyle}
                >
                    {item.value}
                </li>
            )
        })
    }

    scrollToSelected(duration) {
        // move to selected item
        const select = ReactDom.findDOMNode(this)
        const list = ReactDom.findDOMNode(this.refs.list)
        if (!list) {
            return
        }
        let index = this.props.selectedIndex
        if (index < 0) {
            index = 0
        }
        const topOption = list.children[index]
        const to = topOption.offsetTop
        scrollTo(select, to, duration)
    }

    render() {
        if (this.props.options.length === 0) {
            return null
        }

        const { prefixCls, style } = this.props
        const { ul: ulStyle, li, ...restStyle } = style

        return (
            <div
                className={`${prefixCls}-select`}
                onMouseEnter={this.props.onMouseEnter}
                style={restStyle}
            >
                <ul ref="list" style={ulStyle}>{this.getOptions()}</ul>
            </div>
        )
    }
}

Select.defaultProps = {
    style: {
        li: {
            selected: {},
            disabled: {},
        }
    }
}
export default Radium(Select)
