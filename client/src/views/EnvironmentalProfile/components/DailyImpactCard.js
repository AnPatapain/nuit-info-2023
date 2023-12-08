import { Card, Button, Tooltip } from 'components/ui'
import React, { useState, useRef } from 'react'
import { t } from 'i18next'
import { apiChangeVote } from 'services/FactService'
import { RiCelsiusFill } from "react-icons/ri";

function DailyCard({ impact }) {
    return (
        <Card
            className="card flex flex-col w-full max-w-[700px] mx-auto my-4 p-4"
            bodyClass="flex flex-col justify-between"
        >
            <div className='flex items-center justify-between'>
                <div>
                    <h3>{fact.title}</h3>
                    <p>{fact.fact}</p>
                </div>
                <div className='flex items-center text-xl font-bold'>
                    {fact.vote}
                    <RiCelsiusFill/>
                </div>
            </div>
            <img src={fact.image} alt={fact.name} className="w-full mx-auto" />
            <div className='flex items-center gap-4 mt-4'>
                <Button className="flex items-center justify-center" variant="solid" onClick={upvoteHandler}>
                    {t('fact.true')}
                </Button>
                <Button className="flex items-center justify-center" variant="default" onClick={downvoteHandler}>
                    {t('fact.false')}
                </Button>
            </div>

        </Card>
    )
}

export default DailyCard
