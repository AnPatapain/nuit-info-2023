import { Card, Button, Tooltip } from 'components/ui'
import React, { useState, useRef } from 'react'
import { BiUpvote, BiSolidUpvote, BiDownvote } from "react-icons/bi";
import { t } from 'i18next'
function FactCard({ fact }) {
    return (
      <Card 
        className="card flex flex-col w-full max-w-[700px] mx-auto my-4 p-4"
        bodyClass="flex flex-col justify-between"
        >
          <div>
              <h3>{fact.title}</h3>
              <p>{fact.fact}</p>
          </div>
          <img src={fact.image} alt={fact.name} className="w-full mx-auto" />
          <div className='flex items-center gap-4 mt-4'>
            <Button className="flex items-center justify-center">
              <Tooltip title={t('fact.upvote')} placement="bottom">
                <BiUpvote/>
              </Tooltip>
            </Button>
            <Button className="flex items-center justify-center">
              <Tooltip title={t('fact.downvote')} placement="bottom">
                <BiDownvote/>
              </Tooltip>
            </Button>
          </div>
            
        </Card>
    )
}

export default FactCard
