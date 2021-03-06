import React, { PropTypes, Component } from 'react'
import Trigger from 'rc-trigger'
import Panel from './Panel'
import placements from './placements'
import moment from 'moment'
import { defaultSkin } from './skin'
import Radium from 'radium';

function noop() {
}

function refFn(field, component) {
    this[field] = component
}

class Picker extends Component {
    static propTypes: {
        prefixCls: PropTypes.string,
        clearText: PropTypes.string,
        value: PropTypes.object,
        defaultOpenValue: PropTypes.object,
        disabled: PropTypes.bool,
        allowEmpty: PropTypes.bool,
        defaultValue: PropTypes.object,
        open: PropTypes.bool,
        defaultOpen: PropTypes.bool,
        align: PropTypes.object,
        placement: PropTypes.any,
        transitionName: PropTypes.string,
        getPopupContainer: PropTypes.func,
        placeholder: PropTypes.string,
        format: PropTypes.string,
        showHour: PropTypes.bool,
        showMinute: PropTypes.bool,
        showSecond: PropTypes.bool,
        style: PropTypes.object,
        className: PropTypes.string,
        disabledHours: PropTypes.func,
        disabledMinutes: PropTypes.func,
        disabledSeconds: PropTypes.func,
        hideDisabledOptions: PropTypes.bool,
        onChange: PropTypes.func,
        onOpen: PropTypes.func,
        onClose: PropTypes.func,
        addon: PropTypes.func
    };

    constructor(props) {
        super(props)
        this.savePanelRef = refFn.bind(this, 'panelInstance')
        const {
            defaultOpen,
            defaultValue,
            open = defaultOpen,
            value = defaultValue
        } = props
        this.state = { open, value }
        this.onPanelChange = this.onPanelChange.bind(this)
        this.onPanelClear = this.onPanelClear.bind(this)
        this.onVisibleChange = this.onVisibleChange.bind(this)
        this.onEsc = this.onEsc.bind(this)
        this.onKeyDown = this.onKeyDown.bind(this)
    }

    componentWillReceiveProps(nextProps) {
        const {value, open} = nextProps
        if ('value' in nextProps) {
            this.setState({value})
        }
        if (open !== undefined) {
            this.setState({open})
        }
    }

    onPanelChange(value) {
        this.setValue(value)
    }

    onPanelClear() {
        this.setValue(null)
        this.setOpen(false)
    }

    onVisibleChange(open) {
        this.setOpen(open)
    }

    onEsc() {
        this.setOpen(false)
        this.refs.picker.focus()
    }

    onKeyDown(e) {
        if (e.keyCode === 40) {
            this.setOpen(true)
        }
    }

    setValue(value) {
        if (!('value' in this.props)) {
            this.setState({value})
        }
        this.props.onChange(value)
    }

    getFormat() {
        const {format, showHour, showMinute, showSecond} = this.props
        if (format) {
            return format
        }
        return [
            showHour ? 'HH' : '',
            showMinute ? 'mm' : '',
            showSecond ? 'ss' : ''
        ].filter(item => !!item).join(':')
    }

    getPanelElement() {
        const {
            prefixCls,
            placeholder,
            disabledHours,
            disabledMinutes,
            disabledSeconds,
            hideDisabledOptions,
            allowEmpty,
            showHour,
            showMinute,
            showSecond,
            defaultOpenValue,
            clearText,
            style,
            addon
        } = this.props
        const { panel : panelStyle } = style
        return (
            <Panel clearText={clearText}
                prefixCls={`${prefixCls}-panel`}
                style={panelStyle}
                ref={this.savePanelRef}
                value={this.state.value}
                onChange={this.onPanelChange}
                onClear={this.onPanelClear}
                defaultOpenValue={defaultOpenValue}
                showHour={showHour}
                showMinute={showMinute}
                showSecond={showSecond}
                onEsc={this.onEsc}
                allowEmpty={allowEmpty}
                format={this.getFormat()}
                placeholder={placeholder}
                disabledHours={disabledHours}
                disabledMinutes={disabledMinutes}
                disabledSeconds={disabledSeconds}
                hideDisabledOptions={hideDisabledOptions}
                addon={addon}/>
        )
    }

    setOpen(open, callback) {
        const {onOpen, onClose} = this.props
        if (this.state.open !== open) {
            this.setState({ open }, callback)
            const event = { open }
            if (open) {
                onOpen(event)
            } else {
                onClose(event)
            }
        }
    }

    render() {
        const {
            prefixCls, placeholder, placement, align,
            disabled, transitionName, style, className, showHour,
            showMinute, showSecond, getPopupContainer,
        } = this.props

        const { open, value } = this.state
        let popupClassName
        const { input, panel, trigger: triggerStyle, ...restStyle } = style
        if (!showHour || !showMinute || !showSecond) {
            popupClassName = `${prefixCls}-panel-narrow`
        }
        return (
            <Trigger
                prefixCls={`${prefixCls}-panel`}
                popupStyle={triggerStyle}
                popupClassName={popupClassName}
                popup={this.getPanelElement()}
                popupAlign={align}
                builtinPlacements={placements}
                popupPlacement={placement}
                action={disabled ? [] : []}
                destroyPopupOnHide
                getPopupContainer={getPopupContainer}
                popupTransitionName={transitionName}
                popupVisible={open}
                onPopupVisibleChange={this.onVisibleChange}
            >
                <span className={`${prefixCls} ${className}`} style={restStyle}>
                    <input
                        className={`${prefixCls}-input`}
                        style={input}
                        ref="picker" type="text" placeholder={placeholder}
                        readOnly
                        onKeyDown={this.onKeyDown}
                        disabled={disabled} value={value && value.format(this.getFormat()) || ''}
                    />
                    <span className={`${prefixCls}-icon`}/>
                </span>
            </Trigger>
        )
    }
}

Picker.defaultProps = {
    clearText: 'clear',
    prefixCls: 'rc-time-picker',
    defaultOpen: false,
    style: defaultSkin,
    className: '',
    align: {},
    defaultOpenValue: moment(),
    allowEmpty: true,
    showHour: true,
    showMinute: true,
    showSecond: true,
    disabledHours: noop,
    disabledMinutes: noop,
    disabledSeconds: noop,
    hideDisabledOptions: false,
    placement: 'bottomLeft',
    onChange: noop,
    onOpen: noop,
    onClose: noop,
    addon: noop
}

export default Radium(Picker)
