import React, { PropTypes, Component } from 'react'
import Header from './Header'
import Combobox from './Combobox'
import moment from 'moment'
import classNames from 'classnames'

function noop() {
}

function generateOptions(length, disabledOptions, hideDisabledOptions) {
    const arr = []
    for (let value = 0; value < length; value++) {
        if (
            !disabledOptions ||
            disabledOptions.indexOf(value) < 0 ||
            !hideDisabledOptions
        ) {
            arr.push(value)
        }
    }
    return arr
}

class Panel extends Component {
    static propTypes: {
        clearText: PropTypes.string,
        prefixCls: PropTypes.string,
        className: PropTypes.string,
        defaultOpenValue: PropTypes.object,
        value: PropTypes.object,
        placeholder: PropTypes.string,
        format: PropTypes.string,
        disabledHours: PropTypes.func,
        disabledMinutes: PropTypes.func,
        disabledSeconds: PropTypes.func,
        hideDisabledOptions: PropTypes.bool,
        onChange: PropTypes.func,
        onEsc: PropTypes.func,
        allowEmpty: PropTypes.bool,
        showHour: PropTypes.bool,
        showMinute: PropTypes.bool,
        showSecond: PropTypes.bool,
        onClear: PropTypes.func,
        addon: PropTypes.func,
    };

    constructor(props) {
        super(props)
        this.state = {
            value: props.value,
            selectionRange: [],
        }
        this.onChange = this.onChange.bind(this)
        this.onClear = this.onClear.bind(this)
        this.onCurrentSelectPanelChange = this.onCurrentSelectPanelChange.bind(this)
    }


    componentWillReceiveProps(nextProps) {
        const value = nextProps.value
        if (value) {
            this.setState({ value })
        }
    }

    onChange(newValue) {
        this.setState({ value: newValue })
        this.props.onChange(newValue)
    }

    onClear() {
        this.props.onClear()
    }

    onCurrentSelectPanelChange(currentSelectPanel) {
        this.setState({ currentSelectPanel })
    }

    close() {
        this.props.onEsc()
    }

    render() {
        const {
            prefixCls, className, placeholder, disabledHours, disabledMinutes,
            disabledSeconds, hideDisabledOptions, allowEmpty, showHour, showMinute,
            showSecond, format, defaultOpenValue, clearText, onEsc, addon, style,
        } = this.props

        const {
            header: headerStyle,
            combobox: comboboxStyle,
            inner: innerStyle,
            ...rest
        } = style
        const { value, currentSelectPanel, } = this.state
        const disabledHourOptions = disabledHours()
        const disabledMinuteOptions = disabledMinutes(value ? value.hour() : null)
        const disabledSecondOptions = disabledSeconds(
            value ? value.hour() : null, value ? value.minute() : null
        )
        const hourOptions = generateOptions(24, disabledHourOptions, hideDisabledOptions)
        const minuteOptions = generateOptions(60, disabledMinuteOptions, hideDisabledOptions)
        const secondOptions = generateOptions(60, disabledSecondOptions, hideDisabledOptions)

        return (
            <div className={
                    classNames({ [`${prefixCls}-inner`]: true, [className]: !!className })
                }
                style={innerStyle}
                >
                <Header
                  clearText={clearText}
                  prefixCls={prefixCls}
                  style={headerStyle}
                  defaultOpenValue={defaultOpenValue}
                  value={value}
                  currentSelectPanel={currentSelectPanel}
                  onEsc={onEsc}
                  format={format}
                  placeholder={placeholder}
                  hourOptions={hourOptions}
                  minuteOptions={minuteOptions}
                  secondOptions={secondOptions}
                  disabledHours={disabledHours}
                  disabledMinutes={disabledMinutes}
                  disabledSeconds={disabledSeconds}
                  onChange={this.onChange}
                  onClear={this.onClear}
                  allowEmpty={allowEmpty}
                />
                <Combobox
                  prefixCls={prefixCls}
                  style={comboboxStyle}
                  value={value}
                  defaultOpenValue={defaultOpenValue}
                  format={format}
                  onChange={this.onChange}
                  showHour={showHour}
                  showMinute={showMinute}
                  showSecond={showSecond}
                  hourOptions={hourOptions}
                  minuteOptions={minuteOptions}
                  secondOptions={secondOptions}
                  disabledHours={disabledHours}
                  disabledMinutes={disabledMinutes}
                  disabledSeconds={disabledSeconds}
                  onCurrentSelectPanelChange={this.onCurrentSelectPanelChange}
                />
                {addon(this)}
            </div>
        )
    }
}

Panel.defaultProps = {
    prefixCls: 'rc-time-picker-panel',
    style: {},
    onChange: noop,
    onClear: noop,
    disabledHours: noop,
    disabledMinutes: noop,
    disabledSeconds: noop,
    defaultOpenValue: moment(),
    addon: noop,
}

export default Panel
