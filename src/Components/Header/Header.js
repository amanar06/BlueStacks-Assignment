import React from 'react'

function Header() {
    return (
        <div style={{background: '#1F2640', width: '100%'}}>
            <div style={{display: 'flex', padding: '1% 12%'}}>
                <img src={require('../../images/bs-logo-new.png')} alt="BlueStacks" title="BlueStacks" height = "50" style={{cursor: 'pointer'}} />
            </div>
        </div>
    )
}

export default Header
