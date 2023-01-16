import React from 'react'

export default function ImageModal({ show, setShow, img }) {
    return (
        <div className="">
            {
                show &&
                (
                    <div style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <div style={{
                            padding: '20px',
                            width: '50%',
                            background: 'white',
                            borderRadius: '5px'
                        }}>
                            <button onClick={() => setShow(false)}>Close</button>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}>
                                <img
                                    src={img}
                                    alt=""
                                    style={{
                                        height: '550px'
                                    }}
                                />
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    )
}