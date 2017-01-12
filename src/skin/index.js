const input = {
    width: '100%',
    position: 'relative',
    display: 'inline-block',
    padding: '4px 7px',
    height: 28,
    cursor: 'text',
    fontSize: 12,
    lineHeight: '1.5',
    color: '#666',
    backgroundColor: '#fff',
    backgroundImage: 'none',
    border: '1px solid #d9d9d9',
    borderRadius: 0,
    transition: 'border .2s cubic-bezier(0.645, 0.045, 0.355, 1), background .2s cubic-bezier(0.645, 0.045, 0.355, 1), box-shadow .2s cubic-bezier(0.645, 0.045, 0.355, 1)',
}

const header = {
    wrap: {
        boxSizing: 'border-box',
        position: 'relative',
        padding: 6,
        borderBottom: '1px solid #e9e9e9',
    },
    input: {
        margin: 0,
        padding: 0,
        width: '100%',
        cursor: 'auto',
        lineHeight: '1.5',
        outline: 0,
        border: '1px solid transparent',
        invalid: {
            borderColor: 'red',
        }
    }
}

const select = {
    float: 'left',
    fontSize: '12px',
    borderStyle: 'solid',
    borderColor: '#e9e9e9',
    borderWidth: '0 1px',
    marginLeft: '-1px',
    boxSizing: 'border-box',
    width: '56px',
    overflow: 'hidden',
    position: 'relative', // Fix chrome weird render bug
    ':firstChild': {
        borderLeft: 0,
        marginLeft: 0,
    },
    ':lastChild': {
        borderRight: 0,
    },
    ul: {
        listStyle: 'none',
        boxSizing: 'border-box',
        margin: '0',
        padding: '0',
        width: '100%',
        maxHeight: '144px',
    },
    li: {
        listStyle: 'none',
        boxSizing: 'content-box',
        margin: '0',
        padding: '0 0 0 16px',
        width: '100%',
        height: '24px',
        lineHeight: '24px',
        textAlign: 'left',
        cursor: 'pointer',
        userSelect: 'none',
        ':hover': {
            background: '#edfaff',
        },
        selected: {
            background: '#edfaff',
            color: '#2db7f5',
        },
        disabled: {
            color: '#bfbfbf',
            ':hover': {
              background: 'transparent',
              cursor: 'not-allowed',
            }
        }
    }
}

const panel = {
    inner: {
        display: 'inline-block',
        position: 'relative',
        outline: 'none',
        listStyle: 'none',
        fontSize: 12,
        textAlign: 'left',
        backgroundColor: '#fff',
        borderRadius: 3,
        boxShadow: '0 1px 5px #ccc',
        backgroundClip: 'padding-box',
        border: '1px solid #ccc',
        lineHeight: '1.5',
    },
    header,
    combobox: {
        select
    }
}

export const defaultSkin = {
    display: 'inline-block',
    boxSizing: 'border-box',
    trigger: {
        zIndex: 1070,
        width: 170,
        position: 'absolute',
        boxSizing: 'border-box',
    },
    input,
    panel,
}
