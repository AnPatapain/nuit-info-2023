import React from 'react'
import reducer from './store'
import { injectReducer } from 'store/index'
import { Container } from 'components/shared'
import Board from './Board'

injectReducer('scrumBoard', reducer)

const ScrumBoard = (props) => {
    return (
        <>
            <Container className="h-full">
                <Board {...props} />
            </Container>
        </>
    )
}

export default ScrumBoard
